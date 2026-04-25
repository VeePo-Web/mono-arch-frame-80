# Loop goal — answer Sam's 5-second trust question, *visibly*

Filter for every change in this loop (verbatim from the brief):

1. **Elevate the human experience** — Sam (cautious, selective, quietly skeptical) must feel *seen* in the first viewport, not sold to.
2. **Embody brand truth with excellence** — calm rural editorial, not flashy urban; every pixel must dispel a fear.
3. **Innovate responsibly for impact** — every element earns its space against the *one* page goal: **Request a Consultation**.

---

## Diagnosis — what's still working against the goal

The previous loops made the page calm, gave us a fear-ledger, a trust panel and a deep-evergreen final CTA. Three large gaps remain — they are the reason the site still reads as a typographic exercise rather than a trust artifact:

1. **The Hero answers a *question Sam isn't asking.*** It says "Trusted renovations for rural homes" but the right column is a static link list of four areas + one synthetic quote. The persona's first thought is *"Will this person respect my property?"* — the hero never answers it. The italic *Trusted* underline and the radial bloom give it polish, but a cautious 55-year-old acreage owner does not convert on polish.
2. **The home page hides its conversion gravity again.** The fear ledger is excellent, but the form is **section VII**. Below the fold there is no persistent invitation. A scrolled visitor on viewport 2 or 3 has the trust they need, but no nearby door.
3. **The gallery is SVG vignettes.** Per the persona doc verbatim — *"They are reading tone. They are looking at project photos. … The project gallery becomes one of the most important trust assets because it turns past results into future confidence."* Synthetic SVG plates fail this test. They read as **stand-ins**, which actively undermines trust.
4. **There are zero testimonials.** The persona doc lists *"Testimonials or review excerpts when available"* as evidence Sam needs. We have one quote, in the hero, marked TODO.
5. **The form has 5 visible required-feeling fields** before the submit button. Two persona-named fears live in this form — *Quote Anxiety* and *Trust*. Field count, even with optional labels, signals a wall.
6. **The Contact page still uses retired patterns** (`numeral="I"` on `Eyebrow` no-op, `coordMark="..."` on `SubPageHero` no-op, `bezel-shell-closing` and `tone="evergreen"` on `PremiumCard` — both retired). It still works, but the file carries dead weight that is going to confuse the next pass.
7. **Mobile has no persistent consultation handle.** The nav pill becomes the only conversion CTA at small viewports, and once the user has scrolled past the hero, the consultation goal effectively disappears unless they scroll back to top.

---

## Plan — section by section

### A. **Sticky bottom-bar conversion handle** (mobile + small desktop)
The single highest-leverage conversion change in this loop.

A persistent, dismissible **`<aside>` bar** appearing once the visitor has scrolled past the Hero (~85vh). It carries one calm sentence + the consultation pill.

```
─────────────────────────────────────────────────────────
  Ready when you are.   [ Request a Consultation → ]   ✕
─────────────────────────────────────────────────────────
```

