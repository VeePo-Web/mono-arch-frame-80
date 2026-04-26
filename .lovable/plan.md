# Plan — World-class AI photography for Haven Creek

## 0 · Decisions logged from your answers
- **Intent:** Full replacement — every photo-pending surface gets a real image.
- **Aesthetic:** Realistic worksite documentary. **No people, no faces, no hands.** Materials, tools mid-task, finished details, weathered exteriors, framed deck structures, prairie context.
- **Model + storage:** `google/gemini-3-pro-image-preview` (Nano Banana Pro), written to `src/assets/photography/` so Vite hashes/optimizes them.

I'm also going to silently fix the runtime error you're seeing (`Cannot read properties of null (reading 'useEffect')` from `QueryClientProvider`) — that's a stale Vite dep cache, resolved by removing `node_modules/.vite`. No code change needed there.

---

## 1 · Brand-photography contract (the rules every prompt must obey)

These rules come straight out of `knowledge/source-documents/brand-identity/1.5-brand-identity-north-star.md` and `1.3-client-design-preferences.md`. Every prompt I write will be derived from this contract:

| Rule | Concrete prompt language |
|------|-------------------------|
| Rural Alberta, not urban | "rural Alberta acreage… prairie horizon… aspen / lodgepole pine in the distance… foothills haze on the west edge" |
| Natural light, never studio | "soft overcast morning" or "low golden afternoon" — no ring lights, no rim flash |
| No people, no faces, no hands | Hard-coded *negative*: "no people, no faces, no hands, no figures, no portraits" in every prompt |
| Honest worksite, not luxury | "tools in mid-task, sawdust on the sill, a level resting on the trim, drop sheet folded" — the *evidence* of work, not staging |
| Calm palette aligned to the site | Dominant cedar / evergreen / warm off-white. *Negative*: "no neon, no chrome, no glossy plastic, no high-saturation accent colors" |
| Lens & framing | 35mm or 50mm equivalent, eye-level, no tilt-shift fisheye, no drone unless the shot is explicitly aerial |
| Aspect & resolution | 3:2 horizontal for hero / area / about (1536×1024), 4:5 vertical for gallery plate cards (1024×1280), 16:9 ultrawide for closing band (1536×864) |

**Negative prompt baseline (re-used everywhere):** *"no people, no faces, no hands, no figures, no signage with brand logos, no urban backdrop, no high-rise, no neon, no chrome, no luxury hotel staging, no real-estate stock look, no over-saturation, no HDR halos, no fisheye, no watermark, no text overlay."*

---

## 2 · The image catalogue (14 frames, every one accounted for)

Each entry is the **filename → surface → prompt seed**. I'll feed each through the `lovable_ai.py --image --model google/gemini-3-pro-image-preview` skill script, one at a time, and visually QA each before moving on.

### Group A — Hero & site-wide (3 images)
1. **`hero-acreage-morning.jpg`** *(1536×1024, replaces `HeroVignette` watermark in `Hero.tsx`)* — A dark cedar-clad acreage home seen across a frosted late-autumn field at low golden hour, soft Alberta foothills behind, single chimney, no people, no signage. Restrained. The photograph the brand has been waiting for.
2. **`hero-detail-trim.jpg`** *(1024×1280, secondary hero accent / fallback)* — Macro detail of a hand-fitted door casing meeting baseboard, the joint perfectly tight, faint sawdust on the sill, cool north light through an unframed window edge.
3. **`closing-prairie-light.jpg`** *(1536×864, drop into `ClosingCta` section as ambient backdrop on the home page only)* — Wide horizontal plate of an aspen line at the property edge under late afternoon prairie light. Used at very low opacity.

### Group B — Service cards & service pages (3 images)
4. **`service-interior-finishing.jpg`** *(1024×1280)* — Replaces `ServicePlate` for **Interior Finishing**. A nearly-finished interior corner: stained cedar trim meeting white drywall, a small carpenter's level resting on the casing, soft window light from the right, painter's tape rolled off to the side.
5. **`service-exterior-finishing.jpg`** *(1024×1280)* — For **Exterior Repairs**. Weather-side cedar siding mid-repair on an acreage gable: a panel newly replaced, the older boards visibly weathered grey, soffit detail visible at the top, foothill light raking from the left.
6. **`service-decking.jpg`** *(1024×1280)* — For **Decking**. A wraparound cedar deck framed but not yet boarded, joists casting clean shadow lines, prairie horizon visible through the framing, golden hour.

