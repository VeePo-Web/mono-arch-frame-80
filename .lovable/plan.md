## Root cause
`SubPageHero` (used on /about, /services, /work, /contact) renders its `<section>` with `data-reveal` children — H1, subhead, CTA — but the section is **not** wrapped in `RevealSection` and does **not** call `useReveal` itself. Without a `data-revealed="true"` ancestor (or self), the CSS rule `[data-reveal] { opacity: 0; … }` never lifts, so every sub-page hero stays visually blank even though the DOM is populated (which is exactly what the screenshot vs. observe trace shows).

The home `Hero` works because it already calls `useReveal` and writes `data-revealed={revealed}` on its own `<section>`.

## Fix
Wire `SubPageHero` the same way `Hero` does — self-revealing, threshold `0` so it fires immediately on mount above the fold.

**`src/components/SubPageHero.tsx`**
- Import `useReveal` from `@/hooks/useReveal`.
- Inside the component: `const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });`
- On the `<section>` add `ref={ref}` and `data-revealed={revealed}`.

That's it — one file, ~3 lines. The existing `data-reveal` cascade (120/240/360ms delays) keeps working as designed.

## Verification
- Reload `/about`, `/services`, `/work`, `/contact` in the preview and confirm the H1 + subhead + CTA appear with the cadence.
- Spot-check `/` still renders (untouched).

## Out of scope
- Home Hero (already works).
- React `fetchPriority` casing warning from `ProjectPlaceholder` (benign dev-only warning, separate file, unrelated to blank heroes — can be addressed in a follow-up if you want).
- Tailwind ambiguity warnings (`duration-[600ms]`, `ease-[cubic-bezier(...)]`) — cosmetic, dev-only.
