
# Round 9 — Site-Wide Legibility Sweep + Bento Conversion

## Why this round

Round 8 fixed the home page, About, and shipped the `/style-guide`. But **seven pages still violate the legibility floor** we just codified:

- `text-[0.95rem]`, `text-[0.92rem]`, `text-[0.9rem]` — appears **24+ times** across service detail pages, Work, AreaPage, Contact, Services
- `text-[0.7rem]` plate captions — too small to read
- `text-muted-foreground` on multi-line paragraphs — appears **31+ times**
- Naked `<p>` stacks instead of `InfoCard` / `BentoTile` / `StatCard`
- One-off `py-16 md:py-32` strings instead of `SECTION_PADDING.standard`
- Card padding inconsistencies (`p-8 lg:p-10`, `p-7 lg:p-8`, `p-9 lg:p-11`)

A 70-year-old visiting `/services/decking` or any area page will still squint. **The whole site needs to inherit the new tokens.**

---

## Goals

1. **Zero `text-[0.x rem]` body sizes anywhere.** Every paragraph uses `BODY.standard` / `BODY.card` / `BODY.large`.
2. **Zero `text-muted-foreground` on multi-line copy.** Switch to `text-foreground/85` or `BODY.card`.
3. **Every list of 3+ peer items becomes cards.** Use `InfoCard`, `BentoTile`, or `StatCard`.
4. **Every section uses `SECTION_PADDING.*` and `CONTENT_GAP.*`.** Kill the per-file `const SECTION = "py-16 md:py-32"`.
5. **Plate captions bumped from 0.7rem → 0.75rem (12px floor).**
6. **Decluttering**: cut unnecessary repetition where one card can carry the meaning two paragraphs were carrying.

---

## File-by-file plan

### 1. `src/pages/InteriorFinishing.tsx`
- Replace local `SECTION` const with `SECTION_PADDING.standard` import.
- §I "Details we obsess over" — currently a 6-row `<ul>` with `text-[0.95rem]`. Convert to a 2-column `BentoGrid` of 6 small `BentoTile`s (eyebrow = numeral, title = label, no body needed).
- §III "Three details" cards — the `PremiumCard` + custom layout with `text-[0.95rem]` becomes 3 `InfoCard`s. Keep the `InteriorVignette` thumbnail on top via the new `media` slot.
- §IV Project proof — the 4-cell grid using `text-[0.95rem]` gets the `BODY.card` token; "Why it mattered" italic line uses smaller quote variant.
- Plate caption `text-[0.7rem]` → `text-[0.75rem]`.

