# Round 16 — The pre-launch magazine audit

The structure is right. The problem is that the **execution isn't yet world-class** — type sizes drift between pages, sections breathe inconsistently, motion isn't cinematic, and several pages still feel like "a website" instead of "a magazine spread you stop scrolling for."

This round closes that gap. It borrows the **editorial confidence of Fly4Me.ca** (huge fluid display type, 12-col grids that actually use the grid, t-* typography utilities as the single source of truth, generous fluid section spacing, reveal-on-scroll cadence, hover-row washes on lists) and the **calm reductiveness of FlexServices.org** (one idea per section, no decoration competing with content, the form is the form).

No new pages. No new features. **Pure craft pass.**

---

## 1. Typography — one fluid system, used everywhere

Right now we have `text-display`, `text-headline`, `text-headline-sm`, `text-subhead`, `text-title`, `text-body`, `text-minimal`, plus ad-hoc `text-[1.05rem]` / `text-[1.2rem]` overrides. That's the source of the "drifty" feeling between pages.

Replace with a tight Fly4Me-style fluid scale (clamp-based, no breakpoints), and ban one-off `text-[…]` overrides.

**New tokens (in `src/index.css` `:root`):**
```
--fs-display:    clamp(44px, 8.4vw, 104px);   /* Hero H1 only */
--fs-headline:   clamp(34px, 5.2vw, 76px);    /* Sub-page H1 */
--fs-section:    clamp(28px, 3.6vw, 56px);    /* Section H2 */
--fs-title:      clamp(20px, 1.8vw, 26px);    /* Card / project title */
--fs-lede:       clamp(17px, 1.3vw, 21px);    /* Sub-head, lede */
--fs-body:       16.5px;
--fs-eyebrow:    11px;  /* uppercase label */
--fs-micro:      10px;  /* caption meta */

--lh-display: 0.98;  --lh-headline: 1.05;  --lh-section: 1.08;
--track-display: -0.045em;  --track-headline: -0.035em;  --track-eyebrow: 0.26em;
```

**Utility classes (replace existing `text-display`/`text-headline`/etc):** `.t-display`, `.t-headline`, `.t-section`, `.t-title`, `.t-lede`, `.t-body`, `.t-eyebrow`, `.t-micro`. Each class owns size + line-height + tracking + weight — components apply ONE class.

**Audit pass:** sweep every page and component, replace legacy `text-*` classes and inline `text-[…px]` overrides with the new `.t-*` classes. No exceptions.

---

## 2. Section rhythm — fluid `--space-section`

Today section padding is per-page (`py-16 md:py-32`, `py-20 md:py-32`, `pt-28 md:pt-44`…). This is why pages feel inconsistent.

Add `--space-section: clamp(96px, 14vw, 192px)` and `--space-section-sm: clamp(64px, 10vw, 128px)`. Replace `SECTION_PADDING.standard`/`compact`/`terminal` with utility classes `.section-y` and `.section-y-sm`. Apply to every `<RevealSection>` and hero across the site so the vertical breathing is identical from `/` to `/contact`.

---

## 3. Hero — editorial 12-col, the way Fly4Me means it

The current Hero is a 12-col split, but the type doesn't carry the page. Tighten it to magazine standard:

- H1 uses `.t-display` (104px desktop), `wrap-editorial` for explicit `<br/>` line breaks at the visual rhythm — never auto-wrap a display headline.
- Eyebrow row stays (hairline + uppercase eyebrow).
- Photo plate stays right (cols 6–12), 16:10, but loses the inset-shadow `.hero-plate` rule — replace with a single hairline `border border-foreground/8` and `shadow-[0_30px_60px_-30px_hsl(0_0%_0%/0.25)]` (Apple-style soft drop, not chunky).
- Caption strip below the plate becomes a single row: `.t-micro` "Recent work — {Area}" left, `.t-micro` "{Category}" right, divided by a hair rule (`border-t border-foreground/10 pt-3`).
- Bottom-of-hero meta strip (Fly4Me move): on `lg+`, after the type column closes, render a thin row "Haven Creek / 2026" left and "Foothills, AB · Available across rural Alberta" right at `.t-micro`. Pure typographic locator. Doesn't conflict with the "no folio chrome" rule — it's prose, not numerals.
- One CTA only (already true). Reply-time line stays.

