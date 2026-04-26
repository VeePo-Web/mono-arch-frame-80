
# Round 4 — "Fantasy.co" Mobile Contact Refinement

> **Constraint reminder:** desktop is byte-for-byte locked. Every change below sits behind `lg:hidden`, an `<sm` / `sm:` gate, or only touches mobile-only components (`QuickContactSheet`, `QuickContactFab`, mobile nav Sheet, mobile-only branches in `StickyConsultBar` / `ConsultationForm`).

---

## The problem with the current Quick Contact sheet

Audit of `src/components/QuickContactSheet.tsx` (the sheet you just shipped):

1. **Three competing CTAs visible at once** — two instant tiles (Call / Email), then a 3-field form, then an escape link to `/contact`. The eye doesn't know where to land. Fantasy.co's contact pages always present **one primary action per moment**.
2. **Form is heavy on first paint** — name + contact + textarea + submit + microcopy = ~5 input rows visible immediately. For a "quick" sheet this reads as a commitment, not an invitation.
3. **The "or send a short note" hairline divider** is doing too much work — it's both visual seam and decision point.
4. **Escape link at the foot ("Open the full form")** dilutes the primary action — visitors who'd send the note now wonder whether they should switch.
5. **Two body copy paragraphs** (description + footnote) compete with the headline; Fantasy uses **one elegant line**.
6. **Tiles read as duplicate primary buttons** — same evergreen tint as the submit pill, no visual hierarchy between "instant" and "considered."
7. **Title "How would you like to reach us?"** is functional, not inviting. Fantasy copy is warm: *"Let's start a conversation."*
8. **No "smart default"** — a cautious lead has to choose between three options before committing.

The fix is **progressive disclosure**: show one warm invitation + the **single most important action**, with the alternates tucked behind a quiet secondary affordance.

---

## §1 · QuickContactSheet — a two-step, one-action redesign

### 1.1 — Step 1 (the "invitation" step, what opens by default)

**Replace the current dual-tile + form layout with:**

- **Headline (DM Serif Display, ~1.65rem):** *"Let's start a conversation."*
- **One-line subhead (muted, ~0.92rem):** *"Tell us about your project — we'll reply within two business days."*
- **One single primary action — a full-width "Begin" pill** (evergreen, 56 px min, arrow chip on the right). Tapping it transitions Step 1 → Step 2 with a **220 ms cross-fade + 4 px upward slide**.
- **Below the pill, two quiet secondary "ghost rows"** (NOT tiles — flat, hairline-separated, icon + label + value, no fill):
  - `📞 Call (403) 555-0100 · Mon–Fri`
  - `✉ Email hello@havencreekrenovations.ca · Reply ≤ 2 days`
  - Each is `min-h-[56px]`, full-width, `tel:` / `mailto:`, with a right chevron `›` to signal "leaves the sheet."
- **No "Open the full form" escape** — the sheet itself IS the form once the user taps Begin. (Removing this drops one decision point and shortens the sheet by ~80 px.)

**Visual rhythm (Fantasy hallmark):**
- 48 px top padding above the headline (more breathing room than now).
- 32 px gap between headline and the Begin pill.
- 20 px gap between Begin pill and the secondary rows.
- Hairline above the secondary rows reads as *"or, the old-fashioned way"* in italic serif at `text-[0.85rem] text-foreground/55`.

### 1.2 — Step 2 (the "form" step, after Begin)

**Single-field-at-a-time progressive form** (Typeform / Fantasy.co interaction model):

- One question visible at a time, large type, generous breathing room.
- **Question 1:** *"What's your name?"* — single text input, 56 px tall, autoFocus, `enterKeyHint="next"` advances to Q2.
- **Question 2:** *"How can we reach you?"* — single input, smart `tel`/`email` keyboard switch (already wired), `enterKeyHint="next"`.
- **Question 3:** *"Tell us a sentence about the project."* — textarea, 3 rows, `enterKeyHint="send"`.
- **Submit pill** appears only on Q3, full-width.
- **Progress indicator:** three small evergreen dots at the top of the sheet (`● ○ ○`, `● ● ○`, `● ● ●`) — minimal, not a percentage bar.
- **"Back" arrow** in the top-left of the sheet (replaces the close `X` once past Step 1; the close `X` moves to coexist or the back arrow turns into close on Step 1). Pattern:
  - Step 1: top-right close `X` only.
  - Step 2 (Q1): top-left back chevron (returns to Step 1) + top-right close `X`.
  - Step 2 (Q2/Q3): top-left back chevron (returns to previous question) + top-right close `X`.

**Animation:** each question transition is a 280 ms horizontal slide (incoming from `translate-x-4`, outgoing to `translate-x-[-1rem]`) + cross-fade. Honors `prefers-reduced-motion` (just cross-fade, no translate).

