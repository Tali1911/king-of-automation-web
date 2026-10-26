import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { AutomationSceneStaticFallback } from './AutomationSceneStaticFallback';

// The heavy scene chunk loads only on capable devices
const AutomationScene = lazy(() =>
  import('./AutomationScene').then((m) => ({ default: m.AutomationScene }))
);

/**
 * Hero 3D canvas wrapper.
 * - Lazy-loads the WebGL scene as its own chunk.
 * - Graceful degradation: static fallback for reduced-motion or no WebGL,
 *   lighter scene on low-power devices (handled inside AutomationScene).
 * - Pauses the render loop when the hero scrolls out of view.
 * - Signals the preloader via `nafarro:scene-ready`.
 */
export const HeroCanvas = () => {
  const { prefersReducedMotion, webglSupported } = useDeviceCapability();
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defer canvas mount to idle so first paint is instant
    const id = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const useStatic = prefersReducedMotion || !webglSupported;

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      // Decorative — never intercepts clicks meant for the content above
      style={{ pointerEvents: 'none' }}
    >
      {useStatic ? (
        <AutomationSceneStaticFallback />
      ) : (
        mounted && (
          <Suspense fallback={<AutomationSceneStaticFallback />}>
            <AutomationScene active={inView} />
          </Suspense>
        )
      )}
    </div>
  );
};
