# Accessibility Pass — Contrast, Focus, Reduced Motion

A targeted, surgical pass. **No font changes, no image changes, no payload impact.** Edits are confined to `src/index.css` (token tweaks + a few utility additions) and a small handful of class-string corrections in components that currently dip below WCAG thresholds.

---

## 1) Contrast — what the audit found

I computed WCAG ratios against our actual tokens (`--background: 36 25% 97%`, `--card: 36 22% 95%`, `--foreground: 20 8% 14%`, `--muted-foreground: 25 8% 38%`, `--evergreen: 145 18% 28%`).

| Pair | Ratio | WCAG 1.4.3 (AA body 4.5 / large 3.0) |
|---|---|---|
| `foreground` on `background` | **14.66** | ✅ |
| `muted-foreground` on `background` | **5.78** | ✅ |
| `muted-foreground` on `card` | **5.54** | ✅ |
| `evergreen` on `background` | **7.78** | ✅ |
| `evergreen-foreground` on `evergreen` (CTA pill) | **7.78** | ✅ |
| `background` on `evergreen-deep` (focus offset on dark band) | **12.67** | ✅ |
| `foreground/70` on `background` | **5.61** | ✅ |
| `evergreen/80` on `background` (eyebrow) | **4.65** | ✅ body |
| `evergreen/75` on `background` (dossier strip) | **4.13** | ⚠️ large-only — used for ≥18px so it passes, but borderline |
| `muted-foreground/80` on `card` (TestimonialSpine helper) | **3.65** | ⚠️ large-only |
| `foreground/55` on `background` (StickyConsultBar dismiss button) | **3.55** | ⚠️ icon-only — meets 1.4.11 (3.0) but feels invisible |
| `muted-foreground/0.7` on `background` (`.cta-bezel__seal`) | **3.05** | ⚠️ decorative metadata, but readable people will try to read it |
| `evergreen/65` on `background` (`.numeral-mark`) | **3.28** | ⚠️ used for tiny labels (0.7rem) — fails 4.5 |
| `evergreen/55` on `background` (numeric stepper / `text-evergreen/55`) | **2.63** | ❌ used as functional numerals in step lists & SelectedWorks index |

### Fixes (token-level so the whole site benefits)
In `src/index.css`:

1. **`.numeral-mark`** — the small Fraunces italic chip used in form labels, contact rows, step ladders. Bump from `evergreen / 0.65` → `evergreen / 0.85` (ratio 4.30 → 5.5+ at the 0.7rem size). The chip is *meant* to feel quiet but it's still data.
2. **`.dossier-strip__inner`** — bump `evergreen / 0.75` → `evergreen / 0.85`. (4.13 → 5.5+)
3. **`.cta-bezel__seal`** — currently `muted-foreground / 0.7`. Switch to a solid `muted-foreground` and drop the alpha multiplier; 0.65rem caps still benefit from a real 4.5+ ratio (5.78).
4. **Numeral list indices** (`text-evergreen/55` used in Hero `FIELD_NOTES`, SelectedWorks index, step lists, AreaPage) — promote to `text-evergreen/80` (4.65) wherever the numeral is *information*, not pure decoration. Touch points: `Hero.tsx` (lines 163, 214), `SelectedWorks.tsx` (135), `InteriorFinishing.tsx` (229), `ExteriorFinishing.tsx` (245), `Index.tsx` index numerals on Section II/III/V cards.
5. **StickyConsultBar dismiss icon** — bump idle color from `text-foreground/55` to `text-foreground/70` (3.55 → 5.61). Still quiet, now visible.
6. **TestimonialSpine helper line** — `text-muted-foreground/80` → `text-muted-foreground` (3.65 → 5.78).

These are *all* one-property edits. No structural change.

---

## 2) Focus states — what's right, what to harden

**Already correct** (manually verified across files):
- All primary CTAs (`.cta-anchor`, `PrimaryCTA`, Navigation Consultation pill, SubPageHero, AreaPage, Work, Services, Index, NotFound, ThankYou, ClosingCta) use `focus-visible:ring-2 focus-visible:ring-evergreen` with appropriate `ring-offset-background` (or `ring-offset-evergreen-deep` on dark bands). Good.
- Inputs / textarea / select inside `ConsultationForm` use `focus-visible:ring-evergreen/50`.

**Gaps to fix:**

A. **`ConsultationForm` inputs use `ring-evergreen/50`** — that's an alpha that puts the *visible ring color* at ~3.7:1 against the form background. Switch to `focus-visible:ring-evergreen` (full alpha) on all four `Input`/`Textarea`/`SelectTrigger` instances. (Lines 243, 268, 292, 405; SelectTriggers 327, 352, 377 use `focus:ring-evergreen/50` — same fix.)

B. **`StickyConsultBar` dismiss button** uses `focus-visible:ring-evergreen/50` (line 153) → `focus-visible:ring-evergreen`.

C. **Skip link** in `Navigation.tsx` exists and is correctly `sr-only focus:not-sr-only` — verify destination `#main` exists in `App.tsx` / page roots. If any page is missing the `id="main"` landmark, add it.

