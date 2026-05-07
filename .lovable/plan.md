# Quiet-down Pass — Round 2

The structural cleanup is done (no more Plate/Edition/Roman numerals, no testimonials, ServicesGrid in place). What's still "busy" is **section chrome density** and **decorative typography**. FlexServices reads calm because each section has one job, one visible label, one heading, one body. Haven Creek currently stacks Eyebrow + SectionHeader.eyebrow + lede + pull-quote + bento + InfoCards on the same page repeatedly. This pass removes that.

Nothing here contradicts the questionnaire — still no testimonials, still property-respect, still 3 services + 4 areas, still "two business days," still "Get a Free Quote."

## What changes (page-by-page)

### Home (`Index.tsx`)
- No structural change. (Hero → ServicesGrid → HowItGoes → Areas → BigClose stays.)
- Tighten Areas bento intro: drop the "Where we work" eyebrow (the title "Local, by choice." plus the postal-code chips are enough of a signal).

### Hero (`Hero.tsx`)
- Remove the small "Haven Creek · Rural Alberta" eyebrow above the H1 — the logo already brands the page; this just adds noise.
- Remove the hand-drawn SVG underline under "trusted." Keep the italic evergreen word — that's the entire decoration budget.
- "Trusted in" line: drop the dual-typeface "TRUSTED IN" sans label + italic serif. Replace with one calm serif sentence: *"Working across Bragg Creek, Rocky View County, Bearspaw, and Water Valley."* Each area still links.
- Result: Hero shows H1 + subhead + 2 CTAs + one quiet trust line. Photo + drift untouched.

### Service detail pages (`InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx`)
The hero photo plate inside `bezel-shell` is a second hero competing with the H1. Each detail page also runs 3–4 sectionheaders with eyebrow+title+lede before the project-proof card.

- **Remove `vignette` from SubPageHero on all three service pages.** Hero becomes type-led + CTAs. The subsequent `PremiumCard` proof block already carries the photography.
- **Drop redundant section eyebrows** when the title is self-explanatory:
  - InteriorFinishing §I: keep title "Interior finishing is the work that holds the rest together." — drop "What the work covers" eyebrow and the italic pull-quote ("This is the part you see and feel every day...").
  - ExteriorFinishing §I: drop "What the work covers" eyebrow. §II keeps "Rural considerations" (it's load-bearing). §III "Property respect" — fold into §II as a final two-line note instead of its own bento section. Removes one full screen of repeated grid pattern.
  - Decking §I: drop "How we plan a deck" eyebrow. §III "Materials & scope" loses the bento of one-word chips ("New deck builds", "Multi-tier…") — those are scope items, not feature cards. Convert to a quiet two-column list under the §I planning trio. Removes one full section.
- **Project-proof block**: drop the standalone SectionHeader above the `PremiumCard` ("A recent interior, finished as it should be." / "Stewardship on a Rocky View acreage." / "A wraparound deck on a Bearspaw property."). The proof card already names project + area + scope. Replace with a single quiet eyebrow row above the card: `RECENT WORK`.

### Services index (`Services.tsx`)
- §II "Pricing is custom because the work is." — keep, but trim. Drop the italic-serif "Every quote includes…" line (it competes with the BigClose CTA below).

### About (`About.tsx`)
- §I Working philosophy: remove the entire pull-quote panel ("The experience of quality. The quality of experience." + "— The work, in one line."). It reads as a tagline shrine. Replace with a single SectionHeader on the left ("Working philosophy" eyebrow + "Held to two standards.") and the existing 2-paragraph body on the right. Cleaner, same content.

### ServiceAreas (`ServiceAreas.tsx`)
- Drop §II "Rural fit" entirely — it's a filler section (one centred SectionHeader, no list, no card). The roster + BigClose are enough.

### Contact (`Contact.tsx`)
- Drop the italic pull-quote on the sticky left rail ("The beginning of a relationship — not a sales trap."). The hero subhead already says this. Left rail keeps SectionHeader only.

### ThankYou (`ThankYou.tsx`)
- Collapse §II "While you wait" two-card grid and §III italic sign-off into one quieter footer block: a single line *"While you wait — see the work or browse services."* with two text links. Removes a full PremiumCard grid section that adds visual weight to a confirmation page.
- Keep the receipt stamp + "What happens next" ordered list — those are the page's job.

### Components touched (no new files)
- `Hero.tsx` — strip eyebrow, SVG underline, hybrid trust line
- `SubPageHero` usage — pass no `vignette` on the three service pages
- `Index.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Decking.tsx`, `Services.tsx`, `About.tsx`, `ServiceAreas.tsx`, `Contact.tsx`, `ThankYou.tsx` — content/structure trims as above
- No deletions, no new components, no schema/route changes

## What does NOT change
- Three services, four service areas, all routes, all CTAs, "Get a Free Quote" wording
- Two-business-days promise (kept where the rules allow)
- ServicesGrid layout, HowItGoes, BigCloseCTA structure
- Navigation, drawer, section rail, footer
- Photography assets, color tokens, typography scale
- Memory rules — none broken

## Memory updates
Add one new constraint after the pass:

> Service-detail SubPageHero is type-only — never pass `vignette`. Photography lives in the proof block lower down.

And:

> Sections render either an eyebrow OR a body lede, never both unless the eyebrow names a different category from the title.

## Acceptance check
- Each route, scrolled top-to-bottom, has ≥1 fewer "section with eyebrow + title + lede + grid" repetition than today
- No service-detail page shows two hero-scale photos (vignette + proof)
- About page has no standalone tagline panel
- ThankYou page is one continuous calm column, not three carded sections
