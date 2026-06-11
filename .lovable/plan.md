# Services Hero — Editorial Upgrade (AboutHero parity)

## Intent

Bring `/services` up to the same cinematic, expensive register as `/about` by applying the exact AboutHero craft pass — photo backdrop with Ken Burns + scroll parallax, lit cream radial veil, filmic grain, monumental ghosted serif watermark with drawing hair-rule, refined corner hairlines, per-word H1 clip-reveal cascade, desktop-only cursor parallax, and a bottom meta strip with live evergreen dot + locator + scroll cue.

Same content, same single CTA, same brand rails — just a hero that finally matches the value of the work.

## Move: generalize, don't fork

Rename `AboutHero` → `EditorialHero` and reuse it on both `/about` and `/services` (and later `/work` and `/contact`). The component already accepts `headline`, `subhead`, `primaryCta`, `backdrop`, `watermark`, `locator` props — these are the only knobs needed per page. Forking would mean two copies of ~250 lines of identical motion logic to maintain.

### Why a rename instead of a copy

- Zero new motion code. Zero duplicated CSS.
- One source of truth for the upgrade pass — future tweaks ship to every editorial hero at once.
- Per-page voice still differentiates via watermark word + backdrop photo + locator string.

### What ships in this build

1. **`src/components/EditorialHero.tsx`** — renamed from `AboutHero.tsx` (`git mv` semantically; in practice: create new file, delete old). API and internals identical. CSS class names stay `about-hero*` for now (no churn in `index.css`); a follow-up can rename them. The component name is what callers see.

2. **`src/pages/About.tsx`** — import swap only: `AboutHero` → `EditorialHero`. No prop change.

3. **`src/pages/Services.tsx`** — replace the current `<SubPageHero …>` (which currently and incorrectly passes a `backdrop` prop to a type-only component) with:

   ```tsx
   <EditorialHero
     headline="Three services. One standard."
     subhead="Three focused services, held to the same hands-on standard."
     primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
     backdrop={photography.interiorDetailTrim}
     watermark="Services"
     locator="Foothills · Alberta"
   />
   ```

   `photography.interiorDetailTrim` is already imported and is the closest-cropped craft shot in the library — perfect tonal match for the cinematic treatment. The page composition below (3-service row list, PhotoBleed, BigCloseCTA) stays exactly as is.

4. **`src/index.css`** — no changes. All existing `.about-hero*` selectors keep working because we are not renaming them yet.

## Hard rails preserved

- Headline stays plain `text-foreground` — no italic-evergreen accent, no eyebrow above H1.
- Single primary CTA, "Get a Free Quote", solid evergreen, `rounded-lg`.
- Dark-on-cream palette.
- No folio, no Plate/Fig./Section No. chrome, no postal-code chips, no testimonials.
- Reduced-motion users get plain opacity fades (already handled).
- `SubPageHero` retired in usage for these two pages; it still exists for any other future caller, but `/about` and `/services` now use `EditorialHero`.

## Per-page voice (the only differences)

| Page         | Watermark word | Backdrop photo               | Locator              |
| ------------ | -------------- | ---------------------------- | -------------------- |
| `/about`     | `About`        | `photography.aboutOwnerCory` | `Foothills · Alberta` |
| `/services`  | `Services`     | `photography.interiorDetailTrim` | `Foothills · Alberta` |

Watermark word automatically sizes to fit its column via the existing `clamp(…)` rule — no per-page tuning needed. "Services" is one character shorter than "About" visually balanced, no overflow risk.

## Out of scope (explicitly not now)

- Work hero and Contact hero — separate turns. Contact especially needs care because its `/contact` desktop layout is the two-column split (cream cascade + dark form panel) per memory; it likely doesn't get `EditorialHero` at all on desktop.
- Renaming `.about-hero*` CSS selectors to `.editorial-hero*` — pure churn, do it once all four heroes have shipped.
- Touching `SubPageHero` itself — still in use elsewhere conceptually; leave the file alone.
- Adding a memory entry — composition rule ("editorial hero on /about and /services") will go in once Work + Contact land and the pattern is locked.

## Technical notes

- `EditorialHero` reuses `useReveal`, `Container`, the rAF cursor lerp, `prefers-reduced-motion` gate, and `pointer: fine` gate. Nothing new is imported.
- File move is a `code--write` of the new path + `rm` of the old; no tooling magic needed.
- No new dep, no new asset, no new CSS rule. One existing photo is now wired through one new prop slot on one existing page.
