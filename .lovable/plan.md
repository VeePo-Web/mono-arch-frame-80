# Upgrade pass — "Editorial Chapter & Evidence" lift

## Why this pass, why now

The trust spine is wired up (Hero → Fear Ledger → Bridge → Services → Approach → Gallery → Selected Works → Trust Panel → Testimonials → Areas → Final CTA + Sticky bar + restructured Form). The next quality ceiling is **editorial honesty in the evidence layer** and **chapter clarity across the sub-pages** — exactly the two things the persona scans hardest before reaching out.

Filtering through the three principles:

1. **Elevate the human experience.** The synthetic SVG "vignettes" in the Selected Works gallery, the Project Gallery preview, and inside the Services cards send the wrong signal to a persona who explicitly "reviews photos first." Replacing them with **typographic placeholder plates** (the same `ProjectPlaceholder` pattern we already shipped on the home preview) tells the truth and looks more confident than fake line drawings ever can.
2. **Embody brand truth with excellence.** Eight sub-pages still pass deprecated `eyebrowNumeral` / `coordMark` props that `SubPageHero` silently ignores. That's invisible code rot, and it means we never realized the editorial dossier metadata the persona research called for. We rebuild the dossier as an in-component **folio strip** that actually renders.
3. **Innovate responsibly for impact.** The floating-island Navigation is beautiful but loses orientation on long sub-pages. We add a **chapter-aware micro-strip** below the island (only on sub-pages, only after scroll) that reads "Section · Services · No. III · Decking" — a quiet way-finder that reinforces the editorial system without competing with the CTA.

---

## Scope — five focused moves

### 1 · Gallery & Services: replace synthetic SVG vignettes with typographic plates

The `ProjectPlaceholder` we already use on the **home preview** is the model. Apply the same pattern in the two remaining gallery surfaces — Selected Works (home § IV.b) and Work page grid — and in the Services landing list cards. The persona will see truth-telling typography ("Photograph in progress · Bragg Creek · 2024") instead of fake architectural line drawings that read as cheap clipart on second glance.

**Files**

- `src/components/gallery/SelectedWorks.tsx` — replace the featured-plate `<GalleryVignette …/>` and the sidebar-row `<GalleryVignette …/>` calls with `<ProjectPlaceholder …/>`. Sidebar plates need a compact variant (smaller numeral, single-line meta), so add a `compact?: boolean` prop to `ProjectPlaceholder`.
- `src/pages/Work.tsx` — replace the `<GalleryVignette …/>` inside each plate card with `<ProjectPlaceholder …/>`. Adapt the prop shape — `ProjectPlaceholder` expects `{ project, index }`; map each `GalleryPlate` into the lighter shape it needs (title, area, category, romanNumeral).
- `src/pages/Services.tsx` — replace the `<ProjectVignette …/>` inside each service card with a **service-specific** plate. New small component `src/components/gallery/ServicePlate.tsx` mirroring `ProjectPlaceholder` but reading from `services` (numeral + service title + a single descriptor line). Same hairline-grid background, same Fraunces italic stamp.
- `src/components/gallery/ProjectPlaceholder.tsx` — extend the type to accept either a project-shaped object **or** a generic `{ numeral, title, area, category }` so we can drive Work-page cards from `GalleryPlate` and Services from `services`.
- (Out of scope, but flag) — `src/components/gallery/GalleryVignettes.tsx` and `src/components/ProjectVignette.tsx` become unused after this pass. Leave them in place for one revision so we don't lose the option to bring them back if the client supplies illustrations later. Mark each at the top with a one-line `@deprecated — superseded by ProjectPlaceholder` comment.

### 2 · SubPageHero: a real editorial folio strip + dossier metadata

`SubPageHero` already accepts `eyebrowNumeral`, `coordMark`, and `folio` — but only `folio` actually renders, and almost no page passes it. The other two are shoehorned through eight pages and silently dropped. We retire them and re-introduce a single, designed **dossier strip**: a hairline-bordered horizontal line that sits between the eyebrow and the H1 carrying `Section No. <Roman> · <coord-mark> · <Edition I>`.

**Files**

- `src/components/SubPageHero.tsx`:
  - **Remove** the two deprecated props from the interface entirely (no more silent ignoring).
  - Add a typed `dossier?: { sectionNo: string; coord: string; edition?: string }` prop.
  - Render the dossier as a single row beneath the eyebrow: `[hairline]  Section No. III  ·  Decking · Outdoor living  ·  Edition I  [hairline]` — Inter, tracked, evergreen/65, animation-delay 100ms in the existing reveal-up cascade.
  - Drop unused imports from this file (`useId`, no-longer-needed cn segments).
