# Sticky Navigation Refinement — Editorial Polish

## Context

The current `src/components/Navigation.tsx` is already a **floating glass island** with an `IntersectionObserver`-driven `scrolled` state and a custom full-screen mobile overlay. It's good — but three things hold it back from feeling intentional:

1. **The scroll state is too subtle.** `bg-background/72 → bg-background/72` (no change). The pill should *visibly* settle into a denser, more authoritative state once you've scrolled past the hero.
2. **The mobile menu is hand-rolled** (`open` state + body-overflow lock + manual focus trap missing). Swapping to the existing `@/components/ui/sheet` primitive gives us proper focus trap, escape-to-close, and Radix-managed scroll lock — for free, with no visual regression.
3. **The active-route affordance is a 3px dot** that's hard to see. A short hairline underline reads as more editorial and is consistent with the dossier-strip language we just added on sub-pages.

This is a refinement pass — no architecture changes, no new components beyond pulling in `Sheet`. The brand language (warm off-white plaster, evergreen accent, Fraunces italics, ease-weighted timing) stays exactly as-is.

---

## Filtering through the three values

- **Elevate the human experience** — Reduced-motion users currently get the full island contraction animation. We'll honor `prefers-reduced-motion` and snap the scroll-state instead. Mobile menu becomes properly accessible (focus trap, escape key, return-focus on close) by leaning on the Sheet primitive.
- **Embody brand truth** — The nav should *feel* like the rest of the site: hairline rules, Fraunces italics for the brand mark on mobile menu, evergreen-on-warm-off-white. Today the mobile overlay uses `bg-background/85` which loses the plaster grain — we'll restore it with the same noise-svg veil pattern already used elsewhere.
- **Innovate responsibly** — No new dependencies. We use the Sheet that's already in the codebase (`src/components/ui/sheet.tsx`), already a Radix Dialog underneath. No JS animation libraries, no scroll listeners — keep the IntersectionObserver pattern.

---

## Changes (5 focused edits)

### 1. `src/components/Navigation.tsx` — scroll-state contrast + active underline + Sheet

**Scroll-state styling — make it earn its presence.**

Currently both states use `bg-background/72`. Tighten the rest state and densify the scrolled state so the pill *visibly* resolves as you scroll:

| State | Background | Ring | Shadow |
|---|---|---|---|
| **Rest** (top of page) | `bg-background/55` | `ring-foreground/[0.06]` | soft 18px shadow |
| **Scrolled** (>80px) | `bg-background/85` | `ring-foreground/[0.10]` | tighter 14px shadow + 1px highlight |

Both sit on `backdrop-blur-xl` — the difference reads as the pill *firming up*, not changing chrome.

**Active-route affordance — replace dot with hairline underline.**

Replace the 3×3px scaling dot with a 12px hairline that draws in via `scaleX` from center. Sits 4px below the chip, matches the dossier-strip rule on sub-pages, reads as editorial not UI.

**Brand-mark transition — keep the swap, sharpen the timing.**

The `scrolled ? logoMark : logo` swap is good. We'll add `will-change: opacity` and crossfade them with absolute positioning so there's no layout shimmy during the swap.

**Reduced-motion respect.**

Wrap the duration classes in a media query so users with `prefers-reduced-motion: reduce` get an instant snap (`duration-0`) instead of the 700ms ease.

**Mobile menu — swap to `Sheet`.**

Replace the hand-rolled `{open && (...)}` block with `<Sheet open={open} onOpenChange={setOpen}>` + `<SheetContent side="right">`. We get:

- Proper focus trap (Radix)
- Escape-to-close (Radix)
- Scroll lock (Radix — drop our manual `body.style.overflow` effect)
- Return-focus to trigger on close (Radix)
- A11y: `aria-modal`, `role="dialog"`, labelled by SheetTitle (we'll add an `sr-only` SheetTitle)

The Sheet renders from the right with `slide-in-from-right` — feels like the menu pulls out of the hamburger, more intentional than fade. Width: `w-full sm:max-w-md` so on mobile it covers the screen, on tablet it's a panel.

Inside the Sheet, keep the same content (logo top-left, big serif italic links, CTA at bottom) but:

- Use the same `dossier-strip` rule above the link list — visually echoes sub-page heroes
- Add the noise-svg plaster veil (the one already in the file) so the menu surface matches the rest of the site
- Stagger reveals via `reveal-up` with 70ms increments (already in the file, keeps it)

### 2. `src/components/ui/sheet.tsx` — no changes

Already in the project, already used elsewhere. We just import from it.

### 3. `src/index.css` — three small additions

Add to the `@layer components` block (near the existing `.icon-chip` and `.dossier-strip`):

```css
/* Nav island — scroll-state crossfade for the brand mark */
.nav-mark { transition: opacity 500ms var(--ease-weighted); }
.nav-mark[data-state="hidden"] { opacity: 0; pointer-events: none; }

/* Active-route hairline — editorial alternative to a dot */
.nav-active-rule {
  position: absolute;
  left: 50%;
  bottom: -2px;
  height: 1px;
  width: 14px;
  margin-left: -7px;
  background: hsl(var(--evergreen) / 0.7);
  transform-origin: center;
  transition: transform 500ms var(--ease-swift);
}

/* Reduced motion — snap, don't slide */
@media (prefers-reduced-motion: reduce) {
  .nav-island, .nav-mark, .nav-active-rule { transition-duration: 0ms !important; }
}
```

### 4. `src/components/Navigation.tsx` — drop the manual scroll-lock effect

Once Sheet handles it, this useEffect becomes dead code:

```tsx
useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [open]);
```

Remove it.

### 5. Verification

- `bun run build` — confirm clean build
- Visual spot-check at top of page (rest state) and after scrolling 200px (scrolled state) — confirm the pill visibly densifies
- Mobile menu open/close — confirm focus trap, Escape, and return-focus work
- A11y: tab into nav, confirm the active-route underline is visible at all sizes; confirm reduced-motion snaps instantly

---

## Out of scope (deliberately)

- **No new components.** The plan stays inside `Navigation.tsx`, the existing `Sheet`, and small CSS additions.
- **No layout changes.** The pill keeps its center-floating position and max-width.
- **No content changes.** Same five links, same CTA copy, same logo assets.
- **No dependencies added.**
