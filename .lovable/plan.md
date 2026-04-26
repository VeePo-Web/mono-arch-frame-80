# Final CTA Redesign — Double-Bezel & Conversational Voice

The §VII Final CTA on `/` currently uses a single `surface-card` and a relatively transactional headline (“A quiet conversation about your property.” / “No template quote. No pressure.”). The section reads competently but doesn’t earn the gravity of being the site’s primary conversion. We’ll give it: (1) a refined **double-bezel** form surface that frames the form like an objet, (2) **softer high-contrast** surrounding the band so the card visibly “lifts,” and (3) a **warmer, more conversational headline + supporting paragraph** that mirrors how the Steady Steward actually talks.

No new dependencies. All work is scoped to `src/index.css` and `src/pages/Index.tsx` (lines 522–647). No data, routing, or schema changes.

---

## 1) New surface utility — `.cta-bezel` (in `src/index.css`)

Add a dedicated double-bezel utility next to `.surface-card` (~line 273). This is intentionally a **new** class — the existing `.surface-card` stays the single editorial card treatment everywhere else, per the brand rule “No double-bezel” for general cards. The Final CTA is the one place we permit it because it functions as a presentation case (the form is the headline event of the page).

Structure: an outer **shell** + an inner **core**, separated by a hairline gap that creates the bezel.

```
.cta-bezel               → outer shell: paper-cream background, hairline border, soft shadow
.cta-bezel__core         → inner card: pure card surface, second hairline, sits in shell with 6px inset
.cta-bezel__rail         → 1px evergreen-tinted top accent on the core (chapter rule)
.cta-bezel__seal         → small "Edition I" dossier mark in the bottom-right corner of the shell
```

Visual spec (light, editorial, no glassmorphism):
- **Shell**: `background: hsl(var(--paper-cream))`, `border: 1px solid hsl(var(--border))`, `border-radius: calc(var(--r-shell) + 6px)`, `box-shadow: var(--shadow-elegant)`, `padding: 6px`.
- **Core**: `background: hsl(var(--card))`, `border: 1px solid hsl(var(--border) / 0.7)`, `border-radius: var(--r-shell)`, `box-shadow: 0 1px 0 hsl(var(--background) / 0.6) inset` (single inner highlight — keeps it from looking digital).
- **Rail**: 1px line, `background: linear-gradient(90deg, transparent, hsl(var(--evergreen) / 0.45), transparent)`, sits flush above the core via `::before`.
- **Seal**: small uppercase tracking-wide `Edition I · No. VII` in `var(--muted-foreground)`, absolute bottom-right of the shell, outside the core.
- **Hover** (whole shell): `border-color: hsl(var(--evergreen) / 0.30)`, `box-shadow` deepens by ~10%, 500ms `var(--ease-silk)`. No transform — the form must stay rock-stable for typing.
- **Reduced motion**: transitions snap (use existing `@media (prefers-reduced-motion: reduce)` block).

This double-bezel echoes the dossier language used in `SubPageHero` and `Navigation` mobile menu — same family, just at full editorial weight.

## 2) Soften the deep-evergreen band so the card lifts (in `src/pages/Index.tsx`, lines 522–532)

The current radial gradient is good; we layer a **second, much softer wash** to add directional light from the upper-right toward the form column, plus a subtle vignette near the bottom edge. This is what makes “high-contrast but soft” work — the card is bright cream against deep evergreen, but the evergreen itself isn’t flat.

Change the `<RevealSection>` style block to:
```ts
backgroundImage: [
  // existing warm radial from upper-left
  "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
  // NEW: cool soft wash toward the form column to give the bezel a halo
  "radial-gradient(60% 50% at 78% 32%, hsl(145 18% 30% / 0.55), transparent 70%)",
  // NEW: gentle bottom vignette so the skyline silhouette reads quieter
  "linear-gradient(to bottom, transparent 60%, hsl(145 30% 10% / 0.35))",
].join(", "),
```
Also bump the core padding from `py-36 md:py-48` → keep desktop, **add `pt-32 md:pt-44 pb-40 md:pb-52`** so the silhouette has more breathing room under the card.

## 3) Conversational headline + supporting copy (lines 557–567 and 620–628)

Current copy is correct but reads like a brochure. The Steady Steward responds to plain, neighborly language with a clear next move. Rewrites:

