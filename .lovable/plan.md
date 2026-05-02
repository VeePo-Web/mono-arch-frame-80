## Frog UX Audit — "Get to fewer, better signals"

This is a forensic minimalism pass across every page. The goal: cut everything that isn't carrying weight, then pour energy into the few moments that are. Inspiration absorbed from Royal Mechanical (cinematic section dissolves, a single Photo Moment, a typographic Big-Close CTA, layered editorial pacing) and a tiny pinch from Flex (clarity-first ordering, calm trust strip). We are NOT importing their conversion-aggressive habits — no sticky mobile CTA, no urgency timer, no "satisfaction guarantee" panel, no hero photo carousel.

### Audit findings (the receipts)

| # | Where | Problem | Resolution |
|---|---|---|---|
| 1 | `Hero.tsx` lines 146–153 | `trust-microcopy` row + `Trusted in {areas}` line stack two redundant proof bands directly under the CTAs | Delete the "No automated funnel · No obligation" line. Keep the "Trusted in" line — it's the only one that earns its weight. |
| 2 | `Index.tsx` lines 87–119 | Trust-strip stat cards (3 cards) are decoration: "Reply 2 days", "Areas served 4", "Cory · Owner-builder Replies personally" — three different shapes of the same single message | Replace with a one-line editorial strip: tiny serif italic line — "Replies from Cory, within two business days. Four foothills communities. One contractor." Centered, single row, 80ch max. Removes 3 cards and 23 lines of JSX. |
| 3 | `Index.tsx` lines 181–286 | Final CTA section is doing 4 jobs (eyebrow, headline, lede, escape-hatch contact tiles, form bezel with "Edition I · No. VII" seal) | Split into two sections: (a) **Photo Moment** — full-bleed `closingPrairie` photograph with a single typographic line over it ("Built for the property you'll keep."); (b) **Big-Close CTA** — kept as form + escape hatch but lose the "Edition I · No. VII" seal, lose the "Next step" eyebrow, lose the second `<p>` lede. One headline. One sub. Form. Two contact rows. Done. |
| 4 | `SubPageHero` `dossier` prop usage on Work/Services/Decking/etc. | "Section No. VIII · 6 plates · selected work · Edition I" reads as design-experiment cosplay. Homeowners don't speak in editorial dossier language. | **Delete the dossier prop entirely** from SubPageHero. Remove from all 6 callsites. Saves ~24 lines of fake-magazine furniture. |
| 5 | `Services.tsx` lines 99–103 | `figure-footnote` strip ("Fig. i. — INTERIOR FINISHING — Service No. I") on every service card duplicates the `numeral-disc` + title that's literally underneath it | Delete `figure-footnote` row from each card. Numeral disc + title carry it. |
| 6 | `Services.tsx` § II "Full-circle support" (lines 132–182) | Surveyor frame + dotted vertical line + 3-step list **already exists on the home page as `HowItGoes`** — same 01/02/03, same titles, same body | Delete § II entirely from Services. Add a small "How it goes →" link to the home page section. |
| 7 | `Services.tsx` § III lines 184–229 | "Pricing is custom because the work is." + 3-card BentoGrid of "Scope / Materials / Timeline" — a wall of 220 words about quotes | Compress to a single 2-paragraph block, no bento. The 3 bullets become a single prose sentence: "A written scope, materials by name, and a clear all-in price." |
| 8 | `Work.tsx` filter rail — both rows always rendered | "Type" row has 4 chips, "Area" row has 5 — 9 chips visible at once on a page with only 6 plates. Cognitive overhead > content. | Keep both rows (per memory rule), but hide the rail when `galleryPlates.length < 8`. Right now: just render plates with a tiny "Filter" disclosure that expands the rail on click. Below the threshold, a filter is theater. |
| 9 | `ConsultationForm.tsx` step 2 helper "Only used to reply." (added last turn) | Tiny but it's a friction-reassurance ("don't worry we won't spam") which the brand voice doesn't actually need to make | Delete. The bare label is enough. Apple doesn't tell you what they'll do with your name. |
| 10 | `QuickContactSheet.tsx` | Still single-screen (correct), but the "or" divider and the duplicated 3-field micro-form mean we maintain TWO copies of the form | Out of scope for this pass — flag for a follow-up dedup. |
| 11 | Photography manifest | Only 8 brand photographs; the new Photo Moment + the Decking/Exterior/Interior detail pages need richer atmospheric coverage | Generate 4 new photographs with `google/gemini-3.1-flash-image-preview`: (a) `closing-photo-moment.jpg` (full-bleed twilight acreage, deep negative space top-left for headline), (b) `service-interior-detail.jpg` (close-up trim corner, raking light), (c) `service-exterior-detail.jpg` (siding-to-soffit transition, golden hour), (d) `service-decking-detail.jpg` (cedar deck board endgrain, morning shadow). Save to `src/assets/photography/`, register in `index.ts`. |
| 12 | `About.tsx`, `Contact.tsx`, `ThankYou.tsx`, `ServiceAreas.tsx`, area pages (`AreaPage.tsx`) | Each currently uses `SubPageHero` with a `dossier={...}` prop — same removal needed | Sweep all callsites; verify nothing else relies on the dossier markup. |
| 13 | Section pacing across home page | All sections sit on the same cream background — there is no visual "breath" between movements | Insert two `SectionTransition` components (new, ported from Royal): cream→evergreen-deep before Photo Moment, evergreen-deep→cream after. Compact heights so it's a 60–100px breath, not a wall. Same component handles `evergreen→cream` for the deck shots if needed. |
| 14 | `Index.tsx` line 184 final CTA — `bg-evergreen-deep` already correct | Currently the ONLY dark section on the home page; appearing once with no transition makes it feel like a teleport | Once Photo Moment exists right above it (also dark/photo), transition becomes natural — they form a single "deep" movement before the form bezel sits in cream again. |
| 15 | `ServiceMarquee.tsx` (170 lines, used between Trust strip and Testimonials) | Marquee is brand-correct but currently stacks against HowItGoes with no breath, then immediately into TestimonialSpine. Three "horizontal-rhythm" sections in a row. | Reorder: Hero → editorial trust line → HowItGoes → ServiceMarquee → SectionTransition (cream→evergreen-deep) → **PhotoMoment (NEW)** → TestimonialSpine (now on dark) → SectionTransition (evergreen-deep→cream) → Areas bento → BigCloseCTA. Testimonials gain weight on the dark background; the page now has a clear arc. |

