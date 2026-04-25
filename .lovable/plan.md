
# Haven Creek — Home Page & Chrome, Fantasy-grade Build

## Reality check first

`Index.tsx` is currently a placeholder ("Build in progress — full page returning shortly"). There is no Navigation, no Footer, no Hero — none of the actual home page exists. So "upgrade the design" means **build the Home page (and the chrome it sits inside) to a Fantasy.co caliber from the clean, performance-tuned foundation we just laid**.

Everything below honors three non-negotiables already established:
- The brand spec (1.3, 1.5, 2.1, 2.2, 2.3) — rural-refined, trust-first, calm, editorial restraint.
- Your performance work — variable Fraunces (400 / 1,300 only), Inter, lazy routes, WebP logos, useLayoutEffect scroll, no bloat.
- "Quiet confidence." No glassmorphism, no gradients-on-gradients, no fake luxury, no urgency theater.

---

## The design thesis (what makes this feel Fantasy-grade, not "another contractor site")

Fantasy's signature isn't motion or colors — it's **editorial confidence**. Long sentences are short. Sections that other sites scream, this site whispers. Negative space is treated as a material, not a leftover. Every interaction has a reason. Every image is earned.

For Haven Creek that translates into five composition rules I'll apply everywhere:

1. **Numeral-led editorial structure.** Sections marked I · II · III in a tiny serif numeral, hairline rule, then a small uppercase eyebrow — the same masthead language a thoughtful magazine uses. This is already in `SectionHeader.tsx`; we'll lean into it harder.
2. **Asymmetric two-column rhythm.** Headlines occupy a 7-col column, body copy a 5-col column offset below — not centered, not full-bleed. This single choice is what separates "editorial" from "marketing slide."
3. **One signature visual moment per scroll.** Hero, first project card, full-circle approach, and final CTA each get one bespoke detail nobody else has. Not four heroes — one hero, three quiet surprises.
4. **Type as the primary visual.** Fraunces variable italic at large sizes, with optical kerning, hanging punctuation, and pull-quote treatments — typography carries the brand more than any image will.
5. **Motion ≤ 280ms, only where it earns trust.** Reveal-up on scroll, hairline-grow on hover, image scale 1.02 on card hover. Nothing parallaxes. Nothing bounces. Reduced-motion fully honored (already wired in `index.css`).

---

## What gets built (six deliverables, one focused pass)

### 1. `Navigation.tsx` — the masthead

Top of every page. Sticky, paper-thin (1px hairline border on scroll, no shadow). 64px tall, 80px on desktop.

- **Left:** Haven Creek horizontal WebP logo (already optimized, ~32 KB), 28px tall, links home.
- **Center (desktop only):** Six restrained nav links in `text-minimal` (11px, letter-spaced 0.22em uppercase) — Work · Services · Service Areas · About · Contact. Underline grows from left on hover (300ms). Active route gets a 1px evergreen rule below the label.
- **Right:** Single ghost CTA "Request a Consultation" → `/contact`. On scroll-down past 80px, it solidifies into a small primary chip (the only motion in the bar).
- **Mobile:** Hamburger → full-screen sheet (Radix `Sheet` already installed). Nav items stack as large serif italic Fraunces — the menu becomes a small editorial moment, not a checklist.
- Skip-to-content link for a11y. Focus-visible ring on every interactive element.

### 2. `Footer.tsx` — the closing page

Three editorial blocks across desktop, stacked on mobile. Off-white `--card` background, hairline top border in evergreen/30.

- **Left:** Logo mark + the line "One trusted contractor for the property you value." in serif italic.
- **Middle:** Two thin columns — Services / Service Areas — quiet text links.
- **Right:** Contact line ("Talk through your property — we'll respond within two business days."), email, phone, ghost CTA "Request a Consultation."
- **Bottom rule:** Tiny copyright + a single hairline `divider-line` (already in CSS) above. No social icons unless you want them — Haven Creek's audience doesn't live there.

### 3. `Hero.tsx` (Index hero) — the signature opening

Per the wireframe spec, this must answer "Can I trust this person on my property?" in five seconds. The layout is a 12-col asymmetric grid:

