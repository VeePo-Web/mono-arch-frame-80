## What you'll see

Quiet, full-width photo "bleeds" — a single atmospheric image stretched edge-to-edge, with the cream background dissolving softly into the top and bottom of the photo so it never feels like a hard banner. No headlines on the image, no CTAs, no overlays. Just a breath of photography between text sections, in the same minimal Fantasy.co register the site already uses.

The pattern is borrowed from Royal Mechanical's `PhotoMoment` — but stripped of the dark wash, the white headline, and the parallax. Ours is silent: photo + soft cream dissolves top and bottom. That's it.

## Where they land

**Home (`/`)** — One bleed between `RecentWorkPreview` and `BigCloseCTA`. Photo: `closingPrairie` (wide foothills light). Acts as a visual exhale between the work grid and the closing CTA.

**About (`/about`)** — One bleed between "How we work" and "Where we work". Photo: `aboutToolsBench` (tactile, hands-on register).

**Services (`/services`)** — One bleed between the services row list and `BigCloseCTA`. Photo: `deckingDetailEndgrain` (material detail).

**Work (`/work`)** — Skipped. The page is already nothing but full-bleed photography; adding another bleed would be redundant.

**Contact (`/contact`)** — Skipped. Desktop already has the photo-equivalent (dark evergreen panel + brand cascade); mobile already carries `closingPhotoMoment` in the SubPageHero.

## The component

New file: `src/components/PhotoBleed.tsx`. Type-only API:

```
<PhotoBleed src={photography.closingPrairie} alt="..." position="50% 60%" />
```

- Full-viewport-width via `w-screen relative left-1/2 -translate-x-1/2` (escapes any `Container`).
- Height: `min-h-[40svh] md:min-h-[55vh] lg:min-h-[60vh]` — present but never dominant.
- Cream-to-transparent dissolve at top and bottom (`h-16 md:h-24 lg:h-32`), same gradient idiom as Royal Mechanical's bleed but using `hsl(var(--background))` so it melts into our cream.
- `object-cover`, `loading="lazy"`, `decoding="async"`, no parallax, no overlay text, no caption, no CTA.
- Optional `aspectFocus` prop to bias `object-position` per photo.
- Honors `prefers-reduced-motion` — no transform animations to begin with, so this is automatic.

## What I will NOT change

- No new components beyond `PhotoBleed.tsx`.
- No new photography — uses existing files in `src/assets/photography/`.
- No copy changes, no headline edits, no CTA edits.
- No layout edits to Hero, SubPageHero, `RecentWorkPreview`, services row list, or About prose.
- No memory rule changes other than the one note below.

## Memory note (one rule update)

The core memory currently says: *"Home is exactly 3 sections: Hero → RecentWorkPreview → BigCloseCTA. Never re-add `ServicesGrid`, `HowItGoes`, or the area rail to `/`."*

This plan adds a 4th element to home — but it's a silent photo bleed, not a content section (no heading, no CTA, no list). I'll update the core rule to read: *"Home is exactly Hero → RecentWorkPreview → PhotoBleed → BigCloseCTA. The bleed is a silent photo only — never a content section with headings, CTAs, or lists. Never re-add ServicesGrid, HowItGoes, or the area rail to /."*

The retired `mem://features/home-cinematic-arc` file will be left as-is (already superseded by core).

## Files touched

- `src/components/PhotoBleed.tsx` — new
- `src/pages/Index.tsx` — add one `<PhotoBleed>` between work preview and CTA
- `src/pages/About.tsx` — add one `<PhotoBleed>` between the two `RevealSection`s
- `src/pages/Services.tsx` — add one `<PhotoBleed>` before `BigCloseCTA`
- `mem://index.md` — update the home-sections core rule (one line)
