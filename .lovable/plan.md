# Phase 2 — Cinematic Master Execution

A single-prompt sweep that finishes the FlexServices-grade arc: rebuild the home page rhythm around the new components already created (`SectionTransition`, `PhotoMoment`, `BigCloseCTA`), purge the last "editorial cosplay" residue, tighten Hero / Services / Work, and codify the new constraints in memory.

---

## 1. Home page (`src/pages/Index.tsx`) — full re-flow

Replace the current 5-section flow with a 9-beat cinematic arc. Each cream→evergreen handoff is bridged by `SectionTransition` so the eye never hits a hard color seam.

```text
Hero (cream)
  ↓ trust strip (3 stat cards) — kept, but copy tightened
HowItGoes (cream)
  ↓ SectionTransition  cream → evergreen
ServiceMarquee (evergreen)            ← signature scroll moment
  ↓ SectionTransition  evergreen → cream
PhotoMoment (full-bleed)              ← "the work, in one frame"
TestimonialSpine — DARK variant (evergreen)
  ↓ SectionTransition  evergreen → cream
AreasBento (cream)
BigCloseCTA (evergreen, replaces final-cta block)
```

### Specific edits
- Delete the entire `<RevealSection id="final-cta">` block (lines 181–286) and replace with `<BigCloseCTA />`.
- Insert `<SectionTransition from="cream" to="evergreen" />` before `<ServiceMarquee />`, and the inverse after.
- Insert `<PhotoMoment src={photography.closingPhotoMoment} caption="One trusted contractor. From first walk to final finish." />` between the two transitions and `TestimonialSpine`.
- Pass `tone="dark"` to `<TestimonialSpine />`.
- Insert final `<SectionTransition from="evergreen" to="cream" />` before the Areas section.
- Tighten the 3 stat cards: Reply / Areas / Owner — drop "Or sooner. From a real person, not a funnel." (already implied by Owner card). New caption for Reply: `"Within two business days."` Owner caption: `"Cory replies personally."`
- Remove the "Get a Free Quote" anchor at the bottom of the Areas section (lines 166–177) — `BigCloseCTA` immediately below is the conversion moment; doubling dilutes it.

---

## 2. `TestimonialSpine.tsx` — dark variant + de-dupe

- Add optional `tone?: "light" | "dark"` prop (default `"light"`).
- When `tone="dark"`: section becomes `bg-evergreen-deep text-background`; cards become `bg-background/[0.04] border-background/12`; quote glyphs use `text-background/35`; figcaption divider `border-background/15`; eyebrow uses `tone="light"` on `SectionHeader`; "More on the way…" caption uses `text-background/55`.
- Remove the centered "More on the way as projects wrap." line in the dark variant — reads as apologetic against the heavier evergreen field; keep only in light usage.

---

## 3. `Hero.tsx` — quiet the bottom

- Delete the "No automated funnel · No obligation" trust microcopy block (lines 146–153). The two CTAs already carry no-pressure tone; the line is the kind of reassurance copy FlexServices avoids.
- Tighten the lede to two clauses: `"Hands-on finishing, repairs, and decks across rural Alberta. One person plans the work and walks the finish with you."`
- Reduce headline italic stroke delay to `0.7s` so the underline lands before the subhead reveal — feels intentional rather than after-thought.

---

## 4. `Services.tsx` — compress

- Delete entire **§ II — Full-circle support** block (lines 131–181). The same idea is already carried by `HowItGoes` on home and the personal-process beats on About. On Services it pads the page without adding new info.
- Compress **§ III — Custom quote**: drop the BentoGrid trio (lines 209–225) and replace with a single muted line under the prose:
  > `Every quote includes scope, materials by name, timeline, and an all-in price.`
- Replace `ClosingCta` with `<BigCloseCTA variant="compact" heading="Tell us about the project. We'll come prepared." />` for visual continuity with home.
- Drop the `Plate {s.numeral}` corner label and the `figure-footnote` strip (lines 90–102) — these are the surviving "editorial cosplay" markers (Fig./Plate/Service No.) that read as art-school pastiche.
- Keep the numeral disc + animated rule (lines 103–106) — that's the tasteful version of numbering.

---

## 5. `Work.tsx` — collapse filters by default

