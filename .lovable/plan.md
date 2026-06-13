## Changes

### 1. Replace all display email addresses → `coryschwindt@gmail.com`
- `src/components/QuickContactSheet.tsx` line 17: `STUDIO_EMAIL`
- `src/components/contact/ContactBrandStack.tsx` line 5: `STUDIO_EMAIL`
- `src/components/nav/MenuOverlay.tsx` line 22: `STUDIO_EMAIL` (was `hello@havencreek.ca`)
- `src/pages/Contact.tsx` line 14: `STUDIO_EMAIL`
- `.lovable/owner-brief.md` line 101: docs reference

### 2. Edge function `supabase/functions/send-contact-confirmation/index.ts`
- `NOTIFY_TO` becomes an array: `["parker@veepo.ca", "coryschwindt@gmail.com"]` and is passed directly as the Resend `to` field so both addresses receive the lead notification.
- `reply_to` fallback (line 236) → `coryschwindt@gmail.com`
- Submitter confirmation `reply_to` (line 247) → `coryschwindt@gmail.com`
- HTML body mailto link + display (line 59) → `coryschwindt@gmail.com`
- Text body line 84 → `coryschwindt@gmail.com`

### 3. Deploy + test
- Deploy `send-contact-confirmation`.
- Call it via `supabase--curl_edge_functions` with a sample payload (name, email, message) and confirm a 200 response + both notifyRes/confirmRes succeed in logs.
- Pull recent function logs to verify both sends succeeded.

### Note on Resend sender
`from` stays on `onboarding@resend.dev` (Resend's shared sandbox sender). With that sender, Resend only delivers to verified addresses on the account; if `parker@veepo.ca` or `coryschwindt@gmail.com` aren't both verified on the Resend connector account, one of the two notification sends will be rejected. I'll flag this in the test result rather than try to switch the sender domain in this turn.