---

## 4. SubPageHero — same grammar, sized one notch down

Apply the same 12-col layout (type left, optional small caption-locator right). Use `.t-headline` instead of `.t-display`. Keep type-only (no photo plate, per existing rule). Drop the `compact` variant — it's only used by `ThankYou` and `404`, and they look better at the same size as the rest.

---

## 5. Services page — editorial row list, no numerals

The current 3-card grid reads as three equal blurbs. Convert to a Fly4Me-style **row list** because rows are how a magazine indexes things — but **without the `01/02/03` numeral column** (Core memory ban).

Layout per row (12-col, `border-b border-foreground/12`, `py-7 md:py-9`):
- col 1–5: `.t-section` service title
- col 6–12: `.t-body` two-sentence body (promise + cardBody merged into one tight paragraph)
- Hover: full row washes to `bg-evergreen/[0.03]` over 360ms (the FlexServices/Fly4Me move).

Top of the section keeps the existing 12-col SectionHeader (eyebrow col 1–3, H2 col 4–9). No per-service link, no bullets, no images.

---

## 6. Work page — magazine grid, asymmetric on desktop

Today: even 1/2/3-col grid. Magazine move: **asymmetric layout** on `lg+` so the eye scans like a spread, not a contact sheet. Per-row pattern (cycle of two):

```
row A:   [────── 7 ──────][── 5 ──]   (large left, tall right)
row B:   [── 5 ──][────── 7 ──────]   (mirror)
```

Aspect ratios: 7-col tile is `4/5`, 5-col tile is `3/4`. Below `lg`, fall back to single column (full-width 4/5). Captions below each tile: `.t-title` project title, `.t-micro` "{Category} · {Area}" on a separate line.

Keep ProjectPlaceholder. No filter chrome (existing ban). Hover lifts the tile `-translate-y-1` over 500ms `cubic-bezier(0.22,1,0.36,1)` — Apple ease.

---

## 7. RecentWorkPreview (home) — keep simple, match Work captions

Stay 1/2/3 grid, but adopt the same `.t-title` + `.t-micro` caption pair so the home preview and `/work` feel identical. Keep "See all work →" underline link below.

---

## 8. About page — same row-list grammar for "Where we work"

Two prose sections stay. The "Where we work" rail (currently `serviceAreas.map(.name).join(' · ')` as one big line) becomes a quiet **two-column list** at `md+`: each area on its own row with a hair rule between, `.t-title` for the name. It reads like a directory page. No FSA codes, no chips (existing bans).

---

## 9. Contact page — one screen, Apple-clean

- Drop `PremiumCard` wrapper — the card border/shadow is decoration. Form sits directly on the page background, type-led.
- Center the form column (`max-w-xl`), more vertical air around each field (the form is the page).
- "Or reach us directly" rail stays as a divided list — convert to `.t-title` for the email/phone rows so they match the Where-we-work rail.

---

## 10. BigCloseCTA — magazine close, not "footer slab"

- H2 jumps to `.t-headline` (currently `text-headline` ≈ 56px). When this is the last thing the visitor sees, it should feel like a closing magazine spread.
- Keep one CTA, keep cream variant.
- Add a hair rule above the section (`border-t border-foreground/10`) to formally close the page — magazine convention.

---

## 11. Motion — one shared cadence

Adopt Fly4Me's one-rule cadence so the whole site moves the same way:

- All `data-reveal` items: opacity 0 → 1 + `translateY(16px) → 0`, duration **800ms**, easing `cubic-bezier(0.22, 1, 0.36, 1)` ("ease-out-soft"), stagger via existing `--reveal-delay` token.
- All hover lifts: `transform 500ms cubic-bezier(0.22,1,0.36,1)`.
- All color transitions: `300ms ease-out`.
- Kill the `transition-transform duration-700 ease-weighted group-hover:scale-[1.005]` on tiles — replace with the unified `-translate-y-1` lift above.

These three rules cover 100% of motion site-wide.

---

## 12. Footer — quiet magazine colophon

Already condensed. One small upgrade: split into two thin rows separated by a hair rule.

```
─────────────────────────────────────────
Haven Creek Renovations · © 2026     [Get a Free Quote ↗]
─────────────────────────────────────────
About    Services    Work    Contact            Foothills, AB
```

Pages move down to a quieter row. CTA stays prominent. No 4-col grid (existing ban respected).

---

## 13. Pre-launch consistency audit checklist

After implementation, walk every route and verify:

- [ ] Every H1 uses `.t-display` (home) or `.t-headline` (sub-pages). No exceptions.
- [ ] Every H2 uses `.t-section`. Every body paragraph uses `.t-body`. Every eyebrow uses `.t-eyebrow`.
- [ ] No inline `text-[…]` arbitrary type sizes anywhere.
- [ ] Every `<RevealSection>` uses `.section-y` (not per-page padding strings).
- [ ] Every page closes with `<BigCloseCTA>` above `<Footer>`.
- [ ] Every page reveals on scroll with the unified 800ms `cubic-bezier(0.22,1,0.36,1)` cadence.
- [ ] Every CTA across the site is the same solid evergreen pill — same size, same shadow, same hover.
- [ ] No floating FAB, no sticky bar, no testimonials, no per-project pages, no service detail pages, no numeral columns. (All existing Core constraints respected.)

---

## Files touched

- `src/index.css` — add `.t-*` utility classes, `.section-y` utility, fluid spacing tokens, unified reveal/motion rules. Remove `.hero-plate`.
- `src/lib/spacing.ts` — replace `SECTION_PADDING` with `.section-y` class references (or delete and inline the class).
- `src/lib/typography.ts` — point `EYEBROW.standard` and friends to the new `.t-eyebrow` class.
- `src/components/Hero.tsx` — apply new typography utilities + Apple-soft photo plate + bottom meta strip.
- `src/components/SubPageHero.tsx` — apply new utilities, drop `compact` variant.
- `src/components/SectionHeader.tsx` — apply `.t-eyebrow` + `.t-section`.
- `src/components/BigCloseCTA.tsx` — `.t-headline` + hair-rule top border.
- `src/components/Footer.tsx` — two-row magazine colophon.
- `src/components/RecentWorkPreview.tsx` — caption uses `.t-title` + `.t-micro`.
- `src/pages/Services.tsx` — convert 3-col grid to row list (no numerals).
- `src/pages/Work.tsx` — asymmetric 7/5 alternating editorial grid at `lg+`.
- `src/pages/About.tsx` — areas rail becomes 2-col list.
- `src/pages/Contact.tsx` — drop PremiumCard wrapper, center form, list-style direct-contact rail.
- `src/pages/ThankYou.tsx`, `src/pages/NotFound.tsx` — drop `compact` prop.
- `mem://index.md` — add Core rules: "One typography system (`.t-*` utilities). No inline `text-[…]` overrides. One section spacing token (`.section-y`). One motion cadence (800ms reveal, 500ms hover, 300ms color, all `cubic-bezier(0.22,1,0.36,1)`)." Add the Services row-list rule and Work asymmetric-grid rule.

---

## Out of scope

- No new content, copy, or photographs.
- No re-introduction of per-service / per-project pages, testimonials, ServicesGrid, HowItGoes, numeral columns, FAB, sticky CTA bar, dark slabs, or folio chrome.
- No change to Navigation behaviour (transparent-top, drawer, section rail) — it's already correct.
- No backend, no data model, no auth changes.

The result: one site, one type system, one motion language, one rhythm — magazine-grade end to end.
