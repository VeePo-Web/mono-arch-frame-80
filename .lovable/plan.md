## What I borrowed from Fly4Me

Their About page treats the philosophy block as a **signed letter** — not a "section with a heading and a pull-quote." The structural moves that make it work:

1. A 3 / 9-column grid: tiny eyebrow column on the left, a single tall reading column on the right.
2. A bold editorial headline with **italic `<em>` emphasis baked into the sentence** — no separate blockquote competing for attention.
3. Two stacked `.t-lede` paragraphs in muted foreground, max-width controlled for a true reading measure.
4. The whole thing reads as one voice from one person — closing with a quiet signature line.

That voice register (calm, first-person, confident) is exactly what "How we work" is reaching for. The current layout fragments it into eyebrow + headline + lede + blockquote + sub-eyebrow + centered body — five chunks where one letter would land harder.

## The change (scoped to "How we work" only)

**Before** — `<About.tsx>` lines ~37-105 currently render:
- eyebrow "How we work"
- big H2 "Held to two standards…"
- hair rule
- 7/4 split: lede paragraph + italic pull-quote blockquote
- "In practice" sub-eyebrow
- centered "That means careful access…" paragraph

**After** — one letter, three reading beats:

```
┌─────────────────────────────────────────────────────────┐
│ A note         │  H2 with italic emphasis inside it     │
│ from Cory      │  "A finished renovation is judged      │
│                │   twice. We hold both standards         │
│ ─── hairline   │   because the homeowner does."          │
│                │                                         │
│                │  ¶ lede (muted) — quality paragraph     │
│                │                                         │
│                │  ¶ lede (muted) — experience paragraph  │
│                │                                         │
│                │  ¶ lede (muted) — "In practice…"        │
│                │   careful access, the route, the gates  │
│                │                                         │
│                │  ─── short rule ───                     │
│                │  — Cory, Haven Creek Renovations        │
└─────────────────────────────────────────────────────────┘
```

Structural specifics, modeled on Fly4Me's Philosophy block:

- Outer: `grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10` (same proportions Fly4Me uses).
- Left column: `lg:col-span-3` — `.t-eyebrow` reading **"A note from Cory"**, plus a thin `h-px w-8 bg-foreground/20` hairline beneath. That's the column's only content. Replaces the current "How we work" eyebrow.
- Right column: `lg:col-span-9 max-w-[58ch] space-y-8`.
  - First child: `<h2 className="t-section text-foreground">` carrying the sentence-as-headline with `<em className="text-evergreen italic">` on the closing clause. Replaces both the current H2 and the separate blockquote — the italic emphasis is exactly the move Fly4Me makes ("the position you hold").
  - Then three `.t-lede text-foreground/75` paragraphs in sequence (quality → experience → in-practice). The "In practice" eyebrow disappears; it becomes a natural paragraph transition.
  - Closing block: short `h-px w-10 bg-foreground/20` rule + a one-line italic signature `.t-micro text-foreground/60` reading **"— Cory, Haven Creek Renovations"**. Borrowed from Fly4Me's `<figcaption>` move, but signature-only (no portrait — Haven Creek brand has no people-photography rule).

Reveal cadence stays the standard 800ms `data-reveal` with `--reveal-delay` stepped 120 / 280 / 400 / 520 / 640 / 800ms across eyebrow → H2 → three paragraphs → signature. Same easing as the rest of the site, no new motion vocabulary.

## Copy edit (small — keeping the user's exact text where possible)

**Headline** (was H2 + separate blockquote, now one sentence):
> A finished renovation is judged twice — once when it's done, and again every day after. *We hold both standards because the homeowner does.*

(The italic clause is the second half of the same `<h2>`, not a blockquote.)

**¶ 1** (unchanged from current — quality):
> The first judgement is about quality — does the work fit, does it last, does it read as resolved.

**¶ 2** (unchanged from current — experience):
> The second is about the experience — what it was like to live with the project from start to finish.

**¶ 3** (was the "In practice" body, now flows in as the third paragraph — light intro replaces the eyebrow):
> In practice, that means careful access — the route, the gates, the hours. It means working around dogs, horses, kids, and the rhythm of a working acreage. Equipment and materials stay where they belong, off the lawn and off the drive, and we clean up at the end of every day. When the project closes we leave the property the way we found it — minus the work that needed doing.

**Signature**:
> — Cory, Haven Creek Renovations

(Cory is already named site-wide on Contact, ConsultationForm helper, and ThankYou — no new persona introduced.)

## What I will NOT change

- "Where we work" section — untouched.
- `SubPageHero`, `BigCloseCTA`, `PhotoBleed`, `RevealSection`, `Container` — untouched.
- No new components, no new tokens, no new motion classes.
- Typography uses existing `.t-eyebrow` / `.t-section` / `.t-lede` / `.t-micro` only — no arbitrary `text-[…]`.
- No portrait, no people photography (brand rule).
- Section H2 anchor `#how-we-work-heading` and `id="how-we-work"` preserved (nav scroll-spy depends on it).

## Files touched

- `src/pages/About.tsx` — replace only the `<RevealSection id="how-we-work">` block (≈ lines 37-105). Imports unchanged.

## Memory note

No core rule changes. The existing rule *"Philosophy and property-respect are merged into one 'How we work' section, never split"* still holds — this plan keeps it as one section, it just upgrades the section's internal composition from "eyebrow + H2 + lede + quote + sub-eyebrow + body" to "eyebrow + letter."
