# Stand up Haven Creek's own email loop

You're right — `notify.calemwooddetailing.com` belongs to a different client. We don't borrow it. Haven Creek gets its own sender domain so every email Cory (and his leads) receive comes `from` a Haven Creek address.

## 1. Provision `notify.havencreekrenovations.com`

- Open the Lovable email-setup dialog scoped to this project so the verified subdomain is `notify.havencreekrenovations.com`.
- Cory (or whoever holds the registrar login for `havencreekrenovations.ca` / `.com`) adds the NS records Lovable returns — `ns3.lovable.cloud` / `ns4.lovable.cloud` on the `notify` subdomain only. Root domain stays untouched.
- Wait for verification (status flips to `active`). Scaffolding can proceed before verification; sends just queue until DNS resolves.

Surface to user via the email-setup presentation action. Do not reuse another workspace's domain.

## 2. Stand up email infrastructure on this project

- Run `setup_email_infra` so this project gets its own pgmq queues, `process-email-queue` cron, send log, suppression list, and unsubscribe tokens. Calemwood's infra is in a different project — none of it carries over.

## 3. Scaffold the two Haven Creek templates

Both live at `supabase/functions/_shared/transactional-email-templates/` in this project, sent from `notify.havencreekrenovations.com`:

1. **`lead-notification`** → `cory@havencreekrenovations.com`
   - Subject: `New enquiry — {{name}}`
   - Editorial cream/evergreen layout matching the site. Name, contact (email or phone), project blurb, source page, timestamp.

2. **`lead-confirmation`** → the submitter
   - Subject: `Thanks — we'll be in touch`
   - Warm two-business-day reply promise, signed "Cory · Haven Creek Renovations". Same brand grammar as `ThankYou.tsx`.

Register both in `registry.ts`. No unsubscribe text in the template body — the system appends it. Footer signature uses `STUDIO_PHONE_DISPLAY` + `cory@havencreekrenovations.com`.

## 4. Wire the form

In `ConsultationForm.onSubmit`, right after the successful `supabase.from('consultations').insert(...)`, invoke `send-transactional-email` twice:

- `lead-notification` to Cory, idempotency key `lead-notify-{row.id}`
- `lead-confirmation` to the submitter (only when `detected.kind === "email"` — phone-only leads skip the confirmation email but Cory still gets notified), idempotency key `lead-confirm-{row.id}`

`templateData` passes only fields the template actually renders: `name`, `contact`, `message`, `projectLabel`, `source`, `submittedAt`.

## 5. QA the loop end-to-end

- Submit a test lead from `/contact` desktop and mobile.
- Confirm Cory's inbox shows the notification with the correct `from` address (`notify.havencreekrenovations.com`) and Haven Creek branding.
- Confirm the submitter's inbox receives the confirmation.
- Confirm `consultations` row exists and `email_send_log` shows two `sent` rows tied to that submission.
- Verify nothing in the deployed function references `calemwooddetailing` or any other workspace.

## 6. Owner brief update

Once verified, strike "Email loop" from the "Known gaps for round 2" list in `.lovable/owner-brief.md` and replace with a one-line "Lead emails wired — Cory + submitter both receive a Haven Creek-branded message on submit."

## What stays untouched

- `notify.calemwooddetailing.com` — different client, different project. Never referenced in Haven Creek code, templates, or DNS.
- All site UI — this is backend wiring only. No component edits beyond the `ConsultationForm.onSubmit` invoke calls.

## Open question for you before I build

**Confirm the inbox.** Should Cory's notifications land at `cory@havencreekrenovations.com` (what's currently hardcoded in `ContactBrandStack.tsx` + the owner brief), or a different address (e.g. `leads@…`, a Gmail he checks more often)? Same answer drives the `From` reply-to on the confirmation email.
