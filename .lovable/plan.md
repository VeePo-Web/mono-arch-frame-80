# Haven Creek — Fantasy.co Design Upgrade Plan

**Filtering through the three values**
1. *Elevate the Human Experience* — slow the visitor down with intentional motion, never trap them with dark patterns.
2. *Embody Brand Truth with Excellence* — every haptic detail must read "rural-refined", not "luxury SaaS". Fraunces serif and warm plaster surfaces stay; we add depth, not noise.
3. *Innovate Responsibly for Impact* — every visual upgrade must serve the one goal: a homeowner pressing "Request a Consultation" with confidence. Zero novelty for novelty's sake.

**Audit verdict** (from the live preview + soft-skill SKILL.md anti-pattern list)

| AI tell present today | Why it fails the Fantasy.co bar |
|---|---|
| Edge-to-edge sticky navbar glued to top | Banned layout — feels like a generic SaaS |
| Hero proof panel sits flatly on bg, single 1px border | Banned — needs Double-Bezel architecture |
| Project cards are pure text on warm card | No vignette, no proof of craft, reads as Lorem |
| `ease-smooth` everywhere via Tailwind defaults | Banned — needs custom cubic-beziers w/ mass |
| `bg-evergreen` final CTA is a solid color block | Reads as a Bootstrap CTA strip |
| Lucide arrows used everywhere | Acceptable but uniformly sized — feels stamped |
| Reveals are pure translate-up | Missing the "blur dissolve" signature |
| Mobile menu is full-bleed solid background | Should be a heavy diffused glass overlay |

We bring it to Awwwards-tier in **eight tightly-scoped passes**, no new dependencies, no new fonts, no new images beyond two tiny inline SVG textures.

---

## Pass 1 — Tokens & motion language (foundation)
**Files:** `src/index.css`, `tailwind.config.ts`

Add the bespoke craft tokens the entire site will reuse:

- **Custom cubic-beziers** as Tailwind `transitionTimingFunction` keys:
  - `swift: cubic-bezier(0.32, 0.72, 0, 1)` — UI clicks, button physics
  - `silk: cubic-bezier(0.16, 1, 0.3, 1)` — already exists; rename to `ease-silk`
  - `weighted: cubic-bezier(0.22, 1, 0.36, 1)` — large reveals, modal expansion
- **Concentric radius variables** in CSS: `--r-shell: 1.75rem; --r-core: calc(var(--r-shell) - 6px);` so every Double-Bezel container shares one ratio.
- **Plaster grain overlay** — a fixed `pointer-events:none` `::before` on `body`, an inline SVG noise data-URI at `opacity: 0.025`. Adds the "physical paper" texture from the Editorial Luxury archetype (banned in heavy doses; ours is whisper-quiet, ≤ 1 KB inlined).
- **Inset highlight + diffused ambient shadow utilities**:
  - `.shadow-haptic`: `0 1px 0 hsl(var(--background)/0.7) inset, 0 30px 60px -30px hsl(20 8% 14% / 0.18), 0 18px 36px -18px hsl(20 8% 14% / 0.10)`
  - `.shadow-haptic-evergreen`: same recipe in evergreen tones for the final CTA
- **Reveal keyframes** (CSS, no JS overhead):
  - `reveal-dissolve`: from `{ opacity: 0; transform: translateY(28px); filter: blur(10px); }` → resolved over 800 ms on `weighted`. Honors `prefers-reduced-motion`.
  - `reveal-mask`: clip-path inset reveal from bottom for headlines.
- **Hairline-grow utility** standardized so the underline/border growth is identical across nav, links, and dividers.

Why now: every later pass references these tokens. Without them we'd hard-code the same magic numbers ten times.

---

## Pass 2 — Floating glass island Navigation
**File:** `src/components/Navigation.tsx`

Rebuild as the soft-skill "Fluid Island" archetype, tuned warm:

