## Round 10 — chrome-off-the-headlines pass

Round 9 cleared the duplicate CTAs and decorative bands. The remaining noise is **header chrome that restates what the page already announces** — page-name eyebrows above page-name H1s, hand-drawn accent underlines that compete with the type, and SectionHeader stacks above one-line lists. Three surgical trims.

---

### 1. `SubPageHero` — retire the page-name eyebrow + accent-word SVG underline

Every non-home route currently opens with `EYEBROW (CONTACT / ABOUT / SERVICES / DECKING…) → H1`. The eyebrow restates what the H1 and the nav already announce. On a calm editorial page the eyebrow reads as nameplate noise — exactly the "lots going on" feeling the user keeps flagging.

Separately, `SubPageHero` paints a hand-drawn `<svg>` underline beneath any `accentWord` — same decorative-flourish category we just killed on `BigCloseCTA`. The italic evergreen treatment alone carries plenty of accent.

**Action:**
- In `SubPageHero.tsx`: make `eyebrowLabel` optional and stop rendering it (drop the `<Eyebrow />` block + `reveal-up` wrapper). Remove the `<svg>` accent underline; keep the italic-evergreen `accentWord` span.
- Delete the `eyebrowLabel="…"` prop from every caller: `About.tsx`, `Contact.tsx`, `Decking.tsx`, `ExteriorFinishing.tsx`, `InteriorFinishing.tsx`, `NotFound.tsx`, `ServiceAreas.tsx`, `Services.tsx`, `ThankYou.tsx`, `Work.tsx`, and `AreaPage.tsx`.
- Keep the `folio` prop intact — it's used by area pages for "T0L · Bragg Creek" locator text and that *does* add information, not restate it.

### 2. `Contact.tsx` — strip the SectionHeader stacks around form + direct-contact

Currently:
- Left rail: `eyebrow="What happens" → title="Write. We reply." → lede="Within two business days, from Cory directly."` — eyebrow restates the title's topic (memory rule says either/or).
- Below the form: `eyebrow="Or reach us directly" → title="Prefer to write or call?" → ul of email + phone` — three rows of header chrome above two contact rows.

**Action:**
- Drop the `eyebrow="What happens"` prop from the form-heading SectionHeader. Title + lede only.
- Replace the lower SectionHeader entirely with a single small label line: `<p className={EYEBROW.standard}>Or reach us directly</p>` above the existing `<ul>` (no H3, no italic restatement). The two contact rows are self-evidently the alternative.

### 3. `HowItGoes.tsx` — drop dead `n: "01"` field from STEPS data

The `STEPS` array still carries `n: "01" / "02" / "03"` even though the JSX no longer renders the numerals (we killed that in round 8). Dead data drift — easy to revive by accident.

**Action:** Remove the `n` field from each entry. Keep `t` + `b`. Drop the `key={step.n}` and use `key={step.t}` instead.

---

### Memory updates

Add to Core:
- **"Sub-page heroes do NOT carry a page-name eyebrow (CONTACT, ABOUT, SERVICES…) — the H1 + nav already name the page. `eyebrowLabel` is retired from `SubPageHero` callers; only `folio` survives, for genuine locator info."**
- **"`SubPageHero` accent words use italic-evergreen treatment only — no hand-drawn SVG underline. Same constraint as the BigCloseCTA decorative-ridge ban."**

### Out of scope

- No nav, drawer, hamburger, section-rail, or motion changes.
- No copy rewrites — only deletions of duplicative header chrome.
- No new components, no new dependencies. `Eyebrow.tsx` stays (still used by `ServicesGrid`, project-proof rows, etc.).

### Files touched

`src/components/SubPageHero.tsx`, `src/components/HowItGoes.tsx`, `src/pages/Contact.tsx`, `src/pages/About.tsx`, `src/pages/Services.tsx`, `src/pages/ServiceAreas.tsx`, `src/pages/Work.tsx`, `src/pages/InteriorFinishing.tsx`, `src/pages/ExteriorFinishing.tsx`, `src/pages/Decking.tsx`, `src/pages/ThankYou.tsx`, `src/pages/NotFound.tsx`, `src/components/AreaPage.tsx`, `mem://index.md`.