**Left column eyebrow + heading + lede** (lines 557–567):
- Eyebrow stays `Next step` ✓
- H2 (drift): **“Let’s talk about what you’re thinking.”**
  - Width changes from `max-w-[20ch]` → `max-w-[22ch]` to give the longer line air.
- Lede (replaces current p):
  > “Tell us a little about the place and what’s on your mind. We’ll write back within two business days — usually the same day — with a couple of clear questions, not a template quote.”
- Add a third quiet line under the lede in `text-minimal text-background/60`:
  > “A real person reads every message. No drip emails, no calls unless you ask for one.”

**Right column form header** (lines 620–628):
- Replace `font-serif text-foreground text-[1.3rem] md:text-[1.5rem]` line with:
  > “What should we know before we reach out?”
- Replace muted helper line with:
  > “Just enough so the first reply is useful — five fields, two minutes.”

These two strings reduce form-anxiety (the #1 objection per the brand questionnaire) by naming exactly what happens next and how long it takes.

## 4) Markup updates in `Index.tsx` to use the new bezel

Replace the right-column wrapper (lines 618–643):
```tsx
<div className="cta-bezel">
  <div className="cta-bezel__core p-7 md:p-9">
    <p data-drift className="font-serif text-foreground text-[1.3rem] md:text-[1.5rem] leading-snug">
      What should we know before we reach out?
    </p>
    <p className="mt-2 text-minimal text-muted-foreground">
      Just enough so the first reply is useful — five fields, two minutes.
    </p>

    <div className="mt-7 mb-6 h-px bg-foreground/10" />

    <Suspense fallback={<div aria-hidden="true" className="h-[460px] rounded-md bg-foreground/[0.03] animate-pulse" />}>
      <ConsultationForm source="home_final_cta" />
    </Suspense>
  </div>
  <span aria-hidden="true" className="cta-bezel__seal">Edition I · No. VII</span>
</div>
```

Also, on the left column: keep the promise list and direct-contact block — those are doing real work — but tighten the divider treatment so the eye lands on the form first. Change `border-t border-background/15` (line 570) → `border-t border-background/20` for slightly more presence against the new layered background.

## 5) Sticky bar interaction with the new section

`StickyConsultBar` already hides itself via an IntersectionObserver on `#final-cta`. The `id="final-cta"` is preserved in the redesign, so no change needed there. We’ll re-confirm in QA that the bar disappears as the bezel enters the viewport.

## 6) Files touched

- `src/index.css` — add `.cta-bezel`, `.cta-bezel__core`, `.cta-bezel__rail`, `.cta-bezel__seal` (~30 lines, placed after `.surface-card-featured`); add reduced-motion guard.
- `src/pages/Index.tsx` — update §VII RevealSection background layers + padding; rewrite H2/lede/microline; rewrite form header + helper; swap `surface-card` wrapper for `cta-bezel` + `cta-bezel__core` and add `cta-bezel__seal`.

No other components or pages change.

## 7) Verification

1. `bun run build` — confirms the CSS additions and JSX edits compile cleanly.
2. Visual QA in preview (browser screenshot tool):
   - Final CTA at desktop ≥1280px: bezel visibly “floats” over the layered evergreen, seal reads at bottom-right of shell, rail is a barely-there evergreen line at the top of the core.
   - Mobile ≤640px: bezel padding holds, form remains comfortably tappable (no clipping at the rounded corners).
   - Reduced-motion: hover transitions snap; no animation on the rail or shell.
3. Scroll behavior: confirm `StickyConsultBar` still hides when `#final-cta` enters the viewport, and reappears if scrolled back up past it.
4. Accessibility:
   - `#final-cta-heading` still labels the section ✓
   - The seal is `aria-hidden` (decorative); no contrast regression on the form (it sits on `--card` like before).
   - Keyboard tab order is unchanged — the form is still the only interactive content inside the bezel.

## 8) Out of scope (deliberate)

- No copy changes to the contact page form itself or to `ConsultationForm.tsx`.
- No new fields in the form — the “five fields, two minutes” claim is verified against the existing form schema (`name`, `email`, `phone`, `area`, `message`).
- No new color tokens — we reuse `--paper-cream`, `--card`, `--border`, `--evergreen`, `--evergreen-deep`, `--shadow-elegant`, `--r-shell`, `--ease-silk`.
- The `ClosingCta` band used on sub-pages is not touched in this pass; once the home pattern proves out we can promote the bezel to it in a follow-up.
