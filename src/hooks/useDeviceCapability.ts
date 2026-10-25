import { useEffect, useState } from 'react';

export type DeviceCapability = {
  /** User prefers reduced motion — disable heavy animation */
  prefersReducedMotion: boolean;
  /** Phone-sized or touch-primary device — lighter scene */
  isLowPower: boolean;
  /** WebGL is available at all */
  webglSupported: boolean;
};

function detect(): DeviceCapability {
  if (typeof window === 'undefined') {
    return { prefersReducedMotion: false, isLowPower: true, webglSupported: false };
  }
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const isTouchOnly = window.matchMedia('(pointer: coarse) and (hover: none)').matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  const isLowPower = isMobile && (isTouchOnly || cores <= 4);

  let webglSupported = false;
  try {
    const canvas = document.createElement('canvas');
    webglSupported = Boolean(
      canvas.getContext('webgl2') || canvas.getContext('webgl')
    );
  } catch {
    webglSupported = false;
  }

  return { prefersReducedMotion, isLowPower, webglSupported };
}

/**
 * Detects the current device's animation capabilities once on mount.
 * Used to degrade the 3D experience gracefully (reduced-motion, mobile, no WebGL).
 */
export function useDeviceCapability(): DeviceCapability {
  const [cap, setCap] = useState<DeviceCapability>(detect);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setCap(detect());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return cap;
}
