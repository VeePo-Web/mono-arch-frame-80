## Section: Global → Nav (header bar + drawer + section rail)

Goal of this pass: make every nav surface feel **instant** — no blank-screen flash between routes, no first-open delay on the drawer, no React DOM warnings firing on mount.

---

### Audit findings

#### 1. Cross-route nav can flash a blank screen (the big one)
- `src/App.tsx:64` — Lazy-route Suspense fallback is `<div className="min-h-screen bg-background" aria-hidden />` (a blank cream slab).
- `src/components/RoutePrefetcher.tsx:37` — Prefetcher only runs **from `/`** (`if (pathname !== "/") return`). Once the visitor is on `/about`, clicking `Services`/`Work`/`Contact` triggers a cold dynamic-import — Suspense unmounts the page and shows the blank fallback for ~80–300 ms on average connections.
- **Core memory mandates**: *"Drawer + section-rail links warm route chunks on `pointerDown`/`focus` via `prefetchRoute()` from `@/lib/routePrefetch`."* — but `src/lib/routePrefetch.ts` **does not exist** and neither `MenuDrawer` nor `Navigation` calls anything on `pointerDown`/`focus`. Code is out of compliance.
- **Fix:**
  - Create `src/lib/routePrefetch.ts` exporting `prefetchRoute(path: string)`. It maps each top-level route to its dynamic-`import()` (mirroring `App.tsx`'s `lazy(() => import("./pages/X"))` calls), dedupes via a `Set`, and is a no-op for unknown paths or repeat calls.
  - Wire `onPointerDown={() => prefetchRoute(p.to)}` + `onFocus={() => prefetchRoute(p.to)}` onto every `<Link>` in `MenuDrawer.tsx` (the four `PAGES`, the "Home" link, both desktop/mobile CTA `<Link to="/contact">` rows).
  - Wire the same onto `Navigation.tsx`'s brand `<Link to="/">` and the header "Get a Free Quote" `<Link to="/contact">`.
  - Expand `RoutePrefetcher.tsx` to warm sibling routes from **any** route (drop the `pathname !== "/"` early return; instead, idle-import all routes except the current one).

#### 2. First drawer open is delayed by chunk fetch
- `src/components/Navigation.tsx:14` — `MenuDrawer` is `lazy()`. First hamburger tap kicks off the chunk fetch *and* renders the `Suspense fallback={null}` simultaneously — perceived as "tapped, nothing happened."
- **Fix:** Add `onPointerDown={() => import("@/components/nav/MenuDrawer")}` to the `<HamburgerButton>` wrapper (or pass through). Pointer-down fires ~80–120 ms before click on touch devices, which is enough to start the fetch warm. Also have `prefetchRoute("/contact")` fire on the same event so the drawer's CTA is warm by the time it renders.

#### 3. React DOM warning floods the console on every mount
- Console log: ``Warning: React does not recognize the `fetchPriority` prop on a DOM element… spell it as lowercase `fetchpriority` instead.``
- `src/components/Navigation.tsx:111` — `<img … fetchPriority="high" />`. React 18.2 doesn't recognise the camelCase form; React 18.3+ does. Project is on 18.2 (Hero already uses the spread-cast workaround on L97).
- **Fix:** Replace `fetchPriority="high"` with `{...({ fetchpriority: "high" } as Record<string, string>)}` — exactly the pattern Hero uses.

#### 4. Hamburger transition has no duration
- `src/components/nav/HamburgerButton.tsx:34` — `transition-[background-color,transform]` with no duration class → falls back to Tailwind default `150ms` only on `transition-all`; on a custom `transition-[…]` the default is `0s`. The hover bg flicker reads as "snap" not "warm."
- **Fix:** Append `duration-200 ease-out` to the className.

#### 5. Everything else — ✓ clean
- **Hamburger morph** — pure transforms (`translate` + `rotate`) per CSS-only `data-open` attribute. ✓
- **Drawer overlay** — opaque panel, no `backdrop-filter` (per Core). ✓
- **Drawer body** — `overscroll-contain scroll-smooth`. ✓
- **Drawer close affordance** — single icon-only square X + backdrop tap. ✓
- **Drawer body structure** — single "Home" link + ONE "Pages" column with 4 routes. ✓
- **Drawer bottom rail** — CTA-only, no trust line. ✓
- **Drawer item stagger** — CSS `:nth-of-type` (no inline `animation-delay`). ✓
- **Nav right cluster** — flat ghost icon (Phone) · square solid evergreen button (Quote) · square ghost (Menu, `<lg` only). ✓
- **Header transparency** — `--nav-bg` interpolates 0→1 over 0–80px scroll on transparent routes; pinned to 1 on `/contact` & `/thank-you`; clamped to 0 when drawer open (no double-stacking). ✓
- **Section rail** — `lg+` only, FLIP underline via `--ind-x`/`--ind-w`, fades in at scroll-progress > 0.25. ✓
- **Section-rail active state** — colour-only (`text-foreground`), no font-weight bump. ✓
- **Section-rail click** — `preventDefault` + `scrollTo({ behavior: "smooth" })` + `replaceState` for hash. No layout-trigger animations. ✓
- **CTAs (Phone/Quote/Drawer CTAs)** — all `cta-spring`, square `rounded-lg`, solid `bg-evergreen` + `text-evergreen-foreground`, ≥44px tap target, focus-ring on every interactive element, "Get a Free Quote" copy exact. ✓
- **Phone link** — icon-only `<lg`, full number `lg+`. ✓
- **Logo** — feather drop-shadow only when floating over photography (`navBg < 0.3`), 300ms `transition-[filter]`. ✓
- **Skip-to-content link** — present, `sr-only` until focus. ✓
- **Route-fade** — `.route-fade` 140ms opacity transition lives in `src/index.css` (verified earlier audits); not part of Suspense fallback. The blank flash issue is purely the cold chunk import — fixed by §1. ✓
- **No `useIsMobile` in nav** — `window.matchMedia("(max-width: 767px)")` one-shot inside click handler. ✓

---

### Files to change

1. **`src/lib/routePrefetch.ts`** (new, ~30 lines)
   - Export `prefetchRoute(path: string): void`. Lookup table:
     ```ts
     const loaders: Record<string, () => Promise<unknown>> = {
       "/about":    () => import("@/pages/About"),
       "/services": () => import("@/pages/Services"),
       "/work":     () => import("@/pages/Work"),
       "/contact":  () => import("@/pages/Contact"),
       "/thank-you":() => import("@/pages/ThankYou"),
     };
     ```
   - Dedupe with a `Set<string>`. No-op if path missing or already warmed. Swallow promise rejection (network errors must not surface).

2. **`src/components/nav/MenuDrawer.tsx`**
   - Import `prefetchRoute`.
   - Add `onPointerDown={() => prefetchRoute("/")} onFocus={…}` to the Home `<Link>` (L87-99).
   - Add the same handlers (with `p.to`) to the `DrawerLink` `<Link>` inside `DrawerLink` sub-component (L191-204) — pass an optional `onPointerDown` prop or extend `DrawerLink` to call `prefetchRoute(to)` internally.
   - Add `onPointerDown={() => prefetchRoute("/contact")}` to the desktop CTA `<Link to="/contact">` (L142-154). The mobile CTA is a `<button>` opening QuickContactSheet — no route to warm.

3. **`src/components/Navigation.tsx`**
   - Import `prefetchRoute`.
   - Add `onPointerDown={() => prefetchRoute("/")}` to brand `<Link to="/">` (L96).
   - Add `onPointerDown={() => prefetchRoute("/contact")}` to header Quote `<Link to="/contact">` (L143). Keep the existing `handleQuoteClick`.
   - Wrap the hamburger trigger so `onPointerDown` warms the drawer chunk + `/contact`:
     ```ts
     const warmDrawer = () => {
       void import("@/components/nav/MenuDrawer");
       prefetchRoute("/contact");
     };
     ```
     and pass into `<HamburgerButton onClick={openDrawer} onPointerDown={warmDrawer} />`. (Add `onPointerDown?: () => void` to `HamburgerButtonProps`.)
   - Replace `fetchPriority="high"` (L111) with `{...({ fetchpriority: "high" } as Record<string, string>)}` to silence the React warning.

4. **`src/components/nav/HamburgerButton.tsx`**
   - Add `onPointerDown?: () => void` to `HamburgerButtonProps`; pass through to the `<button>`.
   - Append `duration-200 ease-out` to the `transition-[background-color,transform]` className (L34).

5. **`src/components/RoutePrefetcher.tsx`**
   - Drop the `if (pathname !== "/") return;` early-return.
   - Inside `run()`, build the route list excluding `pathname`, then idle-import each (using `prefetchRoute` from the new helper to dedupe with on-demand pointer-down warming).
   - Keep `shouldPrefetch()` Save-Data / 2G guard.
   - Keep idle-callback orchestration; keep cleanup.

### Memory
- **No changes.** Core already specifies the canonical behaviour; this pass brings code back into compliance.

### Verify
- `browser--navigate_to_sandbox` to `/about`, click Services in the drawer (mobile viewport 390) — observe no blank flash; route mounts on the same frame.
- Reload `/about`, hover the header "Get a Free Quote" — confirm the `/contact` chunk requests fire on `pointerdown` in Network panel.
- Open the hamburger on a fresh load — confirm drawer renders within one frame (no Suspense fallback gap).
- `code--read_console_logs` — confirm the `fetchPriority` warning is gone. (React Router future-flag warnings stay; out of scope.)
- Desktop screenshot (1440) + mobile (390) — confirm no visual regression.

### Out of scope
- React Router v7 future-flag warnings (informational, not perf).
- Replacing `Suspense fallback={null}` on the drawer (already correct — flash of 0ms once the import is warm).
- Section-rail behaviour beyond what's already audited (no perceived-perf bug).
- Logo asset optimisation (`webp` already in use).
