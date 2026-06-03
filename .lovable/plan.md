
# Hero Design Prompts — One Per Page

Five hero briefs, written to be handed directly to design or implementation. Shared register first, then a per-page prompt. **This overrides the `SubPageHero is type-only` memory rule** — every page now gets a cinematic media hero. Memory will be updated when we build.

---

## Shared register (applies to all five)

**Stage.** Full-viewport: `min-h-[100svh] md:min-h-[100dvh]`, `overflow-hidden`, `bg-[#0a0a0a]` ground so any media gap reads as black, not cream. Nav stays transparent over it; the brand mark crossfades to cream via the existing `--nav-progress` system.

**Media layer.** A still photograph (or short looping mp4 where called for) covers the stage `object-cover` at `z-0`. Preload as `eager` + `fetchpriority="high"` only for the route's own hero. A subtle 18s `transform: scale(1) → scale(1.04)` Ken-Burns drift loops, paused for `prefers-reduced-motion`. Mobile gets a portrait crop variant via `<picture>` source so subjects never decapitate.

**Cinematic veil.** A single bottom-anchored linear gradient — `linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.30) 30%, transparent 60%)` — at `z-10`, never a flat overlay. No corner vignettes, no double-tint. Type sits at `z-20`.

**Type position.** Bottom-left, `flex flex-col justify-end`, with `container-x` gutters and `pb-[max(28px,calc(env(safe-area-inset-bottom)+20px))] md:pb-20`. Mobile pins headline to the bottom of the viewport so cards behind it rise as you scroll (Fly4Me Work-hero behavior).

**Headline.** `font-serif`, cream `text-background`, `wrap-editorial`, `leading-[0.95]`, `tracking-[-0.02em]`. Size token: a new `.t-display-cinematic` — `clamp(2.75rem, 8.5vw, 6.5rem)`. Render as 2–3 hard-broken lines with `<br>`; line breaks are part of the composition, not responsive accidents.

**Lede reveal (Apple/Fly4Me signature).** A `max-w-[44ch]` lede beneath the headline, hidden by default on hover-capable devices, auto-revealed on touch 900ms after headline lands. Anchor it with a `3.5rem` hairline rule (`bg-background/25`) that draws in from the left in 900ms via `scaleX(0 → 1)`. Each word resolves independently from `blur(6px) + translateY(14px) + opacity:0 + letter-spacing:0.08em` to crisp, on a 70ms cascade, 1200ms duration, `cubic-bezier(0.22, 1, 0.36, 1)`. Prefix/connective words land at `opacity:0.5`, the noun/verb at `opacity:1, font-style:italic` — the same trick Fly4Me uses to weight the meaning word. Reverse runs faster (520ms, reverse cascade 24ms) — releases must not linger.

**Primary CTA.** Single solid evergreen `.cta-spring` rounded-lg button — copy is **"Get a Free Quote"** site-wide except the home, which keeps "Get a Free Quote" and adds a quiet ghost text-link to `/work` (the Fly4Me "View our work" pattern, but text only, no second button). Sub-pages get the one CTA only. No arrow glyph, no icon chip.

**Intro choreography (home only).** A 1.2s cinematic veil dissolve on first visit (sessionStorage gated), with the headline reveal timed to land *as* the veil clears. Sub-pages skip it — they're already inside the experience.

**Bottom rail.** Desktop-only quiet line in `t-micro text-background/25 tracking-[0.18em]` — page-specific micro-copy (see each prompt). A vertical hairline scroll cue `w-px h-9 bg-background/20 hero-scroll-line` (slow-draw keyframe) sits bottom-center, desktop only.

**Reduced motion.** All cascades collapse to a single 200ms opacity fade. Ken-Burns and scroll cue freeze. Hover-gated lede auto-reveals.

---

## `/` — Home

**Photo.** The Bearspaw wraparound deck at golden hour — same `bearspaw-wraparound-deck` plate already in `galleryPlates`, full-bleed. (We already have the asset; the existing 16:10 plate becomes a full-viewport crop.)

**Headline.**
> One trusted contractor
> for the property
> you value.

**Lede (reveals on hover/scroll-in).**
> Hands-on *finishing*, repairs, and decks across rural Alberta.

— "finishing" is the italic-weighted word in the cascade.

**CTAs.** Solid evergreen `Get a Free Quote` + quiet ghost text-link `View recent work →` (scrolls to RecentWorkPreview). The ghost link uses `text-background/70 hover:text-background` 260ms color transition — never a second button.

