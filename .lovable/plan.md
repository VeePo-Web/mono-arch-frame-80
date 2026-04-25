
# Editorial Declutter — Sitewide Refinement Pass

## Diagnosis (why it reads "cheap" right now)

The site is **over-decorated**, not under-designed. Every section currently competes with multiple ornamental layers:

- Roman numeral eyebrows **+** coord-mark marginalia **+** numeral discs **+** card monograms **+** figure footnotes **+** plate numerals **+** surveyor brackets **+** dashed path lines **+** ridge silhouettes **+** vignette tick marks **+** body grain overlay **+** thermal arc gradient.
- Three different "label" typographic systems (eyebrow, coord-mark, figmark) doing the same job.
- Cards stacked with 5+ pieces of meta (numeral disc, plate, figmark, category, area, monogram) before you reach the actual content.
- Hero has TWO competing focal points (left headline column + right service-list panel) — neither wins.

Fantasy.co, Pentagram, and Collins do the opposite: **one clear move per surface**, enormous whitespace, and one signature ornament per page (not seven).

The fix is subtractive, not additive.

---

## The Editorial Principles (filter every change through these)

1. **One ornament per surface.** Pick the strongest mark; delete the rest.
2. **Type does the work.** If a label, divider, or icon isn't earning its space, remove it.
3. **Whitespace is the design.** Increase vertical rhythm; let sections breathe.
4. **One focal point per section.** Eye lands once, then reads.
5. **Pure black/charcoal type on warm off-white.** Evergreen becomes an *accent*, not a costume.

---

## Scope — Surface-by-Surface

### 1. Global system (`src/index.css`, `tailwind.config.ts`)

- **Kill the body grain overlay + thermal arc.** Two full-viewport fixed layers competing with content. Replace with a single, almost imperceptible top-of-page warm wash that fades by 600px.
- **Consolidate label systems** to one: `.eyebrow` (Inter, 11px, 0.22em tracked, uppercase, muted). Delete `.coord-mark`, `.numeral-mark`, `.footnote-figmark` styling — they all become `.eyebrow` variants or are removed entirely.
- **Tighten the type scale.** `text-display` is currently `clamp(2.75rem, 5vw + 1rem, 5.75rem)` — bump the floor to 3.25rem and ceiling to 6.5rem so headlines feel editorial-bold, not safe.
- **Reduce shadow stack.** `--shadow-haptic-strong` + double-bezel + ring + inset highlight is too much. Keep one paper-soft shadow (`--shadow-card`) and a subtle 1px ring. Retire the `.bezel-shell` / `.bezel-core` / `.bezel-shell-evergreen` / `.bezel-shell-closing` chain in favor of one `.surface` class.
- **Section padding rhythm**: standardize on `py-32 md:py-44` for major sections (currently inconsistent: `py-24`, `py-28`, `py-40`).
- **Container**: bump default max from 1280 → 1240 with wider gutters (`px-6 md:px-12 lg:px-20`) for more editorial margin.

### 2. Hero (`src/components/Hero.tsx`)

Currently a two-column split with the right column hosting a Double-Bezel proof panel containing services + vignette + creek ticks. Reads as two heroes glued together.

**New hero, single move:**
- **Full-width left-aligned editorial headline.** Headline takes 9–10 columns. Remove the right-side bezel panel entirely.
- Eyebrow → headline → subhead → CTA pair → service-area trust line. That's it.
- The headline gets room: `text-display` bumped, `max-w-[14ch]` to force a beautiful 3-line break.
- Replace the right panel with a single quiet element on the right: a small vertical "HC / EST. ALBERTA" colophon mark (think Pentagram book spine) — pure type, no panel, no shadow, no vignette.
- Keep the "Trusted" italic + hand-drawn underline — that's the signature moment.
- Drop the "Continue" chevron at the bottom (visual noise).

Result: hero feels like a magazine opening spread, not a dashboard.

### 3. Navigation (`src/components/Navigation.tsx`)

The floating glass island is well-crafted but the meridian dot + scrolled mark swap + brand-chip-with-divider adds fiddle.

- Keep the floating pill, keep the scroll contraction.
- **Remove** the meridian evergreen dot that appears on scroll.
- **Remove** the hairline divider between brand and links.
- **Remove** the inset-top-highlight pseudo gradient (subtle but adds to the "trying too hard" feeling).
- Keep one CTA, label simplifies to **"Consultation"** at all sizes (drop the "Request a" toggle dance).

### 4. Home — Trust Promise section (`src/pages/Index.tsx` § I)

- Drop the `coord-mark "51.0252°N"`. It looks like decoration cosplaying as data.
- Drop the Roman numeral on the eyebrow; leave just `THE PROMISE`.
- Headline keeps its current line — it's strong.

### 5. Home — Services Preview (§ II)

