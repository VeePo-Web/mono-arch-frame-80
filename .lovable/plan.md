## Nav scroll behavior — smoother hide / reveal

Pages audit passed: Index, About, Services, Work, Contact all match the Core memory's section spec — no page is missing or carrying extra sections. The only change is the nav scroll behavior.

### What changes

Tune the existing direction-aware hide in `Navigation.tsx` so it stops feeling jittery on slow scrolls and small finger gestures, while still getting out of the way when reading long content.

1. **Raise the hide threshold** from `240` → `320` px. Below that the bar always stays visible — covers the entire hero + first scroll into content.
2. **Require a larger delta** before toggling: change the `4` px scroll-delta gate to `12` px going down and `8` px going up. Small reverse jiggles (trackpad inertia, momentum scroll on iOS) no longer pop the bar on/off.
3. **Cooldown between toggles** — store `lastToggleAtRef` (timestamp) and ignore further direction flips for 180 ms after a toggle. Prevents rapid up/down "blinking".
4. **Slow the slide** from `duration-500` → `duration-[600ms]` and keep the existing `cubic-bezier(0.22,1,0.36,1)` easing. The bar settles instead of snapping.
5. **Reduced motion**: when `prefers-reduced-motion: reduce`, disable hide entirely — bar stays pinned.
6. **Always show near top**: keep the existing `y < 80 → show` rule so the bar is guaranteed visible over the hero.

### Files

- `src/components/Navigation.tsx` — update the rAF handler constants + add cooldown ref + bump transition duration + reduced-motion guard.
- `mem://index.md` — update the Core line `"Direction-aware hide past 240px"` → `"Direction-aware hide past 320px with 12/8px deltas, 180ms cooldown, 600ms slide; disabled under prefers-reduced-motion"`.

### Out of scope

- Logo crossfade, inline routes, CTA, backdrop, MenuOverlay — all already correct, untouched.
- Page sections — audit clean, no edits.
