## Cleanup pass — calm the rhythm, honor the questionnaire

The site currently layers a lot of editorial scaffolding on top of work that the questionnaire wants kept plain (no testimonials, no "Service No." chrome, no over-design, no hard sell). FlexServices reads cleaner because each section does one job and the page moves Hero → Trust → Services → Process → Work → Areas → Close without ornamental detours. We'll mirror that cadence while keeping our editorial type voice.

### What changes

**1. Home (`src/pages/Index.tsx`) — fewer sections, clearer arc**

New order:
```text
Hero
Trust strip (2 cards — keep)
ServicesGrid (NEW — replaces ServiceMarquee)
HowItGoes (keep)
Areas bento (keep)
BigCloseCTA (keep, full variant)
```

Drop: `ServiceMarquee` (huge 3-panel scroll moment), `PhotoMoment`, `TestimonialSpine`, the cream↔evergreen `SectionTransition` pair around them.

Why: the marquee + photo moment + testimonial dark band is the bulk of the "lots going on" feel. FlexServices uses one tight `ServicesOverview` card grid in the same slot. The questionnaire explicitly says no testimonials — `TestimonialSpine` retires.

**2. New `src/components/ServicesGrid.tsx`**

Three side-by-side cards (stack on mobile) — one per service. Each card: small photo (16:10), service title, one-line promise, three-bullet scope, "See [service]" ghost arrow. No big numerals, no "Service I/II/III" eyebrow, no alternating left/right layout. This is the questionnaire's "three services, plain" shown plainly.

**3. Service detail pages (`InteriorFinishing`, `ExteriorFinishing`, `Decking`)**

Collapse from 4 sections to 3:
- §I "Meaning" + §III "Craft" merge → one section with the lede + a 3-card craft row underneath. Drop the separate "Details we obsess over" bento (the craft cards already cover it).
- Strip "Detail 01 / Detail 02" eyebrows on InfoCards (matches the no-editorial-cosplay rule). Cards get a short title only.
- Keep §IV Proof and the compact `BigCloseCTA`.
- `SubPageHero` vignette: swap the typographic `InteriorVignette` bezel for the real `photography.serviceInterior` (resp. exterior/decking) photo. Less abstract chrome up top.

**4. `Services.tsx` index page**

Same simplification: drop the `numeral-disc` + animated rule on each row, drop "in order of where the craft shows most" framing (reads as ranking sales-talk), keep three plain `PremiumCard` rows with photo + title + promise + detail paragraph + arrow. Keep the "About quotes" section and the close.

**5. Retire / prune**

- Delete `src/components/TestimonialSpine.tsx` and remove its imports.
- Delete `src/components/PhotoMoment.tsx` (no longer referenced).
- Delete `src/components/ServiceMarquee.tsx` (replaced by `ServicesGrid`).
- Remove the now-unused `numeral-disc` styles from `src/index.css` and any leftover `.surveyor-frame` / `[data-line-draw]` declarations flagged earlier.
- `src/lib/pageSections.ts`: home rail anchors become `services-preview`, `how-it-goes`, `areas` (the new `ServicesGrid` keeps the `services-preview` id so the rail keeps working).

### Guardrails (questionnaire + memory)

- No testimonials anywhere. No FAQ block on home (we keep the JSON-LD only, for SEO; no visible FAQ accordion).
- No "Service No.", "Plate", "Edition", "Fig." labels reintroduced.
- No floating CTA, no sticky mobile bar (memory rule).
- Two-business-day reply line stays only in the allowed spots (Hero, ConsultationForm helper, ThankYou hero, Contact rail, QuickContactSheet, BigCloseCTA, meta).
- Cream↔evergreen handoffs that remain still go through `SectionTransition`.
- Lead form stays the 3-field wizard; not touched in this pass.

### Files touched

Edit: `src/pages/Index.tsx`, `src/pages/Services.tsx`, `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx`, `src/components/SubPageHero.tsx` (allow photo prop if needed), `src/lib/pageSections.ts`, `src/index.css`, `mem://index.md` (note testimonial retirement + grid replaces marquee).
Add: `src/components/ServicesGrid.tsx`.
Delete: `src/components/TestimonialSpine.tsx`, `src/components/PhotoMoment.tsx`, `src/components/ServiceMarquee.tsx`.

Approve and I'll execute.
