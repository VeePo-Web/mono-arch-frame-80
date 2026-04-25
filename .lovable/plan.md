## Goal

Replace the 13 stub pages ("Coming soon.") with fully-composed, world-class editorial bodies that match the home page's visual language — Double-Bezel cards, Eyebrow numerals, surveyor coordinates, plaster wash sections, hand-drawn vignettes, reveal cascades — and the calm, rural, trust-first voice from `knowledge/2.2`.

Every page will share one consistent skeleton:

1. **SubPageHero** — fixed pattern: Eyebrow numeral · coord-mark · headline (`text-display`/`text-headline`) · supporting paragraph · primary + ghost CTA pair · Page-Slug update via `useSeo`. Uses the existing radial-bloom + reveal-up scaffolding from `Hero.tsx`.
2. **Editorial body sections** wrapped in a local `RevealSection` (lifted pattern from `Index.tsx`) using `Container`, `Eyebrow`, `PremiumCard`, `coord-mark`, `figure-footnote`, `numeral-mark`, `area-row`, `path-line`/`surveyor-frame` where appropriate.
3. **Closing CTA band** — quiet evergreen-deep panel mirroring §VI on Home, with a `<Link>` to `/contact` (and on the `/` flow, a lazy-loaded `ConsultationForm` only on `/contact` itself, not every page).
4. **`useSeo` + JSON-LD** — every route gets a unique title, 150–160 char description, canonical, OG tags, and an appropriate schema (`Service`, `BreadcrumbList`, area-scoped LocalBusiness).

No new dependencies. No new design tokens. Reuses every utility class already in `src/index.css`.

---

## Shared scaffolding (one new file)

### `src/components/SubPageHero.tsx` — NEW
A small, reusable hero strip used by every non-home page. Props: `eyebrowNumeral`, `eyebrowLabel`, `coordMark`, `headline` (string with optional `<em>` italic accent), `subhead`, `primaryCta` (`{ to, label }`), `secondaryCta?` (`{ to, label }`), `vignette?` (slot for a side-vignette on Service detail pages). Internally:
- `pt-36 md:pt-44 pb-20 md:pb-28` to clear the floating Nav island
- Soft top-right radial bloom (copied from `Hero.tsx`)
- Editorial 7/5 grid where a `vignette` is provided; else single-column with `max-w-3xl` headline
- Reveal-up cascade with the same delays as the home Hero (0/120/240/380/500ms)
- The headline supports a `decorated` flag that draws the `vignette-stroke` underline beneath one italicized word, matching the home Hero's "Trusted" treatment

This component is the single visual anchor that makes all 13 pages feel like chapters of the same monograph.

---

## Per-page builds

All pages follow this template:

```tsx
const Page = () => {
  useSeo({ title, description, path });
  return (
    <main id="main">
      <ServiceJsonLd … /* or BreadcrumbJsonLd */ />
      <SubPageHero … />
      <RevealSection …>…</RevealSection>
      …
      <ClosingCta />
    </main>
  );
};
```

`RevealSection` and `ClosingCta` are tiny page-local helpers (kept in the file or co-located in `src/components/`) that re-implement the patterns already proven on `Index.tsx`. I'll lift `RevealSection` into `src/components/RevealSection.tsx` so the home page can also import it (mild refactor, zero behavior change).

### 1. `src/pages/About.tsx`
- **SubPageHero** — Eyebrow `I · ABOUT` · headline "A *hands-on* renovation partner for rural properties." · subhead about working style · CTAs: "Talk Through Your Project" → /contact, "See the work" → /work
- **§ I — Working Philosophy** — split-grid: pull-quote `"The experience of quality. The quality of experience."` on the left; right column unpacks the meaning in 2 short paragraphs
- **§ II — Property Respect** — `surveyor-frame` block listing four respect commitments (access, animals/family routines, equipment management, leave-it-better) as numbered field-notes (uses `numeral-disc-survey` and `path-line`, exactly as the Home approach section does)
- **§ III — Hands-On Continuity** — three-column `PremiumCard` row: "Personal involvement", "Fewer handoffs", "Long-term relationship" — each with `numeral-disc` + `card-monogram`
- **§ IV — Long-Term Relationship** — single wide quote-style block on plaster wash explaining phased improvements
- **Closing CTA band**

### 2. `src/pages/Services.tsx`
- **SubPageHero** — Eyebrow `II · SERVICES` · headline "Three services, *held* to one standard." · subhead about focus over breadth
- **§ I — The hierarchy** — three full-width `PremiumCard` rows (not the 3-up grid used on Home — bigger, more editorial here): each card is a 5/7 split with the existing `ProjectVignette` on one side and `numeral-disc` + title + `promise` + extended body + `figure-footnote` on the other. Source data: `src/data/services.ts`
- **§ II — Full-Circle Support** — same `surveyor-frame`/`path-line` treatment as Home §III but with: "One conversation. One contractor. One relationship." as the heading and three labeled steps describing planning, structural/finishing handoff prevention, and walk-through
- **§ III — Custom Quote Explanation** — two-column block: left explains why no fixed pricing (calm, thoughtful tone); right is a `figure-footnote`-style proof line
- **Closing CTA band**

