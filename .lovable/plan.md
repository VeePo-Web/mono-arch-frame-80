# Trust-first finishing pass — wire the remaining pieces

## Why this exists
The previous loop created `StickyConsultBar`, `TestimonialSpine`, and `ProjectPlaceholder` but did not finish wiring them into the home page, and three CSS utilities they depend on (`.sticky-cta-bar`, `.testimonial-card`, `.photo-pending`) are still missing from `src/index.css` — the components currently render unstyled. The Selected Works gallery also still uses synthetic line-drawings, which Sam's persona doc explicitly flags as a trust risk ("photographs are the trust asset; synthetic illustrations read as stand-ins").

This pass closes those loops so every conversion trigger fires correctly and the gallery tells the truth.

## What changes (filtered through the three values)

### 1 — Elevate the human experience
Add a calm reassurance moment between the long "Fear Ledger" and the services grid: three attributed client quotes that show what working with Haven Creek *feels* like. Sam's persona says testimonials are required trust evidence, and right now the home page never offers a single voice that isn't ours.

### 2 — Embody brand truth with excellence
Replace the synthetic `ProjectVignette` line-drawings on the home gallery with `ProjectPlaceholder` cards that say *"Photograph in progress"* and carry `data-photo-status="pending"`. This admits what's true (the photo isn't here yet) instead of dressing the gap with decorative SVG — exactly the dealbreaker Sam's persona warns against.

### 3 — Innovate responsibly for impact
Insert a single mid-page **conversion bridge** between the Fear Ledger and the Services preview. One line of italic Fraunces, one inline `cta-anchor` button. It catches readers who answered their objection in the ledger and are ready *now*, without waiting for the final CTA. No popups, no scarcity language.

---

## File-by-file work

### A. `src/index.css` — add the three missing utilities
Append a new `@layer components` block (just after the existing `.cta-anchor` definition, ~line 557) with:

1. **`.sticky-cta-bar`** — fixed-bottom glass pill (right-aligned on desktop, full-width strip on mobile). Background: `hsl(var(--background) / 0.92)` with `backdrop-filter: blur(12px) saturate(140%)`. 1px hairline top border in `hsl(var(--evergreen) / 0.12)`. Soft elegant shadow on top edge. Reveals via `transform: translateY(0)` + `opacity: 1` when `[data-show="true"]`; hidden state is `translateY(110%)` + `opacity: 0`. Transition: 600ms `var(--ease-swift)`. Inside `@media (prefers-reduced-motion: reduce)`, drop the transform — only fade.
2. **`.testimonial-card`** — `padding: 2rem 2rem 1.75rem`, 1px border `hsl(var(--evergreen) / 0.12)`, `border-radius: var(--r-shell)`, `background: hsl(var(--card))`, soft `--shadow-card`. Inner `blockquote` styled as Fraunces italic 300, `font-size: 1.15rem`, `line-height: 1.55`, `text-wrap: balance`, color `hsl(var(--foreground) / 0.9)`. `[data-status="placeholder"]::after` paints a tiny dotted-corner glyph in `hsl(var(--evergreen) / 0.35)` so internal review can tell real-vs-pending at a glance — invisible to general readers.
3. **`.photo-pending`** — `aspect-ratio: 4/3`, `position: relative`, `padding: 2rem`, flex-column with `justify-content: space-between`. Background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)`. Subtle `::before` overlay with the same off-axis hairline pattern used elsewhere (`background-image: repeating-linear-gradient(135deg, transparent 0 11px, hsl(var(--evergreen) / 0.04) 11px 12px)`) at 40% opacity. No drop-shadow — these read as quiet paper plates, not luxury imagery.

### B. `src/pages/Index.tsx` — three insertions
1. **Import the new pieces** at the top:
   ```ts
   import TestimonialSpine from "@/components/TestimonialSpine";
   import ProjectPlaceholder from "@/components/gallery/ProjectPlaceholder";
   ```
2. **Mid-page conversion bridge** — directly after the closing `</RevealSection>` of the Fear Ledger (`#trust-promise`, ~line 171) and before the Services Preview section opens. Markup:
   ```tsx
   <RevealSection aria-label="Quick consultation invitation" className="py-14 md:py-20">
     <Container size="wide">
       <div className="conversion-bridge flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-10 py-10 md:py-12 border-y border-evergreen/15">
         <p className="font-serif italic font-light text-foreground/85 text-[1.35rem] md:text-[1.55rem] leading-snug max-w-[36ch]">
           Already nodding? Let's start a quiet conversation.
         </p>
         <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 shrink-0">
           <Link to="/contact" className="cta-anchor group/btn">…Request a Consultation…</Link>
           <p className="trust-microcopy"><span>2-business-day reply</span><span>No obligation</span></p>
         </div>
       </div>
     </Container>
   </RevealSection>
   ```
   The `border-y` hairline + `py-14` makes this read as a deliberate pause — not a banner, not an interruption.
3. **Mount the TestimonialSpine** between the Trust Panel (`#trust-panel-heading`) and the Service Areas Roster (`#areas`), ~around line 426. No code changes needed inside the component; it already renders its own `<RevealSection>` and `<Container>`.
4. **Swap the home gallery cards** in the existing § IV "Project Gallery Preview" block (~lines 335–367). Replace the inner `<PremiumCard>` markup that currently renders `<ProjectVignette …/>` with `<ProjectPlaceholder project={p} index={i} />`. Keep the surrounding `<article>`, the reveal stagger, and the caption block (`p.category · p.area`, title, scope). The placeholder replaces *only* the image slot.

### C. Home gallery copy adjustment
Add one line of supportive prose under the section's existing intro paragraph so visitors understand why they're not seeing photos: small Inter italic, `text-muted-foreground`, *"Photographs are added as projects close. Until then, the work speaks through the case notes."* Placed in the right column of the section header grid (`lg:col-span-5 lg:pt-8`). Keeps the editorial restraint while removing any "is this site finished?" doubt.

### D. Final CTA touch-up
The current "Tell us about the project." sub-heading reads slightly transactional. Soften it to *"Tell us what you're considering."* — matches the `What you're considering` field label inside the form and sets the same low-pressure tone as the persona doc's "quiet conversation" promise. Single string change in `Index.tsx` ~line 591.

### E. Verification (last step)
1. `bun run build` — confirm clean compile and that the Suspense-lazy `ConsultationForm` chunk still splits.
2. Spot-check mounted DOM order in `Index.tsx` is: Hero → Fear Ledger → **Conversion Bridge** → Services Preview → Approach → Project Gallery (now using placeholders) → Selected Works → Trust Panel → **TestimonialSpine** → Service Areas → Final CTA.
3. Confirm `.sticky-cta-bar`, `.testimonial-card`, and `.photo-pending` all resolve to real CSS via a quick grep in `src/index.css`.

## What stays put
- No schema or RLS changes. The migration from the previous loop already covers `message` and `location`.
- No new images or assets. Placeholders are pure CSS + type — no requests, no LCP risk.
- No changes to `ConsultationForm.tsx`, `Hero.tsx`, `Navigation.tsx`, or any sub-page. The fixes are tightly scoped to the home page and one CSS append.

## Outcome
Five distinct conversion triggers across the home page (Hero CTA · Fear Ledger CTA · **new mid-page bridge** · Approach CTA · Final CTA), plus the persistent sticky bar after the hero. The gallery now tells the truth instead of decorating the gap. Three social-proof voices land between the company-voice trust panel and the area roster — exactly where Sam's persona says trust must be earned before the next action.