- The eight pages that were passing the deprecated props get tidied:
  - `src/pages/About.tsx` — drop `eyebrowNumeral` / `coordMark`. Add `dossier={{ sectionNo: "II", coord: "About · Working philosophy", edition: "Edition I" }}`.
  - `src/pages/Contact.tsx` — drop both. Add `dossier={{ sectionNo: "XI", coord: "Reply within two business days" }}`.
  - `src/pages/Decking.tsx` — drop both. Add `dossier={{ sectionNo: "VI", coord: "Decking · Outdoor living" }}`.
  - `src/pages/ExteriorFinishing.tsx` — drop both. Add `dossier={{ sectionNo: "V", coord: "Exterior · Stewardship" }}`.
  - `src/pages/InteriorFinishing.tsx` — drop both. Add `dossier={{ sectionNo: "IV", coord: "Interior · Flagship craft" }}`.
  - `src/pages/NotFound.tsx` — drop both. Add `dossier={{ sectionNo: "·", coord: "Coordinate · Unresolved" }}`.
  - `src/pages/ServiceAreas.tsx` — drop both. Add `dossier={{ sectionNo: "IX", coord: "Foothills · West & North of Calgary", edition: "Edition I" }}`.
  - `src/pages/Services.tsx` — drop both. Add `dossier={{ sectionNo: "III", coord: "Services · Three, one standard", edition: "Edition I" }}`.
  - `src/pages/ThankYou.tsx` — drop both. Add `dossier={{ sectionNo: "XII", coord: "Fig. iv. RECEIVED" }}`.
  - `src/pages/Work.tsx` — drop both. Add `dossier={{ sectionNo: "VIII", coord: \`${galleryPlates.length} plates · Edition I\` }}`.

### 3 · Navigation: chapter-aware way-finder

Below the floating island, on sub-pages only and only **after** the page has scrolled past the SubPageHero (we already have the dossier label, so reuse it), reveal a single-line breadcrumb strip that reads `Home  /  Services  /  No. III` — small, tracked, evergreen-tinted, hairline-bordered top + bottom. It anchors visitors in the editorial system without competing with the navigation pill or the CTA.

**Files**

- `src/components/ChapterSpine.tsx` — already exists in the repo; refactor it (currently used inline inside service detail pages) to a top-level **route-aware** strip mounted in `App.tsx` next to `StickyConsultBar`. It reads route via `useLocation`, looks up the section number + label from a tiny route table, and uses an IntersectionObserver on a sentinel placed at `~30vh` to fade in. Hidden on `/` (the home is its own opening chapter — no need), on `/contact`, on `/thank-you`. Honours `prefers-reduced-motion`.
- `src/App.tsx` — mount `<ChapterSpine />` directly above `<StickyConsultBar />`. They live at different edges (top vs. bottom) so they cannot collide.
- `src/index.css` — add `.chapter-spine` utility: fixed top-[max(theme(spacing.20),5rem)], hairline borders top + bottom, `bg-background/72 backdrop-blur-md`, height ~36px, font-size `0.7rem`, `letter-spacing: 0.18em`, slot-friendly grid. Reveal pattern reuses the `data-show` opacity/translate trick from `.sticky-cta-bar`.

### 4 · Services landing: tighten the gallery-card density

After moves #1 and #2, the Services overview cards become uneven (the new `ServicePlate` aspect is taller than the old `ProjectVignette` because it carries type, not line-art). Re-tune the card layout so the plate column lands at `aspect-[4/5]` on lg and the copy column gets `lg:col-span-7`. Inter heading sizes drop one notch on the card to keep the visual weight balanced. No structural changes — only spacing pinning.

**Files**

- `src/pages/Services.tsx` — adjust the Card grid: `lg:grid-cols-12` → keep, plate col `lg:col-span-5` → `lg:col-span-5 aspect-[4/5] lg:aspect-auto lg:min-h-[420px]`. Copy column padding: `p-8 md:p-12` → `p-9 lg:p-12`. Title `text-title` → keep, but knock the `figure-footnote` `mb-5` to `mb-4` to recover vertical rhythm.

### 5 · Cleanup pass — kill dead imports + stale comments

While editing those nine sub-page files, sweep dead imports the prop removal exposes:

- `src/pages/Work.tsx` — drop `import { GalleryVignette } from "@/components/gallery/GalleryVignettes"`.
- `src/pages/Services.tsx` — drop `import { ProjectVignette, type VignetteCategory } from "@/components/ProjectVignette"`. Drop the `SERVICE_CATEGORY` map (no longer needed).
- `src/components/gallery/SelectedWorks.tsx` — drop `import { GalleryVignette } from "./GalleryVignettes"`.

---

## Verification

- `bun run build` — the implementation must compile cleanly (no unused-imports warnings).
- Visit `/work` in preview after the change — confirm typographic plates render, Sticky CTA bar and Chapter Spine both appear after scroll.
- Visit `/services` — confirm `ServicePlate` shows numeral + title + descriptor and the card heights are even.
- Visit `/about`, `/decking`, `/contact` — confirm the new dossier strip renders below the eyebrow on each, and the page no longer logs unknown-prop warnings (it didn't before either, but we're tidying surface area).
- Confirm `ChapterSpine` is hidden on `/`, `/contact`, `/thank-you`, and that it reveals only after scrolling past the hero. Confirm it does not overlap the floating navigation island.

## Out of scope (next pass)

- Real photography swap-in (waiting on supplied imagery).
- Service-area page individual hero refinements (Bearspaw / BraggCreek / etc.).
- Form analytics (post-launch).