### Group C — Selected works gallery plates (6 images, one per `galleryPlates` entry)
These replace every `ProjectPlaceholder` on the Work page and inside `SelectedWorks` on the home page. Filenames mirror the slugs so the swap is mechanical:

7. **`work-bragg-creek-trim-transitions.jpg`** — A mitred trim transition between two rooms, framed at eye-level, the fit-up clean, soft north light.
8. **`work-water-valley-builtin-shelving.jpg`** — Wall-spanning built-in shelving photographed at a slight angle so you can read the depth, a single linen-bound book on the middle shelf for scale, no styling clutter.
9. **`work-rocky-view-siding-repair.jpg`** — Mid-repair shot of a south-exposure cedar wall: the new boards a touch lighter than the weathered originals, ladder leaning out of frame, no hands.
10. **`work-bearspaw-soffit-fascia.jpg`** — Low-angle shot of new soffit and fascia meeting a gable, vent placement clean, late afternoon shadow on the wall.
11. **`work-bearspaw-wraparound-deck.jpg`** — Finished wraparound cedar deck wrapping a corner of the home, two empty Adirondack chairs at the far end, prairie beyond, no people.
12. **`work-water-valley-stepdown-platform.jpg`** — Two-tier deck stepping down a slope toward an aspen line, natural-grade follow visible, framing reads as inevitable.

### Group D — Area / About atmosphere (2 images)
13. **`area-foothills-evening.jpg`** *(1536×1024)* — Long-exposure-feel foothill horizon at dusk, used as the SubPageHero secondary accent on the four area pages. Brand-true context, not a project.
14. **`about-tools-bench.jpg`** *(1024×1280)* — Worn workbench with a chalk line, square, planer-shaving curls, and a thermos. Tools-of-the-trade still life. Drops into About as the right-column atmosphere.

That's the entire catalogue. Nothing else on the site is currently photo-pending.

---

## 3 · Generation pipeline

I'll run the `ai-gateway` skill (`/tmp/lovable_ai.py`) in a deliberate loop, **not** in parallel, so I can:
1. Generate one image at the right aspect.
2. View it with `code--view` (the skill writes raw PNG to /tmp).
3. Visually QA it against the contract above. If a face, hand, fisheye warp, watermark, neon accent, or staged-luxury vibe slipped in, I regenerate with a tightened negative prompt before moving on.
4. Convert PNG → optimized JPEG (q=82, mozjpeg-style) using ImageMagick via `nix run nixpkgs#imagemagick` so the asset bundle stays light.
5. Write the final JPEG into `src/assets/photography/<filename>`.

Expected wall time: ~3–5 minutes per image with the Pro model + QA, so ~50–70 minutes of generation total. I'll keep you posted as each group completes.

---

## 4 · Code integration (desktop-pixel-stable)

### 4a · One typed manifest
**New file: `src/assets/photography/index.ts`** — a single `import` surface so every component pulls from the same source of truth and Vite emits hashed, optimized URLs.

```ts
import heroAcreage from "./hero-acreage-morning.jpg";
import heroDetail from "./hero-detail-trim.jpg";
// …14 imports total
export const photography = {
  heroAcreage, heroDetail, closingPrairie,
  serviceInterior, serviceExterior, serviceDecking,
  works: {
    "bragg-creek-trim-transitions": workBraggCreekTrim,
    "water-valley-builtin-shelving": workWaterValleyShelving,
    // …
  },
  areaFoothills, aboutToolsBench,
} as const;
```

### 4b · `ProjectPlaceholder` → real `<img>`, falls back gracefully
Add a `src?: string` prop. When supplied, render a **real photograph** layered into the same `photo-pending` shell so the desktop card sizing is byte-identical:
- `<img src srcset sizes loading="lazy" decoding="async" alt={`${title} — ${area}`} />` filling the plate area, with the existing numeral pill kept as a small overlay in the corner (continues the editorial "plate" language).
- The italic "Photograph in progress" line + hairline rule are removed *only when* `src` is provided.
- All Tailwind classes preserved; the `<img>` uses `object-cover w-full h-full aspect-[4/5]` so the card height doesn't shift.
- When `src` is absent (e.g. an unphotographed future project), the existing typographic plate still renders. No regression.

### 4c · `ServicePlate` → real `<img>` with the same pattern
Identical treatment. The numeral pill stays as a small bottom-left badge over the photograph so the editorial signature survives.

