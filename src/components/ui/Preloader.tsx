import { useEffect, useState } from 'react';

/**
 * Preloader with progress indicator. Resolves when the 3D scene reports ready
 * (`nafarro:scene-ready`) and the window has loaded, with hard timeouts so it
 * can never trap the user on a slow network. Fades out, then unmounts.
 */
export const Preloader = () => {
  const [progress, setProgress] = useState(8);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let windowLoaded = document.readyState === 'complete';
    // Only the home page has a 3D scene to wait for
    let sceneReady = window.location.pathname !== '/';
    let raf = 0;

    const onLoad = () => { windowLoaded = true; };
    const onSceneReady = () => { sceneReady = true; };
    window.addEventListener('load', onLoad);
    window.addEventListener('nafarro:scene-ready', onSceneReady, { once: true });

    // Progress creeps toward 90% while waiting, then jumps to 100% when ready
    const tick = () => {
      setProgress((p) => {
        const cap = windowLoaded && sceneReady ? 100 : 90;
        const next = p < cap ? p + Math.max(0.4, (cap - p) * 0.02) : p;
        return next > 100 ? 100 : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      cancelAnimationFrame(raf);
      setLeaving(true);
      window.setTimeout(() => setGone(true), 650);
    };

    const readyCheck = window.setInterval(() => {
      if (windowLoaded && sceneReady) {
        window.clearInterval(readyCheck);
        window.setTimeout(finish, 250);
      }
    }, 100);

    // Hard cap: never block the site for more than 3.5s
    const escape = window.setTimeout(finish, 3500);

    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('nafarro:scene-ready', onSceneReady);
      window.clearInterval(readyCheck);
      window.clearTimeout(escape);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep transition-opacity duration-500 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="noise-overlay absolute inset-0" />
      <img
        src="/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png"
        alt=""
        className="h-16 w-16 mb-8 animate-pulse-slow"
      />
      <p className="font-display text-xs uppercase tracking-[0.35em] text-[#33c3f0] mb-4">
        Powering the automation core
      </p>
      <div className="h-px w-56 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#0A2463] to-[#33c3f0] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-[#8fa6bf] tabular-nums">{Math.round(progress)}%</p>
    </div>
  );
};
