## Stupid-Simple Questionnaire — One Pass, No Speed Bumps

Right now "the questionnaire" is the **ConsultationForm** — three required fields plus a collapsed `<details>` "Add timing, budget, or location context" panel that fans out into FOUR more selects/inputs (project type, budget, preferred time, location). That collapsed panel is the speed bump. Even closed it's a "do I need to open this?" decision; opened it's a 4-field cliff that re-introduces every dropdown the form was supposed to escape.

The same friction repeats in QuickContactSheet (3 fields + a "Your name" possessive label that the rest of the site already deprecated).

### Fix — collapse to **3 required fields, period.**

Required fields stay exactly: Name · Email or phone · About your project. **Delete the collapsible "more context" panel entirely.** Budget / preferred time / location are removed from the form — Cory asks them in his reply, which is the whole point of the two-business-day promise.

**Keep `projectType` working** because it's auto-populated from `?service=` query strings on service pages → render it as a tiny tag chip above the textarea ("About your **deck** project"), not as a dropdown the visitor has to choose. If no query param, no chip, no field — the textarea covers it.

### Files to change

**1. `src/components/ConsultationForm.tsx`**
- Delete the entire `<details>` block (rows ~299–412) and all four optional `FormField`s inside it.
- Drop unused imports: `ChevronDown`, `Select*` family, `BUDGET_RANGES`, `PREFERRED_TIMES`, `PROJECT_TYPES`.
- Keep `projectTypeFromQuery` import. When `initialProjectType` resolves to a known value, render a small "Re: {label}" chip above the textarea label (read-only, submitted with form). When null, no chip.
- Form is now 3 fields + submit. No accordion. No "OPTIONAL" pill. No second visual layer.
- Submit insert payload: `budget: null, preferred_time: null, location: null` (DB columns stay; we just don't ask).
- Helper line under submit: tighten to `"We reply within two business days."` (already short — keep).

**2. `src/components/QuickContactSheet.tsx`**
- Field labels become nouns to match site rule: `"Your name"` → `"Name"`. (`"Email or phone"` and `"One sentence about the project"` → keep `"Email or phone"`, change to `"About your project"`.)
- Tighten subhead from "Tap to call or email instantly — or send a short note below and we'll reply within two business days." → `"Tap to call or email — or send a short note."` (the "two business days" promise lives in the submit footer, no need to repeat in the header).
- Tighten contact placeholder `"you@example.com  ·  or  ·  403 970-7691"` → `"you@example.com  ·  403 970-7691"` (matches main form).
- Tighten textarea placeholder `"A sentence is plenty."` → keep.

**3. `src/lib/validation/consultation.ts`**
- Schema stays — `budget`, `preferredTime`, `location`, `projectType` remain optional. No DB migration needed; we just stop asking.
- Add a clarifying header comment that the visible form is now 3 fields and the optional fields are populated from URL only.

**4. `src/pages/Contact.tsx`** (verify after form change)
- The form gets shorter by ~280px on mobile. The right column will now end higher. No copy change needed — left rail already trimmed in the last pass.

**5. `src/pages/Index.tsx`** (verify)
- Bezel form gets shorter. No layout change needed — `cv-auto` reservation already generous.

### What's preserved
- All three required inputs (name, contact, message) — the data Cory actually needs to reply.
- `projectType` auto-fill from `?service=` query string (chips into the message context, still saved to the DB column).
- Inline success state, redirect-to-/thank-you, honeypot, phone-OR-email detection, Supabase insert shape, RLS contract.
- ThankYou page receipt-stamp logic (still passes `projectType` from state).

### What's deleted
- The `<details>` accordion + chevron animation.
- 4 optional dropdowns: project type, budget range, preferred time, location.
- "Add timing, budget, or location context · OPTIONAL" disclosure copy.
- The mental load of "should I open this?"

### Memory updates after build
- Add constraint: "Lead-capture forms are exactly 3 fields: name, contact, message. No collapsible 'optional' panel. Project-type auto-fills from URL only — never a visible dropdown."
