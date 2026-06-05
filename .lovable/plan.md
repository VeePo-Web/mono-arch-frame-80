## Goal

1. `/work` becomes a uniform photo grid showing **all 17 uploaded real project photos** (16 fits 4×4; the 17th wraps into a 5th row).
2. `/services` gets a representative photo per service and each service block becomes a clickable link to `/work`.

## Heads-up — two memory constraints you are overriding

- Core memory: *"Work page is an asymmetric 12-col magazine grid… mixed 4:5 / 3:4 aspects."* — replacing with a uniform 4-col grid.
- Core memory: *"Services page renders a magazine row list… never per-service link, never images."* — adding images and per-row link.

I'll update `mem://index.md` so future passes don't revert these. Confirm by approving.

## Step 1 — Bring in the 17 uploaded photos

Copy from `/mnt/user-uploads/` into `src/assets/photography/uploads/`:

```text
IMG_3788_1.jpeg, IMG_6394.jpeg … IMG_6410.jpeg   (17 files)
```

Extend `src/assets/photography/index.ts` with a new export:

```ts
export const uploadedProjectPhotos: { src: string; alt: string }[] = [
  { src: img3788,  alt: "Haven Creek project photograph" },
  { src: img6394,  alt: "Haven Creek project photograph" },
  // …17 total
];
```

(Alt text stays generic until Cory tags them — no fake locations.)

## Step 2 — Rewrite `/work` grid

`src/pages/Work.tsx`:

- Drop `LAYOUTS` / `ASPECTS` asymmetric arrays and the `galleryPlates` import.
- Render one uniform grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6`.
- Each tile = `<figure>` with `aspect-[4/5]`, `overflow-hidden`, lazy `<img>`, hover lift `-translate-y-1 / 500ms ease-weighted` and inner `scale-[1.02]` on hover (same cadence as `ProjectPlaceholder` photographed mode).
- First tile gets `loading="eager"` + `fetchPriority="high"` for LCP.
- Keep `SubPageHero` and `BigCloseCTA` unchanged.
- No captions, no filters, no per-tile link (preserves the "Work is photo-only, no per-project page" rule).

Result on lg+: rows of 4 → 4×4 + 1 trailing tile centered via natural grid flow (or we can pad row 5 by repeating one strong photo — flag for owner if a lonely tile bothers him).

## Step 3 — Update `/services` page

`src/pages/Services.tsx`:

- Convert the `<ul>` row list into the same magazine rhythm but each `<li>` becomes a `<Link to="/work">` block.
- Add a 12-col split per row: photo on cols 1-5 (4:3, `service-interior-finishing.jpg` / `service-exterior-finishing.jpg` / `service-decking.jpg` already in the manifest), text on cols 6-12 (title + promise + cardBody).
- Mobile: stacked — photo first, then text, full-width.
- Hover: keep `.row-wash` evergreen tint + photo scale-[1.02] / 500ms; underline title on hover.
- Add a quiet `t-micro` "See related work →" line under the body to signal the click target.
- Keep `PhotoBleed` (deckingDetailEndgrain) and `BigCloseCTA` unchanged.

## Step 4 — Memory + brief updates

- `mem://index.md` Core: rewrite the Work-grid line ("uniform 4-col photo grid of all uploaded project photos") and the Services line (drops "never images, never per-service link"; adds "each row links to /work").
- `.lovable/plan.md`: log the change so the owner brief stays current.

## Files touched

- `src/assets/photography/uploads/*.jpeg` (new, copied)
- `src/assets/photography/index.ts` (new export)
- `src/pages/Work.tsx` (grid rewrite)
- `src/pages/Services.tsx` (photos + Link rows)
- `mem://index.md`
- `.lovable/plan.md`

## Out of scope

- No category mapping / filtering on /work (kept simple per existing constraint).
- No per-project pages.
- No changes to Home `RecentWorkPreview` (still uses the 6 named gallery plates with their AI shots). Say the word if you want the home preview swapped to 6 of the real uploads too.
