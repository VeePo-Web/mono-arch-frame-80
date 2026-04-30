## Goal
Eliminate the per-page drift in section headers + spacing by introducing a single `SectionHeader` primitive and auditing every consumer to use it. Today there are two header systems running in parallel (`HEADLINE.section` token vs the legacy `text-headline` CSS utility), three different eyebrow→H2 gaps (`mt-4`/`mt-5`/`mt-6`), inconsistent `data-drift` coverage, and the deprecated `numeral` prop is still being passed in 14+ places. After this pass the entire site speaks one section-header language.

## What's wrong today (audit findings)

Eight pages + 3 components render a section header. They split into two camps:

**Camp A — uses the typography token (newer):**
- `Index.tsx` → `<Eyebrow label /> + <h2 className={cn(HEADLINE.section, "mt-5 text-foreground")} data-drift>`
- `HowItGoes.tsx`, `ServiceMarquee.tsx` (×2 inside)
- `Services.tsx` (×3) — uses `mt-6` not `mt-5`, no `data-drift`

**Camp B — uses the legacy CSS class (older):**
- `Contact.tsx` (×3)
- `AreaPage.tsx` (×3)
- `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx` (each ×3-4)

Camp B sub-issues:
- Mixes `text-headline` and `text-title` arbitrarily.
- Still passes `numeral="I"` to `<Eyebrow />` even though `Eyebrow.tsx` documents it as deprecated and ignored.
- Eyebrow labels are SHOUTY UPPERCASE strings ("WHAT WE BUILD") while Camp A uses sentence case ("What we build"). The Eyebrow primitive already uppercases via `.text-minimal`, so the SHOUTING in source is redundant noise.
- Section padding is sometimes hand-rolled (`pt-20 pb-24 md:pt-32`) instead of `SECTION_PADDING.standard`.

## The unification

### 1. New primitive: `src/components/SectionHeader.tsx` (~50 lines)

A single composable header used everywhere:

```tsx
<SectionHeader
  eyebrow="What we build"
  title="Three services. One standard."
  lede="Interior finishing leads — that's where the craft is felt most clearly."
  id="services-heading"
  align="left"      // | "center"
  tone="default"    // | "light" (for dark sections, swaps eyebrow + heading colors)
  width="title"     // | "lede"  (controls max-w of which line; "title" caps headline at 20ch, lede at 58ch)
  drift              // boolean — adds data-drift to H2
/>
```

Renders the canonical structure with locked spacing:
- `<Eyebrow />` (sentence-case label, no `numeral`).
- `mt-5` → `<h2 className={cn(HEADLINE.section, "text-foreground")} data-drift={drift}>`.
- `mt-5` → `<p className={cn(BODY.large, "max-w-[58ch]")}>` (only if `lede` provided).

The header's wrapper is `max-w-[62ch] mb-12 md:mb-16` by default — matching the dominant pattern on Index/Services. A `compact` prop gives `mb-10 md:mb-14` for HowItGoes-style strips. A `bottomGap="none"` escape hatch removes the bottom margin for sections where the next block sets its own top spacing.

Light tone: H2 stays `text-background`, eyebrow auto-passes `tone="light"`. Lede goes `text-background/85`.

### 2. Lock `Eyebrow` props

Drop the deprecated `numeral` prop from the type signature. Compiler errors flag every old call site for removal in step 4. Eyebrow stays otherwise unchanged — same hairline + label, same `tone` and `align`.

### 3. Migrate every consumer

Replace the hand-built eyebrow/H2/lede trios with `<SectionHeader>` in:
- `src/pages/Index.tsx` — Areas section + final-CTA section (final-CTA uses `tone="light"`).
- `src/components/HowItGoes.tsx` — single header.
- `src/components/ServiceMarquee.tsx` — top header.
- `src/components/TestimonialSpine.tsx` — `align="center"` header.
- `src/pages/Services.tsx` — 3 headers (drop `numeral`, lowercase labels, drop `text-foreground`/`mt-6` strings).
- `src/pages/Contact.tsx` — 3 headers (one is `align="center"`); also normalize the "Prefer to write or call?" sub-header which currently uses `text-title` to a `SectionHeader` with `compact + bottomGap="none"` rendered as h3.
- `src/components/AreaPage.tsx` — 3 headers (interpolated `area.name` strings stay).
- `src/pages/InteriorFinishing.tsx` — 4 headers.
- `src/pages/ExteriorFinishing.tsx` — 4 headers.
- `src/pages/Decking.tsx` — 4 headers (already in spec).

Inside each migration: also normalize section padding to one of the four `SECTION_PADDING` tokens. The handful of bespoke `pt-X pb-Y` spots become `SECTION_PADDING.standard` or `.compact`. Sections that combine padding with the cream `section-wash` keep `cn(SECTION_PADDING.standard, "section-wash")` — that pattern is correct.

### 4. Add an `as` polymorphic option

Some headers semantically should be `<h3>` (sub-section inside a larger H2 region — Contact's "Prefer to write or call?", AreaPage's nested service cards). `SectionHeader` accepts `as="h2" | "h3"` (default h2) and downgrades the title typography to `HEADLINE.subsection` when `h3` is selected, preserving heading-level hierarchy without sacrificing the visual rhythm.

### 5. Style-guide page

Add a `SectionHeader` row to `src/pages/StyleGuide.tsx` showing the four variants (default / compact / centered / light) so future contributors see the canonical pattern instead of inventing a new one.

## Spacing audit (done as part of step 3, not separately)

| Place | Before | After |
|---|---|---|
| Eyebrow → H2 | `mt-3` / `mt-4` / `mt-5` / `mt-6` | always `mt-5` |
| H2 → lede | `mt-3` / `mt-5` / `mt-7` | always `mt-5` |
| Header → first content block | `mb-8` / `mb-10` / `mb-12` / `mb-14` / `mb-16` | `mb-12 md:mb-16` (default), `mb-10 md:mb-14` (compact), `0` (none) |
| Section padding | mix of `py-20 md:py-32`, hand-rolled, etc. | one of `SECTION_PADDING.{standard,compact,terminal,hero}` |
| Title `max-w` | `max-w-[20ch]` / `[22ch]` / `[26ch]` / none | `max-w-[20ch]` (default), `max-w-[26ch]` for `width="wide"` |
| Lede `max-w` | `max-w-[46ch]` / `[58ch]` / `[62ch]` / none | `max-w-[58ch]` (default) |

## Out of scope (explicitly)

- No changes to `HEADLINE` token scale (sizes stay).
- No new keyframes / motion. `data-drift` becomes a prop, but its CSS is unchanged.
- No `SubPageHero` or `SectionHeader` in nav / drawer / footer — those have their own type system.
- The legacy `.text-headline` / `.text-title` CSS classes stay in `index.css` (they're consumed elsewhere) but no new code uses them.
- `Eyebrow.tsx` keeps its `tone` and `align` props; we only remove the dead `numeral`.
- Memory rules untouched (CTA copy, palette, drift cinematics — all preserved).

## File touches

- `src/components/SectionHeader.tsx` *(new)*
- `src/components/Eyebrow.tsx` — drop `numeral` prop from type
- `src/pages/Index.tsx`, `src/pages/Services.tsx`, `src/pages/Contact.tsx`, `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx`, `src/pages/StyleGuide.tsx`
- `src/components/HowItGoes.tsx`, `src/components/ServiceMarquee.tsx`, `src/components/TestimonialSpine.tsx`, `src/components/AreaPage.tsx`

No CSS changes required. No new dependencies. No memory changes.
