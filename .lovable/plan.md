# Mobile UX Round 2 — Worldclass Pass

This plan finishes the items I paused on after Round 1, then layers a second tier of polish that brings the phone experience to the same caliber as the desktop. Every change is gated behind a mobile breakpoint (`<md` or `<lg`), or only adds new tokens / attributes that desktop never reads. Desktop output stays byte-for-byte identical.

---

## § 1 — Home page (`src/pages/Index.tsx`)

### 1.1 Final CTA (§ VII) — mobile reflow
Currently the left column (headline + lede + direct-contact + 4-item promise list) renders **before** the form on mobile, pushing the form ~3 screens down.

- Add `flex flex-col` to the grid container on `<lg`, keep `lg:grid lg:grid-cols-12` for desktop.
- Re-order children with Tailwind `order-*` utilities so on mobile the sequence becomes:
  1. Eyebrow + headline + 1-line lede *(text column, top half only)*
  2. **Form bezel** *(promoted)*
  3. Direct-contact escape hatch (email/phone) — converted to two full-width tap rows (`min-h-[56px]`, evergreen-tinted background).
  4. Promise list *(deferred to bottom on mobile)*
- Compress vertical paddings: `pt-20 pb-24` is already in place; tighten the inner column `space-y` so the form bezel sits closer to the headline (`mt-8` instead of `mt-12`).
- Tighten the form bezel's inner padding on phones: `cta-bezel__core p-5 sm:p-7 md:p-9` (currently `p-7 md:p-9`).

### 1.2 Service Areas roster (§ VI) — postal-code stack
The `area-row` currently renders area name + postal + chip on one line. On 360px screens the chip frequently wraps under the postal.

- On `<sm`: stack postal under the area name (drop the postal out of the right cluster), keep only the arrow chip on the right.
- Bump per-row `py-10` to `py-7 md:py-10` so visitors can see 3 rows above the fold instead of 2.
- Increase tap surface: wrap the entire `<Link>` in a min-h container so the right chip is reachable with a thumb.

### 1.3 Selected Works (§ IV.b) — sidebar → snap-rail
The sidebar list was already collapsing to a 2-col grid below the featured plate on `<lg`, but it consumes ~600px of vertical space and feels like a duplicate gallery.

- On `<lg`, replace the listbox with a horizontal `.gallery-rail` (utility already added in Round 1).
- Each chip = roman numeral + truncated title + area, `flex-shrink-0 w-36`.
- Keep `aria-selected` and arrow-key navigation; the rail behaves as a single tablist on mobile, the existing listbox on desktop.
- Add a small "← swipe →" affordance below the rail on first paint, fading out after 4s or on first scroll.
- Add an `aria-live="polite"` SR-only announcement when the active plate changes.

### 1.4 Project / Trust / Service cards (§ III, IV, V) — padding tightening
- `PremiumCard` inner `p-8 lg:p-9` → `p-6 sm:p-7 lg:p-9` so phones recover ~16px of horizontal text width per card.
- Project cards: drop `lg:p-9` to `md:p-8 lg:p-9`; keep desktop unchanged.
- Trust panel: change `gap-12 md:gap-14` to `gap-10 md:gap-14` and the numeral disc margin from `mb-6` to `mb-4` on `<md`.

### 1.5 Hero ghost-link rows (§ Hero)
The "See all work" / "See areas" ghost links use the animated 24px hairline that grows to 48px on hover. On phones they don't have a hover state.

- On `<md`, render a static 32px hairline + a small `ArrowUpRight` chip so the affordance reads as a button.
- Wrap each in a `min-h-[44px]` block and `inline-flex items-center` so vertical centering reads as a tappable row.

---

## § 2 — Sub-page heroes (`src/components/SubPageHero.tsx`)

### 2.1 Vignette order
When a `vignette` is present, on mobile it renders **above** the headline (default DOM order) which buries the page title. On desktop it renders to the right (col-7 / col-5).

- Add `order-2 lg:order-1` to the text column and `order-1 lg:order-2` to the vignette column so on `<lg` the headline leads.
- Wait — re-reading: text is *first* in DOM, vignette second. So actually the vignette currently sits *below* the headline on mobile, which is fine. Confirm with a viewport check before editing; if vignette is below headline already, this item is a no-op and we'll leave it.

### 2.2 CTA pair on phones
Primary + secondary CTAs currently sit side-by-side below the subhead. On 360px the secondary ghost-link wraps awkwardly.

- On `<sm`: stack them vertically (`flex-col gap-3`), full-width primary, left-aligned secondary with min-h 44px.
- Keep `sm:flex-row` for everything ≥ 480px so desktop and large phones are unchanged.

