# Mobile Contact — instant-to-form UX

Right now `/contact` on mobile opens with a full `SubPageHero` (headline + subhead + backdrop photo). The Name field doesn't appear until the user scrolls. The sticky Send bar already lives at the bottom, but there's nothing to send yet — the form is below the fold. We fix that.

Desktop split (lg+) is untouched. This change is scoped to the `<div className="lg:hidden">` branch of `src/pages/Contact.tsx`.

## Goal

A returning visitor taps "Contact" and sees the Name field within the first viewport — no scroll, no hero to skim past. Form first, prose second, direct rail third.

## New mobile order

```
┌───────────────────────────────┐
│ NAV (existing)                │
├───────────────────────────────┤
│ Compact header band           │  ~ 140-160px tall
│  · t-eyebrow  "Get in touch"  │
│  · t-headline (2 lines max)   │
│    "Tell us about your        │
│     project."                  │
│  · t-micro  "Reply in 2       │
│    business days · Cory"       │
├───────────────────────────────┤
│ NAME            [input]       │  ← visible on first paint
│ EMAIL OR PHONE  [input]       │
│ ABOUT…          [textarea]    │
├───────────────────────────────┤
│ (scroll) Or reach us directly │
│  email · phone · location     │
├───────────────────────────────┤
│ STICKY SEND (existing)        │
└───────────────────────────────┘
```

The compact header replaces `SubPageHero` on mobile. Same typographic grammar (`t-eyebrow` + `t-headline` + `t-micro`), no backdrop photo, no folio, no fixed min-height — it occupies only what its type needs (~`pt-6 pb-8`). On a 390×701 viewport that leaves room for the Name and Email fields above the fold; the textarea starts immediately below.

## What changes

`src/pages/Contact.tsx`, mobile branch only:

1. Remove `<SubPageHero …/>` and the `photography.closingPhotoMoment` import path (still used elsewhere — only the call here goes).
2. Insert a new compact header block above the form section using existing tokens:
   - `t-eyebrow text-evergreen/70` — "Get in touch · Replies in 2 business days"
   - `t-headline text-foreground` — "Tell us about your project."
   - Optional second line in `t-body text-muted-foreground` — "Cory replies personally."
   - Spacing: `pt-6 pb-6` inside `Container size="wide"`.
3. Tighten the form section: drop `section-y pb-32`, use `pt-2 pb-40` so the sticky CTA has clearance but no giant top gap.
4. Pass `compact` to `<ConsultationForm>` so field rhythm fits the viewport (already supported — uses `space-y-7`, smaller textarea, no helper line). Keep `formId={FORM_ID}` so the sticky Send keeps working.
5. Keep the "Or reach us directly" rail and sticky CTA exactly as they are.

## Why these choices

- **No accordion / no "open form" tap.** Friction. The form *is* the page.
- **No hero photo on mobile.** Contact intent is already high; a photo just pushes fields down.
- **Compact mode on the form.** Already built and used on the desktop right panel — reusing it keeps one source of truth, no new variant.
- **Direct rail stays below the form**, not above — most visitors will type into the form; the email/phone fallback is for the minority who prefer it, and they'll scroll.

## Out of scope

- Desktop layout (lg+ split) — not touched.
- `ConsultationForm` internals — already supports `compact` + `formId`.
- `SubPageHero` component — still used by other pages.
- Memory updates — once shipped, add one line to the core nav/contact rule noting "mobile /contact opens directly to the form; no SubPageHero."

## Files touched

- `src/pages/Contact.tsx` (mobile branch only, ~25 lines changed)
