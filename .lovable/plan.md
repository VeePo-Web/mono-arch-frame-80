
# Editorial Upgrade — Single Goal: Request a Consultation

The persona doc is unambiguous. **Steady Steward Sam** arrives "cautious, selective, quietly skeptical." The job in the first 5 seconds is *not* to impress — it's to **dispel fear and prove fit**. The current site looks calmer than before, but it still **buries the conversion**, **answers none of Sam's seven explicit objections above the fold**, and **treats the consultation form as a footer afterthought**. We fix that with a focused, subtractive, conversion-architected pass.

Filter for every change:
1. **Elevate the human experience** → Sam should feel *seen* in the first viewport.
2. **Embody brand truth with excellence** → calm rural editorial, not flashy urban.
3. **Innovate responsibly for impact** → every element earns its space against the consultation goal.

---

## Diagnosis (what's still wrong after the declutter)

1. **Hero has no conversion gravity.** Headline is fine, but the right column is "No. 001 / Bragg Creek / Bearspaw / …" — *colophon vanity*, not trust. Sam doesn't care about an issue number. He cares: *Will you respect my home?*
2. **Form is buried.** It lives only in § VI of the home page, after **5 sections** and ~6,000 px of scroll. Sam's mindset is "I need to know I can trust you first" — but if he *is* convinced earlier, there is no nearby invitation.
3. **Sam's 7 named fears are nowhere addressed.** The persona names them verbatim ("Will this person respect my property?", "Can I trust them around my home?", "Will I be dealing with too many people?", "Will the project be handled properly?", "Can this contractor support future projects too?", quote anxiety, fit anxiety). The site never speaks them back.
4. **No proof signals near the CTA.** No reviews, no neighbor names, no "two business day reply" promise, no "no obligation" reassurance. The form asks for a name, email, project, *budget*, and a preferred contact time before any trust has been deposited — that ordering is a conversion killer for a cautious persona.
5. **Navigation has 6 links (Work, Services, Areas, About, Journal?, Contact) but no visible CTA in the calm scroll state** — the consultation request only becomes an island when scrolled. The single goal should always be one click away.
6. **Sub-page heroes still carry `coordMark` props** ("Section · About") that render as nothing (CSS retired) but pollute the JSX. The `numeral`/`coord` props on `Eyebrow` and `SubPageHero` should be deleted so the API matches the design.
7. **Service cards are well-paced but don't reduce fear.** Each card explains what we *do*; none explain how we *behave* (one contractor, no rotating trades, leave-as-found, phased-friendly). That's the fear-dispelling content Sam actually scans for.
8. **Form UX adds friction.** Budget is a required dropdown ("Quote Anxiety" is named in the persona). It should be optional, with a "Not sure yet" affordance. The submit button should look like an invitation, not a transaction.
9. **Color cadence is monotone.** Warm off-white + evergreen everywhere reads soft — but without one *quiet, dignified* deep-evergreen anchor moment to give weight to the CTA, the eye never lands.
10. **No reviews / testimonials anywhere.** The persona doc explicitly lists "Testimonials or review excerpts when available" as evidence Sam looks for. Even a single, real-feeling quote is high-leverage.

---

## The redesign — section by section

### A. Navigation (always-on conversion handle)

- Keep the floating pill, but make the **"Consultation"** link a filled evergreen pill at all scroll states (not just scrolled). Sam should never have to hunt.
- Mobile: the menu sheet ends with a full-width evergreen "Request a Consultation" button.
- Files: `src/components/Navigation.tsx`.

### B. Home Hero — single viewport, single ask

Replace the right colophon with a **silent reassurance stack** that *speaks* to Sam in calm Inter caps, then make the CTA cluster carry the trust copy underneath.

Layout (desktop, lg+):
```
EYEBROW: HAVEN CREEK · RURAL ALBERTA
H1 (cols 1–9): Trusted renovations
              for rural homes.
P  (cols 1–7): Hands-on finishing, repairs, and decks — from
               planning through completion. One contractor,
               one relationship, no rotating trades.
[ Request a Consultation → ]   View the work →
↑ small line under CTAs:  Reply within two business days · No obligation · No pressure

Right (cols 10–12, top-aligned):
  ─── Trusted by homeowners in
  Bragg Creek · Bearspaw
  Rocky View · Water Valley
  ─────────────
  ★★★★★ "Quote from a real client when available, ≤ 22 words."
        — Initial L., Bragg Creek
```

- The right column becomes a **proof column**, not a colophon. If we don't have a real review yet, render a placeholder that's marked TODO in code, and use a quiet "Trusted in" panel only.
- Drop "No. 001" entirely.
- Move the trust-microcopy ("Reply within two business days · No obligation · No pressure") *immediately under the CTA* — that single line answers three of Sam's fears at once.
- Files: `src/components/Hero.tsx`.

### C. Home § I — Replace "The Promise" with **"Built around what you're worried about."**

