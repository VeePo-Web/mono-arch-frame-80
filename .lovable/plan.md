# Lighthouse CI + Web Vitals + Top-5 honest fixes

> Your instruction: *"never do nothing. always upgrade this."*
> I'm taking that seriously — but I'm also going to be honest about the **state of the code today**. The obvious, expensive optimizations (self-hosted fonts, code-split routes, lazy toasters, lazy form, no raster hero, hashed assets, edge brotli, intersection-observed reveals) **are already done from earlier turns in this conversation**. So the "top 5 fixes" below are the *next* tier — smaller, real, measurable wins, plus actual instrumentation so we stop guessing.
>
> I will not invent fake fixes to pad a list of 5. If a fix is marginal I will say so.

---

## Part A — CI + measurement (the part you actually asked for first)

### A1. Lighthouse CI in GitHub Actions

New file: **`.github/workflows/lighthouse.yml`**

Two jobs:

- **`lighthouse-build`** (runs on every push + PR): does `bun install`, `bun run build`, serves `dist/` with `npx http-server -p 4173 -s`, runs `treosh/lighthouse-ci-action@v12` against `http://localhost:4173/` for these routes:
  - `/`, `/services`, `/work`, `/about`, `/contact`
  - 3 runs each, mobile preset, throttled to "Moderate 4G / 4× CPU slowdown" (Lighthouse default mobile)
  - Asserts: **performance ≥ 0.90**, **accessibility ≥ 0.95**, **best-practices ≥ 0.95**, **CLS ≤ 0.05**, **LCP ≤ 2500 ms**, **TBT ≤ 200 ms**. Failures break the PR.
- **`lighthouse-prod`** (runs on `workflow_dispatch` + nightly cron `0 7 * * *` UTC): same audits against `https://havencreekrenovations.ca` (configurable via repo variable `PROD_URL`). Reports are uploaded to the temporary public storage that the action provides — link is dropped in the workflow summary so you can click straight into the report.

New file: **`.lighthouserc.json`** with the assertion budget so the same thresholds apply locally (`npx lhci autorun`) and in CI.

> **Caveat I will not paper over:** the *build* job runs against the locally-served `dist/`, which is **not** behind the Cloudflare edge, so its Brotli/CDN/TTFB numbers are pessimistic relative to production. That's actually what we want for a regression gate — if it passes here, prod will be better. The `prod` job is the one whose absolute numbers should be trusted.

### A2. Web Vitals real-user telemetry

New file: **`src/lib/vitals.ts`** — imports `web-vitals` (~1.5 kB gz), registers `onLCP`, `onCLS`, `onINP`, `onFCP`, `onTTFB`, sends each to:

