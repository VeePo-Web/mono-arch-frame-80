
# Round 8 — "Grandpa-Grade Legibility" + Live Style Guide

The owner's complaint is real: parts of the site read **too small**, several sections feel like **dense walls of editorial copy** with no card scaffolding, and there is **no single source of truth** a developer (or future AI) can reference. We will fix all three at once — modeled on `RoyalMechanical.com`'s tokenized design system and bento layout — while preserving the warm-evergreen Haven Creek brand.

---

## Three guiding rules (filtered through the brief)

1. **Nothing under 16px on body, nothing under 12px on labels.** A 70-year-old should never have to lean in.
2. **If it's a list of 3+ similar things, it lives in a card or bento tile.** No more naked paragraph stacks pretending to be sections.
3. **One source of truth at `/style-guide`.** Tokens live in code, get rendered live, and every page consumes them.

---

## A — Typography token system (`src/lib/typography.ts` — NEW)

Mirrors RoyalMechanical's structure but tuned to Haven Creek's Fraunces + Inter stack. Exports `HEADLINE`, `BODY`, `EYEBROW`, `QUOTE`, `STAT`, `UI`.

| Role | New min size | Old (where small) | Fix |
|---|---|---|---|
| Body large | **18px** (`text-lg`) leading-relaxed | `text-[0.95rem]` / `[0.98rem]` (≈15px) | Bumped, paired with `max-w-[62ch]` |
| Body standard | **16px** (`text-base`) | mixed | New default |
| Eyebrow | **12px** (`text-xs`) `tracking-[0.18em]` semibold | `text-[11px]` | One step up |
| Caption | **13px** (`text-[13px]`) | `text-xs` (12px) on captions | Up-rounded |
| Form error | **13px** | `text-xs` on `FormMessage` | Up-rounded |
| H1 hero | clamp `2.75rem → 5rem` | text-6xl → text-8xl | Same ceiling, smoother fluid scale |
| H2 section | clamp `2rem → 3.25rem` | mixed | Tokenized |
| H3 card | **20–22px** semibold | mixed | Tokenized |

Hard rule baked into the lib JSDoc: **"Body never goes below text-base. Labels never go below 12px. Never apply `text-muted-foreground` to a paragraph longer than 2 lines — switch to `text-foreground/85`."**

## B — Spacing tokens (`src/lib/spacing.ts` — NEW)

8-pt grid, semantic names (`SECTION_PADDING.standard`, `SECTION_PADDING.compact`, `SECTION_PADDING.terminal`, `CONTENT_GAP.cardGrid`, `CONTENT_GAP.bento`, `MAX_WIDTH.prose = 62ch`, `MAX_WIDTH.measure = 72ch`). Replaces the scattered `py-20 md:py-40` magic constant in `Index.tsx`.

## C — Component primitives (declutter via cards)

Three reusable surfaces — a 70-year-old's eye should always have a clear box to land in.

1. **`StatCard`** — bold serif number, eyebrow label, one-line caption. Used to replace inline trust copy.
2. **`InfoCard`** — title + 2-line desc + optional "Learn more" affordance. Replaces 6+ unboxed `<p>` blocks across home + About.
3. **`BentoGrid` + `BentoTile`** — asymmetric 2/3-up grid (1 large + 2 small on desktop, stacked on mobile). Used on Services and Areas previews so users *scan* instead of *read*.

All built on existing `PremiumCard` + `surface-card` so we keep the paper-soft shadow language. No new shadow primitives.

## D — Page-by-page declutter pass

### Home (`src/pages/Index.tsx`)
- **Hero subhead**: bump from current size to `text-lg md:text-xl text-foreground/85` and shorten to ≤22 words.
- **Trust strip** (under hero): convert the prose paragraph to a `StatCard` row of 3 (Years served · Areas covered · Rural-spec focus).
- **Services preview**: replace the 3 vertical paragraph blocks with a **3-up `InfoCard` grid** — eyebrow, 18px title, 16px 2-line desc, arrow link. Cap each desc at ~22 words; cut anything over.
- **"Approach" section**: convert the long narrative into a **4-tile bento** (Plan · Build · Finish · Stand behind) with one sentence each. Delete the ~120 words of bridging prose.
- **Service Areas**: replace the long list+postal-code paragraph with a **2×2 bento** of the four areas, each tile = name (serif), postal prefix as eyebrow, one 12-word descriptor. Drop the inline FSA explainer.
- **Testimonial spine**: keep but enforce `text-xl` minimum on the quote and `text-base` on attribution (currently some attribution drops to ~13px effective).
- **FAQ**: collapse from 5 items to 4 (merge the two near-duplicates about consultation and process). Each answer capped at 35 words.

