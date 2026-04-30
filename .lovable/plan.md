## Goal
Lift the landing page from "well-crafted editorial site" to fantasy.co / awwwards-tier — without breaking the brand contract (rural-Alberta calm, dark-on-cream, evergreen accent, no glassmorphism, no floating FABs). Two outputs:

1. A reworked `Index.tsx` flow with a photo-led cinematic hero, a single signature scroll moment, sharper CTA hierarchy, and tighter section rhythm.
2. A small CTA primitive upgrade so every button on the page reads as one of three deliberate variants (Primary spring · Ghost arrow · Quiet link), used consistently top-to-bottom.

CTA copy stays "Get a Free Quote" / "Get a Quote" per Core memory — no "Consultation."

## Hero — cinematic, photo-anchored

Replace the "headline + right-column field notes" hero with an immersive split-stage hero that fantasy/awwwards juries score on:

```text
┌────────────────────────────────────────────────────────┐
│  EYEBROW · HAVEN CREEK · RURAL ALBERTA                 │
│                                                        │
│  One trusted contractor for                            │
│  the property you value.                               │
│  ─────────                                             │
│  hands-on finishing · exterior · decking               │
│                                                        │
│  [ Get a Free Quote → ]   View the Work →             │
│                                                        │
│  ── Reply in 2 days · No obligation · No pressure ──  │
└────────────────────────────────────────────────────────┘
            ↑ headline column (60%)        photo column (40%, full-bleed at md+)
```

Mechanics:
- Photo column is `position: absolute; inset-y: 0; right: 0;` from `md+`, taking ~42% width with a soft left-edge fade (mask gradient, not a hard rectangle). On mobile it sits below the headline as a 16:10 plate so the H1 lands in the first viewport.
- Single "trusted" italic word keeps its hand-drawn underline; a quiet ken-burns drift on the photo (`animation: heroDrift 18s ease-in-out infinite alternate`) — already in the system, just plumbed in.
- H1 splits into two lines that each rise on a 60ms staggered clip-path reveal (uses existing `.reveal-up`).
- Right-column "Field notes" promise list is **moved out of the hero** into its own §I band so the hero reads at a glance — this is the biggest UX win for a 70-year-old grandpa: one sentence, two buttons, in-frame in <2s.
- Trust microcopy stays as a single horizontal rule below CTAs.

## Signature scroll moment — "The Three" service marquee

Replace the current 3-card services preview with one cinematic horizontal trio that locks attention. Three full-height (60vh on desktop) panels stack vertically, each:
- Large numeral (I · II · III) in italic Fraunces
- Service name as a 64–88px headline
- One-sentence promise, one short scope list (≤4 items)
- Real photograph (`servicePhotos[slug]`) anchored right
- A single "See [service] →" link styled as the new ghost-arrow CTA

Reveal pattern: each panel uses an `IntersectionObserver` (already wired via `data-reveal`) so the headline rises and the photo zooms-in 1.04→1.0 on enter. This is the "wow moment" jurors score.

## Trust + Approach — collapsed into one band

Today there are TWO headers ("Three services / One standard" + "A path you can see from the start"). Consolidate the approach into a quiet horizontal "How it goes" strip directly under the hero — three numbered chips, no card chrome, one line each:

```
01  Conversation     We talk through the property and the scope.
02  Planning         Materials, timeline, the practical realities.
03  Hands-on build   Built and walked-through by the same person.
```

This drops one full section of cognitive load and frees scroll budget for the service marquee.

## Service areas — keep the 2x2 bento, upgrade the tile

Bento stays — it's already award-worthy structure. Upgrade per tile:
- Hover tilts 1px up + reveals a hairline bottom rule animating left→right (220ms).
- Postal eyebrow stays, body line stays.
- Add a barely-visible micro-map dot SVG in the upper-right of each tile (4px evergreen dot + name) — pure decoration, gives jurors a "details matter" signal.

## Final CTA band — keep the bezel, sharpen the choreography

Keep the dark evergreen final-CTA band; it's already strong. Three precise upgrades:
- Switch the H2 from "Let's talk about what you're thinking." to "Tell us about the place." (5 words, scan-first).
- Move the direct-contact rows (Email / Phone) **above** the form on mobile, not below — escape hatch for users who just want to call.
- Form bezel keeps `cta-bezel`; the submit button inside the form already uses `cta-spring`, just verify and align padding.

## CTA system — three variants, used everywhere

Add two small CSS classes to `index.css` (next to existing `.cta-anchor` / `.cta-spring`) so every CTA on the page belongs to one of three families:

| Variant | Class | Where used |
|---|---|---|
| **Primary spring** | `.cta-primary` (new — wraps `.cta-spring` + evergreen fill + 56px min height + spring press) | Hero #1, final-CTA submit, all "Get a Free Quote" |
| **Ghost arrow** | `.cta-ghost` (new — text + animating underline rule that grows from 24px→64px on hover) | "View the Work", "See [service]", "Browse services" |
| **Quiet link** | existing italic underline | Inline body links |

All three already meet Core rules: 44×44 hit target, focus ring 2px evergreen with 2px offset, motion-reduce safe.

Buttons everywhere on `Index.tsx` get migrated to one of these three classes — no more ad-hoc `inline-flex items-center gap-3 …` strings.

## Performance + accessibility guardrails (non-negotiable)

- Hero photo: `fetchPriority="high"` + `decoding="async"` + intrinsic `width/height` so LCP candidate is the H1, not the image.
- Service marquee photos: lazy after the first.
- Final-CTA section keeps `content-visibility: auto`.
- All new motion respects `prefers-reduced-motion`: drift, ken burns, and reveal-up already gated; we'll gate the new tilt + underline-growth too.
- All CTAs ≥ 44×44, focus ring visible, label text ≥ 14px (16px on primary).
- Color contrast: evergreen on cream is AA verified; light-on-dark final CTA stays AAA on the H2.

## File touches (scoped — no rewrite of unrelated code)

- `src/pages/Index.tsx` — restructure flow per above.
- `src/components/Hero.tsx` — split-stage rebuild, photo column added, field-notes block extracted.
- `src/components/HowItGoes.tsx` *(new, ~50 lines)* — the 3-row "How it goes" strip that replaces the Approach bento.
- `src/components/ServiceMarquee.tsx` *(new, ~120 lines)* — the three full-height service panels.
- `src/index.css` — add `.cta-primary`, `.cta-ghost`, `.area-tile-hover` (≤ 60 new lines, no token changes).
- `src/components/PrimaryCTA.tsx` — kept but updated to consume the new classes so any other page that imports it inherits the upgrade.

No changes to navigation, drawer, route prefetching, performance memory rules, or section-rail conventions. Memory rule "Primary CTA copy is Get a Quote / Get a Free Quote" honored throughout.

## Out of scope (explicitly)
- No new dependencies (no Framer Motion, no GSAP — CSS + IntersectionObserver only).
- No floating CTAs, no sticky bars, no glassmorphism.
- No edits to nav, drawer, section rail, footer, or other pages.
- No memory updates (this is a page-level pass, not a system-level rule change).
