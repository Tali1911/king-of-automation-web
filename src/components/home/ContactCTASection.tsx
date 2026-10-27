
import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTASection = () => {
  return (
    <section className="relative py-24 bg-deep">
      <div className="container-custom">
        <div
          className="glow-border relative overflow-hidden rounded-3xl p-12 text-center md:p-16 animate-on-scroll"
          style={{
            background: 'linear-gradient(135deg, rgba(10,36,99,0.8), rgba(5,15,30,0.9))',
            boxShadow: '0 40px 100px -50px rgba(51,195,240,0.35)',
          }}
        >
          <div aria-hidden="true" className="noise-overlay absolute inset-0" />
          <div
            aria-hidden="true"
            className="absolute -top-20 left-1/4 h-48 w-72 rounded-full blur-3xl"
            style={{ background: 'rgba(51,195,240,0.14)' }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 right-1/4 h-48 w-72 rounded-full blur-3xl"
            style={{ background: 'rgba(62,146,204,0.18)' }}
          />
          <h2 className="font-display relative mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Automate Your Business?
          </h2>
          <p className="relative mx-auto mb-9 max-w-2xl text-lg text-[#a9bcd1]">
            Get in touch with our experts to discuss how we can help transform your business processes with automation.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-block rounded-lg py-3 px-8 font-semibold text-[#05101f] transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(100deg, #33c3f0, #7fdcff)', boxShadow: '0 0 30px rgba(51,195,240,0.35)' }}
            >
              Schedule a Consultation
            </Link>
            <Link
              to="/services"
              className="glass-panel inline-block rounded-lg py-3 px-8 font-medium text-white transition-all hover:-translate-y-1 hover:border-[#33c3f0]/50 hover:text-[#33c3f0]"
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