- Detached from the top: `mt-5`, centered, `w-max max-w-[min(96vw,1080px)]`, `rounded-full`, `px-2 py-2`.
- **Outer shell**: `bg-background/70 backdrop-blur-xl ring-1 ring-foreground/8`, with a soft ambient drop shadow (no harsh blacks — uses the bark token at 8 % alpha).
- **Inner core**: a `rounded-full` strip holding the logo (left, in its own `rounded-full` chip), the centered link cluster, and the right-side CTA pill.
- **Link hover**: chip-style background fade-in (no underline at this scale; underlines belong to body links). Active route shows a 4 px evergreen dot below the label that draws in via `transform: scaleX(0)` → `scaleX(1)` on `swift`.
- **CTA button**: pill with the **Button-in-Button** trailing icon — arrow lives inside its own `h-8 w-8 rounded-full bg-foreground/5` chip, flush right. On hover the chip translates `+3px / -1px` and scales 1.05 while the parent `active:scale-[0.98]`.
- **Scroll behavior**: instead of "solidify on scroll", the island *contracts* — `py-2 → py-1.5`, brand text fades to mark-only, all on `swift 320 ms`. No background swap, no layout jank.
- **Hamburger morph**: two lines that rotate to `+45° / -45°` (no third line — calmer rural feel).
- **Mobile sheet**: heavy diffused glass (`bg-background/82 backdrop-blur-2xl`), staggered link reveal (delays 80/140/200/260/320 ms), each link is the editorial italic Fraunces but now with a `reveal-mask` clip-path so it draws in from below.

Performance: scroll listener already passive + rAF-throttled; we drop it and use a single `IntersectionObserver` on a 1px sentinel `<div>` instead — zero scroll handler.

---

## Pass 3 — Hero: signature opening with hand-drawn vignette
**Files:** `src/components/Hero.tsx`, new `src/components/hero-vignette.tsx`

The hero is still the biggest trust moment. Two surgical upgrades:

**A. Double-Bezel proof panel**
The right column becomes a true nested enclosure:
- *Outer shell*: `rounded-[var(--r-shell)] bg-card/60 ring-1 ring-foreground/8 p-1.5 shadow-haptic`
- *Inner core*: `rounded-[var(--r-core)] bg-card` holding the existing eyebrow + three service rows.
- The vertical evergreen "creek" line moves to the inner core's left edge so it reads like a deliberate inlay.

**B. Replace the watermark logo with a hand-drawn property scene**
A single, ~3 KB inline SVG: minimalist line drawing of a rural home silhouette + a single tree + a horizontal land line, drawn with `stroke-dasharray` animation that completes once on mount (1.6 s, then static — no looping). Uses `hsl(var(--evergreen) / 0.30)`. This is the *signature visual moment* the brand brief explicitly asks for, and it solves "no real photography yet" without resorting to stock.

**C. Service rows become tactile**
Each of the three service rows in the panel:
- Numeral chip becomes a `rounded-full` `h-7 w-7` outlined disc, the numeral inside in tabular-nums.
- Hairline beneath each row grows from 12 px → 80 px on hover (matches the underline language elsewhere).
- The trailing arrow gets the Button-in-Button treatment (icon inside a `h-7 w-7` `rounded-full` evergreen-tinted chip that brightens + nudges on hover).

**D. Headline choreography**
The "Trusted" italic + "renovations for rural homes." stack uses `reveal-mask` per line so each line draws in from below instead of fading in, on `weighted 900 ms` with 120 ms stagger. The italic word gets a 100 ms head start so it reads like it was set first.

---

## Pass 4 — Card system with Double-Bezel
**Files:** `src/components/ui/card-premium.tsx` (new wrapper), `src/pages/Index.tsx` (Services + Project sections)

A single shared `<PremiumCard>` component with the nested architecture so we never re-implement it:

```
<PremiumCard>            // outer shell: bg, ring, p-1.5, shell radius, shadow-haptic
  <div className="core"> // inner core: solid card bg, inset top highlight, core radius
    {children}
  </div>
</PremiumCard>
```

