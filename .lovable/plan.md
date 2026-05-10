## Section: Global → Nav (header bar + drawer + section rail)

Focus of this pass: **instant page transitions**. Pointer-warm + idle prefetch already landed last round, so by click-time the next route's JS chunk is in cache. The remaining "flash" comes from one place: `Suspense fallback={<RouteFallback />}` in `App.tsx:74` swaps a blank cream slab over the page for one paint tick even when the chunk is already loaded.

### Issues found

1. **`src/App.tsx:64,74` — `RouteFallback` is a `min-h-screen bg-background` blank slab.**
   On warm clicks the chunk resolves synchronously, but Suspense still unmounts the old route and paints the fallback for ~1 frame before the new route appears. Visible as a cream flash, especially against the transparent-top nav.
   → Use `startTransition` on every navigation so React keeps the *previous* route painted until the new one is ready, and change the fallback to `null` (chunk is already warm — fallback should never actually paint; if it does, painting nothing is better than painting a slab).

2. **`src/App.tsx:69` — Navigation lives outside any transition wrapper.**
   React Router doesn't auto-wrap clicks in `startTransition`, so the old tree tears down immediately even with a warm chunk.
   → Wrap `<Routes>` consumption in a tiny component that calls `useTransition()` and feeds the deferred `location` to `<Routes location={…}>`. Standard React-Router-v6 pattern.

3. **`src/components/RoutePrefetcher.tsx:37` — idle-callback fallback is `setTimeout(run, 2500)`.**
   On Safari (no rIC), warming is delayed 2.5s; first click into Services from `/about` within that window still cold-loads. Prefetch on pointerdown saves it most of the time, but tightening the fallback to ~600ms removes the edge case.
   → `setTimeout(run, 600)` for the non-rIC branch.

4. **`src/components/Navigation.tsx:108` — Phone link uses `transition-[color,transform] duration-150`.**
   Off-cadence (Core: 300ms color). Microscopic, but it's the same bug we fixed on `HamburgerButton` last round.
   → Change to `duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]` for color; keep press scale snappy via the existing `active:scale-[0.96]`.

5. **`src/components/nav/MenuDrawer.tsx:104` — drawer Home link `onClick` runs `onOpenChange(false)` synchronously, then React Router navigates.**
   On a cold-ish home click this can cause the drawer to start closing while the route is still tearing down → 1 frame of "drawer half-open + blank screen." Wrapping the navigation work in `startTransition` (issue #1/#2) fixes this transitively — no separate change needed once the transition wrapper is in place.
   → No edit. Verified by issue #2.

6. **`src/components/nav/SectionRail.tsx`** — ✓ clean. FLIP indicator, single shared underline, anchor scroll only (no route change), nothing to fix.

7. **Header bar (`Navigation.tsx`) chrome (logo, CTA, hamburger, scrim)** — ✓ clean. Square solid-evergreen CTA, square ghost hamburger, transparent-on-top with scroll-driven `--nav-bg`, `fetchpriority` warning fixed last round.

8. **Drawer chrome (overlay, columns, CTA, close X)** — ✓ clean. One Pages column, single close X, opaque panel, no backdrop-filter on overlay.

### Files to change

- **`src/App.tsx`**
  - Replace `RouteFallback` with `null`.
  - Add a small `AnimatedRoutes` component inside the file that calls `useTransition()` and `useLocation()`, keeps a `displayedLocation` state, and on every `location` change calls `startTransition(() => setDisplayedLocation(location))`. Render `<Routes location={displayedLocation}>` inside it. Replace the existing `<Suspense><Routes>…</Routes></Suspense>` block with `<Suspense fallback={null}><AnimatedRoutes /></Suspense>`.

- **`src/components/RoutePrefetcher.tsx`**
  - Change `setTimeout(run, 2500)` → `setTimeout(run, 600)`.

- **`src/components/Navigation.tsx`**
  - Phone `<a>` className: swap `transition-[color,transform] duration-150` → `transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]` (drop the transform from the transition list — `active:scale-[0.96]` doesn't need a transition declaration to feel snappy, and removing it stops a ghost transform animation on focus).

### Out of scope

- React Router v7 future-flag warnings (informational).
- Any route-fade visual treatment beyond "no flash" — the Core memory's 140ms `.route-fade` is already wired on page roots; we are not touching it.
- Section-rail behaviour (already clean).
- Drawer motion / staggers (already clean).

### Verification

- `browser--navigate_to_sandbox` → `/` → click `About`, `Services`, `Work`, `Contact` from header CTA, drawer, and (where applicable) cross-route. Watch for any cream flash.
- Repeat at 390px (mobile drawer path) and 1440px (desktop direct-link path).
- `code--read_console_logs` + `code--read_runtime_errors` clean.
- Confirm `useTransition`'s `isPending` doesn't need to gate anything visually — old route stays painted, new route swaps in when ready, no spinner needed.
