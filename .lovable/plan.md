## Changes to `supabase/functions/send-contact-confirmation/index.ts`

1. **Remove `parker@veepo.ca` from the lead recipient list** so on every contact form submission, leads only go to Cory's gmail:
   ```ts
   const NOTIFY_TO = ["coryschwindt@gmail.com"];
   ```

2. **Fix the founder's name** in the client confirmation email (currently shows "Cory Tymchuk", should be "Cory Schwindt") in both HTML and text bodies:
   - HTML: `Cory Tymchuk` → `Cory Schwindt`
   - Text: `Cory Tymchuk · Founder` → `Cory Schwindt · Founder`

3. **Deploy the edge function** so the changes go live.

4. **No test email will be sent.** I'll verify by inspecting the deployed function code only — no curl, no form submission.

## What stays the same
- Sender domain: `havencreek-renovations.com` (already connected)
- All website-displayed emails: unchanged
- Confirmation email to submitters: unchanged behavior (still sends from `hello@havencreek-renovations.com`)
- Reply-to on internal notifications still routes to the submitter's email when valid

## Result
Every contact form submission will:
- Send an internal lead notification **only to `coryschwindt@gmail.com`**
- Send a confirmation reply to the submitter signed by **Cory Schwindt, Founder**