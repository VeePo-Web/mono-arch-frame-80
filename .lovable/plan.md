# Contact Hero — Editorial Craft, Friction-Free

## Frame the problem
Contact is the conversion page. The form is the page. Anything that pushes the form below the fold, adds a CTA that competes with Send, or layers a heavy photo backdrop = lost leads.

The editorial pass we shipped on `/about`, `/services`, `/work` is a *full-bleed photo hero* — exactly the wrong move here. So we don't copy it literally. We copy its **craft grammar** (ghosted serif watermark, corner hairlines, per-word H1 cascade, meta strip with live evergreen dot) and apply it to the existing Contact surfaces *without moving the form an inch*.

Form stays where it is. Field count stays at 3. Mobile sticky Send stays. Desktop right-column form panel stays pinned. We're only dressing the type column.

## Two scoped moves, zero new components

### 1. Desktop left column — luxury cascade
Edit `src/components/contact/ContactBrandStack.tsx`. Keep the existing brand mark → wordmark → tagline → direct rail structure, but layer the same craft chrome the EditorialHero uses, reusing the `.about-hero__*` CSS that already exists:

- **Ghosted serif "Contact" watermark** — `<span class="about-hero__watermark">Contact</span>` positioned above the brand mark, with the drawing hair-rule animation. Same multiply-blended `hsl(foreground / 0.06)` color, same `clamp()` size. It anchors the column with weight without adding a single new pixel of UI noise.
- **Corner hairlines** — `<span class="about-hero__corner about-hero__corner--tl">` + `--br`, scoped to the brand stack container (not the whole section, so they don't fight the dark form panel on the right). Anchors the column edges.
- **Live meta strip at the bottom of the column** — replace the current `STUDIO_LOCATION` row's plain text with the same `.about-hero__live-dot` pulsing evergreen dot + "Foothills · Alberta" eyebrow used on /about. Quiet "the studio is real, the reply is real" cue — proven conversion lift on contact pages.
- **Per-word reveal on the tagline** — wrap "Trusted renovations for rural Alberta." in the same `.about-hero__line` / `.about-hero__line-inner` clip-cascade markup the EditorialHero uses on its H1. Reuses existing keyframes and `--word-delay` stagger. No new CSS.

Container needs `position: relative` and `overflow: hidden` so the corner hairlines and watermark stay inside the column. The existing `contact-cascade-item` fade-in stays — we're layering on top, not replacing.

**No photo backdrop on desktop.** The dark `evergreen-deep` form panel on the right is already the visual anchor; a photo on the left would create two competing focal points. The watermark + corner hairlines + cascade gives the same "expensive" register without the visual weight.

### 2. Mobile header — same craft, no extra bytes above the form
Edit the `lg:hidden` section in `src/pages/Contact.tsx` (lines 89-100). The current eyebrow + H1 stays — we just add:

- **Ghosted "Contact" watermark** behind the H1 (`.about-hero__watermark` positioned absolute, smaller `clamp()` per existing rule — already scales to viewport).
- **Per-word H1 clip-cascade** — same split-and-wrap pattern the EditorialHero uses on its H1, applied to "Tell us about your project." Adds the cinematic rise without one extra pixel of vertical space.
- **One quiet hair-rule meta row** between H1 and form — `.about-hero__live-dot` + "Foothills · Alberta · replies in 2 business days" in `.t-eyebrow text-foreground/55`. Replaces the standalone "Get in touch · Replies in 2 business days" eyebrow above the H1 (consolidates the reply-promise into one place per memory rule about the "two business days" line).

**No corner brackets on mobile** — they'd crowd the viewport edges with the form right below.
**No backdrop photo on mobile** — would push form below the fold.
**No min-h-[92vh]** — current top section keeps its `pt-6 pb-2` so the form is still one short scroll away. Friction stays at zero.

Form, sticky Send, and the direct-contact rail below stay byte-identical.

## What we are explicitly NOT doing
- No swap to `<EditorialHero>` on Contact (its `min-h-[92vh]` + photo backdrop would tank conversion).
- No new CTA in the hero region — the form *is* the CTA. Header Quote CTA + mobile sticky Send already cover the redundant-CTA need.
- No field count changes, no new optional fields, no progressive disclosure. Three-field rule holds.
- No dark backdrop on desktop left column. The form panel owns the dark surface; we keep the brand cascade cream.
- No memory entry yet — wait until this lands and reads right in preview.

## Technical notes
- All new visual chrome reuses existing `.about-hero__watermark`, `.about-hero__corner`, `.about-hero__live-dot`, `.about-hero__line`, `.about-hero__line-inner` selectors from `src/index.css`. Zero new CSS.
- Two files edited: `src/components/contact/ContactBrandStack.tsx` (desktop) and `src/pages/Contact.tsx` (mobile only — desktop section in this file is untouched aside from being driven by ContactBrandStack).
- No new imports beyond what each file already pulls in.
- Reduced-motion already handled by the existing `.about-hero__*` rules in `src/index.css`.
