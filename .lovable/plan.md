
# Round 3 — "Grandma-Grade" Navigation

The owner's complaint hasn't gone away: the nav still *feels* clever rather than obvious. We borrowed half of RoyalMechanical's pattern (centered section rail + hamburger + drawer) but kept our floating glass island, our icon-only mobile CTA, our italic single-link drawer header, and our "scroll-snap" rail with a fade mask. Each of those is a small clever thing that compounds into "complicated." This round commits fully to the reference pattern: **a solid bar that always reads exactly like a nav bar, big buttons with words on them, and a drawer that's a flat phone-book — not an editorial spread.**

The grandma test (literal): can a 70-year-old, on first glance, identify (a) where they are, (b) the phone number, (c) the word "Menu," and (d) a button that says "Get a Quote"? Today on phone the answer is "no" to (b) and (d) — phone is hidden below `lg`, and the CTA is a wordless arrow chip. After this round, the answer is "yes" at every breakpoint.

**Desktop layout is fully preserved by intent**: the section pills, the centered rail, the right-cluster reading order, the page anchors, the active-section highlight — all unchanged in *behavior*. What changes is the *container*: a solid white bar with a real shadow line, instead of a translucent floating chip. Owners read solid bars as "professional nav," not "design experiment."

---

## 1 · Header: solid bar, not floating island

**File:** `src/components/Navigation.tsx` (rewrite), `src/index.css` (replace `.nav-island` block + add `.havencreek-nav` styles)

### Container

- Drop the floating, contracting, `max-w-[940px]` glass pill. Replace with a **full-width fixed bar**: `fixed inset-x-0 top-0`, `h-16` (`h-14` below `sm`), `bg-background/98 backdrop-blur-sm`, `border-b border-border/60`. On scroll, add a subtle `shadow-[0_2px_12px_-6px_hsl(20_8%_14%/0.10)]`.
- Inside, a `Container size="wide"` constrains content to the same max-width as the rest of the site, so the nav, hero, and footer all share one column edge.
- No more crossfading between full logo and mark. **Always show the full horizontal Haven Creek logo at `h-7` (28px).** Crossfading reads as a magic trick to non-designers; persistent logo reads as branding.
- Skip-to-content link, `<header role="banner">`, and ARIA stay as-is.

### Three-zone grid

```
[ Logo ]  ········  [ Section Rail (md+) ]  ········  [ Phone ] [ Quote ] [ Menu ]
```

Implemented as `grid grid-cols-[auto_1fr_auto]` so the rail truly centers regardless of right-cluster width — the current flex layout drifts when the phone label appears.

### Right cluster (the part owners stare at)

Three controls, **all with words at every breakpoint they appear**:

1. **Phone** — visible from `sm` upward (was `lg`). Renders as `<a href="tel:…">` with the `Phone` icon + the formatted number. On `sm`–`md` it's icon-only with `aria-label` (44×44 tap target). The **published phone number on a phone screen** is the single biggest "I can use this site" signal for older visitors. Hiding it below `lg` was the worst miss of round 2.
2. **Quote / Consultation** — `bg-evergreen text-evergreen-foreground`, **always shows the word**: `"Get a Quote"` from `sm` up, `"Quote"` below `sm`. **No more icon-only chevron chip.** Words convert; arrows decorate. 48px min-height on mobile, 40px on desktop.
3. **Menu** — hamburger button labeled "Menu" beside the icon at `md+`, icon-only with `aria-label="Menu"` below. Always-on (was already), but now sits in a 48×48 hit area with the **word visible on tablet and up** so it's unmistakably the menu, not a generic icon button.

The reading order matches RoyalMechanical: Phone → Quote → Menu. (Round 2 had Phone → Menu → Consultation; that put the menu *between* a contact method and a CTA, which is exactly the "wait, where do I tap?" hesitation we want to remove.)

### What disappears

- `nav-island` styling (gradient ring, double shadow, `max-w` clamp, padding-shrink on scroll).
- The width-animating logo span (160px → 28px).
- The `.icon-chip` on the CTA — replaced with a small inline `ArrowUpRight` only at `lg+`, where the button has room.
- The `pointer-events-none` outer wrapper trick (no longer needed without the floating island).

### Section rail (`SectionRail.tsx`)

- Stays the same component but **the `.section-rail-scroll` mask is removed**. Inside a solid bar, the fade-to-transparent edge mask is invisible and the only person who notices is a designer; instead, hide overflow with a clean `overflow-hidden` and let the active-section auto-scroll keep things in view.
- Active indicator switches from the centered 14px hairline to the **RoyalMechanical-style underline**: a 2px bottom rule that animates `scale-x` from `0 → 1` left-aligned. Reads as "tab" instead of a tiny dot, which is more legible.
- Promote labels to `text-sm font-medium` (was `text-minimal` ≈ uppercase tracking). Plain sentence-case labels are easier to scan.

---

## 2 · Drawer: phone-book, not editorial spread

**File:** `src/components/nav/MenuDrawer.tsx` (significant simplification)

