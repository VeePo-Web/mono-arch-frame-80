Make PhotoBleed more subtle across all pages.

### Current state
PhotoBleed renders full-bleed images between text sections with:
- Heights: `min-h-[40svh] md:min-h-[55vh] lg:min-h-[60vh]`
- Top/bottom dissolve gradients: `h-16 md:h-24 lg:h-32`

### Changes
1. **Reduce height** — drop each breakpoint by ~10-15% so the bleed whispers rather than banners:
   - `min-h-[35svh] md:min-h-[48vh] lg:min-h-[52vh]`
2. **Deepen the edge dissolve** — extend gradient height and pull the opaque stop closer to the edge so the photo peak is narrower and softer:
   - `h-20 md:h-28 lg:h-40`
   - shift the 60% opacity stop to 50% for a gentler transition
3. **Slightly mute the image** — add a barely-there warm overlay (`bg-background/[0.08]`) across the photo so it sits quieter against the cream page.

### Scope
Only `src/components/PhotoBleed.tsx`. No changes to call sites, alt text, or positioning.