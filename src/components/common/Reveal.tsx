import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  /** Fade + rise distance in px */
  y?: number;
  /** Stagger delay in seconds */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'li';
}

/**
 * Scroll-triggered reveal (fade + rise). Skipped instantly for
 * prefers-reduced-motion users — content simply appears.
 */
export const Reveal = ({ children, y = 28, delay = 0, className, as = 'div' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useDeviceCapability();
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion, y, delay]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
      {children}
    </Tag>
  );
};
