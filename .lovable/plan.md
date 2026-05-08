# Round 12 — The big simplification

Right now the site carries **three service-detail pages**, **four area-detail pages**, and a **dual-filter Work gallery** — eleven extra surfaces a homeowner has to navigate to understand "what do you do, where, and what does it look like." Fantasy.co and RoyalMechanical are calm because they answer those questions on **one screen each**: a single overview page per topic, no drill-downs. We collapse to that.

## The new site map (8 routes → 5)

```
BEFORE                              AFTER
/                                   /
/about                              /about
/services                           /services        ← short blurbs only, no drill-down
/services/interior-finishing        ✗ delete
/services/exterior-finishing        ✗ delete
/services/decking                   ✗ delete
/work                               /work            ← one gallery, no filters
/service-areas                      (folded into /about footer rail)
/service-areas/bragg-creek          ✗ delete
/service-areas/rocky-view-county    ✗ delete
/service-areas/bearspaw             ✗ delete
/service-areas/water-valley         ✗ delete
/contact                            /contact
/thank-you                          /thank-you
```

## What changes, file by file

### 1. `src/pages/Services.tsx` — short-description list, no row-rail-drill-down
Strip the row rail (lines ~60-110) that links each service to its detail page. Replace with **three quiet text blocks**, side-by-side at `lg+`, stacked on mobile. Each block: title + the existing `cardBody` from `services.ts` (2-3 sentences). No "explore →" arrow, no scope bullets, no hover wash, no `<Link>`. The whole page becomes: `SubPageHero` → 3-up text grid → `BigCloseCTA compact`. That's it.

Also remove the `SCOPE` map (lines 17-33, already partially retired).

### 2. Delete the three service-detail pages
- `src/pages/InteriorFinishing.tsx`
- `src/pages/ExteriorFinishing.tsx`
- `src/pages/Decking.tsx`

Remove their imports, lazy declarations, and `<Route>` lines from `src/App.tsx` (lines 17-19, 91-93).

### 3. Delete the four area-detail pages + the area-detail layout
- `src/pages/areas/BraggCreek.tsx`
- `src/pages/areas/RockyView.tsx`
- `src/pages/areas/Bearspaw.tsx`
- `src/pages/areas/WaterValley.tsx`
- `src/components/AreaPage.tsx` (the shared layout — no more callers)
- The `src/pages/areas/` directory itself (becomes empty)

Remove the matching imports + `<Route>` lines from `src/App.tsx` (lines 21-24, 96-99).

### 4. `src/pages/ServiceAreas.tsx` — also delete; fold the locator info into `/about`
The four areas (Bragg Creek, Rocky View County, Bearspaw, Water Valley) become a **single named-list rail** at the bottom of `/about`: heading "Where we work" + four names rendered as plain text on one line, separated by middots. No links. No icons. No per-area page to click into. This matches the "named, never coded" memory rule and removes a whole page.

Remove the `/service-areas` route from `src/App.tsx` and the `Services` page link to it.

### 5. `src/pages/Work.tsx` — strip filters, one calm grid
Current Work page (212 lines) has Type filter + Area filter rails, a collapse toggle, `useMemo` filtering, and per-plate `PremiumCard` chrome with scope/challenge/result/why-it-mattered fields. Replace the whole body with:
- `SubPageHero` (existing, type-only)
- A **single 2-column grid (1-col on mobile, 2-col `md+`, 3-col `lg+`)** of `ProjectPlaceholder` photo plates from `galleryPlates` — title underneath each, area as a faint caption. No filters, no sort, no expand, no per-project click target.
- `BigCloseCTA compact` (existing).

Drop `useMemo`, `useState`, `ChevronDown`, `PremiumCard`, the filter constants, and the entire `renderRow` helper. Keep `galleryPlates` as the data source — but the page only reads `slug, title, category, area` + photo. The `scope/challenge/result/whyItMattered` fields stop being rendered (they stay in the data file harmlessly; we can prune them in a follow-up).

### 6. `src/components/nav/MenuDrawer.tsx` — collapse the columns
Currently the drawer (lines 14-23) has two sub-link columns: Services (3 sub-pages) and Service Areas (4 sub-pages). Both go away. The drawer becomes:
- Big "Home" link (kept)
- Single column "Pages": About · Services · Work · Contact
- Bottom rail CTA (kept)

This is closer to the RoyalMechanical/Fantasy drawer language: top-level routes only, no expandable sub-trees.

### 7. `src/pages/Index.tsx` — point CTAs at top-level routes only
Anywhere the home page references `/services/...` or `/service-areas/...` (mostly via `ServicesGrid` and the area bento), retarget to `/services` and `/about` respectively. The `ServicesGrid` photo cards become `Link to="/services"` (single destination) instead of three deep links.

### 8. `src/components/Footer.tsx`
Same sweep — any link to a service-detail or area-detail page collapses to `/services` / `/about`.

### 9. Memory update — codify the new constraint
Add to `mem://index.md` core:

> Site is exactly 5 public routes: `/`, `/about`, `/services`, `/work`, `/contact` (+ `/thank-you` post-submit). Never re-introduce per-service detail pages, per-area detail pages, or a `/service-areas` index. Services live as short blurbs on `/services`; areas live as a named-list rail on `/about`; projects live as one unfiltered gallery on `/work`. The drawer never grows sub-link columns — top-level routes only.

Also retire two stale memory references that now describe deleted UI:
- "Services page does NOT reuse the home `ServicesGrid` — it renders a full-width row rail" → replace with the new short-blurb rule.
- "Service-detail SubPageHero is type-only" → delete (no service-detail pages exist).
- "Drawer body has no horizontal primary row — single big 'Home' link + 3 columns…" → update to "single big 'Home' link + one Pages column."
- Gallery filter rails rule → retire (no filters on `/work` anymore).

## Files touched

**Edited:** `src/App.tsx`, `src/pages/Services.tsx`, `src/pages/Work.tsx`, `src/pages/About.tsx`, `src/pages/Index.tsx`, `src/components/nav/MenuDrawer.tsx`, `src/components/Footer.tsx`, `mem://index.md`

**Deleted:** `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx`, `src/pages/ServiceAreas.tsx`, `src/pages/areas/BraggCreek.tsx`, `src/pages/areas/RockyView.tsx`, `src/pages/areas/Bearspaw.tsx`, `src/pages/areas/WaterValley.tsx`, `src/pages/areas/` (dir), `src/components/AreaPage.tsx`

## Out of scope (future rounds)
- Pruning the now-unused `scope/challenge/result/whyItMattered` fields from `galleryPlates.ts` — left intact so this round stays surgical.
- Replacing `ProjectPlaceholder` with real photography — unchanged for now.
- Trimming `services.ts` to just the four fields the new Services page consumes — left intact for the same reason.

## Verification
After the patch:
1. `rg -n "/services/|/service-areas/" src` should return **zero** matches outside of comments.
2. Visit `/services/interior-finishing` and `/service-areas/bragg-creek` — both should land on the 404 page.
3. `/work` should render one grid, no filter chrome above the fold.
4. The drawer should show one Pages column, four links.