### About (`src/pages/About.tsx`)
- Cut the 3rd story paragraph (redundant with Hero). 
- Convert "How we work" into a **3-step `InfoCard` row** with numbered eyebrows.
- All body copy → `text-lg leading-relaxed text-foreground/85`.

### Services pages (Interior / Exterior / Decking)
- Top section: hero stat row using `StatCard`.
- "What's included" lists → **2-column bento tiles** (icon optional, title + 1 line). Cuts ~40% of vertical real estate.
- Remove the long "Process" prose; replace with a 4-step horizontal stepper card.

### Work (`src/pages/Work.tsx`)
- Project descriptions: drop from current paragraph length to **one headline + one 18-word caption** per project. The image carries the story.

### Service Area pages
- Same bento treatment as the home preview, plus a single 2-sentence "Why we serve here" card. Delete the duplicate FSA paragraph.

## E — Live style guide route (`/style-guide`)

New page `src/pages/StyleGuide.tsx`, lazy-loaded, **excluded from sitemap & robots** (matches RoyalMechanical's pattern). Renders:

1. **Color tokens** — every CSS var swatch, contrast ratio vs background printed beside it.
2. **Type scale** — every `HEADLINE`/`BODY`/`EYEBROW` token rendered with copy-to-clipboard chip.
3. **Spacing scale** — visual ruler.
4. **Surface library** — `PremiumCard`, `StatCard`, `InfoCard`, `BentoGrid` rendered live.
5. **Motion timing** — the four cubic-beziers with hoverable demos.
6. **Don'ts panel** — 6 hard rules with red-bordered fail examples (tiny body, muted long paragraph, naked stacked text, etc.) so a future contributor can't claim ignorance.

## F — STYLE_GUIDE.md rewrite

Replace the current 717-line markdown (still says "B&P Sauna" in the title) with a Haven Creek-correct version that:
- Documents the new typography + spacing tokens
- Lists the **legibility hard rules** (body ≥16, label ≥12, no muted long-form, line-length 62ch, contrast ≥4.5:1)
- Documents `StatCard` / `InfoCard` / `BentoGrid` usage
- Points to the live `/style-guide` as the canonical reference

## G — Performance & a11y guardrails

- New components are tree-shakable, no new icon packages, no new fonts.
- `/style-guide` is **lazy** + carries `<meta name="robots" content="noindex">` and is added to `Disallow:` in `public/robots.txt`.
- Bento + InfoCard images use `loading="lazy"` + `decoding="async"` and respect existing `content-visibility` standard.
- Run a quick contrast pass: any `text-muted-foreground` used on `bg-card` is auto-promoted to `text-foreground/75` (passes 4.5:1).

## H — Memory updates

- Add `mem://standards/legibility-floor`: "Body ≥ text-base (16px). Labels ≥ 12px. Never apply `text-muted-foreground` to multi-line paragraphs."
- Add `mem://architecture/typography-spacing-tokens`: pointer to `src/lib/typography.ts` + `src/lib/spacing.ts` as the only sources of type/spacing classes.
- Add `mem://features/bento-layout`: when a section lists 3+ peer items, default to `BentoGrid` or `InfoCard` row, not stacked paragraphs.
- Add to Core: "Live style guide lives at /style-guide — noindex, never linked from primary nav."

---

## Files to create

- `src/lib/typography.ts`
- `src/lib/spacing.ts`
- `src/components/ui/StatCard.tsx`
- `src/components/ui/InfoCard.tsx`
- `src/components/ui/BentoGrid.tsx` (+ `BentoTile`)
- `src/pages/StyleGuide.tsx`

## Files to edit

- `src/pages/Index.tsx` (declutter + bento conversion)
- `src/pages/About.tsx`
- `src/pages/Services.tsx` + `Interior/Exterior/Decking`
- `src/pages/Work.tsx`
- `src/pages/areas/*` (4 files — bento + caption tightening)
- `src/components/ConsultationForm.tsx` (form-error size bump)
- `src/App.tsx` (add `/style-guide` lazy route)
- `public/robots.txt` (Disallow: /style-guide)
- `public/sitemap.xml` (ensure not included)
- `STYLE_GUIDE.md` (full rewrite for Haven Creek)
- `.lovable/memory/index.md` + new memory files

## What we are explicitly NOT doing

- Not touching the navigation chrome (Round 7 is locked in).
- Not adding new colors, new fonts, or a dark mode.
- Not adding heavy bento animation — entrance reveal only, reuses existing `RevealSection`.
- Not introducing a UI library or icon pack.

---

**Outcome**: Every page becomes scannable within 5 seconds. Body copy is 16–18px everywhere. Long lists become bento tiles. A live `/style-guide` enforces consistency for every future change.

