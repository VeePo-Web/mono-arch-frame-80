# Pass 3 — Bespoke Fantasy.co Editorial Upgrade

The current site is clean, performant, and on-brand. What it still lacks — measured against Fantasy.co's own production work for clients like the Met, USA Today, and Balenciaga — is **chapter rhythm**, **kinetic restraint inside otherwise still compositions**, and **editorial marginalia**: the small typographic gestures that signal a master's hand. This pass adds those without adding weight.

**Performance budget:** JS ≤ 95 KB gz, CSS ≤ 14 KB gz, no new fonts, no new dependencies. All motion CSS-only or via the existing `useReveal` IntersectionObserver.

---

## A. Diagnosis — what the page still tells the eye

After auditing `Index.tsx`, `Hero.tsx`, `Navigation.tsx`, `Footer.tsx`, and `index.css` against Fantasy.co's editorial vocabulary:

1. **Hero proof panel is static.** Beautifully composed, but once revealed it stops moving. Fantasy panels almost always have one quiet kinetic element — a slow drift, a scroll-coupled parallax, a generative tick.
2. **No chapter spine.** Sections I–VI exist as eyebrows but nothing visually threads them. A great editorial site (NYT Magazine, RIBA Journal, Pentagram case studies) carries a persistent margin device.
3. **Monochromatic temperature.** The whole page sits at one warmth. Fantasy work uses a *thermal arc* — Hero cool/dawn → mid-page neutral → Final CTA warm/dusk. The deep-evergreen close hints at it but isn't earned by gradient continuity.
4. **Headlines don't breathe.** Once revealed, they're static stone. A 2–4 px scroll-coupled translate gives them living weight.
5. **No marginalia.** Fantasy, Pentagram, and Collins all use side-margin ticks — running headers, tiny coordinates, page numbers — that say "this was set, not generated."
6. **Figure captions are present but flat.** Project plates have a number but no source-line, no measurement, no figure footnote.
7. **Footer is competent but not a colophon.** Pentagram footers feel like the back-cover of a monograph. Ours feels like a sitemap.
8. **Final CTA skyline is symbolic but unattached** — it ought to *connect* to the Hero (ridge → ridge), closing the visual loop.

---

## B. The eight upgrades

### 1. Editorial Chapter Spine (left margin device)

A persistent 1px hairline runs down the left margin of the entire page (only on `lg:` and up), inset 32px from the viewport edge. At each section transition it carries:

- a tiny serif italic chapter mark (`I.`, `II.`, …) hung from the spine
- a 6px evergreen tick at the section's vertical midpoint
- an ultra-light running header sideways: `HAVEN CREEK / HOME` (writing-mode: vertical-rl, 9px, 0.3em tracking)

The spine is purely decorative, `aria-hidden`, and `position: fixed` so it doesn't reflow. Cost: ~50 LOC CSS, 0 JS.

**Why it works:** It's the single most recognizable Fantasy/Pentagram move on a long-scroll editorial page. It tells the eye "you are reading a publication, not a website."

### 2. Hero Proof Panel — Kinetic Tick (a "Generative" calmness)

Inside the Double-Bezel proof panel on the Hero's right column, add three quiet life-signs:

- **Vertical creek line ticks slowly** — three tiny serifed measurement marks fade in/out on a 7s loop, suggesting a water-level or surveyor's rod.
- **Hand-drawn vignette breathes** — the SVG vignette gets a 12s `transform: scale(1) ↔ scale(1.008)` ease-in-out infinite. Imperceptible per-frame; cumulative effect is *alive*.
- **Service rows have a 1px dotted leader** between title and arrow chip — drawn as `border-bottom: 1px dotted hsl(var(--evergreen)/0.2)` on hover via `group-hover` on each row, evoking a table-of-contents.

Each is `prefers-reduced-motion` aware.

### 3. Scroll-Coupled Headline Drift (cinematic stillness)

Hero `<h1>` and each section `<h2>` get a `data-drift` attribute. A single `IntersectionObserver` (reused from `useReveal`) toggles a CSS variable `--drift` from `0` to `-4px` as the headline crosses the viewport. The transform is `translateY(var(--drift))` with a 1200ms ease-out.

The effect: headlines settle into place over a long beat instead of snapping. ~30 LOC, no scroll listener, no `requestAnimationFrame`.

### 4. Marginalia — Coordinates & Figure Footnotes

Three new typographic patterns added to the design system, then sprinkled judiciously:

- **Section coordinates** — top-right of each section heading row: `51.0252°N · 114.6314°W` for Bragg Creek-area sections, `Lat. 51° / Long. -114°` rendered in 9px tabular-nums Inter with `0.18em` letter-spacing. (Real Bragg Creek coordinates — embedded brand truth.)
- **Figure footnotes** — Project Gallery cards get a hairline footer rule with a tiny `Fig. i — Bearspaw, 2024 · Interior` line. Replaces the current bare metadata.
- **Page slug** in the very top-right of the viewport (fixed): `Page 01 / Home`. Updates per route via context. Cost: 1 React context, 8 LOC.

### 5. Thermal Arc — Dawn → Dusk Gradient Underlay

A single `body::after` fixed full-viewport gradient layer, opacity 0.06, sits between the plaster grain and the content:

