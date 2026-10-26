/**
 * CSS-only fallback for the hero scene: layered radial gradients,
 * blurred glow orbs and a static decorative node network.
 * Used when WebGL is unsupported or the user prefers reduced motion.
 */
export const AutomationSceneStaticFallback = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(10,36,99,0.55), transparent 70%), radial-gradient(ellipse 40% 35% at 70% 60%, rgba(51,195,240,0.12), transparent 70%)',
      }}
    />
    <div
      className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
      style={{ background: 'rgba(51,195,240,0.10)' }}
    />
    <svg
      className="absolute inset-0 h-full w-full opacity-25"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#3e92cc" strokeOpacity="0.35" strokeWidth="1">
        <line x1="200" y1="180" x2="480" y2="320" />
        <line x1="480" y1="320" x2="760" y2="200" />
        <line x1="760" y1="200" x2="980" y2="420" />
        <line x1="480" y1="320" x2="600" y2="560" />
        <line x1="600" y1="560" x2="900" y2="640" />
        <line x1="200" y1="180" x2="300" y2="520" />
        <line x1="300" y1="520" x2="600" y2="560" />
      </g>
      <g fill="#33c3f0">
        {[
          [200, 180], [480, 320], [760, 200], [980, 420], [600, 560], [900, 640], [300, 520],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i === 1 ? 8 : 5} fillOpacity="0.7" />
        ))}
      </g>
      <circle cx="480" cy="320" r="34" fill="none" stroke="#33c3f0" strokeOpacity="0.5" />
      <circle cx="480" cy="320" r="58" fill="none" stroke="#33c3f0" strokeOpacity="0.2" />
    </svg>
  </div>
);
