## Section: Global → Eyebrows / folio chrome

### Issues found

1. **`src/components/PageSlug.tsx` (entire file) + `src/App.tsx:7,96` — fixed top-right "Page 01 — Home" folio.**
   This is exactly the "01 — Home" the user is calling out. It's pure magazine-folio decoration sitting in the top-right corner of every route, in 9px uppercase tracked-out evergreen with a hairline rule. Core rules ban it three times over: *"no folio"*, *"No 'Plate N', 'Edition', 'Fig.', 'Section No.', or 'Service No.' labels in UI chrome"*, and *"art-school pastiche"*. It also competes visually with the nav.
   → Delete `src/components/PageSlug.tsx`. Remove the import + `<PageSlug />` render from `src/App.tsx`.

2. **`src/components/Hero.tsx:35` — `<span className="t-eyebrow">Family-run · Foothills, AB</span>` above the home H1.**
   Core says: *"Hero + SubPageHero render headlines as plain `text-foreground` — no eyebrow line, no folio, no radial bloom, no vignette. The type itself is the design."* The "small evergreen-rule eyebrow" phrasing in the later Hero rule contradicts the earlier blanket ban; per the audit prompt's *"Default = ship the simpler interpretation"*, the eyebrow goes. The H1 + subhead + CTA stand on their own.
   → Remove the eyebrow `<span>` (and its containing wrapper if it becomes empty) from Hero.tsx.

3. **`src/pages/NotFound.tsx:4,45` — `<Eyebrow label="HEAD HERE" />` on the 404.**
   Decorative label that adds nothing functional ("HEAD HERE" reads as placeholder copy left in production). Removes a stray usage of the standalone `Eyebrow` component.
   → Delete the `<Eyebrow … />` line and its import.

4. **Section-name eyebrows on About / Services / Contact / RecentWorkPreview** — ✓ keep.
   `About.tsx:38,77` ("How we work", "Where we work"), `Services.tsx:37` ("What we do"), `Contact.tsx:66` ("Or reach us directly"), `RecentWorkPreview.tsx:28` ("Recent work"). These are functional section names, not folio chrome — they're used as the section's accessible heading (`aria-labelledby`/h2) in a 12-col rail. Core explicitly preserves the 10px uppercase `.t-eyebrow` token and the magazine-rail grammar that uses it. Not the bug the user is naming.

5. **`src/components/SectionHeader.tsx` + `src/components/Eyebrow.tsx`** — ✓ leave in place.
   `SectionHeader` is unused at runtime; `Eyebrow` is only consumed by `SectionHeader` and (after fix #3) nothing else. Deleting them is a separate cleanup pass — out of scope for an "eyebrow audit" since they don't render anywhere visible to the user. Flag for a future dead-code sweep.

### Files to change

- **`src/App.tsx`** — drop the `import PageSlug` line and the `<PageSlug />` render under `<BrowserRouter>`.
- **`src/components/PageSlug.tsx`** — delete the file.
- **`src/components/Hero.tsx`** — remove the `Family-run · Foothills, AB` eyebrow span (and the surrounding wrapper if empty after removal).
- **`src/pages/NotFound.tsx`** — drop the `Eyebrow` import and the `<Eyebrow label="HEAD HERE" />` line.

### Out of scope

- `SectionHeader` / `Eyebrow` dead-code removal (separate cleanup pass).
- Refactoring or restyling the legitimate `t-eyebrow` section labels on About/Services/Contact/RecentWorkPreview — they pass Core.
- Touching anything not listed above.

### Verification

- `browser--navigate_to_sandbox` to `/`, `/about`, `/services`, `/work`, `/contact`, `/thank-you` — confirm the top-right "Page 01 — Home" flag is gone on every route.
- Screenshot home at desktop (1440) — Hero now opens with H1 as the first painted element.
- `code--read_runtime_errors` + `code--read_console_logs` clean.

### Memory update

Add to Core: *"`PageSlug` is retired — never render a fixed top-right page coordinate / 'Page 0N — Name' folio. Hero and SubPageHero open straight on the H1; no eyebrow line above either."*
