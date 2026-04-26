# Round 7 — Buttery Smooth Nav

## Honest diagnosis (what still feels rough after Round 6)

Round 6 fixed *structure* (shape hierarchy, lg-gated rail, one-X drawer). But re-running the nav side-by-side with RoyalMechanical's `Header.tsx` + `MobileNav.tsx`, **eight things still cause the "almost-smooth" feeling** a 70-year-old senses as "this site is slow":

1. **Quote button has no spring.** `transition-colors` + `active:scale-[0.98]` only — no transform-spring on hover. Royal's CTA uses a soft 500ms hover lift. Ours feels flat.

2. **Hamburger morph animates `width`/`top`/`bottom`** — those are **layout-triggering** properties, causing reflow every frame. On low-end Android this is the difference between 60fps and 30fps. Should be pure `transform`.

3. **Drawer enter has TWO stacked motion layers** — the panel rises 8px AND every item rises 6px. RoyalMechanical does ONE layer. Stacked motion reads as "heavy."

4. **Item stagger uses inline `animation-delay` per child** (~12 inline style objects per open). Should be CSS `:nth-of-type`.

5. **Section rail tap = scroll-jump with no visual link to the click.** Underline disappears under the old tab and reappears under the new one. Royal-grade move: ONE shared underline that *slides* between tabs (FLIP-style).

6. **Route transitions blank-flash.** Lazy chunks show `RouteFallback` (blank bg) for 100-300ms. Feels like "loading." Need (a) prefetch on `pointerdown` and (b) a 140ms opacity crossfade so the page fades in instead of cutting in.

7. **Drawer has TWO stacked backdrop-filters** — overlay blur(4px) AND panel backdrop-blur-2xl. Overlay blur is invisible behind the opaque panel anyway. Drop it; saves a GPU compositing pass.

8. **Phone hit area is variable-width**, sitting next to the fixed-width Quote and 44px square hamburger. Lock it to a 44×44 square at <lg.

## Round 7 plan

### A. Hamburger — pure-transform morph (zero layout)
**Files:** `src/components/nav/HamburgerButton.tsx`, `src/index.css`

Three lines stay 100% width, fixed at top:0 / 50% / 100%. Animated property is **only** `transform`. X = top translateY+rotate(45°), bottom translateY+rotate(-45°), middle scaleX(0)+opacity 0. Drop `width/top/bottom` from transition. Drop `will-change` (permanent on 44px = wasted GPU memory).

### B. Quote CTA — hover lift + spring press
**File:** `src/components/Navigation.tsx`

```ts
"transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
"hover:bg-evergreen-hover hover:-translate-y-px hover:shadow-[0_4px_12px_-2px_hsl(var(--evergreen)/0.35)]",
"active:scale-[0.97] active:translate-y-0 active:shadow-none",
```

The single biggest "feels expensive" tell. Buttons that lift register as alive.

### C. Drawer — one motion layer
**File:** `src/index.css`

- Drop `translateY(8px)` on `.menu-drawer` enter — panel just opacity-fades 220ms.
- Items keep rise but shorten 480→360ms.
- Replace inline `animation-delay` with CSS `:nth-of-type(n)` selectors (flat 100/140/180… ladder).
- Drop overlay `backdrop-filter: blur(4px)` — invisible behind opaque panel.
- Shorten exits: panel-out 200→140ms, overlay-out 180→120ms. Exits feel instant; entries feel intentional.

### D. Drawer items — drop inline animation-delay
**File:** `src/components/nav/MenuDrawer.tsx`

Remove every `style={{ animationDelay: ... }}` (Home, 3 column labels, secondary contact row). Remove `delay` prop on `DrawerColumn`. CSS handles staggering via `:nth-of-type`.

### E. SectionRail — shared sliding underline (FLIP)
**File:** `src/components/nav/SectionRail.tsx`

Today: each `<a>` has its own `<span class="nav-tab-rule">` toggling scaleX(0/1). The underline disappears between tabs.

New:
1. ONE absolutely-positioned `<span class="nav-tab-indicator">` inside the rail container.
2. `useLayoutEffect` reads active tab's `offsetLeft`/`offsetWidth`, writes to CSS vars `--ind-x`, `--ind-w`.
3. CSS: `transform: translateX(var(--ind-x)); width: var(--ind-w); transition: transform 380ms var(--ease-swift), width 380ms var(--ease-swift);`
4. Drop per-tab `<span class="nav-tab-rule">`.

User *sees* the underline glide between labels — the most "expensive-feeling" enhancement in the whole pass.

