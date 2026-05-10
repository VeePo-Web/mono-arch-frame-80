## Section: Home → Hero

### Audit findings

**File:** `src/components/Hero.tsx`

#### Grid spans drift from Core
- `Hero.tsx:26-28, 85-86` — Grid uses `lg:col-span-6` for both type column and photo figure (6/6 split). Core memory mandates: *"type left (cols 1-5: …), 16:10 photo plate right (cols 6-12)"* — i.e. a 5/7 asymmetric editorial split. The 6/6 reads as a generic two-up; 5/7 is the editorial cadence that matches Apple/Fantasy magazine layouts.
- **Fix:** `lg:col-span-5` on the type column, `lg:col-span-7` on the figure. Keep gap as-is (`gap-12 lg:gap-16`).

#### Everything else — ✓ clean
- **CTA:** Square `rounded-lg`, solid `bg-evergreen` + `text-evergreen-foreground`, `cta-spring`, no arrow, single primary, focus-ring present, ≥44px tap target. ✓
- **Type tokens:** `.t-eyebrow`, `.t-display wrap-editorial`, `.t-lede` — no legacy `text-display`, no arbitrary `text-[Npx]`. (`text-sm` on the reply note is a stock Tailwind utility, allowed.) ✓
- **Descender clip risk:** `.t-display` headline contains "property" (p-descender). No `overflow-hidden` clip wrapper, no `.reveal-up` keyframe — uses canonical `data-reveal` + `--reveal-delay`. Safe. ✓
- **Reveal cadence:** `data-reveal` with staggered delays (0/120/240/320/360/460ms) — single 800ms blur reveal layer, matches Core motion grammar. ✓
- **Photo plate:** `.hero-plate` utility (Apple-soft drop shadow + 1px hairline + cream evergreen base), `aspect-[16/10]`, `loading="eager"` + `fetchpriority="high"` for LCP. Caption-free per the type-only home pass. ✓
- **Hierarchy:** Single `<h1 id="hero-heading">` with `aria-labelledby` on the section. Eyebrow names a different category (provenance) than the H1 (promise) — within the eyebrow-OR-lede rule. ✓
- **Section padding:** `pt-28 md:pt-40 section-yb` — matches `SubPageHero` exactly (shared hero top-clearance exception, applied identically). ✓
- **Alt text:** `"Bearspaw Wraparound Deck — Bearspaw, Alberta"` — truthful, names the actual project shown. ✓
- **Mobile stack:** No `lg:` on the grid means it stacks 1-col below `lg`; type comes first in DOM so LCP stays text on mobile. ✓
- **Console / runtime:** No errors expected — no new imports, no API calls.

### Files to change
- `src/components/Hero.tsx` — Two-line edit: `lg:col-span-6` → `lg:col-span-5` (type column, L28); `lg:col-span-6` → `lg:col-span-7` (figure, L86).

### Memory
- No changes. Core rule already specifies the 5/7 split — this fix brings code back into compliance.

### Verify
- Desktop screenshot (1440) — confirm photo plate widens, type column tightens to ~5 cols.
- Mobile screenshot (390) — confirm stack order unchanged, no horizontal scroll.
- Zoom into "property." descender — confirm clean baseline.
- Console + runtime errors clean.

### Out of scope
- Photo caption strip: Core mentions one ("project title serif left, Category · Area small-caps right"), but the same Core paragraph's later memory entry retired captions on Home/Work tiles for the type-only pass. Hero is currently caption-free and the file comment confirms that intent — leaving as-is to honor the simpler interpretation (Fantasy.co default).
- Eyebrow trust line ("Family-run · Foothills, AB") — Core only forbids it in the drawer bottom rail; Hero usage is allowed.
