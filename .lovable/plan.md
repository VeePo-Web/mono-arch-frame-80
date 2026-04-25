# Performance Optimisation Pass

## Diagnosis

The app **compiles cleanly** — `tsc --noEmit` is silent, `vite build` succeeds, dev server is up. There is nothing to fix. So this plan is the audit pass.

Build numbers (production, gzip):

| Chunk | Raw | Gzip |
|---|---|---|
| `index` (eager: App + Index + Hero + JsonLd + Galleries) | 396.7 KB | **120.0 KB** |
| `ConsultationForm` (lazy) | 326.5 KB | 90.0 KB |
| All 13 route chunks combined | < 80 KB | < 27 KB |
| CSS | 92.2 KB | 16.4 KB |

The **eager 120 KB gz** is the only real concern. Everything else is already well-split.

---

## Changes (ordered by impact)

### 1. Trim the eager main bundle (~25–35 KB gz savings)

- **`App.tsx`** — defer `Toaster`, `Sonner`, and the global `TooltipProvider` behind `lazy()` + `Suspense`. None of these render anything before user interaction, but they currently ship in the eager bundle. Wrap only the `<Routes>` subtree in `TooltipProvider` lazily; render Toaster/Sonner mounted inside a `useEffect` after first paint.
- **`pages/Index.tsx`** — delete the locally redefined `RevealSection` (lines 32–47) and import the shared `@/components/RevealSection` instead. Removes ~30 LoC and one duplicated hook wiring.
- **`pages/Index.tsx`** — split `SelectedWorks` to a lazy import (it's already below the fold). Saves ~5 KB gz from the eager Index chunk.
- **`components/JsonLd.tsx`** — wrap each schema object in `useMemo` so `JSON.stringify` doesn't run on every parent re-render. Tiny CPU win on each route change, especially for the area pages that emit two LD blocks each.

### 2. Below-the-fold rendering hints (paint + scroll perf)

Per the project standard at `mem://standards/performance-rendering-strategy`, every section past the hero should declare `content-visibility: auto` with `contain-intrinsic-size`. Currently nothing does.

- Add a `.cv-auto` utility to `src/index.css`:
  ```css
  @media (min-width: 0px) {
    .cv-auto { content-visibility: auto; contain-intrinsic-size: 800px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .cv-auto { content-visibility: visible; }
  }
  ```
- Apply via `className` on every `<RevealSection>` after the first one — Index sections II–VI, the Selected Works grid, all `ClosingCta` instances, all `Services`/`Work`/`ServiceAreas`/area-page sections past §I.

### 3. Font-loading tune (LCP for the Hero H1)

The Hero `<h1>` uses Fraunces — currently behind a preload-then-swap stylesheet. Two improvements:

- Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the **single Fraunces 400 weight subset** that the H1 uses. Browsers can then fetch the woff2 in parallel with the CSS instead of waiting for the CSS to parse first.
- Add `&text=` URL slicing on the Google Fonts URL to ship only the glyphs the H1 actually renders (the headline copy is short and known at build time). This typically drops the Fraunces payload from ~30 KB to ~4 KB.
- Add `font-display: swap` already implied by `&display=swap` — verify it's still in the URL after the change.

### 4. Render hot-path memoisation

- **`pages/Work.tsx`** — wrap each `GalleryVignette` plate inside a `React.memo`'d `<PlateCard>` so filter clicks don't re-render the 4 cards that didn't change category. Already lazy + reveal'd, but cheap re-renders still cost on mid-tier devices.
- **`components/gallery/SelectedWorks.tsx`** — the active plate switch re-renders the entire sidebar list. Memoise the sidebar row component.
- **`components/Hero.tsx`** — verify `useDrift` uses `{ passive: true }` on scroll/pointermove listeners and rAF-throttles state writes. Patch if not.

### 5. Image / asset hygiene

- `Navigation.tsx` already sets `decoding="async"` on the wordmark — also add `fetchpriority="high"` so the LCP image (the wordmark in the nav above the H1) is prioritised.
- `Footer.tsx` already lazy-loads correctly. No change.
- The two webp brand assets (28 KB + 62 KB) are fine — no action.

### 6. Vite config

- Add an `optimizeDeps.include: ['lucide-react/dist/esm/icons/arrow-up-right', 'lucide-react/dist/esm/icons/chevron-down']` entry so Vite pre-bundles the two icons used across many chunks — avoids re-resolving them per chunk in dev and slightly improves cold-start HMR.
- Add `build.rollupOptions.output.manualChunks` to split `react-router-dom` and `@tanstack/react-query` into their own vendor chunks. They change rarely; isolating them lets returning visitors hit the browser cache instead of redownloading the merged main bundle on each deploy.

### 7. Console / network sanity (verification only)

After the changes, I'll:
- Re-run `bun run build` and report new chunk sizes (target: eager `index` chunk under **95 KB gz**, down from 120).
- Open the preview with the browser tool, capture a `performance_profile`, and confirm no layout thrash from the new `content-visibility` rules.
- Verify the Hero H1 still paints with Fraunces (no FOUT regression from the woff2 preload).

---

## Files touched

- **Edit**: `src/App.tsx`, `src/pages/Index.tsx`, `src/pages/Work.tsx`, `src/components/JsonLd.tsx`, `src/components/gallery/SelectedWorks.tsx`, `src/components/Hero.tsx`, `src/components/Navigation.tsx`, `src/index.css`, `index.html`, `vite.config.ts`
- **Add `cv-auto` className**: every page in `src/pages/` (10 files) and `src/components/AreaPage.tsx`, `src/components/ClosingCta.tsx`
- **No new dependencies. No deletions. No schema or content changes.**

## Out of scope (intentionally)

- React 19 migration / RSC — large lift, no clear win for a marketing site.
- Replacing `react-hook-form` / `zod` — they only ship in the lazy `ConsultationForm` chunk, so the cost is paid only by users who actually open the form.
- Image CDN / responsive `srcset` — only two raster assets, both already small webp.
- SSR / prerendering — would help LCP further but is a much larger architectural change.

## Success criteria

- Eager `index` chunk **≤ 95 KB gz** (from 120).
- Lighthouse Performance score **≥ 95** on `/` (mobile, slow 4G).
- Hero H1 LCP **≤ 1.5 s** on a 4× CPU throttle / Slow 4G profile.
- Zero new TS errors. Zero new console warnings.
