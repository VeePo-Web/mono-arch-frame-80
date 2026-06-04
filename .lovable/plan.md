# Desktop /contact — Royal-Mechanical-style brand-stack + side panel

Replace the current centered single-column /contact page with a two-column desktop layout that mirrors Royal Mechanical's message overlay: brand cascade on the left, dark form panel anchored to the right. Mobile is untouched.

## Desktop layout (lg ≥ 1024px)

```text
┌─────────────────────────────────────────┬──────────────────────────┐
│                                         │ ▎ Haven Creek            │
│           [ haven creek mark ]          │   Family-run · Foothills │
│                                         │   ◆ Replies in 2 days    │
│              ─────────                  ├──────────────────────────┤
│                                         │                          │
│         Haven Creek Renovations         │  Name                    │
│                                         │  ___________________     │
│         Trusted renovations             │                          │
│         for rural Alberta               │  Email or phone          │
│                                         │  ___________________     │
│            403 970-7691                 │                          │
│                                         │  About your project      │
│                                         │  ___________________     │
│                                         │  ___________________     │
│                                         │                          │
│                                         │  ┌──────────────────┐    │
│                                         │  │ Send             │    │
│                                         │  └──────────────────┘    │
└─────────────────────────────────────────┴──────────────────────────┘
        cream background (page)                evergreen-deep panel
        (calc(100% - 520px) wide)              (520px wide, full height)
```

- **Left zone** (cream, fills `calc(100% - 520px)`) — vertically centered cascade, all `pointer-events-none` except the phone link:
  1. Haven Creek mark (`haven-creek-mark.webp`), ~`48vh` max-height — cinematic blur-to-sharp fade-in at 80ms
  2. Evergreen hairline rule (1px, 7rem wide, gradient transparent → evergreen/60 → transparent) at 450ms
  3. Horizontal wordmark (`haven-creek-horizontal.webp`, max-width 360px) at 550ms
  4. Italic tagline "Trusted renovations for rural Alberta" in `.t-lede` at 700ms
  5. Phone number link (`tel:`) at 850ms — pointer-events-auto, hover scales 1.05, click-to-call
- **Right zone** (dark, `bg-evergreen-deep`, fixed 520px wide, full viewport height after nav) — pinned to the right edge of the page section, NOT to the viewport (so it sits inside the page flow, no fixed positioning). Contains:
  - Header strip (24px padding, bottom hair-rule `border-evergreen-foreground/10`): 4px-wide evergreen accent bar (`bg-evergreen`, 32px tall) + "Haven Creek" name + "Family-run · Foothills, AB" subtitle + small rotated diamond pip + "Replies in 2 business days" uppercase
  - 3-field form body (32px padding), reusing the existing `ConsultationForm` component but rendered against the dark surface

The dark panel uses a new `--on-evergreen-deep` variant of the form fields so the bottom-only underline rule reads as `bg-evergreen-foreground/15` → `bg-evergreen-foreground` on focus instead of `foreground/15` → `evergreen`. Form labels become cream (`text-evergreen-foreground/70`), input text becomes cream.

## Mobile (< lg) — zero changes

Below `lg` the layout reverts to exactly what ships today:
- `SubPageHero` with backdrop
- Centered `ConsultationForm` in cream
- Sticky bottom Send bar (`.contact-sticky-cta`)
- Direct contact rail (email / phone / location)

The brand-stack column and dark right panel are `hidden lg:flex` only.

## Files touched

- **`src/pages/Contact.tsx`** — branch the render: at `lg+` show the new two-column layout, otherwise render today's single-column page. SubPageHero only renders on mobile (the brand stack replaces it on desktop).
- **`src/components/contact/ContactBrandStack.tsx`** (new, ~80 lines) — the left-column cascade. Imports the 4 logo assets, lucide `Phone` for the rail. Uses the existing `.cta-spring` for the phone hover.
- **`src/components/ConsultationForm.tsx`** — add an optional `tone?: "cream" | "dark"` prop (default `"cream"`). When `"dark"`, swap label / input / underline classes via a single ternary. No structural changes, no field changes.
- **`src/index.css`** — add three small utilities scoped to the dark panel: `.form-field-input--dark` (cream underline + cream text), `.form-field-label--dark` (cream label, evergreen-foreground/90 on focus), and a key-frame set `@keyframes overlay-cascade-in` for the left-column cascade (blur(8px)→blur(0) + opacity 0→1 + translateY 12→0, 900ms `ease-weighted`, with `--cascade-delay` CSS var).
- **`mem://index.md` Core** — add one line: "On `/contact` at `lg+` the layout is a two-column split — brand cascade left (cream), `bg-evergreen-deep` form panel right (520px, full-height). Mobile (< lg) keeps the existing single-column SubPageHero + bare cream form + sticky CTA. The dark panel is the ONE scoped exception to the dark-on-cream rule, scoped to /contact desktop only."

## What stays the same

- Same 3 fields: Name · Email or phone · About your project. No new fields, no service picker, no step wizard, no photo upload.
- `?service=` "Re: {label}" chip still renders inside the form.
- `BigCloseCTA` does NOT close `/contact` (it never did — Contact ends at the form).
- Navigation, MenuOverlay, footer, route prefetch, scroll-spy — untouched.
- Royal's success-confetti / countdown ring / haptic vibrate are NOT carried over — keep the existing success behaviour (redirect to `/thank-you`).

## Out of scope

- Slide-in animation from off-screen — the panel renders in place because it's a page, not an overlay.
- A close button on the panel — there's nothing to close; this IS the contact page.
- Dark variant of the form anywhere else on the site.

## One open question

The right panel: do you want it pinned to the right edge of the **page section** (sits inside normal scroll, scrolls away with the page) or **viewport-fixed** (always visible while you scroll the brand column)? Royal Mechanical's is viewport-fixed because it's an overlay; on a real page the section-pinned version reads more like a normal layout. I'll default to **section-pinned** (no fixed positioning) unless you say otherwise — it avoids weird scroll-interaction edge cases.
