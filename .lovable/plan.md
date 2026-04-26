## Round 4 — Mobile Contact UX Polish

**Constraint:** every change is gated `lg:hidden` or `@media (max-width: 1023px)`. Desktop renders byte-for-byte unchanged.

---

### 1. `QuickContactSheet.tsx` — quieter invite, faster path

**Problem today:** the invite step shows *four* stacked elements (eyebrow "Quick Contact" + headline + body + Begin pill), then a divider, then two ghost rows. Six discrete things on first reveal. Fantasy.co's signature is fewer, larger, calmer.

**Changes (mobile-only — this whole file is `lg:hidden`):**

- **Drop the "Quick Contact" eyebrow** on the invite step. The sheet itself *is* the eyebrow. This removes one item from the visual stack.
- **Soften the headline** from `text-[1.7rem]` to `clamp(1.55rem, 6.5vw, 1.85rem)` and let it breathe (`leading-[1.12]`).
- **Body copy compression:** "Tell us about your project — we'll reply within two business days." → "Tell us about the project. We reply within two business days." Period instead of em-dash; one less visual hop.
- **Single primary action stays "Begin"** (per your prior pick). Pill height stays 60px.
- **Italic seam refinement:** "or, the old-fashioned way" is charming but reads slightly fussy. Replace with simpler "or reach us directly" in the same italic serif. Keep the hairline rule.
- **Ghost rows:** drop the eyebrow caps ("CALL"/"EMAIL") inside each row — they duplicate the icon's meaning. Keep the icon, single line of value, chevron. Visual weight drops ~30%.
- **Swipe-to-dismiss:** add a `pointerdown`/`pointermove`/`pointerup` handler on the sheet root that tracks vertical drag from the top 80px (handle + top bar zone). >120px or >0.5 px/ms velocity → close. Provides the iOS-native gesture every visitor reaches for first.
- **Drag-handle pill:** make it the actual hit target for dismiss-on-tap (currently decorative). 28px tall hit zone, visually still 1.5px.
- **Keyboard step transitions:** today each step uses `key={step}` causing remount + 320ms `qc-step-in`. On the smallest phones the keyboard popping over the new field while it's still animating feels janky. Reduce step animation duration to 220ms and stagger the focus call to `260ms` so the keyboard rises *after* the slide settles.

### 2. `QuickContactSheet.tsx` — back/forward affordance refinement

**Problem today:** progress dots are centered, back arrow is left, close X is right — three independent affordances on one row. Cluttered for a "single field" screen.

**Changes:**
- Move progress dots to **directly under the question**, not in the top bar. They become a hairline-thin progress bar (3 segments, 2px tall, `bg-evergreen/15` → fill `bg-evergreen` for completed) above the question heading. This makes the top bar clean: only back-arrow (left) and close-X (right) on form steps.
- Add a hairline divider at sheet bottom edge while keyboard is open so the page edge doesn't feel cut off.

### 3. `QuickContactSheet.tsx` — message step polish

- Add a quiet character counter beneath the textarea: `{n}/2000` in `text-[0.7rem] text-muted-foreground/60 tabular-nums`, right-aligned. Only appears once user types ≥ 200 chars (no anxiety for short notes).
- Replace the trailing strip "Reply within 2 business days · No obligation" with a softer "No obligation. Reply within two business days." (single sentence, less admin-form feel).
- Submit pill copy: "Send" → "Send note" (Fantasy-tone — verb + noun feels intentional, not transactional).

### 4. `QuickContactSheet.tsx` — success step refinement

- Currently auto-closes after 4.5s. Some users want to read it. Reduce to 3.8s but add a tiny "Close" link beneath the body text so impatient users can dismiss instantly.
- Headline copy: "Thank you. We'll be in touch." → "Thank you. We'll be in touch shortly." (the *shortly* is the warmth multiplier; Fantasy-style copy lives in those small additions).

### 5. `QuickContactFab.tsx` — calmer presence

**Problem today:** 3-cycle 4s breathing pulse can feel insistent on a quiet editorial page. The session-flash pill ("Start a conversation") is good but appears once and never returns.

