## Goal

Lift the `/about` hero from "type on a soft photo wash" to a quietly cinematic editorial frame — Fantasy.co's restraint (almost nothing on screen, every pixel intentional) crossed with Hickory & Rose's parallax photo hero (depth, ghosted watermark, anchored corner chrome). Keep the brand promise of dark-on-cream restraint — the current hero is *good*, this just makes it feel more **expensive**.

The change is scoped strictly to the About hero. Header, body sections, About areas rail, BigCloseCTA — untouched.

## Design references — what we're borrowing

- **Fantasy.co** — extreme typographic restraint, monumental negative space, near-imperceptible chrome, slow blur-to-sharp reveals. Lesson: *less, but every element calibrated*.
- **Hickory & Rose `/about`** — full-bleed photo at 60-70vh with subtle Ken Burns parallax, oversized ghosted page-name watermark (~3% opacity) behind the H1, hairline gold frame inset, refined credential micro-strip at the bottom, scroll cue. Lesson: *photo as atmosphere with depth, watermark for scale, hairline for craft*.
- **Lashes by Halle About** — left-type / right-portrait split with a tinted plate behind the photo. We're **not** copying this split — single-column type-only is on-brand. The lesson taken: warm portrait-grade photography belongs near the type, not exiled below the fold.

## Hard brand rails (these do NOT change)

From `mem://index`:
- No eyebrow line above the H1 ("Family-run · Foothills, AB" stays banned).
- No `accentWord` italic-evergreen / no SVG underline / no folio numerals / no "Plate N" / "Edition" / "Fig." chrome.
- Single primary CTA "Get a Free Quote" — no secondary, no ghost pair.
- Dark-on-cream palette. No dark `evergreen-deep` slab on this page.
- Headline stays plain `text-foreground` in `.t-headline`.
- "Two business days" reply promise is **not** on About — don't leak it in.
- One motion cadence (800ms reveal, `ease-weighted`).

## What gets built

A new dedicated `AboutHero` component (so `SubPageHero` stays untouched for Services + Work + Contact). About swaps `<SubPageHero …/>` for `<AboutHero />`. The component does five things, in this order of priority:

### 1. Photograph promoted from wash → cinematic layer

The current `backdrop={photography.areaFoothills}` photo is blurred 48px and almost erased by a 70%-opacity cream veil. New treatment:

- Blur drops to **16-20px** (still atmosphere, no longer a smudge — you can read "foothills at dusk" now).
- Veil is a **two-stop directional gradient**: cream at top (`background/85`), almost-transparent through the middle band where there's no type (`background/25`), back to full cream at the bottom (`background`). The photo only "shows itself" in the breathing-room between H1 and CTA. Cream palette still owns the page.
- Slow **Ken Burns drift** — `scale(1.08) → scale(1.14)` over 22s, `translate(0,0) → translate(-1.2%, -0.8%)`, infinite alternate. Pure transform, GPU-cheap. Disabled under `prefers-reduced-motion`.
- A **2-3% radial vignette** (cream → transparent → cream/15) anchored to the H1's optical center so the type sits in its own pool of light.

### 2. Ghosted serif watermark — depth, scale, swagger

