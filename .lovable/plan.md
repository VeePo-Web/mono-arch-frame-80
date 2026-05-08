## Round 9 — final declutter sweep

After round 8, the structural noise is gone. What remains is a thinner layer of **duplicate CTAs, decorative flourishes, and "spec-sheet" detail bleed** — the same micro-busyness that separates FlexServices's calm read from a "lots going on" read. Seven small trims, all surgical, none touching the questionnaire.

---

### 1. Hero — collapse the CTA pair into a single primary

Hero currently stacks **two** buttons under the H1: solid "Get a Free Quote" + ghost "View the Work". The nav already pins a permanent Quote button at all times, and "View the Work" is one click away in the menu / footer. Two side-by-side CTAs at viewport 0 is the loudest thing on the page.

**Action:** In `Hero.tsx`, remove the secondary "View the Work" ghost link. Keep only the primary "Get a Free Quote" anchor.

### 2. ServicesGrid cards — drop the 3-bullet scope list

Each home/Services-shared card currently renders: photo → eyebrow (`Interior`) → H3 → promise → **vertical scope `<ul>` (3 bullets)** → arrow row. Those three bullets are a duplicate of what the service-detail page already covers — and on mobile they push the third card off the first scroll. The card's job is "tease the service," not "spec it."

**Action:** In `ServicesGrid.tsx`, delete the `SCOPE` map and the `<ul>` block. Card becomes: photo → eyebrow → title → one-line promise → arrow row. (The `SCOPE` constant is preserved on the new `Services.tsx` row rail, where it belongs.)

### 3. Areas section — drop the lede sentence

The Home `#areas` section currently runs a `SectionHeader` with both `title="Local, by choice."` and `lede="Four communities. Each one different in pace, exposure…"`. The four BentoTiles below already describe each area in one line — the lede is restating what the grid is about to show.

**Action:** In `Index.tsx`, remove the `lede` prop from the `#areas` SectionHeader. Title alone.

### 4. BigCloseCTA (full variant) — retire the decorative SVG ridge

The full-variant home close currently paints a hand-drawn ridge silhouette `<svg>` along the bottom of the evergreen band. It doesn't carry information — it's just a decorative flourish layered on top of an already-busy band that contains a heading, a contact-row, AND an embedded form.

**Action:** In `BigCloseCTA.tsx`, delete the `{!compact && <svg…>}` block entirely. The radial-gradient background is enough atmosphere.

### 5. BigCloseCTA (full variant) — text-link contact row, not chip buttons

The full variant currently renders two big rounded chip buttons (mail + phone) directly across from the embedded form. That's three CTA clusters in one viewport (form submit + email button + phone button), and it visually competes with the form's own submit.

**Action:** Replace the two chip-button anchors with a quiet two-line text-link block:
```
Or write —  cory@havencreekrenovations.com
Or call  —  403 970-7691
```
No background, no chip, no border. Underline-on-hover only. Same info, fraction of the visual weight.

### 6. Footer — drop the contact-column descriptive sentence

Footer's "Contact" column currently has: label → "We're a small team — every note reaches Cory directly." → CTA. The descriptive sentence is friendly but the sentiment already runs through the Home hero, About page, ConsultationForm helper, and BigCloseCTA. In the footer it's just noise above the CTA.

**Action:** In `Footer.tsx`, remove the `<p>We're a small team…</p>` line. Column becomes: label → CTA.

### 7. MenuDrawer — remove the duplicate phone/email row

Below the three drawer columns sits a tiny `STUDIO_PHONE_DISPLAY · STUDIO_EMAIL` row. Phone is already in the persistent header (icon at <lg, full number at lg+), email is on the Contact page, and the drawer's bottom rail already has a "Get a Free Quote" CTA. Three places to surface contact in one drawer is one too many.

**Action:** In `MenuDrawer.tsx`, delete the phone+email row beneath the columns (the `menu-drawer__label mt-8 md:mt-12 …` block). The bottom-rail CTA carries the action.

---

### Memory updates

Add to Core:
- **"Hero (and any landing-style hero) carries one primary CTA only — never a primary + ghost pair. Nav surfaces the secondary."**
- **"ServicesGrid cards are tease-only — photo + eyebrow + title + one-line promise + arrow. Scope bullets live on the Services row rail and the service-detail pages, never the card."**
- **"BigCloseCTA full variant: no decorative ridge SVG. Contact alternates render as quiet text links beside the form, never chip-buttons."**

### Out of scope (intentionally)

- No content rewrites — every trim is a deletion or a swap of treatment, not new copy.
- No nav, hamburger, drawer-motion, or section-rail changes — that surface settled in round 7.
- No new components, no new dependencies.

### Files touched

`src/components/Hero.tsx`, `src/components/ServicesGrid.tsx`, `src/pages/Index.tsx`, `src/components/BigCloseCTA.tsx`, `src/components/Footer.tsx`, `src/components/nav/MenuDrawer.tsx`, `mem://index.md`.
