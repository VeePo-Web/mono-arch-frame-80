## Goal

Get the real Haven Creek photos doing more work — like hickoryandrose, the photography carries the page. Keep the existing uniform 4-col grid on /work, just denser and tappable.

## Changes

### 1. Home — RecentWorkPreview swaps to real photos
- `src/components/RecentWorkPreview.tsx`: drop the `galleryPlates` + `ProjectPlaceholder` path. Render 6 of the real `uploadedProjectPhotos` in the same 1/2/3-col grid, photo-only tiles (`aspect-[4/5]`, hover lift + scale-[1.02], identical cadence to `/work`). Keep the "See all work →" link and the `Recent work` eyebrow.
- Pick the 6 strongest establishing shots (the first 6 in `uploadedProjectPhotos` — already ordered strongest-first).

### 2. /work — tighter gutters + lightbox
- `src/pages/Work.tsx`: tighten gap from `gap-4 lg:gap-6` → `gap-1.5 md:gap-2 lg:gap-3` (hickoryandrose-dense, photos read as one wall).
- Each tile becomes a `<button>` that opens a lightbox at that index.
- Add `src/components/gallery/Lightbox.tsx`: full-viewport `bg-evergreen-deep/95` overlay, single photo centered (`object-contain`, `max-h-[90vh] max-w-[92vw]`), prev/next via arrow keys + on-screen chevrons + swipe (touch), close via Esc + tap-backdrop + frosted Close pill (same silhouette as MenuOverlay close). Counter `n / 18` in `.t-micro` bottom-center. Preloads neighbour images. Locks body scroll while open. No captions.
- Same lightbox is wired into the Home `RecentWorkPreview` tiles (open at index 0-5 of the same array).

### 3. Memory update
- `mem://index.md` Core: amend the Work line — gutters are now `gap-1.5 md:gap-2 lg:gap-3`, tiles are lightbox triggers (not silent figures). Amend the Home line — RecentWorkPreview uses the first 6 of `uploadedProjectPhotos`, not `galleryPlates`.
- New memory `mem://features/photo-lightbox` documenting the shared component.

## Out of scope

- No changes to /services (real service-photos stay — they map to a specific service; swapping to generic uploads would lose that signal).
- No changes to /about or PhotoBleed.
- No mixed aspect ratios — you picked "layout stays".
- No captions or per-photo metadata in the lightbox.

## Files touched

- `src/components/RecentWorkPreview.tsx` (rewrite to use uploaded photos + lightbox)
- `src/pages/Work.tsx` (tighter gap, lightbox trigger)
- `src/components/gallery/Lightbox.tsx` (new)
- `mem://index.md` + `mem://features/photo-lightbox`
