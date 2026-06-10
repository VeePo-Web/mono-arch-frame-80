# Nav Bar — Always-Sticky + Craft Upgrade (fantasy.co tier)

## Intent

Keep the existing composition exactly as it is — **Logo · inline section anchors · Phone · Quote CTA · Menu pill** at `lg+`, **Logo · Menu pill** below `lg`. Don't add a link, don't change copy, don't introduce a new control. Make the bar always sticky (never auto-hide) and let every existing layer feel one tier more expensive through smoother transitions, brushed-glass legibility chrome, and refined micro-motion — the same craft pass as the About hero upgrade, applied to the header.

## Hard rails (unchanged — these stay forbidden)

- Bar layout: **Logo · inline section anchors (current page only) · Phone · Quote CTA · Menu pill** at `lg+`; **Logo · Menu pill** below `lg`. No new links, no route list in the bar.
- `min-h-[64px] md:min-h-[72px] lg:min-h-[80px]` (never a fixed `h-*`).
- Bar starts **transparent at `scrollY=0`** over hero-transparent routes; paints a cream backdrop as the page scrolls.
- Brand-mark stays the two-layer `BrandMark.tsx` crossfade driven by `--nav-progress`.
- Active route on `.nav-link--active` keeps its 2px evergreen underline, drawing from the left over 300ms `ease-weighted`.
- Quote CTA copy stays **"Get a Free Quote"**, solid evergreen, `rounded-lg`, text-only (no arrow, no icon).
- Menu pill silhouette stays `rounded-full`, `h-10 md:h-11`, dark evergreen, cream "Menu"/"Close" word visible at every breakpoint.
- No `backdrop-filter` on MenuOverlay (memory). The header's existing blur is fine.
- Phone visible at `lg+` only. No phone on mobile header chrome.
- No new dependency, no new component file.

## Behavior change

### Always sticky — remove direction-aware hide

The current header hides past 320px on down-scroll and reveals on up-scroll. **Kill it.** The bar is pinned at all times so the Quote CTA and section anchors are always one click away.

- Delete `hidden` state, `HIDE_THRESHOLD`, `DOWN_DELTA`, `UP_DELTA`, `TOGGLE_COOLDOWN_MS`, `lastToggleAtRef`, and the entire direction-aware branch in the rAF loop.
- Remove the `data-hidden` attribute from `<header>` and the `data-[hidden=true]:-translate-y-full` Tailwind variant.
- Keep `transition-transform duration-[600ms]` token (it now only ever animates to the resting position, but the class is harmless and matches the rest of the cadence). Or drop the transform classes entirely — preference: drop, since nothing else uses them.
- `lastYRef` is no longer needed; remove. The rAF loop now only writes `--nav-progress` and toggles `scrolled`.

The `useEffect` no longer depends on `menuOpen`, so its dep array becomes `[]`.

## Craft upgrades (seven precise moves)

### 1. Progressive backdrop fade (replaces the hard `data-scrolled` flip)

Today the backdrop pops on at scroll=80px. Make it bloom in smoothly across the first 80px so the transition is invisible.

- Drive `background-color`, `backdrop-filter` blur amount, and the bottom hairline opacity off `--nav-progress` (already written 0→1 across the same range) using `color-mix` and `calc`.
- `background: color-mix(in oklab, transparent, hsl(var(--background) / 0.88) calc(var(--nav-progress) * 100%));`
- `backdrop-filter: saturate(calc(100% + 50% * var(--nav-progress))) blur(calc(14px * var(--nav-progress)));`
- Bottom hairline: `border-bottom-color: hsl(var(--foreground) / calc(0.10 * var(--nav-progress)));`
- Keep `data-scrolled` attribute (rules that depend on it for legibility — `.nav-link::after` color, `.nav-link--active` color, `.nav-phone:hover`, scroll-cue text — still need a discrete switch around 50% progress). Just stop using it for background.

### 2. Brushed-glass top highlight

Once the backdrop is visible, add a 1px inset cream highlight along the very top edge so the bar reads as polished glass, not a flat wash. Opacity also rides `--nav-progress` so it doesn't appear over the hero.

- `box-shadow: inset 0 1px 0 hsl(var(--evergreen-foreground) / calc(0.10 * var(--nav-progress)));`

### 3. Nav-link micro-lift on hover

Today nav-links only shift colour and grow the underline. Add a 1px lift + a 360ms underline glow for tactile premium feedback.

- `.nav-link:hover { transform: translateY(-0.5px); }` with `transition: transform 360ms var(--ease-weighted), color 300ms var(--ease-weighted);`
- `.nav-link::after` gains a subtle `box-shadow: 0 1px 4px hsl(var(--evergreen) / 0.35)` only when `:hover` or `--active`, so the underline picks up a quiet evergreen halo.
- Active state itself stays exactly as is.

### 4. Brand-mark refined hover

Replace `hover:scale-[1.02]` with a 1px translateY lift + 320ms `ease-weighted`. Scale on a logo is jittery at high DPR; a lift is what fantasy.co does.

