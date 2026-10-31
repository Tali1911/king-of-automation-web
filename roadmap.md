# Roadmap: 3D/WebGL Showpiece Redesign

## Phase 1 — Audit (done)
- [x] Explore agent: functional inventory (routes, forms, integrations, auth, tracking, SEO)
- [x] Write FUNCTIONALITY.md checklist (the contract)
- [x] Report design system + content to user

## Phase 2 — Design direction
- [ ] Dark premium theme tokens (near-black bg, navy #0A2463 + cyan #33C3F0 accents, glass panels, noise)
- [ ] Typography: display + body fonts

## Phase 3 — Dependencies
- [ ] three, @react-three/fiber@^8.18, @react-three/drei@^9.122, @react-three/postprocessing@^2, gsap, lenis

## Phase 4 — Build (restyle only; zero functional changes)
- [ ] Infrastructure: SceneCanvas (lazy), shaders, custom cursor, Preloader, ScrollProgress, hooks (mouse, reduced-motion, webgl support)
- [ ] NavBar glass restyle, Footer restyle
- [ ] Hero: full-screen 3D node-network + GLSL particle field, mouse-reactive
- [ ] Home sections restyle (Problems, Services, WhyChooseUs, Pricing, TechStack, Testimonials, ContactCTA)
- [ ] QuoteRequestModal, ServiceCalculator, WebsiteGuide, Chatbot, ServiceBooking, ConsultationBooking, FAQ, RelatedPosts/Services restyle
- [ ] About, Services, Portfolio, Contact, Consultation, Blog, BlogPost, NotFound + service detail pages restyle
- [ ] Scroll storytelling: GSAP ScrollTrigger reveals, parallax; Lenis smooth scroll
- [ ] Page transitions between routes; preloader with progress

## Phase 5 — Constraints
- [ ] Admin portal untouched; no logic/data/endpoint changes
- [ ] Performance: lazy 3D, DPR cap, instancing, 60fps target
- [ ] Graceful degradation: mobile/low-power fallback, prefers-reduced-motion, WebGL fallback
- [ ] A11y: contrast, keyboard, focus, aria-hidden canvas
- [ ] Responsive 360px+; SEO tags intact

## Phase 6 — Verify
- [ ] Build + lint clean
- [ ] FUNCTIONALITY.md walkthrough (forms, API calls)
- [ ] Lighthouse perf check + report
- [ ] Summary of changes

## Notes
- Git: cannot run stateful git commands (branch/commit) per environment rules — changes applied directly; noted to user.
