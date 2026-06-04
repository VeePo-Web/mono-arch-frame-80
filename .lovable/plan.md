# /about "How we work" — editorial re-format

Replace the two parallel body columns with a fantasy.co-style tall editorial layout. Scope is **only** the `#how-we-work` section in `src/pages/About.tsx`. Eyebrow + headline grammar stays (matches the Areas section below it). Type tokens, motion cadence, and `.section-y` spacing all stay locked.

## What's wrong with the current section

- Two side-by-side body paragraphs read as a newspaper column dump — eye doesn't know which to read first.
- Headline is clamped to `max-w-[18ch]` so it breaks awkwardly at md.
- The strongest line in the copy ("We hold both standards because the homeowner does.") is buried at the end of paragraph one with no emphasis.
- "In practice" pivot has no visual marker, so paragraph two feels like more of the same.
- Body opacity step (`/85` → `/70`) demotes the second paragraph for no editorial reason.

## New layout (lg+)

```text
┌─────────────────────────────────────────────────────────────┐
│  HOW WE WORK                                                │
│  ───────                                                    │
│                                                             │
│  Held to two standards —                                    │
│  the work, and                                              │
│  the experience.                          ← oversized H2,   │
│                                             cols 1-9,       │
│                                             tighter leading │
│                                                             │
│  ─────────────────────────────────────────────              │
│                                                             │
│  ┌──── cols 1-7 ────┐    ┌─ cols 9-12 ──┐                   │
│  │ A finished       │    │ ❝ We hold     │                  │
│  │ renovation is    │    │   both        │                  │
│  │ judged twice…    │    │   standards   │                  │
│  │ [t-lede, larger, │    │   because     │                  │
│  │  cream lead      │    │   the         │                  │
│  │  paragraph]      │    │   homeowner   │                  │
│  │                  │    │   does. ❞     │                  │
│  └──────────────────┘    │  ← pull-quote │                  │
│                          │    serif      │                  │
│                          │    italic,    │                  │
│                          │    evergreen  │                  │
│                          │    rule above │                  │
│                          └───────────────┘                  │
│                                                             │
│  ─── IN PRACTICE                                            │
│                                                             │
│  ┌──── cols 3-10 (indented body) ──────────┐                │
│  │ Careful access — the route, the gates,  │                │
│  │ the hours. Working around dogs, horses, │                │
│  │ kids, and the rhythm of a working       │                │
│  │ acreage. Equipment and materials stay   │                │
│  │ where they belong…                      │                │
│  └─────────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

Mobile collapses to a single column in the same vertical order: eyebrow → headline → lead paragraph → pull-quote (full width, hair rules above + below, indented left) → "IN PRACTICE" small-caps divider → second paragraph (no indent).

## Specific moves

1. **Headline** — drop `max-w-[18ch]`, let `.t-section` breathe to `max-w-[22ch]` so the line break lands on "two standards — / the work, and / the experience." naturally. No copy change.
2. **Hair rule under headline** — 1px `border-foreground/12`, full container width, 56px below H2 / 64px above the body grid. Same magazine grammar as the Areas list.
3. **Lead paragraph** — first paragraph promoted to `.t-lede text-foreground/90` (currently `.t-body /85`). Cols 1-7 at lg, full width below.
4. **Pull-quote** — extract "We hold both standards because the homeowner does." into a `<blockquote>` at cols 9-12 (lg) / full width (mobile). `font-serif italic text-2xl lg:text-3xl text-foreground leading-[1.25] tracking-[-0.01em]`, with a 32px-wide `h-px bg-evergreen/40` rule above the quote and 16px below. **Remove that sentence from the lead paragraph** so it isn't repeated.
5. **"In Practice" divider** — small-caps `.t-eyebrow text-evergreen/70` flush left, preceded by a 24px `h-px bg-foreground/20` rule (rule + label inline, 12px gap). 80px above the second paragraph.
6. **Second paragraph** — restored to `.t-body text-foreground/85` (same weight as lead, no demotion), indented to cols 3-10 at lg, `max-w-[62ch]`. No "minus the work that needed doing" trim — copy unchanged otherwise.
7. **Reveal cadence** — eyebrow 0ms · headline 120ms · rule 200ms · lead 280ms · pull-quote 360ms · in-practice rule 480ms · second paragraph 560ms. All `data-reveal`, standard 800ms `ease-weighted`.

## Files touched

- **`src/pages/About.tsx`** — replace lines 36-73 (the `#how-we-work` `RevealSection`) with the new editorial layout. No other section changes. No new components, no new CSS — everything uses existing tokens (`.t-eyebrow`, `.t-section`, `.t-lede`, `.t-body`, `font-serif`, `text-evergreen`, `border-foreground/12`, `data-reveal`).

## Out of scope

- The Areas section, the Hero, BigCloseCTA — untouched.
- No new memory entries — this is a layout refinement, not a new rule. The existing core rule "About is exactly 2 prose sections + the named-area rail + BigCloseCTA" still holds (we're refining one of those 2 prose sections, not adding a third).
- No copy rewrites beyond extracting the one sentence into the pull-quote.
