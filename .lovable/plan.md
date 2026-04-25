# Pass 2 — Fantasy.co Editorial Upgrade

The bones are right (Double-Bezel hero card, glass-island nav, plaster surface). What's missing is the **cinematic confidence** Fantasy.co is known for — paced reveals, scroll-coupled motion, signature flourishes — plus a few **real defects** I caught while auditing live:

- **Final CTA is invisible**: the deep-evergreen panel is rendering as a flat off-white band, because `content-visibility: auto` plus an under-reserved `contain-intrinsic-size` is collapsing the section. The radial-gradient background never paints in the visible layout.
- **Render-blocking Google Fonts** link (~84 ms) — easy win to async this.
- **lucide-react ships 159 KB unbundled** because we import from the barrel. Switching to per-icon paths drops first JS materially.
- **CLS 0.0323** comes from the nav (no reserved height) and a `lg:col-span-7` shifting on hydration.

This pass fixes those three defects *and* performs a substantive design upgrade — without adding a single npm dependency and without exceeding the JS budget.

---

## Part A — Defects (must fix)

1. **Final CTA visibility**
   - Remove `content-visibility: auto` from sections that contain background gradients or absolutely-positioned ornaments (Final CTA, Approach path-line). Those sections paint critical chrome that the browser shouldn't skip.
   - Keep `content-visibility: auto` only on **photographic / heavy DOM** sections (Project Gallery), with a more accurate `contain-intrinsic-size` (e.g. `1200px 1400px`).
   - Add a fallback solid `background-color` token next to the radial gradient so the panel is never blank during paint.

2. **Async fonts**
   - Convert the Google Fonts `<link>` to the standard preload-then-swap pattern: `<link rel="preload" as="style" ... onload="this.rel='stylesheet'">` plus a `<noscript>` fallback. Removes the only render-blocking resource.

3. **lucide-react tree-shake**
   - Replace `import { ArrowUpRight, ... } from "lucide-react"` with deep imports (`from "lucide-react/dist/esm/icons/arrow-up-right"`). Touches Nav, Footer, Hero, Index, PremiumCard. Saves ~120 KB raw / ~30 KB gz on initial JS.

4. **Nav CLS**
   - Reserve a fixed-height invisible spacer for the floating nav so the first paint doesn't push content. (Sets header height as a CSS var consumed by `<main>`'s `scroll-margin-top`.)

---

## Part B — Editorial design upgrade (Fantasy-tier)

### B1. Hero — scroll-paced cinema
- Add a **scroll-coupled drift** to the hero serif headline (`Trusted renovations…`): a subtle 2-3% upward translate + 1-2% letter-spacing tighten driven by `IntersectionObserver` ratio (no scroll listeners). Effect is barely perceptible but reads as "alive."
- **Italic "Trusted" gesture**: lift it into its own absolutely-positioned layer with a 600 ms delayed mask-reveal; add a hand-drawn 1-stroke underline SVG that draws in with `stroke-dashoffset` after the word lands.
- **Hero proof panel** (right column "What we do" card): elevate to a true tower — split into a top *manifesto block* and a bottom *services manifest* with a hairline divider, an internal numeral column (I/II/III currently shown), and a faint topographic line illustration anchored to the bottom edge (purely SVG, < 2 KB).
- Add a quiet **"scroll" mark** at the bottom of the hero — a 1px vertical hairline that draws downward on load, with the word "Continue" rotated -90°.

### B2. Section-to-section choreography
- Wire `useReveal` into Index sections so the **headline + body + supporting block reveal in a 3-beat cascade** (0 / 90 / 180 ms staggered). Each section currently appears all-at-once, which feels static.
- Sections II and IV currently use `bg-card/40` flat fills. Replace with a **two-tone vertical wash** (top: `card/60`, bottom: `card/20`) using a single CSS gradient — adds depth without adding paint cost.

### B3. Services cards (II) — bespoke hover
- Add a **monogram watermark** ("HC" in Fraunces light italic, 240 px, opacity 0.04) to each card's bottom-right corner. Currently the cards are visually identical; this gives each a subtle compositional anchor.
- On hover: monogram opacity rises to 0.08, the numeral disc grows by 4 px, and the card's haptic shadow shifts from neutral to a 5% evergreen tint. Currently only the disc + ring respond.
- Add a **micro-caption row** below each card title showing "Available in: Bragg Creek · Bearspaw · Water Valley" in `text-minimal`. Builds local trust without adding sections.

### B4. Approach (III) — kinetic path line
- The vertical hairline is currently static. Add `data-line-draw` (already styled in CSS) so it **draws top-to-bottom over 1400 ms** as the section enters view.
- Each numeral disc gets a **delayed scale-in** (0.85 → 1.0, opacity 0 → 1) staggered by 220 ms, synced with the line's draw.
- Add a quiet **"finish marker"** at the bottom of the path: a small filled evergreen circle (8 px) with the word "Done" in `text-minimal`, that fades in after step 03 reveals.

