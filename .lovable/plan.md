# Section: Global → BigCloseCTA

Single component (`src/components/BigCloseCTA.tsx`) used on `/`, `/about`, `/services`, `/work`. Same close on every page.

## Issues found

**Button shape diverges from nav (one-button-language violation)**
- L48 — `rounded-full` pill. Header + drawer CTAs are `rounded-lg` square. Core: "ONE button language site-wide." Site has unified on **square 8-radius solid evergreen**. Pill here is the odd one out.
- L58-60 — Trailing `<ArrowUpRight>` glyph inside an `icon-chip` halo. Core just added: "Drawer + header CTAs are text-only — no trailing arrow glyph." Same shape language must extend to BigCloseCTA. Strip arrow + chip.
- L50 — `text-minimal` retired-feeling utility. Use plain `text-[15px]` token? Better: drop in favour of `font-semibold` matching nav CTA.
- L53 — Hand-rolled `shadow-[...]` inset+drop pair. Replace with the site-wide `.cta-spring` class (Core: "Primary CTAs use the `.cta-spring` class").
- L51 — `transition-all duration-500` — too broad. `.cta-spring` carries the canonical hover lift; remove this line.
- L48 — `pl-7 pr-1.5 py-1.5 min-h-[52px]` is asymmetric padding for the chip slot. With chip removed, switch to symmetric `px-6 min-h-[52px]` matching the drawer mobile CTA.

**Repeated "two business days" copy on home page**
- L19 — Default lede: `"Cory replies within two business days."` Hero on `/` already says `"Replies within two business days."`. Core: "Two business days reply promise lives only on Hero, ConsultationForm helper, ThankYou hero, Contact rail, QuickContactSheet, BigCloseCTA, and meta descriptions — **never repeated inside the same page twice**." On `/` this fires twice. Fix by changing the default lede to a non-promise sentence the closer can own (Hero handles the promise; closer handles the invitation).
- New default lede: `"Tell us about the property — we'll come look, talk it through, and quote it honestly."` (no "two business days" duplication, single warm sentence).
- Sub-pages (About/Services/Work) don't say the promise outside this component, so they still need it somewhere — but the closing CTA's job is invitation, not promise. Acceptable trade.

**Container width**
- L30 — `max-w-3xl` (~48rem). Core: "Any text wider than ~24ch of display?" `.t-headline` at `max-w-3xl` is fine for a centered heading; lede well within ~70ch. ✓.

**Other checklist**
- ✓ One H2, no H1 collision.
- ✓ Hair rule above (`border-t border-foreground/10`) matches site grammar.
- ✓ `.section-y` spacing.
- ✓ Reveal pattern (`reveal-up` + staggered delays). Inline `animationDelay` styles are tolerated outside drawer; the drawer-specific Core ban doesn't apply globally. Keep.
- ✓ Focus-visible ring present.
- ✓ Tap target ≥ 52px.
- ✓ Alt text N/A (no images).
- ✓ No descender clip (no overflow-hidden wrapper around heading).

## Fix plan

### `src/components/BigCloseCTA.tsx`

1. **Drop the arrow import** at L2 (unused after CTA simplification).
2. **L19** — Change default `lede` to `"Tell us about the property — we'll come look, talk it through, and quote it honestly."`.
3. **L44-61** — Rewrite the CTA block so the button matches nav grammar:
   ```tsx
   <Link
     to={primary.to}
     className={cn(
       "cta-spring inline-flex items-center justify-center rounded-lg",
       "bg-evergreen text-evergreen-foreground",
       "px-6 min-h-[52px] text-[15px] font-semibold",
       "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
     )}
   >
     {primary.label}
   </Link>
   ```
   No arrow, no icon-chip, no inset shadow, no `transition-all`, no `text-minimal`.

### `mem://index.md`

Add to Core: **"BigCloseCTA button uses the same square (rounded-lg) solid evergreen shape as the nav Quote CTA — text-only, no arrow glyph, no icon-chip, no hand-rolled shadow. `.cta-spring` carries hover/press."**

## Verify

- `browser--navigate_to_sandbox /` desktop 1440 — confirm closing CTA pill is now a square button matching the nav, lede no longer mentions "two business days" (Hero already does on this page).
- Mobile 390 — same.
- Visit `/about` — heading + new lede, square CTA. The promise no longer appears on the page (acceptable; About page never carried it).
- Console clean.

## Out of scope

- ConsultationForm embedding (Core says BigCloseCTA never embeds it — not embedded ✓).
- Per-page custom headings on `/work` (intentional).
- Footer, nav, hero — separate audits.