- **Visibility logic** — IntersectionObserver on a 1px sentinel placed below the Hero. No scroll handler.
- **Dismiss** — a quiet ✕ stores `localStorage["hc:cta-bar"] = "dismissed"` (session-scoped — clears on next visit).
- **Mobile-first**: full-width, fixed bottom, 64px tall, plaster glass like the nav island. On `lg+` it floats centered with a max-width of 720px and 24px from the bottom.
- **Hides** on `/contact` and `/thank-you` (we're already there or done).
- **Hides** on the final-CTA section (IntersectionObserver — once `#final-cta` enters viewport, fade it out so the inline form is the only invitation).
- **Files**: new `src/components/StickyConsultBar.tsx`, mounted once in `src/App.tsx` near the route boundary.
- **CSS**: a `.sticky-cta-bar` utility in `src/index.css` — plaster-glass `bg-background/80 backdrop-blur-xl`, 1px hairline ring, `--shadow-haptic` softened, animated in with `translate-y` + opacity over 600ms `ease-weighted`.
- **A11y**: `role="complementary" aria-label="Contact shortcut"`. Dismiss button has `aria-label="Dismiss consultation shortcut"`. Honors `prefers-reduced-motion`.

### B. **Hero — restage as a 5-second trust answer**

Today the hero is *editorial*. It needs to be *editorial **and** answering Sam's first question*. The persona's verbatim 5-second question is: *"Can I trust this contractor to respect my rural property, do quality work, and see the project through properly?"* — so the hero must literally answer that.

Restructure (lg+):
```
EYEBROW: HAVEN CREEK · RURAL ALBERTA               [ small radial bloom upper-right ]

H1 (cols 1–9):
   One trusted contractor for the
   property you value.

P  (cols 1–7):
   Hands-on finishing, repairs, and decks across rural Alberta.
   One person plans the work, does the work, and walks the
   finish with you. No rotating trades.

[ Request a Consultation → ]    View the work →
↳ trust-microcopy:  Reply within 2 business days · No obligation · No pressure

Right (cols 10–12, top-aligned, hairline-bordered card):
   ───────────────────
   What this means in practice
   ───────────────────
   ① Same person on site, planning to finish
   ② Property left the way we found it
   ③ A real reply within 2 business days
   ④ No template quote — built around your site
   ───────────────────
   Trusted in
   Bragg Creek · Bearspaw · Rocky View · Water Valley
```

- **Why this works**: The H1 now uses the persona doc's *verbatim primary hook* — *"One trusted contractor for the property you value."* The right column drops the lone-quote vanity for a four-line *behavioral* promise — answering four of the seven fears in the visible viewport. The areas line shrinks to a single rule of trust at the bottom of the right column.
- **The italic *Trusted* underline** stays as the brand's signature — the only ornament.
- **No real photo this loop** — we'll use the existing radial bloom + a *single* hairline-bordered "Field notes" card on the right. (Photos are out-of-scope: Sam's persona doc explicitly warns against generic stock imagery, and we don't have real photography yet. A four-line typographic promise is more truthful than stand-in art.)
- **File**: `src/components/Hero.tsx` — full restructure of the right column, headline copy swap, subhead copy swap. Keep all the existing reveal staging.

### C. **Inline mid-page CTA after the fear ledger** (the conversion-gravity fix)

Right now, after the fear ledger answers all seven of Sam's questions, the next thing he sees is "What we build." We're losing readers who were ready to convert at the bottom of the ledger. We add a calm, single-sentence inline conversion bridge.

```
─── · · · ─── · · · ───
"If any of those answered your fear, the next step is a quiet conversation."
                                                      [ Request a Consultation → ]
                                                      Reply within 2 business days · No obligation
─── · · · ─── · · · ───
```

- Centered, 56ch max-width, italic Fraunces left, evergreen pill right. Single hairline above and below.
- Sits between § I (fear ledger) and § II (services).
- **File**: `src/pages/Index.tsx` — new short `<aside>` inserted at the `</RevealSection>` boundary of § I.

### D. **Replace the synthetic SVG gallery with photo-credible placeholder cards**

We don't have real photographs yet, but the persona doc tells us *photos are the trust asset*. Stand-in SVG plates do active harm. The next-best thing — and the standard editorial pattern when photography is pending — is a **typographic placeholder that announces itself as a placeholder**, not as a real plate.

For each gallery card (home § IV preview + the Selected Works list + `/work`), we render a clearly-labeled **"Photograph in progress"** plate:
- A muted plaster-tone surface (no fake illustration), 4:3 aspect.
- Centered: a small `numeral-disc` with the project number + a Fraunces-italic label *"Photograph in progress."*
- Underneath inside the same card area: the project's location pill (`Bragg Creek · 2024`) and scope chip.
- A single hairline rule (`bg-evergreen/15`).
- A **`data-photo-status="pending"`** attribute so a future loop can swap in real `<img>` simply by replacing this slot.
- The `ProjectVignette` component is **deprecated, not deleted** — we keep the file with a `console.warn` for any remaining callers and stop importing it from `Index.tsx`, `Work.tsx`, `gallery/SelectedWorks.tsx`.

Why this is better than vignettes: it tells Sam the truth — *"real photos are coming, here's the project record"* — instead of pretending. Truth is the brand promise of the entire site.

- **Files**:
  - new `src/components/gallery/ProjectPlaceholder.tsx` — the new typographic card.
  - `src/pages/Index.tsx` — swap the `<ProjectVignette …>` inside the work-preview grid for `<ProjectPlaceholder project={p} index={i} />`.
  - `src/pages/Work.tsx` — same swap.
  - `src/components/gallery/SelectedWorks.tsx` — same swap (or replace with a single `<ProjectPlaceholder>` used in a list).
  - `src/components/ProjectVignette.tsx` — add a `console.warn` and keep exports intact (no breakage).

### E. **Add a Testimonial Spine — "What clients say"**

A new home section between § V (Trust Panel) and § VI (Service Areas Roster). Three short, attributed quotes in a centered editorial layout — the missing trust signal Sam's persona doc explicitly names.

```
EYEBROW: WORDS FROM CLIENTS
H2 (centered, max 24ch):
   What it feels like to work with us.

[ Three quotes in a 3-column grid, lg+; stacked on mobile ]

  "Walked the           "Cleaned up         "We knew exactly
   project with us       at the end of       what was
   start to finish.      every day. The      happening, every
   The site was the      property never      week. No surprises."
   way they found it     felt occupied."
   — better."

  — Acreage owner       — Homeowner          — Family steward
    Bragg Creek           Bearspaw             Rocky View

[ Each card: hairline border, p-9, italic serif quote, small Inter attribution ]
```

- All three quotes are marked `// TODO: replace with real client copy when collected.` — and visually identified by a tiny `data-status="placeholder"` so we can grep them later.
- A single line under the grid: *"More on the way as projects wrap."* (sets honest expectations).
- **File**: new `src/components/TestimonialSpine.tsx`, mounted in `src/pages/Index.tsx`.

### F. **Form — collapse "tell us about it" into one calm step**

The persona's *Quote Anxiety* and *Trust* fears live in the form. Today there are 5 fields visible. We restage:

Visible fields (in this order):
1. **Name**
2. **Best way to reach you** — single field, autodetect — accepts email *or* phone (regex-based union). One field, two intents. Microcopy: *"Email or phone — whichever you prefer."*
3. **What you're considering** — required `<textarea>` (3–4 lines). Replaces the projectType `<Select>`. Microcopy: *"A sentence is plenty."* This is the *single biggest cautious-lead unlock* — instead of forcing him to file his project under a category, he writes a note.

Optional, behind a single `<details>` summary "Add timing, budget, or location context →":
4. **Project type** (the existing `<Select>`)
5. **Budget range** (existing)
6. **Best time to walk the property** (existing)
7. **Property location** — new free-text input (`"Bragg Creek"`, `"acreage near Water Valley"`)

Submit button text stays "Request the Conversation". Subline stays "We reply within two business days. No obligation. No automated funnel."

- **Server-side**: the new `message` (textarea) and `location` (free text) get persisted alongside the existing `consultations` row. We add a Supabase migration:
  - `alter table public.consultations add column if not exists message text;`
  - `alter table public.consultations add column if not exists location text;`
  - Keep RLS policies as-is (insert-only from anon role, restricted shape).
  - Update the existing CHECK constraint on `project_type` so it remains required at the DB level only when the form actually sends it (it remains nullable; the textarea is the new source of truth).
  - In TypeScript: `consultationSchema` adds `message: z.string().trim().min(1).max(2000)` and `location: z.string().trim().max(200).optional()`. `projectType` becomes `.optional()` to match the DB and the new UI.
- **File**: `src/components/ConsultationForm.tsx` (full field reorder + `<details>` group), `src/lib/validation/consultation.ts` (new shape), one new migration in `supabase/migrations/` adding the two columns.

### G. **Contact page — clean the dead props, tighten the visual**

- Remove `eyebrowNumeral="·"` and `coordMark="..."` from the `<SubPageHero>` invocation.
- Remove all `numeral="I" / "II" / "III"` props from `<Eyebrow>` invocations on this page.
- Replace `tone="evergreen"` and `bezel-shell-closing` on `<PremiumCard>` with a plain `surface-card` wrapper to match the home page's final CTA card.
- Replace the four-step `numeral-mark` ladder with the new home-page `numeral-disc` pattern for visual rhyme.
- The "OR REACH US DIRECTLY" hairline list is already strong — no change needed beyond removing the deprecated `numeral` prop on its eyebrow.
- **File**: `src/pages/Contact.tsx`.

### H. **Sub-page heroes — finish the prop cleanup**

`SubPageHero` currently keeps `eyebrowNumeral` and `coordMark` as `@deprecated` no-op props. Remove them entirely, plus every consumer that still passes them. The TypeScript compiler will tell us if we miss one.

- **Files**: `src/components/SubPageHero.tsx`, plus `src/pages/About.tsx`, `Work.tsx`, `Services.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ServiceAreas.tsx`, `ThankYou.tsx`, `NotFound.tsx`, and the four `src/pages/areas/*.tsx` files.

### I. **Footer — add the response-time promise + restage the right column**

Today the right column says *"Reach out and we'll respond within two business days."* and then has a "Request a Consultation" link. Tighten:

```
Contact
─────────
hello@havencreekrenovations.ca
(403) 555-0100

Reply within 2 business days, Mon–Fri.

[ Request a Consultation → ]
```

- Same minimalist three-column layout, same fonts. One added line, one cleaner hierarchy.
- **File**: `src/components/Footer.tsx`.

### J. **CSS — three small additions, zero new ornament**

Add to `src/index.css`:

```css
@layer components {
  /* Sticky bottom CTA — single conversion handle when scrolling */
  .sticky-cta-bar {
    @apply fixed inset-x-3 bottom-3 z-40
           flex items-center justify-between gap-4
           rounded-full pl-5 pr-1.5 py-1.5
           bg-background/80 backdrop-blur-xl
           ring-1 ring-foreground/10;
    box-shadow: var(--shadow-haptic);
    /* Center on lg+ */
    max-width: min(720px, calc(100vw - 1.5rem));
    margin-inline: auto;
    transform: translateY(calc(100% + 1rem));
    opacity: 0;
    transition:
      transform 600ms var(--ease-weighted),
      opacity 600ms var(--ease-weighted);
  }
  .sticky-cta-bar[data-show="true"] { transform: translateY(0); opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .sticky-cta-bar { transition: none; }
  }

  /* Mid-page conversion bridge — used after the fear ledger */
  .conversion-bridge {
    @apply mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6
           max-w-[68ch] py-10 px-6 my-6
           border-y border-evergreen/15;
  }

  /* Photo-pending placeholder card */
  .photo-pending {
    @apply relative aspect-[4/3] overflow-hidden
           bg-card text-foreground/65
           flex flex-col items-center justify-center gap-4 px-6 text-center;
    background-image:
      linear-gradient(180deg, hsl(var(--card)) 0%, hsl(36 18% 92%) 100%);
  }
  .photo-pending::after {
    content: "";
    @apply absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-multiply;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }

  /* Testimonial spine — quiet attributed quotes */
  .testimonial-card {
    @apply h-full p-9 lg:p-10
           border border-border/70 rounded-[var(--r-shell)]
           bg-card/60;
    box-shadow: var(--shadow-soft);
  }
  .testimonial-card blockquote {
    @apply font-serif italic font-light text-foreground/90 text-[1.15rem] leading-snug;
    text-wrap: balance;
  }
}
```

- No new colors, no new animations, no new fonts.
- All four utilities respect the existing token system.

### K. **App-level wiring**

- `src/App.tsx`: mount `<StickyConsultBar />` once at the route layer, after `<Routes>`. It self-hides on `/contact` and `/thank-you` via `useLocation()`.
- `src/main.tsx` is unchanged.
- No new dependencies.

---

## Files this loop will touch

1. **`src/components/Hero.tsx`** — restage right column to "What this means in practice" + new H1 (verbatim persona hook) + new subhead.
2. **`src/components/StickyConsultBar.tsx`** — new component (sticky-glass island, IntersectionObserver, dismiss).
3. **`src/components/TestimonialSpine.tsx`** — new component (3 attributed quotes, marked TODO).
4. **`src/components/gallery/ProjectPlaceholder.tsx`** — new typographic placeholder card.
5. **`src/components/ProjectVignette.tsx`** — add `console.warn`; mark deprecated in JSDoc; no behavior change.
6. **`src/components/SubPageHero.tsx`** — remove `eyebrowNumeral` and `coordMark` props entirely.
7. **`src/components/Footer.tsx`** — restage right column with phone + email + response-window line.
8. **`src/components/ConsultationForm.tsx`** — field reorder, new `message` textarea, optional `<details>` group, accept email-or-phone in one field, copy unchanged.
9. **`src/lib/validation/consultation.ts`** — schema: `message` required string, `location` optional, `projectType` optional, `contactValue` accepts email-or-phone.
10. **`src/pages/Index.tsx`** — insert mid-page conversion bridge after fear ledger; mount `<TestimonialSpine />` between § V and § VI; swap `<ProjectVignette>` for `<ProjectPlaceholder>` in work preview.
11. **`src/pages/Work.tsx`** — swap `<ProjectVignette>` for `<ProjectPlaceholder>`; remove deprecated `SubPageHero` props.
12. **`src/components/gallery/SelectedWorks.tsx`** — replace internal SVG plates with the new placeholder cards.
13. **`src/pages/Contact.tsx`** — strip retired `eyebrowNumeral`, `coordMark`, all `numeral="…"` props on `<Eyebrow>`, replace `tone="evergreen"` `bezel-shell-closing` with `surface-card`; rebuild "What happens next" ladder with `numeral-disc`.
14. **`src/pages/About.tsx`, `Services.tsx`, `Decking.tsx`, `InteriorFinishing.tsx`, `ExteriorFinishing.tsx`, `ServiceAreas.tsx`, `ThankYou.tsx`, `NotFound.tsx`, `pages/areas/*.tsx` (×4)** — strip removed `SubPageHero` props.
15. **`src/App.tsx`** — mount `<StickyConsultBar />`.
16. **`src/index.css`** — add `.sticky-cta-bar`, `.conversion-bridge`, `.photo-pending`, `.testimonial-card` utilities.
17. **`supabase/migrations/<timestamp>_consultations_message_location.sql`** — add `message text` and `location text` columns to `public.consultations`. RLS unchanged.

No new images. No new dependencies. No new fonts. The conversion goal is reachable from **every viewport** of the home page after this loop:

- **Viewport 1** — Hero CTA + right-column promise list.
- **Viewport 2** — Sticky bar appears.
- **Viewport 3** — Mid-page conversion bridge after the fear ledger.
- **Viewport 4** — Approach section's "Start that conversation" line.
- **Viewport 5+** — Sticky bar persists.
- **Viewport 8** — Final CTA. Sticky bar fades out so the inline form is the only invitation.

---

## Verification

- `bun run build` — TypeScript clean (the deprecated-prop removal will surface every consumer; we'll fix each).
- Sticky bar appears below the fold, dismisses, and respects `prefers-reduced-motion` (no transition).
- Mid-page bridge renders centered, hairline above + below.
- Hero right column reads as a four-line behavioral promise; H1 reads exactly *"One trusted contractor for the property you value."*
- Form: textarea is required; email-or-phone single field; the optional `<details>` opens cleanly with keyboard (`Space` and `Enter`); honeypot still drops bot submissions silently.
- Supabase: `message` and `location` arrive in the row when present; existing rows unaffected.
- Gallery: every project card carries `data-photo-status="pending"` for a future swap.
- Three testimonial quotes visible on home, all marked TODO in code.

---

## What this *intentionally* does not do

- **No real photography.** Out of scope until we collect it. The placeholder cards are honest about their state.
- **No analytics events** for the sticky bar yet. Will add in the measurement loop.
- **No A/B test scaffolding.** This is the foundation; the next loop will instrument it.
- **No new pages.** The IA stays as-is — the page count is already correct for Sam.

The next loop after this one will be **photography + real client copy + a "What we don't do" honesty page** — once content exists, we plug it in against the structure we set down here. There is always more to upgrade.