1. `console.info("[web-vitals]", metric)` in dev
2. `navigator.sendBeacon('/__vitals', JSON.stringify(metric))` in prod **if** `VITE_VITALS_ENDPOINT` is set, otherwise no-op (we don't have a collector wired up yet — I am not going to fake one)

Wired into `src/main.tsx` via a dynamic import inside `requestIdleCallback` so it never touches the LCP-critical path:

```ts
if (typeof window !== "undefined") {
  const idle = (cb: () => void) =>
    "requestIdleCallback" in window
      ? (window as any).requestIdleCallback(cb)
      : setTimeout(cb, 1500);
  idle(() => import("./lib/vitals").then(m => m.report()));
}
```

New dep: `web-vitals@^4`. ~1.5 kB gz, deferred, never blocks.

> **Honest note:** without a collector endpoint this is *local logging only* — useful for spot-checking in a real browser, not a dashboard. If you want a real RUM dashboard I'd plumb it into a Lovable Cloud edge function + a `vitals` table; that's a separate, larger ask and I'll only do it if you say "wire up the collector too." Otherwise this stays as instrumentation-ready code that flips on the day you add `VITE_VITALS_ENDPOINT`.

---

## Part B — The top 5 fixes (ranked by honest expected impact)

### Fix 1 — Preload the above-the-fold logo & critical font woff2

**Problem:** `Navigation.tsx` has `fetchPriority="high"` on the `<img>`, but the browser still discovers `haven-creek-horizontal.webp` only after parsing+executing the eager JS bundle (it's an ESM-imported asset, not in the HTML). Same for the two woff2 files actually painted above the fold (Fraunces upright 400 + Inter 500).

**Change:** in `vite.config.ts` add a tiny custom plugin that, post-build, emits `<link rel="preload">` tags into `dist/index.html` for:

- the hashed logo webp (resolved by reading the manifest)
- `fraunces-latin-wght-normal.woff2` and `inter-latin-500-normal.woff2` from `@fontsource`, with `crossorigin` and `as="font" type="font/woff2"`

Why a plugin and not hard-coded `<link>` tags in `index.html`: the filenames are content-hashed and change per build. Hard-coded preloads would 404 after the next deploy and silently waste a request.

**Expected:** -150 to -300 ms LCP on a cold mobile load. Real, measurable, will show in the Lighthouse waterfall.

### Fix 2 — Width/height on every `<img>` + `decoding="async"` audit

**Problem:** `Footer` logo and a few other images don't set explicit width/height, so they contribute to CLS until the network round-trip resolves intrinsic size. CLS is the cheapest CWV to fix and the most punished if you miss it.

**Change:** sweep `src/components/Navigation.tsx`, `src/components/Footer.tsx`, and any `<img>` in `src/components/gallery/*`, `src/components/HeroVignette.tsx`, `src/components/ProjectVignette.tsx`. For each:
- add explicit `width` + `height` attributes matching the intrinsic ratio
- `loading="lazy"` for everything below the fold (Footer logo qualifies)
- `decoding="async"` everywhere except the LCP-candidate (nav logo)

**Expected:** CLS drop of ~0.01–0.03. Small in absolute terms, but Lighthouse weights CLS heavily and the assertion budget I'm setting is `≤ 0.05`.

### Fix 3 — Drop unused shadcn `ui/*` files from the repo

**Problem:** `src/components/ui/{drawer,chart,carousel,calendar,command,input-otp,resizable,sonner}.tsx` are not imported anywhere in `src/` (verified with ripgrep). They tree-shake out of the *bundle*, but they still get type-checked, eslinted, and re-parsed by the IDE every dev run, and they pull `framer-motion`, `recharts`, `embla-carousel-react`, `react-day-picker`, `cmdk`, `input-otp`, `vaul` into `package.json` "as if" they were used.

**Change:**
- delete the 8 unused `ui/*` files
- `bun remove framer-motion recharts embla-carousel-react react-day-picker cmdk input-otp vaul next-themes`
- (`sonner` stays — `App.tsx` lazy-loads it)

**Expected:**
- **Bundle:** ~0 bytes change for end users (they were already tree-shaken)
- **Install size:** ~40 MB smaller `node_modules`
- **Cold dev start:** noticeably faster
- **Honesty:** this is a maintenance/devex win, NOT a runtime perf win. I'm including it because dropping ~40 MB of unused deps is the right call and I'm not going to pretend it moves LCP.

> If you'd rather keep all shadcn primitives "in case", say so and I'll skip this fix.

### Fix 4 — `<link rel="modulepreload">` for the route chunks the user is most likely to visit next

**Problem:** Route chunks (`About`, `Services`, `Work`, `Contact`) are fetched only when the user clicks. On a slow connection that's a visible 200–800 ms hang on first navigation.

**Change:** new component `src/components/RoutePrefetcher.tsx` mounted from `App.tsx`. After `requestIdleCallback`, it dynamically `import()`s the four most-likely-next routes from the home page (`Services`, `Work`, `Contact`, `About`). Vite turns this into `modulepreload` automatically. Pure idle-time work, never blocks main.

Guarded by `navigator.connection?.saveData !== true` and `navigator.connection?.effectiveType !== "2g"` so we don't burn bytes on slow/metered connections.

**Expected:** -200 to -600 ms TTI on second navigation. Doesn't move home-page Lighthouse score, but moves the *perceived* speed dramatically.

### Fix 5 — Add `content-visibility: auto` to long below-the-fold sections on Index

**Problem:** the home page has many large sections (Trust Promise, Services grid, Selected Works, Service Areas, Closing CTA). Browsers still do layout/paint work for them even when off-screen.

**Change:** add `content-visibility: auto; contain-intrinsic-size: 800px;` to the wrapper of each below-fold `<section>` on `Index.tsx` (4–5 sections). Memory mentions a `performance-rendering-strategy` rule already exists for this — I'll apply it to the home page's heaviest sections specifically, since that's where the LCP/INP measurement happens.

**Expected:** -50 to -150 ms on initial paint and on scroll INP for the home page on mid-tier mobile. Real, but small.

---

## What I am NOT doing, and why

- ❌ **Adding a service worker.** Cloudflare already serves immutable hashed assets with `max-age=31536000`. A SW adds complexity (offline strategy, update flow, stale-content footguns) that doesn't move CWV here.
- ❌ **Switching `lucide-react` to per-icon imports project-wide.** Already done — every import in the codebase is `lucide-react/dist/esm/icons/<name>`. Verified.
- ❌ **Adding AVIF `<picture>` for hero.** There is no raster hero; the hero is SVG + CSS. AVIF would have been a fix on a different site.
- ❌ **Inlining critical CSS.** Vite already inlines `<style>` for the entry chunk's CSS in `index.html` for the visited route. Manually critical-CSS-ing on top of that is theater.
- ❌ **Pre-compressing assets with `vite-plugin-compression`.** Cloudflare brotlis on the fly. Pre-compressed siblings would never be served.
- ❌ **Replacing `framer-motion` with CSS.** Not used in the app code (only in unused `ui/drawer.tsx`, which Fix 3 deletes).

---

## Files touched

**New:**
- `.github/workflows/lighthouse.yml`
- `.lighthouserc.json`
- `src/lib/vitals.ts`
- `src/components/RoutePrefetcher.tsx`

**Edited:**
- `package.json` (add `web-vitals`, optionally remove the 7 unused heavies)
- `vite.config.ts` (add the preload-emitting plugin)
- `src/main.tsx` (idle-load vitals)
- `src/App.tsx` (mount `RoutePrefetcher`)
- `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/components/HeroVignette.tsx`, `src/components/ProjectVignette.tsx`, `src/components/gallery/*` (img dimensions + lazy/decoding sweep)
- `src/pages/Index.tsx` (add `content-visibility` wrapper class to 4–5 below-fold sections)
- `src/index.css` (one utility class `.cv-auto` if needed, else inline)

**Deleted (Fix 3, only if you OK it):**
- `src/components/ui/{drawer,chart,carousel,calendar,command,input-otp,resizable}.tsx`

---

## Acceptance

- `lighthouse-build` job passes on this PR with the assertion budget above.
- `web-vitals` logs appear in the browser console on the deployed preview when DevTools is open.
- A second visit to `/services` from `/` happens with no visible spinner (route already preloaded).
- Repo `node_modules` shrinks by ≥30 MB after Fix 3.
- No regression in any existing visual or interaction.

---

## Open questions before I start

1. **Fix 3 (delete unused shadcn + 7 deps):** ship it, or keep the components as a future-proof toolkit?
2. **Web Vitals collector:** stop at instrumentation-ready code (current plan), or also wire up a Lovable Cloud edge function + `vitals` table for a real RUM dashboard?
3. **Lighthouse `prod` job URL:** confirm `https://havencreekrenovations.ca` is the right target, or should the workflow only run after you publish and you'll set the repo variable yourself?

If you approve as-is I'll default to: Fix 3 = ship it, Vitals = instrumentation-only, Prod URL = repo variable `PROD_URL` (workflow no-ops if unset).
