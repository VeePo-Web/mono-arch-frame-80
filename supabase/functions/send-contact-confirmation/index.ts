// Sends a luxury confirmation email to a Haven Creek contact-form submitter
// via the Lovable Resend connector gateway.
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

interface Payload {
  name?: string;
  email?: string | null;
  message?: string;
  projectType?: string | null;
  contactDisplay?: string | null;
  contactKind?: "email" | "phone" | null;
}

const NOTIFY_TO = "parker@veepo.ca";


const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );

const buildHtml = ({ firstName, message }: { firstName: string; message: string }) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Thank you</title></head>
<body style="margin:0;padding:0;background:#F5F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1A1A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F1EA;padding:48px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#F5F1EA;">
      <tr><td style="padding:8px 40px 0 40px;">
        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#2E3E2E;font-weight:600;">Haven Creek Renovations &middot; Foothills, Alberta</p>
        <div style="height:1px;background:rgba(26,26,26,0.12);margin:28px 0 36px 0;"></div>

        <h1 style="margin:0;font-family:'Cormorant Garamond',Garamond,Georgia,'Times New Roman',serif;font-weight:400;font-size:38px;line-height:1.1;letter-spacing:-0.01em;color:#1A1A1A;">
          Thank you, ${escapeHtml(firstName)}.
        </h1>

        <p style="margin:24px 0 0 0;font-size:16px;line-height:1.65;color:#1A1A1A;">
          Your note is in. A real person &mdash; Cory &mdash; will reply within two business days.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:40px 0 0 0;">
          <tr>
            <td width="2" style="background:#2E3E2E;width:2px;"></td>
            <td style="padding:4px 0 4px 20px;font-family:'Cormorant Garamond',Garamond,Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.55;color:#1A1A1A;">
              &ldquo;${escapeHtml(message)}&rdquo;
            </td>
          </tr>
        </table>

        <div style="height:1px;background:rgba(26,26,26,0.12);margin:44px 0 32px 0;"></div>

        <p style="margin:0;font-size:15px;line-height:1.6;color:#1A1A1A;">
          Cory Tymchuk<br>
          <span style="color:rgba(26,26,26,0.55);font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Founder</span>
        </p>
        <p style="margin:18px 0 0 0;font-size:14px;line-height:1.7;color:#1A1A1A;">
          <a href="tel:+14039707691" style="color:#2E3E2E;text-decoration:none;">403 970-7691</a><br>
          <a href="mailto:cory@havencreekrenovations.com" style="color:#2E3E2E;text-decoration:none;">cory@havencreekrenovations.com</a>
        </p>

        <div style="height:1px;background:rgba(26,26,26,0.08);margin:48px 0 24px 0;"></div>

        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(26,26,26,0.45);">
          Havencreekrenovations.ca
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;

const buildText = ({ firstName, message }: { firstName: string; message: string }) =>
  `HAVEN CREEK RENOVATIONS · FOOTHILLS, ALBERTA

Thank you, ${firstName}.

Your note is in. A real person — Cory — will reply within two business days.

"${message}"

Cory Tymchuk · Founder
403 970-7691
cory@havencreekrenovations.com

havencreekrenovations.ca`;

interface LeadVars {
  name: string;
  contactDisplay: string;
  contactKind: "email" | "phone" | "unknown";
  projectType: string | null;
  message: string;
  receivedAt: string;
}

const buildLeadHtml = ({ name, contactDisplay, contactKind, projectType, message, receivedAt }: LeadVars) => {
  const contactHref =
    contactKind === "email"
      ? `mailto:${contactDisplay}`
      : contactKind === "phone"
        ? `tel:${contactDisplay.replace(/[^\d+]/g, "")}`
        : "";
  const contactCell = contactHref
    ? `<a href="${contactHref}" style="color:#2E3E2E;text-decoration:none;">${escapeHtml(contactDisplay)}</a>`
    : escapeHtml(contactDisplay);
  const rows: Array<[string, string]> = [
    ["Name", escapeHtml(name)],
    [contactKind === "phone" ? "Phone" : "Email", contactCell],
  ];
  if (projectType) rows.push(["Project", escapeHtml(projectType)]);

  const rowsHtml = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:10px 0;width:90px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(26,26,26,0.55);vertical-align:top;">${k}</td>
          <td style="padding:10px 0;font-size:15px;color:#1A1A1A;vertical-align:top;">${v}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New lead</title></head>
<body style="margin:0;padding:0;background:#F5F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1A1A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F1EA;padding:48px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#F5F1EA;">
      <tr><td style="padding:8px 40px 0 40px;">
        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#2E3E2E;font-weight:600;">New Lead &middot; Haven Creek Renovations</p>
        <div style="height:1px;background:rgba(26,26,26,0.12);margin:28px 0 36px 0;"></div>

        <h1 style="margin:0;font-family:'Cormorant Garamond',Garamond,Georgia,'Times New Roman',serif;font-weight:400;font-size:38px;line-height:1.1;letter-spacing:-0.01em;color:#1A1A1A;">
          ${escapeHtml(name)} just reached out.
        </h1>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0 0;border-top:1px solid rgba(26,26,26,0.08);border-bottom:1px solid rgba(26,26,26,0.08);">
          ${rowsHtml}
        </table>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:36px 0 0 0;">
          <tr>
            <td width="2" style="background:#2E3E2E;width:2px;"></td>
            <td style="padding:4px 0 4px 20px;font-family:'Cormorant Garamond',Garamond,Georgia,'Times New Roman',serif;font-style:italic;font-size:18px;line-height:1.55;color:#1A1A1A;">
              &ldquo;${escapeHtml(message)}&rdquo;
            </td>
          </tr>
        </table>

        <div style="height:1px;background:rgba(26,26,26,0.08);margin:44px 0 24px 0;"></div>

        <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(26,26,26,0.45);">
          Received ${escapeHtml(receivedAt)} &middot; havencreekrenovations.ca
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
};

const buildLeadText = ({ name, contactDisplay, contactKind, projectType, message, receivedAt }: LeadVars) =>
  `NEW LEAD · HAVEN CREEK RENOVATIONS

${name} just reached out.

Name: ${name}
${contactKind === "phone" ? "Phone" : "Email"}: ${contactDisplay}${projectType ? `\nProject: ${projectType}` : ""}

"${message}"

Received ${receivedAt} · havencreekrenovations.ca`;


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as Payload;
    const name = (body.name ?? "").trim().slice(0, 100);
    const email = (body.email ?? "").trim().toLowerCase();
    const message = (body.message ?? "").trim().slice(0, 2000);

    // Basic email shape — silently no-op for phone-only leads
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ skipped: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!name || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const firstName = name.split(/\s+/)[0];

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Haven Creek Renovations <onboarding@resend.dev>",
        to: [email],
        reply_to: "cory@havencreekrenovations.com",
        subject: "We received your note — Haven Creek Renovations",
        html: buildHtml({ firstName, message }),
        text: buildText({ firstName, message }),
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Resend gateway error", res.status, data);
      return new Response(JSON.stringify({ error: "Send failed", status: res.status, data }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id ?? null }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-contact-confirmation error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
