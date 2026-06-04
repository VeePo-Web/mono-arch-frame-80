# Two-tier nav: section anchors in the bar, routes in the menu

Adopt the Karl Salingua / Fly4Me information architecture while keeping the current Haven Creek look (cream bar, evergreen accents, brand mark crossfade, Phone · Quote · Menu right cluster). The five routes (Home · About · Services · Work · Contact) move **out** of the desktop bar and live **only** inside `MenuOverlay`. The desktop bar's inline row now shows **in-page section anchors** for the current route, with scroll-spy underline — same visual grammar as today's `.nav-link`.

## Behaviour

**Inline section row (lg+ only)**
- Per-route section maps live in `src/lib/pageSections.ts` (extended).
- Render the row only when the current route has **≥2** sections. Otherwise the bar collapses to `Logo · [spacer] · Phone · Quote · Menu` (Services / Work / Contact look clean rather than carrying one lonely link).
- Section links are buttons that smooth-scroll to `document.getElementById(id)` with an offset that matches the bar height (use the same `min-h-[64px] md:min-h-[72px] lg:min-h-[80px]` token).
- Active section detected via `IntersectionObserver` (`threshold: 0.3`, `rootMargin: "-20% 0px -70% 0px"`). Active link uses existing `.nav-link--active` treatment (evergreen + 2px underline; cream variant over hero via `data-scrolled="false"`).
- Hover behaviour, color blend via `--nav-progress`, and underline animation are identical to today's `.nav-link` — visually nothing changes, only what the links point to.

**Section map (initial)**
- `/` → `Work` (`#work`), `Contact` (`#contact`)
- `/about` → `How we work` (`#how-we-work`), `Areas` (`#areas`)
- `/services` → *(single section — row hidden)*
- `/work` → *(single section — row hidden)*
- `/contact` → *(single section — row hidden)*

**Route surface**
- `MenuOverlay` already lists the 5 routes — no change needed there. It becomes the **only** place to switch routes from the chrome.
- The Quote CTA still points to `/contact` and stays in the right cluster.
- Mobile (`<lg`) shows just the `.menu-pill` (current behaviour preserved).

**No new chrome**
- No second-tier nav, no page-title eyebrow in the bar, no breadcrumb.
- Single inline row, same spacing and silhouette as today.

## Files

- `src/lib/pageSections.ts` — extend with a typed `getSectionsForRoute(pathname)` returning `Array<{id, label}>`. Keep `routeHasTransparentTop()` as-is.
- `src/components/nav/NavLinks.tsx` — replace `NavLink` route list with section-anchor buttons sourced from `getSectionsForRoute(useLocation().pathname)`. Implements the `IntersectionObserver` scroll-spy and smooth-scroll handler (mirrors `PageNavBar.tsx` from the Karl Salingua reference, but rendered with the existing `.nav-link` / `.nav-link--active` classes — no visual rewrite). Returns `null` when sections.length < 2 so the bar collapses cleanly.
- `src/pages/Index.tsx` — wrap `RecentWorkPreview` in a `<section id="work">` and `BigCloseCTA` in a `<section id="contact">` (or pass `id` to the existing wrappers).
- `src/pages/About.tsx` — already has `id="how-we-work"` and `id="areas"`; no change.
- `src/components/Navigation.tsx` — no structural change; `NavLinks` slot stays where it is. Remove the unused `NavLink` route-list logic if it lives inside `NavLinks`.
- `mem://index.md` — update the two Core lines that currently say "inline routes" and "Desktop inline routes (`NavLinks.tsx`) are the only inline route surface… no anchor-rail / scroll-spy" to describe the new section-anchor model. Add a brief mention that routes live only in MenuOverlay.

## What stays the same

- Cream bar, scroll-driven backdrop, direction-aware hide, brand-mark crossfade, `--nav-progress`, `.nav-link` / `.nav-link--active` styling, Phone · Quote · Menu right cluster, MenuOverlay veil and its route stack, footer routes, route prefetch on hover/focus.
- No new motion vocabulary, no new colors, no new fonts.

## Out of scope

- Changes to MenuOverlay content or animation.
- New per-page sections beyond what exists. (We can add more section anchors in a follow-up if Services / Work / Contact grow.)
- Mobile section nav (mobile keeps Menu-only; sections would crowd the bar).
