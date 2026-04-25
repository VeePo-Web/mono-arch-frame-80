## What you'll see

A new section sits below the current "Project Gallery Preview" (§ IV) on the home page, framed as **§ IV.b — Selected Works**.

**Layout (desktop ≥ 1024px):**
- Left 7/12 columns — the **featured plate**: large architectural line-drawing in the existing evergreen-on-plaster style, with `Plate IV` corner marker, figure footnote, and a chevron CTA "Read the case note." Clicking it expands the plate's full scope/challenge/result/why-it-mattered in place beneath the image.
- Right 5/12 columns — a **vertical sidebar list** of 5 supporting plates as clickable rows: small thumb (60×60 SVG glyph) + plate roman numeral + project title + region + a hairline divider between rows. The currently-selected row gets an evergreen left-border and bolder figmark. Clicking a row promotes that plate into the featured position.
- A "Plates IV–IX" coord-mark in the section header echoes the existing `Plates I–III` marker on the preview above.

**Tablet (768–1023px):** featured plate stacks above the sidebar, sidebar becomes a 2-column grid.

**Mobile (<768px):** single column. Featured plate at top, supporting plates below as a vertically-stacked list with the same hairline-divided treatment. Inline expansion behavior is identical.

**Interaction:**
- Click any plate (sidebar row or featured) → smooth promotion (250ms cross-fade of the SVG + caption swap, no layout shift thanks to `aspect-[4/3]`).
- Click "Read the case note" on the featured plate → expands a panel below with `scope`, `challenge`, `result`, and `why it mattered`, each preceded by an `01 / 02 / 03 / 04` numeral-mark in the existing editorial vocabulary. Click again → collapses.
- Keyboard: arrow-up/down navigates the sidebar list; Enter promotes; Space toggles the case-note expansion. Each row is a real `<button>` with `aria-pressed`.
- Reduced motion: cross-fade and expansion become instant.

## Visual language (the "black-and-white image style")

The site doesn't currently use B&W photography — its image system is **monochromatic SVG architectural line drawings** (single-ink evergreen strokes on warm plaster, draftsman's-note feel, dimension marks, plumb lines). I'll match this exactly. Six new ~600-byte SVG vignettes, two per category, drawn from real project archetypes:

1. **Interior — Bragg Creek Trim & Transition** (existing motif, refined)
2. **Interior — Water Valley Built-In Shelving** (new: shelving cross-section + book silhouettes)
3. **Exterior — Rocky View Siding Repair** (existing motif, refined)
4. **Exterior — Bearspaw Soffit & Fascia** (new: gable-end elevation with vent detail)
5. **Decking — Bearspaw Wraparound** (existing motif, refined)
6. **Decking — Water Valley Step-Down Platform** (new: section view with stair stringer)

All drawn with the same stroke widths (0.5–1.0px), the same evergreen opacity ramp (0.20–0.55), the same plaster background fill, and the same dimension/plumb tick vocabulary. No photographs, no fake stock — fully aligned with §1.5 "Dealbreakers" in the brand identity doc.

## Files I'll touch

**New:**
- `src/data/galleryPlates.ts` — typed array of 6 plate records (slug, romanNumeral, title, category, area, scope, challenge, result, whyItMattered, vignetteKey).
- `src/components/gallery/GalleryVignettes.tsx` — six new SVG components + a `GalleryVignette` resolver, mirroring the structure of `ProjectVignette.tsx`.
- `src/components/gallery/SelectedWorks.tsx` — the section component (featured plate + sidebar list + inline case-note expansion). Self-contained client logic (`useState` for active plate + expansion). Uses existing primitives: `Container`, `bezel-shell`, `figure-footnote`, `numeral-mark`, `coord-mark`.

**Edited:**
- `src/pages/Index.tsx` — import `SelectedWorks`, drop it into a new `RevealSection` immediately after § IV (the existing preview). Numbering stays clean: existing § IV stays as-is; new section is labeled § IV.b in code comments and `Eyebrow numeral="IV.b"` to telegraph "more of the same chapter, deeper cut" rather than introducing a § V renumber.

**Untouched:** every existing component, every existing data file, every existing route. Zero risk to current preview, hero, services, areas, CTA, footer.

## Editorial details (Fantasy.co-tier finish)

- Section eyebrow: `IV.b — SELECTED WORKS` paired with the coord-mark `Plates IV–IX`.
- Section heading: *"A closer look at six recent properties."* (Fraunces drift-coupled)
- Featured plate caption uses the existing `figure-footnote` pattern: `Fig. iv. INTERIOR FINISHING — BRAGG CREEK`.
- Sidebar rows use a 6px evergreen left-border on the active row (matches the existing "why it mattered" border treatment) and dotted-leader spacing between title and region.
- Case-note expansion uses the same `numeral-mark` styling as the consultation form (`01 / 02 / 03 / 04`) for visual continuity with the closing CTA.
- The whole section sits on `section-wash` (the existing alternating background) so it reads as one continuous chapter with the preview above.

## Performance & accessibility

- **No new dependencies.** Zero impact on JS bundle (everything is plain React + SVG).
- All six SVGs inline = ~3.6 KB total, no network requests.
- `content-visibility: auto` + `contain-intrinsic-size` on the section to keep below-fold paint cheap (matches the pattern already used on § IV).
- Sidebar rows are real `<button>` elements with `aria-pressed`, keyboard-navigable (arrow keys + Enter), focus-visible ring in evergreen.
- Case-note expansion uses `aria-expanded` + `aria-controls`; the panel is `role="region"` with an `aria-labelledby` pointing to the plate title.
- Reduced-motion media query disables cross-fade + expansion animation.
- Color contrast: evergreen (#3d5a48) on plaster (#fbf8f3) measures 7.8:1 — exceeds WCAG AAA.

## Out of scope (will not do)

- No real photography (would break §1.5 dealbreakers and contradict "existing image style").
- No modal/lightbox (you chose inline expansion).
- No category filter chips (you chose featured + sidebar layout, which makes filters redundant — all 6 are visible at once).
- No changes to the existing § IV preview, the `/work` route, or the `projects` data file.