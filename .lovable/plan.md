# Switch contact-form sender to havencreek-renovations.com

Your `havencreek-renovations.com` domain is already verified in Resend (DNS on Vercel), so no DNS work needed. This is a code-only change in one edge function. Zero visible changes on the website — only the "From" address on the two contact-form emails.

## What changes

File: `supabase/functions/send-contact-confirmation/index.ts`

1. Internal lead email `from:` → `Haven Creek Leads <leads@havencreek-renovations.com>`
2. Client confirmation email `from:` → `Haven Creek Renovations <hello@havencreek-renovations.com>`
3. Email-body footer text `havencreekrenovations.ca` → `havencreek-renovations.com` (two spots, both inside the email HTML/text — not on the website)
4. Redeploy the function and fire a live test submission to confirm both emails arrive

## What does NOT change

- No website copy, links, or branding touched — site still reads `havencreekrenovations.ca` everywhere visitors look
- `reply_to` stays `coryschwindt@gmail.com` so replies still land in Cory's inbox
- Recipients (Parker + Cory) unchanged
- No DNS work, no `.ca` Resend setup, no Lovable Emails

## Confirm before I build

The two mailbox names — `leads@` (internal notifications) and `hello@` (client-facing confirmations) — are just labels Resend will send as; you don't need to create real inboxes for them since `reply_to` redirects replies. Good to proceed with those, or want different prefixes (e.g. `noreply@`)?
