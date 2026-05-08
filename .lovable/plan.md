# Round 14 — Cut to the bone

The site is already 5 routes (R12) and type-only with inline gallery (R13). Compared to fantasy.co and RoyalMechanical.com, what's still "too much" is **section chrome**: every block has an eyebrow + title + lede + body, every page closes with a big dark green CTA wall, and the home page still shows 6 distinct sections. This round removes the chrome, not the content.

## Guiding rule

A section earns a `SectionHeader` (eyebrow + title + lede) only if it introduces something the visitor cannot identify on sight. A grid of project tiles does not need a title. A 3-column text grid of services does not need a lede. The page itself is the title.

## Home (`Index.tsx`) — 6 sections → 3

New flow:

```text
1. Hero            — H1 + subhead + 1 CTA  (no eyebrow line)
2. Recent work     — 6-tile grid, no header, "See all work →" below
3. Big close CTA   — compact variant (no embedded form)
```

Cut from home: `ServicesGrid`, `HowItGoes`, the named-area rail. Services live on `/services`, process lives on `/about`, areas live on `/about`. The home page is now a 30-second pitch: *who, work, contact*.

## Sub-page heroes — drop the radial bloom + folio + accent-italic

`SubPageHero` keeps: H1, optional subhead, optional one CTA. Removed: `accentWord` italic-evergreen treatment, `folio`, `vignette`, the radial-bloom div, the unused `secondaryCta`, the `eyebrowLabel` deprecated prop. Headlines render as one calm sentence in `text-foreground` — no green accent word. Same change applied to home `Hero` (no italic-evergreen "trusted").

This is the fantasy.co move: the type itself is the design.

## About (`About.tsx`) — 3 sections → 2

- Merge "Working philosophy" + "Property respect" into one section titled simply **"How we work"** with a 12-col layout: short title left, two prose paragraphs right (the philosophy paragraphs first, then the property-respect paragraphs run together).
- Keep the "Where we work" rail (named list, no header eyebrow — just `Where we work` as a small label above the names).
- Compact `BigCloseCTA` at the bottom stays.

## Services (`Services.tsx`) — drop chrome around the 3 blocks

- `SubPageHero` subhead trimmed to one sentence: *"Three focused services. One standard."*
- The grid stays (3 text blocks). No `<h2 class="sr-only">` change needed.
- Compact `BigCloseCTA` stays.

## Work (`Work.tsx`) — drop the SubPageHero subhead

Headline only. The grid is the page.

## Contact (`Contact.tsx`) — drop the sticky left rail

- Single column at all breakpoints. `SubPageHero` headline + subhead, then the form, then the "Or reach us directly" rail. No 5/7 sticky split.
- Form card stays.

## ThankYou (`ThankYou.tsx`) — drop the "while you wait" sign-off

Hero + receipt stamp only. The footer already exposes Work / Services for anyone who wants to keep browsing.

## `BigCloseCTA` — retire the `full` variant + the dark-green slab

Both `full` and `compact` rendered an evergreen-deep wall. Replace with a single quiet variant on cream:

- Cream background (no dark slab, no radial gradients).
- Centered: short headline (`text-headline`), one-line lede, one solid evergreen CTA.
- Drop the embedded `ConsultationForm`, drop the "Or write / Or call" panel, drop the secondary CTA, drop the `tone="light"` codepath.
- All callers (`Index`, `About`, `Services`, `Work`) use the same one variant — no `variant` prop.

This eliminates the most visually heavy element on the site and matches RoyalMechanical's quiet closing rhythm. The `/contact` page is one click away from any CTA, so the home page does not need to embed the form.

## Footer — drop the second row

Remove the `border-t` "© ... Alberta, Canada" sub-row. Move the copyright into the existing single horizontal row, replacing the brand wordmark's right-side text. Result: one row, one rule above it from the page.

## Memory updates (`mem://index.md`)

Add to Core:
- Home is exactly 3 sections: Hero, Recent work (6 tiles), BigCloseCTA. Never re-add ServicesGrid, HowItGoes, or the area rail to `/`.
- `BigCloseCTA` is one quiet cream variant — never the dark evergreen slab, never embeds the form, never carries a secondary CTA.
- Headlines on Hero + SubPageHero are plain `text-foreground` — no `accentWord` italic-evergreen treatment.
- About is exactly 2 prose sections + the area rail.

Drop superseded rules:
- "Home `Hero` is type-only — eyebrow + H1 + subhead + one solid evergreen CTA" → eyebrow line removed.
- "BigCloseCTA full variant: no decorative ridge SVG" → entire `full` variant retired, rule moot.
- "`SubPageHero` accent words use italic-evergreen treatment only" → accent treatment retired entirely.
- "Home renders an inline 6-tile Recent Work preview" → keep, but home no longer has Services or Areas above it.
- "Sub-pages close with `<BigCloseCTA variant="compact" />`" → no variant prop now.

## Component deletions / orphans to clean

After this round, audit and delete if unreferenced:
- `HowItGoes.tsx` (no longer used anywhere)
- `ServicesGrid.tsx` (no longer used anywhere — `/services` renders its own grid inline)
- `RecentWorkPreview.tsx` stays
- `SectionTransition.tsx` — verify still used; if only home used it, delete
- `Eyebrow.tsx` — verify usage; likely still used on About area rail label

## Out of scope (for this round)

- Photography swap — `ProjectPlaceholder` keeps its current image-plate look.
- `ConsultationForm` internals — still 3-step wizard.
- Navigation drawer / header — already R12-clean, untouched.
- `/contact` form fields — still Name / Email or phone / About your project.

## Files to edit

```text
src/pages/Index.tsx              — drop 3 sections, keep 3
src/pages/About.tsx              — merge philosophy+respect into "How we work"
src/pages/Services.tsx           — trim SubPageHero subhead
src/pages/Work.tsx               — drop SubPageHero subhead
src/pages/Contact.tsx            — drop sticky left rail, single column
src/pages/ThankYou.tsx           — drop sign-off section
src/components/Hero.tsx          — drop eyebrow line + italic-evergreen accent
src/components/SubPageHero.tsx   — drop bloom, folio, accentWord, vignette, secondaryCta
src/components/BigCloseCTA.tsx   — replace with one quiet cream variant
src/components/Footer.tsx        — collapse to one row
mem://index.md                   — Core rules updated
```

Files to delete after orphan check:
```text
src/components/HowItGoes.tsx
src/components/ServicesGrid.tsx
(maybe) src/components/SectionTransition.tsx
```

## Result

Home page reads top to bottom in roughly 4 screens: the promise, the work, the close. Sub-pages each carry one job (who, what, where, contact) with no decorative scaffolding around it. The whole site shares one CTA shape, one headline shape, and one closing rhythm — the level of restraint Fantasy.co and RoyalMechanical earn through omission rather than addition.