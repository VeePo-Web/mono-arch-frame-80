# Fix broken section-rail anchors so every label maps to a real element

The rail measurement and scroll-spy logic are correct. The bug is purely in `src/lib/pageSections.ts` — several anchors point to ids that don't exist on the rendered page, so those tabs never highlight on scroll and do nothing on click. Fix by **either** (a) renaming the entries to real ids, or (b) adding the missing `id` to the corresponding section. Recommendation per route below — chosen to keep the rail anchors stable English (avoid renaming UI labels to match implementation noise like `how-it-goes`) and to add a real anchor where the section truly exists.

## Per-route fixes

### `/` (Home)
- `approach` → **rename in pageSections to `how-it-goes`** (matches `HowItGoes.tsx` id).
- `work-preview` → **drop**. There is no work preview section on Home; the rail entry is dead. New rail: `services-preview` · `how-it-goes` · `areas` (3 items, still ≥2 so rail renders).

### `/services`
- `circle` → **drop**. No corresponding section exists. New rail: `services-three` · `quote` (2 items).

### `/services/interior-finishing`
- `why` → **drop**. No "Why It Matters" section on the page. New rail: `meaning` · `craft` · `proof`.

### `/services/decking`
- `lifestyle` → **drop**. No "Outdoor Living" section. New rail: `planning` · `materials` · `proof`.

### `/about`
- `continuity` → **drop**. No section.
- `longterm` → **drop**. No section. New rail: `philosophy` · `respect` (2 items).

### `/contact`
- `quote` → **drop**.
- `areas` → **drop**. With only `form` left the rail has <2 entries and won't render — that's correct (Contact is a single-purpose form route). New rail: `[]` (or single `form`, which the renderer hides).

## File to change
- `src/lib/pageSections.ts` — update the records as above.

## Out of scope
- No changes to `SectionRail.tsx`, `useActiveSection.ts`, or `Navigation.tsx`. Measurement, spy, and scroll math are already verified correct.
- No new sections will be added to pages — if Home eventually grows a "Selected work" preview block, re-add `work-preview` then.

## Verification after edit
- Visit `/`, `/services`, `/services/interior-finishing`, `/services/decking`, `/about`, `/contact` and confirm: every visible rail tab (a) underlines as you scroll past its section, and (b) smooth-scrolls to that section on click.
