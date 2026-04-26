# Mobile-First Refinement — Worldclass Handheld Experience

> **Hard constraint, restated:** every change is scoped behind a mobile-only selector (`max-width:767px` via the absence of `md:`, the `lg:hidden` clause, or `@media (max-width: 767px)` in CSS). No desktop class, token, font, image, or layout is altered. The audit confirmed the desktop work shipped last sprint is intact; this plan adds *only* mobile-side conditions.

This plan covers six layers, in priority order:
1. **Foundations** — viewport, safe-areas, vertical rhythm tokens, container gutters.
2. **Global chrome** — Navigation, StickyConsultBar, Footer.
3. **Home page** — section-by-section, with a major restructure of the Final CTA.
4. **Sub-pages** — SubPageHero, ConsultationForm, AreaPage, Services/Work pages.
5. **Mobile-only polish** — snap scrollers, micro-interactions, reduced-stagger reveals.
6. **QA matrix** — devices, breakpoints, accessibility, performance.

---

## 1 · Foundations

### 1.1 Viewport + safe-area inset wiring (`index.html`, `src/index.css`)
- Upgrade the viewport meta to opt into the iOS safe area:
  `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`
- Add a `--safe-bottom` and `--safe-top` token in `:root`:
  ```css
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  ```
- Used by StickyConsultBar (bottom inset) and the mobile Sheet menu (right inset on landscape notched phones).

### 1.2 Container gutters (`src/components/Container.tsx`)
- Current: `px-6 md:px-12 lg:px-20` (24/48/80).
- New mobile floor: `px-5 sm:px-6 md:px-12 lg:px-20` — drops to 20px on the smallest phones, recovers 8px of usable width per side. Desktop classes unchanged.
- Add `max(env(safe-area-inset-left), …)` via a `[--gutter:max(20px,env(safe-area-inset-left))]` style on the outer div, then `padding-inline: var(--gutter)` so notched landscape orientations don't clip text against the speaker cutout.

### 1.3 Vertical rhythm — mobile-only compression
Audit found the dominant tokens are `py-28 md:py-40`, `py-24 md:py-32`, and the home Final CTA's `pt-32 md:pt-44 pb-40 md:pb-52`. On a 375×812 phone, `py-28` (112px) per section creates a fatigued scroll. Plan:

| Site location | Current | New | Rationale |
|---|---|---|---|
| `SECTION_PADDING` constant in `Index.tsx` | `py-28 md:py-40` | `py-20 md:py-40` | Saves 64px per section × 6 sections = 384px less scroll. Desktop unchanged. |
| `SECTION` constant on Services / Areas / About / Work / Contact / Decking / Interior / Exterior / AreaPage | `py-24 md:py-32` | `py-16 md:py-32` | Same principle — desktop value preserved, mobile compresses. |
| Hero (`Hero.tsx`) | `pt-40 md:pt-52 pb-24 md:pb-36` | `pt-32 md:pt-52 pb-16 md:pb-36` | Phone hero now ~480px tall instead of 720px — H1 + sub + CTA + microcopy fit in one viewport without scrolling. |
| SubPageHero default | `pt-36 md:pt-44 pb-20 md:pb-28` | `pt-28 md:pt-44 pb-12 md:pb-28` | Same. |
| SubPageHero compact | `pt-32 md:pt-36 pb-14 md:pb-20` | `pt-24 md:pt-36 pb-10 md:pb-20` | Same. |
| Final CTA on Home | `pt-32 md:pt-44 pb-40 md:pb-52` | `pt-20 md:pt-44 pb-24 md:pb-52` (and the bottom skyline SVG goes from `h-[120px]` to `h-[64px]` on mobile via `h-16 md:h-[120px]`) | The 208px of bottom padding pre-skyline is overkill on phones. |
| TestimonialSpine | `py-24 md:py-32` | `py-16 md:py-32` | Same. |
| Trust panel (`py-24 md:py-32` in Index) | unchanged class but inner gap `gap-12 md:gap-14` → `gap-8 md:gap-14` | | Tighter card-to-card stack on phones. |

All changes are *additive class swaps* — every desktop value (`md:` or `lg:`) is preserved verbatim.

### 1.4 Type ramp ceiling for tiny phones (`src/index.css`)
The current `text-display` clamp floors at 52px (`3.25rem`). On a 320px-wide iPhone SE that produces 4-line H1s with crowded leading. Add a single `@media (max-width: 360px)` clause that only rewrites the floor:
```css
@media (max-width: 360px) {
  .text-display { font-size: 2.65rem; line-height: 1.02; }
  .text-headline { font-size: 1.65rem; }
}
```
Anything ≥ 361px keeps the existing clamp. Desktop is provably untouched.