### 4d · `Hero.tsx` — replace `HeroVignette` with a real photograph
- `HeroVignette` is currently a watermark in the soft right-side bloom. Swap that node for an `<img src={photography.heroAcreage} alt="" aria-hidden="true" loading="eager" fetchpriority="high">` masked by the existing radial bloom (kept as an overlay) so the LCP element is the real photo, not the SVG. The watermark drift effect (clip-path + opacity) is preserved as a wrapper class.
- Headline column, drift hook, eyebrow, field notes — **untouched.** Desktop stays pixel-identical apart from "the SVG behind has become a real photo."
- I'll mark the hero image with `fetchpriority="high"` and add `<link rel="preload" as="image" imagesrcset>` in `index.html` so LCP improves rather than regresses.

### 4e · `Index.tsx` (home gallery + closing band)
- Pass the matching `photography.works[slug]` into each `<ProjectPlaceholder>`.
- `SelectedWorks` (lazy chunk) gets the same prop — its sidebar rows already use `ProjectPlaceholder` in compact mode, so they get the photograph too at the smaller crop.
- The `closing-prairie-light.jpg` becomes the ambient backdrop of the existing `ClosingCta` on home only, layered at `opacity-[0.08]` behind the existing radial bloom. Optional — call out below.

### 4f · `Work.tsx` and service pages
- `Work.tsx` simply forwards `photography.works[p.slug]` into `ProjectPlaceholder`. The filter rail, layout, hover transform — all unchanged.
- `Services.tsx` forwards `photography.serviceInterior/Exterior/Decking` into `ServicePlate`.
- The three service deep pages (`InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx`) — I'll add a single hero photograph slot beneath their existing `SubPageHero` (right-column vignette becomes the matching service photograph). Desktop layout untouched because it just fills the existing `vignette` slot.

### 4g · Area pages and About
- `AreaPage.tsx` accepts an optional `vignette` slot already. Pass `photography.areaFoothills` so all four area pages share one calm context image. Could later be diversified per area; not required today.
- `About.tsx` gets the `photography.aboutToolsBench` still life dropped into its existing right-column slot.

### 4h · Performance & accessibility hygiene
- Every `<img>` gets explicit `width` + `height` attributes (matching the source) → zero CLS impact.
- Lazy-load everything except the Hero image (eager + preload).
- Meaningful `alt` text on every photograph (scope + area), empty `alt=""` only on the decorative hero/closing backdrop layers, with `aria-hidden="true"`.
- Vite will produce `.webp` automatically via the asset pipeline; no extra build config needed.

### 4i · Typography overlay polish
Where a numeral pill or italic caption now sits **on** a photograph, I'll add a 12-pixel-wide gradient scrim (`linear-gradient(to top, hsl(var(--background)/0.55), transparent 40%)`) at the bottom of the image so caption text always meets WCAG AA contrast — no matter how light or dark the image turns out.

---

## 5 · Runtime error fix (silent)
- `QueryClientProvider` complaining about a null React is a stale Vite dependency cache (a known issue when many deps are added/removed in succession). I'll simply delete `node_modules/.vite` on the next exec so Vite re-pre-bundles. No source change.

---

## 6 · QA checklist before I hand back
- [ ] Each generated image opened and inspected: no people / no faces / no neon / no fisheye / no watermark / no urban context.
- [ ] Each one feels like a real photograph from a rural Alberta worksite.
- [ ] File sizes ≤ ~250 KB (JPEG q=82) so the page weight stays sane.
- [ ] `bunx tsc --noEmit` clean.
- [ ] `bunx vite build` clean.
- [ ] Spot-check the home, work, services, an area page, and about at desktop preview width — pixel layout unchanged.
- [ ] Mobile: `<img>` lazy-loading + `sizes` attribute confirmed correct (via DevTools network tab simulation).
- [ ] Runtime error gone after Vite cache reset.

---

## 7 · One choice for you before I start
**Should the home-page `ClosingCta` get the very-low-opacity `closing-prairie-light.jpg` backdrop (item 3 in the catalogue)?** It would only render on the home page closing band, layered at ~8% opacity so it reads as ambient warmth, not a billboard.

- **Recommended (default):** Yes — it gives the closing moment the same warmth as the hero. Reply *"no closing photo"* to skip it; otherwise I include it.
- I'll proceed with all 14 images on approval; that question only changes whether image 3 is wired into the closing band or simply kept as an unused asset for future use.

---

**On approval I'll generate Group A first, post the Hero image to you for inline visual QA, then continue Groups B → C → D, and finally do the code integration in one focused commit at the end. Total time estimate: ~75–90 minutes wall-clock.**
