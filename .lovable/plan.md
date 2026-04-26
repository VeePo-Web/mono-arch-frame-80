# Round 5 — Ruthless Simplification (RoyalMechanical-grade)

After studying RoyalMechanical.com's Header + MobileNav side-by-side with our current Round 4 nav, the diagnosis is clear: **we have too many controls, too much weight, and too many ideas competing for attention.** Round 5 strips it back to what a 70-year-old grandpa needs: read it, find it, tap it.

## Diagnosis — what's making it feel "complicated"

1. **Three loud controls in the right cluster** (Phone pill + Quote pill + labelled Menu pill). RoyalMechanical has one icon, one button, one hamburger — visually 1-2-3. Ours reads as 1-1-1 because all three are pill-shaped.
2. **Quote pill is doing too much work** — gradient state + arrow chip + responsive labels + mobile sheet hijack. It looks like a toolbar, not a button.
3. **Hamburger has a "Menu" word AND an evergreen pulse dot AND a 3-line glyph** — three signals where one would do.
4. **Section rail tabs have both a chip background AND a 3px underline AND a font-weight bump** — colour-blind safety doesn't need three layers; two is enough and reads cleaner.
5. **Drawer top has a duplicate row** (horizontal "Home/About/Selected Work/Contact") on top of a 3-column grid that already contains the same destinations. RoyalMechanical solves this with a single big "Home" primary link, then the columns.
6. **Drawer bottom rail crams 5 things in one strip** (trust dot, phone, dot separator, email, CTA + "or call" sub-link). RoyalMechanical's bottom is one trust line + one CTA. That's it.
7. **Performance**: SectionRail mounts a ResizeObserver + a scroll listener + a `scrollIntoView` effect on every route. The `useActiveSection` hook re-binds an IntersectionObserver + scroll/resize listeners whenever the section list changes. Both can be cheaper.

## Round 5 plan

### A. Header right cluster — visual hierarchy 1 / 2 / 3

Re-rank by visual weight, matching RoyalMechanical:
- **Phone**: icon-only on mobile, icon + number on `lg+` (was `md+`). **Ghost button**, no background chip — tertiary weight.
- **Quote**: solid evergreen pill, **no arrow chip, no responsive label split, no `nav-pill group/btn` wrapper class**. Just `Get a Quote` (sm+) / `Quote` (xs). Primary weight.
- **Menu**: icon-only hamburger (drop the visible "Menu" word — universal glyph + aria-label is enough at md+ where the word adds visual noise next to the Quote pill). Drop the evergreen pulse dot — it never tested as understandable; replace with a static 2px evergreen underline below the bars **only when current route is in drawer** (calmer signal). Tertiary weight.

Net effect: eye lands on the green Quote pill first (intended), phone is the calm always-there secondary, menu is the obvious "more" affordance.

### B. SectionRail — one cue, not three

In `src/components/nav/SectionRail.tsx`:
- Drop the background chip on the active tab.
- Keep the 2px (down from 3px) evergreen underline + the `font-semibold` weight bump. Two cues, both colour-blind safe.
- Inactive tabs: bump contrast slightly (`text-foreground/70` → `text-foreground/75`) for grandpa-grade legibility on cream.
- Tab padding: `px-3.5 py-2.5` → `px-3 py-2` so 6 home-page sections fit at `md` (currently overflows there and falls into scroll mode prematurely).
- **Perf**: replace the ResizeObserver-driven overflow detection with a CSS-only solution — always render in `overflow-x: auto` mode with edge-mask gradient, but hide scrollbar. The mask is harmless when content fits. Removes one observer per mount.

### C. useActiveSection — cheaper

In `src/hooks/useActiveSection.ts`:
- Drop the `scroll` + `resize` window listeners. The IntersectionObserver alone (with the existing `rootMargin`) gives correct results; the listeners were defensive against scroll-restore edge cases that no longer apply now that we have `ScrollToTop` resetting on every route.
- Keep the rAF debouncing.
- Add early-return when `document.hidden` to skip background-tab work.

### D. Drawer — two zones, not four

In `src/components/nav/MenuDrawer.tsx`:
1. **Remove the horizontal PRIMARY row entirely.** The 3 columns + a single oversized "Home" link (RoyalMechanical pattern) covers it. About / Selected Work / Contact appear in their natural columns instead of duplicating.
2. Keep the **3-column grid** (Services / Service Areas / Company) but:
   - Drop the evergreen left-bar on column headers (`menu-col-bar`). Use uppercase 11px tracking-widest evergreen text — already enough differentiation from the link rows.
   - Drop the `•` leading dot on active links. Just colour + `font-semibold` (matches RoyalMechanical, two cues, still colour-blind safe via weight).
   - Drop "muted" sub-rows ("All Services", "All Areas") — they're redundant when the column header itself is the index. If user wants the index, the column header becomes a link.
   - Standardize row height to `min-h-[48px]` (was `52px`) — feels less padded, fits more on a phone screen without scroll.