### 2.3 Dossier strip on tiny phones
The dossier strip with rules + Section No. + coord + Edition can wrap to 3 lines at 320px.

- On `<sm`, hide the `Edition` segment (least informational) and tighten the inner gap from `gap-3` to `gap-2`.

---

## § 3 — Contact page (`src/pages/Contact.tsx`)

### 3.1 § I order — form leads on mobile
Currently the left "calm four-step path" rail renders before the form on mobile. On phones the user sees 4 numbered steps before reaching the form.

- Promote the form: `order-1 lg:order-2` on the right column, `order-2 lg:order-1` on the steps rail.
- Move the "form should feel like the beginning of a relationship" pull-quote into the steps section so it stays anchored to its context.

### 3.2 Direct-contact list rows
The `contact-row` items currently render as `flex justify-between` with the email/phone on the left and EMAIL/PHONE label on the right. On phones the long email overflows.

- On `<sm`: stack label *above* the address (`flex-col items-start`), bump `py-5` to `py-6` for a 56-row tap target.
- Make the entire row a flex `min-h-[64px]` link so the tap target is the full row.

### 3.3 Service-area roster (§ III)
Same treatment as § 1.2: stack postal under name on `<sm`, keep one-line on `sm+`.

---

## § 4 — Consultation form (`src/components/ConsultationForm.tsx`)

### 4.1 Mobile keyboard ergonomics
- Add `enterKeyHint="next"` to name and contact inputs; `enterKeyHint="send"` to message textarea.
- Bump input height on phones: `h-11` → `h-12 md:h-11` (48px floor on phones, unchanged on desktop).
- Add `inputMode` switching: default `email`, but watch the contact field with a `useState` and switch to `inputMode="tel"` once the user types a digit-leading character (so iOS shows the numeric pad for phones).
- Bump the `<details>` summary tap row to `min-h-[44px]` and add `py-2` so it never falls below the touch guideline.

### 4.2 Submit button
- Already 56px min-h — good.
- Add a subtle `active:translate-y-[1px]` + `active:shadow-inner` on phones for tactile feedback (no hover state to lean on).
- Add `aria-live="polite"` wrapper around the "Sending…" label so screen readers announce progress.

### 4.3 Field spacing
- `space-y-5` on the form is fine on desktop; tighten to `space-y-4 sm:space-y-5` on `<sm` so the form fits one less scroll on iPhone SE.

### 4.4 Loading skeleton
The Suspense fallback uses `h-[460px]` (Index) / `h-[520px]` (Contact). On a 375px-wide phone the form actually renders at ~640px. Update to `h-[640px] md:h-[460px]` and `h-[700px] md:h-[520px]` to prevent the layout-shift jolt when the form mounts.

---

## § 5 — ThankYou (`src/pages/ThankYou.tsx`)

### 5.1 Mobile sticky "Back to home"
Once the form submits and the user lands here, there's no obvious way back from a phone except scrolling to the footer.

- Add a fixed-position "Back to home" pill anchored bottom-right on `<md` only, mirroring `.sticky-cta-bar`'s safe-area treatment.
- Auto-dismisses after 8 seconds or on first interaction.
- Hidden entirely on desktop.

### 5.2 "What next" link grid
The 4-link grid (`NEXT_LINKS`) renders as `grid-cols-1` on mobile. Each card is a single-tap surface — bump `min-h-[88px]` and add `active:bg-evergreen/[0.04]` for tactile feedback.

---

## § 6 — Area pages (`src/components/AreaPage.tsx`)

### 6.1 Sticky CTA reservation
Area pages are long. Confirm `data-sticky-bar` on body adds `padding-bottom` via a single new rule in `index.css` — `body[data-sticky-bar="shown"] main { padding-bottom: 96px; }` on `<md` only — so the in-page footer can't sit behind the floating bar.

### 6.2 In-page section anchors
Some area pages use `<a href="#section">` jumps; `scroll-padding-top: 76px` was added in Round 1, so headlines now clear the floating nav. Verify visually on `/areas/bragg-creek`.

---

## § 7 — Tablet (768–1024px)

### 7.1 Audit
Most layouts switch from 1-col → 2-col at `md` (768) and 2-col → 3-col at `lg` (1024). At 768–820 (iPad portrait) some sections look cramped.

- Service Areas roster: keep one-column on `<lg` already — fine.
- Trust panel: `md:grid-cols-3` at 768px puts only ~210px per column. Switch to `md:grid-cols-2 lg:grid-cols-3` so iPad portrait gets a comfortable 2x2.
- Project cards (§ IV): same — `md:grid-cols-2 lg:grid-cols-3`.

