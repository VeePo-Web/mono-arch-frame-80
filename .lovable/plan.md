# SectionRail indicator — robust measurement

Replace the current fragile measurement (getBoundingClientRect + magic `+14/-28` padding offsets) with a layout-driven approach that reads the active tab's real geometry from the DOM and survives viewport changes, font swaps, and route reflows.

## Changes — `src/components/nav/SectionRail.tsx`

### 1. Replace `useLayoutEffect` body with a memoised `measure()` helper

```ts
const measure = useCallback(() => {
  const container = containerRef.current;
  const el = active ? tabRefs.current.get(active) : null;
  if (!container || !el) {
    setIndicator((p) => ({ ...p, visible: false }));
    return;
  }
  const cs = window.getComputedStyle(el);
  const padL = parseFloat(cs.paddingLeft) || 0;
  const padR = parseFloat(cs.paddingRight) || 0;
  // offsetLeft is relative to the nearest positioned ancestor — containerRef is `relative`.
  const x = el.offsetLeft + padL;
  const w = Math.max(0, el.offsetWidth - padL - padR);
  setIndicator({ x, w, visible: true });
}, [active]);
```

### 2. Drive `measure()` from layout effects + observers

Inside the component, after `measure` is defined:

```ts
// Re-measure whenever the active tab or section list changes.
useLayoutEffect(() => {
  // rAF coalesces back-to-back active changes (scroll spy + click).
  const id = requestAnimationFrame(measure);
  return () => cancelAnimationFrame(id);
}, [measure, sections]);

// Re-measure on container width changes (responsive, font-load, zoom).
useEffect(() => {
  const container = containerRef.current;
  if (!container || typeof ResizeObserver === "undefined") return;
  const ro = new ResizeObserver(() => measure());
  ro.observe(container);
  return () => ro.disconnect();
}, [measure]);

// Late web-font swap can change tab widths after first paint.
useEffect(() => {
  if (typeof document === "undefined" || !(document as any).fonts?.ready) return;
  let cancelled = false;
  (document as any).fonts.ready.then(() => {
    if (!cancelled) measure();
  });
  return () => { cancelled = true; };
}, [measure]);
```

### 3. Remove the magic numbers
Delete the `+14` / `-28` literals from the previous `useLayoutEffect` block — padding now comes from `getComputedStyle`, so any future change to the tab's `px-3.5` (or switching to a different padding scale) will Just Work.

### 4. Initial render unchanged
- `indicator` initial state stays `{ x: 0, w: 0, visible: false }` so the bar is opacity-0 until the first `measure()` runs.
- The active/inactive className branch stays untouched (still `font-medium` in both states — no weight bump).

## No CSS changes
`.rail-indicator` already animates `transform` + `width` with `var(--ind-x)` / `var(--ind-w)` — the same vars are still being set, just with correct values now.

## No memory changes needed
The existing Core rule already states the rail uses ONE shared sliding underline via `--ind-x`/`--ind-w`. Measurement mechanics are an implementation detail.

## Files touched
- `src/components/nav/SectionRail.tsx` — measurement helper + ResizeObserver + fonts.ready hook; remove magic-number padding offsets.

## Out of scope
- No changes to timing, CSS, route prefetch, or hamburger/drawer logic.
- No first-paint "instant" flag — current opacity-gate already prevents the visible glitch on mount.
