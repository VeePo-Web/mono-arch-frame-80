## Goal

Remove the snowy-road-with-mountains photo (`IMG_6404.jpeg`, upload11) from the Work grid. It's a landscape shot, not project work, so it doesn't belong in the portfolio.

## Change

- `src/assets/photography/index.ts`: drop the `upload11` import and remove its entry from `uploadedProjectPhotos` (now 17 photos instead of 18). `homeRecentPhotos` does not reference index 10, so no change needed there.
- Delete the file `src/assets/photography/uploads/IMG_6404.jpeg`.

## Out of scope

No layout, grid, or other photo changes. /work still renders all entries in `uploadedProjectPhotos` — just one fewer.

## Files touched

- `src/assets/photography/index.ts`
- `src/assets/photography/uploads/IMG_6404.jpeg` (deleted)
