## Goal

Remove the remaining snowy-road photo (`IMG_6405.jpeg`, upload12) from the `/work` grid. Like the previous `IMG_6404`, it's a landscape shot of a highway through trees — not project work, so it doesn't belong in the portfolio.

## Change

- `src/assets/photography/index.ts`: drop the `upload12` import and remove its entry from `uploadedProjectPhotos` (16 photos total after this).
- `homeRecentPhotos` references index 12 (`uploadedProjectPhotos[12]`). After removal, the array length is 16 (indices 0–15), so update that entry to `uploadedProjectPhotos[11]` to keep the home grid intact.
- Delete the file `src/assets/photography/uploads/IMG_6405.jpeg`.

## Out of scope

No layout or grid changes. `/work` still renders everything in `uploadedProjectPhotos` — just one fewer tile.

## Files touched

- `src/assets/photography/index.ts`
- `src/assets/photography/uploads/IMG_6405.jpeg` (deleted)
