# Round 2 Nav Cleanup — Royal-style Efficiency

## What's not working yet

The two-tier shell from round 1 is solid, but the owner's "too complicated" reaction is fair when you actually count surfaces:

1. **Three persistent CTAs compete on mobile.** The header Consultation pill, the StickyConsultBar (which also says "Request a Consultation"), and the QuickContactSheet trigger. RoyalMechanical has *one* persistent CTA: "Message Us" on desktop, hamburger drawer CTA on mobile. The sticky bar is redundant once the drawer's bottom rail exists.
2. **SectionRail labels are abstract** ("Meaning," "Why," "Respect," "Roster," "Fit," "Long-term," "Trust," "Approach"). Royal uses concrete labels ("Heating," "Cooling," "Service Areas"). The owner won't be able to tell what "Respect" means from the bar — and neither will visitors.
3. **SectionRail is hidden on tablet** (`hidden lg:flex`). On Haven the nav island is half-empty between md and lg — wasted real estate, and tablet visitors get no in-page wayfinding.
4. **Drawer top-row duplicates the logo.** The floating island has the logo, then opening the drawer shows the same logo immediately above it. Royal's drawer just shows the close button — cleaner.
5. **Drawer "Reach Us" column is heavier than its siblings.** Two icon rows (phone + email) sit beside two link lists, breaking the rhythm. Royal puts contact in the bottom rail and uses three same-shape link columns.
6. **Drawer numbered primaries are too loud** for "Home / Work / About / Contact." Four items don't need 2.6rem italic display type. Royal uses one big "Home" line and lets the columns carry the weight.
7. **Hamburger sits to the right of the Consultation pill,** wrong reading order. The CTA should be the right-edge anchor; the hamburger should sit between Phone and CTA so it reads as "menu access" not "afterthought."
8. **Phone "Call" label below xl** — the lone icon reads as a glyph, not a button.

## Design principles for this round

Lifted from the Royal pattern + Fantasy.co's restraint:

- **One CTA per surface.** Header has one. Drawer has one. Sticky bar gets retired (the whole component).
- **Label what you mean.** Section names match the section's own H2 voice.
- **Same shape, different content.** Drawer columns are all link lists, no mixed icon rows.
- **Show structure, not decoration.** Numbered primaries become a single quiet "Home" link plus columns.
- **Tablet gets the rail too.** Show from `md`, not `lg`.

## File-by-file changes

### 1. Retire `StickyConsultBar` entirely
- Remove `<StickyConsultBar />` from `src/App.tsx`.
- Delete `src/components/StickyConsultBar.tsx`.
- Remove the `body[data-sticky-bar]` CSS rule from `src/index.css` (and any related `--sticky-bar-h` variable / footer offset).
- **Why:** The drawer's bottom rail already pins a Consultation CTA one tap away. Three persistent contact surfaces was the owner's "complicated" complaint.

### 2. Slim the header right cluster (`src/components/Navigation.tsx`)
- Reorder to **Phone → Hamburger → Consultation** so the CTA is the visual anchor on the right edge.
- On `lg+`, **always show the phone label** — change `xl:inline` → `lg:inline` since the rail moves down to `md`.
- Tighten min-h from 40 → 38 so the island sits visually lighter.
- Below `sm`, show the CTA as **icon-only chevron chip** (44×44 tap target), not "Consult" word — matches Royal's mobile compactness.

### 3. Promote SectionRail to tablet
- `src/components/nav/SectionRail.tsx` and `Navigation.tsx`: change `hidden lg:flex` → `hidden md:flex`.
- Add overflow-x scroll-snap with edge mask via new `.section-rail-scroll` class so all 6 home-page sections fit on tablet without truncating, fading at the edges.

### 4. Rewrite `pageSections.ts` labels to match section H2 voice

