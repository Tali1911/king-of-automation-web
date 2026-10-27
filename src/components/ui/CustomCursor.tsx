import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor: a small dot plus a lagging glow ring that reacts to
 * interactive elements. Desktop (fine pointer) only; native cursor stays
 * visible for accessibility.
 */
export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, input, textarea, select, [role="button"], [data-cursor]')));
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#33c3f0]"
        style={{ boxShadow: '0 0 8px rgba(51,195,240,0.8)' }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border transition-[width,height,margin,background-color] duration-200"
        style={{
          borderColor: hovering ? 'rgba(51,195,240,0.85)' : 'rgba(51,195,240,0.3)',
          backgroundColor: hovering ? 'rgba(51,195,240,0.08)' : 'transparent',
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          marginLeft: hovering ? -26 : -18,
          marginTop: hovering ? -26 : -18,
          boxShadow: hovering ? '0 0 22px rgba(51,195,240,0.25)' : 'none',
        }}
      />
    </div>
  );
};
