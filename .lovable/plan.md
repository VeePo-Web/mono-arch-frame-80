## Why another pass

The home page is now calm, but the supporting pages still wear the old "editorial magazine" costume the questionnaire forbids:

- `Services`, `Work`, `AreaPage`, `About`, `ThankYou`, `Contact` still render numeral discs, "HC" monograms, "Plate IV / V / VI", "Detail 01 · Scope / 02 · Challenge / 03 · Result / 04 · Why" grids, and the same "Cory replies within two business days" line shown twice on the same screen.
- `SelectedWorks.tsx`, `ServicePlate.tsx`, and `ProjectPlaceholder.tsx` still ship Roman-numeral overlays, and `SelectedWorks` is fully orphaned (zero imports).
- `index.css` still carries `.numeral-disc`, `.card-monogram`, `.coord-mark`, `.numeral-mark`, `plate-fade`, etc. that the cleanup leaves dangling.

The fix is mechanical: title-only rows, real photography or plain cards, and one promise per page.

## What changes (file by file)

**Home (`src/pages/Index.tsx`)**
- Drop the two-card "Trust strip" (`Reply 2 days` / `Areas served 4`). Both facts already live in Hero copy + footer + service-area bento. Section flow becomes: Hero → ServicesGrid → HowItGoes → Areas → BigCloseCTA. (Update `src/lib/pageSections.ts` to remove `#trust-strip` if listed.)

**Services (`src/pages/Services.tsx`)**
- Replace the bespoke "ServicePlate + featured card" rendering with the same `ServicesGrid` layout used on Home (3 photo cards, side-by-side). Keep the §II "Pricing is custom" prose block. Remove the `import ServicePlate` line.
- Update the page intro: `eyebrow="What we build"`, `title="Three services. One standard."` (drop "In order of where the craft shows most.").

**Work (`src/pages/Work.tsx` + `src/data/galleryPlates.ts` + `src/components/gallery/ProjectPlaceholder.tsx`)**
- Remove `romanNumeral` from `galleryPlates` data entirely.
- Update `ProjectPlaceholder` to stop rendering the Roman numeral overlay; show only the photograph (or a calm fallback tile when `photoSrc` is absent — title + area, no numerals, no `Fig.` text).
- In `Work.tsx`, drop the `romanNumeral` prop from the `<ProjectPlaceholder>` call.
- Filter rail stays; copy is fine.

**Area page (`src/components/AreaPage.tsx`)**
- Remove `<span className="card-monogram">HC</span>` and `<span className="coord-mark">Three services</span>`.
- In the "How we serve here" cards: drop `<span className="numeral-disc">{s.numeral}</span>` and the adjacent expanding rule. Title + promise + body + ghost link only.

**About (`src/pages/About.tsx`)**
- Property-respect list: remove the absolute-positioned `numeral-disc` badge; render as a clean `<dl>` or stripped `<ol>` with title + body, divider line between rows. Reads like FlexServices' principles list.

**ThankYou (`src/pages/ThankYou.tsx`)**
- "While you wait" cards: drop the `numeral-disc 01/02` badge. Card title + body + "Open" arrow only.

**Contact (`src/pages/Contact.tsx`)**
- Direct-contact rows: remove the `numeral-mark 01 / 02` glyphs. Two clean baseline rows (label left, EMAIL/PHONE right) — same restraint as the area roster on `ServiceAreas.tsx`.

**Service detail pages (`InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx`)**
- Project-proof card: replace the 4-cell `01 · Scope / 02 · Challenge / 03 · Result / 04 · Why it mattered` grid with a quieter labelled list — eyebrow = the label only ("Scope", "Challenge", "Result", "Why it mattered"), no leading "0N ·". Memory rule: title-only on detail rows.
- Drop the `lede="Cory replies within two business days."` prop on `BigCloseCTA` calls (the component already defaults to that exact line — passing it just re-states the same constraint and risks the "twice on one page" rule the next time the default changes).

**Service Areas (`src/pages/ServiceAreas.tsx`) and About**
- Same `lede` cleanup on their `BigCloseCTA` calls.

**Dead code removal**
- Delete `src/components/gallery/SelectedWorks.tsx` (zero imports).
- Delete `src/components/gallery/ServicePlate.tsx` once `Services.tsx` stops using it.
- (Keep `ProjectPlaceholder.tsx` — still used by `Work.tsx`.)

**CSS cleanup (`src/index.css`)**
Remove the now-dead utility classes and their dark-mode disables:
- `.numeral-disc` (and `.numeral-disc-survey` variants)
- `.numeral-mark`
- `.card-monogram`
- `.coord-mark`, `.coord-mark-light`
- `plate-fade` keyframes if only `SelectedWorks` used them
- Stale comments referencing "Plate", "Fig.", "Section No."

**Memory**
- Append a new core rule: *"Detail rows on service pages use the label as the entire eyebrow — never `01 · Label`."* (Already implied by the `no-editorial-cosplay` constraint memory; promote to Core for visibility.)

## Out of scope (do not touch this turn)

- Hero animation, navigation, drawer, route fade, ConsultationForm wizard — all already locked-in by memory.
- Photography swaps — current images stay.
- Gallery filter behaviour and copy.

## Acceptance check (visual QA after build)

1. Search the rendered DOM for "Plate", "Fig.", "Section No.", "0N ·", "HC" monogram — zero hits.
2. No page renders the words "Cory replies within two business days" more than once.
3. Home, Services, Work, ServiceAreas, About, Thank You, Contact, and the three service-detail pages all close with `BigCloseCTA` and contain no numbered discs anywhere in body content.
4. `rg "numeral-disc|card-monogram|coord-mark|numeral-mark|romanNumeral"` returns nothing in `src/`.

Approve and I will execute in one pass.