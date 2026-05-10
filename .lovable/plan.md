# Section: Work page → asymmetric grid

Page `src/pages/Work.tsx` + shared tile `src/components/gallery/ProjectPlaceholder.tsx`. The 6-tile asymmetric magazine grid on `/work`.

## Issues found

### 1. Caption strip below every photo tile — violates "zero descriptions" rule
- `src/pages/Work.tsx` L85-90 — Every `<article>` carries a visible caption row: `<h3 className="t-title">{p.title}</h3>` + `<p className="t-micro">{p.category} · {p.area}</p>`, separated by a hair rule.
- Audit constraint: "Gallery has zero descriptions. Like FlexServices.org. Project tiles show the photo only — no title, no area, no category, no caption strip, no hover label, no overlay text, no per-project link, no detail page. The grid is the message. Anywhere descriptions still exist on a project tile (Home RecentWorkPreview, /work grid, anywhere else), strip them."
- Fix: delete the entire `mt-5 pt-3 border-t...` caption block (lines 85-90). The grid becomes photo-only, matching the Home RecentWorkPreview treatment.

### 2. Image hover scale timing violates motion cadence
- `src/components/gallery/ProjectPlaceholder.tsx` L63 — `transition-transform duration-[1400ms] ease-weighted`. The image scales on hover via CSS (`.group:hover .photo-pending--photographed > img { transform: scale(1.025) }`) with a 1400ms transition.
- Core motion cadence: "500ms transform on hover lifts" — the wrapper in Work.tsx already has the correct 500ms `-translate-y-1` lift. The image scale at 1400ms is an extra, slower motion layer that breaks the unified cadence.
- Fix: change `duration-[1400ms]` to `duration-500` so both lift and scale share the 500ms `ease-weighted` timing.

### 3. Alt text describes project meta, not visual content
- `src/components/gallery/ProjectPlaceholder.tsx` L57 — `alt={`${project.title} — ${project.area}`}` reads as metadata ("Interior trim & room transitions — Bragg Creek") rather than describing what the photograph actually shows.
- Audit constraint: "Alt text truthful (matches what the photo actually shows)."
- Fix: change to `alt={project.title}` — the title is a visual description of the work (e.g., "Interior trim & room transitions"), while the area ("Bragg Creek") is location metadata that does not describe the photograph.

### Clean checklist
- ✓ No text under 13px outside `.t-micro`.
- ✓ No low-contrast pairs on interactive elements.
- ✓ No descender clipping (photos only, no text overlays).
- ✓ One H1 per page — H1 lives in `SubPageHero`; grid uses `sr-only` H2.
- ✓ No eyebrow/lede conflict (grid has neither).
- ✓ `.section-y` rhythm used correctly.
- ✓ Hover lift is `-translate-y-1` with `duration-500 ease-weighted`.
- ✓ No per-project pages, no filter chrome, no expand toggle.
- ✓ Tap targets — no interactive elements inside the grid (photos are not clickable links).
- ✓ Responsive: 1-col → 12-col asymmetric holds across breakpoints.

## Fix plan

### `src/pages/Work.tsx`
Delete the caption strip below each tile (lines 85-90).

### `src/components/gallery/ProjectPlaceholder.tsx`
1. L57 — Simplify alt to `{project.title}`.
2. L63 — Change `duration-[1400ms]` to `duration-500`.

## Verify
- `browser--navigate_to_sandbox /work` at desktop 1440 — confirm 6 photo tiles with zero visible captions, no title/area text below images.
- Mobile 390 — same, grid stacks to 1 column, still no captions.
- Hover a tile — lift + image scale both feel synchronized at 500ms.
- Console clean.

## Out of scope
- `SubPageHero` on `/work` — separate "Global → SubPageHero" audit.
- `BigCloseCTA` on `/work` — already audited.
- Dead route configs in `pageSections.ts` (`/services/*`, `/service-areas`) — separate cleanup, not part of grid.