```
linear-gradient(180deg,
  hsl(210 20% 85% / 0.4)  0%,    /* dawn cool */
  hsl(36 25% 97% / 0)     35%,
  hsl(36 25% 97% / 0)     65%,
  hsl(25 30% 85% / 0.5)   100%   /* dusk warm */
)
```

Plus a section-scoped variant: the Hero gets a faint cool wash, the Final CTA's existing radial gets pulled warmer (add a 25° hue-shift band at the top edge). The page now *travels* tonally from morning to evening.

### 6. Approach Section — Surveyor's Diagram

Upgrade the existing path-line to a true surveyor's-drawing aesthetic:

- The vertical path-line becomes **dashed** (3px on, 4px off) with the dash itself drawing top→bottom (already animated via `data-line-draw` — extend with `stroke-dasharray` animation on the SVG conversion).
- Each numeral disc gets two small horizontal tick marks at 12 o'clock and 6 o'clock, like a surveyor's transit point.
- A faint corner-bracket frame `⌐ ⌐` wraps the entire ordered list at 8px from each corner, drawn with 4 SVG line corners, `evergreen/0.25`.

Reads as field-notes, not slideware.

### 7. Footer → Editorial Colophon

Replace the current 3-block footer with a true colophon:

- **Top band:** A 1px rule across the full width, then the brand mark centered, then beneath it in 11px Fraunces italic: `Set in Fraunces & Inter. Composed in Calgary, Alberta. MMXXV.`
- **Three editorial blocks** (Services / Areas / Talk it through) — keep, but tighten typography to 13px and add a `numeral-mark` running header above each (`§ I`, `§ II`, `§ III`).
- **Sign-off line:** `Built locally. Finished personally.` — keep, but render it as oversized Fraunces italic (clamp 2rem→3rem) centered, with a hand-drawn underline SVG echoing the Hero's "Trusted" underline. Visual loop closure.
- **Fine print row** with the year, but add: `No. 001 — First Edition.` (positions the company as a craft house releasing editions, not a contractor running campaigns).
- **Lifted skyline silhouette** — copy the Final CTA's skyline SVG into the footer at 30px height, opacity 0.12, anchored to the footer's top edge. The same ridge that closes the CTA opens the colophon. The page is now a closed loop.

### 8. Navigation — Tightened to Floating Capsule with Index Mode

Two refinements to the existing glass island:

- **Brand mark gets a meridian dot.** When `scrolled` is true, a 3px evergreen dot appears to the left of the logo mark, like a publication's chapter dot. Subtle and editorial.
- **"Index" hover affordance.** Add a tiny vertical-text `INDEX ↗` at the right of the menu (between the last link and the CTA) that, on click, opens a *full-page editorial sitemap overlay* — already mostly built (mobile menu) but styled as a printed contents page: numbered chapters, hand-drawn underlines, all routes listed with tiny abstracts. Desktop-only addition, ~80 LOC, JS already exists.

---

## C. Files touched

| File | Change |
|---|---|
| `src/index.css` | + chapter spine, marginalia, thermal arc layer, dotted leaders, surveyor brackets, colophon utilities (~140 LOC added) |
| `src/components/Hero.tsx` | + kinetic ticks on creek line, breathing vignette, dotted leaders on service rows |
| `src/pages/Index.tsx` | + section coordinates per section, `data-drift` on headlines, surveyor brackets on Approach |
| `src/components/Navigation.tsx` | + meridian dot when scrolled, optional "Index ↗" desktop link |
| `src/components/Footer.tsx` | rewrite as colophon (top mark + composition note, oversized italic sign-off, ridge silhouette echo) |
| `src/components/PageSlug.tsx` *(new, ~30 LOC)* | fixed top-right `Page 0X / <name>` slug |
| `src/components/ChapterSpine.tsx` *(new, ~50 LOC)* | fixed left-margin spine + running header |
| `src/hooks/useDrift.ts` *(new, ~40 LOC)* | reusable scroll-coupled drift via IntersectionObserver + scroll progress |

No new dependencies. Lucide icons already deep-imported.

---

## D. Performance & QA contract

- **JS:** ≤ 95 KB gz held. New components are pure JSX; only `useDrift` adds ~0.4 KB.
- **CSS:** ≤ 14 KB gz held. ~140 new LOC, but mostly utilities replacing existing inline classes.
- **Motion:** All new motion respects `prefers-reduced-motion`.
- **A11y:** Spine, slug, marginalia, ridge silhouette, surveyor brackets all `aria-hidden`. No new focus traps. Navigation Index overlay reuses existing dialog semantics.
- **CLS:** Zero — all new fixed elements are positioned, not flowed.
- **Verification:** After implementation, build + manual visual QA at 1440 / 1024 / 390 widths.

---

## E. What this is *not*

- Not adding photography (still no real assets, still hand-drawn vignettes).
- Not adding parallax JS, GSAP, Framer Motion, or any animation library.
- Not changing routing, data, or copy except where marginalia adds to it.
- Not redesigning components; only enriching them with editorial gestures.

---

## F. Outcome

After this pass the page should read as a single, meticulously typeset publication with chapter spine, running headers, page slug, coordinates, figure footnotes, surveyor diagrams, breathing proof panels, scroll-settled headlines, a thermal dawn-to-dusk arc, and a true Pentagram-style colophon. Every gesture is small. The cumulative effect is unmistakable: this was set by hand, not generated.

**Approve to switch to default mode and execute all eight upgrades in one pass.**
