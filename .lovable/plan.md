# Round 3 — Mobile Overhaul: Contact-First, Thumb-First

> **Hard constraint:** Zero visual change at `lg` and above. Every rule lives behind `<sm:`, `sm:`, `md:`, or `lg:hidden` / `hidden lg:block` gates. After each pass I'll diff a desktop screenshot against the previous turn's baseline.

---

## § 1 — A real "Quick Contact" bottom-sheet (new)

Right now the only ways to reach the team on a phone are: scroll all the way to the home final-CTA, navigate to `/contact`, tap the sticky pill (which routes to `/contact`), or open the hamburger and tap one of the contact tiles. None of these are a single-tap, in-place capture.

I'll add a **mobile-only bottom-sheet modal** (`QuickContactSheet`) — a true Radix Dialog rendered as a bottom-anchored sheet — that gives visitors three escape hatches in one tap: **call**, **email**, or **send a short note** (3-field micro-form: name, contact, one line).

**Trigger surfaces** (all mobile-only):
- `StickyConsultBar` — the existing pill becomes a button that opens the sheet *instead of* routing to `/contact`. Routing still happens on `lg+`. (This eliminates a full page navigation on phones — a huge UX win for cautious leads.)
- `Navigation.tsx` mobile sheet bottom CTA — same swap.
- A new persistent bottom-right **Floating Action Button (FAB)** for `/work`, `/services`, `/about`, `/service-areas` — a 56×56 evergreen circle with a `MessageCircle` icon, fixed bottom-right, safe-area-respecting. Hidden on `lg+`. Opens the same sheet. (The sticky bar already handles the home page.)

**The bottom-sheet itself** (`src/components/QuickContactSheet.tsx`):
- Built on `Dialog` from `@/components/ui/dialog.tsx`, with custom positioning so it slides up from the bottom: `fixed bottom-0 inset-x-0 rounded-t-[1.25rem] max-h-[85svh]` (uses `svh` so iOS Safari address-bar resize doesn't reflow), `pb-[max(1.5rem,calc(var(--safe-bottom)+1rem))]`.
- Drag-handle pill at the top (4px × 36px, evergreen/30) — purely visual, no actual drag-to-dismiss (we keep tap-outside + close button + Escape).
- Header: `Eyebrow` "QUICK CONTACT" + serif headline "How would you like to reach us?".
- **Tier 1 — instant actions** (rendered as two 64px-tall full-width tiles in a 2-col grid):
  - "Call (403) 555-0100" → `tel:` link with `Phone` icon and "Mon–Fri" sub-line.
  - "Email hello@…" → `mailto:` with `Mail` icon and "Reply within 2 days" sub-line.
- Hairline divider with italic "or".
- **Tier 2 — micro-form** (3 fields only): `Name`, `Email or phone` (with mobile keyboard switcher — see § 2), and `One sentence about the project` (textarea, `rows={3}`, `min-h-[88px]`). Submit button is full-width 56px evergreen pill ("Send a short note").
- Foot rule: "Want to add timing/budget/location? Open the full form →" link to `/contact`.
- The micro-form posts to the same `consultations` Supabase table with `source: "quick_contact_sheet"` so leads are attributable. On success: collapse the form into a 5-second "Thanks — we'll reply within two business days" panel and auto-close the sheet, then toast.

**Decision I want you to flag, otherwise I'll proceed with my recommendation:** I recommend the FAB *only* on `/work`, `/services`, `/about`, `/service-areas`, and `/{area}` pages — **not** on `/` (the sticky bar already lives there) and **not** on `/contact` or `/thank-you` (you're already there). My alternative is "FAB everywhere" — simpler but creates double-CTAs on the home page. **If you want FAB everywhere, say "fab everywhere"; otherwise I proceed with the targeted list.**

---

## § 2 — Inline `ConsultationForm` ergonomics (mobile-only refinements)

These apply to the form wherever it's rendered (home final-CTA bezel, `/contact` panel, and the new bottom-sheet's "open the full form" target):

