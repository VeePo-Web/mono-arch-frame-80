## Goal

The 6-tile Recent Work grid on `/` currently uses the first 6 of `uploadedProjectPhotos`. The user sees them as visually duplicate (same subjects/angles repeating). Curate a hand-picked, visually distinct 6 so the home grid reads as a varied teaser, while `/work` still shows all 18.

## Change

- `src/components/RecentWorkPreview.tsx`: stop slicing `uploadedProjectPhotos.slice(0, 6)`. Instead import a new named export `homeRecentPhotos` (6 hand-picked, visually distinct photos) and render those.
- `src/assets/photography/index.ts`: add `homeRecentPhotos: UploadedProjectPhoto[]` — a curated subset of the 18 uploads chosen for variety (different subject / framing / scale). I'll pick 6 that look distinct from each other based on filename order spread + visual review.
- `/work` is untouched — still shows all 18 from `uploadedProjectPhotos`.
- Lightbox on the home grid opens against the curated 6 only (same as today, just a different source array).

## Out of scope

- No layout, gutter, or aspect-ratio changes.
- No changes to `/work`, `/services`, hero, or PhotoBleed.
- Not deleting any uploaded files — all 18 stay available on `/work`.

## Files touched

- `src/assets/photography/index.ts` (add `homeRecentPhotos` export)
- `src/components/RecentWorkPreview.tsx` (use the curated export)

## Note

If after the swap any of the 6 still look too similar to your eye, tell me which one to drop and I'll substitute another from the 18.
