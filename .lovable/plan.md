## Goal

Document — accurately, in the repo — that compression and long-term caching are already handled by Lovable's Cloudflare edge, so this concern stops resurfacing and future contributors know what is and isn't configurable from this codebase.

**No runtime code changes. No bytes shipped to users. No dependencies added.** This is a single documentation file plus one README link.

## What I confirmed before writing

- `curl -I` against the preview URL returned `server: cloudflare` and `cf-ray: …` — Lovable's static hosting is Cloudflare-fronted.
- No `_headers`, `_redirects`, `vercel.json`, or `netlify.toml` exist in the repo, and Lovable's hosting does not honor any of them — there is no per-route header config surface available to this project.
- `vite.config.ts` already emits content-hashed filenames in `dist/assets/` (the `react-vendor` and `query-vendor` chunks plus Vite's default hashing), which is the prerequisite for the `immutable` long-cache pattern to be safe.

## What gets created

**One new file: `PERFORMANCE.md`** at the repo root.

Sections:

1. **Compression — handled at the edge.** Cloudflare negotiates Brotli or gzip per request based on `Accept-Encoding`. Applies automatically to HTML, JS, CSS, SVG, JSON, and other text MIME types. Woff2 fonts are intentionally not re-compressed (already compressed). Nothing in this repo enables or disables this.
2. **Long-term caching — handled by content hashing.** Vite emits hashed filenames in `dist/assets/*` (e.g. `index-aB3xK9.js`). Lovable's hosting serves these with a long `Cache-Control` and `immutable`. `index.html` is served with a short cache so new deploys are picked up immediately. This is the standard hashed-asset pattern and requires no config.
3. **What this repo does NOT control.** A short list: `Cache-Control` headers per-route, custom MIME compression rules, edge cache TTL, `Vary` header tuning. If any of these become required, the work moves out of the repo and into hosting configuration that Lovable does not currently expose.
4. **How to verify on a published deploy.** A copy-pasteable curl snippet that fetches the production URL after publish and prints `content-encoding`, `cache-control`, `etag`, and `age` for HTML, a hashed JS asset, a hashed CSS asset, and a woff2 font. Includes the expected values so anyone can sanity-check in 30 seconds.
5. **Where the real performance levers are in this repo.** A short pointer list to the things that *do* live in code: the bundle code-splitting plan (still pending from earlier in this conversation), the `<picture>` + AVIF work (also pending), the already-implemented self-hosted fonts, and `useReveal` lazy mounting for below-the-fold sections.

**One small edit: `README.md`** — append a single line under the existing "How can I deploy this project?" section linking to `PERFORMANCE.md` so it's discoverable.

## What I am explicitly NOT doing, and why

- ❌ Adding `vite-plugin-compression` to pre-generate `.br` / `.gz` siblings. Cloudflare already brotli-compresses on the fly; the pre-generated files would be unused dead weight in `dist/` and would not change a single byte delivered to users.
- ❌ Adding `_headers`, `vercel.json`, or `netlify.toml`. Lovable hosting ignores these. They would be cargo-cult files that mislead future contributors into thinking they're effective.
- ❌ Adding `<meta http-equiv="Cache-Control">` to `index.html`. Modern browsers and CDNs ignore it. It would be theater.
- ❌ Touching `vite.config.ts`. The current `manualChunks` config is already correct for the long-cache strategy described in the doc.

## Acceptance

- `PERFORMANCE.md` exists at repo root, is accurate against what Cloudflare actually does, and reads in under two minutes.
- `README.md` has one new link to it.
- Zero changes to `src/`, `index.html`, `vite.config.ts`, `tailwind.config.ts`, `package.json`, or any runtime asset.
- No new dependencies.