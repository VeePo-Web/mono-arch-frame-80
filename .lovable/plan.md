Make the desktop `/contact` panel fit the viewport in one screen — no scroll. Mobile untouched.

### Problem
Right panel currently scrolls because it stacks: panel header (brand + reply note) + `py-8` padding + `space-y-10/12` fields + helper text under each input + trailing "Reply within two business days" line. On a typical laptop (`calc(100svh-80px)` ≈ 720-820px), the form overflows and `overflow-y-auto` kicks in.

### Changes

**`src/pages/Contact.tsx` (desktop block only, lines 49-110)**
- Remove the panel header (`<header>` with "Haven Creek Renovations / Family-run · Foothills, AB / Replies in 2 business days"). The left brand cascade already carries identity + tagline; the reply promise moves to a single quiet line above the form.
- Body wrapper: drop `overflow-y-auto`, switch to `flex-1 flex flex-col justify-center px-10 py-10` so the 3 fields center vertically in the panel.
- Add one small eyebrow line above the form: `Replies in 2 business days` in `t-eyebrow text-evergreen-foreground/55`, sitting ~24px above the first field.
- Keep the top hairline accent.

**`src/components/ConsultationForm.tsx` — tighten when `tone === "dark"` only**
- Form `space-y-10 md:space-y-12` → `space-y-7` in dark tone (cream tone unchanged).
- Drop the helper line `Only used to reply.` under the contact field in dark tone.
- Drop the trailing `Reply within two business days.` paragraph under the submit in dark tone (it's now in the panel eyebrow).
- Textarea: `rows={4}` + `min-h-[120px]` → `rows={3}` + `min-h-[96px]` in dark tone.
- Submit button stays solid evergreen, full-width inside the panel: add `w-full` when dark.

### Result
Right panel renders: hairline → small "Replies in 2 business days" eyebrow → Name → Email or phone → About your project (3 rows) → full-width Send. All inside `min-h-[calc(100svh-80px)]`, no scrollbar at 1280×720 and up. Mobile path (`lg:hidden` block + sticky CTA) is not modified.

### Out of scope
- Mobile `<SubPageHero>`, mobile direct rail, `.contact-sticky-cta`, `ContactBrandStack`, schema, submit logic, `formId` plumbing.
- No new tokens, no new components.