### 3. `src/pages/InteriorFinishing.tsx`
- **SubPageHero** with vignette slot using `<InteriorVignette>` from `ProjectVignette.tsx` inside a `bezel-shell` panel on the right (matches Hero's right-column Bezel)
- **§ I — What interior finishing means** — 7/5 split: heading + one paragraph defining the work; right column is a `figure-footnote` "DETAILS WE OBSESS OVER" + bulleted list (trim, casings, transitions, hardware, baseboard return, edge fit)
- **§ II — Why it matters** — pull-quote: *"This is the part you see and feel every day."*
- **§ III — Craft & detail (close-up captions)** — 3-up `PremiumCard` grid; each card uses `<InteriorVignette>` as the top plate plus `figure-footnote` + 2-sentence detail caption (transitions / edges / fit)
- **§ IV — Project proof** — pulls the one Interior Finishing project from `src/data/projects.ts` rendered as a wide `PremiumCard` with scope/challenge/result/whyItMattered (mirrors home gallery card structure)
- **Closing CTA** with copy "Discuss interior finishing needs."
- `<ServiceJsonLd name="Interior Finishing" description=… />`

### 4. `src/pages/ExteriorFinishing.tsx`
- Same structural template as Interior, with `<ExteriorVignette>`, copy from 2.2 §Page 5: durable improvements / common needs / rural considerations / property respect / project proof.
- "Why property respect matters" rendered as a `surveyor-frame` of bullets: land · driveway · equipment · landscaping · animals · family routines · privacy.

### 5. `src/pages/Decking.tsx`
- Same template, `<DeckingVignette>`, copy from 2.2 §Page 6: practical spaces / planning considerations / rural lifestyle value / materials & scope / project proof.
- Materials & Scope rendered as a 3-up `PremiumCard` grid: "Use & layout", "Site & exposure", "Materials & longevity".

### 6. `src/pages/Work.tsx`
- **SubPageHero** — Eyebrow `IV · THE WORK` · headline "Real properties. Real outcomes. *Worth* a closer look."
- **§ I — Filter rail** — quiet horizontal pill row: All · Interior Finishing · Exterior Repairs · Decking · Locations. **Pure client-side `useState` filter** over `galleryPlates` from `src/data/galleryPlates.ts` plus the three projects from `src/data/projects.ts` merged into one unified array. No URL state, no router params — just a calm filter (matches "no urgency gimmicks" voice).
- **§ II — Plate grid** — full-width 3-up grid of `PremiumCard`s, identical visual structure to Home §IV (Plate roman numeral overlay + `figure-footnote` + scope + "Why it mattered" pull-quote)
- **§ III — Empty state** — when a filter returns 0, a quiet `figure-footnote`-style note: "No plates in this category yet. We're adding work as it's photographed."
- **Closing CTA**

### 7. `src/pages/ServiceAreas.tsx`
- **SubPageHero** — Eyebrow `V · WHERE WE WORK` · headline "Local, *by* choice." · subhead about four communities
- **§ I — Roster** — reuse the exact `area-row` divide-y list pattern from Home §V (with the `coord-mark` and `icon-chip`), iterating over `serviceAreas`. Each row links to the area's detail page.
- **§ II — Rural Fit** — split-grid: heading "Built for rural service" + body about access, weather windows, distance; right column is a 4-row `figure-footnote` list describing how we plan around: drive time · seasonal weather · property access · wildlife/animals
- **Closing CTA**

### 8–11. Area pages — `BraggCreek.tsx`, `RockyView.tsx`, `Bearspaw.tsx`, `WaterValley.tsx`
Single shared layout, copy varies per `serviceAreas[slug].page`:
- **SubPageHero** — Eyebrow `V.{n} · {AREA NAME}` · headline (per-area, drawn from `serviceAreas` + small per-page additions matching 2.2 §Page 10 tone notes — Bearspaw most refined, Water Valley most practical) · `coord-mark` shows the area postal prefix (T0L / T4A / T3R / T0M)
- **§ I — Local context** — wide pull-quote of `serviceAreas[slug].context`, framed in a `surveyor-frame` block
- **§ II — How we serve here** — 3-up `PremiumCard` grid using the three services from `services.ts`, but with area-specific micro-copy lines layered underneath each (e.g. for Bragg Creek interior: "For homes that have been quietly cared for, finishing that holds up to that standard.")
- **§ III — Other nearby areas** — quiet 3-row `area-row` divide-y list of the other three areas (so visitors can hop laterally)
- **Closing CTA** with area-aware copy ("Talk through your Bragg Creek property.")
- Each page emits a `BreadcrumbJsonLd` + a focused `LocalBusinessJsonLd`-style script with `areaServed` narrowed to that single locality.

### 12. `src/pages/Contact.tsx`
- **SubPageHero** — Eyebrow `VI · CONTACT` · headline "Let's *talk through* your property." · subhead that mirrors 2.2 §Page 11 ("This is the beginning of a relationship, not a sales trap.")
- **§ I — Two-column layout**:
  - Left (5/12): "What happens next" numbered list (01 you write · 02 we reply within two business days · 03 we walk the property or talk by phone · 04 we put together a thoughtful quote) with `numeral-mark` and `border-l-2 border-evergreen/35` left rules
  - Right (7/12): a wider `bezel-shell-evergreen` `PremiumCard` containing the existing `<ConsultationForm source="contact_page" />` — same component already on Home, no duplication
- **§ II — Custom quote reassurance** — calm two-paragraph block on plaster wash explaining why pricing is custom (no urgency, no "free quote" energy)
- **§ III — Service-area trust line** — same `divide-y` mini-list of areas served, with postal-prefix `coord-mark`s
- No closing CTA band on this page (the form *is* the CTA — avoids feeling like a funnel).

### 13. `src/pages/ThankYou.tsx`
- **SubPageHero** with reduced top padding — Eyebrow `VII · RECEIVED` (mirrors the "Fig. iv. RECEIVED" footnote pattern in `ConsultationForm`'s success state) · headline "Thank you. *We've got* your note." · subhead with the two-business-day expectation
- **§ I — What happens next** — 3 calm steps as a `surveyor-frame` field-note list
- **§ II — While you wait** — 4 `PremiumCard` tiles linking to /work, /services, /service-areas, /about — each with its `ProjectVignette` or a small `numeral-disc` + label
- **§ III — Quiet sign-off** — single italic Fraunces line on the plaster wash: *"No need to refresh — we'll come to you."*
- No closing CTA (don't restart the funnel after a successful submit). Add `<meta name="robots" content="noindex" />` via `useSeo` extension (small additive change to the hook to support `noindex?: boolean`).

### 14. `src/pages/NotFound.tsx`
- Replace minimal stub with a full editorial 404:
- **SubPageHero** — Eyebrow `· OFF MAP` · oversize "404" tabular-nums numeral as a quiet hero badge · headline "*This* page seems to have wandered off." · subhead about the page being moved or renamed
- **§ I — Where to go** — 3-up `PremiumCard` grid: Home, Services, Work
- **§ II — Or talk to us** — single-row CTA strip with a ghost link to /contact
- Subtle reuse of the home Hero's hand-drawn underline beneath the "404" for visual continuity.

---

## Small supporting changes

1. **`src/hooks/useSeo.ts`** — add optional `noindex?: boolean` parameter that upserts `<meta name="robots" content="noindex,nofollow">` when true (used by ThankYou and NotFound). Backward compatible.
2. **`src/components/JsonLd.tsx`** — no changes needed (all existing components — `LocalBusinessJsonLd`, `BreadcrumbJsonLd`, `ServiceJsonLd`, `WebSiteJsonLd`, `FAQJsonLd` — already cover the required schemas).
3. **Lift `RevealSection`** out of `Index.tsx` into `src/components/RevealSection.tsx` and import it back in Home + every new page. Behavior identical.
4. **`src/components/SubPageHero.tsx`** — new, ~120 lines, uses only existing utility classes.
5. **`public/sitemap.xml`** — already maps all 13 routes from the previous SEO pass; no change needed.

---

## What I will explicitly NOT do

- No new images, photographs, or stock — keeps faith with `1.5 §Dealbreakers` ("no fake luxury stock"). Plate illustration coverage stays on `ProjectVignette` + `GalleryVignette`.
- No new fonts, dependencies, or animation libraries.
- No backend changes. The Contact page reuses the already-wired `ConsultationForm`; no duplicate insert logic.
- No filter URL state on `/work` — pure local React state to keep bundle small and the experience calm.
- No price ranges, "free quote," or urgency language anywhere.
- No carousel/auto-rotating components — every reveal is on viewport intersection only.

---

## Quality bar

- Every page uses `useSeo`, has a unique 150–160 char description, a canonical, and at least one JSON-LD block.
- Every page passes the home page's visual rhyme: `Eyebrow` + `coord-mark` opener; `data-reveal` cascade with `--reveal-delay`; at least one `PremiumCard` and one `figure-footnote`; a single closing CTA band on plaster or evergreen-deep.
- Mobile pass: every grid collapses to single-column at `<md`; CTAs stay 44px+ tall; no horizontal scroll.
- Accessibility: every section has an `aria-labelledby`; the `SubPageHero`'s decorative SVG underline is `aria-hidden`; ConsultationForm reuse keeps existing `noValidate`/`role="status"` patterns.
- Bundle: zero new third-party imports. Estimated added JS: ~14 KB gz across all 13 pages combined (lazy-loaded routes, so home page bundle is unchanged).

After approval, I'll implement in this order: (1) shared `SubPageHero` + `RevealSection` extraction, (2) Service detail trio (Interior/Exterior/Decking), (3) Services overview + About, (4) Work + ServiceAreas hub + four area pages, (5) Contact + ThankYou + NotFound, (6) verify build.