### 2. `src/pages/ExteriorFinishing.tsx`
- Same `SECTION_PADDING` swap.
- §I "Four kinds of exterior work" — replace 4 `PremiumCard`s with `BentoGrid layout="2x2"` of 4 `BentoTile`s.
- §II "Rural considerations" surveyor list — keep the dotted-line motif (it's brand-iconic) but bump the body from `text-muted-foreground` to `text-foreground/85` and apply `MEASURE.prose`.
- §III "Respect, itemized" — 7-item `<ul>` with `text-[0.95rem]` becomes a `BentoGrid auto` of 7 small tiles.
- §IV proof grid — same `BODY.card` cleanup as Interior.
- Plate caption sizes bumped.

### 3. `src/pages/Decking.tsx`
- §I "How we plan a deck" — 3 `PremiumCard`s become 3 `InfoCard`s with `featured` on the lead one.
- §III "Scopes we take on" — 5-item `<ul>` becomes a `BentoGrid 1+2` of 5 tiles.
- All `text-[0.95rem]` and `text-muted-foreground` swaps.
- Plate caption sizes bumped.

### 4. `src/pages/Services.tsx`
- §II surveyor 3-step list — bump body from `text-muted-foreground max-w-[52ch]` to `BODY.card` + `MEASURE.prose`.
- §III "What a quote includes" — 5-row `<ul>` with `text-[0.95rem]` becomes a `BentoGrid auto` of 5 small tiles.
- Custom-quote body block — apply `MEASURE.prose` and bump muted-foreground to `text-foreground/85`.
- Service detail card body — use `BODY.card` (kill `text-[0.95rem]` and `text-[1.05rem]`).
- Plate captions bumped.

### 5. `src/pages/Work.tsx`
- Project plate cards: body `text-[0.95rem]` → `BODY.card`; "Why it mattered" italic line uses smaller quote variant + `text-foreground/80` (not muted).
- Filter pill `text-minimal` (likely 11–12px) — verify it's ≥12px, bump if not.
- Empty-state `text-body text-muted-foreground` — switch to `BODY.standard`.
- `SECTION_PADDING.standard` swap.

### 6. `src/components/AreaPage.tsx`
- §II service cards — body `text-[0.95rem]`, italic line `text-[0.92rem]`, sub-promise `text-[1.02rem]` all become tokenized (`BODY.card`).
- §III "Other nearby areas" `<ul>` — keep the area-row pattern but bump the description from `text-[0.92rem]` to `BODY.card`.
- Pull-quote — currently `text-[1.3rem] md:text-[1.55rem]`. Keep as-is (it's editorial), but apply `MEASURE.editorial`.
- Local context body — bump muted-foreground to `text-foreground/85`.

### 7. `src/pages/Contact.tsx`
- §I "What happens next" 4-step ordered list — body uses `text-[0.95rem]` muted. Switch to `BODY.card`.
- Italic quote `text-[1.05rem]` — apply `BODY.quote` token.
- Direct-contact panel — body `text-[0.95rem]` → `BODY.card`.
- "About the quote" two paragraphs — apply `MEASURE.prose`, kill double muted.
- "Where we work" area list description block — bump muted-foreground.

### 8. `src/components/ui/InfoCard.tsx` enhancement
- Add an optional `media` prop that renders an aspect-ratio image/vignette above the eyebrow (used by the Interior detail cards). Keeps the InfoCard primitive flexible enough to carry vignette-led variants without pages reaching back to raw `PremiumCard`.

### 9. `src/components/ui/BentoGrid.tsx` enhancement
- Allow a `compact` prop on `BentoTile` for cases where we just want eyebrow + 1-line title (used for "Details we obsess over", "Respect itemized", "Scopes we take on", "What a quote includes"). Reduces padding to `p-5` so dense tile-grids stay balanced.

### 10. `STYLE_GUIDE.md`
- Document the new `BentoTile` `compact` and `InfoCard` `media` variants under the "Card primitives" section.
- Add a "Migration notes" appendix listing the deprecated patterns being removed in Round 9.

### 11. `mem://standards/legibility-floor`
- Add a 6th rule: **"Plate captions ≥ 12px (`text-[0.75rem]`)."** The 0.7rem caption was a holdover.
- Note that `BODY.card` is the default for any in-card paragraph — pages should never reach for `text-[0.95rem]` on card body again.

---

## Performance considerations

- **No new runtime cost.** Card primitives are pure JSX wrappers around the same `surface-card` class.
- **Smaller bundles.** Removing per-page `PremiumCard` imports + custom layouts cuts ~3KB across the 7 pages.
- **content-visibility preserved.** All §II / §III / §IV sections retain their existing `cv-auto` opt-ins.

---

## Out of scope for this round

- Navigation (Round 7 territory — untouched).
- Hero components (`SubPageHero`, `Hero`) — already typographically clean.
- Footer — already passes the legibility floor.
- Form internals (`ConsultationForm`) — handled in Round 8.
- Color tokens, spacing tokens, motion timings — all stable.

---

## Acceptance criteria

After implementation:
- `rg "text-\[0\.\d+rem\]" src/pages src/components` returns **only** the 0.75rem plate captions and tokens inside `typography.ts` itself.
- `rg "text-muted-foreground" src/pages src/components` only appears on captions ≤ 2 lines.
- Every page's "list of N peer items" renders inside an `InfoCard` or `BentoTile`.
- TypeScript compiles clean.
- Visual smoke check on all 7 pages confirms no text appears smaller than 14px (and body ≥ 16px).