- Wrap both filter rows in a `<details>` element (or controlled `useState`) that starts **closed** when total plates `<= 7`, open when `>= 8`. Trigger button: small "Filter (N projects)" with a chevron.
- Empty-state copy stays.
- Replace `ClosingCta` with `<BigCloseCTA variant="compact" heading="See a project that resembles yours? Let's talk it through." />`.

---

## 6. `BigCloseCTA.tsx` — add `variant` prop

- Add `variant?: "full" | "compact"` and optional `heading?: string` overrides.
- `compact`: half the vertical padding (`pt-24 pb-24` vs `pt-44 pb-52`), no skyline SVG, single-column layout (headline left, inline CTA pair right at lg+, stacked below). Form is omitted — instead two CTAs (`Get a Free Quote` primary, `View the work` ghost).
- `full`: existing two-column layout with embedded `ConsultationForm`.
- Both variants share the radial-gradient evergreen background and 2-day reply line.

---

## 7. `SectionTransition.tsx` — minor polish

- Verify it accepts `from` / `to` props mapping to `bg-background` (cream) and `bg-evergreen-deep`. If not already, add a `height` prop (default `120`) so transitions can be tuned per seam (e.g., `80` after Marquee, `120` before BigCloseCTA).

---

## 8. `PhotoMoment.tsx` — caption alignment

- Ensure caption is left-aligned, max-width `28ch`, sits in bottom-left at lg+ and bottom-center on mobile.
- Add `priority?: boolean` for above-fold use (we'll keep `false` here — it's mid-page).
- Image gets `loading="lazy"` + `decoding="async"`; outer wrapper carries `content-visibility: auto; contain-intrinsic-size: 100vw 80vh` per perf rule.

---

## 9. Editorial-cosplay residue sweep

Search-and-remove the following remaining markers across the codebase:
- `cta-bezel__seal` text `Edition I · No. VII` in `Index.tsx` (gone with BigCloseCTA replacement — verify no other occurrences).
- `Plate {s.numeral}` in `Services.tsx` (above).
- `Section No.` / `Edition` strings in any remaining file: `rg "Edition |Section No\.|Plate [IVX]"` and remove each occurrence with care to keep surrounding layout valid.

---

## 10. Memory codification

Create `mem://constraint/no-editorial-cosplay`:
> Never re-introduce "Section No.", "Edition", "Plate N", "Fig.", or "Service No." labels in UI chrome. Numerals only appear as the `numeral-disc` glyph in the service hierarchy. **Why:** these read as art-school pastiche to homeowners and undermine the "real contractor" positioning.

Create `mem://features/home-cinematic-arc`:
> Index.tsx flow is fixed: Hero → Stat strip → HowItGoes → Transition → ServiceMarquee → Transition → PhotoMoment → TestimonialSpine(dark) → Transition → AreasBento → BigCloseCTA. Each cream↔evergreen handoff uses `SectionTransition`. Never insert a section without a transition on either side.

Update `mem://index.md` Core with one line:
> Cream↔evergreen handoffs always pass through `SectionTransition` — never a hard color seam.

And add the two new memory files to the index list.

---

## 11. QA pass (must complete before delivery)

- Visit `/`, `/services`, `/work` in the preview at 1280×720 and 390×844.
- Verify: no double-CTA stacking on Index; transitions render without a 1px seam; dark testimonial cards are legible; `Hero` first viewport is unchanged.
- Run `rg "Edition |Plate I|Section No\."` — must return zero results.
- Confirm no console errors and no layout shift on the new transitions.

---

## Files touched (estimate)

- `src/pages/Index.tsx` (rewrite home flow)
- `src/components/TestimonialSpine.tsx` (tone variant)
- `src/components/Hero.tsx` (trim)
- `src/pages/Services.tsx` (delete §II, compress §III, drop plate labels, swap CTA)
- `src/pages/Work.tsx` (collapse filters, swap CTA)
- `src/components/BigCloseCTA.tsx` (variant prop)
- `src/components/SectionTransition.tsx` (height prop, verify)
- `src/components/PhotoMoment.tsx` (caption polish)
- `mem://constraint/no-editorial-cosplay` (new)
- `mem://features/home-cinematic-arc` (new)
- `mem://index.md` (update)

No new image assets needed — the four photographs generated in Phase 1 cover the new arc.

Approve and I'll execute the full sweep in one pass.