### B5. Project gallery (IV) — captioned monograms
- Each `ProjectVignette` currently sits above the metadata. Add a **figure-caption pattern**: under the image, a single 1px hairline + a one-word category mark (`INTERIOR / EXTERIOR / DECKING`) in `text-minimal`, then the title. This is the Pentagram editorial pattern — caption-led, confident.
- Add a **plate number** ("Plate I", "Plate II", "Plate III") in Fraunces italic light at the top-left of each vignette, fading in at 60% scroll-into-view. Bespoke editorial detail Fantasy uses constantly.
- On hover: the vignette translates up by 4 px and the haptic shadow deepens; the plate number translates down 2 px (parallax counter-motion).

### B6. Service Areas (V) — typographic list
- Convert the divided list into a **larger, looser editorial roster**: row height grows from `py-7` to `py-10`, the area name uses `text-headline` (smaller variant ~2rem), and the right-edge arrow is replaced with the area's **postal code** in `text-minimal` followed by the icon-chip.
- On hover: a 1px evergreen hairline draws under the row from left to right (300 ms), and the name shifts right by 8 px (currently 6 px, but with cubic-bezier swift). Reads like browsing a directory.

### B7. Final CTA (VI) — true closing scene
- Once defect A1 is fixed, *upgrade* the panel:
  - Add a **second concentric ring** to the Double-Bezel CTA card (third bezel layer) — gives it the heaviest visual weight on the page, signalling it's the resolution.
  - Behind the deep-evergreen, add a **subtle hand-drawn property silhouette** (single SVG line, 0.06 opacity, `currentColor=background`) along the bottom edge — closes the brand loop with the hero's vignette.
  - The numbered list (01–04) gets a **left-aligned 1px column line** with each numeral hanging off it — turns it into an editorial "manifest" block instead of a list.

### B8. Footer — signature close
- Add the brand signature line at the very bottom (above the © row): the literal phrase "Built locally. Finished personally." in Fraunces italic, centered, opacity 0.7. The kind of human signature Fantasy puts on every closing footer.
- Convert the three middle columns into a **wireframe directory** — replace the section eyebrows (· SERVICES / · AREAS / · TALK IT THROUGH) with numerals (i / ii / iii) and let the column titles set in Fraunces light. Editorial, restrained.

### B9. Plaster grain texture
- Currently the body grain overlay sits at opacity 0.04 across the full viewport. Reduce to **0.025** so it disappears in the hero's serif type but stays felt on flat panels. The grain is currently *just* loud enough to read as "noise filter" rather than "paper."

### B10. Cursor + focus polish
- The default text cursor on dark panels (Final CTA) reads as black-on-dark. Add `caret-color: hsl(var(--background))` globally to inputs (future-proofing — Contact form will need it).
- Add a **focus-visible underline** to all `text-minimal` link variants — currently the focus ring sits on a wide rounded chip that's invisible when the text is short. A 2px underline + 4px offset in evergreen is more honest.

---

## Part C — Performance budget (verified via build)

After this pass:
- **JS gz**: target ≤ **95 KB** initial (down from ~108 KB) — driven by lucide deep-imports.
- **CSS gz**: ≤ **14 KB** (up from 12.6 KB; new gradients + monogram + plate styles).
- **Critical CSS**: still inlined via Vite's default.
- **Render-blocking resources**: target **0** (down from 1).
- **CLS**: target ≤ **0.01** (from 0.0323) via reserved nav height and explicit `aspect-ratio` on vignettes.
- **No new npm dependencies.**
- **No new fonts** (the Fraunces 400 + 300i and Inter 400/500/600 we already ship cover everything proposed).

---

## Files touched

- `src/index.css` — grain reduce, two-tone wash, plate/monogram styles, third-bezel variant, signature line, focus underline
- `index.html` — preload-swap pattern for fonts, nav-height CSS var
- `src/pages/Index.tsx` — defect fixes (content-visibility), reveal wiring, gallery captions, areas roster, CTA manifest list
- `src/components/Hero.tsx` — scroll-coupled drift, italic underline, scroll mark, topographic line
- `src/components/Navigation.tsx` — reserved height, focus underline
- `src/components/Footer.tsx` — signature line, numeral columns
- `src/components/PremiumCard.tsx` — third-bezel `featured="closing"` variant
- `src/components/ProjectVignette.tsx` — plate-number prop
- All icon imports (~6 files) — switch to deep imports for tree-shake

---

## Out of scope (for a later pass)

- Building the Work / Services / Contact / Areas detail pages (still placeholders today).
- Photography integration — vignettes stay as the editorial fallback.
- Form validation / Supabase wiring for Contact.
- View Transitions API for cross-page navigation (great future Fantasy-tier touch).

---

## Acceptance criteria

1. Final CTA panel renders the deep-evergreen radial gradient + full content on first scroll-into-view.
2. Hero italic word draws an underline after landing; section reveals are perceptibly staggered.
3. Each service card shows a monogram watermark + micro-caption; each project card shows a plate number + caption hairline.
4. The Approach path line draws in over ~1.4 s; numerals stagger; finish marker fades in.
5. Service Areas list reads as a typographic roster with postal codes and underline draw on hover.
6. Build succeeds; lucide-react contribution to JS bundle drops by ≥ 60%; no render-blocking fonts.
7. CLS ≤ 0.01; no new dependencies.
