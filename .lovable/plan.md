## Goal
Eliminate the third-party Google Fonts dependency, cut font bytes by subsetting to Latin-only, and remove the font-swap layout shift — without changing the visual design.

Expected impact:
- ~80–150 KB smaller first-load font payload
- ~150–300 ms faster first-text-paint on cold mobile (no third-party DNS/TLS hop)
- Near-zero CLS from font swap (size-adjust matches fallback metrics to web font)
- Zero outbound requests to fonts.googleapis.com / fonts.gstatic.com

---

## 1. Install self-hosted font packages

```
bun add @fontsource-variable/fraunces @fontsource/inter
```

- `@fontsource-variable/fraunces` ships a single variable woff2 covering all weights + italic axis — much smaller than 2 separate static files. We'll import only the `wght` axis (upright) and the italic file.
- `@fontsource/inter` ships per-weight files. We'll import only `400`, `500`, `600` (matching what's in `index.html` today).

Both packages auto-include only the `latin` and `latin-ext` subsets per file we import — Cyrillic/Greek/Vietnamese are skipped.

## 2. Wire imports in `src/main.tsx`

Replace the stylesheet-link strategy with explicit imports so Vite fingerprints, inlines `@font-face`, and serves the woff2 files from our origin:

```ts
// Fraunces — variable, latin only, upright + italic axes
import "@fontsource-variable/fraunces/latin.css";
import "@fontsource-variable/fraunces/latin-italic.css";

// Inter — only the 3 weights we actually use
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import "./index.css";
```

Each `.css` file is a tiny `@font-face` block pointing at the woff2 next to it; Vite resolves the URL and bundles it.

## 3. Remove all Google Fonts markup from `index.html`

Delete:
- `<link rel="preconnect" href="https://fonts.googleapis.com" />`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
- The `<link rel="preload" as="style" ... onload=...>` pointing at fonts.googleapis.com
- The `<noscript>` stylesheet fallback (the app already has a "please enable JS" notice in `<body>`)

Add **two `<link rel="preload">` entries** for the two above-the-fold woff2 files. We need to know their fingerprinted URLs at build time — Vite handles this via `import.meta.url` in a tiny inline strategy:

Since we can't know the hashed filenames in static `index.html`, we'll instead inject the preloads via a small module loaded at the top of `main.tsx` that creates `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the two critical files. The browser still picks them up early because main.tsx is the first parsed module.

Files to preload:
- Fraunces variable upright (latin) — used by hero headline
- Inter 500 (latin) — used by nav links and CTA

For the very first paint, Georgia and system-ui carry the fallback text — and step 4 makes that fallback visually identical.

## 4. Add size-adjust fallback metrics in `src/index.css`

At the very top of `index.css`, add two `@font-face` blocks that re-declare Georgia and system-ui under the names `'Fraunces Fallback'` and `'Inter Fallback'`, with `size-adjust`, `ascent-override`, `descent-override`, and `line-gap-override` tuned to match the real metrics:

```css
@font-face {
  font-family: 'Fraunces Fallback';
  src: local('Georgia');
  size-adjust: 105%;
  ascent-override: 92%;
  descent-override: 23%;
  line-gap-override: 0%;
}

@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

(Numbers are the published Fraunces/Inter fallback values from Vercel/Capsize calculators — they make Georgia and Arial occupy the same box as the web fonts.)

## 5. Update Tailwind font stacks in `tailwind.config.ts`

Insert the fallback families ahead of the system fallbacks so the browser uses them while the woff2 is downloading:

```ts
fontFamily: {
  sans: ["'Inter'", "'Inter Fallback'", "system-ui", "sans-serif"],
  serif: ["'Fraunces'", "'Fraunces Fallback'", "Georgia", "serif"],
},
```

Also update the raw `font-family: 'Fraunces', Georgia, serif` strings in `src/index.css` (≈14 lines) to `font-family: 'Fraunces', 'Fraunces Fallback', Georgia, serif`. Same for the Inter ones (≈4 lines). This is a find-and-replace.

## 6. Verification checklist (post-implementation)

- DevTools Network tab on `/` → no requests to `fonts.googleapis.com` or `fonts.gstatic.com`
- Network tab → fonts served from same origin with long-cache hashed filenames
- Lighthouse → "Eliminate render-blocking resources" no longer flags fonts
- Visual diff: hero headline, mobile nav italic links, CTA labels look identical
- CLS via Performance panel → text reflow on font-swap is invisible

## Files touched

- `package.json` (+ `bun.lock`) — add @fontsource packages
- `src/main.tsx` — font CSS imports + tiny preload-injector for 2 critical files
- `index.html` — remove Google Fonts preconnect/preload/noscript block
- `src/index.css` — add 2 fallback @font-face blocks at top, update ≈18 font-family strings
- `tailwind.config.ts` — add `'Fraunces Fallback'` and `'Inter Fallback'` to the stacks

No component logic changes. No design changes.