- Tailwind: drop `hover:scale-[1.02]`, add `hover:-translate-y-[1px]`.

### 5. Quote CTA gets a brushed-glass inner highlight

Bring the CTA into the same surface vocabulary as the menu pill (inset cream hairline) so the two right-cluster buttons feel cut from the same material.

- `.nav-quote-cta { box-shadow: inset 0 1px 0 hsl(var(--evergreen-foreground) / 0.10), 0 1px 2px hsl(145 24% 8% / 0.10); }`
- Hover keeps the existing lift + halo, with the inset highlight preserved in the layered shadow.

### 6. Menu pill — tighter, deeper shadow

- Resting shadow becomes `inset 0 1px 0 hsl(0 0% 100% / 0.09), 0 4px 14px -8px hsl(var(--evergreen-deep) / 0.55)` — a tighter softness; the looser shadow read slightly cheap.
- Hover bumps to `0 12px 30px -10px` for a real "lifting off the surface" feel. No timing change.

### 7. Inline anchor row — soft edge fade mask (lg+ only)

The section-anchors row sits in the center column. Add an 8px linear-gradient mask on its left and right edges so anchors fade in/out of view rather than starting/ending at a hard line — feels contained without adding visible rails.

- `.nav-links-row { mask-image: linear-gradient(to right, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%); }`
- Only applies at `lg+` (matches the existing `NavLinks` visibility breakpoint).

### Bonus: Phone link mirrors the nav-link micro-lift

- `.nav-phone:hover { transform: translateY(-0.5px); }` same 360ms `ease-weighted`. Keeps the right cluster cohesive.

## Files touched

- `src/components/Navigation.tsx`
  - Remove `hidden`, `lastYRef`, `lastToggleAtRef`, all `HIDE_THRESHOLD`/delta/cooldown constants and branching.
  - Simplify rAF body to: write `--nav-progress` + `setScrolled(y > NAV_PROGRESS_MAX)`.
  - Drop `data-hidden` attribute and `data-[hidden=true]:-translate-y-full` class from `<header>`. Drop `transition-transform duration-[600ms]` (no longer doing anything).
  - Effect dep array becomes `[]`.
  - Brand-mark `<Link>` swap `hover:scale-[1.02]` → `hover:-translate-y-[1px]`.
  - Wrap the existing `<NavLinks />` slot output OR add `nav-links-row` class to the existing slot (NavLinks.tsx renders its own wrapper — if so, add the class there; otherwise wrap in a `<div className="nav-links-row">` here).
- `src/components/nav/NavLinks.tsx` — quick read; if it already returns a `<div>` wrapper, add the `nav-links-row` class there to keep the mask scoped. If it returns `null` for routes without anchors, do nothing (the mask only matters when there are anchors).
- `src/index.css` — under the existing nav block:
  - rewrite `.havencreek-nav` background/blur/border to use `color-mix` + `calc` against `--nav-progress` (kills the `[data-scrolled="true"]` background rule, keeps the attribute for `.nav-link::after` colour switch and friends).
  - add the inset cream highlight (also progress-bound).
  - `.nav-link` gets the `transform` transition; `.nav-link::after` gains the conditional evergreen halo box-shadow on `:hover` / `--active`.
  - `.nav-phone:hover` gains the `translateY(-0.5px)`.
  - `.nav-quote-cta` gains the inset cream highlight in its base shadow.
  - `.menu-pill` shadow tightening.
  - Add `.nav-links-row { mask-image: …; -webkit-mask-image: …; }`.
  - Mirror new `transform` transitions inside the `prefers-reduced-motion` block (`transition-duration: 0ms`).

No other file touched. No new component. No new asset. No new dep.

## Technical notes

- All new motion runs on `transform`, `opacity`, `box-shadow`, or `color-mix` — composited, no layout thrash.
- The rAF loop becomes smaller (no direction logic), so scroll cost goes **down**, not up.
- `color-mix(in oklab, transparent, …)` is supported in all evergreen browsers we ship to (already used elsewhere in the nav).
- `mask-image` with a linear-gradient is safe; the `-webkit-mask-image` fallback is included for Safari.
- Removing `data-hidden` simplifies the DOM contract — overlay, scroll-spy, and `routeHasTransparentTop` logic are untouched.
- The bar's `z-50 fixed inset-x-0 top-0` plus the spacer `<div>` for non-transparent routes continue to handle layout offset. Nothing else needs to change.

## Out of scope (explicitly not doing)

- No layout change (no centering, no logo move, no new right-cluster item).
- No copy change.
- No change to `MenuOverlay`, `BrandMark`, `HamburgerButton` internals, `PhoneLink` markup, `pageSections`, scroll-spy, or route prefetch wiring.
- No change to mobile (`<lg`) right cluster.
- No new memory entries — composition is unchanged; the "direction-aware hide past 320px" line in the core memory note will be tightened in a follow-up but doesn't block this build.
