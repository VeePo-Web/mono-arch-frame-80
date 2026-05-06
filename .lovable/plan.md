# Section rail timing + mobile nav scrim — verify & tighten

Audit shows most of this work is **already shipped**; only one small CSS tweak remains.

## Status of each ask

### 1. Underline-only active state, thinner timing, no font-weight bump
- **Underline-only** ✅ Already in place. `SectionRail.tsx` renders one shared `.rail-indicator` (1.5px evergreen bar) — no background pill, no chip.
- **No font-weight bump** ✅ Already in place. Both active and inactive tabs use `font-medium`; only `text-foreground` vs `text-foreground/65` differs.
- **Thinner timing** ⚠️ Currently `transform/width 420ms`. Tighten to **360ms** — snappier without losing the FLIP glide. Opacity 220ms → 200ms to match.

### 2. Mobile-only top scrim over dark heroes
- ✅ Already shipped in `Navigation.tsx` (lines 83–88): a `lg:hidden` absolutely-positioned `bg-gradient-to-b from-background/70 via-background/25 to-transparent` layer behind the bar, with `opacity: 1 - navBg` so it fades out as the real glass backdrop fades in on scroll. Exactly the Flex/Royal pattern.

## The one change

**`src/index.css`** — `.rail-indicator` transition block (lines 535–538):

```css
transition:
  transform 360ms var(--ease-swift),
  width 360ms var(--ease-swift),
  opacity 200ms var(--ease-swift);
```

Update memory `mem://index.md` Core line to reflect the new timing:
> Section-rail active state is underline-only (1.5px evergreen, **360ms** slide) — never bump font-weight on the active tab.

## Out of scope
- No structural changes to `SectionRail.tsx` (measurement was hardened in the previous turn).
- No changes to the mobile scrim — it already matches the reference behaviour and renders only on `<lg` breakpoints.
- No changes to `Navigation.tsx`.
