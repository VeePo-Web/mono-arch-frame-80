# Pre-Client Polish — "Ready to show Cory" pass

Goal: every surface Cory touches in his first 5 minutes feels intentional and on-brand. Ordered by credibility impact, ranked exactly as you asked: photography → form delivery → favicon/OG → mobile QA → everything else.

---

## 1. Photography audit (the credibility lift)

Status check first — `src/assets/photography/index.ts` already maps all 6 work slugs and `RecentWorkPreview` + `Work.tsx` already pass `photoSrc={workPhotos[p.slug]}`. So the placeholder shell only shows if a file is missing. All 6 `work-*.jpg` files exist on disk.

Action:
- Visually QA each of the 6 work photos in-place by rendering `/work` and `/` and screenshotting. Confirm none of them are still the painted typographic plate. If any tile reads as a wireframe, regenerate that specific photo at premium tier with a tight brand-aligned prompt (rural Alberta, no people, calm cedar/evergreen/warm-off-white palette per `1.5-brand-identity-north-star.md`).
- Audit the supporting photography too: `hero-detail-trim` (home Hero plate), `exteriorDetailSoffit` (Work hero backdrop), `aboutToolsBench` (About), `closingPrairie` / `closingPhotoMoment` (PhotoBleed). Any that read as AI-tellish get regenerated.
- Add `alt` audit pass — every image should have a descriptive alt that names the work, not the filename.

Out of scope: shooting real photos. These stay AI-generated, calibrated to the brand contract. Cory provides real photos in round 2.

---

## 2. Form delivery — close the loop end-to-end

Today: `ConsultationForm` inserts into the `consultations` table. No email goes to Cory. He has to log into the backend to see leads. Unacceptable for a demo where he'll test the form himself.

Action:
- Stand up email infrastructure (`setup_email_infra` + `scaffold_transactional_email`) on the project's verified domain. If no domain is configured yet, surface the email setup dialog so Cory's address is the sender.
- Create two transactional templates in `supabase/functions/_shared/transactional-email-templates/`:
  1. **`lead-notification`** — to Cory (`cory@havencreekrenovations.com`): name, contact, project blurb, source page, timestamp. Plain editorial layout, cream/evergreen palette matching the site.
  2. **`lead-confirmation`** — to the submitter: warm two-business-days reply promise, signed from Cory. Same brand tone as `ThankYou.tsx`.
- Add a Postgres trigger (or invoke from the form submit path in `ConsultationForm.onSubmit`) that calls `send-transactional-email` for both templates with an idempotency key derived from the new row id.
- QA by submitting a test lead and verifying both inboxes receive the right message.

Phone & email sanity check piggybacks here: confirm with Cory in the owner brief that `403 970-7691` + `cory@havencreekrenovations.com` are the public-facing channels.

---

## 3. Favicon + social card — first-impression chrome

Today: `index.html` references `/favicon.ico`, `/favicon-32.png`, `/apple-touch-icon.png`, and `/og-image.jpg`. Verify each file exists in `public/`. If any are missing or generic Lovable defaults, replace.

Action:
- Generate a brand favicon set (cream H mark on evergreen, or evergreen H on cream — match `BrandMark.tsx`): `/favicon.ico`, `/favicon-32.png`, `/apple-touch-icon.png` (180×180).
- Generate `/og-image.jpg` at 1200×630 premium tier: a calm composition with the wordmark + a single signature photo + the tagline "Trusted renovations for rural homes." Cream ground, evergreen type, no busy chrome. This is the texted-to-wife moment.
- Spot-check the OG card with the LinkedIn Post Inspector / Twitter card validator after deploy.

---

## 4. Mobile QA pass — real device, not devtools

