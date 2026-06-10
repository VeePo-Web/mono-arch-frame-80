## Goal

`IMG_3788_1.jpeg` (currently `upload18` — Cory in mask/gloves holding a small critter) is a portrait, not project work. Pull it out of the `/work` grid and use it as the owner headshot in the "A note from Cory" section on `/about`. No caption.

## Changes

**`src/assets/photography/index.ts`**
- Rename the `upload18` import to `coryHeadshot` (same file, clearer intent).
- Export it as `coryHeadshot` so `About.tsx` can import it.
- Remove its entry from `uploadedProjectPhotos` (15 photos remain).
- `homeRecentPhotos` currently references index 15 (the headshot). Re-point that slot to `uploadedProjectPhotos[14]` (last remaining real project photo) so the home 6-tile grid still renders 6 unique shots.

**`src/pages/About.tsx`**
- Import `coryHeadshot`.
- In the "How we work" section's left signature column (currently: eyebrow "A note from Cory" + hair rule), insert the headshot above the eyebrow as a small square portrait — `aspect-square`, `w-32 md:w-40`, `object-cover`, hair-rule below it for visual continuity. No caption, no figcaption, no alt text beyond `"Cory, Haven Creek Renovations"`.
- Reveal cadence matches existing column (initial reveal, then eyebrow +120ms, rule +240ms).

## Out of scope

No layout changes elsewhere. `/work` simply renders one fewer tile. The image file stays in `uploads/` (now reused by About) — nothing deleted.

## Files touched

- `src/assets/photography/index.ts`
- `src/pages/About.tsx`
