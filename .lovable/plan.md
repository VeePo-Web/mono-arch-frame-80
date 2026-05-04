# Nav Bar Refresh — Flex × Royal Aesthetic

The current `Navigation.tsx` is a solid 60/64-px bar with a centered `SectionRail` and a Phone · Quote · Menu cluster. It works, but reads heavier than the references:

- **FlexServices** uses a **transparent header that morphs to glass on scroll** (`bg-white/98 backdrop-blur-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]` past 50px), tight 64–72px height, one centered nav with hover underline, an outline CTA, and a single icon-only hamburger on mobile.
- **RoyalMechanical** keeps the bar **transparent over the hero**, fades a soft mobile scrim for legibility, runs a centered section rail with a 0.5px sliding underline, and right-aligns Phone-icon · solid CTA · hamburger.

Both feel lighter than ours because (a) they don't paint a border under the hero, (b) the right cluster collapses to icons earlier on mobile, and (c) the section rail has no weight bump on the active anchor — only the underline moves.

## What we'll change

### 1. `Navigation.tsx` — scroll-aware transparency
- Add a throttled scroll subscription (`useThrottledScroll` hook, new — 50px threshold, 16ms throttle, rAF-based, mirrors Flex/Royal).
- Header classes:
  - **At top** (`!scrolled`): `bg-transparent border-transparent shadow-none`.
  - **Scrolled**: `bg-background/95 backdrop-blur-md border-b border-border/50 shadow-[0_4px_24px_rgba(15,23,42,0.04)]`.
- Apply a one-shot opacity transition (300ms ease) on `background-color, border-color, box-shadow`.
- **Mobile-only top scrim** (Royal trick): when transparent and on a route whose hero is dark (Index, Areas, Service detail), render a `sm:hidden absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-transparent` so the logo + icons stay legible over photography. Detection = simple route allow-list in `lib/pageSections.ts` (export `routeHasDarkHero(pathname)`).
- Height: keep `h-[60px] sm:h-16`. Drop the always-on `border-b` from the header element (the scrolled state owns it).

### 2. Right cluster — quieter on mobile
- **Phone**: stays icon-only `<lg`, full number `lg+`. Stroke 1.75 (was 1.85) for a hair more refinement.
- **Quote CTA**: shrink mobile padding (`px-3.5` instead of `px-4 sm:px-5`); keep `h-11` and the square 8px radius. Copy stays "Get a Quote".
- **Hamburger**: unchanged shape, but its hover state becomes `hover:bg-foreground/[0.06]` for a touch more contrast on the transparent state.
- Gap: `gap-1` mobile → `gap-2 lg:gap-3`.

### 3. `SectionRail.tsx` — underline-only active state
- Remove the `font-semibold` weight bump on active. Active anchor is signalled **only** by the underline (`scaleX(1)`), matching Royal. Inactive labels gain `font-medium text-foreground/70`; active gets `text-foreground`.
- Tighten padding `px-3 py-2` → `px-3.5 py-2`, gap `gap-0.5` → `gap-1` for a calmer rhythm.
- Underline: thin to 1.5px, position `bottom-1.5`, `bg-evergreen` (was generic). Add `transition-transform duration-400 ease-out` so when sections change, it slides via the existing FLIP shared-indicator CSS vars (already present in `index.css`).
- Hide rail entirely when scrolled is `false` and the route has a dark hero — let the logo breathe over the hero (Royal does this with the footer-progress fade; we do it with the hero-state flag).

### 4. `MenuDrawer.tsx` — small polish only
- Tighten the close-button hover to match new hamburger hover token (`hover:bg-foreground/[0.06]`).
- No structural changes — the round-6 drawer is already correct per memory.

### 5. `index.css` — supporting tokens
- Add `.nav-shell--transparent` and `.nav-shell--scrolled` utility classes that consolidate the bg/border/shadow trio so the JSX stays terse.
- Update `.nav-tab-rule` to the thinner 1.5px evergreen underline with the slower 400ms transition.

### 6. New tiny hook: `src/hooks/useScrolled.ts`
```ts
// Returns boolean; rAF-throttled scroll listener with passive option.
// Threshold prop, default 24. Initial value computed from window.scrollY
// so SSR/first-paint match.
```
Used by `Navigation.tsx` only — keep it scoped, no global state.

## Out of scope
- No changes to Footer, drawer structure, or section-rail anchor lists.
- No new copy on the CTA. No reintroduction of social icons (Flex has them; we don't — tradesman persona).
- No sticky mobile CTA bar (constraint: `mem://constraint/no-floating-fab`).

## Memory updates
- Append to **Core**: "Nav bar is transparent over the hero on Index/Areas/Service-detail; gains `bg-background/95` + soft shadow only past 24px scroll. Mobile-only top scrim provides legibility — never apply on desktop."
- Append to **Core**: "Section-rail active state is underline-only — never bump font-weight."

## Files touched
- `src/components/Navigation.tsx` (refactor)
- `src/components/nav/SectionRail.tsx` (active state, padding, hide-on-hero)
- `src/components/nav/HamburgerButton.tsx` (hover token)
- `src/components/MenuDrawer.tsx` (close-button hover token)
- `src/hooks/useScrolled.ts` (new)
- `src/lib/pageSections.ts` (add `routeHasDarkHero`)
- `src/index.css` (`.nav-shell--*`, `.nav-tab-rule` refinements)
- `mem://index.md` (two Core lines)