Action (scripted walk-through on a real iOS device + Android):
- `/` — Hero photo plate stacks below type, `PhotoBleed` blur reads as soft, `RecentWorkPreview` grid is a single column, `BigCloseCTA` form is reachable, no horizontal scroll.
- `/contact` — `.contact-sticky-cta` clears the iOS home-bar via `env(safe-area-inset-bottom)`, Send button disabled state syncs with the form, keyboard doesn't trap focus, autofocus order is Name → Email/phone → Message.
- `MenuOverlay` — open/close animation runs at 60fps, route names don't clip (Services is the widest), close pill is tappable, Esc + backdrop tap both close, scroll lock works.
- Nav bar — direction-aware hide/show feels intentional, brand-mark crossfade reads correctly over the hero photo, Quote CTA + Phone hidden below `lg` (correct).
- `/work` — asymmetric grid stacks cleanly on mobile, all six photos load lazily without layout shift.

Log issues into a short fix list; resolve before sending the link.

---

## 5. Copy review against `2.2-page-by-page-copy-plan.md`

Sweep current copy on `Hero`, `Services`, `About`, `Work`, `Contact`, `ThankYou`, `BigCloseCTA` against the source-of-truth doc. Specifically check:
- No "Best", "Luxury", "Top-rated", "Book now", "Dream home" — voice violations.
- Primary CTA is exactly "Get a Free Quote" everywhere (already enforced by memory, but verify).
- About page hits: hands-on, property respect, continuity, long-term relationship.
- Services blurbs lead with Interior Finishing as flagship, ordered Interior → Exterior → Decking.
- No placeholder lorem voice remains.

Capture diffs as a single edit pass per file.

---

## 6. 404 page polish

Currently uses legacy `text-body`, `text-minimal`, `font-serif text-[1.45rem]` arbitrary sizes — violates the `.t-*` typography system in memory. Also still uses `PremiumCard` chrome which is heavier than the rest of the site.

Action:
- Rebuild `NotFound.tsx` body as a 3-row magazine list (same grammar as Services rows): hair rule, `.t-title` + short prose, `.row-wash` hover. No PremiumCard, no arrow icon-chip.
- Switch all typography to `.t-section`, `.t-title`, `.t-body`, `.t-micro`.
- Headline copy stays as-is (already on-brand).

---

## 7. Sitemap + robots sanity check

`public/sitemap.xml` lists the 5 real routes against `havencreekrenovations.ca`. `robots.txt` disallows `/thank-you` and `/style-guide` (style-guide route doesn't exist anymore — verify and remove the line). Confirm canonical in `index.html` matches the sitemap host.

---

## 8. Owner brief framing

Update `.lovable/owner-brief.md` so Cory reads it before the preview link:
- Move the "Five questions" block to the top, right under the preview URL.
- Add a "Known gaps for round 2" section listing: real photography (replacing AI placeholders), final wordmark decision, footer rebuild, analytics wiring.
- Confirm the 5 open decisions are still the right ones to surface.

---

## 9. Nice-to-have (not blockers, listed so they're tracked)

- Lighthouse run via existing `.lighthouserc.json` — quote the perf/SEO numbers in the brief.
- Analytics — currently nothing tracks Cory's test clicks. Skip unless he asks.

---

## Execution order

1. Photography QA + regenerate any weak tiles
2. Email infra + lead-notification + lead-confirmation templates
3. Favicon set + OG image
4. 404 polish + sitemap/robots cleanup + copy sweep (parallel, small)
5. Mobile QA pass on a real device
6. Owner brief rewrite
7. (Optional) Lighthouse snapshot for the brief

## Technical notes

- All new colors/typography go through existing `.t-*` classes and CSS tokens — no new arbitrary values.
- Email templates live in `supabase/functions/_shared/transactional-email-templates/` per the transactional-email guide; deploy after registering.
- Form-trigger wiring: prefer invoking `send-transactional-email` from the `ConsultationForm.onSubmit` success branch (right after the successful `supabase.from('consultations').insert`) with an idempotency key derived from the inserted row id. Keeps the email coupled to the user-facing success path.
- Photography regenerations: premium tier, explicit "no people, no faces, rural Alberta foothills, golden hour, calm cedar/evergreen/warm-off-white palette" prompt scaffold.
- No memory updates needed — this work executes existing rules, doesn't add new ones.
