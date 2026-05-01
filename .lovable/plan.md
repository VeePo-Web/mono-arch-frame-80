## Apple UX Forensic Audit — Round 2

The site is editorially gorgeous but still asks the visitor to *read* before they can *act*. Sam (cautious rural homeowner) wants three things in order: (1) understand what you do, (2) see proof, (3) reach a person. Everything else is friction. This pass deletes friction without touching photos or core questionnaire copy.

---

### Findings (forensic)

**1. Contact page — three stacked promises before the form is reachable.**
- Hero subhead promises "begin a relationship, not a sales trap" → left rail repeats the same idea verbatim as a pull-quote → form header re-explains "a few details so we can come prepared." Three restatements of one promise is anxiety, not warmth. Plus the rail's heading says **"A calm, four-step path"** but only two steps are listed — broken promise in the headline itself.

**2. Home final-CTA — bezel header is redundant with the SectionHeader two columns over.**
- Left column already says "Tell us about the place" + "Cory will reply within two business days." Right column repeats with **"What should we know before we reach out?"** + "Five fields, two minutes." The form's own labels make this self-evident.

**3. Work page — 8 filter chips in one wrap row reads as a database, not an editorial gallery.**
- "All · Interior · Exterior · Decking · Bragg Creek · Rocky View · Bearspaw · Water Valley" — the user can't tell which axis they're on. Apple-grade fix: two short labelled rows ("Type" / "Area"), each with a calmer chip set.

**4. Services bento — five "what a quote includes" tiles is one too many to scan in one breath.**
- Items 4 & 5 ("Site access & seasonal considerations", "A clear, all-in price") can fold into items 1 & 3. Three or four tiles is the editorial sweet spot.

**5. ThankYou §II — "While you wait" exposes all 4 site sections again.**
- The visitor just submitted; offering them every page in the site is anti-finality. Two curated next-steps (Work, Services) is plenty. Drop About + ServiceAreas tiles.

**6. ConsultationForm — labels are precious, placeholder examples are long.**
- "What you're considering" with a 22-word italic example reads as a writing prompt. Plain "About your project" with a one-line example is faster. Same for "Best way to reach you" → "Email or phone."

**7. About §IV "A longer horizon" — duplicates §I philosophy.**
- The "stage at a time" idea is already implied by Property Respect and the home-page testimonials. Section is decorative scroll. Fold its single useful line ("Most rural properties are improved a stage at a time") into §I and delete the section.

**8. ServiceAreas §II "Built for rural service" — three bullets restate area copy already on each area page.**
- Trim to the headline + lede; drop the "Drive time / Seasonal weather / Property access" trio which the area pages already own. Less duplication, faster path to the four area links.

**9. MenuDrawer bottom rail — "Family-run · Foothills, AB" trust line is decorative noise next to the only thing that matters (the CTA).**
- Drop the trust pellet. Center the CTA on mobile, right-align on desktop. Cleaner exit path.

**10. Decking page §IV proof card uses the typographic vignette in BOTH hero and proof slots.**
- Same illustration twice on one page = visual stutter. Replace the proof-slot vignette with a real photo from `workPhotos` (we already use these on /work). Same fix should be applied to ExteriorFinishing and InteriorFinishing if they repeat the pattern (will verify and fix in build mode).

**11. "Two business days" repetition still at 8+ occurrences after the last pass.**
- Final cleanup: keep on Hero, ThankYou, ConsultationForm helper line, and the Index trust-strip. Remove from Contact (rail + form-card subhead), About closing, Services closing.

---

### Plan (build-mode execution)

**A. `src/pages/Contact.tsx`**
- Delete the left-rail SectionHeader + 4-step claim + pull-quote (rows 66–88). Replace with a tighter, honest 3-line panel: eyebrow "What happens", title "Write. We reply.", lede "Within two business days, from Cory directly."
- Delete the form-card "Tell us about the project / A few details so we can come prepared" header (rows 94–100). The card already lives under a SectionHeader; redundant.
- Tighten direct-contact panel: drop the lede line "Either reaches the same small team..." Keep the two list items.

