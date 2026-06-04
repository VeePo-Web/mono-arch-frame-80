# Cinematic hero backdrops + scroll cue

Add a full-viewport, heavily-blurred photo behind the type on every hero (home + 4 sub-pages), plus a subtle Fantasy.co-style scroll arrow at the bottom of each hero. Type, CTA, and layout stay exactly as they are — this is a pure atmosphere layer.

## What changes visually

1. **Blurred backdrop** — One absolutely-positioned `<img>` fills the full hero section (edge-to-edge, ignoring container padding), `object-cover`, with:
   - `filter: blur(48px) saturate(1.05)` (heavier than Fly4Me — they sit around 18-24px; we go ~48px so the photo reads as light/color/mood, never as a recognizable scene)
   - `transform: scale(1.15)` so the blur halo never shows hard edges
   - A cream-tinted overlay (`bg-background/72` + a soft top-to-bottom gradient `from-background/40 via-background/65 to-background`) so body text keeps AA contrast and the seam into the next cream section is invisible
   - 1400ms fade-in on mount, `prefers-reduced-motion` → instant
   - `aria-hidden`, `loading="eager"` only on Home (LCP), `loading="lazy"` on sub-pages, `decoding="async"`

2. **Hero photo picks** (reusing existing `photography` + `workPhotos` — no new assets):
   - Home (`Hero.tsx`) → keeps its right-column plate **and** gets the blurred backdrop using a different photo (`photography.closingPrairie`) so the backdrop and the plate don't duplicate.
   - About → `photography.areaFoothills`
   - Services → `photography.interiorDetailTrim`
   - Work → `photography.exteriorDetailSoffit`
   - Contact → `photography.closingPhotoMoment`
   - `SubPageHero` accepts a new optional `backdrop?: string` prop; each page passes its photo. If `backdrop` is omitted, no backdrop renders (safe fallback).

3. **Scroll cue** — A new tiny `<ScrollCue />` component pinned to the bottom-center of the hero section:
   - Thin 1px vertical evergreen rule (`h-10 w-px bg-foreground/30`) with a small chevron-down glyph (lucide `ChevronDown`, 14px, `text-foreground/50`) beneath it
   - Label "Scroll" in `.t-micro` above the rule (uppercase, tracked, `text-foreground/50`)
   - Gentle 2.4s infinite `translateY(0 → 6px → 0)` loop on the rule + chevron, paused under `prefers-reduced-motion`
   - Fades itself out once `scrollY > 80` (same threshold the nav already uses) via a one-line scroll listener, so it never lingers over content
   - `aria-hidden="true"`; purely decorative

## Files touched

- **`src/components/SubPageHero.tsx`** — add `backdrop?: string` prop, render the blurred `<img>` + overlay layer behind the `Container`, render `<ScrollCue />` at the bottom. Section becomes `relative overflow-hidden` and gets a `min-h-[88vh]` so the backdrop has real estate (current heroes are short — backdrop would feel cramped otherwise).
- **`src/components/Hero.tsx`** — same backdrop layer + `<ScrollCue />`; section gets `relative overflow-hidden` and `min-h-[92vh]` so the editorial split sits inside a true above-the-fold canvas. The existing 12-col type/photo split stays untouched on top.
- **`src/components/nav/ScrollCue.tsx`** (new) — the component above. ~40 lines.
- **`src/pages/About.tsx`**, **`Services.tsx`**, **`Work.tsx`**, **`Contact.tsx`** — pass `backdrop={photography.xxx}` into `<SubPageHero />`. No other changes.
- **`src/index.css`** — add one keyframe `@keyframes scroll-cue-bob { 0%,100% { transform: translateY(0)} 50% { transform: translateY(6px)} }` and a `.scroll-cue-bob` utility that uses it with `prefers-reduced-motion` guard.

## What stays the same

- All headlines, ledes, CTA, reveal cascade, nav bar, MenuOverlay, scroll-spy section anchors, BigCloseCTA, footer.
- Color tokens, typography classes, motion cadence (`ease-weighted`, 800ms reveal, 500ms hover).
- No new dependencies, no new fonts, no new colors.
- Memory rules: the "type-only sub-page heroes" rule still holds — the backdrop is a non-content atmosphere layer (like a tinted paper stock), not photography-as-hero. I'll update `mem://index.md` Core to note "sub-page heroes render a heavily-blurred photo backdrop (≥40px blur) behind the type — this is atmosphere, not imagery; the type remains the design."

## Out of scope

- Per-page custom blur amounts or parallax — single global treatment for consistency.
- Changing which photo each page uses later — easy follow-up by swapping the `backdrop` prop.
- Mobile-specific backdrop swaps (same photo, same blur — the cream overlay handles legibility at every size).
