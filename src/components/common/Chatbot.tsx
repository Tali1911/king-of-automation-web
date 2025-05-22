
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

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
    setMessage('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! We specialize in automation solutions. Would you like to learn more about our services?",
        "Good question! We offer website development, web applications for automation, and data analysis services.",
        "I'd be happy to connect you with one of our automation experts. What's the best way to reach you?",
        "Our team has extensive experience with React, Node.js/Express, and Django. How can we help with your project?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
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