**Reply note.** `t-micro` under the CTA row: `Replies within two business days.`

**Bottom rail.** *"Family-run · Foothills, AB · 2014–present"*

**Intro.** Plays the cinematic veil dissolve on first visit only.

---

## `/about` — About

**Photo.** A landscape-orientation shot of the property in mid-build — framed lumber, mountains on the horizon, golden-hour rim light. If unavailable, use the existing About photography as the placeholder.

**Headline.**
> We build like
> it's our own
> property.

**Lede.**
> One person plans the *work* and walks the finish with you.

— "work" italic, weighted.

**CTA.** `Get a Free Quote`.

**Bottom rail.** *"Cory Renwick · Founder · Foothills, AB"*

No intro veil. Headline lands 200ms after route fade.

---

## `/services` — Services

**Photo.** A close-crop, hands-on detail shot — a planed cedar edge, a fresh-stained deck board catching low sun, or a finishing-trim corner with the framing square still in frame. Tactile, not panoramic. Conveys "craft" before any service list appears.

**Headline.**
> Not a price list.
> The work
> you can trust.

**Lede.**
> Three things we do, done *carefully*, walked end to end.

— "carefully" italic, weighted.

**CTA.** `Get a Free Quote`.

**Bottom rail.** *"Decks · Renovations · Repairs"*

The detail crop trains the eye for the row-list services section below — the hero whispers "look closer."

---

## `/work` — Work

**Photo.** The single best project frame in the portfolio — a wraparound deck at last light with the Rockies cleanly on the horizon. This hero is the gallery's cover.

**Headline.**
> The work,
> in honest
> light.

**Lede.**
> Twelve recent projects across the *foothills* — finished, photographed, walked.

— "foothills" italic, weighted.

**CTA.** `Get a Free Quote`. (No ghost link — the grid itself is the secondary action; user scrolls.)

**Bottom rail.** Computed from data: `${projects.length} projects · 2019–present`. Mirrors Fly4Me's `12 projects · 2024–2026` move — specific, honest.

**Mobile behavior.** Headline pins to the bottom of `100svh` with the parallax-ref pattern from Fly4Me's Work header — 8px upward translate over scrollY 0–80, ref-based, single rAF.

---

## `/contact` — Contact

**Photo.** A still, calm dawn frame — empty driveway with the truck loaded for the day, or the workshop door open with morning mist on the field. Quiet, not heroic. The form is the page; the hero just sets the room.

**Headline.**
> Start with
> a phone call
> or a note.

**Lede.**
> Cory *replies* within two business days. No funnel, no callback bot.

— "replies" italic, weighted.

**CTA.** None. The form is the action — adding a CTA here would compete. Headline + lede + scroll cue only. The hero hands you down to the form.

**Bottom rail.** *"Foothills, AB · Mon–Fri, 7a–5p"*

**Mobile behavior.** Same bottom-anchored pin as Work — keyboard appearance must not jolt the hero since the form sits below the fold.

---

## Technical notes (for the build pass that follows approval)

- New utility class `.t-display-cinematic` in `index.css` — clamp size, line-height, tracking spec above.
- New utility `.hero-cinematic-stage` — encapsulates the `min-h-[100dvh]`, `bg-[#0a0a0a]`, `overflow-hidden`, z-layer structure.
- New utility `.hero-veil-cinematic` — the gradient veil exactly as specced (one rule, not three).
- New component `<CinematicHero>` taking `{ photoSrc, photoSrcMobile?, alt, headline (string[] of lines), ledeWords (array of {w, prefix, accent}), cta?, bottomRail }`. Replaces both `Hero.tsx` (home) and `SubPageHero.tsx` callers.
- Keep `SubPageHero.tsx` as a thin wrapper that forwards to `CinematicHero` so we don't have to touch every page call site at once.
- Five new hero photos required: `home-hero.jpg`, `about-hero.jpg`, `services-hero.jpg`, `work-hero.jpg`, `contact-hero.jpg` (plus mobile crops). Either generate via the project's existing asset pipeline or pull from current `galleryPlates` as placeholders for the first build pass.
- Memory update: rewrite the "SubPageHero is type-only" + "never pass `vignette`" + "Hero is a 12-col editorial split" rules to reflect the cinematic-hero standard.
- Out of scope: nav chrome, MenuOverlay, BigCloseCTA, forms, work grid, services rows, footer. Heroes only.