1. **Mobile keyboard hints** — every input gets `enterKeyHint`:
   - `name` → `enterKeyHint="next"`
   - `contact` → `enterKeyHint="next"` + dynamic `inputMode`/`type`: detect at `onChange` whether the value starts with a digit, `(`, `+` → switch to `inputMode="tel"` + `type="tel"`; otherwise `inputMode="email"` + `type="email"`. Falls back to `email` on initial render.
   - `message` → `enterKeyHint="send"` (Enter submits the form when the message field is the last touched and form is valid).
   - `location` → `enterKeyHint="done"`.
2. **Touch-floor heights** — bump every `Input`/`SelectTrigger` from `h-11` (44px) to `h-12` (48px) on phones via responsive class `h-12 sm:h-11`. Textarea floor `min-h-[140px] sm:min-h-[120px]`.
3. **Label hit-area** — wrap `FormLabel` so tapping the label focuses the input (Radix `Label` already does this when `htmlFor` is wired, but our current setup uses `FormLabel` which inherits the `id`). Verify each field's label-to-input association renders correctly.
4. **Optional-context `<details>`** — convert the summary into a true 56px tap row with a chevron on the right (currently 18px text + tiny chevron). Add a hairline above and below so it reads as a discrete "section" on mobile.
5. **Submit button** — already 56px, but on phones add `text-[1rem]` (currently `text-minimal` = 11px) so the action is unmistakable. Desktop preserves `text-minimal`.
6. **Inline success state** — currently displays as a small block. On phones, render full-width with a leading evergreen check disc (40×40), serif italic headline, and a 56px "Send another note" / "View where we work" two-button row.
7. **Honeypot** — already off-screen; unchanged.
8. **Field validation messages** — increase from `text-xs` to `text-sm` on phones for legibility (`text-sm sm:text-xs`).

---

## § 3 — `/contact` page mobile reflow

1. **Promote the form** — currently the "What happens next" rail is column 1 and the form is column 2. On `lg+` keep verbatim. On `<lg`, use `flex flex-col` + `order-*` so the order becomes:
   1. SubPageHero
   2. Form bezel (was second)
   3. Direct-contact rows (was third)
   4. "What happens next" 4-step rail (was first — demoted on mobile, since by the time someone is on `/contact` they are ready to act, not learn).
2. **Form bezel padding** — `p-7 md:p-10` becomes `p-5 sm:p-7 md:p-10`.
3. **Direct-contact rows** — currently three rows with email, phone, "MON–FRI" stacked on the left and uppercase tags on the right. On `<sm` the email overflows. Switch to:
   - Numeral on the left.
   - Email/phone/text in serif, **stacked above** the small "EMAIL · MON–FRI" tag (column layout on `<sm`, baseline row on `sm+`).
   - Each `<a>` becomes a 64px tap row with `active:bg-evergreen/[0.04]` for tactile feedback.
4. **"What happens next" rail** (now last on mobile) — render the 4 steps as a vertical list with `numeral-disc` markers (40px) instead of the current border-left rule + numeral combination, so the rhythm matches the home page's process section.
5. **Sticky-rail cleanup** — the left column has `lg:sticky lg:top-28`. Already `lg:` gated. Verified safe.
6. **Vertical rhythm** — `pb-24 md:pb-32` becomes `pb-16 sm:pb-20 md:pb-32` (compress on mobile).

---

## § 4 — `/thank-you` page mobile reflow & "Back to home" pill

