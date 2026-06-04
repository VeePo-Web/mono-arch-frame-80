# Pre-launch punch list

Quick audit of what's still rough before this site is ready to go live. Grouped by risk — fix the blockers first, then the polish.

## Blockers (do before launch)

1. **Stale sitemap.xml** — Currently lists 7 dead routes that no longer exist (`/services/interior-finishing`, `/services/exterior-finishing`, `/services/decking`, `/service-areas`, `/service-areas/bragg-creek`, `/service-areas/rocky-view-county`, `/service-areas/bearspaw`, `/service-areas/water-valley`). Google will crawl them, get 404s/SPA-fallback to the home page, and ding the site. Rewrite to the 5 real routes only: `/`, `/about`, `/services`, `/work`, `/contact`.

2. **Real OG / social share image** — `og:image` currently points at `apple-touch-icon.png` (a tiny square icon). When anyone shares the URL in iMessage, Facebook, LinkedIn, the preview will look broken. Need a proper 1200×630 share image (logo + tagline on cream, or a hero photo with the wordmark). Add as `public/og-image.jpg` and update `index.html` + `useSeo` defaults.

3. **Form delivery wired & tested** — `ConsultationForm` writes to the `consultations` table, but confirm Cory actually gets an email when a lead comes in. If not, add a database trigger → edge function → Resend (or similar) email to `cory@havencreekrenovations.com`. Without this, leads go into a black box.

4. **Real phone number & email confirmed** — `403 970-7691` and `cory@havencreekrenovations.com` are hard-coded in `src/lib/studioContact.ts` + `Contact.tsx`. Confirm with Cory these are the right public-facing channels before launch (especially the phone — wrong number means missed jobs).

5. **Replace placeholder project photography** — `ProjectPlaceholder` tiles on `/work` and `RecentWorkPreview` on `/` are still SVG/placeholder plates per `galleryPlates.ts` comment ("to be replaced as real photography arrives"). A contractor site without real project photos won't convert. Either ship with real photos in hand, or shrink `/work` to 3-4 tiles of the strongest available shots.

## Should-fix (quality bar)

6. **Custom domain connected** — Project is published at `havencreek-renovation.lovable.app`. Connect `havencreekrenovations.ca` (referenced everywhere in canonical, sitemap, JSON-LD) before announcing, or every external link breaks.

7. **Google Search Console + Analytics** — Add GSC verification meta tag and a privacy-respecting analytics tag (Plausible, Fathom, or GA4) so Cory can see traffic from day one. Currently zero tracking.

8. **Favicon set** — `favicon.ico` + `favicon-32.png` + `apple-touch-icon.png` exist but were likely defaults. Confirm they're the Haven Creek mark, not Lovable defaults.

9. **404 page polish** — Confirm `NotFound.tsx` matches the rest of the site's editorial tone and has a clear path back home.

10. **Email-delivery domain auth** — If transactional emails are added (step 3), set up SPF/DKIM on the sending domain so receipts/notifications don't land in spam.

## QA pass (final checklist)

11. **Real-device test** — iPhone Safari, Android Chrome, desktop Safari + Chrome. Walk every route. Tap every CTA. Submit the form. Open the menu overlay.
12. **Lighthouse run** — Targets in `.lighthouserc.json` are aggressive (perf ≥0.9, LCP ≤2.5s). Run against the published URL and fix anything red.
13. **Form spam guardrails** — Honeypot is already in `consultationSchema`. Confirm rate-limiting / Turnstile is in place if Cory is worried about bot leads.
14. **Copy proofread** — One human read-through of every page with Cory. Catch any name/date/area mistakes before they're public.
15. **Legal** — Decide whether to ship a one-line privacy footer link covering form data handling. Not strictly required for a contact-form-only site in AB, but a good signal of seriousness.

## Out of scope for launch (post-launch backlog)

- Blog / project journal
- Testimonials (explicitly forbidden per memory)
- Multi-language
- Per-project case-study pages

---

**My recommendation:** items 1, 2, 3, 5, 6 are the hard blockers. Everything else can ship in the first week post-launch if needed. Want me to start with #1 (sitemap) and #2 (OG image) right now?
