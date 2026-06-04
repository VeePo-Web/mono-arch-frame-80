## Audit findings

I opened each photograph and cross-checked it against where it sits today.

| Page | Current bleed | Verdict |
|---|---|---|
| Home `/` | `closingPrairie` (snow on evergreens) | **Fail — duplicate.** The Hero on the same page already paints `closingPrairie` as its full-bleed `hero-backdrop__img`. Seeing the same forest twice in one scroll is the opposite of Apple restraint. |
| About `/about` | `aboutToolsBench` | **Fail — wrong subject.** The photo is not a tools bench — it's interior finished shelving above a desk. The alt I wrote ("hand tools resting on a workbench") is misleading. The image itself reads flat/cluttered at full bleed. |
| Services `/services` | `deckingDetailEndgrain` | **Pass.** Warm end-grain + fallen leaf + low shadow. The single most Apple-product-photography image in the library. Keep. |

I also catalogued what's already spoken for:

- `closingPrairie` → home Hero backdrop
- `areaFoothills` → About Hero backdrop
- `interiorDetailTrim` → Services Hero backdrop
- `exteriorDetailSoffit` → Work Hero backdrop
- `closingPhotoMoment` → Contact mobile Hero backdrop only (free on desktop)
- `heroDetail` → currently **unused** anywhere

## The Apple-UX rule I'm applying

Each bleed must (a) not repeat a photograph already on the same page, (b) advance the page's argument visually — not just decorate, (c) reward inspection with a clear material focal point.

## Changes

**Home `/` — swap `closingPrairie` → `closingPhotoMoment`**
The shot is a modern wood-clad acreage home at dusk, interior windows warm. Payoff: the page just showed six tiles of work; this is what work looks like when it's done and the homeowner has gone inside. Sits between RecentWorkPreview and BigCloseCTA as the emotional pivot to "let's talk." `closingPhotoMoment` is only used on `/contact` mobile, so no desktop duplication.
- `position="50% 65%"` to seat the roofline in lower-mid frame and let the dusk sky dominate the dissolve.
- Alt: `"A wood-clad acreage home at dusk, interior windows warm against the prairie sky"`.

**About `/about` — swap `aboutToolsBench` → `heroDetail`**
The unused `hero-detail-trim.jpg` is a heavy black bracket fastened to a stained timber post — heavy hardware, real fasteners, warm wood. Reads instantly as "craft + hands-on + the actual joinery," which is exactly the bridge between "How we work" (philosophy) and "Where we work" (areas). Currently unused anywhere, so introducing it here also gives the photo library full coverage.
- `position="50% 45%"` to center the bracket vertically.
- Alt: `"A heavy black structural bracket bolted into a stained timber post"`.

**Services `/services` — keep `deckingDetailEndgrain`, refine copy**
- Tighten alt to: `"End-grain of a cedar deck board with a fallen leaf catching afternoon light"`.
- `position="50% 50%"` already correct.

## What stays untouched

- `PhotoBleed.tsx` component — no API or visual changes. Only swapping `src`/`alt`/`position` props at the three callsites.
- Work and Contact pages — still no bleed.
- Memory core rule for home flow stays valid (Hero → RecentWorkPreview → PhotoBleed → BigCloseCTA).
- Photography manifest, hero placements, services list, About prose — untouched.

## Files touched

- `src/pages/Index.tsx` — swap PhotoBleed `src`/`alt`/`position`
- `src/pages/About.tsx` — swap PhotoBleed `src`/`alt`/`position`
- `src/pages/Services.tsx` — alt rewrite only
