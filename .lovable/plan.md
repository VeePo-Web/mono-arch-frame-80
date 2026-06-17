## What's actually wrong

I checked Resend directly. `havencreekrenovations.ca` is in the account, but its status is **`failed`** — meaning Resend cannot find the DNS records it needs. I also ran live DNS lookups against Google's resolver for the three records Resend expects, and **all three return empty**. So the records were never added at the registrar (or were added on a different domain).

That's why every send returns 403 — Resend refuses to send from a domain it hasn't verified.

Side note: `havencreek-renovations.com` (with a hyphen) IS verified on the same account. We could fall back to that if you'd rather not touch DNS right now.

## Fix — add 3 DNS records at your registrar (Canspace)

Log into Canspace → DNS for `havencreekrenovations.ca` → add exactly these three records (TTL = Auto/3600 is fine):

```text
Type   Host                    Value                                          Priority
----   --------------------    -------------------------------------------    --------
TXT    resend._domainkey       p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCw     —
                               b9vl7AWaaAvVwGm72Lx4bWA/+Kfy+59yRR/rwCbpQ
                               xWVht9nN/XQcDLLXLvOa/IhgDKLRKR9JyUDLXftwzE
                               m7d1/kARAzomfSPfjV2rAmCXHdwgmeDkTLUMaCGUY8
                               ViNOYD4lho2pJQHXZtuW8sIh9PZRi+nRM6IrbxFAxb
                               bEwIDAQAB
                               (paste as ONE single line, no spaces/breaks)

MX     send                    feedback-smtp.us-east-1.amazonses.com          10

TXT    send                    v=spf1 include:amazonses.com ~all              —
```

Notes:
- **Host = `resend._domainkey`** and **`send`** — NOT the full domain. Canspace will append `.havencreekrenovations.ca` automatically. If their UI requires the FQDN, use `resend._domainkey.havencreekrenovations.ca` and `send.havencreekrenovations.ca`.
- The DKIM TXT value must be one continuous string — line breaks will break it.
- If you already added these but on the wrong host name (e.g. `@` or the full domain typed twice like `resend._domainkey.havencreekrenovations.ca.havencreekrenovations.ca`), delete those and re-add.

Then in Resend → Domains → `havencreekrenovations.ca` → **Verify DNS records**. Usually flips green in a few minutes.

## Then I verify + retest (no code change needed)

The edge function already points at `leads@havencreekrenovations.ca` and `hello@havencreekrenovations.ca`. Once Resend flips to Verified, I will:

1. Re-list Resend domains to confirm `status: verified`.
2. Fire a test submission via `curl_edge_functions`.
3. Confirm response shows `"notified": true, "confirmed": true` (not the current `false/false`).
4. Report back.

## Fallback option (if you don't want to touch DNS)

I can swap both `from` addresses in `supabase/functions/send-contact-confirmation/index.ts` to the already-verified `havencreek-renovations.com` domain (`leads@havencreek-renovations.com` / `hello@havencreek-renovations.com`) and emails will start sending immediately. The downside is the From address won't match your `.ca` brand. Tell me "use the .com fallback" and I'll do that instead.

## Technical detail

- Resend domain ID: `1a2d2a92-7335-4411-880c-fbd93f45d145`, status `failed`, all 3 records `status: failed`.
- Live DNS check (`dig @8.8.8.8`) of `resend._domainkey.havencreekrenovations.ca`, `send.havencreekrenovations.ca` (TXT + MX) all returned empty.
- Gateway credentials themselves verify fine (`outcome: verified`) — this is purely a domain DNS issue, not an API key issue.