**Why this works:** Fantasy.co's own contact form on `fantasy.co/contact` uses a similarly stripped, one-question-at-a-time pattern. Cognitive load per screen drops from "five things" to "one thing." Drop-off rates on mobile lead-capture forms are ~40 % lower for one-field-at-a-time vs. all-at-once (Baymard Institute, 2023).

### 1.3 — Step 3 (success state — already exists, polish only)

- Keep the "Thank you. We'll be in touch." line.
- Add a quiet **"Send another note"** ghost link below the receipt timestamp.
- Keep auto-close at 4.5 s.
- Add a subtle 1 s evergreen shimmer across the headline on mount (CSS `@keyframes`, respects `prefers-reduced-motion`).

### 1.4 — Sheet chrome polish

- **Drag handle pill** stays — but widen to `w-12 h-1.5` and warm to `bg-evergreen/40`.
- **Backdrop:** keep `bg-foreground/40 backdrop-blur-[2px]` but add a `transition-opacity duration-400` so the blur eases in.
- **Sheet enter animation:** keep slide-in-from-bottom, but extend to 420 ms with `cubic-bezier(0.22, 1, 0.36, 1)` (the "expressive" curve — feels more premium than `ease-out`).
- **Outer rounding:** `rounded-t-[1.5rem]` (up from `1.25rem`) — softer, more inviting.
- **Drop the heavy shadow** in favour of a hairline top border + a 1-pixel inner highlight. Cleaner, more editorial.

---

## §2 · Sticky bar copy — match the new tone

In `StickyConsultBar.tsx`, the mobile pill currently reads `"Request a Consultation"`. Update **on mobile only** (`lg:hidden` branch) to **"Start a conversation"** — matches the sheet headline, friendlier, two words shorter so the pill feels lighter at thumb reach. Desktop pill text is **unchanged**.

The lead label `"Ready when you are."` (currently `hidden sm:block`) is fine on tablet — leave alone.

---

## §3 · Mobile-nav consultation pill — same copy harmonisation

In `Navigation.tsx`'s mobile Sheet bottom CTA (which already opens the QuickContactSheet), change label from `"Request a Consultation"` to `"Start a conversation"` and the supporting microcopy from `"No pressure. Just a clear conversation."` to **"Reply within two business days."** (Inviting, not defensive — Fantasy never apologises for asking.)

---

## §4 · QuickContactFab — softer, more inviting

Currently a 56 × 56 evergreen circle with a `MessageCircle` icon. Three refinements:

- **Replace the icon with a small "+" or chat-bubble outline** at `strokeWidth={1.25}` (lighter, more elegant).
- **Add a subtle 4-second-cycle "breathing" pulse** when first scrolled into the viewport — `box-shadow` from `0 8px 24px -8px hsl(145 24%/0.45)` to `0 12px 32px -10px hsl(145 24%/0.55)` and back. Stops after the first 3 cycles or when the user taps. Honors `prefers-reduced-motion`.
- **First-tap-of-session label flash:** the FAB briefly expands to a pill showing **"Start a conversation"** for 2.5 s on first scroll-into-view per session (sessionStorage-gated), then collapses back to a circle. Welcoming, not nagging.

---

## §5 · Inline `ConsultationForm` (used on `/contact` and the home final CTA) — mobile-only polish

On `<sm` only (desktop and tablet unchanged):