| Route | Current | New |
|---|---|---|
| `/` | Trust · Services · Approach · Work · Areas · Contact | **Promise · Services · Approach · Work · Areas · Contact** |
| `/services` | The Three · How · Quote | **Services · Process · Quote** |
| `/services/interior-finishing` | Meaning · Why · Craft · Proof | **Overview · Why · Craft · Recent Work** |
| `/services/exterior-finishing` | Needs · Rural · Respect · Proof | **Overview · Rural · Stewardship · Recent Work** |
| `/services/decking` | Planning · Lifestyle · Materials · Proof | **Planning · Outside · Materials · Recent Work** |
| `/service-areas` | Roster · Fit | **Areas · Are You a Fit** |
| `/about` | Philosophy · Respect · Continuity · Long-term | **Philosophy · Land · Continuity · Long View** |
| `/contact` | Form · Process · Areas | **Get in Touch · Process · Areas** |

Truncation rule stays at ≤ 14 chars.

### 5. Strip duplication from `MenuDrawer.tsx`
- **Remove the top-row logo** — only the close button stays in the top-right corner. The dossier strip + numbered primary anchor the drawer visually.
- **Collapse "Reach Us" column.** Grid becomes three same-shape columns:
  - **Services** (Interior · Exterior · Decking · All Services)
  - **Service Areas** (Bragg Creek · Rocky View · Bearspaw · Water Valley · All Areas)
  - **The Studio** (About · Selected Work · Contact)
- **Demote numbered primaries.** Replace the 4-item italic 2.6rem ladder with a *single* italic display "Home" line. Home is the only true "primary"; Work/About/Contact already live in The Studio column.
- **Bottom rail gains phone + email rows** as plain text links beside the trust line, with the Consultation CTA on the right. Layout: `[• Family-run · Foothills, AB] [(403) 555-0100  ·  hello@…] [Consultation →]` on `md+`; stacked on mobile.
- Reduce side padding on `md`: `md:px-12 lg:px-20` → `md:px-10 lg:px-16` so columns breathe but don't drift on 1024px laptops.

### 6. Hamburger morph polish (`src/components/nav/HamburgerButton.tsx`)
- Two lines stay; **shorten the bottom line by 30%** at rest (`width: 70%; left: 0; transform-origin: left`) so the icon reads as "list" not "equals sign." On open, both lines extend to full width as they cross at the centre.
- Add `active:scale-95` for press feedback. Keep all reduced-motion overrides.

### 7. Clean up `App.tsx`
- Remove `StickyConsultBar` import + render.
- Wrap `<QuickContactSheet />` in the same `Suspense + lazy` + idle-defer pattern as toasters so it stays out of the LCP-critical bundle (it's only needed after first user interaction).

### 8. CSS additions to `src/index.css`
- `.section-rail-scroll` — overflow-x scroll-snap with masked edges.
- `.menu-primary-text` — single big italic display rule for the lone "Home" link.
- `.menu-trust-dot` — inline dot used in the bottom rail (promote inline rule to class for reuse).
- **Remove** `body[data-sticky-bar="shown"]` and any `--sticky-bar-h` token.

### 9. Memory updates
- Update `mem://features/two-tier-navigation`: rail at `md+`, retired sticky bar, single primary in drawer, three same-shape columns, contact moved to bottom rail.
- Replace `mem://constraint/no-floating-fab` with `mem://constraint/no-redundant-cta-surfaces`: forbid re-introducing the StickyConsultBar AND a floating FAB (same redundancy reason).
- Update `mem://index.md` Core: "Nav is two-tier: top bar (logo + section rail md+ + phone + Consultation + hamburger) and fullscreen drawer. No floating FAB, no sticky CTA bar."

## Out of scope (kept stable)

- Section IDs on pages — already added in round 1; renaming labels doesn't touch the IDs.
- QuickContactSheet content — mobile contact UX shipped.
- Photography — no image swaps.
- Hero / page bodies — untouched.
- Auth, data, edge functions — no backend work.

## Verification after merge

- TypeScript clean (`bunx tsc --noEmit`).
- No lingering `StickyConsultBar` imports (`rg StickyConsultBar src/`).
- All `pageSections` anchors still resolve to existing `id="…"` attributes.
- Manual: open every route, confirm rail labels are accurate, drawer has 3 columns, only one persistent CTA visible at any time.