1. **Sticky "Back to home" pill** — on `<lg`, fix a 48px evergreen-outline pill at the top-right of the viewport, `top-[max(0.75rem,calc(var(--safe-top)+0.5rem))] right-3`, `z-40`. Hides at `lg+`. Lets visitors who landed on the page from a successful submission return without scrolling.
2. **NEXT_LINKS cards** — currently `p-6 lg:p-7`. Compress to `p-5 sm:p-6 lg:p-7` and increase `numeral-disc` size on phones (already 40px — fine), but ensure the entire card has `min-h-[148px]` so the four cards form a clean 2-col grid on `sm` (320–480px gets 1 col, 481–767 gets 2 cols).
3. **§ I — "What happens next" rail** — currently `lg:col-span-5` text + `lg:col-span-7` rail. On `<lg`, the rail's `surveyor-frame` and dotted left line look great but the 3 numbered items use `pl-12` which leaves the discs visually orphaned at narrow widths. Reduce to `pl-10` on `<sm` and shrink the disc to 36px.
4. **§ II — "While you wait" grid** — already `sm:grid-cols-2 lg:grid-cols-4`. Verified.
5. **§ III — Quiet sign-off** — increase top/bottom padding floor on phones so the page doesn't end abruptly above the sticky pill: `py-20 md:py-28` becomes `pb-32 sm:pb-24 md:pb-28 pt-20`.
6. **Receipt stamp** — on `<sm`, the `figure-footnote` row wraps awkwardly because the timestamp + "RECEIVED" label + check svg compete for one line. Switch to a 2-row layout: row 1 = check + "Fig. iv. RECEIVED", row 2 = timestamp right-aligned in `tabular-nums`. Desktop preserves the single-line.

---

## § 5 — `StickyConsultBar` mobile refinements

1. **On `<lg`, the pill opens `QuickContactSheet`** instead of routing to `/contact`. (Routing remains on `lg+`.) Implementation: keep the `<Link>` for `lg+`; render a `<button>` for `<lg` that calls a new prop `onMobileTap?: () => void`, passed from `App.tsx` which holds the sheet's open state.
2. **Body inset reservation** — already toggles `body[data-sticky-bar="shown"]`. Add a CSS rule in `index.css`:
   ```css
   body[data-sticky-bar="shown"] {
     padding-bottom: max(4.5rem, calc(var(--safe-bottom) + 4rem));
   }
   @media (min-width: 640px) {
     body[data-sticky-bar="shown"] { padding-bottom: 0; }
   }
   ```
   This prevents the bar from overlapping footer content on phones.
3. **Slide-in motion** — currently `translateY(calc(100% + 1.25rem))` then `translateY(0)`. Add `will-change: transform, opacity` only while transitioning (toggled via JS `data-transitioning`) for smoother 60fps slide on low-end Androids.
4. **Dismiss feedback** — when the user taps X, briefly slide-down + fade (already does this) and announce "Dismissed — reopen by scrolling back to the top" via a `sr-only` live region.

---

## § 6 — Mobile-nav `Sheet` polish

1. **Bottom CTA opens `QuickContactSheet`** on `<lg` instead of routing — same logic as § 5.1.
2. **Quick-actions tiles** — already 52px tall. Bump to 56px and add `active:scale-[0.98]` for tactile feedback.
3. **Service shortcuts** — already 44px min. Keep, but increase font from `text-[0.97rem]` to `text-[1.05rem]` for one-handed legibility, and add a trailing `→` chevron that shifts 4px right on `:hover`/`:focus-visible`.
4. **Sheet width** — `w-full sm:max-w-md`. On very wide phones (414+) this is fine. On 320–360px screens the sheet is full-bleed which is correct. Verified.
5. **Safe-area** — already wired via `--sheet-pt`/`--sheet-pb`. Verified.
6. **Reduce close-tap risk** — the Sheet's built-in close button sits absolute top-right. On `<sm`, add `top-[max(1rem,calc(var(--safe-top)+0.5rem))] right-4` and make it 48×48 so it doesn't sit too close to the iOS notch.

---

## § 7 — Hero ghost-link tap rows (queued from Round 2)

The home Hero has inline italic ghost links ("View our work" / "Read about us") that on `<md` are too small and too close together. On `<md`, render them as full-width tap rows (`min-h-[56px]`) inside a 1-column grid, separated by a hairline. Desktop keeps the inline italic treatment via `md:flex md:items-center md:gap-8` + `block w-full md:w-auto`.

