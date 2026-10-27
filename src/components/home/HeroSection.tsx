import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePublicPageContent } from '@/hooks/usePageContent';
import { HeroCanvas } from '@/components/three/HeroCanvas';

const HeroSection = () => {
  const { getContent } = usePublicPageContent('home');
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

  const heroTitle = getContent('hero_title', 'Put Your Business on Auto-Pilot');
  const heroSlogan = getContent('hero_slogan', 'King of Automation');
  const heroSubtitle = getContent('hero_subtitle', 'We build websites and smart tools that run the boring parts of your business for you — emails, invoices, leads, payments, content updates. So you can stop doing repetitive work and focus on growing.');
  const primaryCTA = getContent('hero_cta_primary', 'Get a Free Quote');
  const secondaryCTA = getContent('hero_cta_secondary', 'See What We Build');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-deep">
      {/* Interactive 3D automation core — lazy, decorative, click-through */}
      <HeroCanvas />

      {/* Ambient gradient + bottom fade into the page */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 18% 30%, rgba(10,36,99,0.45), transparent 65%), linear-gradient(180deg, rgba(4,10,20,0.15) 0%, rgba(4,10,20,0.05) 55%, #050b18 96%)',
        }}
      />
      <div aria-hidden="true" className="noise-overlay absolute inset-0" />

      <div className="container-custom relative z-10 px-6 py-28 md:px-8">
        <div className="max-w-3xl opacity-0" ref={titleRef}>
          <span className="eyebrow-badge mb-6 animate-fade-in">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#33c3f0] shadow-[0_0_8px_rgba(51,195,240,0.9)]" />
            Automation Studio — Nairobi, Kenya
          </span>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>
        </div>

        <div className="max-w-3xl opacity-0" ref={sloganRef}>
          <h2 className="font-display mt-4 text-xl font-semibold uppercase tracking-[0.25em] text-[#33c3f0] text-glow md:text-2xl">
            {heroSlogan}
          </h2>
        </div>

        <div className="max-w-2xl opacity-0" ref={descRef}>
          <p className="mt-6 text-base leading-relaxed text-[#a9bcd1] sm:text-lg md:text-xl">
            {heroSubtitle}
          </p>
        </div>

        <div className="flex max-w-md flex-col gap-4 opacity-0 sm:max-w-none sm:flex-row" ref={ctaRef}>
          <Link
            to="/contact"
            className="text-center text-sm font-semibold text-[#05101f] sm:text-base"
            style={{
              background: 'linear-gradient(100deg, #33c3f0, #7fdcff)',
              padding: '0.85rem 1.75rem',
              borderRadius: '0.6rem',
              boxShadow: '0 0 30px rgba(51,195,240,0.35)',
            }}
          >
            {primaryCTA}
          </Link>
          <Link
            to="/services"
            className="glass-panel text-center font-medium text-white transition-all duration-300 hover:border-[#33c3f0]/50 hover:text-[#33c3f0]"
            style={{ padding: '0.85rem 1.75rem', borderRadius: '0.6rem', fontSize: '0.9rem' }}
          >
            {secondaryCTA}
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        style={{ animationDuration: '2.4s' }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <div className="h-2 w-1 rounded-full bg-[#33c3f0]/80" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