- **Drop the card-monogram "HC" watermark.** It's the loudest noise on the cards.
- Drop the `card-monogram` from `Index.tsx`, `About.tsx`, and `PremiumCard` consumers.
- Drop the "Available in · Bragg Creek · Bearspaw · …" micro-caption from each card (already in footer + service areas page; redundant).
- Reduce card meta to: numeral, title, one-line promise, one-paragraph body, "See the work →".
- The numeral disc stays — but flatter (no ring + shadow stack, just an outlined circle).
- Cards become flat `.surface` (1px border + paper shadow) instead of double-bezel.

### 6. Home — Approach (§ III)

- **Remove** the surveyor corner brackets (`.surveyor-tr` / `.surveyor-bl`).
- **Remove** the dashed path-line down the left edge.
- **Remove** the "Done." finish marker.
- Keep the three numbered steps; let them sit as clean numbered paragraphs with generous space between.

### 7. Home — Work Preview (§ IV)

- Drop the figure-footnote row (Fig. i. / INTERIOR FINISHING / area). Replace with a single line: `INTERIOR FINISHING · BRAGG CREEK` in eyebrow style.
- Drop the "Plate I" overlay on each vignette image.
- Cards: vignette → label line → title → location. That's the entire card.

### 8. Home — Final CTA / Closing

- Retire `.bezel-shell-closing` triple-bezel. Replace with a single full-width band (warm card background) with the headline + CTA centered. Editorial, not jeweled.

### 9. Work page (`src/pages/Work.tsx`)

- Drop "Plate I/II/III" overlays.
- Drop the `figure-footnote` row inside each card.
- Filter rail stays but pills lose the area-color dot — just text.
- "Why it mattered" pull-out keeps the left border but the eyebrow above it goes (the italic copy is enough signal).

### 10. About page (`src/pages/About.tsx`)

- Drop the surveyor frame + dashed path line in § II (same treatment as Home approach).
- Drop the `card-monogram "HC"` watermarks in § III.
- Drop the Roman numerals on every eyebrow on this page (I / II / III / IV) — keep just the labels.

### 11. Footer (`src/components/Footer.tsx`)

- **Remove** the ridge-silhouette SVG at the top. It's a callback nobody reads.
- **Remove** the colophon line "Set in Fraunces & Inter. Composed in Calgary, MMXXV." — clever but reads as agency self-indulgence.
- **Remove** the oversized italic "Built locally. Finished personally." sign-off + hand-drawn underline. That voice belongs in the hero, not the footer.
- **Remove** the "No. 001 — First Edition" + "The experience of quality." fine-print row.
- New footer = three columns (Services, Areas, Contact) + single copyright line. Calm, useful, done.

### 12. Sub-page hero (`src/components/SubPageHero.tsx`) and service pages

- Audit and remove `coordMark` prop usage.
- Audit and remove `eyebrowNumeral` prop — eyebrows go label-only sitewide.
- Service pages (`Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`): same declutter pass — drop monograms, surveyor frames, coord marks, figmarks. (I'll inspect these in the implementation step and apply the same rules.)

---

## What stays (the signature moments)

- The "Trusted" italic + hand-drawn underline in the hero.
- Numeral discs on the three home steps and three service cards (one ornament family, used twice).
- Fraunces italic for emphasis words, Inter for everything else.
- Warm off-white background + evergreen accent.
- Reveal-up scroll animations (already tasteful).

---

## Files to edit (roughly)

1. `src/index.css` — consolidate type, reduce shadows, kill grain + arc + bezel chain, simplify eyebrow.
2. `src/components/Hero.tsx` — full restructure to single-column editorial open.
3. `src/components/Navigation.tsx` — remove dot, divider, gradient highlight; simplify CTA label.
4. `src/components/Footer.tsx` — strip to three-column functional footer.
5. `src/components/Eyebrow.tsx` — drop numeral support (or make it opt-in and never used).
6. `src/components/PremiumCard.tsx` — collapse to single `.surface` style.
7. `src/components/SubPageHero.tsx` — drop coord/numeral props.
8. `src/pages/Index.tsx` — remove coord-marks, monograms, surveyor frame, plate overlays, figmarks, micro-captions.
9. `src/pages/Work.tsx` — remove plate overlays, figmarks, area dots on filters.
10. `src/pages/About.tsx` — remove surveyor frame, monograms, eyebrow numerals.
11. `src/pages/Services.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ServiceAreas.tsx`, `Contact.tsx`, `ThankYou.tsx`, area pages — same declutter pass.

No new dependencies. No new images. Pure subtractive editing + type/spacing tuning.

---

## Verification

- Build cleanly (no TS errors from removed props).
- Visit Home, Work, About, Services, Decking, Contact in preview to confirm calm, single-focal-point sections.
- Lighthouse: should hold or improve (less DOM, fewer pseudo-elements, no fixed grain layer).
- Self-review pass: each surface should answer **"what is the one thing I am supposed to look at?"** in under one second.

---

## Out of scope (deferred to future loops)

- Real photography — still using SVG vignettes; replacing them with B&W editorial photos is the natural next upgrade once a single hero shot exists.
- Dark mode, animation overhaul, route transitions.
