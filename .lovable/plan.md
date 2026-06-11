Add an internal notification email to `parker@veepo.ca` whenever the contact form is submitted, alongside the existing submitter confirmation.

## Change
In `supabase/functions/send-contact-confirmation/index.ts`, after the confirmation email send (and regardless of whether the submitter provided an email or phone), POST a second email to the Resend gateway:

- **to**: `parker@veepo.ca`
- **from**: `Haven Creek Leads <onboarding@resend.dev>`
- **reply_to**: submitter's email if present, otherwise `cory@havencreekrenovations.com`
- **subject**: `New lead — {firstName}` (e.g. `New lead — Sarah`)
- **html / text**: same luxury cream-and-evergreen template grammar as the submitter email, but reframed as a lead notification:
  - Eyebrow: `NEW LEAD · HAVEN CREEK RENOVATIONS`
  - Headline: `{Name} just reached out.`
  - Contact block: name, email or phone, project type (if present)
  - Pull-quoted recap of their message (same evergreen left-rule italic serif)
  - Footer: timestamp + `havencreekrenovations.ca`

The notification fires for every submission (email or phone-only leads), so Parker sees every form fill. The submitter confirmation still only sends when an email was provided.

Also extend the function payload to accept `contactDisplay` (raw email or phone string from the form) so the notification can show the lead's actual contact method. `ConsultationForm.tsx` gets a one-line update to pass `contactDisplay: detected.value` and `contactKind: detected.kind` in the invoke body.

## Files
- **edit** `supabase/functions/send-contact-confirmation/index.ts`
- **edit** `src/components/ConsultationForm.tsx` (extend invoke payload)
