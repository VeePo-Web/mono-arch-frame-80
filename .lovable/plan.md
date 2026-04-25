# Performance Optimization Plan

The site looks good but ships **~730 KB of logo PNGs**, a **bloated variable-font axis range**, **eager-loads all 15 routes**, and has a few smaller wins. Below is a tight, measurable plan — zero design changes.

> Note on the build errors above: they're stale TS cache from the prior empty stubs. Every page now has a valid `export default` (verified). Errors will clear on next compile.

---

## 1. Logo assets — biggest single win (~700 KB → ~30 KB)

**Problem:** Logos are uncompressed PNGs in `src/assets/logo/`:
- `haven-creek-mark.png` — 289 KB
- `haven-creek-icon.png` — 201 KB
- `haven-creek-horizontal.png` — 142 KB
- `haven-creek-horizontal-white.png` — 99 KB
- `public/favicon.ico` — 58 KB (way too large)

A logo is a flat vector — PNG is the wrong format. SVG renders crisply at any size in 2–8 KB.

**Action:**
- Convert all 4 logos to **SVG** (or fallback to optimized WebP @ 2x where SVG isn't possible). Target ≤ 10 KB each.
- Rebuild `favicon.ico` as a proper 16/32 multi-res file (≤ 5 KB).
- Update imports in Navigation, Footer, JsonLd once built.

**Win:** ~700 KB shaved off initial paint on every page that shows the logo.

---

## 2. Font payload — second biggest win

**Problem:** `index.html` requests Fraunces with the full optical-size + weight axis (`9..144, 300..600`) **plus italic axis** — that's the entire variable font (~150 KB+) when only 1–2 weights are actually used.

**Action:**
- Restrict Fraunces to weights actually rendered: `400` regular + one italic if `.text-subhead` / `.pull-quote` need it. Drop the `9..144` opsz range.
- Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` only for the **one** woff2 used above the fold (Fraunces 400 — drives the H1/LCP).
- Skip preloading Inter — it swaps in fast and isn't on the LCP path.
- Consider `font-display: optional` for Fraunces if FOUT is acceptable.

**Win:** ~80–120 KB shaved. Faster LCP.

---

## 3. Route splitting — faster initial JS

**Problem:** `src/App.tsx` statically imports **all 15 page components**. Visiting `/` downloads JS for `/contact`, `/about`, every service area page, etc.

**Action:**
- Convert every route except `Index` and `NotFound` to `React.lazy(() => import(...))`.
- Wrap `<Routes>` in `<Suspense fallback={null}>` (or a minimal bg-matching skeleton — no flash).
- Keep `Index` eager so home has zero waterfall.

**Win:** Initial JS bundle drops from all-routes to home-only. Faster TTI.

---

## 4. Render-path cleanup

- `ScrollToTop` → use `useLayoutEffect` so scroll happens **before** paint, not after (no flash).
- All below-the-fold `<img>` tags get `loading="lazy"` + `decoding="async"`. Hero image stays eager with `fetchpriority="high"`.
- Sanity-check no file imports the lucide-react barrel — vite-swc tree-shakes per-icon imports correctly, just confirm.

---

## 5. CSS / Tailwind tightening

- Confirm `tailwind.config.ts` `content` glob is scoped to `src/**` (not scanning `node_modules`).
- Custom scrollbar + smooth-scroll stay — design intent, negligible cost.

---

## Execution order (single focused pass)

1. **Logos → SVG** (biggest win, zero risk)
2. **Font subset + preload** (LCP win)
3. **Route lazy-loading in App.tsx** (TTI win)
4. **Image attrs + `useLayoutEffect`** (polish)
5. **`bun run build`** to verify bundle size before/after

---

## Out of scope (not touching)

- Page copy (queued for the narrative-elevation phase after Phase 1 ships)
- Layout, color tokens, typography scale (design locked)
- Adding new routes / components