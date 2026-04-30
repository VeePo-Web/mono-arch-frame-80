
## Forensic UX Audit — Findings

I read every page and shared component as a third-party Apple UX consultant. The bones are excellent — typography system, spacing tokens, motion language are world-class. What's dragging the experience down is **redundancy, copy fatigue, and a few brand-rule violations**. Below is the findings + fix plan.

---

### A. Brand-rule violations — must fix (highest priority)

The Core memory is explicit: primary CTAs are **"Get a Quote" / "Get a Free Quote"** — never "Consultation," never industry jargon. Yet the codebase still ships seven violations:

| File | Current label | Fix |
|---|---|---|
| `ClosingCta.tsx` (default prop) | `Request a Consultation` | `Get a Free Quote` |
| `Footer.tsx` | `Request a Consultation` | `Get a Free Quote` |
| `Services.tsx` (closing) | `Request a Consultation` | `Get a Free Quote` |
| `Services.tsx` (hero) | `Discuss your project` | `Get a Free Quote` |
| `ServiceAreas.tsx` (closing) | `Request a Consultation` | `Get a Free Quote` |
| `ServiceAreas.tsx` (hero) | `Discuss your area` | `Get a Free Quote` |
| `AreaPage.tsx` (closing) | `Request a Consultation` | `Get a Free Quote` |
| `AreaPage.tsx` (hero) | `Talk through your {Area} property` | `Get a Free Quote` |
| `About.tsx` ×2 | `Talk through your project` | `Get a Free Quote` |
| `Work.tsx` (hero) | `Discuss similar work` | `Get a Free Quote` |
| `InteriorFinishing.tsx` (hero) | `Discuss interior finishing` | `Get a Free Quote` |
| `ConsultationForm.tsx` submit | `Request the Conversation` | `Send the Note` (form context — "Get a Free Quote" reads weird inside the form itself; this preserves the editorial voice without the jargon) |

Also rewrite `useSeo` description in `Contact.tsx` and `ThankYou.tsx` to remove "consultation" wording.

---

### B. The "two business days" fatigue (16 occurrences)

Site-wide, the same phrase appears **16 times** — twice in the Hero alone (trust microcopy + StatCard), three times on Contact, twice on Thank-You, twice in the form, once in Footer, etc. By the time a visitor reaches the form they've read it five times. Apple-grade copy says it once, in the right place, and trusts the reader.

**Strategy:**
- **Keep** in: form helper text, Contact-page step "We reply", QuickContactSheet success state, Thank-You hero. (4 instances — each is in a moment of genuine information need.)
- **Remove from**: Hero trust microcopy (replace with "No automated funnel"), Index final-CTA lede ("usually the same day" line), Index area CTA caption, Footer (replace with "We're a small team — every note reaches Cory directly."), Contact dossier strip, Contact direct-contact list row #03 (turn into hours instead).

Net: 16 → 4 occurrences. The promise becomes credible instead of performative.

---

### C. Home page (`Index.tsx`) — cognitive load audit

The page is technically beautiful but asks the visitor to absorb **seven sections + a 5-field form**. Specific drag points:

**1. Final-CTA band is doing five jobs.** It has: (a) headline + lede, (b) "real person" microcopy, (c) escape-hatch contact list, (d) form bezel with seal, (e) numbered promise list. Visually impressive, decision-paralysing in practice.
**Fix:** Drop the numbered promise list (item #4 — duplicates trust strip + how-it-goes content). Keep headline, escape hatch, form. Three things, not five.

**2. Trust strip card #3 ("One contractor / Start → finish") repeats** what HowItGoes says better with three full steps directly below.
**Fix:** Replace card #3 with something the rest of the page does *not* say: a **named human** — "Cory · Owner-builder" / "Replies personally". This grounds the trust claim in a person, which the persona doc explicitly asks for.

**3. Form section header is too long** ("A few details about your property and what's on your mind. We'll write back within two business days — usually the same day — with a couple of clear questions, not a template quote."). 38 words above a 5-field form.
**Fix:** Cut to: "Tell us about the place. A real person — Cory — will reply within two business days." Trims the lede 60%.

**4. Mobile escape-hatch & desktop escape-hatch render twice** (one `lg:hidden`, one `hidden lg:block`). Both maintained, both styled differently.
**Fix:** Single responsive component — same markup, fluid styling. -40 lines, -1 maintenance trap.

---

### D. Contact page (`Contact.tsx`)

**1. Three-step sticky "What happens next" duplicates HowItGoes on the home page** *and* the surveyor frame on `/services`. Same content, third presentation.
**Fix:** Reduce to two steps: "01 You write" / "02 We reply within two business days, with a clear next step." Drop "We walk the property" + "A thoughtful quote" — these are inferred and don't help the user *complete the form*. The sticky rail becomes shorter and easier to scan beside the form.

**2. "Or reach us directly" panel below the form is a third-time CTA.** The user already saw the email/phone in the nav, the form has a "phone or email" field, and now there's a third surface listing the same contact info with numerals 01/02/03 (the "03" item is just business hours dressed up as a contact method).
**Fix:** Replace the styled `<ul>` with a single calm two-row block: just the email and the phone, both as large tappable rows. Drop the "03 · Reply within two business days · MON–FRI" row (this is the redundancy we agreed to thin in §B).

**3. § II "About the quote" pull-quote band sits between the form and service-areas.** It's editorial filler — it says "pricing is custom" — which is exactly what `/services` § III already says (twice). On a contact page, the visitor's job is "submit the form." Anything between the form and exit that isn't task-supporting is friction.
**Fix:** Delete § II entirely on Contact. (The same content lives on `/services`.)

**4. § III "Where we work" on Contact** is a duplicate of `/service-areas`. After someone has submitted intent, do they need a fourth re-listing of the four areas?
**Fix:** Compress to a single line under the form's "location" field hint: "Bragg Creek · Rocky View County · Bearspaw · Water Valley." Delete the entire § III RevealSection.

Net: Contact goes from 4 sections → 1 section + a tighter form. The page becomes a focused conversion surface, not a content tour.

---

### E. ConsultationForm — friction-cost audit

Form is already well-built (collapsible context, single contact field, honeypot). Two small gains:

**1.** Helper line "Email or phone — whichever you prefer." duplicates the placeholder which already shows both. Cut.
**2.** Submit button label "Request the Conversation" is editorial-precious *and* breaks the "Get a Quote" rule by association. Change to **"Send the Note"** (matches the Thank-You heading "We've got your note").
**3.** Honeypot field works; no change needed.

---

### F. Services page (`Services.tsx`)

**1.** § II "Full-circle support" surveyor-frame duplicates HowItGoes on home with different visuals.
**Fix:** Keep, but reduce from 3 numbered steps to a single confident statement + the surveyor frame as decoration. The numbered list is the third time the visitor has seen "Conversation → Planning → Build" by this point.

**2.** § III "About quotes" + bento "What a quote includes" together are a 5-tile checklist the user is unlikely to scan.
**Fix:** Trim bento from 5 → 3 tiles: "Scope, written plainly" / "Materials by name" / "All-in price." Same trust signal, half the visual weight.

---

### G. Service detail pages (Interior / Exterior / Decking)

**1.** Each has § II "Why it matters" pull-quote band that is one italic sentence inside a section-wash. Visually heavy for one sentence.
**Fix:** Move the italic line directly under the § I SectionHeader as a `BODY.quote`. Delete the standalone § II RevealSection. Saves ~120vh of scroll on each page.

**2.** § IV "Project proof" PremiumCard uses a **vignette** placeholder, not a real photo. The plate label says "Plate I" — but the data already has real photos in `workPhotos`. (Confirmed via `servicePhotos[s.slug]` usage on `/services` working fine.)
**Fix:** Replace `<InteriorVignette />` / `<ExteriorVignette />` / decking equivalents in the proof card with the real photo from `workPhotos[proof.slug]`, falling back to vignette only when missing. (The hero vignette stays — it's an editorial frame, not a placeholder.)

---

### H. About page (`About.tsx`)

**1.** § III "Hands-on continuity" → 3 InfoCards that say what § II + § IV already say differently.
**Fix:** Delete § III entirely. Page goes 4 sections → 3, each with a distinct argument.

**2.** Eyebrow + `text-headline` hand-rolled stacks (lines 91–94, 126–128, 151–154) bypass the SectionHeader primitive that already exists.
**Fix:** Migrate to `<SectionHeader>` for visual consistency with Services/Index/Contact.

---

### I. ServiceAreas page

**1.** Eyebrow uses ALL-CAPS hand-rolled labels (`THE ROSTER`, `BUILT FOR RURAL SERVICE`) bypassing `SectionHeader`.
**Fix:** Migrate both sections to `<SectionHeader>`.

**2.** § II "Built for rural service" 4-item FIT list duplicates the HowItGoes-style numbered 01/02/03/04 already used on Areas/Services/Home.
**Fix:** Reduce 4 → 3 items (drop "Land & wildlife" — overlap with "Property access"). Keep the editorial figure-footnote header.

---

### J. Work page (`Work.tsx`)

**1.** Filter rail has **8 chips** (All + 3 categories + 4 areas). On mobile this wraps to 3 lines and creates a chip wall before any work shows.
**Fix:** Split into two visual rows with quiet labels: "Type" (3 chips) / "Area" (4 chips). "All" becomes an explicit reset link to the right of the chips. Removes one chip, adds clarity, halves perceived chip count.

**2.** Empty-state copy currently reads: "No plates in this category yet. We're adding work as it's photographed." — fine, but the chip stays selected so the user is stuck.
**Fix:** Empty state gets a "Show all work" reset button.

---

### K. ThankYou page

**1.** § II "While you wait" → 4-card grid (Work / Services / Service Areas / About). After submitting, offering 4 next-steps is paradox-of-choice.
**Fix:** Reduce to 2 cards: "See the Work" + "How we work" (About). The other two are reachable via nav and don't earn prime real estate after a conversion.

**2.** § III "Quiet sign-off" personalized branch ("No need to refresh — we'll come to you.") is a third reassurance after the hero subhead and the receipt stamp. Cut.

---

### L. Footer

**1.** "Request a Consultation" CTA — fix per §A.
**2.** Service areas list (4 links) and Services list (3 links) duplicate the menu drawer columns exactly. On a calm site this is fine, but on mobile the footer becomes a 4-column re-statement of the nav.
**Fix:** Mobile-only — hide the "Service areas" footer column (kept on desktop). The drawer + nav already cover this on small screens. Net: cleaner mobile footer, no info loss.

---

### M. Hero — small refinements

**1.** "Trust microcopy" line shows three claims (Reply within 2 business days · No obligation · No pressure). "No obligation" and "No pressure" are near-synonyms.
**Fix:** Drop "No pressure". Two claims, not three.

**2.** "Trusted in {4 areas}" line directly below — restates the "Bragg Creek · Rocky View · Bearspaw · Water Valley" already shown in the StatCard caption ("Areas served · 4") immediately below in the trust strip.
**Fix:** Keep the Hero "Trusted in" line (it's an active link rail), rewrite the StatCard caption to "Foothills, west & north of Calgary" — communicates *where* without re-listing.

---

### N. Spacing/header drift cleanup

A handful of older pages still use `text-headline` directly + hand-rolled `<Eyebrow>` stacks instead of `<SectionHeader>` (About §II/III/IV, ServiceAreas §I/II, ThankYou §I/II). Migrate all to `<SectionHeader>` so spacing and reveal timing are uniform across the site.

---

## Implementation order (single pass)

1. Brand-rule CTA copy fix (12 files) — `ClosingCta.tsx` default + every override.
2. ConsultationForm submit label + helper-line trim.
3. Site-wide "two business days" thinning (per §B list).
4. Index.tsx — final-CTA simplification, trust-strip card #3 swap, escape-hatch dedupe.
5. Contact.tsx — drop §II, §III; trim sticky rail to 2 steps; replace contact list with 2-row block.
6. About.tsx — delete § III; migrate §II/III/IV to SectionHeader.
7. ServiceAreas.tsx — migrate to SectionHeader; trim FIT list 4→3.
8. Service detail pages (×3) — fold "Why it matters" into §I; replace proof-card vignette with real photo when present.
9. Services.tsx — trim "What a quote includes" 5→3; collapse §II numbered list.
10. Work.tsx — split filter rail into Type/Area rows; add reset-to-all empty state.
11. ThankYou.tsx — reduce §II grid 4→2; cut personalized §III line.
12. Footer.tsx — fix CTA copy; hide service-areas column on mobile.
13. Hero.tsx — drop "No pressure"; rewrite StatCard #2 caption.

Memory is updated only if these decisions change Core rules — they don't (they reinforce existing ones).

## Out of scope (intentional)

- Photography mapping (already done in earlier loop)
- Navigation drawer / hamburger / section rail (Core rules forbid changes)
- Color palette, typography tokens, motion language
- New features or new pages
- Anything in QuickContactSheet beyond the "two business days" trim

Approve and I'll switch to build mode and execute in the order above.
