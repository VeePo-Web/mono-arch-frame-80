# About Hero — Upgrade Pass (Fantasy.co-grade craft, same composition)

## Intent

Keep the current arrangement (full-bleed photo → ghosted "About" watermark → H1 → subhead → CTA → meta strip with locator + scroll cue). Don't add new content, don't change copy, don't break a single brand rail. Make every existing layer feel one tier more expensive — the way fantasy.co, hickoryandrose and the Halle reference earn their "premium" feel: through unhurried motion, filmic light, and obsessive type detail rather than new ornament.

## Hard rails (unchanged — these stay forbidden)

- No eyebrow line above the H1, no italic-evergreen `accentWord`, no folio numerals.
- No "Plate N / Edition / Fig. / Section No." chrome (`mem://constraint/no-editorial-cosplay`).
- Single primary CTA, copy stays **"Get a Free Quote"**, solid evergreen `.cta-spring`.
- Dark-on-cream palette only. No "Two business days" promise in the hero.
- No new dependency. No `framer-motion`. Pure CSS + the existing rAF scroll writer.

## What changes (six precise moves)

### 1. Line-by-line clip reveal on the H1 (replaces the single opacity+translate fade)

The current `data-reveal` opacity+blur on the whole headline is fine but generic. Upgrade to a per-line mask reveal — each visual line of the H1 rises from a clipped bottom edge with its own delay. This is the single biggest "expensive" tell.

- Split the H1 into a stack of `<span class="about-hero__line">` rows via a small render helper that wraps each whitespace-separated visual line. Because the existing H1 is short ("People · Property · Process" style), wrap each word in its own `.about-hero__line` and let flex-wrap handle line breaks; each word animates as its own clip.
- Each `.about-hero__line` wraps an inner `<span class="about-hero__line-inner">`. Outer = `overflow: hidden`, inner = `transform: translateY(110%)` → `translateY(0)` with `clip-path: inset(0 0 0 0)` from `inset(100% 0 0 0)`.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (existing `ease-weighted`), duration **1100ms**, stagger **90ms** per word, kicking off at **360ms** after section reveal.
- Subhead and CTA delays bump to 1100ms / 1320ms so the cascade still resolves in order.
- `prefers-reduced-motion`: collapse to a plain 600ms opacity fade with no transform.

### 2. Lit cream radial veil (replaces the 3-stop linear gradient)

The current veil is a flat top→bottom cream wash. Swap for a soft radial centered roughly where the headline sits — gives the impression the type is lit by a window opening onto the photo, which is the Halle/hickoryandrose move.

- `background: radial-gradient(120% 90% at 18% 70%, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.72) 38%, hsl(var(--background) / 0.34) 68%, hsl(var(--background) / 0.08) 100%);`
- Keep the existing `.about-hero__vignette` corner darkening but lower to 2% so it doesn't fight the radial.
- Mobile (<lg) anchor the radial center to `50% 75%` so the type column still gets lift when stacked.

### 3. Filmic grain (3% noise, mix-blend-overlay) over the photo only

A single SVG `feTurbulence` data-URI applied as a `background-image` on a `.about-hero__grain` layer above the photo and beneath the veil. 240×240 tile, `opacity: 0.06`, `mix-blend-mode: overlay`. Pointer-events none, aria-hidden. This is what gives fantasy.co photos their tactility without darkening them.

### 4. Watermark gets a drawing hair-rule + multiply blend (replaces the flat 3.5% ghost)

- Change the watermark blend from a flat `color: hsl(var(--foreground) / 0.035)` to `color: hsl(var(--foreground) / 0.06)` + `mix-blend-mode: multiply`. It now picks up the photo's tonality and feels printed-into the image, not stickered on top.
- Add a 1px evergreen hair rule that draws in under the watermark on mount: `::after` pseudo, `width: 96px`, `height: 1px`, `background: hsl(var(--evergreen) / 0.55)`, `transform-origin: left`, `scaleX(0) → scaleX(1)` over **1400ms** at delay **520ms**, `ease-weighted`. Positioned at the watermark's bottom-left, inset 4px. Tiny but signature.

