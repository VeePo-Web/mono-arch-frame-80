# Round 15 — Editorial hero + truthful image titles

Two tightly scoped changes. No new pages, no new routes.

---

## 1. Hero — add a world-class photo plate (RoyalMechanical style)

Today the home Hero is type-only. Replace it with a 12-col editorial split that mirrors RoyalMechanical's plate-and-caption format, adapted to Haven Creek's cream + evergreen palette (no gold, no uppercase headlines, no "Plate / Folio" cosplay — those stay banned per existing memory).

### Layout (lg+)
- 12-col grid, `gap-16 lg:gap-20`, `items-start`.
- **Left col (cols 1–5)**: same content as today — eyebrow rule + small label, stacked H1 (`text-display`, two lines), subhead, single solid evergreen CTA "Get a Free Quote".
- **Right col (cols 6–12)**: `<figure>` with:
  - Thin caption row above the plate: 24px evergreen hairline + small label `Recent work · Bearspaw` (no "01 /", no "Edition", no folio numerals).
  - 16:10 photo plate, `rounded-sm`, soft warm shadow, 1px inner evergreen/15 ring (matte-board feel).
  - Caption strip below: project title (serif) on the left, area + category small-caps on the right. No years counter.
- Mobile (<lg): photo stacks **below** the type, full-width 4:5 aspect, same caption strip. Type stays first so LCP is text.

### Photo
Use `workBearspawWraparound` (the wraparound deck) as the hero plate — it's the most recognizable "rural Alberta finished work" frame we have. Eager-load with `fetchPriority="high"`. Add a matching responsive `<img>` (single source — Vite already hashes; no srcset rewrite needed).

### Memory rule changes
- Lift the "Hero is type-only, no side photograph" Core line.
- Replace with: *Home Hero is a 12-col editorial split — type left, single 16:10 photo plate right with a quiet caption strip. Mobile stacks photo below type. Same typographic grammar as `SubPageHero`. No folio chrome, no gold rule, no uppercase H1.*
- Keep the bans on "Plate N / Edition / Fig. / Section No." chrome — the caption is plain English only.
- `SubPageHero` stays type-only (unchanged).

---

## 2. Image titles — make every one literally describe the photo

Right now several titles are abstract ("Exterior craft & detail work", "Structural & roofline work"). The user wants captions you could verify against the photograph at a glance. Rewrite `galleryPlates[].title` so each one names the actual subject of its image. Filenames already describe the real subject — use those as the source of truth.

| slug | new title |
|---|---|
| bragg-creek-trim-transitions | Interior trim & room transitions |
| water-valley-builtin-shelving | Built-in library shelving |
| rocky-view-siding-repair | Cedar siding repair & refinish |
| bearspaw-soffit-fascia | Soffit & fascia rebuild |
| bearspaw-wraparound-deck | Wraparound cedar deck |
| water-valley-stepdown-platform | Step-down deck & stair |

These read truthfully against the actual photographs (siding photo shows siding, soffit photo shows soffit, etc.) and stay short enough for the tile caption row.

Apply everywhere titles render: Work grid, RecentWorkPreview grid, Hero caption strip, and any JSON-LD that pulls from `galleryPlates`.

---

## Files touched

- `src/components/Hero.tsx` — rewrite to 12-col editorial split with photo plate + caption.
- `src/data/galleryPlates.ts` — update the six `title` fields.
- `src/index.css` — add a small `.hero-plate` shadow/ring utility (one rule, no new keyframes).
- `mem://index.md` — swap the type-only Hero rule for the new editorial-plate rule; keep all other Core constraints intact.

No deletions. No route changes. `RecentWorkPreview`, `Work`, `BigCloseCTA`, sub-page heroes, footer, drawer — all untouched.

---

## Out of scope

- No regenerating photographs (titles are aligned to existing photos, not the other way around).
- No bringing back ServicesGrid / HowItGoes / per-project pages.
- No changes to SubPageHero — it stays plain type per existing rule.