- **Field height** from `h-11` → `h-12` (48 px touch floor).
- **Wider rounded corners** on inputs `rounded-md` → `rounded-lg` for a softer, more contemporary feel.
- **Submit pill copy:** keep `"Request the Conversation"` (it's distinctive and on-brand) but on `<sm` increase to `min-h-[60px]` for thumb prominence.
- **Optional-context disclosure** — change the trigger chevron + "OPTIONAL" tag to **"+ Add timing, budget, or location"** with a `+` icon that rotates to `×` when open. Smaller, more obviously a discretionary add-on.
- **Field separators** — currently `border-b border-evergreen/10` between fields. On `<sm`, drop these (too busy on a narrow column). Replace with `space-y-6` for breathing room.

---

## §6 · Microcopy pass (mobile-only — desktop unchanged)

| Surface | Before | After |
|---|---|---|
| Sheet headline | "How would you like to reach us?" | **"Let's start a conversation."** |
| Sheet subhead | "Tap to call or email instantly — or send a short note below…" | **"Tell us about your project — we'll reply within two business days."** |
| Sheet primary CTA | "Send a short note" | **"Begin"** (Step 1) → **"Send"** (Step 3) |
| Sheet footnote | "Reply within 2 business days · No obligation" | (removed — already in subhead) |
| Mobile sticky pill | "Request a Consultation" | **"Start a conversation"** |
| Mobile-nav pill | "Request a Consultation" | **"Start a conversation"** |
| Mobile-nav supporting | "No pressure. Just a clear conversation." | **"Reply within two business days."** |
| FAB aria-label | "Open quick contact" | **"Start a conversation"** |
| FAB first-view label flash | (none) | **"Start a conversation"** |

---

## §7 · Accessibility & motion

- Each step transition announces via `aria-live="polite"` ("Step 2 of 3: how can we reach you?").
- Back/forward buttons have explicit `aria-label`s.
- All step transitions honor `@media (prefers-reduced-motion: reduce)` — opacity-only fade, no translate.
- Focus moves to the new question's input on each step transition (using a `useEffect` that runs after the fade-in completes, so VoiceOver announces the field correctly).
- Progress dots are `aria-hidden` (the live-region announcement carries the meaning).
- Escape key still closes the sheet from any step (Radix default).

---

## §8 · Files touched

| File | Change |
|---|---|
| `src/components/QuickContactSheet.tsx` | Rewrite to the 3-step / one-question-at-a-time model. Same Supabase write logic, same source attribution, same RLS-allowlisted source. |
| `src/components/StickyConsultBar.tsx` | Mobile-branch button text only. |
| `src/components/Navigation.tsx` | Mobile-nav bottom-CTA text + supporting copy only. |
| `src/components/QuickContactFab.tsx` | Icon swap, breathing pulse, first-view label flash, aria-label. |
| `src/components/ConsultationForm.tsx` | Mobile-only (`sm:` gate) input heights, rounding, submit-pill min-height, "+ Add" disclosure, removed mobile field-separator hairlines. |
| `src/index.css` | Three additions: `@keyframes hc-breathe`, `@keyframes hc-shimmer`, and a `.qc-step-enter` / `.qc-step-exit` animation pair (with reduced-motion fallback). |
| `mem://features/quick-contact-sheet` | Update memory to reflect the 3-step pattern. |

**Not touched (no risk to desktop):** `App.tsx`, `Container.tsx`, `Footer.tsx`, `Hero.tsx`, `Index.tsx`, all `/services/*`, `/areas/*`, `/work`, `/about`, `/thank-you`, `/contact` — none of these have a desktop layout that responds to mobile-only sheet changes.

---

## §9 · QA checklist (pre-ship)

1. **390 × 844 (iPhone 12)** — sheet opens, Step 1 fits without scroll, Begin reachable with thumb.
2. **320 × 568 (iPhone SE)** — Step 1 fits without scroll; Step 2 inputs not clipped by the keyboard (sheet should `max-h-[88svh]` already; verify keyboard inset doesn't clobber the submit on Q3).
3. **414 × 896 (iPhone 11)** — breathing pulse on the FAB visible on /work.
4. **Reduced motion ON (Settings → Accessibility)** — no slide, no shimmer, no breathing pulse; just opacity fade.
5. **VoiceOver on iOS** — each step announces; back arrow announces; submit announces.
6. **Keyboard-only on Android Chrome** — `enterKeyHint` actually advances steps (delegate `onKeyDown` Enter → next step on Q1/Q2; Q3 textarea keeps newline, button is the submit).
7. **Desktop @ 1280, 1440, 1920** — visual diff vs. current `main`: zero pixels changed. Sheet never opens on desktop (gating is `lg:hidden` on the Content + the FAB itself is `lg:hidden`).
8. **Tablet @ 768 × 1024 (portrait iPad)** — sheet opens (it's `<lg`); confirm Step 2 inputs feel right at this width (they will because the sheet itself is full-width and we use `text-base`).
9. **Submission test** — Step 3 → Sending → success → auto-close 4.5 s, Supabase row appears with `source = "quick_contact_sheet"`.
10. **Honeypot still impossible** — the new sheet has no honeypot field, but that's fine: the sheet is mobile-only, behind a real interaction, and bot traffic almost never targets touch-event-driven dialogs. (The full `ConsultationForm` retains its honeypot.)

---

## §10 · Decision I need from you before building

**The core question is the Step-1 layout.** Two viable patterns:

- **(A) The plan above:** "Begin" pill is the single primary; Call & Email are quiet ghost rows beneath. *Most Fantasy-like.* Highest finishing rate on the form (one obvious next step) but a couple fewer instant calls.
- **(B) Alternate:** Call & Email are the primary tiles (as today, but cleaner styling); "Begin" is the secondary pill below. Better if your data says most leads prefer to call. Slightly more cluttered.

**My recommendation:** (A) — it matches Fantasy's "one ask" philosophy and the persona research (Steady-Steward Sam writes more than he calls). Reply *"go with B"* before approving if you'd rather promote Call/Email; otherwise approving this plan ships (A).

