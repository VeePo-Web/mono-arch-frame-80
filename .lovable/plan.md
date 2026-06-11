# Resend confirmation email for Contact form

Resend is already connected (`RESEND_API_KEY` live). Plan:

## 1. Edge function — `supabase/functions/send-contact-confirmation/index.ts`
- POST with `{ name, email, message, projectType? }`.
- Validates input (zod), CORS, returns JSON.
- Sends one email through the Resend connector gateway (`https://connector-gateway.lovable.dev/resend/emails`) using `LOVABLE_API_KEY` + `RESEND_API_KEY`.
- `from`: `Haven Creek Renovations <onboarding@resend.dev>` (testing default — swap to a verified domain when ready).
- `reply_to`: `cory@havencreekrenovations.com` so replies go straight to Cory.
- `to`: the submitter's email (only sent when the contact field is an email — phone-only leads skip the send silently).
- Subject: `We received your note — Haven Creek Renovations`.
- Logs failures but never blocks the user (form already saved to DB).

## 2. Luxury email template (inline HTML, single file)
Editorial, restrained — same grammar as the site:
- Cream background `#F5F1EA`, evergreen `#2E3E2E`, foreground `#1A1A1A`.
- Serif display headline (Georgia/Garamond stack) + sans body (system).
- Layout: 560px centered card on cream, generous padding (48px desktop / 32px mobile).
- Structure:
  1. Tiny eyebrow: `HAVEN CREEK RENOVATIONS · FOOTHILLS, ALBERTA`
  2. Hairline rule
  3. Serif H1: `Thank you, {firstName}.`
  4. Lede: `Your note is in. A real person — Cory — will reply within two business days.`
  5. Quoted recap of their project message in italic serif, indented with a left evergreen hairline (like a pull-quote).
  6. Hairline rule
  7. Sign-off block: `Cory Tymchuk · Founder` + tel link `403 970-7691` + email link.
  8. Quiet footer micro-copy with address line + 11px tracked-uppercase `HAVENCREEKRENOVATIONS.CA`.
- All inline styles, table-based for Outlook safety, no external fonts (system serif stack), no images so it renders instantly.
- Plain-text fallback included.

## 3. Wire from `ConsultationForm.tsx`
After the successful `supabase.from('consultations').insert(...)`:
```ts
supabase.functions.invoke('send-contact-confirmation', {
  body: { name, email: detected.kind === 'email' ? detected.value : null, message: values.message, projectType: values.projectType ?? null }
}).catch(err => console.warn('confirmation email failed', err));
```
Fire-and-forget — never blocks redirect to `/thank-you`.

## 4. Deploy
Deploy the new edge function after creating it.

## Notes / decisions
- Using `onboarding@resend.dev` for the From address so it works immediately. To send from `@havencreekrenovations.com` you'd need to verify that domain in Resend later — I'll flag it in the closing message.
- No internal notification email to Cory in this pass (you only asked for the submitter confirmation). Easy to add later as a second `fetch` in the same function.
- No new dependencies, no schema changes.

## Files
- **new** `supabase/functions/send-contact-confirmation/index.ts`
- **edit** `src/components/ConsultationForm.tsx` (one invoke call after insert)