### 7.2 Hero + Final CTA on tablet
- Hero text column is `lg:col-span-7`. At 820px the headline drops to a 4-line wrap. Bump the column to `md:col-span-8 lg:col-span-7`.
- Final CTA: same — promote text column on `md` so the form sits underneath at full width on iPad portrait, side-by-side at landscape.

---

## § 8 — Global polish

### 8.1 Active states
Phones lack hover. Add brand-warm `active:` states to every primary CTA, ghost link, and area row in a single utility:

```css
@media (hover: none) {
  .area-row:active { background: hsl(var(--evergreen) / 0.04); }
  .contact-row:active { background: hsl(var(--evergreen) / 0.04); }
  a[role="button"]:active, button:active { transform: translateY(1px); }
}
```

### 8.2 Page-load welcome
On the first visit only, show a 1.6s soft-fade `loaded` class on `<body>` so the fold doesn't pop in. Pure CSS, no JS state.

### 8.3 Reduce-motion verification
Round 1 added `[data-reveal] transition-delay: 0` on phones; verify `[data-drift]`, `vignette-breathe`, and the SelectedWorks fade-in honor `prefers-reduced-motion`.

### 8.4 Image / payload audit
- Confirm Hero `webp` is `fetchpriority="high"`.
- Confirm `logo-mark.webp` (28×28) is what loads on mobile nav, not the wider `logo-horizontal.webp`.
- Add `decoding="async"` and `loading="lazy"` to every below-the-fold `<img>` — quick scan.

### 8.5 Tap-target audit (one final sweep)
Run through every `<a>` and `<button>` in the project and confirm `min-h-[44px]` (or icon buttons sized `h-11 w-11`). Known hotspots:
- Service plate "View" links
- Footnote links inside paragraphs (these stay text-link, but verify line-height keeps them >32px tall)
- Pagination / "Send another note" text-only ghost links — bump to `min-h-[44px]`

---

## § 9 — QA checklist (run after build)

| # | Device | What I verify |
|---|--------|---------------|
| 1 | iPhone SE (375×667) | Hero headline ≤3 lines; form reachable in ≤2 swipes from home; no horizontal scroll anywhere |
| 2 | iPhone 14 Pro (393×852) | Sticky CTA clears home indicator; safe-area nav cutout |
| 3 | Pixel 7 (412×915) | Sheet menu Call/Email tap targets 48×48; service shortcuts tap-reachable |
| 4 | iPad portrait (820×1180) | Project cards 2-col; Final CTA stacked; trust panel 2x2 |
| 5 | iPad landscape (1180×820) | Reverts to desktop-ish behavior; sticky CTA fits |
| 6 | 320px ultra-narrow | No clipping; type-floor honored |
| 7 | Reduce-motion ON | No drift, no vignette breathe, no reveal stagger |
| 8 | VoiceOver | Skip-link, sheet focus trap, form labels, aria-live receipt all announce |

---

## § 10 — Files touched

- `src/index.css` — new `@media (hover: none)` block, sticky-bar padding rule, mobile form-skeleton heights, dossier-strip mobile gap
- `src/pages/Index.tsx` — Final CTA reflow, area-row mobile stack, hero ghost-link tap rows, project / trust grid breakpoints
- `src/pages/Contact.tsx` — § I order swap, contact-row stack, area-row stack
- `src/pages/ThankYou.tsx` — sticky "Back to home" pill, NEXT_LINKS tap heights
- `src/components/ConsultationForm.tsx` — `enterKeyHint`, `inputMode` switching, h-12 inputs, details tap height
- `src/components/SubPageHero.tsx` — CTA stacking on `<sm`, dossier-strip Edition hide on `<sm`, vignette order verification
- `src/components/gallery/SelectedWorks.tsx` — mobile snap-rail conversion + swipe affordance + aria-live
- `src/components/PremiumCard.tsx` — no change (caller-driven padding)
- `src/components/Hero.tsx` — ghost-link tap rows on `<md`
- `src/components/AreaPage.tsx` — verify scroll-padding-top behavior

---

## § 11 — Single decision for you

**§ 1.3 (SelectedWorks rail):** I'm planning to convert the sidebar into a *horizontal snap-rail* on `<lg` (chips above the featured plate). The alternative is to keep the sidebar as a *vertical accordion* below the featured plate, which is more familiar but adds a lot of vertical scroll.

I recommend the snap-rail because (a) it cuts ~500px of scroll, (b) it surfaces all 6 plates in a single glance, and (c) the swipe gesture matches Stewart-persona phone habits (carousel of properties on Realtor.ca). If you'd rather keep the vertical list, say "vertical" before approving and I'll swap that section before building.

Everything else is non-controversial and ready to ship.
