# Test the contact form end-to-end

Fire a real submission against the deployed `send-contact-confirmation` edge function with `parker@veepo.ca` as the submitter, then verify both emails actually sent from `havencreek-renovations.com`.

## Steps

1. **Invoke the edge function** with a realistic payload:
   - name: `Parker Test`
   - email: `parker@veepo.ca`
   - contactDisplay: `parker@veepo.ca`
   - contactKind: `email`
   - projectType: `Get a Free Quote — test`
   - message: short test sentence

2. **Check the response** for `{ ok: true, notified: true, confirmed: true }`.

3. **Tail edge function logs** for `send-contact-confirmation` to confirm no Resend errors (look for "Lead notification failed" / "Confirmation send failed").

4. **Query `email_send_log`** (dedup by `message_id`) for the last few minutes to confirm both rows show `status = sent`.

5. **Tell you to check Parker's inbox** — both the internal lead email (also goes to Cory) and the client confirmation should arrive from `@havencreek-renovations.com`.

## Notes

- This sends a real email to `parker@veepo.ca` AND `coryschwindt@gmail.com` (Cory is hardcoded in `NOTIFY_TO`). Heads up if you want to skip Cory's copy — I'd need to temporarily remove him from the notify list, which I'd rather not touch.
- No code changes. Pure verification.
