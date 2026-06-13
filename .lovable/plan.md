# Switch Resend sends to verified domain

Now that `havencreekrenovations.ca` is verified in Resend, swap both `from` addresses off the sandbox so the lead notification + submitter confirmation actually deliver to both `parker@veepo.ca` and `coryschwindt@gmail.com`.

## Changes

**File:** `supabase/functions/send-contact-confirmation/index.ts`

1. Lead notification `from`: `"Haven Creek Leads <leads@havencreekrenovations.ca>"` (was `onboarding@resend.dev`)
2. Submitter confirmation `from`: `"Haven Creek Renovations <hello@havencreekrenovations.ca>"` (was `onboarding@resend.dev`)
3. Everything else stays as-is:
   - `to: ["parker@veepo.ca", "coryschwindt@gmail.com"]` for the lead notification
   - `reply_to: "coryschwindt@gmail.com"` on both sends
   - HTML/text bodies unchanged

## Deploy + verify

1. Deploy `send-contact-confirmation`.
2. Fire a test submission through the edge function with a real test payload.
3. Confirm 200s on both Resend calls in the function logs (no more 403 sandbox errors).
4. Report back what landed where.

No frontend or template changes needed.
