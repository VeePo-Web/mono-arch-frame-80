# Nav fix, round 2 — safe-area + Apple-grade polish

Two real problems in the current build:

1. **The bar is hidden behind the top.** `paddingTop: env(safe-area-inset-top)` is applied to a fixed-height header (`h-[60px] sm:h-16 md:h-20`). With Tailwind's default `box-sizing: border-box`, the safe-area inset eats the content area instead of pushing the bar down — so on a real iPhone the logo and icons slide under the status bar.
2. **It doesn't read as Apple-grade.** The bar feels coarse — content jammed top-edge, hamburger anonymous, scroll-state transition flat, logo crossfade abrupt against the hero.

## 1. Safe-area math — fix the actual bug

- Header becomes `min-h-[60px] sm:min-h-16 md:min-h-20` instead of fixed height. Safe-area padding now pushes the whole bar down rather than eating content.
- The spacer `<div h-[60px] …>` on opaque routes gets the same `min-h` plus its own `paddingTop: env(safe-area-inset-top)` so layouts don't jump.
- Direction-aware hide still uses `-translate-y-full` — the bar tucks above the status bar with safe-area included.
- Verified target: on 390×844 with a 47px safe-area, logo sits with 12px of breathing room from the status bar.

## 2. Top bar — Apple-grade polish

- **Heights tuned to iOS chrome:** mobile `min-h-[56px]` (iOS toolbar standard), md `min-h-[68px]`, lg `min-h-20`. Tightens the bar without cramping.
- **Scroll-state glass** matches iOS: `bg-background/72` + `backdrop-blur-xl` + `backdrop-saturate-150` once `scrollY > 8` (was 24 — Apple triggers translucency almost immediately). 1px bottom hairline at `foreground/8`.
- **Logo crossfade** gets a gentle 1.5px Y-translate during scroll-in to mirror iOS large-title collapse, and the cream→dark fade slows to 360ms (currently abrupt at 300ms transform alone). Drop-shadow only over hero (already in place; reduce strength by 30%).
- **Phone glyph** swap: `Phone` icon → outline weight 1.65 (currently 1.75) at 17px (currently 18) — matches SF Symbols default. Hit target stays 44×44.
- **Right cluster gap** tightens to `gap-1` on mobile (currently `gap-1 sm:gap-2 md:gap-3`) so the three items group as one assembly, not three islands.

## 3. Hamburger trigger — confident, not anonymous

The current two-1.5px-line glyph reads weak.

- Lines bump to **1.75px** (matches SF Symbols `line.3.horizontal` stroke weight) and **12px stage height** (was 10px) so the two lines sit further apart and read as deliberate, not hairline.
- Active hit halo: on `:active`, button gets `bg-foreground/[0.06]` 100ms in / 240ms out (currently 200ms both ways) — Apple's quick-attack, slow-release pattern.
- Open morph eases via `cubic-bezier(0.32, 0.72, 0, 1)` (the iOS spring curve) instead of `cubic-bezier(0.22, 1, 0.36, 1)` — feels snappier on tap.
- At md+, the "Menu" word becomes `text-[13px] font-medium tracking-[-0.01em]` (currently 14px semibold) — matches macOS menu-bar weight, less shouty.

## 4. Menu overlay — small precision pass only

The big rebuild from last round stands. Two refinements:

- **Veil scale-in** swaps to the same iOS spring curve `cubic-bezier(0.32, 0.72, 0, 1)` over 480ms (was 520ms). Feels native.
- **Close** button on the overlay matches the new hamburger weights for symmetry.

That's it for the overlay — leave the cascade, grain, vignette, CTA, and rail alone. Round 1's structure was right; only the trigger and bar were under-polished.

---

## Files touched

- `src/components/Navigation.tsx` — header `min-h` instead of `h`, spacer gets safe-area padding, tightened cluster gap, scroll threshold 8px, glass formula updated, logo Y-translate.
- `src/components/nav/HamburgerButton.tsx` — line weight 1.75px, stage h-3, iOS spring curve, refined "Menu" word weight.
- `src/components/nav/MenuOverlay.tsx` — close button weights match new hamburger.
- `src/index.css` — `.nav-shell` scroll-shadow strength reduced; `.menu-overlay__veil` curve swap.
- `mem://index.md` — update the nav-bar-glass rule (`scrollY > 8`, new opacity), the hamburger spec (1.75px lines, 12px stage, iOS spring), and the bar height tokens.

## Out of scope

- Overlay layout, type scale, cascade, grain, vignette, CTA, contact rail — all untouched from round 1.
- Footer, hero, page content, colors, fonts.

## Performance

No new JS. CSS-only changes plus prop tweaks. Backdrop-blur-xl is the same primitive Safari already optimizes; no extra paint cost vs current `backdrop-blur-md`.

## Verification

I'll reload the preview at 390×844, confirm:
1. Logo + icons have ≥8px clearance from top in the simulated safe area
2. Glass appears within first 8px of scroll
3. Hamburger lines visibly thicker, more confident
4. No layout shift on scroll
