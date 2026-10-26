# FUNCTIONALITY.md — Redesign Contract

Every item below MUST work exactly as before after the 3D showpiece redesign.
Restyle the UI layer only: no business logic, data shape, or endpoint changes.

## Routes (public shell: NavBar + Footer + Chatbot + ServiceCalculator + WebsiteGuide + PageTracker)
- [ ] `/` HomePage — Problems, Services, WhyChooseUs+Who-We-Help, Pricing, TechStack, Testimonials, ServiceBooking, RelatedPosts, FAQ, ContactCTA, QuoteRequestModal
- [ ] `/about`, `/services`, `/portfolio`, `/contact`, `/consultation`, `/blog`, `/blog/:id` (slug or id; missing/unpublished → redirect `/blog`), `/unsubscribe`, `/privacy-policy`, `/terms-of-service`, `/services/web-development`, `/services/automation`, `/services/data-analysis`, `*` → NotFound
- [ ] Admin (untouched by redesign, stays light): `/admin/login`, `/admin`, `/admin/content` (+ pages/:pageId), `/admin/users`, `/admin/settings`; ProtectedAdminRoute redirect + RBAC preserved

## Forms & submission handlers
- [ ] Contact form → `mailto:` with URL-encoded subject/body to CMS-configured email (no API)
- [ ] ConsultationBooking → `send-consultation-request` edge fn; success confirmation screen; Book Another resets
- [ ] QuoteRequestModal → `send-quote-request`; Zod validation, honeypot `website`, 2s fill-time trap, default package, reset on open, toasts
- [ ] ServiceCalculator quote form → `send-quote-request` with service labels + feature names; success step
- [ ] NewsletterSignup → `newsletter-subscribe`; Zod email, honeypot, formLoadedAt, browser throttle (3/10min, key `naffaro-newsletter-attempts`), toasts
- [ ] UnsubscribePage → `newsletter-unsubscribe` with token from query; missing/processing/error/success states
- [ ] Chatbot → local keyword FAQ matching only; typing indicator, auto-scroll; trigger has `data-chatbot-trigger` (WebsiteGuide targets it)

## Integrations (Supabase + Resend) — do not touch endpoints or payloads
- [ ] Edge functions: `send-quote-request`, `send-consultation-request`, `send-invoice-email`, `send-quotation-email`, `track-visit`, `newsletter-subscribe`, `newsletter-unsubscribe`
- [ ] Tables via hooks: `user_roles`, `blog_posts`, `page_content`, `site_settings`, `portfolio_projects`, `portfolio_categories`, `team_members`, `invoices`/`invoice_items`, `quotations`/`quotation_items`, `page_visits`; storage bucket `media`
- [ ] Public content hooks (`usePublicPageContent`) keep driving hero/section copy on home, about, services, portfolio, contact

## Admin workflows (out of redesign scope, must keep working)
- [ ] Admin login (Zod, RBAC sign-out on unauthorized), users/roles management, settings persistence
- [ ] Blog/portfolio/team/pages CMS editing, TipTap rich text, RenderHtml/HtmlContent display
- [ ] Invoice & quotation editors, PDF downloads (jspdf), email actions, quotation→invoice conversion
- [ ] Media library uploads (5MB/image rules), drag-drop portfolio reorder (dnd-kit), publish toggles

## Behaviors & state
- [ ] PageTracker: pathname changes only, skips `/admin`; failures never block navigation
- [ ] localStorage: `naffaro-guide-seen` (footer "Restart Tour" clears + reloads), `naffaro-newsletter-attempts`, `theme` (DarkModeToggle unmounted — leave as is)
- [ ] WebsiteGuide tour: welcome → spotlight calculator steps → finish/skip; footer restart works
- [ ] Scroll-to-top on page changes; blog post id change scrolls top
- [ ] CMS "Coming Soon" states for Data Analysis (home services + services page)

## SEO & static assets — keep intact
- [ ] `SEO` component props per page exactly as listed in audit (titles, descriptions, keywords, canonicals, ogType article on blog posts, JSON-LD schemas incl. Organization/FAQ/Service/BlogPosting/Breadcrumb)
- [ ] `index.html` head meta, favicon, RSS autodiscovery link, ProfessionalService JSON-LD, `<noscript>` content + gptengineer script
- [ ] `public/`: robots.txt, sitemap.xml, rss.xml, llms.txt, `_redirects` (with pass-throughs for SEO files)

## New design infrastructure (additions — must not break the above)
- [ ] 3D canvas lazy-loaded, Suspense, DPR capped ≤2, instanced particles/nodes
- [ ] Fallbacks: reduced-motion → static; mobile/low-power → lighter scene; no WebGL → static gradient
- [ ] Canvas aria-hidden, pointer-events none behind content; keyboard nav & focus states preserved
- [ ] Admin routes stay light-themed (dark tokens scoped to public `.dark` wrapper only)
