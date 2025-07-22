
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      id: "faq-1",
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity. Simple websites typically take 2-4 weeks, while complex automation systems can take 2-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      id: "faq-2",
      question: "Do you provide ongoing support and maintenance?",
      answer: "Yes! We offer comprehensive support packages including regular updates, security monitoring, backup services, and technical support. We're here to ensure your systems continue running smoothly."
    },
    {
      id: "faq-3",
      question: "What technologies do you specialize in?",
      answer: "We work with modern technologies including React, Node.js, Python, Django, PostgreSQL, MongoDB, and various cloud platforms. We choose the best technology stack for each project's specific needs."
    },
    {
      id: "faq-4",
      question: "Can you help migrate our existing systems?",
      answer: "Absolutely! We have extensive experience in system migrations, data transfers, and modernizing legacy applications. We ensure minimal downtime and data integrity throughout the process."
    },
    {
      id: "faq-5",
      question: "How do you handle project communication?",
      answer: "We believe in transparent communication. You'll have regular updates through your preferred channels (email, Slack, project management tools), weekly progress reports, and scheduled check-in meetings."
    },
    {
      id: "faq-6",
      question: "What's included in your automation services?",
      answer: "Our automation services include process analysis, custom software development, system integration, training, documentation, and ongoing optimization. We handle everything from simple workflows to complex enterprise solutions."
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Find answers to common questions about our services and process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="bg-white rounded-lg shadow-sm border px-6"
              >
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
