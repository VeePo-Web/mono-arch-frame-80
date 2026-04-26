## Round 4 — "Grandpa-Grade" Navigation Cleanup

### Why this round
Round 3 already swapped the floating glass island for a solid bar, added the centered SectionRail, and rewrote the drawer. Reviewing it through a 70-year-old's eyes, four issues remain:

1. **Section labels are abstract** — words like "Promise", "Approach", "Why", "Land" don't mean anything to a homeowner scanning a header.
2. **Active "you are here" indicator is too quiet** — a 2px hairline below 14px text disappears on a bright laptop screen.
3. **Quote pill is small and skinny** (h-10 / 14px text) for a primary CTA on a renovation site. Older eyes need fatter targets and more weight.
4. **Drawer bottom-rail CTA is shape-confusing** — `flex justify-between` with no max-width and a floating arrow chip on the right reads as "two buttons stuck together" instead of "one big button."
5. **Hamburger glyph is faint** (1px hairlines on cream). Looks like a smudge, not a control.
6. **Phone link is hidden until `lg`** — anyone on a tablet who wants to call has to open the drawer first.
7. **Section rail has no overflow story** — when a page hits 6 entries on a narrow desktop (1024–1100px), the right-most label gets clipped silently.

Round 4 fixes those seven and nothing else. No re-architecture, no new surfaces.

---

### Changes

#### 1. `src/lib/pageSections.ts` — rewrite labels in plainspoken English
Every label becomes something a stranger could match to a section heading at a glance. Cap stays at 14 chars; most will be 4–10.

| Route | Old → New |
|---|---|
| `/` | `Promise → Trust`, `Approach → How We Work`, keep others |
| `/services` | `Process → How It Works`, `Quote → Get a Quote` |
| `/services/interior-finishing` | `Overview → What It Is`, `Why → Why It Matters`, `Craft → How We Build It`, `Recent Work → Our Work` |
| `/services/exterior-finishing` | `Overview → What It Is`, `Rural → Rural Homes`, `Stewardship → Care for the Land`, `Recent Work → Our Work` |
| `/services/decking` | `Planning → Planning a Deck`, `Outside → Outdoor Living`, `Materials → Materials`, `Recent Work → Our Work` |
| `/service-areas` | `Areas → Where We Work`, `Coverage → Is My Home In Range?` (truncate to "Coverage Area") |
| `/about` | `Philosophy → Our Approach`, `Land → Care for the Land`, `Continuity → Long Relationships`, `Long View → Built to Last` |
| `/contact` | keep `Get in Touch`; rename `Process → How It Works`; `Areas → Where We Work` |

Several of these run > 14 chars. We'll also relax the cap comment to **18 chars** and verify visually that the rail still fits at `md` (768px) for every page after applying changes.

#### 2. `src/components/nav/SectionRail.tsx` — louder "you are here" + safe overflow
- Active state now uses **both** the underline (thickened to 3px, color `--evergreen`) **and** a subtle `bg-foreground/[0.04]` chip behind the label. Inactive labels stay plain; hover gets the same chip at 50% opacity. This gives a tactile "tab" feel grandpa can spot from across the room.
- Active label weight bumps from `font-medium` → `font-semibold`.
- Add an **edge-fade mask** (`mask-image: linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent)`) so when a long label list approaches the right edge of the rail container, it fades instead of hard-clipping. (This is reintroducing the gradient that was removed in round 3, but only as a visual safety net — `overflow-x` stays `hidden`, no scroll behavior.)
- Tap target floor: bump padding from `px-3 py-2` → `px-3.5 py-2.5` so each tab is ≥ 40px tall. (The header at 56/64px gives us room.)
- Underline animation origin shifts from `left` → `center` so it grows symmetrically — feels less "line is drawing" and more "tab snaps in."
- Promote the rail visibility from `md+` → keep `md+` (no change), but the bar now also reserves a **`hidden md:lg+ scroll-snap fallback`**: if the rail's measured scrollWidth > container clientWidth, we silently switch to `overflow-x: auto` with the scroll-snap behaviour from round 2. Implementation: detect on mount + resize using ResizeObserver; toggle a `data-overflow="true"` attr the CSS keys off.

#### 3. `src/components/Navigation.tsx` — phone earlier, fatter Quote CTA, clearer hamburger
- **Phone link**: visible from `xs` (always-on icon button at 44×44, label appears at `md+` not `lg+`). Older homeowners reach for the phone first; we should never gate it behind the menu.
- **Quote CTA sizing**:
  - Mobile: `h-12 px-5 text-[15px]` (was h-11 px-4 text-sm).
  - Desktop: `h-11 px-6 text-[15px]` (was h-10 px-5 text-sm) with the icon chip from `md+` (was `lg+`).
  - Increases primary-CTA visual weight by ~20% and pushes it past Phone in the visual hierarchy without color change.
