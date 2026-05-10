# Section: Global → SubPageHero (consistency pass against home Hero)

Files in scope: `src/components/SubPageHero.tsx`, `src/components/Hero.tsx`. Used on `/about`, `/services`, `/work`, `/contact`, `/thank-you`, `/404`. Hero is the source of truth.

Mandatory cross-cut: Core CTA rule (just cemented for BigCloseCTA) says **all** primary CTAs — header, drawer, BigCloseCTA, sub-page heroes — are `rounded-lg` square solid evergreen, text-only, no arrow, no icon-chip, no hand-rolled shadow, `.cta-spring` only. The home Hero CTA still violates this (rounded-full pill + ArrowUpRight + icon-chip). To make heroes consistent **and** Core-compliant, fix Hero too.

## Issues found

### A. CTA grammar — Hero AND SubPageHero both violate Core
- `Hero.tsx:62-77` — `rounded-full` pill, `pl-7 pr-1.5 py-1.5`, `<ArrowUpRight>` inside an `icon-chip icon-chip-light` halo. Violates "square `rounded-lg`, text-only, no arrow, no icon-chip."
- `SubPageHero.tsx:50-70` — Same `rounded-full` pill + arrow chip, **plus** uses `text-minimal` (uppercase 12px → renders "GET A FREE QUOTE"), **plus** hand-rolled inset shadow on L60, **plus** `transition-all duration-500 hover:bg-evergreen-hover active:scale-[0.98]` instead of `.cta-spring`.
- Fix (both): rewrite the CTA to the canonical BigCloseCTA pattern — `cta-spring inline-flex items-center justify-center rounded-lg bg-evergreen text-evergreen-foreground px-6 min-h-[52px] text-[15px] font-semibold` + focus-ring, drop the arrow/chip/import.

### B. Reveal system divergence
- `SubPageHero.tsx:33-37` wraps the headline in `<span className="block overflow-hidden"><span className="block reveal-up" style={{ animationDelay: "120ms" }}>` — uses the legacy `.reveal-up` keyframe + inline `animationDelay` + an `overflow-hidden` clip wrapper.
- Hero uses the canonical `data-reveal` + `--reveal-delay` system (800ms opacity + translate + blur). Two reveal systems on the same site = inconsistency.
- The `overflow-hidden` wrapper is also the textbook descender-clip risk the audit calls out (`p` in "properties," `y` in "Real properties.").
- Fix: drop the inner `<span overflow-hidden><span reveal-up>` wrappers. Apply `data-reveal` + `style={{ ["--reveal-delay" as string]: "120ms" }}` directly on the `<h1>`, the `<p>` lede, and the CTA wrapper — exactly the Hero pattern.

### C. Section padding — arbitrary token strings
- `SubPageHero.tsx:25` — `pt-28 md:pt-44 pb-12 md:pb-24`. Hero uses `pt-28 md:pt-40 section-yb`. Core: "One section spacing token `.section-y` — never per-page `py-N md:py-N` strings."
- Fix: change to `pt-28 md:pt-40 section-yb` to match Hero exactly.

### D. Headline width clamp
- `SubPageHero.tsx:28` — `max-w-[20ch] md:max-w-[18ch]` is an arbitrary container around the headline. Hero relies on `.t-display`'s `text-wrap: balance` and the column itself for width control.
- Fix: drop the wrapping `<div className="max-w-…">` — let `.t-headline`'s built-in `text-wrap: balance` do the work, matching Hero. (Lede already has its own `max-w-[52ch]`, keep that.)

### E. Dead-code props on SubPageHero
- `SubPageHero.tsx:12-15` — `compact` and `accentWord` are deprecated no-op props. No callers pass them (verified across all 6 call sites).
- Fix: delete both from the interface.

### F. `cn` import
- After removing `transition-all`/shadow strings the CTA className collapses; `cn` may still be useful for line-wrap clarity. Keep `cn` import — low cost.

### Clean checklist
- ✓ One H1 per page (SubPageHero owns it on sub-pages; Hero owns it on /).
- ✓ Eyebrow rule: SubPageHero has no eyebrow (per Core "page-name eyebrow retired"); Hero's eyebrow is "Family-run · Foothills, AB" — locator, different category from headline — OK.
- ✓ `.t-headline` (sub-pages) vs `.t-display` (home) is intentional per Core typography map — do NOT unify the type token.
- ✓ Photo plate on Hero only — Core: "SubPageHero is type-only on every sub-page." Do NOT add a plate to SubPageHero.
- ✓ Lede max-width 52ch on SubPageHero, 44ch on Hero (Hero is narrower because it shares the row with the photo) — OK.
- ✓ Reply note ("Replies within two business days") lives on Hero only — never duplicated on sub-pages per Core.

## Fix plan

### `src/components/SubPageHero.tsx` — full rewrite (clean enough to be one pass)
1. Drop `ArrowUpRight` import.
2. Drop deprecated `compact` / `accentWord` props.
3. Section: `className="relative pt-28 md:pt-40 section-yb"` (matches Hero).
4. Container: drop the `max-w-[20ch] md:max-w-[18ch]` wrapper.
5. Headline: `<h1 data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="t-headline wrap-editorial text-foreground">{headline}</h1>` — no overflow-hidden, no `.reveal-up`.
6. Lede: `<p data-reveal style={{ ["--reveal-delay" as string]: "240ms" }} className="t-lede mt-7 max-w-[52ch]">{subhead}</p>`.
7. CTA wrapper: `<div data-reveal style={{ ["--reveal-delay" as string]: "360ms" }} className="mt-10">` containing the canonical square CTA (no arrow, no chip, no hand-rolled shadow).

### `src/components/Hero.tsx` — CTA only
1. L62-77 — replace the `rounded-full` pill + arrow chip with the canonical square CTA. Drop `ArrowUpRight` import (L2). Keep everything else (eyebrow, headline, lede, photo plate, reply note) — already canonical.

### `mem://index.md`
The Core line "Hero left column: small evergreen-rule eyebrow + H1 + subhead + one solid evergreen CTA" stays correct. The CTA-shape Core rule already mandates square/text-only — no memory edit needed.

## Verify
- `browser--navigate_to_sandbox /` desktop 1440 + mobile 390 — Hero CTA is now a square solid evergreen button matching the nav Quote button. No arrow.
- `/about`, `/services`, `/work`, `/contact`, `/thank-you` desktop + mobile — SubPageHero CTAs all match Hero CTA (same shape, same label sizing, same hover spring).
- Zoom into "Real properties." (`/work`) and "Three services. One standard." (`/services`) — descenders on `p`, `y`, `q` no longer clipped.
- Console + runtime errors clean.

## Out of scope
- Removing the photo plate from Hero (Core mandates it).
- Adding a photo plate to SubPageHero (Core forbids it).
- The `.reveal-up` keyframe itself in `index.css` (other components may still use it; only the SubPageHero usage is removed here).
- ThankYou / NotFound page bodies (only the hero block on those pages is touched, via the shared SubPageHero rewrite).