---

## 2 · Global chrome

### 2.1 Navigation (`src/components/Navigation.tsx`)
The Nav island already crossfades brand mark + densifies on scroll. Mobile-side polish:

- **Hamburger touch target**: bump from `h-10 w-10` to `h-11 w-11` (still ≥44px, but the hamburger glyph sits centered). No desktop impact (button is `md:hidden`).
- **Mobile sheet content** — currently 5 link items, no quick actions. Restructure (all inside `md:hidden` Sheet):
  1. Header row stays (logo + dossier strip).
  2. **Primary nav links** — keep 5 italic items, but add a 14px Fraunces serial like "01 · Work" / "02 · Services" / "03 · Service Areas" / "04 · About" / "05 · Contact" left of each label. Pure typography, matches site language.
  3. **Below-nav quick actions strip** (new, mobile-only): two side-by-side pill buttons:
     - `tel:+14035550100` — "Call studio"
     - `mailto:hello@havencreekrenovations.ca` — "Email"
     Each ≥48×48, evergreen-tinted, with phone/mail glyph. Honors the "skip to a real human" desire for cautious leads.
  4. **Service shortcuts** — three minor links ("Interior finishing", "Exterior repairs", "Decking") in a 3-row `text-minimal` list. Helps mid-funnel visitors skip the Services landing page.
  5. **Bottom-pinned consultation pill** (already present) — change `min-h-[48px]` → `min-h-[52px]` and add `padding-bottom: max(2.5rem, var(--safe-bottom))` so it never sits under the iOS home indicator.
- **Mobile-state nav island padding/width**: The current `max-w-[min(96vw,1040px)]` is fine; the only thing to fix is mobile *vertical* padding when the brand mark is the only thing left and the row gets too tall. Drop to `p-1.5` on mobile in both states (already true in scrolled state — apply to rest state too via a `md:p-2` qualifier).

### 2.2 StickyConsultBar (`src/components/StickyConsultBar.tsx`, `src/index.css`)
- **Safe-area bottom**: in `.sticky-cta-bar` rule, change `bottom: 0.75rem` to `bottom: max(0.75rem, calc(var(--safe-bottom) + 0.5rem))`. Same line on Android (no inset), lifts above the home indicator on iOS.
- **Mobile copy & layout**: on `<sm` the bar currently shows the "Ready when you are" line + a "Consultation" pill + an X button. On a 320px phone the pill ends up tiny. Plan:
  - Drop the lead text on `<sm` (`hidden sm:block` for the sm: variant; remove the `sm:hidden` duplicate which prints the same text). The bar becomes: full-bleed pill that says "Request a Consultation" with the X button on the right.
  - `pl-5 pr-1.5 py-1.5 min-h-[40px]` → `pl-6 pr-1.5 py-1.5 min-h-[48px]` on mobile only (via `min-h-[48px] sm:min-h-[40px]`). 48px = comfortable thumb target.
- **Body bottom padding sentinel**: when the bar is shown, add an invisible spacer of `height: calc(64px + var(--safe-bottom))` to the body via a `data-bar-shown` body attribute, so the StickyConsultBar never overlaps the content's last paragraph (Footer copyright row, etc.).

### 2.3 Footer (`src/components/Footer.tsx`)
- Current: 4 columns collapse into 4 single stacks on mobile = ~960px tall.
- New mobile layout (no desktop change):
  - Convert the grid from `grid-cols-1 md:grid-cols-12` to `grid-cols-2 md:grid-cols-12`. Each child column carries an explicit `col-span-2 md:col-span-3` so desktop is identical.
  - Brand block becomes `col-span-2` on mobile (full-width).
  - Services + Service Areas pair up `col-span-1` each.
  - Contact block becomes `col-span-2` (full-width, so the CTA pill remains tappable).
- **Mobile bottom rule**: change `mt-20` → `mt-12 md:mt-20`, `pt-20` → `pt-12 md:pt-20`, halving the footer's top whitespace on phones.
- Add `padding-bottom: max(1.5rem, calc(var(--safe-bottom) + 1rem))` on the inner row so the © line doesn't kiss the home indicator.

---

## 3 · Home page (`src/pages/Index.tsx`)

Section-by-section, *only* the mobile expression changes.