This is the single biggest change. We take Sam's seven verbatim fears and answer them on the page in a calm two-column ledger.

```
EYEBROW: WHAT YOU'RE PROBABLY THINKING
H2 (lg col 5): The seven things
               most rural homeowners
               want to know first.
Sub (lg col 5): Said plainly. Answered the same way.

Right (lg col 7):
01  Will you respect my property?       →  Yes — access, animals, equipment, and clean-up are part of the deliverable, not afterthoughts.
02  Can I trust who's in my home?        →  The same person plans the work, does the work, and walks the finish with you. No rotating trades.
03  How many people will be coming and going? →  As few as the work allows. Most days it's one or two familiar faces.
04  Will it actually be finished — or just done? →  Fit, edges, transitions, and the small details decide that. They're the work, not extras.
05  Can you support phased projects over years? →  Yes. Many of our clients improve their property one stage at a time. We're built for that pace.
06  How does pricing work?                →  Custom, written plainly, after we see the property. No template numbers, no surprises.
07  What happens after I reach out?       →  A real reply within two business days. No funnel, no pressure. We talk first; we walk it second.
```

- Each row: numeral disc · question (Fraunces italic, foreground) · hairline · answer (Inter, muted).
- Below the ledger, a single sentence + ghost CTA: *"If any of those answered your fear, the next step is a quiet conversation."* → **Request a Consultation** (anchor jumps to the inline form farther down OR opens /contact — see § F decision).
- Files: rewrite Home § I in `src/pages/Index.tsx`.

### D. Home § II — Services, but **fear-aware**

Each of the three service cards gains one short line under the body that addresses behavior, not scope:
- *Interior Finishing* — "Trim, transitions, and the details that decide whether a room reads as finished." → behavior line: "One contractor on site. Cleaned up daily."
- *Exterior Finishing & Repairs* — current body. → "Walked with you before, during, and after."
- *Decking* — current body. → "Built to last the next twenty Alberta winters."

- Drop "See the work →" arrow chip from cards (it duplicates the gallery preview directly below). Replace with a quiet ghost link "Read the service" so the dominant CTA on the page stays "Request a Consultation."

### E. Home § III — Approach (already good, one tweak)

- After the three steps, append a single calm sentence + button:
  *"From conversation to completion, you talk to one person."*
  **[ Start that conversation → ]** (links to /contact or jumps to inline form per § F).
- Otherwise unchanged.

### F. Home § IV — Work preview (proof Sam needs)

- Keep three-up grid.
- **Add one client micro-quote per card** (12–18 words) underneath the scope line. If we don't have real quotes, use neutral copy like *"Walked the project with us start to finish."* and mark TODO.
- The *"See all work →"* link stays.

### G. Home — **NEW § V — Trust panel**

A single full-bleed section, off-white, with three quiet columns:
- *Local* — Bragg Creek · Bearspaw · Rocky View · Water Valley · 4 communities served.
- *Hands-on* — One contractor across planning, work, and walk-through.
- *Long-term* — Built for clients improving their property in phases, over years.

Each column: a small numeral, a 2–3 word title, one Inter sentence. No ornament.

### H. Home § VI (was § V) — Service Areas roster

- Already strong. Keep, but tighten typography (less line-height) so it occupies less vertical real estate, since we're adding § V (Trust) above it.

### I. Home § VII (was § VI) — **The Final CTA, restaged**

This is where we earn the click. Currently a deep-evergreen band with a list + form. Keep the band, restage the contents:

Left column (lg col 6):
```
EYEBROW: NEXT STEP
H2: A quiet conversation about your property.
P:  No template quote. No pressure. We reply within two business days.
P:  If you'd rather not use a form: hello@havencreekrenovations.ca · (403) 555-0100
4 promise lines (current)
```

Right column (lg col 6) — the form, but shortened and re-ordered for a cautious lead:
1. Name
2. Email *or* phone (one row, "How should we reach you?")
3. Property location (free text — "Bragg Creek", "an acreage near Water Valley", etc.)
4. What you're considering (textarea, 3–4 lines, optional)
5. *(Optional, collapsed by default)* "Add timing or budget context →"
   - Reveals: preferred time + budget range, both optional.
6. Submit: **"Request the conversation"** (not "Submit"). Subline under: *"We'll reply within two business days. No obligation."*

Why: cautious-lead psychology. Required friction → optional clarification. The form should *feel* like writing a note, not filing a request.

- Files: `src/pages/Index.tsx` § VI restage; `src/components/ConsultationForm.tsx` field-order + optionality refactor; `src/lib/validation/consultation.ts` make `budget` and `preferredTime` optional in the schema.

### J. Sub-page heroes — clean the API

