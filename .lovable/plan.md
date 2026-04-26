# Worldclass Navigation Cleanup — "Two-Tier Editorial Nav"

## The owner's complaint, named

Today's nav is a single floating glass pill that has to do **four jobs at once**: brand mark, five route links, the Consultation CTA, and (on mobile) a hamburger. There's nothing telling you *where you are within a long page* — the home page alone is six sections deep. The result feels busy without feeling navigable.

## The pattern we're borrowing (RoyalMechanical.com)

A slim, quiet **two-tier system**:

1. **Top bar** = "where am I right now"
   - Logo (left) · **section anchors of the current page, auto-highlighted as you scroll** (center) · Phone / Message Us / **always-on hamburger** (right).
2. **Fullscreen drawer** = "where else can I go"
   - Triggered by the hamburger on **every viewport** (not just mobile).
   - Three editorial columns: **Services · Service Areas · Studio**.
   - Bottom rail: trust line + the consultation CTA.

The top bar handles intra-page navigation, the drawer handles cross-page navigation. Neither competes with the other, and both stay quiet.

---

## Site-wide outcomes

- **Visible route links in the top bar drop from 5 → 0.** The header becomes: logo · section anchors · phone · Consultation pill · hamburger.
- **Hamburger goes always-on (desktop too).** That's the single entry to cross-page nav. One door, not five.
- **Every page gets in-page section wayfinding** with a hairline underline that draws in under the active section as you scroll.
- **Editorial language preserved end to end**: dossier strip in the drawer, italic numerals, evergreen hairlines, Ken Burns-quiet motion (≤300ms, weighted easing, full `prefers-reduced-motion` overrides).
- **Mobile contact stack consolidated**: the Consultation pill in the header stays; the redundant `QuickContactFab` is retired (its job is now done by the always-visible header pill + the hamburger drawer's bottom CTA). `StickyConsultBar` keeps its current "shows after hero" behavior but as a softer tertiary surface.
- **Desktop layout untouched in spirit**: same widths, same typography, same color tokens — just *less* in the bar and *more* in the drawer.

---

## Architecture

### New files

- `src/lib/pageSections.ts` — typed map of `pathname → PageSection[]`. Mirrors RoyalMechanical's `lib/navigation.ts` shape (`{ name, anchor }`). Centralized so the nav and the page can never drift.
- `src/hooks/useActiveSection.ts` — IntersectionObserver hook returning the currently-most-visible anchor id. Same shape as the reference hook (threshold 0.3, `rootMargin: "-72px 0px 0px 0px"` to account for the fixed header).
- `src/components/nav/SectionRail.tsx` — the center pill of anchors. Hairline underline draws in via `scaleX` on the active item (uses the existing `nav-active-rule` token). Hidden when fewer than 2 sections exist on the route.
- `src/components/nav/MenuDrawer.tsx` — fullscreen overlay. Three columns + bottom rail. Opens on hamburger click (any viewport). Reuses `Sheet` primitive for focus trap, Escape, scroll lock, return-focus — but rendered fullscreen, not edge-anchored, so it reads as a *cinematic editorial drop* on desktop (and the existing right-anchored mobile sheet on phones if we keep that variant — see Decision 2 below).
- `src/components/nav/HamburgerButton.tsx` — small dedicated button so the animation lives in one place (open/close morph reused on both viewports).

### Modified files

- `src/components/Navigation.tsx` — slimmed. Removes the inline desktop link list. Adds `SectionRail` in the center. Adds `HamburgerButton` (visible at all breakpoints). Keeps the brand chip + Consultation pill. The mobile-only `Sheet` block is replaced by the new `MenuDrawer`.
- `src/App.tsx` — retires `QuickContactFab` (kept around for one cycle behind a feature flag if you'd prefer; default is to remove). Everything else unchanged.
- Long pages get `id="…"` attributes added to the section wrappers that don't already have them, so the section rail can target them.

### Files left alone

- `src/components/QuickContactSheet.tsx` — kept exactly as is. It's still triggered by the bottom-rail CTA in the drawer and by `StickyConsultBar` on mobile.
- `src/components/StickyConsultBar.tsx` — unchanged behaviour.
- All page content, all gallery components, all photography, all desktop typography. **Zero design changes outside the nav surface.**

---

## The top bar — exact spec

Heights, paddings, glass effect, ring, scroll densification — **all unchanged from the current `nav-island`**. Only the contents change:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo]      Trust · Services · Approach · Work · Areas      [☎] [Consultation ↗] [☰]  │
└─────────────────────────────────────────────────────────────────────────┘
       └ brand chip      └ SectionRail (auto-highlight)        └ actions
```

- **Logo** — same crossfade between full mark and small mark on scroll. Unchanged.
- **SectionRail (center)** — only renders when the current route has ≥2 mapped sections. Each anchor = `text-minimal text-foreground/75`, hover `text-foreground`, active `text-evergreen` with the existing draw-in hairline beneath. Smooth-scrolls to the section with a `-72px` offset for the header.
- **Phone (lg+ only)** — small ghost icon button, `text-evergreen` on hover. Tap-to-call with `tel:` href. (New addition — owner explicitly cares about call conversions on a contractor site.)
- **Consultation pill** — unchanged. Stays as the right-anchored primary action.
- **Hamburger** — always visible at every breakpoint. Replaces the desktop "no hamburger" pattern. Three lines that morph to an X via the existing `hamburger-animated` language (or a small new equivalent).

Everything respects `pt-[env(safe-area-inset-top)]` and the existing `nav-island` densification on scroll.

---

## The drawer — exact spec

Fullscreen, `bg-background/95 backdrop-blur-2xl`, with the same plaster-grain veil already used on the mobile sheet. Three zones:

**Zone A · Header** — close button (top-right), small dossier strip directly under it: `——  Site Map · Edition I  ——`.

**Zone B · Primary** — single italic serif "Home" link (matches the existing italic mobile-sheet treatment), staggered reveal `80ms` per child. Full editorial flair — same numbered serial chips you already have on the mobile sheet (`01 · Work`, `02 · Services`, `03 · Service Areas`, `04 · About`, `05 · Contact`).

**Zone C · Three columns**

```
SERVICES                SERVICE AREAS              STUDIO
────────                ─────────────              ──────
Interior Finishing      Bragg Creek                About
Exterior Repairs        Rocky View County          Selected Works
Decking                 Bearspaw                   Contact
                        Water Valley
```

Quiet eyebrow labels in evergreen tracking, then 14px sans links with min-height 44px. On desktop the three columns sit side-by-side with `gap-12`; on mobile they stack with the existing `MobileNavGroup`-style accordion-free hairline dividers.

**Zone D · Bottom rail** — `border-t border-border/60`, two children left/right:

- *Left:* trust line — `Family-run · Foothills, AB` with the existing evergreen dot.
- *Right:* the **Consultation CTA pill**, full evergreen, opens `QuickContactSheet` on touch viewports and routes to `/contact` on lg+ (matches the existing fork in `StickyConsultBar`).

Stagger delays mirror the reference (`100ms + 30ms × index`). All animations gated on `prefers-reduced-motion: no-preference`.

---

## Per-page section map (proposed)

Already-existing IDs in **bold**; new IDs to add are tagged *(add)*.

| Route | Sections (label · anchor) |
|---|---|
| `/` (home) | Trust · **trust-promise**, Services · **services-preview**, Approach · **approach**, Work · **work-preview**, Areas · **areas**, Contact · **final-cta** |
| `/services` | Promise · *services-promise (add)*, The Three · *services-three (add)*, How we work · **circle-heading** wrapper *(add §id)*, Quote · *quote-promise (add)* |
| `/services/interior-finishing` | What we mean · *meaning (add)*, Why it matters · *why (add)*, How we work · *craft (add)*, Proof · *proof (add)* |
| `/services/exterior-finishing` | What we handle · *needs (add)*, Rural conditions · *rural (add)*, Property respect · *respect (add)*, Proof · *proof (add)* |
| `/services/decking` | Planning · *planning (add)*, Lifestyle · *lifestyle (add)*, Materials · *materials (add)*, Proof · *proof (add)* |
| `/work` | *(no rail — single grid)* |
| `/service-areas` | Roster · *roster (add)*, Fit · *fit (add)* |
| `/service-areas/:slug` | Promise · *promise (add)*, Services here · *services-here (add)*, Talk to us · *closing (add)* |
| `/about` | Philosophy · *philosophy (add)*, Property respect · *respect (add)*, Continuity · *continuity (add)*, Long-term · *longterm (add)* |
| `/contact` | Form · *form (add)*, Quote process · *quote (add)*, Areas · *areas (add)* |
| `/thank-you`, `/404` | *(no rail)* |

The "(add)" entries cost a single `id="…"` attribute on an existing section wrapper — purely additive, **zero visual change**.

---

## Motion & accessibility contract

- **Top bar**: existing `nav-island` densification preserved. Section rail underline uses `transform: scaleX(0 → 1)` with `transition-transform duration-500 ease-swift`.
- **Drawer**: opens with `opacity 0 → 1` over 240ms + a subtle 8px `translateY` lift on the panel. Items stagger at `100ms + 30ms × i`. Closes in 180ms. All overrides under `prefers-reduced-motion: reduce` collapse to opacity-only at 120ms.
- **Focus management**: drawer uses Radix `Sheet` underneath → focus trap + Escape + scroll lock + return-focus are free. Skip-link still lands on `#main`.
- **ARIA**: `<nav aria-label="Page sections">` for the rail, `<nav aria-label="Site map">` inside the drawer, `aria-current="location"` on the active section anchor, `aria-expanded` on the hamburger.
- **Touch targets**: hamburger 44×44, section-rail anchors `px-3.5 py-2` (already ≥44 effective), drawer rows min-height 44.
- **Contrast**: every link state has been mapped to existing tokens (`text-foreground/75`, `text-evergreen`, `text-foreground/60`) — all already pass AA on the off-white background.

---

## Decisions to confirm

1. **Phone in the top bar (lg+)?** Recommended **yes** — adds zero visual weight (small ghost icon) and gives rural visitors a one-tap call route. Reply *"no phone"* to skip.
2. **Drawer style on mobile**: keep the *fullscreen overlay* pattern at every breakpoint (matches RoyalMechanical exactly, more cinematic), or keep mobile as the existing right-side sheet and only show fullscreen on `md+`? Recommended **fullscreen at every viewport** — single mental model, same animation, same code path.
3. **`QuickContactFab`**: retire on shipment (recommended — the pill in the header + the drawer's bottom CTA cover the same job without floating UI), or keep it behind a feature flag for one cycle? Reply *"keep FAB"* to retain.

Default if you reply only "approved": phone in top bar = **yes**, fullscreen drawer at every viewport = **yes**, retire FAB = **yes**.

---

## What ships when approved

1. `src/lib/pageSections.ts` + `src/hooks/useActiveSection.ts` (new, ~80 LOC total).
2. `SectionRail`, `MenuDrawer`, `HamburgerButton` under `src/components/nav/` (new, ~280 LOC total).
3. `Navigation.tsx` slimmed and wired to the new pieces (net **−~140 LOC** versus today).
4. `App.tsx` — `QuickContactFab` removed (one import + one tag).
5. `id="…"` additions on the listed section wrappers across the page files (one-line each, no visual change).
6. Memory updated: new `mem://features/two-tier-navigation` describing the pattern, plus a `mem://constraint/no-floating-fab` note so this doesn't regress.

The desktop typography, photography, hero, gallery, area pages, services pages, contact form, and footer are not touched.