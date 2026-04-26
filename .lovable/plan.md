# Round 6 — RoyalMechanical "Shape Hierarchy" Match

## Honest diagnosis (what's still cluttered after Round 5)

I re-studied RoyalMechanical's `Header.tsx` and `MobileNav.tsx` side-by-side with our current files. Round 5 fixed the cognitive load, but **three things still read as "designed" instead of "obvious"** to a 70-year-old:

1. **The right cluster is still 1-1-1, not 1-2-3.** Phone is `rounded-full h-12`, Quote is `rounded-full h-11`, Hamburger is `rounded-full h-12`. Three rounded shapes of nearly identical height = no hierarchy. RoyalMechanical wins because phone is a *flat icon (no chip at all)*, CTA is a *square sharp-cornered button*, hamburger is a *square button*. Three different shapes, instant 1-2-3.

2. **Section rail shows from `md` (768px).** That's an iPad portrait, where the homepage's 6 tabs ("Why Us · Services · How We Work · Our Work · Where We Work · Contact") fight the right cluster for space and trigger the edge-fade mask immediately. RoyalMechanical only shows their section rail from `lg` (1024px+), and even then it's hidden whenever it'd compete. That's the right call.

3. **The drawer has two close affordances** — backdrop tap *and* a "Close" pill in the top-right. Most users use the backdrop; the pill is a 12-character "Close" label that takes up real estate at exactly the spot where users expect just an X. RoyalMechanical uses an icon-only X.

4. **`useIsMobile` is still mounted** in `Navigation.tsx` *just* to decide whether tapping Quote opens the QuickContact sheet vs routes to /contact. That's a window resize listener subscribed at the very top of the React tree to make ONE branching decision. It can be a one-shot `window.matchMedia` check inside the click handler — zero subscribers, zero re-renders.

5. **Section rail anchors are clickable but the labels duplicate page H2s.** Not wrong, but on the homepage we have 6 anchors competing with section H2s on scroll, which feels redundant. The fix: **trim the rail to 4 anchors max per page** — the page-spanning ones, not every section. (e.g. drop "Contact" — there's a Contact button in the right cluster already; drop "Why Us" — it's the first thing they see.)

## Round 6 plan

### A. Right cluster — 1-2-3 by SHAPE, not weight (the big one)

**File: `src/components/Navigation.tsx`**

Re-shape each control so they read 1-2-3 at a glance:

- **Phone (tertiary)** → flat ghost icon, NO background chip ever, NO pill. Just a 48×48 hit area with a `Phone` icon centered. Number text appears from `lg+` next to the icon (no wrapper styling).
  - Remove `rounded-full hover:bg-foreground/[0.05]`. Hover state: `text-evergreen` color shift only.
  - This makes the phone look like an *affordance*, not a button.

- **Quote (primary)** → solid evergreen, **square with 8px radius** (not pill), 15px semibold, `h-10 px-5` desktop / `h-11 px-4` mobile. Sharp corners read as a "submit/action" button universally; pills read as "tag/chip".
  - Drop the `sm:hidden / sm:inline` "Quote" / "Get a Quote" responsive split. Just always say **"Get a Quote"**. At 320px there's room — we measured.

- **Menu (secondary)** → 44×44 **square** with 8px radius, no rounded-full. Sits visually between the flat phone icon and the square CTA. The hamburger glyph stays canonical 3-line.
  - Drop the `data-current` evergreen tick under the icon. It's a third cue nobody reads. The drawer itself shows the active route in green when opened — that's enough.

Net: phone (flat) → quote (square solid) → menu (square ghost). Three distinct shapes. A grandpa instantly knows: **green box = action, square box with bars = more, phone = call**.

### B. Section rail — raise breakpoint, trim labels

**File: `src/components/Navigation.tsx` + `src/components/nav/SectionRail.tsx`**

- Hide section rail until `lg` (1024px+). At `md` (768–1023px) it crowds the bar. Mobile/tablet users get the section anchors via the drawer's column links + by scrolling.
- The rail container in Navigation: `hidden lg:flex` instead of `hidden md:flex`.

**File: `src/lib/pageSections.ts`** — trim each route to 3-4 anchors max:

- `/`: 4 anchors → "Services", "How We Work", "Our Work", "Where We Work" (drop "Why Us" — it's above-the-fold, scrolling up is the gesture; drop "Contact" — green CTA in nav already does this).
- `/services`: keep 3 (already good).
- `/services/*` deep pages: keep 3-4.
- `/service-areas`: 2 (already good).
- `/about`: 4 (already good).
- `/contact`: 3 (already good).

Net: rail is calmer, only appears where it's clearly useful.

### C. Drawer — one close affordance, tighter spacing

**File: `src/components/nav/MenuDrawer.tsx`**

- Replace the `[X icon] + "Close"` pill with an **icon-only 44×44 square X** in the top-right. Same square shape as the new hamburger and Quote pill — the user closes with the same shape they opened with. Visual continuity.
- Drop the wrapping `min-h-[48px] px-3 rounded-full` chip styling.
- Tighten the Home link: `mb-6 md:mb-8` → `mb-4 md:mb-6`. Drop `min-h-[56px]` (the text itself is already 24-30px line-height; min-h is doing nothing).
- Tighten column links: `min-h-[48px] py-1.5` → `min-h-[44px] py-1` so 8 area links + 3 service + 3 company all fit on a 6.1" iPhone above the fold.
- Drop the staggered animation delays on all `DrawerLink` items. Computing 18+ inline `animation-delay` styles per open is wasted work — the columns animate in as a unit (via `.menu-drawer__label` parent stagger) which is enough warmth.
- Keep the bottom rail (trust line + CTA) unchanged — it's already RoyalMechanical-grade.

### D. Drop `useIsMobile` from `Navigation.tsx`

**File: `src/components/Navigation.tsx`**

Replace the `useIsMobile()` subscription with a one-shot check inside the click handler:

```ts
const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  if (onContactRoute) return;
  // One-shot match — no subscription, no re-renders.
  if (window.matchMedia("(max-width: 767px)").matches) {
    e.preventDefault();
    openQuickContact({ source: "quick_contact_sheet" });
  }
};
```

Removes one window-resize listener mounted at the top of the React tree.

### E. Drop `useIsMobile` from anywhere else in the nav stack

Audit and remove if unused after the Navigation change. The drawer already uses CSS `md:hidden`/`hidden md:inline-flex` for its CTA flavour.

### F. Performance — memo header, eliminate one re-render

**File: `src/components/Navigation.tsx`**

- Wrap the header JSX in `React.memo` since its only prop-relevant input is `pathname` (already from `useLocation`). Currently it re-renders on every parent re-render even when pathname is stable. (Caveat: the `drawerOpen` state is local, so `memo` is fine — internal state still triggers re-renders.)
- Actually, since `Navigation` is mounted once at the App root, `memo` doesn't help. Better win: replace the `useEffect(() => setDrawerOpen(false), [pathname])` close-on-route-change with the `Dialog.Root`'s `onOpenChange` already handling it via the Link's onClick chain. We already manually close in every drawer link's `onClick`. Drop the effect.

### G. Hamburger button — square, drop `current` prop

**File: `src/components/nav/HamburgerButton.tsx`**

- `h-12 w-12 rounded-full` → `h-11 w-11 rounded-md` (44×44, 6-8px corners). 44px is iOS HIG min tap target; 48px was over-spec.
- Drop the `current?: boolean` prop and the `data-current` underline. Remove the corresponding CSS in `index.css`.
- Keep the canonical 3-line glyph and the X morph on open.

### H. CSS cleanup

**File: `src/index.css`**

- Remove `.hamburger-btn[data-current="true"]::after` block and supporting transitions.
- Section rail mask: keep, but update the comment block dated "round 5" → "round 6: rail only visible at lg+".
- Update the prefers-reduced-motion block to drop `nav-current-dot` references (already gone, just stale comments).

### I. Files touched

1. `src/components/Navigation.tsx` — right cluster reshape, drop `useIsMobile`, drop close-on-pathname effect, raise rail to `lg+`.
2. `src/components/nav/HamburgerButton.tsx` — square 44×44, drop `current` prop.
3. `src/components/nav/SectionRail.tsx` — no logic change; just confirm it lives under a `lg+` parent (no edits needed if Navigation.tsx already gates).
4. `src/components/nav/MenuDrawer.tsx` — icon-only X, tighter spacing, drop per-link animation-delay.
5. `src/lib/pageSections.ts` — trim homepage rail to 4 anchors.
6. `src/index.css` — drop `.hamburger-btn[data-current]` rule, update comments.

### J. Verify

- `bunx tsc --noEmit` clean.
- Visual sweep at 360px / 414px / 768px / 1024px / 1440px:
  - 360px: phone-icon + green "Get a Quote" + square hamburger. Three different shapes.
  - 768px: same — section rail still hidden (now lg-gated).
  - 1024px+: section rail appears with 4 anchors max on /, evenly spaced.
- Drawer opens, only one X (top-right) closes it, all primary destinations fit above the fold on a 6.1" phone.
- No `useIsMobile` import anywhere in the nav stack (`rg "useIsMobile" src/components/nav src/components/Navigation.tsx` returns nothing).

### K. Memory updates

- Update `mem://features/two-tier-navigation`:
  - Header right cluster: "Phone (flat icon, no chip) · Quote (square solid evergreen, 8px radius) · Menu (square ghost, 44×44, 8px radius). Three distinct shapes — never three rounded-full pills in a row."
  - "Section rail visible from `lg+` only (1024px). Below that, drawer columns provide section navigation."
  - "Drawer has ONE close affordance: icon-only X top-right. Backdrop tap also closes."
  - "No `useIsMobile` in nav components — use `window.matchMedia` one-shot in click handlers when branching."
- Add to `mem://index.md` Core:
  - "Nav right cluster: 3 distinct SHAPES (flat icon · square solid · square ghost). Never 3 rounded pills in a row."
  - "Section rail visible from lg+ (1024px) only."
- Trim homepage anchor list rule already covered by 18-char cap; add: "Section rail anchors capped at 4 per route — pick page-spanning ones, drop ones already covered by header CTAs."

## What this fixes for the owner

- **Visual noise at a glance**: was 3 round pills, now 1 flat icon + 1 green box + 1 square. Eye lands on green.
- **Mobile crowding**: section rail no longer competes for space at iPad portrait; only appears on actual desktop sizes where there's room.
- **Drawer feels obvious**: opens with a tap on a square, closes with an X — no second "Close" word competing for attention.
- **Faster**: -1 window resize subscription, -1 useEffect on every route change, -18 inline animation-delay styles per drawer open, no JS observer for the rail (already removed in round 5).
