# Round 13 — The next layer of simplification

Round 12 collapsed the route map (8 → 5 routes, no per-service / per-area pages, single Work gallery). This round goes after the **section-level chrome** that's still making each page feel busier than Fantasy.co or RoyalMechanical. The throughline: one visual grammar across every page — type-led heroes, no decorative photo splits, no numbered ordered lists, fewer sections per page.

## What's still busy (and what we change)

### 1. Home `Hero` — type-only, kill the split-stage photo

Current `src/components/Hero.tsx` (150 lines) is a **two-column cinematic split**: H1 + CTA on the left, a 44%-wide right-anchored acreage photograph with mask gradient + radial bloom + ken-burns drift on the right. That's three layers of decoration before the user reads a word. Fantasy and RoyalMechanical lead with **type alone** — the photography lives below the fold in the gallery.

Replace `Hero.tsx` body with the same grammar as `SubPageHero`: type-only, single `Get a Free Quote` CTA, generous top padding. Drop the desktop photo stage, the radial bloom, the `useDrift` ref, the `photo-drift` ken-burns, the `photography.heroAcreage` import. Keep:
- Eyebrow line ("Hands-on renovation for rural Alberta")
- Italic-evergreen accent on the H1
- One primary CTA → `/contact`
- Existing `.reveal-up` clip-path stagger (it's the same motion `SubPageHero` uses)

Result: ~150 lines → ~55 lines, and home opens with the same calm typographic grammar as `/about`, `/services`, `/work`, `/contact`.

### 2. Home `ServicesGrid` — type-only, matches `/services`

Current `src/components/ServicesGrid.tsx` renders 3 large photo cards (16:10 imagery + eyebrow + title + promise + arrow) all linking to `/services`. That's the **only place left on the site** still using big photo cards, and it duplicates the `/services` page layout one breakpoint up.

Replace with the same 3-up text grid as `Services.tsx`: title + promise + cardBody, no photos, no border, no arrow. Eyebrow `What we do` + section heading `Three services. One standard.` stays. Card content is non-clickable (matches the new "services live as text, not links" rule). One-screen worth of content, half the bytes.

This retires the `servicePhotos` map usage in `ServicesGrid` and lets us prune the `serviceX.jpg/.webp` imports from `src/assets/photography/index.ts`.

### 3. Home — inline a 6-tile Work preview between Services and HowItGoes

Fantasy and RoyalMechanical both surface the gallery on the homepage so the visitor sees the work without a click. Add a new Home section **`Recent work`** that renders the first 6 plates from `galleryPlates` in the same 3-col grid as `/work`, with a quiet "See all work →" text link below the grid. Reuses `ProjectPlaceholder` + `workPhotos` — no new asset work.

Section order becomes: Hero → Services (type) → **Recent work (6 tiles)** → How it goes → Local, by choice → BigCloseCTA. Five typographic sections, one gallery section, one CTA. That's it.

### 4. About — fold "Property respect" into one paragraph

Current `/about` carries a **4-row numbered ordered list** ("Access", "Animals & family routines", "Equipment & materials", "Leave it as we found it") under a "Property respect" heading. That's a second list pattern after the Working Philosophy block — repetitive shape.

Replace the `<ol>` with a single 2-paragraph block under the same `Property respect` SectionHeader. Same content, distilled — one paragraph on what property respect means in practice (access, animals, equipment), one paragraph on the "leave it as we found it" close. Drops the `RESPECT` array + the `<ol>` chrome entirely.

Page becomes: Hero → Working philosophy (existing) → Property respect (now prose) → Where we work (existing rail) → BigCloseCTA. Four blocks, all consistent.

### 5. `Footer` — single horizontal row on `md+`

Current footer is a 4-column grid (brand · Pages · Where we work · Contact CTA) with a separate copyright row underneath — six visual chunks. Fantasy/Royal have a one-line footer. Collapse to:

```
[ logo + name ]    Pages: About · Services · Work · Contact    [ Get a Free Quote → ]
                              © 2026 Haven Creek Renovations · Alberta, Canada
```

Single flex row at `md+`, stack into 3 rows on mobile (brand → pages inline → CTA). The "Where we work" column moves out of the footer entirely — it already lives on `/about` and `/`. The brand tagline ("Hands-on renovation for rural and acreage homes…") moves to the copyright line as a faint right-side note, or is dropped (it's said in the Hero).

### 6. Retire orphan components + assets

After the Hero + ServicesGrid simplification, these files have no callers and can be deleted:
- `src/components/HeroVignette.tsx` (only consumed by old Hero)
- `src/components/ProjectVignette.tsx` (only consumed by old Hero / retired plate components per memory)
- `src/components/PremiumCard.tsx` — verify with `rg`; if only `Contact.tsx` still imports it, leave; otherwise delete
- `useDrift` hook — verify no other consumers; if Hero was the only one, delete `src/hooks/useDrift.ts`
- The `heroAcreage` and `serviceX` photo imports in `src/assets/photography/index.ts` (keep `workPhotos` — gallery still uses it)
- The `.photo-drift` keyframes in `index.css` if they're only used by the retired Hero photo stage

I'll run `rg -l` per symbol before each delete to make sure I'm not orphaning anything live.

### 7. Memory updates

Add to `mem://index.md` core:

> Home `Hero` is type-only — no side photograph, no radial bloom, no ken-burns drift. Same typographic grammar as every `SubPageHero`. Photography lives in the inline Work preview below, never in the hero.

> Home renders an inline 6-tile Work preview (first 6 of `galleryPlates` in the same 3-col grid as `/work`) so visitors see the work without a click. Below it: a single "See all work →" text link, never a button.

> Home `ServicesGrid` is type-only — three text blocks (title + promise + cardBody), no photo cards, no per-card link. One service treatment site-wide: identical on `/` and `/services`.

> About `Property respect` renders as 2 prose paragraphs — never a 4-row numbered ordered list. The "all numbered ordered-list rows render label-only" rule already covers this; this is the explicit follow-through.

> Footer is a single horizontal row at `md+` (brand mark · Pages inline · CTA) + one copyright line below. Never a 4-column grid. The "Where we work" rail belongs on `/about` and `/`, not in the footer.

Update the existing rule that says "Home now uses the calmer `ServicesGrid` (3 photo cards, side-by-side)" — it's now type-only, no photo cards.

## Files touched

**Edited:** `src/components/Hero.tsx`, `src/components/ServicesGrid.tsx`, `src/components/Footer.tsx`, `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/assets/photography/index.ts`, `src/index.css` (only if `.photo-drift` is now orphan), `mem://index.md`

**Deleted (after orphan-check):** `src/components/HeroVignette.tsx`, `src/components/ProjectVignette.tsx`, `src/hooks/useDrift.ts` (conditional)

## Out of scope — explicitly held back
- Pruning unused `scope/challenge/result/whyItMattered` fields from `galleryPlates.ts` (still untouched from R12; not visible in UI either way).
- Trimming `services.ts` to just the four fields the new Services page consumes.
- Real photography for `ProjectPlaceholder` (placeholder pattern stays).
- `/contact` and `/thank-you` — already match the simplified grammar.
- `HowItGoes` — kept as-is; it's already the right shape (3 quiet rows, no numerals).

## Verification
1. `rg -n "photography\.heroAcreage|photo-drift|servicePhotos|HeroVignette|ProjectVignette" src` → zero matches outside the asset index after pruning.
2. Home page renders in this order: Hero (type-only) → Services (text) → Recent work (6 tiles) → How it goes → Local, by choice → BigCloseCTA.
3. About page renders: Hero → Working philosophy → Property respect (prose, no `<ol>`) → Where we work → BigCloseCTA.
4. Footer is one horizontal row at `≥768px`, 3 stacked rows below.
5. `npm run` build (auto) reports no TS errors from removed exports.
