
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

type FAQ = {
  keywords: string[];
  response: string;
};

const builtInAnswers: FAQ[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! I'm the NafArro Assistant. I'm here to help you with questions about our automation services, pricing, and technology stack. How can I assist you today?"
  },
  {
    keywords: ['services', 'what do you do', 'offerings'],
    response: "We offer three main services: 🌐 Website Development, 💻 Web Application Development for automation, and 📊 Data Analysis & Automation. Each service is designed to streamline your business processes."
  },
  {
    keywords: ['price', 'cost', 'pricing', 'how much'],
    response: "Our pricing starts at $1,000 for websites, $2,500 for web applications, and $1,800 for data automation projects. Prices vary based on features and urgency. Would you like a detailed quote?"
  },
  {
    keywords: ['tech', 'technology', 'stack', 'what technologies'],
    response: "We use modern technologies: React for frontends, Node.js & Express for backends, MongoDB for databases, and Supabase for backend services. This ensures scalable and reliable solutions."
  },
  {
    keywords: ['timeline', 'how long', 'duration', 'time'],
    response: "Project timelines vary: Simple websites take 2-4 weeks, web applications 4-8 weeks, and data automation projects 3-6 weeks. Urgent projects can be expedited with a 40% premium."
  },
  {
    keywords: ['contact', 'reach', 'get in touch'],
    response: "You can reach us through our contact form on the website, or book a consultation directly. We typically respond within minutes during business hours!"
  },
  {
    keywords: ['automation', 'automate'],
    response: "We specialize in business process automation! We can automate data collection, reporting, workflows, and create custom dashboards to streamline your operations and save time."
  },
  {
    keywords: ['portfolio', 'examples', 'work', 'projects'],
    response: "You can view our portfolio on the Portfolio page to see examples of our websites, web applications, and automation solutions. Each project showcases our commitment to quality and innovation."
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi there! I'm the NafArro assistant. How can I help you with your automation needs today?", 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    const userMessage = message.toLowerCase();
    setMessage('');
    setIsTyping(true);

    // Find matching built-in answer
    setTimeout(() => {
      let botResponse = "Thanks for your question! For more specific information about our automation services, please feel free to contact our team directly. We're here to help with your automation needs!";
      
      // Check for keyword matches
      for (const faq of builtInAnswers) {
        if (faq.keywords.some(keyword => userMessage.includes(keyword))) {
          botResponse = faq.response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <div className={cn(
        "absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform",
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="bg-primary text-white p-4">
          <h3 className="font-medium">NafArro Assistant</h3>
          <p className="text-xs opacity-80">We typically reply within minutes</p>
        </div>

        {/* Messages area */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "mb-4 max-w-[80%] rounded-xl p-3",
                msg.isUser 
                  ? "ml-auto bg-primary text-white rounded-tr-none" 
                  : "mr-auto bg-gray-200 text-gray-800 rounded-tl-none"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-70 block mt-1">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          ))}
          
          {isTyping && (
            <div className="mr-auto bg-gray-200 text-gray-800 rounded-xl rounded-tl-none mb-4 max-w-[80%] p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 rounded-full bg-gray-500 animate-pulse" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-3 border-t flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