- **Hamburger lines**: bump from `h-px` → `h-[1.5px]` (still hairline on retina, no longer a smudge on 1× displays). Color shifts to `bg-foreground` (was `foreground/85` — wasn't applied but the parent `text-foreground/85` cascaded). The "Menu" word at `md+` gets a `tracking-wide` and stays at `text-sm font-medium`.
- **Active route hint on hamburger**: when the current path matches a primary-drawer section (Services / Service Areas / Company subpages), add a tiny `bg-evergreen` 6px dot in the top-right corner of the hamburger button. Tells grandpa "the page you're on lives inside this menu."
- Bar height bumps mobile-only: `h-14 → h-15` (60px). Tiny but gives every right-cluster button a true 48px tap zone with vertical breathing room. Spacer below the header updates to match.

#### 4. `src/components/nav/HamburgerButton.tsx` — implement the dot + thicker lines
Add an optional `currentDot?: boolean` prop. When true, render an absolutely-positioned 6px evergreen dot at top-right (`-top-0.5 -right-0.5`). Update line height per #3.

#### 5. `src/components/nav/MenuDrawer.tsx` — fix the bottom-rail CTA shape
The current mobile branch uses `flex items-center justify-between` with no width — this stretches the button to the parent flex column's full width *and* shoves the arrow chip to the far right, looking like two controls. Fix:
- Both mobile + desktop CTA collapse to one identical layout: `inline-flex items-center justify-center gap-3` with a single `min-w-[260px]` (so it never shrinks below pill-shape) and `w-full md:w-auto` (full width on stacked mobile rail, natural width on the desktop horizontal rail).
- Bump font to `text-[15px] font-semibold` and height to `min-h-[56px]` mobile / `min-h-[48px]` desktop.
- The arrow chip stays inline next to the label, never floats to the edge.
- Add a **secondary "Call" line** beneath the CTA on mobile only: a plain text link `Or call (403) 555-0100` in `text-foreground/65 text-sm` — gives the phone-first user an explicit second path without making it a competing button.

Also in the drawer:
- **Primary horizontal row** ("Home · About · Selected Work · Contact"): bump from `text-base md:text-lg` → `text-lg md:text-xl` and `font-medium → font-semibold`. Add a 1.5px evergreen underline on the active item (replacing the color-only "is current" cue, which a colourblind grandpa misses). Min-height 52px.
- **Column header chips**: the small uppercase "Services / Service Areas / Company" labels gain a tiny evergreen left bar (3px wide, full label-height) — visual scanning anchor that says "this is a section header, not a link."
- **Drawer link rows**: bump `text-[1.0625rem] md:text-[1.125rem]` → `text-[1.125rem] md:text-[1.1875rem]` (18→19px). Min height stays 52px. Active link gets an evergreen dot to the left of the label (`•` glyph), not just colour.

#### 6. `src/index.css` — supporting styles
- Update `.nav-tab-rule` to 3px thick, `transform-origin: center`, evergreen.
- New `.nav-tab-chip` for the active-tab background chip.
- New `.section-rail-mask` for the edge fade (only applies when `data-overflow="true"`).
- New `.section-rail-scroll` (re-introduced from round 2 but inert until `data-overflow="true"`).
- Hamburger dot pulse: `@keyframes nav-current-dot { 0%,100% { opacity: 0.85 } 50% { opacity: 1 } }` — 2.4s ease-in-out infinite, paused under `prefers-reduced-motion`.
- Drawer column-header bar utility `.menu-col-bar`.

#### 7. Memory updates
- Update `mem://features/two-tier-navigation` to record the round 4 specifics (active-tab chip, current-section dot, plainspoken labels, larger CTA, Phone-from-xs).
- Update `mem://index.md` Core line: append "Section rail labels use plain English ('Trust', 'How We Work') — never abstract single-word nouns ('Promise', 'Approach')."

---

### Files touched
- `src/lib/pageSections.ts` (label rewrite + cap comment)
- `src/components/nav/SectionRail.tsx` (active chip, overflow detection, weight bump)
- `src/components/nav/HamburgerButton.tsx` (currentDot prop, line thickness)
- `src/components/Navigation.tsx` (phone breakpoint, CTA sizing, bar height, currentDot wiring)
- `src/components/nav/MenuDrawer.tsx` (CTA shape fix, primary row weight, column bars, active dots, "Or call" line)
- `src/index.css` (rail chip + mask, hamburger dot keyframes, column bar)
- `mem://features/two-tier-navigation`, `mem://index.md`

### Files explicitly NOT touched
- `src/hooks/useActiveSection.ts` — works as designed.
- `src/components/QuickContactSheet.tsx` — out of scope.
- `src/App.tsx` — DeferredOverlays already correct.
- Any page files — section ids stay; only the labels in `pageSections.ts` change.

### Out of scope (intentional)
- No new routes, no new pages, no logo redesign, no nav colour change, no FAB / sticky-bar reintroduction (constraint enforced).
- Hover/active animations stay under 320ms — no new motion language.

### Acceptance — what grandpa should be able to do
1. From any page, tap **Phone** in ≤ 1 second without scrolling, hunting, or opening a menu.
2. Spot **which section of the page he's on** without leaning into the screen.
3. Spot **which page of the site he's on** by the dot on the hamburger before opening it.
4. Tap **Get a Quote** without missing — CTA is the visually heaviest control on the page.
5. Inside the drawer, recognise **"this is a section header, not a tappable link"** at a glance via the evergreen left bar, and the **bottom CTA reads as one button**, not two.