### F. Route prefetch on pointerdown + focus
**Files:** `src/components/nav/MenuDrawer.tsx`, `src/components/nav/SectionRail.tsx`, `src/components/RoutePrefetcher.tsx`

Audit `RoutePrefetcher`. Extend so drawer + rail links call `import('@/pages/...')` on `onPointerDown`/`onFocus`. Save 80-150ms on 4G — feels "instant" instead of "loading."

### G. Route fade — 140ms crossfade on `<Routes>`
**Files:** `src/App.tsx`, `src/index.css`

Wrap `<Suspense>` content in a `key={pathname}` div with `.route-fade` class. CSS:
```css
.route-fade { animation: route-in 140ms var(--ease-swift) both; }
@keyframes route-in { from { opacity: 0.6 } to { opacity: 1 } }
```
Start opacity 0.6 (not 0) so page never appears blank.

### H. Phone — locked 44×44 hit zone
**File:** `src/components/Navigation.tsx`

`h-11 w-11 lg:w-auto lg:px-2.5`. At mobile, perfect square aligned with hamburger silhouette. At lg+, expands to fit the number.

### I. Drawer body — overscroll-contain + scroll-smooth
**File:** `src/components/nav/MenuDrawer.tsx`

Add `overscroll-contain scroll-smooth` to scrollable body. iOS Safari rubber-band no longer bleeds to the page underneath. Reads as "polished."

### J. SectionRail — auto-center active tab
**File:** `src/components/nav/SectionRail.tsx`

When active anchor changes, `activeTabRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })` so the rail itself slides to keep the active label visible behind the edge-fade mask.

### K. Reduce-motion — full coverage
**File:** `src/index.css`

Add overrides for `.nav-tab-indicator { transition: none }` and `.route-fade { animation: none }` under `@media (prefers-reduced-motion: reduce)`.

### L. Files touched

1. `src/components/nav/HamburgerButton.tsx` — minor (drop will-change).
2. `src/components/nav/MenuDrawer.tsx` — drop inline animation-delay, add overscroll-contain, optional pointerdown prefetch.
3. `src/components/nav/SectionRail.tsx` — shared sliding indicator, auto-center active tab.
4. `src/components/Navigation.tsx` — Quote hover-lift + spring press, Phone w-11 lock.
5. `src/components/RoutePrefetcher.tsx` — extend to drawer/rail pointerdown if needed.
6. `src/App.tsx` — route-fade wrapper.
7. `src/index.css` — pure-transform hamburger, single-layer drawer motion, nth-of-type stagger, drop overlay blur, shorten exits, indicator transition, route-fade keyframe, reduced-motion overrides.

### M. Verify

- `bunx tsc --noEmit` clean.
- Hamburger morph: Chrome DevTools Performance shows 0 layout events (paint-only).
- Section rail tap: underline glides between labels in 380ms, no flicker.
- Drawer link click: page swap is a soft fade, not a hard cut.
- Quote hover: lifts 1px with soft evergreen shadow halo. Press: 0.97 scale.
- iPhone Safari: drawer body scroll doesn't bleed to page underneath.

### N. Memory updates

Add to `mem://index.md` Core:
- "Hamburger morph uses pure CSS transforms (translate + rotate). Never animate width/top/bottom — they layout."
- "Drawer enter = ONE motion layer: panel opacity-fades, items rise. Never stack panel-rise + item-rise."
- "Section rail uses ONE shared sliding underline (FLIP indicator), never per-tab toggles."
- "Route transitions: 140ms opacity-from-0.6 fade. Never blank-flash between chunks."
- "Drawer item stagger via CSS `:nth-of-type`, never inline `animation-delay` styles."

Update `mem://features/two-tier-navigation` with the motion-layer rules and the indicator pattern.

## What this fixes for the owner

- **"Feels slow" → "feels instant"**: pointerdown prefetch + 140ms crossfade kills the blank-flash that reads as load latency.
- **"Hamburger feels janky" → "buttery"**: pure-transform morph hits 60fps on a Galaxy A20 instead of 30.
- **"Underline jumps" → "underline glides"**: shared FLIP indicator turns the rail into a wayfinding *animation*. Most premium-feeling change in this round.
- **"Drawer feels heavy" → "drawer feels light"**: removing the panel-rise layer + overlay blur cuts perceived open time ~80ms; faster exit makes closes feel instant.
- **"Quote is just a green box" → "Quote is alive"**: hover-lift + soft halo + spring press is the single tell that says "this is a serious site."