---

### Execution plan

#### Phase 1 — Component additions

**1.1 Create `src/components/SectionTransition.tsx`** — port the Royal version, adapt color map to our tokens:
```ts
const COLOR_MAP = {
  cream: 'hsl(var(--background))',           // our cream is the background
  evergreen: 'hsl(var(--evergreen-deep))',   // our deep evergreen
  surface: 'hsl(var(--background-soft))',    // section-wash equivalent
} as const;
```
Same gradient construction (oklch color-mix, dramatic 6-stop, normal 4-stop, same-color 3-stop dip). Same noise overlay using our existing `editorial-noise` class (or skip noise if we don't have it — confirm during implementation; fall back to `bg-grain` or omit). Same height calibration. ~95 lines.

**1.2 Create `src/components/PhotoMoment.tsx`** — full-bleed cinematic photo with one line of type. Spec:
- `min-h-[60svh] sm:min-h-[75vh]`
- Background: new `closing-photo-moment.jpg` with subtle parallax (use existing `useParallax` if present; if not, simple `transform: translateY(scrollY * 0.04)` on scroll via IntersectionObserver — don't pull in framer)
- Top + bottom dissolve gradients into surrounding section colors (Royal pattern, lines 32–48)
- Center content: single `font-display` line, max 18ch, italic accent on one word ("Built for the property you'll **keep**.")
- Below: tiny serif italic supporting line, max 50ch
- All text uses `text-background` (cream on dark photo)
- `useScrollAnimation(0.2)` reveal — opacity + translateY-8

**1.3 Create `src/components/BigCloseCTA.tsx`** — replaces the current monolithic final-cta section in Index. Keeps:
- Form bezel with `<ConsultationForm>` (right column desktop, full-width mobile)
- Email + phone tiles (left column desktop, below form on mobile)
- Headline: one line — "Tell us about the place." (no eyebrow, no second lede)
- Sub: one line — "Cory replies within two business days."
- Background: `bg-evergreen-deep` with the existing radial-bloom + skyline SVG (those are good — keep them)

Removes:
- "Edition I · No. VII" cta-bezel seal
- "Next step" eyebrow
- "Or reach us directly" preamble (the tiles speak for themselves; just put them there)

#### Phase 2 — Component deletions / simplifications

**2.1 `Hero.tsx`**:
- Delete lines 146–153 (`trust-microcopy` "No automated funnel · No obligation")
- Keep everything else

**2.2 `SubPageHero.tsx`**:
- Remove `dossier` prop from interface
- Remove the JSX block that renders the "Section No. / coord / edition" trio
- This is a breaking change — must sweep all callsites in the same commit

**2.3 Sweep `dossier=` callsites**:
- `pages/Work.tsx` (line ~101)
- `pages/Services.tsx` (line ~56)
- `pages/Decking.tsx`, `pages/InteriorFinishing.tsx`, `pages/ExteriorFinishing.tsx`
- `pages/About.tsx`, `pages/Contact.tsx`, `pages/ServiceAreas.tsx`, `pages/ThankYou.tsx`
- `components/AreaPage.tsx`
- Just delete the prop line at each site

**2.4 `Services.tsx`**:
- Delete `figure-footnote` block from each service card (lines 99–103)
- Delete entire § II "Full-circle support" section (lines 132–182)
- Compress § III: replace the two paragraphs + bento with a single `<SectionHeader>` + 2 short paragraphs:
  > "Pricing is custom because the work is." / "Site access, scope, materials, and what's already there all change the answer. We'll talk through what's possible, what's worth it, and what isn't — and write you a plain scope, materials by name, and a clear all-in price."

**2.5 `Work.tsx` filter rail**:
- Wrap `renderRow` block in `{galleryPlates.length >= 8 ? <fullRail/> : <CollapsedFilter/>}`
- `CollapsedFilter` = a single tiny ghost button "Filter ({visible.length}/{galleryPlates.length})" that toggles a `useState` to expand the rail. Default collapsed.

**2.6 `Index.tsx`** — full body rewrite:
```tsx
<Hero />
<EditorialTrustLine />            {/* replaces RevealSection trust-strip */}
<HowItGoes />
<ServiceMarquee />
<SectionTransition from="cream" to="evergreen" intensity="dramatic" />
<PhotoMoment />
<TestimonialSpine variant="dark" />   {/* small variant addition — see 2.7 */}
<SectionTransition from="evergreen" to="cream" intensity="dramatic" />
<AreasBento />                    {/* extracted from current § V */}
<BigCloseCTA />
```

**2.7 `TestimonialSpine.tsx`** — accept a `variant?: "dark" | "light"` prop. Light is current behavior. Dark swaps `text-foreground` → `text-background`, divider color, etc. ~6-line patch.

**2.8 `ConsultationForm.tsx`** — delete the step-2 helper line `"Only used to reply."` (one `<p>` removal).

#### Phase 3 — Photography (Frog-quality regeneration)

**3.1 Generate 4 new photographs** via Lovable AI Gateway, model `google/gemini-3.1-flash-image-preview` (high-quality, fast). Use a one-off Node script in `/tmp/gen-photography.ts` that:
- Calls the gateway with each prompt
- Saves base64 → JPG into `src/assets/photography/`
- Filenames: `closing-photo-moment.jpg`, `interior-detail-trim-corner.jpg`, `exterior-detail-soffit.jpg`, `decking-detail-endgrain.jpg`

**Prompts** (each tuned to the brand contract — rural Alberta, no people, calm cedar/evergreen/warm-off-white palette, documentary photography):

> *closing-photo-moment*: "Wide-angle documentary photograph at twilight: a finished cedar-clad acreage home in rural Alberta, golden interior windows glowing warmly against deep blue dusk sky, snow-dusted foothills receding behind. Composition: house anchored bottom-right third, vast empty sky upper-left for typography negative space. Mood: quiet, settled, the work is done. Shot on 35mm Portra 400, slight grain, no people, no vehicles. 16:9 cinematic crop."

> *interior-detail-trim-corner*: "Macro documentary photograph: pristine corner where painted wood baseboard meets door casing meets polished concrete floor in a rural Alberta home. Raking morning light from camera-left reveals the precision of the mitered cut and the thin shadow line. Palette: warm off-white trim, soft cedar undertones in the floor stain. No tools, no people. Shot on a 50mm prime, shallow depth of field. 4:3 crop."

> *exterior-detail-soffit*: "Tight documentary photograph: the transition where vertical cedar siding meets a white-painted soffit and dark fascia on a foothills Alberta home, with a clean shadow line of late afternoon golden-hour light. Visible weathering grain on the cedar but everything sharp and well-kept. Big sky in the upper third out of focus. No people. 35mm prime. 16:10 crop."

> *decking-detail-endgrain*: "Documentary close-up: the end-grain of a freshly-oiled cedar deck board where it meets a stainless picture-frame edge band, a single fallen aspen leaf resting on the surface, early morning side-light casting a long shadow from the leaf. Palette: warm cedar amber, soft prairie sky reflection. Hand-finished feel. 50mm prime. 1:1 square crop."

After generation, **immediately QA each image visually**: open them, confirm no faces, no logos, no people, no broken anatomy, palette stays calm. Regenerate with prompt tweaks if any fail.

**3.2 Register in `src/assets/photography/index.ts`**:
- Add 4 imports
- Add to `photography` const: `closingPhotoMoment`, `interiorDetailTrim`, `exteriorDetailSoffit`, `deckingDetailEndgrain`

**3.3 Wire**:
- `PhotoMoment` reads `photography.closingPhotoMoment`
- The 3 service-detail pages each gain one detail photograph block (a quiet 2:1 plate above the closing CTA — single image, no card chrome, full-bleed within container)

#### Phase 4 — Memory updates

Add to `mem://index.md` Core:
- "No `dossier` chrome on SubPageHero. Editorial 'Edition I · Section No. VIII · coord' furniture is forbidden — reads as design-experiment cosplay to homeowners."
- "Home page arc is fixed: Hero → editorial trust line → HowItGoes → ServiceMarquee → cream→evergreen transition → PhotoMoment → TestimonialSpine (dark variant) → evergreen→cream transition → AreasBento → BigCloseCTA. Don't reorder without revisiting."
- "PhotoMoment is the page's only full-bleed photograph moment. Don't add a second one anywhere."
- "Filter rails hide themselves below 8 items behind a 'Filter (n/N)' disclosure. Visible filters on a 6-item gallery is theater."

Create one new memory file: `mem://constraint/no-editorial-cosplay`:
> "Section numerals (I, II, VIII), 'Edition I', 'Plate i', 'Fig. i.', 'No. VII', and dossier-style coords are forbidden anywhere user-facing. They came from an early editorial pass and read as art-school affectation. Brand voice is plainspoken — 'How it goes', 'Our work', 'Three services'. The single permitted ornament is the small serif italic numeral inside HowItGoes (01/02/03) which doubles as ordinal information."

Update `mem://constraint/three-field-lead-form` — remove the line about the step-2 helper text (now deleted).

---

### Files touched (exhaustive)

**New (3 components + 4 photos)**:
- `src/components/SectionTransition.tsx`
- `src/components/PhotoMoment.tsx`
- `src/components/BigCloseCTA.tsx`
- `src/assets/photography/closing-photo-moment.jpg`
- `src/assets/photography/interior-detail-trim-corner.jpg`
- `src/assets/photography/exterior-detail-soffit.jpg`
- `src/assets/photography/decking-detail-endgrain.jpg`

**Modified**:
- `src/components/Hero.tsx` (delete trust-microcopy row)
- `src/components/SubPageHero.tsx` (remove `dossier` prop + render block)
- `src/components/TestimonialSpine.tsx` (add `variant` prop)
- `src/components/ConsultationForm.tsx` (drop step-2 helper)
- `src/assets/photography/index.ts` (4 new imports/exports)
- `src/pages/Index.tsx` (full body rewrite per Phase 2.6)
- `src/pages/Services.tsx` (delete fig-footnote, § II, simplify § III)
- `src/pages/Work.tsx` (collapsible filter)
- `src/pages/About.tsx`, `Contact.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ServiceAreas.tsx`, `ThankYou.tsx` (drop `dossier` prop)
- `src/components/AreaPage.tsx` (drop `dossier` prop)
- `mem://index.md` (3 Core lines + 1 memory ref)
- `mem://constraint/no-editorial-cosplay` (new)
- `mem://constraint/three-field-lead-form` (remove obsolete helper rule)

### Out of scope (deliberately, save for next pass)
- ConsultationForm vs QuickContactSheet form-body deduplication (architecture refactor — separate plan)
- Navigation re-think — already buttery in round 7, leave it
- StyleGuide page — internal tool, no user impact
- Adding analytics/tracking — wasn't requested
- Re-introducing project-type chips — explicitly forbidden by memory

### Verification after build
1. Walk every route at 1440px and 390px viewports. Confirm no `dossier` text appears anywhere.
2. Confirm Photo Moment dissolves into surrounding sections cleanly (no hard seam at gradient edges).
3. Confirm filter rail on `/work` is collapsed by default (expandable on click).
4. Confirm `/services` is shorter — measure pixel height delta vs current.
5. Confirm new photographs load with proper `loading="lazy"` everywhere except the hero.
6. Confirm form still works end-to-end (3-step wizard preserved).