3. **Bottom rail simplified**: trust line on the left, single CTA pill on the right. Move phone + email into a tiny secondary row *below* the columns (left-aligned, 14px), not in the bottom rail. This eliminates the cramped strip and the "Or call…" extra link on mobile (the phone is in the secondary row already).
4. **Add a single big "Home" link** at the top of the body (24px display serif, evergreen on hover). Matches RoyalMechanical's primary anchor pattern.
5. Remove the plaster-grain SVG overlay (10ms paint cost on open, no perceptible visual benefit on a near-opaque background).

### E. HamburgerButton

In `src/components/nav/HamburgerButton.tsx`:
- Drop `showLabel`, `currentDot` props (no longer used).
- Add a `data-current="true"` attribute the parent passes when the route lives in the drawer; CSS shows a static 2px evergreen bar 4px below the icon.
- Reduce button width from `min-w-[48px]` + label to a flat `h-12 w-12` square — visually calmer next to the Quote pill.

### F. Section labels — keep the round 4 plain English; add 2 fixes

In `src/lib/pageSections.ts`:
- "/" — drop "Trust" (homeowners don't navigate to "trust"; it's a feeling, not a destination). Replace with "Why Us". Total 6 → 6 labels still, but more clickable.
- "/about" — "Long Relationships" is 17 chars and crowds the rail. Shorten to "Relationships".

### G. Performance pass (matches the user's "extremely performance optimized" ask)

1. **Lazy-load MenuDrawer**: `const MenuDrawer = lazy(() => import('./nav/MenuDrawer'))` in `Navigation.tsx`. Only loads when the user opens the menu — saves ~6KB from the LCP-critical bundle. Wrap in `<Suspense fallback={null}>` and only render when `drawerOpen || hasOpenedOnce`.
2. **Drop the `IntersectionObserver` scroll-shadow sentinel** in `Navigation.tsx`. Replace with a CSS-only approach: the bar already has a border-bottom; the shadow on scroll added ~no value and the observer is a 1-time cost per page load. Saves a hook + a DOM node.
3. **Remove `useIsMobile` from MenuDrawer** — pick the CTA flavour with a CSS media query (`md:hidden` / `hidden md:inline-flex`) instead of mounting two button variants based on JS state. Saves a re-render and removes a hydration mismatch surface.
4. **Memoize SectionRail's section list**: pass it through `useMemo` keyed on `pathname` to avoid recreating the array on every header re-render (header re-renders on scroll currently).
5. **Throttle `useActiveSection` recompute** with the rAF gate (already present) and pin the `headerOffset` arg as a primitive — already done.

Net expected: ~6KB saved off the LCP-critical bundle, one fewer ResizeObserver per page, one fewer IntersectionObserver, two fewer scroll listeners.

### H. Files touched

- `src/components/Navigation.tsx` — right-cluster refactor, lazy MenuDrawer, drop sentinel.
- `src/components/nav/HamburgerButton.tsx` — square 48px, drop label/dot props, add `data-current` underline.
- `src/components/nav/SectionRail.tsx` — drop background chip, CSS-only overflow mask, smaller tab padding.
- `src/components/nav/MenuDrawer.tsx` — single Home link, drop primary row, drop `•` dots, drop muted rows, simpler bottom rail, drop plaster grain, drop `useIsMobile`.
- `src/hooks/useActiveSection.ts` — drop scroll/resize listeners, add `document.hidden` guard.
- `src/lib/pageSections.ts` — "Trust" → "Why Us"; "Long Relationships" → "Relationships".
- `src/index.css` — strip `.menu-col-bar`, `.menu-primary--active`, `.nav-current-dot` (no longer used); add `.hamburger-current-bar`; tighten `.section-rail-mask` so it's always-on safe.

### I. Verify

- `bunx tsc --noEmit` clean.
- Browse to `/`, `/services`, `/about`, `/contact` and confirm: 1 evergreen pill, 1 ghost phone, 1 square hamburger; section rail underline only; drawer opens with a Home link + 3 columns + tiny secondary phone/email row + 1 CTA in the bottom rail.

### J. Memory updates

- Update `mem://features/two-tier-navigation` with the round 5 spec.
- Add core rule: "Hamburger is icon-only at all breakpoints — no visible 'Menu' label." (Reverses round 4 core rule.)
- Add core rule: "Drawer has no horizontal primary row — single 'Home' link + 3 columns is the canonical structure."
