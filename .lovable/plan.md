# Visual cleanup pass — "less going on, easier to navigate"

Goal: keep every page reading like ONE quiet idea per section, the way FlexServices does. Strip ornamental chrome, remove dead components, collapse the busy service-page rhythm.

## Tier-0 guardrails (non-negotiable, from questionnaire 1.3)
- ✅ KEEP: Home · About · Project Gallery (Work) · Services · Contact · Service Areas
- ❌ NEVER add: Testimonials section, FAQ section, Process/How-It-Works as a nav page, sticky mobile CTA, urgency timers, hard-sell copy, pricing
- Mood targets: warm, calm, simple, elegant, durable, clear. Avoid: busy, over-designed, generic, corporate.

What FlexServices does that we **will** borrow:
- One section = one idea = one CTA. Generous vertical breathing room.
- Below-the-fold lazy-loading (we already do this).
- A single short hero, then a quiet trust strip, then services, then proof, then contact.

What FlexServices does that we **will NOT** borrow:
- FAQ accordion, Testimonials carousel, Sticky mobile CTA, Urgency banner, Guarantee panel.

## 1. Service-detail page rhythm — strip the surveyor scaffolding
The exterior/interior/decking pages are the worst offenders for "lots going on": every section uses a different visual device (bento, surveyor frame with dotted line + numeral discs, premium card). Standardize to ONE pattern per service page:

For each of `/services/interior-finishing`, `/services/exterior-finishing`, `/services/decking`:
- **Hero** (SubPageHero) — keep.
- **§ I What it covers** — keep BentoGrid 2x2. Remove the redundant intro grid (col-7 header + col-5 paragraph). The lede already lives in SectionHeader.
- **§ II Considerations / Materials / Why** — convert from "surveyor-frame + dotted line + numeral-disc" ornament to a clean 2-column list (label · body) inside SectionHeader. This is the single biggest source of visual noise.
- **§ III Property respect / extra block** — keep BentoGrid (auto). Already calm.
- **§ IV Project proof** — keep PremiumCard.
- **Closing** — replace remaining `<ClosingCta numeral="V">` with `<BigCloseCTA variant="compact" />` (memory rule already says this; ExteriorFinishing still uses the old one).

Net result: 4 sections, 3 visual archetypes (hero · bento · proof card), 1 close. Consistent across all three service pages.

## 2. Retire dead/duplicate components
Search-and-remove imports, then delete the files:
- `src/components/ClosingCta.tsx` — superseded by `BigCloseCTA`. Memory already says "ClosingCta is retired"; the file just hasn't been deleted.
- `src/components/ChapterSpine.tsx` — confirm zero imports; delete if so.
- `src/pages/StyleGuide.tsx` — internal route; remove from router and delete (it's dev cruft that ships).

## 3. Home page — tighten the trust strip
`/` has Hero → trust-strip (3 stat cards) → HowItGoes → ServiceMarquee → PhotoMoment → TestimonialSpine → areas → BigCloseCTA. That's 7 sections before the close. FlexServices uses 5.

- Drop the "Cory · Owner-builder / Replies personally" stat card — it duplicates what BigCloseCTA already says ("Cory replies personally"). Trust strip becomes 2 cards (Reply · Areas served), centered.
- Keep TestimonialSpine — it's framed as a single quote, not a carousel, so it doesn't violate the "no testimonials section" rule (it's editorial proof, not a testimonials page). But re-label memory note to clarify.
  - **If you'd rather honor the questionnaire literally and remove TestimonialSpine entirely, say so and I'll cut it.** This is the one judgement call I want explicit approval on.

## 4. Section rhythm — kill the `surveyor-frame` ornament globally
Grep `surveyor-frame|surveyor-tr|surveyor-bl|numeral-disc-survey|data-line-draw` and remove. These are art-school chrome (tier-0 forbids "over-designed"). Replace usages on Interior/Decking with the same clean 2-col list.

## 5. Spacing & typography normalisation
- Audit `SECTION_PADDING` usage — every page should use `.standard` or `.compact`, never inline `py-*`.
- Confirm every section hero uses `SectionHeader` (drop any leftover hand-rolled eyebrow + h2 stacks).

## 6. Navigation — already cleaned in prior turns
No changes. Glass-on-scroll nav, mobile scrim, FLIP underline, real-anchor section rail are all in place.

## Files to edit
- `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx` — replace surveyor sections with clean 2-col lists; swap `ClosingCta` → `BigCloseCTA variant="compact"`; drop the redundant intro-grid pattern in § I.
- `src/pages/Index.tsx` — drop the third stat card.
- `src/components/ClosingCta.tsx` — delete.
- `src/components/ChapterSpine.tsx` — delete if unused.
- `src/pages/StyleGuide.tsx` + `src/App.tsx` route — delete + remove route.
- `src/index.css` — remove `.surveyor-frame`, `.surveyor-tr`, `.surveyor-bl`, `.numeral-disc-survey`, `[data-line-draw]` blocks.

## Out of scope (future passes)
- Photography swap-in for the typographic vignettes.
- Work/Project Gallery filter UX.
- Footer cleanup.

## Decision I need from you
Question 1 above: do you want **TestimonialSpine kept** as editorial proof, or **removed** to honor the literal "no testimonials" line in the questionnaire? Default if you don't answer: keep (single quote, not a section). Either way I'll proceed with everything else.
