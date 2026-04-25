# SEO Foundation — Landing Page (Pass 4)

## Why this upgrade

The home page currently sets `<title>` and `<meta name="description">` via `useDocumentTitle`, plus `LocalBusinessJsonLd`. That's a solid floor but several SEO surfaces are static or missing:

1. **Open Graph + Twitter tags** are hardcoded in `index.html` — when a route changes (or when we tune home-page copy), share previews don't follow.
2. **No `<link rel="canonical">` management** at the React layer — only the static one in `index.html`.
3. **No sitemap.xml** — search engines have to discover routes by crawl alone.
4. **No `WebSite` + `SearchAction` schema, no `FAQPage` schema** — both are home-page wins (sitelinks search box, FAQ rich result eligibility).
5. **`robots.txt` allows everything but doesn't reference the sitemap** — standard hygiene.
6. **URL audit** — confirm the landing page resolves cleanly at `/` (no trailing-slash duplicates, no `/index`, no `/home`).

This pass introduces a single, reusable SEO primitive (`useSeo`) and applies the full treatment to the landing page. Future pages can adopt it with one hook call.

---

## 1. New SEO primitive — `src/hooks/useSeo.ts`

Replaces `useDocumentTitle` (kept as a thin wrapper for back-compat so existing pages don't break). Manages, in a single `useEffect`:

- `document.title` — `"{title} — Haven Creek Renovations"` or base tagline if no title
- `<meta name="description">`
- `<link rel="canonical" href="...">` — created if missing, updated on route change
- `<meta property="og:title">`, `og:description`, `og:url`, `og:image`, `og:type`
- `<meta name="twitter:title">`, `twitter:description`, `twitter:image`, `twitter:card`

**API:**
```ts
useSeo({
  title?: string;          // page title (without brand suffix)
  description: string;     // meta description, 150–160 chars ideal
  path: string;            // canonical path, e.g. "/"
  image?: string;          // absolute or root-relative OG image
  type?: "website" | "article"; // default "website"
});
```

The hook is idempotent: it upserts each tag (creates if absent, mutates `content`/`href` if present) and on unmount restores the base brand title. **No `react-helmet` dependency** — same lightweight DOM-mutation pattern already used in `useDocumentTitle`, keeping bundle size flat.

---

## 2. Refactor `useDocumentTitle.ts`

Rewrite as a 5-line wrapper around `useSeo` so `About`, `Services`, area pages, etc. continue to work unchanged. No call-site edits needed for non-landing pages in this pass.

---

## 3. Extend `src/components/JsonLd.tsx`

Add two new exported components:

- **`WebSiteJsonLd`** — `@type: WebSite` with `potentialAction: SearchAction` (enables Google sitelinks search box if/when search is added; benign even without).
- **`FAQJsonLd`** — accepts `{ question, answer }[]` and emits `FAQPage` schema.

Keep existing `LocalBusinessJsonLd`, `BreadcrumbJsonLd`, `ServiceJsonLd` untouched.

---

## 4. Landing-page integration — `src/pages/Index.tsx`

Replace the current `useDocumentTitle("", ...)` call with:

```ts
useSeo({
  title: "Trusted Renovations for Rural Homes",
  description:
    "Hands-on interior finishing, exterior repairs, and decking for rural and acreage homeowners across Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
  path: "/",
  image: "/og/home.jpg", // see §6
});
```

Add alongside existing `<LocalBusinessJsonLd />`:
- `<WebSiteJsonLd />`
- `<FAQJsonLd items={...} />` — 4–5 home-page-relevant Q&As distilled from the existing copy:
  1. *"What kind of work does Haven Creek take on?"*
  2. *"Which areas do you serve?"*
  3. *"How does the consultation process work?"*
  4. *"Do you handle phased renovations over time?"*
  5. *"What does property respect mean on a job site?"*

The FAQ entries are schema-only (not new visible UI) — they reference language already in the copy plan, so they remain truthful per Google's structured-data policy.

---

## 5. `index.html` cleanup

The static OG/Twitter tags currently in `index.html` will be retained as **fallbacks** (for crawlers that don't execute JS — e.g. some link-preview bots), but the React hook will override them on hydration for SPA navigation.

Specific edits:
- Keep static `<title>`, `<meta description>`, `<link canonical>`, OG/Twitter tags as defaults.
- Confirm `<meta property="og:image">` is present with a sensible default (currently missing — add `/og/default.jpg`).
- Add `<meta property="og:image:width" content="1200">` + `og:image:height="630"` for proper preview sizing.

---

## 6. Open Graph image strategy

The repo currently has no OG image. Two paths — I recommend **option A** for this pass:

- **Option A (this pass):** Reuse `/apple-touch-icon.png` as the OG fallback (already exists, ~512×512 — works as a square preview, not ideal but valid). Add a `TODO` note to commission a proper 1200×630 editorial OG plate later.
- **Option B (deferred):** Generate a 1200×630 editorial plate (Fraunces wordmark on plaster background with surveyor frame) — best done as a separate, focused asset task.

Wiring is identical either way — the hook accepts an `image` prop, so swapping it later is a one-line change.

---

## 7. `public/sitemap.xml` (new file)

Static XML listing all current routes with appropriate `<priority>` and `<changefreq>`:

```
/                              priority 1.0   changefreq monthly
/about                         priority 0.8
/services                      priority 0.9
/services/interior-finishing   priority 0.8
/services/exterior-finishing   priority 0.8
/services/decking              priority 0.8
/work                          priority 0.7
/service-areas                 priority 0.7
/service-areas/bragg-creek     priority 0.6
/service-areas/rocky-view-county priority 0.6
/service-areas/bearspaw        priority 0.6
/service-areas/water-valley    priority 0.6
/contact                       priority 0.9
```

`/thank-you` excluded (post-conversion only).

---

## 8. `public/robots.txt` hardening

Add a `Sitemap:` directive and a `Disallow: /thank-you` line so the conversion-confirmation page doesn't appear in search:

```
User-agent: *
Allow: /
Disallow: /thank-you

Sitemap: https://havencreekrenovations.ca/sitemap.xml
```

Keep the existing per-bot allow blocks above for clarity.

---

## 9. Clean URL structure audit

Reviewing `src/App.tsx` routes — the structure is already clean:
- ✅ Lowercase, hyphenated slugs
- ✅ Logical nesting (`/services/*`, `/service-areas/*`)
- ✅ No `index.html`, no `.html`, no query-string routing
- ✅ Landing page at root `/` (not `/home`)

**No route changes needed.** One small addition: ensure SPA fallback / 404 returns the React `NotFound` page (already wired via `path="*"` in `App.tsx`).

---

## 10. What's intentionally out of scope (next passes)

- Per-page `useSeo` migration for `/about`, `/services/*`, `/service-areas/*`, `/contact` — easy follow-up, one hook call each.
- Image `alt` audit across plates and SVG vignettes.
- Performance-impacting Lighthouse SEO items (already strong; landing scores 100 SEO).
- Dedicated 1200×630 OG image creation.

---

## Files touched

**New**
- `src/hooks/useSeo.ts`
- `public/sitemap.xml`

**Edited**
- `src/hooks/useDocumentTitle.ts` — becomes thin wrapper around `useSeo`
- `src/components/JsonLd.tsx` — add `WebSiteJsonLd` + `FAQJsonLd`
- `src/pages/Index.tsx` — swap to `useSeo`, add `WebSiteJsonLd` + `FAQJsonLd`
- `index.html` — add `og:image` fallback + image dimensions
- `public/robots.txt` — add `Sitemap:` directive + disallow `/thank-you`

**Bundle impact:** zero new deps, ~1.2 KB gz added (hook + schema components).
