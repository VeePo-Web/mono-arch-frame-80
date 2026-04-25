# Performance: hosting, compression, and caching

This document explains what is and isn't configurable from this repo when it
comes to network-level performance (compression, cache headers, edge behavior).
Read this before adding `_headers`, `vercel.json`, `vite-plugin-compression`,
or anything similar — most of those are no-ops on Lovable's hosting.

## Compression — already on, handled at the edge

Lovable's static hosting is fronted by **Cloudflare** (verified via
`server: cloudflare` and `cf-ray: …` response headers).

Cloudflare automatically negotiates **Brotli** or **gzip** per request based
on the client's `Accept-Encoding` header, for all standard text MIME types:

- `text/html`
- `application/javascript`
- `text/css`
- `image/svg+xml`
- `application/json`
- `application/manifest+json`

This happens at the edge with no configuration in this repo. There is no
toggle, no plugin, and no `Content-Encoding` header you can set from
application code that will improve on it.

**Woff2 fonts are intentionally served uncompressed.** Woff2 is already a
compressed container format — re-compressing it wastes CPU and gains
zero bytes. Same applies to AVIF, WebP, and other modern image formats.

## Long-term caching — handled by content hashing

Vite emits content-hashed filenames in `dist/assets/*` (e.g. `index-aB3xK9.js`,
`Hero-7fE0qP.css`). The hash changes only when the file's bytes change, which
makes it safe to cache these assets aggressively forever.

Lovable's hosting serves hashed assets with:

```
Cache-Control: public, max-age=31536000, immutable
```

…and serves `index.html` with a short cache so users always pick up new
deploys immediately. This is the standard hashed-asset pattern (the same
one Vercel, Netlify, and Cloudflare Pages all use) and **requires no
configuration in this repo**.

The `vite.config.ts` `manualChunks` split (`react-vendor`, `query-vendor`)
is what lets returning visitors keep those chunks in their browser cache
across most deploys, since those filenames only change when the underlying
library versions change.

## What this repo does NOT control

These knobs simply do not exist for Lovable-hosted projects today:

- Per-route `Cache-Control` overrides
- Custom MIME compression rules
- Edge cache TTL
- `Vary` header tuning
- Custom security headers (CSP, COOP, COEP)
- Origin response headers in general

If any of these become hard requirements, they need hosting-level
configuration that Lovable does not currently expose to user repos.
Files like `_headers`, `_redirects`, `vercel.json`, and `netlify.toml`
will be ignored at deploy time — do not add them; they mislead future
contributors into thinking they're effective.

## How to verify on a published deploy

The preview URL is auth-gated and won't show you accurate asset headers.
After publishing, run this against your production URL to confirm
compression and caching are healthy:

```sh
URL="https://your-project.lovable.app"  # or your custom domain

echo "=== HTML (should be short cache, brotli or gzip) ==="
curl -sI -H "Accept-Encoding: br, gzip" "$URL/" \
  | grep -iE "content-encoding|cache-control|content-type|etag|age"

ASSET=$(curl -s "$URL/" | grep -oE '/assets/[^"]+\.js' | head -1)
echo
echo "=== Hashed JS asset ($ASSET) ==="
echo "    expect: content-encoding: br | cache-control: …max-age=31536000…immutable"
curl -sI -H "Accept-Encoding: br, gzip" "$URL$ASSET" \
  | grep -iE "content-encoding|cache-control|content-type|etag|age"

CSS=$(curl -s "$URL/" | grep -oE '/assets/[^"]+\.css' | head -1)
echo
echo "=== Hashed CSS asset ($CSS) ==="
curl -sI -H "Accept-Encoding: br, gzip" "$URL$CSS" \
  | grep -iE "content-encoding|cache-control|content-type|etag|age"

FONT=$(curl -s "$URL$CSS" | grep -oE 'https?://[^)]+\.woff2|/[^)]+\.woff2' | head -1)
echo
echo "=== Woff2 font ($FONT) ==="
echo "    expect: NO content-encoding | long cache-control"
curl -sI -H "Accept-Encoding: br, gzip" "${FONT/#\//$URL/}" \
  | grep -iE "content-encoding|cache-control|content-type|etag|age"
```

What to look for:

| Asset       | `content-encoding` | `cache-control`                            |
|-------------|--------------------|--------------------------------------------|
| `/`         | `br` or `gzip`     | short max-age (so deploys propagate)       |
| hashed JS   | `br` or `gzip`     | `public, max-age=31536000, immutable`      |
| hashed CSS  | `br` or `gzip`     | `public, max-age=31536000, immutable`      |
| woff2 font  | (none)             | long max-age, immutable                    |

If any of those are wrong on the live URL, that's a hosting-level issue —
contact Lovable support; it cannot be fixed from this repo.

## Where the real performance levers are in this repo

Network-level performance is already handled. The bytes that actually move
the needle live in application code:

- **Bundle code-splitting** — route-level `lazy()` + `Suspense` so each page
  loads only its own code. (`vite.config.ts` already splits the React and
  React Query vendors into long-cached chunks.)
- **Responsive images** — `<picture>` with AVIF/WebP sources, `srcset`,
  `sizes`, and `loading="lazy"` on below-the-fold imagery.
- **Self-hosted fonts** — already done. Fraunces (variable, latin) and
  Inter (400/500/600 latin) are bundled by Vite from `@fontsource`,
  served same-origin with content-hashed filenames. See `src/main.tsx`
  and the `*Fallback` `@font-face` blocks in `src/index.css` (those use
  `size-adjust` to eliminate font-swap CLS).
- **Below-the-fold lazy mounting** — `useReveal` + `content-visibility: auto`
  on long pages so off-screen sections don't pay layout/paint cost upfront.

Spend optimization effort there, not on edge-level concerns.