- **Cols 1–6 (left, vertically centered):**
  - Tiny eyebrow: `EST. ALBERTA · RURAL HOMES` (numeral mark + hairline + label, exact pattern from `SectionHeader`).
  - **Headline** in Fraunces 400, fluid `clamp(2.75rem, 5vw + 1rem, 5.75rem)`: "Trusted renovations for rural homes." — italic Fraunces on the word "Trusted" only, as the signature typographic gesture. (Knowledge §2.1: this exact 35-char headline is mandated.)
  - Subhead in Fraunces 300 italic: "Hands-on finishing, repairs, and decks — from planning to completion."
  - CTA pair using existing `PrimaryCTA`: primary "Request a Consultation" + secondary "View Our Work."
  - Microcopy below in `text-minimal text-muted-foreground`: "No pressure. Just a clear conversation about your property."
  - Trust line: "Serving Bragg Creek · Rocky View County · Bearspaw · Water Valley" — the four areas as middle-dot-separated chips, evergreen on hover.
- **Cols 7–12 (right):** Per knowledge §2.1, since real photography hasn't arrived yet, we build the **mandated fallback as a feature, not a placeholder**:
  - Warm off-white panel with the Haven Creek monogram WebP at low opacity (8%) as a watermark.
  - Three small proof chips stacked: `I — Interior Finishing` / `II — Exterior Repairs` / `III — Decking`, each with a one-line caption. Hairline borders, hover lifts 1px.
  - A subtle vertical evergreen line on the left edge of the panel — the "creek" suggestion, never said out loud.
  - When real hero photography arrives later, the panel swaps to a single image with `fetchpriority="high"` + `decoding="async"` and the chips slide below.
- **Below the fold:** A single small chevron + "Continue" in `text-minimal` — gentle, not a giant "scroll" badge.

This hero alone is 70% of the first impression. It's intentionally quiet on motion: the entire section reveals once with `reveal-up`, staggered 60ms between elements. Nothing parallaxes.

### 4. Home sections (the body of `Index.tsx`)

Six sections, each one numeral-led, each with the asymmetric 7/5 rhythm. Generous vertical spacing — `py-24 md:py-32` minimum between sections (this is the "acreage living, distance, air" feeling from §2.3 §15).

