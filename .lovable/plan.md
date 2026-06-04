## Goal
Make the `PhotoBleed` sections (used on `/`, `/about`, `/services`) feel quieter — more atmospheric, less like a hard photo banner. The photo should whisper between text sections, not punch.

## Change

`src/components/PhotoBleed.tsx` only — single component, applies everywhere it's used:

1. **Light blur on the image** — add `filter: blur(2px) saturate(0.92)` + a tiny `scale-[1.04]` so the blur doesn't expose edge halos. Reads as soft-focus / depth-of-field, not broken.
2. **Stronger cream wash** — bump the full-cover overlay from `background/0.08` → `background/0.22` so the photo sits further back behind the page colour.
3. **Deeper top + bottom dissolves** — taller fade zones (`h-40 md:h-56 lg:h-72`, up from `h-20/28/40`) and a 3-stop gradient (`1 → 0.85 → 0.4 → 0`) so the cream melts much further into the image. No visible seam where the photo starts/ends.

## Out of scope
- No changes to which pages use PhotoBleed, image sources, sizing, or surrounding layout.
- No new tokens or props.
- Mobile/desktop both pick up the same softening (proportional via the responsive heights).
