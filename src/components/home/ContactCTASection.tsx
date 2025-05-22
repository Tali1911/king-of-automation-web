
import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTASection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-center text-white animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our experts to discuss how we can help transform your business processes with automation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="bg-white text-primary font-medium py-3 px-8 rounded-md transition-all hover:shadow-lg hover:-translate-y-1 inline-block"
            >
              Schedule a Consultation
            </Link>
            <Link 
              to="/services" 
              className="bg-transparent border border-white text-white font-medium py-3 px-8 rounded-md transition-all hover:bg-white/10 hover:shadow-lg hover:-translate-y-1 inline-block"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