**B. `src/pages/Index.tsx`**
- Delete the bezel header `<p>What should we know...</p>` + "Five fields, two minutes" + divider (rows 268–278). Form fields stand alone — eyebrow + title in left column already frame it.

**C. `src/pages/Work.tsx`**
- Split FILTERS into two arrays: TYPE_FILTERS (All, Interior, Exterior, Decking) and AREA_FILTERS (Bragg Creek, Rocky View, Bearspaw, Water Valley). Render two rows with tiny "Type" / "Area" labels. Filter logic adapts: All-in-Type with no Area selected = show all; selecting an Area filters within current Type.
- Move the filter rail above the hero's section spacing tighter (`pt-2`).

**D. `src/pages/Services.tsx`**
- Trim BentoGrid from 5 → 3 items: "Scope of work, written plainly", "Materials & finishes, by name", "Timeline & all-in price." (folds 4+5 in.)

**E. `src/pages/ThankYou.tsx`**
- Reduce NEXT_LINKS from 4 → 2: keep Our Work + Services, drop Service Areas + About. Grid becomes `sm:grid-cols-2` and is centred (`max-w-3xl mx-auto`).
- Replace `text-headline` legacy class on §I + §II headers with `<SectionHeader>` primitive (consistency with last pass).

**F. `src/components/ConsultationForm.tsx`**
- Rename labels: "Your name" → "Name", "Best way to reach you" → "Email or phone", "What you're considering" → "About your project".
- Shorten textarea placeholder to one line: `"e.g. New deck on a 1990s walkout, hoping for spring."`
- Shorten contact placeholder to `"you@example.com  ·  403 970-7691"` (already close — drop the "or"). 
- Helper text under submit: keep one sentence, drop "No automated funnel."

**G. `src/pages/About.tsx`**
- Delete §IV "A longer horizon" RevealSection entirely (rows 119–136). Add one sentence to §I body: "Most rural properties are improved a stage at a time — we're built for that pace."
- Migrate §I to `<SectionHeader>` (currently hand-rolled Eyebrow + pull-quote + body — refactor body alignment, keep the pull-quote intact since it's iconic).

**H. `src/pages/ServiceAreas.tsx`**
- Delete §II "Built for rural service" right column (the FIT trio + figure-footnote). Keep the SectionHeader and let it span 12 cols, centred lede. Simpler, faster scan to the four area links above.

**I. `src/components/nav/MenuDrawer.tsx`**
- Bottom rail: delete the `Family-run · Foothills, AB` line + green pellet. Keep flex container so CTA centres on mobile, right-aligns on desktop.

**J. `src/pages/Decking.tsx` (+ Exterior/Interior if the same pattern is found)**
- Replace the §IV proof vignette `<DeckingVignette/>` with a real photo via `workPhotos[proof.slug]` and fall back to the vignette only if no photo exists. Same review for the two sibling service pages in build mode.

**K. "Two business days" trim**
- Final occurrences after this pass should be: Hero footnote, ConsultationForm helper, ThankYou hero subhead, Contact rail. Remove from About ClosingCta body, Services ClosingCta body, and any duplicated form-card subheads we touch.

---

### Out of scope this pass
- Photography swaps beyond the proof-card fix (waiting on real plates from the user)
- Hero copy / headline — that was finalized last round
- Footer (already minimal)
- StyleGuide page (internal only)

---

### Memory updates after build
- Add constraint: "Form-card subheads are forbidden when a SectionHeader frames the same form one column over — the SectionHeader is canonical, the card stays bare."
- Add constraint: "Filter rails on gallery pages must be split by axis and labelled — never one undifferentiated wrap row."
- Add preference: "Form labels are nouns, not questions. 'Name' not 'Your name'. 'About your project' not 'What you're considering'."
