# AGENTS.md

- Public site uses a dark theme scoped by `.dark` (wrapper + `<html>` class while public routes mount); admin routes must stay light — never apply dark styles globally. Why: admin UI was not redesigned.
- Tailwind `primary/secondary/muted/accent` resolve to `--brand-*` CSS vars (light = original brand hex, dark = public palette); change colors via those vars, not hex in config. Why: one token drives both themes.
- Legacy light utilities (bg-white, text-gray-*, etc.) are remapped under `.dark` in `src/index.css`; prefer semantic tokens in new markup. Why: restyle without touching page logic.
- R3F/postprocessing/drei elements not in lovable-tagger's skip list (e.g. EffectComposer, Bloom, MeshDistortMaterial) must be created with `createElement`, not JSX. Why: the dev tagger injects `data-lov-*` props that crash three's applyProps.
- 3D scene lives in `src/components/three/`, lazy-loaded, with device/reduced-motion/WebGL fallbacks; the canvas is decorative (aria-hidden, pointer-events none). Why: performance and accessibility.
- FUNCTIONALITY.md is the regression contract for the redesign; keep forms, endpoints and data shapes unchanged.