### 3.1 § I — Fear ledger (`.fear-row` in `src/index.css`)
Current mobile grid: `grid-template-columns: 2.25rem 1fr` (numeral + question; answer wraps to grid-column 2 / -1). Issues:
- Question at `font-size: 1.1rem` italic feels cramped against the 36px numeral disc.
- Answer line-height `1.65` plus `padding: 1.5rem 0` creates a visually heavy row.

Plan (all inside `@media (max-width: 767px)`):
- Question size unchanged (1.1rem reads well), but reduce gap from `1rem 1.25rem` → `0.625rem 1rem` and padding from `1.5rem 0` → `1.25rem 0`.
- Add a 1px-tall left guideline that runs from the numeral disc down to the next row, using `border-left: 1px solid hsl(var(--evergreen)/.12)` on a `::before` pseudo positioned under the numeral column. Subtle "ledger" feel, mobile-only.
- The "Already nodding?" CTA block (`mt-12 flex flex-col sm:flex-row gap-5 sm:gap-7`) — already stacks fine. Just enforce `cta-anchor` `min-h-[56px]` (it already is), confirmed.

### 3.2 § I.b — Conversion bridge
- The italic prompt and the pill share a `flex flex-col md:flex-row` row. On mobile, the prompt is `text-[1.35rem]` (21.6px) Fraunces italic — okay, but the trust microcopy below it (`Reply within 2 business days · No obligation`) wraps to two lines on 320px due to the inline `·` separator.
- Mobile-only: in `.trust-microcopy` add `@media (max-width: 480px) { gap: 0.5rem; > span + span::before { margin-right: 0.5rem; } }`. Saves a line.

### 3.3 § II — Services preview (3 cards)
- Cards already stack 1-col on mobile via `grid-cols-1 md:grid-cols-3`.
- `PremiumCard` inner padding `p-9 lg:p-11` (36–44px) is too generous on 375px viewports — content text gets only ~280px width.
- Mobile-only swap: change inner `p-9 lg:p-11` to `p-6 md:p-9 lg:p-11` (24px on phones).
- Numeral disc + hairline cluster: gap `mb-10` → `mb-6 md:mb-10`. Tightens the card head-room on small screens.

### 3.4 § III — Approach steps
- The step list uses `pl-14` to leave room for the absolutely-positioned numeral disc. On phones the disc is fine but the body text under each step is constrained to ~250px due to the `pl-14` indent.
- Mobile-only: drop the indent to `pl-12` on `<md`, gain 8px of body width.
- The closing italic "From conversation to completion…" + CTA cluster stacks via `flex-col sm:flex-row` already — confirm `min-h-[56px]` on the pill (it inherits `cta-anchor`, ✓).

### 3.5 § IV — Project gallery preview
- Same `p-8 lg:p-9` issue inside `PremiumCard` body. Reduce inner padding to `p-6 md:p-8 lg:p-9` on mobile only.
- Each card's `ProjectPlaceholder` aspect-ratio is 4:3 — fine; nothing to change.

