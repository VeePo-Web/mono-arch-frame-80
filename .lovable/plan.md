# Plan — Rebuild First, Then Elevate Copy (Home page first)

You confirmed: **pause copy work, ship the Haven Creek rebuild, then elevate copy starting with Home**. This plan splits into two distinct phases. I will execute Phase 1 fully before touching Phase 2 — and Phase 2 is **copy-only**, no design changes, exactly as your prompt requires.

The `/knowledge/` layer governs every decision. Tier 0 (`1.3-client-design-preferences.md`) and `2.2-page-by-page-copy-plan.md` are the authoritative filters: calm, rural, trust-first, three services only, no hype words ("best", "luxury", "book now", "stress-free magic", etc.).

---

## PHASE 1 — Haven Creek Rebuild (structure & shell only)

Goal: get the site into Haven Creek's bones so the copy pass has the right scaffolding to refine. Copy in this phase is **functional placeholder** drawn directly from `2.2`'s arc — clean and on-brand, but not yet narrative-elevated. Phase 2 is where the soul goes in.

### 1.1 Brand foundation
- **Logos**: copy Haven Creek logo package out of `user-uploads://haven_creek_logo_package.zip` into `src/assets/logo/` (primary, mark, monochrome variants). Wire into `Navigation` and `Footer`.
- **Design tokens** (`src/index.css`, `tailwind.config.ts`): replace cedar/sauna palette with Haven Creek tokens — Muted Evergreen `145 18% 28%`, Charcoal `20 8% 14%`, Warm Off-White `36 25% 97%`, supporting neutrals. Single light mode only (per memory).
- **Typography**: load **Fraunces** (headings) + **Inter** (body). Remove DM Serif Display references. Update `tailwind.config.ts` font families.
- **Document title + meta**: rename `BASE_TITLE` in `useDocumentTitle.ts` to "Haven Creek Renovations". Update `index.html` `<title>`, meta description, Open Graph, favicon.
- **JSON-LD** (`JsonLd.tsx`): replace LocalBusiness data — name, services (Interior Finishing, Exterior Finishing & Repairs, Decking), service areas (Bragg Creek, Rocky View County, Bearspaw, Water Valley).

### 1.2 Routing (`src/App.tsx`)
Replace sauna routes with Haven Creek's information architecture from `2.2`:
- `/` → Home
- `/about` → About
- `/services` → Services overview
- `/services/interior-finishing`, `/services/exterior-finishing`, `/services/decking` → service detail pages
- `/work` → Project gallery
- `/service-areas` (+ subpages for Bragg Creek, Rocky View County, Bearspaw, Water Valley)
- `/contact` → Request a Consultation
- Remove `/signature`, `/custom`, `/standard`, `/plan`, `/resources` sauna routes.

### 1.3 Component rewrite (structure + placeholder copy)
- **Delete sauna-specific files**: `TemperatureTicker.tsx`, `useAlbertaTemp.ts`, `useSeason.ts`, `RitualIdentity.tsx`, `LifeAfterFirstHeat.tsx`, sauna hero parallax extras.
- **Rename**: `CedarCTA.tsx` → `PrimaryCTA.tsx` (semantic, not material-named). Update all imports.
- **Rebuild**:
  - `Hero.tsx` — calm rural hero, single primary CTA "Request a Consultation", secondary "View Our Work".
  - `Services.tsx` — three services in the order 2.2 mandates (Interior first).
  - `About.tsx` — hands-on, property-respect placeholder.
  - `Portfolio.tsx` → `ProjectGallery.tsx` — real-photo grid scaffold.
  - `Testimonials.tsx` — keep structure, neutralize sauna copy to renovation context.
  - `Contact.tsx` — Consultation form with fields: name, email, phone, property location, project type (Interior / Exterior / Decking / Multiple), timeline, brief description, preferred contact method.
  - `Footer.tsx` — Haven Creek mark, service areas, contact, simple nav.
- **Remove sauna assets** from imports (we keep the files on disk for now; deletion can come after Phase 2).