A monumental `font-serif` "About" set behind the H1, **`leading-[0.85]`, `tracking-[-0.04em]`, `clamp(12rem, 26vw, 26rem)`**, color `foreground/[0.035]` (just barely there — like H&R's `text-white/3` but inverted for cream). Anchored bottom-left of the hero so its baseline runs *below* the H1 baseline and one giant "A" peeks behind the first word. Parallax: translates at **0.6× scroll** while the photo translates at **0.3× scroll** — depth without flash.

This is the single biggest "expensive" lever: it's what gives Fantasy.co + H&R their monumentality.

### 3. Corner hairlines — quiet anchoring chrome

Two L-shaped hairlines (16px × 16px, 1px `foreground/12`) anchored top-left and bottom-right of the hero's content frame (inset 24px / md:40px / lg:64px). Not a closed box, not a "Plate" frame — just two whispers of structure. Fades in at 0ms with the section, before the type. This is the H&R `GoldFrame` move, dialed *way* down to stay within the no-editorial-cosplay rule.

### 4. Type cascade — slower, more confident

Hero height bumps from `min-h-[88vh]` → **`min-h-[92vh]`** with `flex flex-col justify-center`. Cascade timing:

| Element                        | Delay  | Move                                         |
| ------------------------------ | ------ | -------------------------------------------- |
| Corner hairlines (scaleX 0→1)  | 0ms    | 800ms, `ease-weighted`                       |
| Watermark (opacity + 12px up)  | 200ms  | 1200ms blur-to-sharp `blur(8px)→blur(0)`    |
| H1 (`.t-headline`)             | 360ms  | existing 800ms `data-reveal` cadence         |
| Subhead (`.t-lede`)            | 540ms  | same                                         |
| Primary CTA                    | 720ms  | same + `.cta-spring`                         |
| Bottom meta strip + scroll cue | 900ms  | opacity only, 600ms                          |

Slightly slower than current (which fires everything in 120-360ms band) — the *unhurried* cadence is what reads as luxury.

### 5. Bottom meta strip — single quiet hairline

Pinned to the bottom of the hero, inside the content frame. One row, hairline above (1px `foreground/12`):

```
FOOTHILLS · ALBERTA                              [scroll cue ↓]
```

- Left: `.t-eyebrow` (uppercase, tracked, `foreground/55`) — places the studio without claiming an eyebrow above the H1. Locator-as-footnote, not as label.
- Right: existing `<ScrollCue />`, repositioned from absolute-center to inside this strip.

No "Two business days," no "Family-run," no postal codes, no per-page folio.

## Implementation sketch

### Files

- **`src/components/AboutHero.tsx`** *(new)* — self-contained. Props: `headline`, `subhead`, `primaryCta`, `backdrop`, `watermark` (default `"About"`). Uses a single rAF scroll handler for parallax (no `framer-motion` dependency — keeps bundle flat; we already do this for `--nav-progress` in `Navigation.tsx`).
- **`src/pages/About.tsx`** — replace `<SubPageHero …/>` with `<AboutHero headline=… subhead=… primaryCta=… backdrop={photography.areaFoothills} />`. Headline copy unchanged.
- **`src/index.css`** — add `.about-hero-*` utilities scoped to this component:
  - `.about-hero-veil` — three-stop directional gradient described above.
  - `.about-hero-burns` — 22s Ken Burns keyframes + `prefers-reduced-motion` kill switch.
  - `.about-hero-watermark` — base styling (the parallax translate is set inline via `--scroll-y`, written by the rAF handler).
  - `.about-hero-corner` — L-shaped pseudo-element trick (`::before` horizontal rule + `::after` vertical rule).
- **`src/components/SubPageHero.tsx`** — untouched. Services, Work, Contact heroes stay exactly as they are.

### Performance

- Backdrop `<img>` stays `loading="lazy" decoding="async"` (it's offscreen as LCP — type is LCP).
- All parallax via `transform` on a `will-change: transform` layer, single rAF tick, throttled with the existing scroll handler pattern from `Navigation.tsx`.
- No new dependencies.

### Accessibility

- Watermark is `aria-hidden`, `pointer-events-none`, `select-none`.
- Photo `<img>` has empty `alt=""` (decorative atmosphere).
- Reduced motion: Ken Burns off, parallax off, blur reveal collapses to plain opacity fade.

## Out of scope

- Other sub-page heroes (Services, Work, Contact) — explicitly not touched.
- About body sections (`How we work`, `Where we work` rail) — untouched.
- Header / footer / BigCloseCTA — untouched.
- Copy changes — none. Same headline, same subhead, same CTA label.
- New photography — re-uses the existing `photography.areaFoothills` already wired in.

## Visual gut-check (what the user will see)

Land on `/about` — for a beat, you see two near-invisible corner hairlines and a giant ghosted "About" feathering in from below. The foothills photo settles into the middle band with a slow, almost imperceptible drift. The H1 unblurs into focus a half-second later. The subhead and CTA cascade in unhurriedly. A single hairline anchors the bottom with "FOOTHILLS · ALBERTA" and the scroll cue. As you scroll, the photo drifts up slower than the page, the watermark drifts faster — parallax depth without a single library.

The page feels like the cover of a quiet, well-art-directed magazine. Same content, same restraint — just *staged*.