**Changes:**
- **Reduce breathing to 2 cycles** (8s total) and lower amplitude — the outer ring opacity drops from `0.10` to `0.07`.
- **Add a "after long idle" gentle re-flash:** if the user is on a FAB-eligible page for >45s and has scrolled >50% of the page without interacting with the FAB, do *one* additional 2.5s label flash. Capped at one per session via the existing `hc:fab:flashed-late` key.
- **Slightly larger FAB:** 56px → 60px for clearer thumb target on 360px-wide phones. Bottom offset bumped to `max(1.5rem, env(safe-area-inset-bottom)+1.25rem)` so it sits clear of the StickyConsultBar when both render.
- **Z-index audit:** FAB is `z-40`, sticky bar is `z-40`, sheet overlay is `z-50`. Today they can overlap visually on /work. Bump FAB to `z-30` so the sticky bar always wins, and offset FAB upward by `--sticky-bar-h` (a CSS variable the bar sets on `:root`) when sticky bar is mounted.

### 6. `StickyConsultBar.tsx` — copy + height harmony

- Mobile pill copy "Start a conversation" is good. Keep.
- Add `--sticky-bar-h: 64px` CSS var to `:root` while the bar is mounted (and clear it on unmount) so the FAB can offset against it.
- Body padding reservation: today we add `pb-[64px]` on mobile globally. That's right when the bar is visible; redundant when dismissed. Drive it from `--sticky-bar-h` so dismissal recovers the space.

### 7. `Navigation.tsx` mobile sheet — clearer thumb-zone CTA

- The bottom CTA pill works but the supporting micro-line ("Reply within two business days.") sits under the pill. Move it *above* the pill in italic serif `text-[0.85rem] text-foreground/65` — same pattern as Fantasy.co's nav drawer where the warmth is the lead-in, the action is the close.
- Add a hairline-quiet "Call studio" + "Email studio" pair *above* the divider, so the mobile nav also offers instant non-form contact. Two ghost rows, identical styling to the sheet's ghost rows for design-system consistency.

### 8. `index.css` — system-level polish

- Add `.qc-progress` styles (the new under-question hairline progress bar) with smooth-fill transitions.
- Add `.qc-fab[data-late-flash="true"]` modifier for the long-idle re-flash animation.
- Reduced-motion: progress bar fills instantly; FAB late-flash disabled.
- Add `:root { --sticky-bar-h: 0px; }` default and `[data-sticky-bar="visible"] { --sticky-bar-h: 64px; }` toggled by the bar.

### 9. Memory update

Refresh `mem://features/quick-contact-sheet` to reflect:
- Reduced visual weight on invite step
- New under-question progress bar location
- Swipe-to-dismiss gesture
- FAB late-flash + sticky-bar offset coordination

---

### What I am **not** changing this round
- Submission flow / Supabase shape — already correct.
- Desktop `/contact` page, hero, and inline form — locked.
- Brand tokens (cedar/evergreen/cream) — locked.
- Any non-mobile component file.

### Files touched
1. `src/components/QuickContactSheet.tsx` — invite refinement, swipe-to-dismiss, progress bar relocation, message + success polish
2. `src/components/QuickContactFab.tsx` — calmer pulse, late re-flash, sticky-bar offset
3. `src/components/StickyConsultBar.tsx` — `--sticky-bar-h` CSS var publishing
4. `src/components/Navigation.tsx` — bottom CTA reflow + ghost call/email rows
5. `src/index.css` — `.qc-progress`, late-flash keyframe, root sticky-bar-h var, reduced-motion overrides
6. `mem://features/quick-contact-sheet` — refresh

### Open question for you (one only)

**Swipe-to-dismiss scope (§ 1):**
- **(A) Recommended:** drag from the top ~80px (handle + top bar) only. Predictable, doesn't conflict with form scrolling.
- **(B) Anywhere on the sheet.** More iOS-native but conflicts with textarea scroll on the message step.

I'll proceed with **(A)** unless you say "swipe anywhere" before approving.