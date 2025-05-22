
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements sequentially
    const titleEl = titleRef.current;
    const sloganEl = sloganRef.current;
    const descEl = descRef.current;
    const ctaEl = ctaRef.current;

    if (titleEl) {
      titleEl.classList.add('animate-fade-in');
      titleEl.style.animationDelay = '0.2s';
    }
    
    if (sloganEl) {
      sloganEl.classList.add('animate-fade-in');
      sloganEl.style.animationDelay = '0.5s';
    }
    
    if (descEl) {
      descEl.classList.add('animate-fade-in');
      descEl.style.animationDelay = '0.8s';
    }
    
    if (ctaEl) {
      ctaEl.classList.add('animate-fade-in');
      ctaEl.style.animationDelay = '1.1s';
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center bg-gradient-to-br from-primary via-[#0A3472] to-[#104B8B]">
      {/* Background animated dots/patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract technology pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/10 animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-white/10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 right-1/2 w-48 h-48 rounded-full bg-white/5 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      <div className="container-custom z-10">
        <div className="max-w-3xl opacity-0" ref={titleRef}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            NafArro Solutions
          </h1>
        </div>
        
        <div className="max-w-3xl opacity-0" ref={sloganRef}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary mb-6">
            King of Automation
          </h2>
        </div>
        
        <div className="max-w-2xl opacity-0" ref={descRef}>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            We transform manual processes into automated workflows, saving you time, reducing errors, and increasing productivity with cutting-edge technology solutions.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 opacity-0" ref={ctaRef}>
          <Link to="/contact" className="btn-primary text-center">
            Schedule Consultation
          </Link>
          <Link to="/services" className="bg-transparent border border-white text-white font-medium py-2 px-6 rounded transition-all hover:bg-white/10 hover:shadow-lg hover:-translate-y-1 text-center">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