**Services preview (§ II)**
- Three premium cards.
- Hover: outer shell ring tightens from `foreground/8` to `evergreen/30`, ambient shadow deepens 30 → 50 % alpha, the inner core tilts 0 → -0.4° on `swift 600 ms` (subtle Z-Axis Cascade hint, no aggressive 2-3° rotations that would feel novelty).
- Numeral chip uses the disc treatment from Pass 3 for cross-page consistency.
- "See the work" CTA gets the Button-in-Button trailing arrow.
- Featured emphasis on Interior Finishing: outer shell ring sits at `evergreen/15` even at rest (the strategy doc mandates this hierarchy).

**Project gallery preview (§ IV)**
Today these are pure text — the most disappointing section. Upgrade plan that respects "no fake stock" rule:
- Each card gets a **proof vignette** at the top: a 4:3 inline-SVG composition (~600 bytes each) showing an abstract craft motif:
  - *Saw Mill Kitchen* → cross-section of a beveled cabinet edge
  - *Ridgeline Deck Rebuild* → deck-board parallel-lines ending on a railing post
  - *South-Facing Soffit Repair* → soffit-and-fascia profile with vent slats
  These are drawn in evergreen + bark on a warm-stone fill, using only `<rect>` and `<line>` — they read as architectural drawings, fully aligned with "craftsmanship notes, not marketing blurbs". Total payload: < 2 KB inlined.
- Project metadata layout becomes: vignette → category eyebrow → serif title → italic location → scope → "Why it mattered" pull-line in evergreen with a 2 px left rule (matches the `.pull-quote` already in CSS).
- Card hover: shell ring → evergreen, vignette gently scales `1.0 → 1.015`, all on `weighted 700 ms`.

---

## Pass 5 — Trust Promise, Approach, Areas — calm, readable upgrades
**File:** `src/pages/Index.tsx`

These three sections are already strong editorially. Tightening:

**§ I Trust Promise**
- Pull quote on the right column gets the `.pull-quote` styling already defined (currently unused) — reframes the second paragraph as a quoted line of philosophy.
- Add a single hairline numeral chip to the left of the headline so the "I" eyebrow reads as the section opener, not a label.

**§ III Approach**
- Step discs upgrade from a flat `border` to the same outlined disc system (concentric: outer ring at 8 % evergreen, inner solid background, numeral in tabular-nums).
- The vertical path line gets a `reveal-mask` that draws downward from top to bottom on enter — choreographed with the steps so each step's disc lights up as the line passes it (pure CSS `animation-delay` chained off `IntersectionObserver`).
- Each step body gets a `max-w-[52ch]` for true editorial measure.

**§ V Service Areas**
- Today is a divide-list — keep it but add a *floating preview* on hover: a small inline-SVG mini-map (geometric, not a real map, ~400 bytes per area) anchored bottom-right of each row, fading + sliding in on hover. Calm, never noisy. Disabled on touch to avoid sticky hovers.
- Right-aligned arrow gets the Button-in-Button chip treatment.

---

## Pass 6 — Final CTA: textured editorial close
**File:** `src/pages/Index.tsx` (§ VI)

Today: a flat evergreen color block. Upgrade to **textured editorial close**:

- Background: keep evergreen base, layer a radial gradient bloom from top-left at 20 % evergreen-hover, plus the same plaster grain overlay at `opacity: 0.04`. Reads as deep, breathable green, not a slab.
- The single vertical hairline becomes a vertical *reveal-mask* line that draws in on view-enter.
- Replace the two large CTA rows with a **Double-Bezel CTA stack**:
  - Outer shell: `bg-background/8 ring-1 ring-background/15 p-1.5 rounded-[var(--r-shell)]`
  - Inner core: a single calm cream surface holding the primary CTA pill (Button-in-Button), a hairline divider, and a secondary text-link CTA below it. Reduces the "two equal buttons" awkwardness and creates one clear next step.
- The four-line proof list becomes a **vertical list with hairline counters** (`I · II · III · IV` in tabular-nums) so it visually mirrors the rest of the page's numeral language.
- Closing line "Custom quotes based on your property, scope, and timeline." stays as the calm afterword.

---

## Pass 7 — Footer: editorial closing page
**File:** `src/components/Footer.tsx`

Already solid. Three light touches:

- Wrap the brand block in a **PremiumCard** at quarter-strength (outer shell with `ring-foreground/4`) so the footer feels like a final composed plate, not a list.
- Replace the column heading text with the eyebrow numeral pattern (e.g. `· SERVICES`, `· AREAS`, `· CONTACT`) — visual continuity with the body sections.
- Add a single **end-mark** glyph after the © line (a small evergreen square ⬛ at 6 px) — Pentagram-style closing punctuation. The kind of detail no one names but everyone feels.

---

## Pass 8 — Reveal choreography + polish + verification
**Files:** new `src/hooks/useReveal.ts`, sections in `src/pages/Index.tsx`

- One tiny shared hook: `useReveal(ref)` wires `IntersectionObserver` (rootMargin `0px 0px -10% 0px`, `threshold: 0.15`) and toggles a `data-revealed="true"` attribute. CSS handles the rest via `[data-reveal]` → `[data-reveal][data-revealed="true"]` rules using `reveal-dissolve`. **No JS animation libs**, ≈ 600 bytes hook + a few CSS rules.
- Apply `data-reveal` with stagger indices to: hero proof panel rows, every Service card, every Step disc + body, every Project card, every Area row, the final CTA's Double-Bezel stack.
- `prefers-reduced-motion`: all `data-reveal` elements snap to final state immediately (already handled by the existing media query — we just inherit it).
- **Pre-output checklist run** against the soft-skill matrix (Section 8):
  - [ ] No banned fonts/icons/borders/shadows/layouts
  - [ ] Vibe = Editorial Luxury · Layout = Editorial Split (hero) + Asymmetrical Bento (services/projects)
  - [ ] All major cards = Double-Bezel
  - [ ] CTAs = Button-in-Button
  - [ ] Section padding ≥ `py-24` (already true, raising final CTA to `py-36`)
  - [ ] All transitions on custom cubic-beziers
  - [ ] Scroll entry on every above-fold-2 element
  - [ ] Mobile collapses to single-column at `md:` breakpoint
  - [ ] Animations only on `transform`/`opacity`/`filter` (blur is GPU-cheap on small elements)

**Verification step**
1. `bun run build` — confirm bundle stays at or near current 108 KB gz JS / 12.6 KB gz CSS. Budget ceiling: +8 KB JS, +4 KB CSS (the inline SVGs add ~3 KB CSS, the hook adds < 1 KB JS, no new deps).
2. Browser screenshot pass at 1440×900, 768×1024, 390×844 — the canonical desktop, tablet, and mobile.
3. Lighthouse-equivalent eyeball: hero LCP element is still the headline `<h1>`, no new render-blocking work, no CLS introduced (every revealed element has a final-state `min-height` reserved or uses `transform`-only motion).

---

## What we're explicitly NOT doing (and why)

- **No new fonts.** Fraunces + Inter is doing the editorial work; adding Geist or Clash Display would dilute the rural-refined identity and bust the perf budget.
- **No fake architectural stock photography.** The brief at `1.5-brand-identity-north-star.md` lists "luxury stock imagery" as a dealbreaker. Inline SVG vignettes solve the empty-photo problem without faking craft.
- **No GSAP / Framer Motion.** Every upgrade above is achievable with CSS transitions on `transform`/`opacity`/`filter` + one tiny IntersectionObserver hook. Adding Framer Motion would cost ~30 KB gz for visuals we can do in CSS.
- **No bento-grid masonry on the home.** The brief calls for "calm pathway, not a generic process diagram." We use the Editorial Split / Card Triplet rhythm instead — Bento would feel SaaS.
- **No "What we believe" / testimonials section.** Out of scope for this pass and the current copy isn't ready. We'll surface it in a later pass once real client quotes exist.

---

## Order of operations once approved

1. Pass 1 (tokens) — single CSS + Tailwind config edit, foundation for everything else.
2. Pass 2 (Navigation) + Pass 7 (Footer) in parallel — chrome locks in.
3. Pass 3 (Hero) + Pass 4 (Card system + Services + Projects) — biggest visible upgrade.
4. Pass 5 (Trust/Approach/Areas) + Pass 6 (Final CTA) — section polish.
5. Pass 8 (reveal hook + checklist + build verification + screenshot QA).

**Approve to switch to default mode and execute.**
