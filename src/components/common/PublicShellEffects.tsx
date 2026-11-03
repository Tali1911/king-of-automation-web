import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Applies the dark theme to <html> while a public page is mounted so that
 * portalled UI (dialogs, toasts, popovers) inherits it. Removed on unmount so
 * the admin portal stays light.
 */
export const DarkDocument = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    return () => root.classList.remove('dark');
  }, []);
  return null;
};

/**
 * Decorative fade/rise transition on route change, plus staggered scroll
 * reveals for the content blocks of interior pages (home has its own).
 * Purely visual; skipped for prefers-reduced-motion.
 */
export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || pathname === '/') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Skip the first (hero) section; it is covered by the page transition
      const sections = Array.from(el.querySelectorAll<HTMLElement>('section')).slice(1);
      sections.forEach((section) => {
        const container = section.querySelector<HTMLElement>('.container') ?? section;
        const items = Array.from(container.children) as HTMLElement[];
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: section, start: 'top 88%', once: true },
        });
      });
    }, el);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div key={pathname} ref={ref} className="page-transition">
      {children}
    </div>
  );
};
