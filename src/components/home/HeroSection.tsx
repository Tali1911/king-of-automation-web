import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePublicPageContent } from '@/hooks/usePageContent';

const HeroSection = () => {
  const { getContent, isLoading } = usePublicPageContent('home');
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
      titleEl.style.opacity = '1';
    }
    if (sloganEl) {
      sloganEl.classList.add('animate-fade-in');
      sloganEl.style.animationDelay = '0.5s';
      sloganEl.style.opacity = '1';
    }
    if (descEl) {
      descEl.classList.add('animate-fade-in');
      descEl.style.animationDelay = '0.8s';
      descEl.style.opacity = '1';
    }
    if (ctaEl) {
      ctaEl.classList.add('animate-fade-in');
      ctaEl.style.animationDelay = '1.1s';
      ctaEl.style.opacity = '1';
    }
  }, []);

  const heroTitle = getContent('hero_title', 'NafArro Solutions');
  const heroSlogan = getContent('hero_slogan', 'King of Automation');
  const heroSubtitle = getContent('hero_subtitle', 'We transform manual processes into automated workflows, saving you time, reducing errors, and increasing productivity with cutting-edge technology solutions.');
  const primaryCTA = getContent('hero_cta_primary', 'Schedule Consultation');
  const secondaryCTA = getContent('hero_cta_secondary', 'Explore Services');

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-[#0A3472] to-[#104B8B]">
      {/* Professional Animated Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/30 animate-pulse" style={{ animationDuration: '4s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/50 transform rotate-45 animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-white/40 transform rotate-12 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
          <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-white/45 transform -rotate-12 animate-spin" style={{ animationDuration: '22s' }} />
          
          {/* Circuit-like lines */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/25 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }} />
        </div>
        
        {/* Floating orbs with glow effect */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-white/30 blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-2/3 right-1/6 w-48 h-48 rounded-full bg-accent/40 blur-2xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 rounded-full bg-secondary/30 blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '7s' }} />
        </div>
        
        {/* Animated dots grid */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1.5 + Math.random() * 1.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Moving particles */}
        <div className="absolute inset-0 opacity-25">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-bounce"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Enhanced wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,20 600,100 900,60 C1050,30 1150,80 1200,60 L1200,120 L0,120 Z" fill="url(#waveGradient)">
              <animateTransform attributeName="transform" type="translate" values="0,0; 100,0; 0,0" dur="8s" repeatCount="indefinite" />
            </path>
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="50%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="container-custom z-10 px-6 md:px-8">
        <div className="max-w-3xl opacity-0" ref={titleRef}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-3 tracking-tight">
            {heroTitle}
          </h1>
        </div>
        
        <div className="max-w-3xl opacity-0" ref={sloganRef}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary mb-4 md:mb-6 tracking-wide">
            {heroSlogan}
          </h2>
        </div>
        
        <div className="max-w-2xl opacity-0" ref={descRef}>
          <p className="text-base sm:text-lg md:text-xl text-gray-200/90 mb-6 md:mb-8 leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 max-w-md sm:max-w-none" ref={ctaRef}>
          <Link 
            to="/contact" 
            className="btn-primary text-center py-3 px-6 text-sm sm:text-base font-semibold rounded-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
          >
            {primaryCTA}
          </Link>
          <Link 
            to="/services" 
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium py-3 px-6 text-sm sm:text-base rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:-translate-y-0.5 text-center"
          >
            {secondaryCTA}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
