## Goal
Make `/contact` feel like Fly4Me's contact moment, in Fantasy.co register, in the Haven cream/evergreen palette. The form is the page. No competing decoration. Every interaction should feel calm, confident, and physical — especially on mobile.

## What changes
1. **Retire the 3-step wizard.** Show all three fields stacked on every breakpoint. The progress rail, Next/Back buttons, and step-by-step focus dance are removed.
2. **Tighten the SubPageHero on Contact** — same type-only register, slightly tighter rhythm, subhead replaced with a single sentence that names the human ("Cory replies within two business days.").
3. **Form is bare on the page background**, centered single column, `max-w-xl` on desktop, full-bleed gutters on mobile. No card, no border, no progress rail.
4. **Field grammar (Fly4Me-grade):**
   - Floating, calm label sitting above each input as a small uppercase `.t-eyebrow` in `text-foreground/55`.
   - Inputs sit on the page (no fill), with a 1px `border-foreground/15` bottom-only rule that thickens to `border-evergreen` on focus over 300ms — no boxed input. This is the single biggest tactile win on mobile.
   - Larger touch height (`min-h-14`), `text-base` (16px) to defeat iOS zoom-on-focus.
   - Helper text under each field in `.t-micro text-muted-foreground/80`, only when there's something useful to say (e.g. "Only used to reply.").
   - Inline error appears under the field as a quiet evergreen-deep underline + message; no shake, no toast for validation.
   - "Re: {Service}" chip appears above the project field when `?service=` is present, in `.t-micro text-evergreen/80` — non-removable, purely a signal.
5. **Mobile CTA = sticky bottom action bar.** A thin cream bar pinned to the bottom of the viewport (only on `/contact`, only on mobile, only when the form is in view), holding the solid evergreen `Get a Free Quote` button full-width. Lifts above the iOS keyboard via `visualViewport`. The in-flow Send button still exists on desktop / large screens. (This is the one explicit override of the "no floating FAB" rule — scoped to the Contact form, not a global widget. We add a note to the constraint memory.)
   - Copy on the button: **`Send`** while at rest, **`Sending…`** while in-flight. We keep "Get a Free Quote" reserved for the navigational CTAs per the standing rule. (Open to flipping if you prefer — but the convention across the site is that the form's own submit reads as the verb of the action.)
6. **Inline direct-contact rail** stays beneath the form, but tightened: hair-rule row list with email + phone in `.t-title`, label in `.t-micro`. Add a third row: **Location · `Foothills, AB`** in the same row grammar — matches Fly4Me's three-line contact strip.
7. **Post-submit:** unchanged — redirect to `/thank-you` with state.
8. **Motion:** form fades up with the standard 800ms `data-reveal`. On focus, the active field's bottom rule animates from `border-foreground/15` to `border-evergreen` in 300ms `ease-weighted`. Submit button uses `.cta-spring`. Sticky bar slides up from 12px on first scroll past the hero.
9. **A11y:** every input has a visible label (we drop the `sr-only` form heading because the page H1 already names the form). Error messages are `aria-live="polite"`. Sticky CTA is also a real `<button type="submit" form="contact-form">` so screen readers see one logical submit, not two.

## What stays the same
- 3 fields only: Name · Email or phone · About your project. No optional panel.
- Honeypot, zod validation, supabase insert, redirect-to-`/thank-you`.
- Type-only SubPageHero (no photo, no eyebrow, no folio).
- Form sits bare on cream — no card, no bezel.
- "Two business days" promise stays on the form helper and contact rail only.

## Files touched
- `src/pages/Contact.tsx` — tighten hero copy, drop the `sr-only` heading, render the form + rail + sticky bar.
- `src/components/ConsultationForm.tsx` — rewrite as a single-scroll 3-field form; remove step state, progress rail, Next/Back. Keep schema, submit, success modes, honeypot, `?service=` chip.
- `src/index.css` — add `.form-field` underline-input utility + `.form-field-rule` focus transition. Add `.contact-sticky-cta` (mobile-only sticky bar with `env(safe-area-inset-bottom)` + `visualViewport` offset).
- `mem://index.md` Core — replace the "3-step wizard with progress rail" rule with a "single-scroll bare form, underline inputs, mobile sticky CTA" rule, and amend the no-floating-FAB constraint to allow this one scoped exception.

## Out of scope
- ThankYou page, hero, MenuOverlay, BigCloseCTA, footer, navigation chrome.
- Schema changes, edge functions, new tables.
- Adding photography or editorial side-panels to Contact.
- Touching QuickContactSheet (it stays the mobile express lane).

## Verification
- Mobile (390×844) screenshot of `/contact` at rest, mid-fill, and with the sticky CTA visible.
- Desktop (1280×800) screenshot of `/contact` showing the centered single column with three stacked fields.
- Confirm Tab order: Name → Email/phone → Project → Send.
- Confirm submit still inserts into `consultations` and redirects to `/thank-you`.
