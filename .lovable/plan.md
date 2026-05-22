# Section: Global → Nav (bar + drawer + page-to-page transitions)

## What's actually broken right now

### 1. SectionRail is pointing at anchors that no longer exist
`src/lib/pageSections.ts` is stale and is producing **dead in-page links** the user can click — the single worst friction bug in the nav.

- **Home** rail tabs: `services-preview`, `how-it-goes`, `areas` → none of these `id`s exist on `/`. Home is now only Hero (`hero-heading`), RecentWorkPreview (`recent-work`), BigCloseCTA. Clicking any rail tab scrolls to nothing.
- **Services** rail: `services-three` (✓) + `quote` (dead — no `#quote` on the page). One live, one dead.
- **About** rail: `philosophy`, `respect` → page actually uses `how-we-work`, `areas`. Both dead.
- File also still configures `/services/interior-finishing`, `/services/exterior-finishing`, `/services/decking`, `/service-areas` — routes that don't exist (Core rule violation).

### 2. The section rail itself shouldn't exist on this site
Core rule + questionnaire say the nav is: logo · 4 routes · Quote CTA. After the recent simplification each page has 1–3 sections — there is nothing meaningful to in-page-navigate to. The rail is decorator chrome that creates the dead-link bug above and steals the center column from the 4 routes the user actually wants reachable in one click.

At `lg+` today the 4 top-level routes are reachable **only** through the drawer. That's a hidden nav on desktop — the opposite of frictionless. Apple/Calemwood/FlexServices all surface their handful of routes inline.

### 3. Desktop hover doesn't warm chunks
`onPointerDown` + `onFocus` warm route chunks, but desktop users hover for ~200ms before clicking. Adding `onMouseEnter` gives ~200ms of free prefetch headroom → routes commit truly instantly.

### 4. Minor
- `useScrollProgress`-driven `railOpacity` becomes dead code once the rail is gone.
- `useActiveSection` hook + `pageSections.ts` + `SectionRail.tsx` become unused → delete.

## Fix (smallest possible change, deletion-first)

### A. `src/components/Navigation.tsx`
Replace the center `<SectionRail />` slot with the **4 top-level routes inline** (lg+ only), styled to match the section-rail's quiet voice so the visual rhythm of the header doesn't change.

- Inline links: `About · Services · Work · Contact`
- `text-sm font-medium text-foreground/65 hover:text-foreground transition-colors duration-300`
- Active route gets `text-foreground` + a 1.5px evergreen underline (`after:` pseudo, matching the rail-indicator grammar — no JS measuring needed for a static set of 4).
- Each link wires `onPointerDown` + `onMouseEnter` + `onFocus` → `prefetchRoute(to)`.
- Drop `railOpacity` math + the `transition-opacity` wrapper. Center column is now always visible at lg+.
- `<HamburgerButton>` stays mobile-only (`<lg`) — unchanged. Drawer still owns nav on mobile.

### B. Delete dead code
- `src/components/nav/SectionRail.tsx` — delete
- `src/hooks/useActiveSection.ts` — delete (only consumer was SectionRail)
- `src/lib/pageSections.ts` — keep ONLY `routeHasTransparentTop()` (still used by Navigation). Drop `PageSection`, `pageSections` map, `getPageSections`.
- `src/index.css` — drop `.section-rail`, `.section-rail-mask`, `.rail-indicator`, `.nav-tab` rules. (Will inspect after first edit and remove what's orphaned.)

### C. Drawer — keep, two micro-tweaks
- Add `onMouseEnter={() => prefetchRoute(to)}` to `DrawerLink` and the Home link (parity with header).
- Otherwise leave alone — drawer is solid, opens lazy, closes via X or backdrop, motion is correct.

### D. Memory update
Update `mem://index.md` Core to retire SectionRail and codify the new lg+ inline-routes pattern:
- Remove the four section-rail rules (visibility, FLIP indicator, anchor cap, label voice).
- Add: "At lg+ the header surfaces the 4 top-level routes inline (About · Services · Work · Contact) as quiet text links — active route gets a 1.5px evergreen underline. Section rails are retired; pages stand on their own scroll."

## Out of scope (intentionally not touching)

- `App.tsx` `AnimatedRoutes` + `startTransition` — already correct, prevents the Suspense blank-flash. ✓ verified clean.
- `RoutePrefetcher` idle warming — already at 600ms / rIC. ✓.
- `HamburgerButton` morph, drawer overlay, drawer motion — ✓ clean per Core.
- Phone link, Quote CTA shape/contrast — ✓ clean per Core.
- Scroll-tied `--nav-bg` glass — ✓ clean per Core.

## Verification

1. `code--view` each edited file after change.
2. `browser--navigate_to_sandbox` `/`, screenshot at 1440 → confirm 4 inline routes visible + active underline on `/`.
3. Navigate `/` → `/about` → `/services` → `/work` → `/contact` — confirm zero blank-flash, zero dead-link scroll-to-nothing.
4. Screenshot at 390 → confirm hamburger still owns nav, header chrome unchanged.
5. `code--read_console_logs` clean, `code--read_runtime_errors` clean.

## Files changed (preview)

- `src/components/Navigation.tsx` — center column becomes 4 inline routes
- `src/components/nav/MenuDrawer.tsx` — add `onMouseEnter` prefetch
- `src/components/nav/SectionRail.tsx` — **deleted**
- `src/hooks/useActiveSection.ts` — **deleted**
- `src/lib/pageSections.ts` — trimmed to `routeHasTransparentTop` only
- `src/index.css` — drop orphaned `.section-rail*` / `.rail-indicator` / `.nav-tab` rules
- `mem://index.md` — Core updated
