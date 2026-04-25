# Refine Gold — Contact ↔ ThankYou Flow

Both pages already exist with default exports and are wired into the router. The breakage is the **flow**: `ConsultationForm` never navigates after success, so the dedicated ThankYou page is unreachable from the form. Beyond fixing that, this plan lifts both pages from "built" to "polished gold."

---

## 1 · Schema — add `preferred_time` to `consultations`

Migration:
- `ALTER TABLE public.consultations ADD COLUMN preferred_time text` — nullable.
- Drop and recreate the `Anyone can submit a consultation request` INSERT policy so its WITH CHECK accepts `preferred_time IS NULL OR preferred_time = ANY (ARRAY['morning','afternoon','either'])`.
- Keep `notes IS NULL` constraint intact (no notes field added — staying lean).

This is the only DB change. RLS shape stays restrictive.

---

## 2 · `src/lib/validation/consultation.ts` — extend schema

- Add `PREFERRED_TIMES = [{ value: "morning", label: "Morning" }, { value: "afternoon", label: "Afternoon" }, { value: "either", label: "Either works" }]`.
- Add `preferredTime: z.enum([...]).optional()` to `consultationSchema`.
- Export `ConsultationFormValues` type continues to work.

---

## 3 · `src/components/ConsultationForm.tsx` — wire redirect + harden

Critical wiring:
- Import `useNavigate` from react-router-dom and `useSearchParams` for query-param prefill.
- On mount, read `?service=interior|exterior|decking|multiple|not-sure` and pre-set `projectType` via `form.reset({ projectType: param, ... })` if valid.
- On successful insert, capture the inserted timestamp and call `navigate("/thank-you", { state: { name, projectType, preferredTime, submittedAt: new Date().toISOString() }, replace: true })`. `replace: true` so back-button doesn't re-submit.
- Keep the existing inline success state as a graceful fallback (rendered only if `navigate` throws or the component is mounted outside a Router — defensive).
- Add the optional **05 · Best time to walk the property** field as a `Select` matching the existing 01–04 styling (numeral, hairline divider, evergreen focus ring).
- Disable submit until `form.formState.isValid` — pill quietly "wakes up" only when complete. Add `aria-describedby="response-window-note"` on the submit button.
- Add `inputMode="email"` and `autoCapitalize="none"` to the email field.
- Add `aria-busy={isSubmitting}` on the form element.
- Replace the Sonner toast on success with the redirect (no toast — the new page IS the confirmation). Keep the error toast.

---

## 4 · `src/pages/Contact.tsx` — sticky rail + direct-contact panel + query-param awareness

- Wrap the left-rail "What happens next" column in `lg:sticky lg:top-28 lg:self-start` so it stays visible as the form is filled. Keep the existing 4-step ordered list and Eames-style pull quote.
- Add a new sub-section between the form and "About the quote" — a **"Or reach us directly"** hairline-divided 3-row table:
  - Row 01 · `hello@havencreekrenovations.ca` (mailto link, evergreen hover slide)
  - Row 02 · `(403) 555-0100` (tel: link, marked with `{/* TODO: real phone */}` comment)
  - Row 03 · `Reply within two business days` (no link, evergreen tabular numeral on the right)
  Use the same `area-row` group hover treatment from the service-areas section so it visually rhymes.
- Read `?service=` from the URL at the page level and pass it into the lazy-loaded `ConsultationForm` as a prop, so deep-links from `/services/interior-finishing` etc. arrive primed.
- Tighten section vertical rhythm: form section keeps `pb-24`, new direct-contact subsection sits inside the same `RevealSection` with a top hairline `border-t border-evergreen/15 mt-16 pt-16`.

---

## 5 · `src/pages/ThankYou.tsx` — personalize + animated receipt mark + softer empty-state

- Read `useLocation().state` (typed) for `{ name?, projectType?, preferredTime?, submittedAt? }`.
- Headline becomes `"Thank you, {name}. We've got your note."` when name is present; falls back to current copy otherwise. The `accentWord` switches from `"got"` to `name` when personalized.
- Below the SubPageHero (above § I), insert a **figure-footnote receipt stamp**: `Fig. iv. · RECEIVED · {Apr 25, 2026, 4:12 PM}` rendered via `submittedAt` from state, or hidden entirely on direct visits.
- Add a small **animated check-mark glyph** drawn with SVG `stroke-dasharray` over ~900ms, sitting beside the receipt stamp. Wrap the keyframes in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users see the static check.
- In § I "What happens next," when `projectType` is in state, prepend a one-line "Re: {Interior Finishing}." subhead under the section H2 so the visitor sees their thread acknowledged.
- Soften § III sign-off for direct visits (no `state`): swap the sign-off paragraph for `"Looking for the contact form?"` + a quiet ghost link to `/contact`. With state present, keep the current "No need to refresh — we'll come to you." copy.

---

## 6 · `src/index.css` — three additions only

- `.receipt-check` keyframes for the SVG dasharray draw (reduced-motion guarded).
- `.contact-row` — share styling with the existing `.area-row` so the direct-contact table reads as a sibling pattern.
- One small utility: `.thread-tag` for the "Re: {service}" line — italic Fraunces, evergreen 70% opacity, `text-[0.95rem]`.

No design tokens added. No new color values. Stays inside the cedar/evergreen system already in `mem://design/thermal-crescendo-pattern`.

---

## 7 · Footer consistency pass

- Read `src/components/Footer.tsx` and align its email/phone to the same `hello@havencreekrenovations.ca` + `(403) 555-0100` placeholder so the site speaks with one voice. Only change those two strings if they differ; leave layout untouched.

---

## 8 · Acceptance — what "polished gold" means

- Submit the form on `/contact` → DB insert succeeds → browser navigates to `/thank-you` with state → headline reads `"Thank you, {name}."` → `Re: {projectType}` thread tag renders → receipt timestamp + animated check show → back-button returns to `/contact` without re-firing the submit (because of `replace: true`).
- Visit `/thank-you` directly (bookmarked) → generic copy renders, no receipt stamp, sign-off offers the gentle `/contact` ghost link.
- Visit `/contact?service=decking` → form arrives with **Decking** pre-selected in field 03.
- Form is invalid until name + email + project type + budget are all filled. Optional field 05 doesn't block submit.
- Direct-contact table renders below the form with `mailto:` + `tel:` working, hairline-divided, evergreen hover slide.
- Sticky left rail stays visible at `lg:` breakpoints while scrolling the form.
- Lighthouse Performance unchanged (no new heavy imports — `useNavigate`/`useLocation`/`useSearchParams` are already in the React Router bundle the app pays for).
- All existing `useSeo` + `BreadcrumbJsonLd` + `noindex` behavior unchanged.

---

## Files touched

**New migration**: 1 — adds `preferred_time` column + updated INSERT policy.

**Edited (7)**:
- `src/lib/validation/consultation.ts` — schema + PREFERRED_TIMES export
- `src/components/ConsultationForm.tsx` — redirect, prefill, hardening, optional field
- `src/pages/Contact.tsx` — sticky rail, direct-contact panel, query-param forwarding
- `src/pages/ThankYou.tsx` — personalization, receipt stamp, animated check, softer empty state
- `src/index.css` — `.receipt-check`, `.contact-row`, `.thread-tag` (≤30 lines added)
- `src/components/Footer.tsx` — phone/email string alignment only (if needed)
- `.lovable/plan.md` — task tracking (housekeeping)

**Created (0)** — every component already exists; this is refinement, not new scaffolding.

No new dependencies. No router changes (route was already registered). No SEO regressions. No schema renames.