- **§ I — Trust Promise.** Numeral I, eyebrow "THE PROMISE", headline "One contractor. One relationship. A clearer path from idea to completion." Three short paragraphs offset right, no icons, no cards — just typography breathing.
- **§ II — Services Preview.** Three editorial cards built on `card-soft` (already in CSS). Each card: numeral, service name in Fraunces, one-line promise, 2–3 sentence body, ghost link "See the work →." Pulled from `src/data/services.ts`. Hover: border shifts to evergreen/45, hairline below the title grows from 24px → 56px (300ms). No image yet — captions and type carry it. Interior Finishing visually weighted slightly heavier (it's the flagship per §2.2).
- **§ III — Full-Circle Approach.** This is **signature visual moment #2**. Instead of a horizontal "1-2-3" timeline (every contractor site has one), we render it as a vertical editorial path: three numbered moments — Conversation · Planning · Hands-On Completion — connected by a single 1px evergreen line that draws itself on scroll-into-view (300ms, reduced-motion safe). Each step is a Fraunces title + one sentence. Quiet, deliberate, slow.
- **§ IV — Project Gallery Preview.** Three projects from `src/data/projects.ts`, rendered as `card-project` (already in CSS). Each card: warm caption-led tile (no fake luxury stock — explicit per §1.5 dealbreakers), category eyebrow, location, project title in Fraunces, scope sentence. When real images arrive, they slot in with `loading="lazy" decoding="async"` and the existing 1.02× scale-on-hover. Footer link: "See all work →."
- **§ V — Service Areas.** A single quiet row: four area names in large Fraunces, each linking to its area page, with the `shortLine` from the data file as a small caption beneath. Hovering an area name reveals a hairline rule and a small chevron — invitation, not announcement. This is **signature visual moment #3**: locality expressed through editorial restraint, not a map.
- **§ VI — Final CTA.** Full-bleed warm card section. Headline in Fraunces: "Ready to talk through your next property improvement?" Four bullet lines (the value recap from §2.1). Primary CTA + ghost CTA "Talk Through Your Project." Microcopy: "Custom quotes based on your property, scope, and timeline."

### 5. Tiny supporting components (extracted, reusable)

- `Container.tsx` — `max-w-[1280px] mx-auto px-6 md:px-10` — single source of truth for content width. Per §2.1: max 1180–1280px.
- `Eyebrow.tsx` — wraps the numeral + hairline + label trio so we use it identically across all sections (currently inlined in `SectionHeader`).
- `JsonLd` already exists — wire LocalBusiness + Breadcrumb schema into `Index.tsx`.

### 6. Two small polish moves on what already exists

- `index.css`: Add `.text-display-italic` utility for the hero "Trusted" word — Fraunces italic at the same fluid size as `.text-display`, with optical-size shift via `font-variation-settings: "opsz" 144` (free, no extra payload — we already loaded the variable axis we need).
- `Index.tsx`: Add `<JsonLd>` and `useDocumentTitle` for proper SEO from page one.

---

## Performance discipline (preserve everything we just earned)

- **Zero new asset weight.** No new images, no new fonts, no new icon sets. Lucide icons (already a dep) only — `ArrowRight`, `ChevronDown`, `Menu`, `X`. Nothing else.
- **Hero is fully eager** (it's the LCP). Every section below the hero gets `content-visibility: auto` + `contain-intrinsic-size` per the existing performance memory.
- **Motion gated by `prefers-reduced-motion`** — already wired globally in `index.css`. New scroll-triggered reveals use `IntersectionObserver` with `once: true` + 12% threshold, never `requestAnimationFrame` loops.
- **Navigation scroll listener** is passive + throttled with `requestAnimationFrame`. Single listener, removed on unmount.
- **No new npm dependencies.** Everything uses what's already installed (Radix, lucide-react, react-router-dom).
- Estimated impact: Home page JS adds ~6–8 KB gzipped over current placeholder. No change to font payload, no change to image payload.

---

## Accessibility & a11y discipline

- Every interactive element ≥ 44×44 touch target (already in PrimaryCTA).
- Every section has a unique `id` + `aria-labelledby` pointing at its heading.
- Skip-to-content link in Navigation.
- Mobile sheet traps focus, restores on close, Escape closes.
- Color contrast: foreground/background already passes AAA at body size, AA at minimum size — verified against the tokens in `index.css`.
- No motion ever blocks comprehension; reduced-motion drops every transform/opacity transition to 0.01ms (already global).

---

## What I will NOT do (boundary check, per your prompt)

- No carousels, no auto-rotating heroes, no video backgrounds.
- No fake testimonials. Use "project proof captions" per §2.1 until real testimonials exist.
- No urgency badges, no countdowns, no "limited spots."
- No stock photography of generic luxury interiors. The fallback hero IS the design until real photos arrive.
- No dark mode toggle (per existing memory: single light mode).
- No new color introductions — the evergreen + warm off-white + charcoal palette stays untouched.
- No Navigation/Footer redesign every page — they're built once, used everywhere.

---

## Order of operations (one focused implementation pass after approval)

1. `Container.tsx` + `Eyebrow.tsx` (5 min, foundation).
2. `.text-display-italic` utility in `index.css`.
3. `Navigation.tsx` (desktop + mobile sheet).
4. `Footer.tsx`.
5. `Hero.tsx` with the editorial fallback panel.
6. The six home sections inline in `Index.tsx`, in order.
7. Wire `<Navigation />` + `<Footer />` into `App.tsx` so every route inherits them (placeholder pages stay valid).
8. Smoke-test the build, walk through reduced-motion, walk through mobile breakpoints in code (375 / 768 / 1280).

After this lands, the natural next moves (separate passes — not part of this plan):
- Real hero photography integration when supplied.
- The narrative copy elevation pass (your storyteller prompt) — Home first.
- The other page builds (About, Services, Work, Areas, Contact).

---

## Why this is the right move now

You said "upgrade the design" — but the truthful read of the codebase is that the design hasn't been built yet, only its tokens and chrome-less performance shell. Trying to "upgrade" a placeholder would mean inventing decoration. The Fantasy-grade move is to **finally build the Home page properly, the first time**, with editorial restraint as the differentiator, and to do it without spending one byte of the performance budget you just earned.

Approve and I'll execute the eight steps above in a single disciplined pass.
