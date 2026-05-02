## Trim Questionnaire Copy — Shorter Labels, Fewer Words

The 3-field form already passed the speed-bump audit. What's left is **wordiness** — labels, helpers, success states, sheet headers, and validation messages all read longer than they need to. Tighten every string while keeping every input and every result the form generates.

### `src/components/ConsultationForm.tsx`

**Labels** (kept as nouns per memory rule, but shortened where natural):
- `"About your project"` → keep (already noun, already short — anything shorter loses meaning)
- `"Email or phone"` → keep (canonical site rule)
- `"Name"` → keep

**Placeholders** (trim filler):
- Name: `"Jane Doe"` → keep (2 words, anchor of warmth)
- Contact: `"you@example.com  ·  403 970-7691"` → keep (one example each, already minimal)
- Message: `"e.g. New deck on a 1990s walkout, hoping for spring."` → `"New deck, hoping for spring."` (drops the awkward "1990s walkout" specificity that was just filler)

**Submit button**:
- `"Send the Note"` → `"Send"` (the surrounding form context makes "the Note" redundant; matches Apple-grade form patterns)
- Sending state: `"Sending…"` → keep

**Helper line under submit**:
- `"We reply within two business days. No obligation."` → `"Reply within two business days."` (drops the over-promised "No obligation" which adds a sales-y note we don't need)

**Inline success state**:
- Headline: `"Thank you. We'll be in touch."` → keep (already perfect)
- Sub: `"We respond within two business days. If your project is time-sensitive, mention it when we reach out."` → `"We reply within two business days."` (one promise, one sentence)
- `"Send another note"` → `"Send another"` (button label tightening)

**Re: chip**:
- `"Re: {label}"` → keep (already minimal)

### `src/lib/validation/consultation.ts`

Validation messages all shorten to single-line, plain-English errors:
- `"Please share your name"` → `"Add your name."`
- `"Email or phone — whichever you prefer"` → `"Email or phone."`
- `"Please enter a valid email or phone number"` → `"Check the format."`
- `"A sentence about the project is plenty"` → `"A sentence is plenty."`
- `"Please keep this under 2,000 characters"` → `"Keep it under 2,000 characters."`
- `"Name must be under 100 characters"` → `"Keep it under 100 characters."`

### `src/components/QuickContactSheet.tsx`

- Eyebrow `"Quick Contact"` → keep (canonical chip)
- Title `"How would you like to reach us?"` → `"Reach us"` (the tile labels Call/Email already answer the question)
- Description `"Tap to call or email — or send a short note."` → keep
- Tile labels: `"Mon–Fri"` and `"Reply ≤ 2 days"` → keep (different facts, both informative)
- Email tile value: `"cory@haven…"` → keep (truncated for fit)
- Divider `"or send a short note"` → `"or"` (the form below it self-describes)
- Form labels (already nouns): keep `"Name"`, `"Email or phone"`, `"About your project"`
- Placeholders: keep tightened versions (already minimal from prior pass)
- Submit `"Send a short note"` → `"Send"` (matches main form)
- Submit footer `"Reply within 2 business days · No obligation"` → `"Reply within two business days."`
- Success sub: `"We respond within two business days. This sheet will close automatically."` → `"We reply within two business days."` (drop the auto-close meta-instruction; users see it close)
- Foot-rule button: `"Open the full form"` → `"Full form"`
- Foot-rule helper: `"Add timing, budget, or property location."` → **DELETE** entirely (we no longer collect those fields anywhere — this is dead copy referring to the deleted optional panel)

### What stays untouched
- Every form field, autocomplete attribute, inputmode, validation rule.
- Schema `min`/`max` lengths and the email-or-phone detection.
- Honeypot, Supabase insert payload, redirect-to-/thank-you, ThankYou state shape, RLS contract.
- Re: chip auto-fill from `?service=` URL param.
- Two-business-days promise — kept exactly once on each surface (helper line OR success state, not both).

### Memory after build
Update existing `mem://constraint/three-field-lead-form` with a "Copy is terse — single-clause labels, single-clause helpers, single-clause errors. No hedging ('Please…', 'whichever you prefer'), no over-promises ('No obligation')."
