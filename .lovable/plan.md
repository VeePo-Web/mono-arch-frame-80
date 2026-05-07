## Cleanup pass — round 8 ("less to navigate")

The reference (`FlexServices.Org`) wins on **one feeling**: every screen has one job, and the eye never has to choose between three competing CTAs or two overlapping headers. Our site has already been trimmed twice, but a survey shows seven remaining sources of "noise" that are still making it feel busier than the reference. None of these touch the questionnaire's content rules (no testimonials, no industry jargon, two-business-day promise, three-field lead form, etc.) — they're all structural and visual.

---

### 1. Hero — drop the third paragraph

Currently the hero stacks: H1 → subhead → CTA pair → italic "Working across Bragg Creek, Rocky View County, Bearspaw, and Water Valley." line. That italic sentence repeats what the Areas bento says lower on the page and competes with the CTAs for the first eye-fix.

**Action:** Remove the italic "Working across…" sentence from `Hero.tsx`. The areas already render in their own §IV.

### 2. Sub-page heroes — one CTA, not two

`SubPageHero` is rendering both `primaryCta` (Get a Free Quote) and `secondaryCta` (See the work / Our services / Browse services) on every detail page. Two heavy buttons under every page title is the single biggest source of "lots going on." The nav already exposes a permanent Quote button.

**Action:** Stop passing `secondaryCta` from `Services.tsx`, `About.tsx`, `Work.tsx`, `ServiceAreas.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx`. Keep one primary CTA per hero (and none on Contact / ThankYou — already correct).

### 3. HowItGoes — drop the `01 / 02 / 03` italic numerals

Memory rule (now site-wide): "All numbered ordered-list rows render label-only — never `01 ·` prefixes." HowItGoes still paints italic `01`, `02`, `03` numerals in a left column. They're the last surviving numeral chrome on the site.

**Action:** Remove the numeral column from `HowItGoes.tsx`. Each row becomes title + body, separated by the existing rule line.

### 4. Areas bento — drop the postal-code eyebrow

`Index.tsx` passes `eyebrow={AREA_POSTAL[area.slug]}` (e.g. `T0L`, `T3R`) into each BentoTile. Postal-code chrome is the same "look-at-our-system" tic that Plate-N / Edition was. Real homeowners don't think in FSAs.

**Action:** Drop the `eyebrow` prop on the four BentoTiles in `Index.tsx`. Title + body line is enough. Delete the `AREA_POSTAL` map. Same edit on `ServiceAreas.tsx` — remove the `T0L` chip from the right side of each row.

### 5. Service-detail proof blocks — collapse the 4-cell grid

InteriorFinishing / ExteriorFinishing / Decking each render a "Recent work" block with a photo half and a 2×2 grid of Scope / Challenge / Result / Why-it-mattered cells. Four eyebrowed cells under a card title is dense and reads like a spec sheet.

**Action:** In all three detail pages, replace the 2×2 grid with two short stacked paragraphs:
- A scope+challenge sentence ("`{scope}` `{challenge}`")
- An italic "why it mattered" sentence

Drop the four `<p>EYEBROW</p>` labels.

### 6. Services page — make it actually different from Home

`Services.tsx` is currently: SubPageHero → `<ServicesGrid>` (identical to Home) → "Pricing is custom" blurb → CTA. So a visitor who clicks "Services" sees the same three cards they just left. The page needs to add value, not duplicate it.

**Action:** On `Services.tsx`, replace the duplicated `<ServicesGrid>` with a tighter "service rail" — three full-width rows (no photo, just title + promise + scope-bullets + arrow link). The photo cards stay on Home; Services becomes the deeper read with full scope per service.

### 7. ThankYou — fold the "what happens next" list into the hero

ThankYou currently runs SubPageHero → receipt stamp → "What happens next" 3-step list → quiet sign-off. Three sequential blocks for a confirmation page is one too many; FlexServices's confirmation pattern is hero + one line.

**Action:** Remove §I "A calm follow-up" 3-step list from `ThankYou.tsx`. The hero's subhead ("We respond within two business days…") already says it. Keep the receipt stamp (it's the proof) and the quiet sign-off.

---

### Memory updates

- Add a Core line: **"Sub-page heroes carry exactly one CTA — the primary 'Get a Free Quote'. The secondary CTA slot is retired."**
- Add a Core line: **"No postal codes / FSA chips in UI. Areas are named, not coded."**
- Add a Core line: **"HowItGoes (and any future ordered process) is title + body only — no numeral column."**

### Out of scope (intentionally)

- No nav, drawer, or section-rail changes — that surface is in good shape after round 7.
- No copy rewrites beyond the deletions above.
- No new components. Everything is an in-place trim.

---

### Files touched

`src/components/Hero.tsx`, `src/components/HowItGoes.tsx`, `src/pages/Index.tsx`, `src/pages/Services.tsx`, `src/pages/About.tsx`, `src/pages/Work.tsx`, `src/pages/ServiceAreas.tsx`, `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx`, `src/pages/ThankYou.tsx`, `mem://index.md`.
