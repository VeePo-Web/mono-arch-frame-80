# Reformat "Where we work" — editorial pass

Match the grammar we just landed on "How we work": eyebrow + tight headline, hair rule, a short lede paired with an italic serif pull-quote, then the area list rendered as a clean typographic stack instead of the noisy 2-col grid with repeating "AB" chips.

## What changes (in `src/pages/About.tsx`, lines 108–136 only)

**Header block (unchanged grammar, tightened copy)**
- Keep `t-eyebrow` "Where we work" + `t-section` headline "Across the foothills."
- Add the same 1px `border-t border-foreground/12` divider used in "How we work" (mt-14 / mt-16).

**Lede + pull-quote row** (new, mirrors How we work)
- Left, `lg:col-span-7`, `t-lede text-foreground/90 max-w-[58ch]`:
  > "Foothills work, mostly. Wooded acreages, working properties, and established country homes west and north of Calgary — places where access, weather, and respect for the land shape every decision."
- Right, `lg:col-span-4 lg:col-start-9`, italic serif pull-quote with the 32px evergreen hair rule above it:
  > "If we can get there in a morning, we can take care of it."

**Area list** — replace the 2-col grid + "AB" chips with a single typographic column
- "In the area" eyebrow divider row (matches "In practice" on the section above).
- Render `serviceAreas` as a clean `<ul>`:
  - Single column at every breakpoint, full-width hair rule between rows.
  - Each row: area name in `.t-title text-foreground` (left), the area's existing `shortLine` in `.t-micro text-foreground/60` (right, hidden < md). No "AB" tag — Alberta is already named in the eyebrow context.
  - `.row-wash` hover, `data-reveal` stagger 90ms apart.
- Quiet closing line below the list, `.t-micro text-foreground/60 mt-8`:
  > "Outside this radius? Send a note — we'll tell you straight."

## Out of scope
- No copy changes to How we work, Hero, BigCloseCTA.
- No data file changes (`serviceAreas.ts` stays as-is; we just surface `shortLine`).
- No new components, no new tokens — uses `.t-eyebrow`, `.t-section`, `.t-lede`, `.t-title`, `.t-micro`, `.row-wash`, `border-foreground/12`, evergreen hair rule, `data-reveal`.
- Memory index: tweak the About line to note the section now uses the lede + pull-quote + single-column rail grammar (no "AB" chips, no 2-col grid).
