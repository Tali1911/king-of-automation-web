# Home Page Rewrite — Plain-English Value Proposition

Goal: Rewrite the **public landing page copy only** so any non-technical visitor instantly understands what NafArro does, the problems it solves, who it's for, and why to pick us. Tone: **bold, confident, jargon-free**. Speed and pricing are the differentiators.

No design overhaul, no new sections moved around — just copy + one new "Who We Help" + "Problems We Solve" section in place of generic blocks.

---

## 1. Hero Section (`HeroSection.tsx`)
Replace generic title/subtitle with punchy positioning.

- **Title (H1):** `Put Your Business on Auto-Pilot`
- **Slogan (H2):** `King of Automation`
- **Subtitle:** `We build websites and smart tools that run the boring parts of your business for you — emails, invoices, leads, payments, content updates. So you can stop doing repetitive work and focus on growing.`
- **Primary CTA:** `Get a Free Quote` → `/contact`
- **Secondary CTA:** `See What We Build` → `/services`

CMS keys stay the same (`hero_title`, `hero_slogan`, `hero_subtitle`, `hero_cta_primary`, `hero_cta_secondary`) — only the default fallback strings change.

## 2. NEW: "Problems We Solve" Section
New component `ProblemsSection.tsx` inserted between Hero and Services. Plain-language pain points in a 2x3 card grid:

1. **Drowning in repetitive tasks** — copying data between apps, sending the same emails, chasing invoices.
2. **Losing data across too many platforms** — info scattered across spreadsheets, inboxes, and tools that don't talk to each other.
3. **Paying too much for software** — expensive subscriptions for email marketing, CRM, and automation you could own outright.
4. **A website that's costing you customers** — slow, outdated, hard to update, invisible on Google.
5. **Stuck calling a developer for tiny changes** — every text tweak becomes a project. You need a site you can edit yourself.
6. **No clue what your numbers are telling you** — data sitting in files instead of guiding decisions.

Heading: `Sound Familiar?` · Subhead: `These are the headaches we erase, every day.`

## 3. Services Section (`ServicesSection.tsx`)
Rewrite service blurbs in outcome language. CMS keys unchanged.

- **Section title:** `What We Build For You`
- **Subtitle:** `Custom-built tools that work while you sleep — no monthly platform fees, no limits, fully yours.`
- **Website Development:** `A fast, beautiful website you can update yourself. Built to be found on Google and turn visitors into customers.`
- **Web Applications & Automation:** `Custom systems that handle your emails, CRM, invoices, payments, and content — automatically. Replace 5 expensive subscriptions with one tool built for you.`
- **Data Analysis:** `Turn your spreadsheets and reports into clear answers, so you actually know what's working in your business.`

## 4. Why Choose Us (`WhyChooseUsSection.tsx`)
Reframe around the chosen differentiators (speed, price, ownership, partnership).

- **Title:** `Why Founders Choose NafArro`
- **Subtitle:** `Bold work, honest pricing, and speed you can feel.`
- **Four reasons:**
  1. **Built Fast** — Most projects launch in weeks, not months.
  2. **Honest Pricing** — Pay once, own forever. No surprise subscription fees.
  3. **You Stay In Control** — Every site comes with a simple admin panel so you can edit anything yourself.
  4. **A Real Partner** — Direct line to the team that built it. No tickets, no call centers.

## 5. NEW: "Who We Help" mini-section
Short band inside `WhyChooseUsSection` (or new `WhoWeHelpSection.tsx`) — one line + three pill tags:

> **From solo founders to growing enterprises, anywhere in the world.**
> If your business runs on repetitive work, we can automate it.

Tags: `Solo Entrepreneurs` · `SMEs` · `Enterprises` · `Remote-friendly · Global delivery`

## 6. SEO Meta (`HomePage.tsx`)
Update `<SEO>` props to match new positioning:

- **Title:** `Put Your Business on Auto-Pilot | NafArro Solutions`
- **Description:** `Custom websites and automation tools that handle emails, CRM, invoices, and content for you. Built fast. Honest pricing. Yours forever.`
- **Keywords:** add `business automation, CRM automation, email automation, custom CMS, replace expensive software`

---

## Files to Touch
- `src/components/home/HeroSection.tsx` — copy only
- `src/components/home/ServicesSection.tsx` — copy only
- `src/components/home/WhyChooseUsSection.tsx` — copy + add Who We Help band
- `src/components/home/ProblemsSection.tsx` — **new**
- `src/pages/HomePage.tsx` — import + place `ProblemsSection`, update SEO

## Out of Scope
- No changes to backend, CMS schema, or other pages
- No design system or color changes
- No new images (uses existing lucide icons)
- Existing CMS overrides via `usePublicPageContent` continue to win — defaults change only