### 5. Refined corner brackets (longer, thinner, animated draw-in)

Today's corners are 16×16, 1px, full-opacity-on-mount. Upgrade:
- Length **28px** each leg, thickness **0.5px** rendered via box-shadow inset trick so it stays crisp on HiDPI.
- Color `hsl(var(--foreground) / 0.18)`.
- Draw in: clip-path reveal from corner outward, `inset(0 100% 100% 0) → inset(0)` (TL) and mirrored for BR, 900ms ease-weighted, delay 240ms.
- Same `prefers-reduced-motion` fallback: render at full state, no draw.

### 6. Desktop-only cursor parallax on the photo (±6px, inertial)

In addition to the existing scroll parallax, add a gentle pointer-tracking offset on the `.about-hero__photo-shift` element when `(pointer: fine)` and `(prefers-reduced-motion: no-preference)` both match.

- Listen on `section.about-hero` `pointermove`, compute `(mx, my)` normalized to `-1..1` around the section center.
- Lerp toward target each rAF tick with factor **0.06** (slow inertia → premium, not jittery).
- Apply as a second CSS custom property: `--cursor-x` / `--cursor-y` translating by `calc(var(--cursor-x) * 6px)` / `calc(var(--cursor-y) * 6px)`. Multiplies cleanly with the existing `--parallax-y` via a single `transform: translate3d(calc(var(--cursor-x)*6px), calc(var(--parallax-y) + var(--cursor-y)*6px), 0) scale(1.08)`.
- Cleanup on unmount, pointer leave resets target to 0,0.

### 7. (bonus, free) Meta strip — live dot + smarter scroll cue

- Locator gets a 4px evergreen dot before it with a slow 2.4s `pulse-soft` keyframe (opacity 0.6 ↔ 1, scale 1 ↔ 1.15). Reads as "studio is live, not a brochure."
- The existing `ChevronDown` keeps its bob; add `opacity: 0` → fade to 0.45 over the same 900ms delay it already has, then start bobbing.

## Files touched

- `src/components/AboutHero.tsx` — render H1 words as `.about-hero__line`/`-inner` spans, add `.about-hero__grain` div, extend the rAF tick to include cursor lerp and `--cursor-x` / `--cursor-y` writes, add `pointermove`/`pointerleave` listeners gated by `matchMedia('(pointer: fine)')`, add the live-dot span before the locator. Adjust reveal delays for the subhead/CTA/meta (1100 / 1320 / 1480ms).
- `src/index.css` — under the existing `.about-hero` layer:
  - swap `.about-hero__veil` to the radial gradient described above
  - add `.about-hero__grain` (data-URI noise, mix-blend overlay)
  - add `.about-hero__line` / `.about-hero__line-inner` + `@keyframes about-hero-line-rise`
  - rewrite `.about-hero__watermark` color + add `::after` rule + `@keyframes about-hero-rule-draw`
  - rewrite `.about-hero__corner` to box-shadow + clip-path draw + `@keyframes about-hero-corner-draw`
  - add `.about-hero__live-dot` + `@keyframes pulse-soft`
  - mirror every new animation under the existing `@media (prefers-reduced-motion: reduce)` block to a no-op

No other file touched. No new component. No new asset. No new dep.

## Technical notes

- All new motion runs on `transform`, `clip-path`, or `opacity` only — composited, no layout thrash.
- The cursor parallax shares the existing rAF loop (one tick services scroll write + cursor lerp).
- Grain is a single inline data-URI ~1.2KB gzipped; no network round-trip.
- The H1 word-split is purely presentational (`aria-label={headline}` on the H1, each inner span `aria-hidden`), so screen readers still hear the full headline once.
- All timings stay inside the site's existing motion cadence (`ease-weighted`, 800–1400ms reveals, 300–500ms hovers).

## Out of scope (explicitly not doing)

- No layout change (no split-screen, no framed photo plate, no new sections).
- No copy change. No new metadata. No second CTA.
- No change to `SubPageHero`, `Navigation`, body sections, `BigCloseCTA`, or `/about` below the hero.
- No new memory entries (composition is unchanged, only craft deepens).