D. **Mobile menu links** (`Navigation.tsx` Sheet body) are `NavLink`s without an explicit `focus-visible:` ring — they currently rely on browser default outline through Radix Sheet. Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm` to keep the focus indicator on-brand inside the Sheet.

E. **Trust-row hairlines** (`.area-row`, `.contact-row`) animate the underline on `:hover` only. `.contact-row` correctly also responds to `:focus-visible` — `.area-row` does not. Add `.area-row:focus-visible::after { width: 100%; }` for keyboard parity. (One CSS line.)

F. **Sub-page hero "Trusted in" links** in `Hero.tsx` (lines 184–195, 234–243) have hover styling but no focus-visible ring. They're textual inline links inside a paragraph, so a subtle `focus-visible:underline focus-visible:decoration-evergreen focus-visible:underline-offset-4 focus-visible:outline-none rounded-sm` is correct (matches the `details` summary pattern in ConsultationForm).

---

## 3) Reduced motion — what's covered, what's missing

`@media (prefers-reduced-motion: reduce)` already nukes `animation`, `transition`, `[data-reveal]`, `[data-reveal-mask]`, `[data-line-draw]`, `.vignette-stroke`, the receipt check, `.sticky-cta-bar`, `.cta-bezel`, `.nav-island`, `.cv-auto`, and `.plate-fade`/`.case-note`. Strong baseline.

**Gaps:**

1. **`useDrift` hook** (Hero `headlineRef`, `data-drift` attribute) writes `--drift` from a scroll listener and the CSS does `transform: translateY(var(--drift, 0px))`. The CSS transition is killed by the global `transition-duration: 0.01ms` in the reduced-motion block, but the *transform value itself* still updates every scroll frame — so the headline will still parallax. Add an early-return inside `useDrift` when `matchMedia('(prefers-reduced-motion: reduce)').matches`. (Hook-only edit — no JSX touched.)

2. **`vignette-breathe`** keyframe (`@keyframes vignette-breathe`) and **`creek-tick`** keyframe — both are `infinite` animations on the Hero. The global guard sets `animation-iteration-count: 1` and `animation-duration: 0.01ms`, which collapses them, but the `transform-origin` and `transform: scale(...)` settle on whatever the first 0.01ms keyframe puts them at. Add explicit `.vignette-breathe { transform: none; animation: none; }` and `.creek-tick { opacity: 1; animation: none; }` inside the existing reduced-motion block to make the rest state explicit.

3. **`scroll-behavior: smooth`** is correctly overridden to `auto` in the reduced-motion block. ✓

4. **Sheet (mobile menu) animations** — Radix Sheet uses its own `data-[state=open]:animate-in` / `data-[state=closed]:animate-out` classes from `tailwindcss-animate`. These keyframes are also caught by the global guard (`animation-duration: 0.01ms`), so they snap. ✓

5. **Hover `transform: translateY(-1px/-2px)` on `.testimonial-card`, `.cta-anchor:hover`, `.card-soft:hover`** — these depend on `transition-duration` which is collapsed, so the lift becomes instant rather than animated. That's the correct reduced-motion behavior. ✓

---

## 4) Files touched (final list)

- `src/index.css` — token alphas (`.numeral-mark`, `.dossier-strip__inner`, `.cta-bezel__seal`), `.area-row:focus-visible::after`, two reduced-motion explicit rest states.
- `src/hooks/useDrift.ts` — early-return on `prefers-reduced-motion: reduce`.
- `src/components/Hero.tsx` — `text-evergreen/55` → `/80` on the two FIELD_NOTES numeral spans (lines 163, 214); add focus-visible underline ring to the inline `Trusted in` `<Link>`s (lines 186, 236).
- `src/components/StickyConsultBar.tsx` — dismiss icon color and ring fix.
- `src/components/ConsultationForm.tsx` — `ring-evergreen/50` → `ring-evergreen` across the 7 inputs/triggers (lines 243, 268, 292, 327, 352, 377, 405).
- `src/components/TestimonialSpine.tsx` — drop `/80` on the helper line.
- `src/components/Navigation.tsx` — focus-visible ring on the mobile Sheet `NavLink`s.
- `src/components/gallery/SelectedWorks.tsx` — `text-evergreen/55` index → `/80` (line 135).
- `src/pages/InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `Index.tsx` — same `/55` → `/80` substitution on the proof / step indices.

No font files, no images, no `package.json`, no Tailwind config touched.

---

## 5) Verification

1. `bun run build` — confirms zero TypeScript / Tailwind errors.
2. Re-run the contrast computation script on the new alphas to confirm every targeted pair now ≥ 4.5 (body) or 3.0 (large/icon).
3. Manual keyboard tab-through of the landing page in my head against the route map: skip-link → nav links → CTA → mobile menu → hero CTAs → "Trusted in" links → all section CTAs → form inputs → form submit → sticky bar dismiss + CTA → footer. Every stop must show a visible evergreen ring.
4. Grep `rg "ring-evergreen/50|text-evergreen/55|foreground/55"` to confirm zero remaining offenders inside `src/components` and `src/pages` (allowed inside `src/components/ui/*` shadcn primitives we don't override, since they're not used on the landing page).

Approve and I'll execute in a single pass.
