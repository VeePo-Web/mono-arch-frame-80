## Goal
Refine `/contact` (desktop) into a fantasy.co-style editorial page: more whitespace, restrained type, fewer competing elements. Hide the nav "Get a Free Quote" CTA on `/contact` (redundant — the page IS the quote form).

## Changes

### 1. `src/components/Navigation.tsx`
Hide the inline "Get a Free Quote" pill when `pathname === "/contact"`. Phone link + Menu pill stay. Mobile nav unchanged.

### 2. `src/pages/Contact.tsx` (desktop only — mobile untouched)
Rebalance the two-column split toward fantasy.co's editorial calm:
- Drop the dark evergreen form panel. Whole page becomes cream-on-cream — fantasy.co never uses a hard color split.
- Left column (~58%): brand cascade reworked into a single quiet stack, left-aligned (not centered), with generous left padding. Mark smaller (~140px), a fine evergreen hairline, wordmark, italic tagline, phone — all left-justified, more vertical breathing room.
- Right column (~42%): bare cream form with a single-line eyebrow ("Get in touch / Replies in 2 business days"), an oversized serif headline ("Tell us about your project."), then the 3 fields. No panel, no hairline divider, no background fill.
- Keep the single-viewport lock (`h-[calc(100svh-80px)] overflow-hidden` + html overflow hidden).
- Vertical-center both columns; ~80–96px horizontal gutter between them via a center spine.

### 3. `src/components/contact/ContactBrandStack.tsx`
- Switch from centered cascade to left-aligned stack: `items-start`, left padding bumped, text-left.
- Mark: cap at ~140px (down from 380px) so it reads as a logo, not a hero illustration.
- Reduce the wordmark width; tagline becomes a single quiet italic line under it.
- Phone: smaller, label "Call" + number on one line, evergreen on hover.

### 4. `src/components/ConsultationForm.tsx`
- Remove the `tone="dark"` branch usage on `/contact` (page no longer dark). Revert to the cream tone but keep the compact spacing (`space-y-7`) and `rows={3}` so it still fits one viewport. Easiest: keep `tone="dark"` API but pass `tone="cream"` from Contact, and tighten cream spacing locally inside Contact via a wrapping class — OR add a `compact` prop. Simpler: keep using `tone="dark"` flag purely for spacing/sizing and split the color logic so dark-only color classes are gated by a separate `surface` consideration. **Chosen approach:** introduce a `compact?: boolean` prop that only controls spacing/textarea rows/submit-width (independent of `tone`), and pass `tone="cream"` + `compact` from `/contact` desktop.

## Out of scope
- Mobile `/contact` layout, sticky CTA, SubPageHero, form schema, submit logic.
- Footer, MenuOverlay, other routes.
- Copy elsewhere on the site.

## Technical notes
- Navigation gets `const onContact = pathname === "/contact";` then `className={cn(..., onContact && "hidden")}` on the quote `<Link>` (still keep `lg:inline-flex` for other routes).
- Contact desktop uses a 12-col grid: brand col-span-7, form col-span-5, centered with `max-w-[1280px] mx-auto`, `px-12`, `gap-x-20`.
- Form headline uses `.t-headline` (serif), eyebrow uses `.t-eyebrow text-evergreen/70`.
- No new design tokens, no new components, no copy changes beyond the form headline + eyebrow on the right column.