- Delete `eyebrowNumeral` and `coordMark` props from `SubPageHero` (they render nothing now). Update every page that uses them: `About.tsx`, `Work.tsx`, `Services.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ServiceAreas.tsx`, `Contact.tsx`, `ThankYou.tsx`, `NotFound.tsx`, the four area pages.
- Same pass on `Eyebrow` — drop the `numeral` prop entirely (keep `tone` and `align`).
- Files: `src/components/SubPageHero.tsx`, `src/components/Eyebrow.tsx`, all consumers.

### K. Footer — already simplified, two adjustments

- Add a closing line in the rightmost column: a small **"Request a consultation →"** link in evergreen so the footer carries the conversion goal too.
- Add the response-window promise once: *"Reply within two business days, Mon–Fri."*
- Files: `src/components/Footer.tsx`.

### L. Contact page — restage same form, drop dual-numeral noise

- The "What happens next" 4-step ladder uses `numeral-mark` (already retired) — replace with the new `numeral-disc` so it matches the home page numerals visually.
- Drop the Roman numeral on every Eyebrow (`I`, `II`, `III`).
- The form gets the same field reorder and "Request the conversation" submit copy.
- Files: `src/pages/Contact.tsx`, plus shared form changes.

### M. CSS / system additions

- Add a **`.trust-microcopy`** utility: tiny Inter, muted, hairline-separated row used under the hero CTA (`Reply within two business days · No obligation · No pressure`).
- Add a **`.fear-row`** pattern for § I ledger: grid of `[numeral-disc][question (italic)][hairline-leader][answer]`.
- Add a **deep-evergreen pill button** variant to the existing CTA: same evergreen but with a 1px inset highlight + slightly heavier shadow so it carries more weight on the closing band and on every page.
- Tighten section padding cadence: home uses `py-28 md:py-40`; sub-pages use `py-24 md:py-32`. Keep, but bump the closing CTA on home to `py-36 md:py-48` so it lands as the *destination*, not a footer.
- File: `src/index.css`.

### N. Accessibility & motion sanity

- The `vignette-stroke` underline animation on "Trusted" stays — single signature.
- All new fear-row buttons keep `min-h-[44px]` per the project's mobile touch-target rule.
- Every new CTA inherits the existing focus-visible ring (`ring-evergreen + offset-background`).
- Form: required fields have `aria-required`, the optional reveal is a real `<details>` (or controlled `aria-expanded` button) so keyboard users can open it.

### O. Out of scope (deferred — but will ship in next loop)

- Real photography (still SVG vignettes; B&W rural photos are the natural next upgrade).
- A live "Recently completed" ribbon at the top of /work.
- A short "What we *don't* do" page (sets fit expectations honestly — high trust, but it's a content add we'll plan separately).

---

## Files this loop will touch

1. `src/components/Hero.tsx` — restage right column to proof, add trust-microcopy under CTA, drop "No. 001".
2. `src/components/Navigation.tsx` — always-on filled "Consultation" pill, mobile-sheet primary CTA.
3. `src/components/Eyebrow.tsx` — drop `numeral` prop.
4. `src/components/SubPageHero.tsx` — drop `eyebrowNumeral` + `coordMark` props.
5. `src/components/Footer.tsx` — add closing CTA + response-window line.
6. `src/components/ConsultationForm.tsx` — field reorder, optional fields, copy ("Request the conversation"), collapsed "timing & budget" group.
7. `src/lib/validation/consultation.ts` — make `budget` + `preferredTime` optional.
8. `src/pages/Index.tsx` — major restructure: new § I (fear ledger), new § V (trust panel), restaged § VII (final CTA).
9. `src/pages/Contact.tsx` — replace `numeral-mark` numerals with `numeral-disc`, drop eyebrow numerals.
10. `src/pages/About.tsx`, `src/pages/Work.tsx`, `src/pages/Services.tsx`, `src/pages/Decking.tsx`, `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/ServiceAreas.tsx`, `src/pages/ThankYou.tsx`, `src/pages/NotFound.tsx`, four `src/pages/areas/*.tsx` — strip removed props.
11. `src/index.css` — `.trust-microcopy`, `.fear-row`, refined CTA pill, padding cadence.

No new dependencies. No new images. All changes are subtractive on chrome and additive on conversion architecture.

---

## Verification

- Build passes (no TS errors from removed props).
- Home: scroll the page; the consultation goal should appear in **viewport 1** (hero CTA), **viewport 2** (fear ledger answer-line CTA), **viewport 4** (after Approach), **viewport 7** (final CTA), and **persistently in nav + footer**. That's the conversion gravity Sam needs.
- Read § I aloud — every line should be a verbatim or near-verbatim answer to a persona-listed fear.
- Form submission still works on `/` and `/contact`; success behavior unchanged.
- Mobile: open the menu, the bottom CTA is a primary evergreen pill.
- Lighthouse: should hold (no new images, fewer deleted props mean fewer renders).

This loop is the conversion architecture. The next loop will commission real client copy + neighbor names + (eventually) one B&W hero photograph — those are content fills against the structure we lay down here.