---

## § 8 — Global `@media (hover: none)` active-state pass

Add a single CSS block in `src/index.css` so every pill, link, and card has tactile feedback on touch (currently most rely on `:hover` which never fires on touch):

```css
@media (hover: none) {
  .area-row:active,
  .contact-row:active,
  a[class*="rounded-full"]:active,
  button[class*="rounded-full"]:active {
    transform: scale(0.985);
    transition: transform 120ms var(--ease-swift);
  }
  .group:active .icon-chip { background-color: hsl(var(--evergreen) / 0.12); }
}
```

Plus an explicit `-webkit-tap-highlight-color: transparent` on `body` (already partially set — verify and consolidate).

---

## § 9 — Tablet (768–1023px) targeted pass

iPad portrait is currently caught by `md:` rules but a few sections feel cramped:
- **Service Areas roster** — already `sm:` for the postal stack; add `md:py-12` so rows breathe at iPad portrait.
- **`/contact` form bezel** — at `md:` keep the form as the second column but compress the left rail to `md:col-span-5`. Already correct.
- **Navigation** — at `768px` exactly, the desktop horizontal nav appears (`md:flex`). Verify spacing on a 768px-portrait iPad with safe-area gutters. Likely fine; will screenshot to confirm.

---

## § 10 — QA & Verification

1. `bun run build` — must stay green.
2. Manual viewport sweep at: **320×568** (iPhone SE 1), **360×800** (Android baseline), **375×812** (iPhone 13 mini), **390×844** (iPhone 15), **414×896** (iPhone Plus), **768×1024** (iPad portrait), **820×1180** (iPad Air portrait), **1024×768** (iPad landscape — should look identical to small desktop), **1280×720** (small desktop — must be byte-for-byte unchanged), **1536×864** and **1920×1080** (full desktop — must be byte-for-byte unchanged).
3. **Bottom-sheet a11y check**: focus trap (Radix Dialog handles it), Escape closes, focus returns to trigger, sheet has `aria-labelledby` pointing at the visible headline.
4. **Reduced-motion**: bottom-sheet's slide-up collapses to a fade per existing `@media (prefers-reduced-motion: reduce)` block; verify.
5. **Lighthouse mobile**: target ≥ 95 a11y, ≥ 90 perf on the home and `/contact` pages.
6. **Tap-target audit**: confirm every interactive element on every mobile page is ≥ 44×44, ideally 48×48.

---

## Files I expect to edit

- **New:** `src/components/QuickContactSheet.tsx`, `src/components/QuickContactFab.tsx`
- **Modified:** `src/App.tsx` (mount sheet + global state), `src/components/StickyConsultBar.tsx`, `src/components/Navigation.tsx`, `src/components/ConsultationForm.tsx`, `src/components/Hero.tsx`, `src/components/SubPageHero.tsx`, `src/pages/Contact.tsx`, `src/pages/ThankYou.tsx`, `src/pages/Index.tsx` (FAB exclusion), `src/index.css` (sticky-bar reservation, hover-none block, bottom-sheet styles, tap-target floors).

---

## What I am explicitly **not** doing

- Not changing any desktop (`lg+`) styles. All edits are gated `<sm:`, `sm:`, `md:`, or `lg:hidden`.
- Not redesigning the form's information architecture — same fields, same submit, same Supabase write.
- Not adding a service worker / offline mode (out of scope for a UX polish round).
- Not changing copy beyond the new bottom-sheet and the "Back to home" pill.
- Not touching auth, RLS, or any backend logic.

---

## Open question for you (please answer before approval)

**FAB scope** — see § 1. My recommendation is targeted (skip `/`, `/contact`, `/thank-you`). If you want FAB on every mobile page, reply **"fab everywhere"**; if you want it nowhere (sticky bar only), reply **"no fab"**; otherwise I proceed with the targeted list.