### What stays

- Fullscreen Radix `Dialog` overlay at every breakpoint.
- Three column grid: **Services · Service Areas · Company** (rename "The Studio" → **"Company"**; "The Studio" reads as art-gallery affectation to a homeowner looking for a renovator).
- Bottom rail with trust line and CTA.
- Animation stagger and route-change auto-close.

### What changes (the cleanup)

- **Remove the dossier strip** (`Site Map · Edition I`). It's a wink at the design press, not a wayfinding aid. A grandma reading "Edition I" thinks "version 1 of what?"
- **Remove the italic display "Home" link.** It's beautiful and it's also the single biggest cognitive speed-bump in the drawer — one outsized italic word, then a row of small uppercase labels. Replace with a normal-weight `Home` link sitting as the first row of a new **left-side primary list** (see next bullet).
- **Restructure the body** to match RoyalMechanical's hierarchy more literally:
  - Top of body: a single-line **breadcrumb-style row** showing `Home  ·  About  ·  Selected Work  ·  Contact` in plain medium-weight type. These are the four "primary" pages and they deserve to read as siblings, not as a soloist (Home) plus a column ("Studio").
  - Below: the same three-column grid, but now strictly **Services / Service Areas / Resources** (Resources column = Reviews, FAQ, etc., when those exist; for now it stays as `Company` with About / Selected Work / Contact since we already have those — but we'll dedupe so Contact only appears in the bottom rail, not in both the breadcrumb and a column).
- **Larger link sizing.** Drawer link rows go from current `text-foreground/85` (~ 16px) to **`text-[1.125rem]` (18px) with `min-h-[52px]`**. RoyalMechanical uses big finger-friendly rows; ours feel like a fineprint footer.
- **Section labels** ("Services", "Service Areas", "Company") move from `text-evergreen/75 text-minimal` (uppercase tracking) to **`text-evergreen text-xs font-semibold uppercase tracking-[0.14em]`** — same intent, but slightly larger and more readable next to the new 18px links.
- **Bottom rail**: keep trust line + phone + email + CTA. **Stack vertically below `md`** (currently it does, but the spacing collapses awkwardly — bump `gap-3` to `gap-5` and add a divider between the trust pair and the CTA).
- **Drawer CTA copy**: change "Request a Consultation" → **"Get a Free Quote"**. "Consultation" is industry jargon; "free quote" is the universal grandma-grade signal that a button is safe to tap. (Internally the CTA still routes to `/contact` and still calls `openQuickContact` on mobile; only the label changes.)

### The "Home" link debate, settled

The current single-italic-Home is a fingerprint of the editorial pass. It's gorgeous in a portfolio but it's the *first* thing a confused user sees and they spend a half-second translating it. Replace with the breadcrumb-style horizontal row above. The brand voice survives in typography elsewhere (drawer headings, dossier marks on real pages); the menu is utility surface and should be flat.

---

## 3 · Copy & terminology cleanup

Owner-facing words matter more than typography. Two surgical renames, applied across `Navigation.tsx`, `MenuDrawer.tsx`, and `pageSections.ts`:

- **"Consultation" → "Get a Quote"** on every CTA surface (header pill, drawer CTA, in-page CTAs that share the label). Updates also memory: `mem://features/two-tier-navigation` to lock in the new label.
- **"The Studio" → "Company"** in the drawer column header.
- **Section rail label tweak**: `"A Fit?"` on `/service-areas` → `"Coverage"` (concrete, not coy).
- All other labels from round 2 stay (Promise / Services / Approach / Recent Work / Stewardship / Long View / Get in Touch).

These three word changes do more for "grandma-grade" than any layout move.

---

## 4 · Hamburger button: stop being clever

**File:** `src/components/nav/HamburgerButton.tsx`

- **Restore the third middle line** (we removed it in round 1). Three lines is the international "menu" glyph; two lines reads as "settings sliders" or "list bullets." A grandma scans for three stacked lines. Returning to three lines is the single-most cost-free legibility win in this round.
- All three lines full-width at rest. Open state morphs the top + bottom into the X and fades the middle line out (`opacity 0` + `scale-x 0`). This is the canonical animation — same as RoyalMechanical's `hamburger-animated`.
- **Add the word "Menu"** beside the icon from `md+` (`hidden md:inline ml-2 text-sm font-medium`). Below `md` it stays icon-only with `aria-label="Open menu"`.
- 48×48 hit area at every breakpoint.

CSS in `src/index.css` (replace lines 510–535): swap the two-line asymmetric block for the three-line block plus a `.hamburger-line--mid` rule.

---

## 5 · CSS pruning + new utilities

**File:** `src/index.css`

- **Delete `.nav-island` block** (the floating-island gradient ring + shadow + max-w + padding-shrink).
- **Delete `.section-rail-scroll`** mask + `::-webkit-scrollbar` rule (no longer used inside a solid bar).
- **Delete `.menu-primary-text`** (italic Fraunces clamp) — drawer no longer has the italic Home link.
- **Add `.havencreek-nav`** wrapper class: solid bg, border-bottom, optional scroll-shadow via a `data-scrolled="true"` attribute set by the same IntersectionObserver pattern.
- **Add `.nav-tab-rule`**: 2px bottom underline, `transform-origin: left`, `scale-x` toggled by `aria-current`. Replaces `.nav-active-rule`.
- **Add `.nav-pill`**: shared style for the Get-a-Quote button so the same look is reusable in `ClosingCta` and other CTA surfaces (single source of truth for the brand button).
- **Three-line hamburger CSS** with `hamburger-line--mid` opacity transition.

---

## 6 · Files touched

| File | Change |
|---|---|
| `src/components/Navigation.tsx` | Full rewrite: solid bar, three-zone grid, persistent logo, "Get a Quote" CTA always with words, Menu label at `md+`. |
| `src/components/nav/MenuDrawer.tsx` | Remove dossier strip + italic Home; add breadcrumb primary row; rename "The Studio" → "Company"; bigger 18px link rows; CTA copy → "Get a Free Quote". |
| `src/components/nav/HamburgerButton.tsx` | Three lines (restore middle); add `Menu` text label `md+`; 48×48 hit area. |
| `src/components/nav/SectionRail.tsx` | Drop scroll-snap mask; switch active indicator to left-anchored 2px underline; `text-sm font-medium` labels. |
| `src/lib/pageSections.ts` | `"A Fit?"` → `"Coverage"`. |
| `src/index.css` | Delete `.nav-island`, `.section-rail-scroll`, `.menu-primary-text`. Add `.havencreek-nav`, `.nav-tab-rule`, `.nav-pill`, three-line hamburger rules. |
| `mem://features/two-tier-navigation` | Update memory to reflect: solid bar (not floating island), persistent logo, three-line hamburger, "Get a Quote" CTA, "Company" column, breadcrumb primary row. |

No new packages. No backend changes. No route changes. No content/copy changes outside the nav itself. No data dependencies. TypeScript should pass on first compile.

---

## 7 · What grandma sees, before vs after

**Mobile, top of page (before):**
> Floating cream chip with a tiny logo, an arrow-only round button, and a 4-pixel-tall hamburger.

**Mobile, top of page (after):**
> A solid white bar with the full Haven Creek logo, a green button that says **"Quote"**, a phone icon she can tap, and three lines beside the word area she taps to reveal **"Menu."**

**Desktop, top of page (before):**
> Same floating chip, narrower, with section pills that fade at the edges.

**Desktop, top of page (after):**
> A solid white bar pinned to the top, full logo on the left, six clear section tabs in the middle (**Promise · Services · Approach · Work · Areas · Contact**), her phone number on the right, a green **"Get a Quote"** button, and a labeled **"Menu"** beside three stacked lines.

**Drawer (before):**
> Italic display "Home" alone at the top, then three columns of small links, with "Site Map · Edition I" above.

**Drawer (after):**
> A horizontal row of four primary pages (**Home · About · Selected Work · Contact**), then three calmly-labeled columns (**Services · Service Areas · Company**) of large 18px finger-targets, then a clear **"Get a Free Quote"** button at the bottom.

Every change is in service of one rule: **never make the user translate.**

---

## 8 · Risks & mitigations

- **Risk**: removing the floating-island look removes the "premium" signal. **Mitigation**: the editorial weight of the site lives in hero typography, photography, and section composition — none of which change. A solid nav bar reads as confident, not generic. The reference (RoyalMechanical) and most premium agency sites of the last 24 months have moved this exact direction.
- **Risk**: copy changes ("Consultation" → "Get a Quote") drift from the established editorial voice. **Mitigation**: the CTA is the *only* place in the experience where conversion vocabulary should win over editorial vocabulary. Editorial copy survives everywhere else.
- **Risk**: persistent full logo on scroll feels heavier than the contracting mark. **Mitigation**: a `h-7` logo is 28px tall — the same height the mark used. Total nav-bar height is still 64px, identical to RoyalMechanical and most production marketing sites.
- **Risk**: more wordy header on mobile crowds the right cluster. **Mitigation**: only **"Quote"** (5 chars) plus an icon-only Menu plus an icon-only Phone below `md`. That fits comfortably in the 360px–414px range.

---

## 9 · Verification (during implementation)

- `tsc --noEmit` passes.
- `rg "nav-island|section-rail-scroll|menu-primary-text|StickyConsultBar"` returns nothing.
- Manual visual check of the header at 320 / 414 / 768 / 1024 / 1440 widths.
- Drawer opens on hamburger click, closes on (a) Escape, (b) backdrop click, (c) close button, (d) any link tap, (e) route change.
- Phone, email, and CTA remain reachable on every breakpoint within ≤ 2 taps.
- Memory file `mem://features/two-tier-navigation` reflects the new pattern; `mem://constraint/no-floating-fab` stays in force.

---

That's the full plan. On approval, I'll execute it as a single coordinated change set — no questions, no follow-up clarifications needed.