### 1.4 Lovable Cloud — consultation form backend
- Enable Lovable Cloud.
- Create `consultation_requests` table: `id`, `created_at`, `name`, `email`, `phone`, `property_location`, `project_type`, `timeline`, `description`, `preferred_contact`, `status` (default `new`).
- RLS: insert allowed for anon (so the public form works); select restricted to authenticated admins only.
- Edge function `send-consultation-confirmation`: emails the homeowner a calm confirmation + notifies the business inbox. Uses Resend via `RESEND_API_KEY` (will prompt you for the key when needed).
- Form wires through Supabase client + react-hook-form + zod validation.

### 1.5 Memory updates
- Update `mem://index.md` Core rules: replace "cedar" palette + "DM Serif Display" with Haven Creek tokens + Fraunces/Inter.
- Archive sauna-specific memories (`hero-ux-cinematics`, `thermal-crescendo-pattern`, `interaction-warmth-principle`) — replace with Haven Creek equivalents grounded in 1.3 ("calm, grounded, confidence-building").
- Rename `core-design-system` reference: `CedarCTA` → `PrimaryCTA`.

**Phase 1 acceptance:** site loads as Haven Creek end-to-end, all routes work, consultation form submits to Cloud and triggers confirmation email, no remaining sauna words/imagery in user-facing UI, knowledge layer untouched.

---

## PHASE 2 — Narrative Elevation Pass (Home page, copy only)

Per your prompt: **zero design changes**, one page at a time, theme first then section by section. We start with **Home**.

### 2.1 Establish the Home page narrative theme (before writing)
Anchored to `2.2` Page 1 brief + `1.3` first-impression goal ("Confidence"):
- **Core question the page must answer in <5 seconds:** *"Can I trust this person on my property?"*
- **Narrative arc (problem → empathy → insight → transformation → proof):**
  1. Problem — rural homeowners get burned by contractors who don't respect the property, disappear mid-job, or hand off to subs.
  2. Empathy — we name that experience plainly.
  3. Insight — one hands-on partner across planning, structural, finishing, exterior is the difference.
  4. Transformation — your property gets cared for the way you'd care for it.
  5. Proof — real projects, real captions explaining the work, named service areas.
- **Voice:** calm, direct, warm, grounded, mature. Reads like a quiet handshake, not a pitch.
- **Banned vocabulary** (from 2.2): "best", "luxury", "top-rated", "book now", "limited spots", "dream home", "stress-free magic", "fast and affordable".

### 2.2 Section-by-section rewrite (Home only, in order)
For each section I will: (a) read the current placeholder copy, (b) keep the same fields/lengths/structure so design is untouched, (c) rewrite headings, body, microcopy, CTA labels, alt text, aria-labels. No component, layout, spacing, color, or class change.

1. **Hero** — headline, subhead, primary CTA, secondary CTA, supporting microcopy.
2. **Trust Promise** — section heading, lead paragraph, the three trust beats (hands-on, fewer handoffs, property respect).
3. **Services Preview** — section heading, three service cards (Interior first), card CTAs.
4. **Full-Circle Approach** — section heading, the "one contractor across planning → finishing" narrative.
5. **Project Gallery Preview** — section heading, project captions (each caption explains the *work*, not just labels the room).
6. **Service Areas** — section heading, the four named areas with one-line context each.
7. **Final CTA** — calm consultation invitation, supporting line, button label.
8. **Footer** — tagline, nav labels, contact line, legal microcopy.

After Home ships, you approve, and we move to About → Services → Service detail pages → Project Gallery → Service Areas → Contact, in that order.

### 2.3 Phase 2 guardrails (non-negotiable)
- No JSX structural changes. No className changes. No new components. No removed components.
- No new images, no image swaps, no token changes.
- Only string literals, JSX text nodes, `alt`, `aria-label`, `title`, meta descriptions, and JSON-LD `description` fields are touched.
- Each section gets a brief rationale in the chat reply (what the old copy did, what the new copy does, which knowledge doc governed the choice) so you can review intent, not just words.

---

## What I need from you to start Phase 1
Approving this plan is enough. When I switch to default mode I will:
1. Ask once for the **business email + phone** to wire into Footer/Contact/JSON-LD (these aren't in the knowledge docs).
2. Ask once for **Resend API key** when the edge function is created (or skip email and just store submissions if you'd rather wait).

Everything else is fully specified by the knowledge layer.