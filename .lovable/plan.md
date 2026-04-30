## Goal
Drop the 10 uploaded real photographs into the site as production-quality, zero-layout-shift images that replace existing placeholders. No new components, no new routes — only swap the bytes behind the existing typed photography manifest plus a couple of small per-image hooks where the existing slug doesn't fit the subject.

## Image → slot mapping

The site already has a single source of truth at `src/assets/photography/index.ts` keyed by gallery-plate slug. I'll match each photo to the closest existing slug so the Work page, Home preview, and Service plates pick them up automatically.

| Upload | Subject | Lands as | Used on |
|---|---|---|---|
| IMG_6394.jpeg | Wraparound deck w/ pergola (wide) | `work-bearspaw-wraparound-deck.jpg` + `service-decking.jpg` | Work plate VIII, Home preview "Bearspaw deck build", Decking service plate |
| IMG_6395.jpeg | Same deck, hero angle | `closing-prairie-light.jpg` (closing CTA atmospheric) | Closing CTA band |
| IMG_6410.jpeg | Step-down deck + pergola | `work-water-valley-stepdown-platform.jpg` | Work plate IX |
| IMG_6396.jpeg | Bathroom — blue wall, floating shelves, round mirror | `work-water-valley-builtin-shelving.jpg` | Work plate V (built-in shelving) |
| IMG_6398.jpeg | Same bathroom, alt frame | `service-interior-finishing.jpg` | Interior Finishing service plate, Home services grid |
| IMG_6399.jpeg | Bathroom — dark wood niche, herringbone tile, oval mirror | `work-bragg-creek-trim-transitions.jpg` | Work plate IV (trim & transitions), Home preview "Bragg Creek interior finishing" |
| IMG_6400.jpeg | Office w/ long floating shelves | `about-tools-bench.jpg` | About page atmospheric |
| IMG_6397.jpeg | Skylights + ceiling detail | `hero-detail-trim.jpg` | Hero detail vignette |
| IMG_6401.jpeg | Roof framing in progress | `work-bearspaw-soffit-fascia.jpg` | Work plate VII (soffit/fascia/structural) |
| IMG_6402.jpeg | Vaulted ceiling w/ exposed beams + log walls | `work-rocky-view-siding-repair.jpg` + `service-exterior-finishing.jpg` + `hero-acreage-morning.jpg` | Work plate VI, Exterior service plate, Home hero |

Notes on the borderline matches:
- IMG_6401 (open framing) is the closest we have to "exterior weather-side / structural repair" — it visually anchors the Bearspaw soffit/fascia plate better than the typographic placeholder.
- IMG_6402 (beam/log work) is the strongest "rural Alberta exterior craft" frame in the batch and is reused for the Rocky View exterior plate, the Exterior service hero, and the home hero. Reusing one strong image across three slots is preferable to forcing a weak match.
- IMG_6395 + IMG_6394 are near-duplicates of the same deck; the hero angle (6395) is repurposed for the closing CTA, the wide angle (6394) for the actual deck plate + service plate.

## Execution

1. **Copy uploads into the asset folder** with the destination filenames listed above (overwrite the current AI-generated placeholders). Vite hashes them automatically — no manifest edits needed because the import paths in `src/assets/photography/index.ts` already point at these filenames.

   ```text
   user-uploads://IMG_6394.jpeg → src/assets/photography/work-bearspaw-wraparound-deck.jpg
   user-uploads://IMG_6394.jpeg → src/assets/photography/service-decking.jpg
   user-uploads://IMG_6395.jpeg → src/assets/photography/closing-prairie-light.jpg
   user-uploads://IMG_6410.jpeg → src/assets/photography/work-water-valley-stepdown-platform.jpg
   user-uploads://IMG_6396.jpeg → src/assets/photography/work-water-valley-builtin-shelving.jpg
   user-uploads://IMG_6398.jpeg → src/assets/photography/service-interior-finishing.jpg
   user-uploads://IMG_6399.jpeg → src/assets/photography/work-bragg-creek-trim-transitions.jpg
   user-uploads://IMG_6400.jpeg → src/assets/photography/about-tools-bench.jpg
   user-uploads://IMG_6397.jpeg → src/assets/photography/hero-detail-trim.jpg
   user-uploads://IMG_6401.jpeg → src/assets/photography/work-bearspaw-soffit-fascia.jpg
   user-uploads://IMG_6402.jpeg → src/assets/photography/work-rocky-view-siding-repair.jpg
   user-uploads://IMG_6402.jpeg → src/assets/photography/service-exterior-finishing.jpg
   user-uploads://IMG_6402.jpeg → src/assets/photography/hero-acreage-morning.jpg
   ```

2. **Verify alt text + caption copy still reads true** for the new subject matter on each plate. Spot-check the three plates whose captions reference very specific scope words ("siding", "soffit") — if a caption now lies about what's in the photo, soften the copy on the plate (`src/data/galleryPlates.ts`) so it matches what's visible without inventing facts. Specifically:
   - Plate VI (Rocky View siding repair) — soften "siding replacement" → "exterior craft & detail work" since the photo shows interior beams.
   - Plate VII (Bearspaw soffit/fascia) — soften "soffit and fascia replacement" → "structural & roofline work" since the photo shows roof framing.

3. **No code changes** to `ProjectPlaceholder`, `Work.tsx`, `Index.tsx`, hero, or service pages — they already consume the manifest and will pick up the new bytes on next build.

## Quality guarantees

- **Zero layout shift:** `ProjectPlaceholder` already declares `width={1024} height={1280}` and renders inside a fixed-aspect plate, so swapping the source bytes cannot reflow.
- **Lazy loading preserved:** existing `loading="lazy"` + `decoding="async"` already in place; first home-preview card keeps `priority` (eager + fetchPriority high).
- **AA contrast on captions:** existing bottom gradient scrim + drop-shadowed numeral already guarantee legibility against any photo.
- **Reuse is intentional:** three slots share IMG_6402 because it is the strongest brand-true frame in the batch; this is better than letting weaker frames dilute hero moments.

## What I will NOT do
- Will not add new image components, lightboxes, or galleries.
- Will not invent decorative variations or filters on top of the photos.
- Will not edit `src/integrations/supabase/*` or any preconfigured files.
