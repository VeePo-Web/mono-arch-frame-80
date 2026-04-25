# Plan — Consultation Confirmation Email

## Current state

- **Form UI** (`src/components/ConsultationForm.tsx`): already built per the original questionnaire spec — name, email, project type, budget, submit. Editorial styling (numeral-prefixed labels, hairline rows, cedar pill submit), success state, honeypot, react-hook-form + zod validation.
- **Database**: `public.consultations` exists with public-INSERT RLS (shape-validated) + admin-only SELECT/UPDATE/DELETE via `has_role()`.
- **Verified email domain**: `notify.calemwooddetailing.com` is ✅ verified — ready to send.
- **Missing**: no edge functions exist yet. Form inserts to DB but sends no confirmation email.

## What this plan does

Wire a branded confirmation email so every consultation submitter receives a reply within seconds, while preserving the lean home-page bundle, RLS posture, and editorial brand voice.

## Step 1 — Provision Lovable's app-email infrastructure

Run the managed setup that creates the email queue, send log, suppression list, unsubscribe tokens table, the `process-email-queue` cron, and vault secrets. Then scaffold the transactional sender stack (`send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`) plus the template registry.

No manual SQL — the platform tools own this infrastructure.

## Step 2 — Author a brand-matched confirmation template

Create `supabase/functions/_shared/transactional-email-templates/consultation-confirmation.tsx`:

- **React Email** component, white body background (mandatory), Fraunces-style serif heading + Inter-style body via web-safe stacks (Georgia / Arial fallbacks — email clients don't reliably load custom fonts).
- **Cedar accent** (`#B5651D`-family from the project palette) on the divider rule and signature line; plaster off-white inner card.
- **Personalised**: greets by first name, echoes the project type & budget range they selected (mapped from slug → human label), so the email feels written, not auto-generated.
- **Copy** (editorial, in Haven Creek voice — calm, no exclamation marks, no marketing CTAs):
  - Subject: `Thank you — your consultation request is in`
  - Body: acknowledges receipt, states the two-business-day response window, restates their selections as a "for the record" footnote (mirrors the site's `figure-footnote` pattern), signs off from the Haven Creek team.
- **No unsubscribe link in template body** — the system appends the compliant footer automatically (hard rule).
- Register in `registry.ts` with `displayName` and realistic `previewData`.

## Step 3 — Wire the trigger from the form

Update `src/components/ConsultationForm.tsx`:

1. Generate a `crypto.randomUUID()` for the consultation row, pass it as `id` on the insert (so we have a stable ID before the row exists in DB to derive the idempotency key from).
2. After a successful insert, fire-and-await `supabase.functions.invoke('send-transactional-email', { body: { templateName: 'consultation-confirmation', recipientEmail, idempotencyKey: \`consult-${id}\`, templateData: { name, projectTypeLabel, budgetLabel } } })`.
3. **Failure handling**: if the email invoke fails, the DB row still exists and the user still sees the success state — we surface a soft toast `"Saved — confirmation email may be delayed"` rather than blocking the success state, because the team can still reach out manually from the consultations table.
4. Honeypot path remains a silent no-op (no email, no DB write).

No UI/visual changes — the form already matches the questionnaire spec. The success state's `Fig. iv. RECEIVED` footnote already serves as the on-screen confirmation.

## Step 4 — Deploy & verify

- Deploy `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`, `process-email-queue`.
- Verify with one curl-style test invocation against `send-transactional-email` to confirm the template renders + enqueues.
- Inspect `email_send_log` for the test row's `pending → sent` transition.

## Files touched

**New**
- `supabase/functions/send-transactional-email/index.ts` (scaffolded)
- `supabase/functions/handle-email-unsubscribe/index.ts` (scaffolded)
- `supabase/functions/handle-email-suppression/index.ts` (scaffolded)
- `supabase/functions/process-email-queue/index.ts` (scaffolded)
- `supabase/functions/_shared/transactional-email-templates/registry.ts` (scaffolded)
- `supabase/functions/_shared/transactional-email-templates/consultation-confirmation.tsx` (authored)
- A small unsubscribe page in the app (path picked by the scaffold tool — likely `/unsubscribe`) styled to match the site's editorial system. Required so unsubscribe links in emails point to a branded page, not a raw function URL.

**Edited**
- `src/components/ConsultationForm.tsx` — generate id, invoke email function, soft-fail toast.
- `src/App.tsx` — register the unsubscribe route.
- Database migration: `consultations.id` already has `gen_random_uuid()` default, but we'll pass our client-generated UUID to keep the idempotency key reliable. No schema change needed.

## What stays untouched

- Form copy, layout, fields, validation, success state, honeypot — all already match the questionnaire spec.
- `consultations` table schema + RLS policies — unchanged.
- The lazy-loaded form pattern on the home page — preserved.

## Out of scope (intentionally)

- **Internal "new lead" notification email to the business** — not requested. Easy to add later as a second template + parallel invoke.
- Admin dashboard for browsing consultations — the existing admin-only SELECT policy already enables this when needed.
- Marketing/follow-up sequences — would be a marketing email, which Lovable's transactional system intentionally does not support.
