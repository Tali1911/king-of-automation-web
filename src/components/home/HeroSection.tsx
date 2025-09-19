
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
      titleEl.style.opacity = '1'; // Ensure it stays visible after animation
    }
    
    if (sloganEl) {
      sloganEl.classList.add('animate-fade-in');
      sloganEl.style.animationDelay = '0.5s';
      sloganEl.style.opacity = '1'; // Ensure it stays visible after animation
    }
    
    if (descEl) {
      descEl.classList.add('animate-fade-in');
      descEl.style.animationDelay = '0.8s';
      descEl.style.opacity = '1'; // Ensure it stays visible after animation
    }
    
    if (ctaEl) {
      ctaEl.classList.add('animate-fade-in');
      ctaEl.style.animationDelay = '1.1s';
      ctaEl.style.opacity = '1'; // Ensure it stays visible after animation
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-[#0A3472] to-[#104B8B]">
      {/* Professional Animated Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 animate-pulse-slow" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-5">
          {/* Large hexagons */}
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 transform rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute top-1/3 right-20 w-24 h-24 border border-white/20 transform rotate-12 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
          <div className="absolute bottom-20 left-1/4 w-28 h-28 border border-white/25 transform -rotate-12 animate-spin" style={{ animationDuration: '30s' }} />
          
          {/* Circuit-like lines */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse-slow" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Floating orbs with glow effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-white/20 blur-3xl animate-pulse-slow" />
          <div className="absolute top-2/3 right-1/6 w-48 h-48 rounded-full bg-accent/30 blur-2xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Animated dots grid */}
        <div className="absolute inset-0 opacity-15">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Subtle wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-5">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 50,0; 0,0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
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