### 3.6 § IV.b — SelectedWorks gallery (the big mobile re-think)
This is the single largest mobile-only restructure in the plan. Currently:
- Featured plate (left, 7 cols) + bezel-shell sidebar list (right, 5 cols) stack vertically on mobile.
- Sidebar uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-1` — okay on tablet, but on phones it's a 1-col list that the visitor has to scroll past the *current* plate to reach, then click, then scroll back up.

**New mobile UX (zero desktop impact, all gated by `lg:` switching):**
- Reorder the DOM on mobile so the sidebar **chip strip** appears *above* the featured plate.
- Convert the sidebar from a vertical `<ul>` into a **horizontal snap-scrolling chip rail** when `<lg`:
  - `flex overflow-x-auto snap-x snap-mandatory gap-2 px-5 -mx-5 pb-2 scrollbar-thin`
  - Each chip = 144px wide pill carrying `Roman numeral + truncated title`.
  - Active chip gets the evergreen left-border (now a 2px bottom-border on mobile, since rows became chips).
  - Snap-aligns to start; scrollbar styled with the existing webkit scrollbar tokens.
- Keep the existing keyboard `↑/↓` handler — but rebind to `←/→` on mobile via a `pointer: coarse` media check inside the keydown handler.
- Below the chip rail, the featured plate renders full-width (no longer constrained to col-span-7).
- The "Read the case note" toggle below the plate stays — `case-note` grid `sm:grid-cols-2` stays as is on tablet+.
- Add an `aria-live="polite"` polite-region announcement when the active plate changes ("Now showing Plate VI: …") so VoiceOver users understand the silent rail-swipe.
- Remove the "Use ↑/↓ to walk the plates" hint on mobile (replace with "Swipe to explore" via `lg:` qualifier).

### 3.7 § V — Trust panel (3 reassurances)
- Stacks 1-col on mobile already. Reduce vertical gap `gap-12 md:gap-14` → `gap-10 md:gap-14` and add a 1px hairline divider between cards on mobile only (similar to area-row), purely typographic.

### 3.8 § V.b — TestimonialSpine
- Already iterated last sprint. Mobile spacing acceptable; just compress its `py-24 md:py-32` to `py-16 md:py-32` per the foundations table.

### 3.9 § VI — Service areas roster
- Each `area-row` is a `flex justify-between gap-6 py-10`. On 320px phones the `T0L` postal code + arrow chip + name compete.
- Mobile-only: stack the postal code BENEATH the area name on `<sm`. New structure:
  ```jsx
  <div className="flex-1 min-w-0">
    <h3 …>{area.name}</h3>
    <p …>{area.shortLine}</p>
    <span className="sm:hidden mt-2 inline-block text-minimal text-evergreen/70 tabular-nums">
      {AREA_POSTAL[area.slug]}
    </span>
  </div>
  <div className="flex items-center gap-4 shrink-0">
    <span className="hidden sm:inline text-minimal text-evergreen/70 tabular-nums">{AREA_POSTAL[area.slug]}</span>
    <span className="icon-chip …">…</span>
  </div>
  ```
  Desktop renders identically; mobile gains breathing room.
- Also reduce `py-10` → `py-7 md:py-10`.

### 3.10 § VII — Final CTA (the structural mobile fix)
This is the second-largest restructure. Today the markup is a 12-col grid: left column = headline + lede + direct-contact + promise list (text); right column = `cta-bezel` form. On mobile the left column stacks ABOVE the form, pushing the form below ~1.5 viewports of preamble — for a Steady-Steward visitor whose intent has already crystallised, this is friction.

**Mobile-only DOM reordering** (no desktop impact, achieved with `flex-col-reverse lg:flex-row` and explicit `order-` classes on grid children):

Order on mobile (top → bottom):
1. **Eyebrow + headline + lede** ("Let's talk about what you're thinking" + the two-paragraph reassurance) — short, frames the form.
2. **Form bezel** (`cta-bezel`) — visible by the time the user has read 4 lines of intro.
3. **Direct-contact escape hatch** (email + phone, tap-to-call/tap-to-email) — beneath the form for users who'd rather not submit.
4. **Promise list** (4-item numbered ledger) — moves to the bottom; reads as a closing reassurance, not a preamble.

Implementation: change the grid container from `grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20` to `grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20` and assign `order` classes to the four children:
- Headline+lede block: `order-1`
- Form column: `order-2 lg:order-3 lg:col-span-6`
- Direct-contact panel: `order-3 lg:order-2 lg:col-span-6` (move it inline with the headline column on desktop — it already is — by wrapping headline + direct-contact in one `lg:col-span-6` parent, then the form column gets the other 6).
- Promise list: `order-4 lg:order-2` (placed inside the headline-column wrapper on desktop).

Result: desktop renders **identically** (same two-column layout, same internal stacking); mobile leads with form in second position.

Additional mobile-only cleanup in this section:
- `cta-bezel` inner padding `p-7 md:p-9` — confirm the 28px floor; phone form fields will be ~272px wide which is fine. No change needed.
- Direct-contact email + phone: convert each into a full-width tap row with leading icon (mail / phone glyph) and `min-h-[48px]` on mobile only. On desktop they remain the inline italic links.
- Bottom skyline SVG `h-[120px]` → `h-16 md:h-[120px]`. Saves 56px.
- Promise list left rule + numerals: unchanged, just the order shifts.

### 3.11 ConsultationForm fields (`src/components/ConsultationForm.tsx`) — mobile polish
- All inputs already use `text-base` on mobile (16px ≥ iOS zoom threshold). ✓
- Add `inputMode` hints for the contact field: currently `inputMode="email"`, but since it accepts phone OR email, switch to `inputMode="text"` and add a small visible hint pill toggle ("Email" / "Phone") that flips both `inputMode` and `autoComplete` (`email`↔`tel`). Mobile-only — the toggle is `md:hidden` (desktop just shows the input as today).
- The optional-context `<details>` summary tap target: wrap summary content in a row that has `min-h-[44px] py-2`. Today it's a tight inline-flex chevron+label.
- Submit button `min-h-[56px]` ✓.
- Add `enterkeyhint="send"` to the textarea and `enterkeyhint="next"` on the name/contact inputs — improves the iOS keyboard's "Go/Next/Send" return-key labelling.

---

## 4 · Sub-pages

All sub-pages share `SubPageHero`, `Container`, the `SECTION` constant, and the `ConsultationForm`. The foundations work in §1 plus the form work in §3.11 cover most of them. Page-specific notes:

### 4.1 SubPageHero (`src/components/SubPageHero.tsx`)
- Vignette column (when present) currently sits above the headline column on mobile — that means a service-area page on mobile leads with a decorative SVG before the H1.
- Mobile-only: reorder so headline reads first, vignette renders after the subhead. Desktop layout (`lg:grid-cols-12` with vignette in `lg:col-span-5`) is preserved exactly via `order-1 lg:order-2` on the vignette and `order-2 lg:order-1` removed (we want the headline first on mobile too — so just add `order-2 lg:order-2` on the vignette and `order-1 lg:order-1` is implicit).
- CTA pair on hero: `min-h-[52px]` ✓; the secondary "ghost" link has no min-height — wrap it on mobile only with `min-h-[44px] inline-flex items-center` so the underline+arrow tap zone meets WCAG.
- Dossier strip already has a mobile-tightened block in CSS (`max-width: 640px`). Confirm and leave.

### 4.2 Service detail pages (Interior / Exterior / Decking)
- These re-use the same patterns. After the foundations changes, no page-specific overrides needed except: the "Process" / "What's included" lists should drop their `pl-X` indents by 8px on mobile per the §3.4 pattern.

### 4.3 Service Areas index + AreaPage
- Same area-row mobile change (§3.9) applies to the home page; ServiceAreas index uses a different list pattern — verify in implementation that postal stacking is consistent.
- AreaPage's "Local notes" + "What we do here" lists should reduce their vertical padding (`py-12` → `py-8 md:py-12`).

### 4.4 Work page (`src/pages/Work.tsx`)
- Project grid stacks 1-col on mobile already. Same `PremiumCard` inner-padding compression as §3.5.

### 4.5 Contact page
- Two-column layout (`lg:grid-cols-12`, sticky-left + form-right). On mobile the sticky rail flattens above the form. Same logic as §3.10 — apply `order` classes so the **form** appears above the "What happens next" steps on mobile (steps fall to the bottom as a closing reassurance).
- Steps list `01-04` becomes a vertical accordion **only on mobile** if longer than 4 lines per step. Initially we'll just compress vertical padding; revisit only if bounce data argues for more.

### 4.6 ThankYou + 404
- ThankYou uses `compact` SubPageHero; the foundations changes apply. Add a single mobile-only "Back to home" button at the bottom (≥48px tall) so users on phones don't have to scroll up to nav.

---

## 5 · Mobile-only polish

### 5.1 Reveal-stagger compression
The home page uses `--reveal-delay` values up to 1100ms. Vertically stacked on a phone, that means the user scrolls past content before it's animated in. Add a single CSS clause:
```css
@media (max-width: 767px) {
  [data-reveal] { --reveal-delay: 0ms !important; }
  [data-reveal][data-revealed] { transition-delay: 0ms; }
}
```
Cuts perceived motion by ~70% on phones, complies with the same intent that the staggers already serve on desktop.

### 5.2 Reduced-motion already covered (last sprint). Re-verify the new mobile-only animations honor it.

### 5.3 Tap micro-feedback
Add a global `@media (hover: none) and (pointer: coarse) { a, button { -webkit-tap-highlight-color: hsl(var(--evergreen) / 0.10); } }` so iOS/Android shows a brief evergreen ripple on tap — replaces the missing hover state for touch.

### 5.4 Skeleton states
The `Suspense` fallback for `ConsultationForm` currently uses `h-[460px] rounded-md bg-foreground/[0.03] animate-pulse`. On mobile the form is taller (~580px due to stacked fields). Make it `h-[460px] md:h-[460px]` → `h-[580px] md:h-[460px]` so the layout doesn't jump on lazy hydration.

### 5.5 Image art-direction
Audit found no `<img>` with `srcset`/`sizes` on the home page (the placeholders are inline SVGs, the logo is webp). When real photography lands, the implementation will use `<picture>` with mobile/desktop sources. For now, the only `<img>` (logo in nav + footer) is fine — already has explicit width/height to prevent CLS.

### 5.6 Body scroll-padding for in-page anchors
Add `html { scroll-padding-top: 88px; } @media (max-width: 767px) { html { scroll-padding-top: 76px; } }` so anchor jumps don't hide under the floating nav island.

---

## 6 · QA matrix

After implementation, verify on:

| Viewport | Devices represented | What to verify |
|---|---|---|
| 320×568 | iPhone SE 1, small Android | Hero H1 fits in 3 lines; no horizontal scroll; nav island doesn't overflow; sticky bar pill is tappable. |
| 375×812 | iPhone 11/12/13/14 mini | All section padding feels right; gallery rail snaps cleanly; final CTA form appears in second position. |
| 390×844 | iPhone 14, 15 | Same as 375 + safe-area-bottom test (sticky bar must clear home indicator). |
| 414×896 | iPhone Plus, larger Android | Confirm two-column footer reads correctly. |
| 768×1024 | iPad portrait | Confirm `md:` styles kick in exactly as before — no regression. |
| 1280+ | Desktop sweep | **No visual change anywhere.** Side-by-side diff against current production. |

A11y re-pass:
- All new tap targets ≥44×44 (preferably 48×48).
- Keyboard parity for the gallery rail (←/→ on touch devices ≠ keyboard, so verify both).
- VoiceOver pass on iOS Safari for the gallery `aria-live` announcement and the Sheet menu's new quick-action buttons.
- Color contrast inherits last sprint's pass; no token alpha changes here.

Performance:
- The vertical-rhythm compression saves DOM scroll height; no asset payload change.
- The mobile-only scroll-snap rail uses native CSS — zero JS added.
- Sheet menu gains 5 small buttons but no new dependencies.
- `bun run build` verification at the end to confirm no bundle regression.

---

## 7 · Files touched

- `index.html` — viewport meta `viewport-fit=cover`.
- `src/index.css` — safe-area tokens, mobile rhythm overrides, type ramp floor for ≤360px, `.fear-row` mobile tightening, `.trust-microcopy` mobile gap, `.sticky-cta-bar` safe-area, mobile reveal-stagger zero-out, mobile tap-highlight, scroll-padding-top.
- `src/components/Container.tsx` — gutter token + safe-area inline style.
- `src/components/Navigation.tsx` — Sheet content additions (quick-actions, service shortcuts, safe-area bottom padding); hamburger size bump.
- `src/components/StickyConsultBar.tsx` — mobile copy + min-height.
- `src/components/Footer.tsx` — `grid-cols-2` mobile layout + safe-area bottom.
- `src/components/Hero.tsx` — `pt-32 md:pt-52 pb-16 md:pb-36` mobile compression; ghost-link `min-h-[44px]`.
- `src/components/SubPageHero.tsx` — mobile padding tighten; vignette `order-2`; ghost-link min-height.
- `src/components/ConsultationForm.tsx` — `enterkeyhint`, mobile-only Email/Phone toggle, `<details>` summary tap-row.
- `src/components/gallery/SelectedWorks.tsx` — mobile rail restructure + `aria-live` announcement.
- `src/pages/Index.tsx` — `SECTION_PADDING` swap; Final CTA `order` classes; area-row inner restructure; service/project card padding mobile reduction; skyline SVG mobile height; mobile reorder of direct-contact + promise list.
- `src/pages/Contact.tsx` — `order` classes for steps-vs-form; `SECTION` constant.
- `src/pages/Services.tsx`, `Work.tsx`, `About.tsx`, `ServiceAreas.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ThankYou.tsx`, `src/components/AreaPage.tsx` — `SECTION` constant compression.

Total: ~17 files, every change either gated by `md:`/`lg:` qualifiers or wrapped in `@media (max-width: 767px)`. Desktop output is byte-for-byte unaffected outside of the safe-area meta tag (which does nothing on desktop).

---

**Open question for you before I implement:** In §3.10, I'm planning to put the form *above* the direct-contact email/phone block on mobile (so the primary action — submitting — is the second thing the user sees after the headline). The alternative is to keep email/phone *above* the form so cautious leads can opt out instantly. My recommendation is form-first because the page already has a "or reach us directly" path everywhere else, and Steady-Steward research suggests the form is less intimidating than an open phone call. But if you'd prefer phone-first on mobile, say the word and I'll flip the order before building.