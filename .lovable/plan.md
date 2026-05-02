## Three-Step Questionnaire — Progress Bar, One Question Per Screen

Convert ConsultationForm from a single 3-field card into a 3-step micro-flow. Same 3 inputs, same submit payload, same success state — just paced one-at-a-time with a slim progress bar and big tap targets.

### What the user sees

```text
┌─────────────────────────────────────────┐
│ ━━━━━━━━━━━━──────────────  Step 1 of 3 │  ← slim 2px rail, evergreen fill
│                                         │
│  Name                                   │  ← single FormLabel, no eyebrow
│  [ Jane Doe                          ]  │  ← h-14 input, larger than current
│                                         │
│                              ( Next → ) │  ← evergreen pill, right-aligned
│                                  ‹ back │  ← ghost link, hidden on step 1
└─────────────────────────────────────────┘
```

Step 2 = Email or phone. Step 3 = About your project (textarea, button reads "Send"). Submit only fires on step 3.

### Files to change

**1. `src/components/ConsultationForm.tsx` — full rebuild of the form body, success path untouched**

State additions:
- `const [step, setStep] = useState<0 | 1 | 2>(0)` — 0-indexed, three steps total
- Track which fields belong to which step: `STEP_FIELDS = [["name"], ["contact"], ["message"]] as const`

Validation flow:
- `goNext()` → `await form.trigger(STEP_FIELDS[step])`. If valid, `setStep(step + 1)` and focus the next step's input on the next paint (use a `useEffect` keyed on `step` + a `ref` map).
- `goBack()` → `setStep(step - 1)`, no validation, preserves entered values (react-hook-form already does this).
- Step 3's "Send" button calls the existing `form.handleSubmit(onSubmit)` — same payload, same redirect-vs-inline behaviour.

Render structure (replaces current lines ~210–323):
```tsx
<form onSubmit={form.handleSubmit(onSubmit)} aria-busy={isSubmitting} noValidate>
  {/* honeypot — unchanged */}

  {/* Progress rail */}
  <div className="mb-7">
    <div className="h-[2px] w-full bg-evergreen/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-evergreen transition-[width] duration-500 ease-swift"
        style={{ width: `${((step + 1) / 3) * 100}%` }}
      />
    </div>
    <div className="mt-2 flex items-baseline justify-between">
      <span className="text-minimal text-foreground/60 tabular-nums">
        Step {step + 1} of 3
      </span>
      {projectLabel && step === 2 && (
        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-evergreen/80">
          Re: {projectLabel}
        </span>
      )}
    </div>
  </div>

  {/* Single field per step — only the active step's FormField renders */}
  <div key={step} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
    {step === 0 && <NameField />}
    {step === 1 && <ContactField />}
    {step === 2 && <MessageField />}
  </div>

  {/* Action row */}
  <div className="mt-7 flex items-center justify-between gap-3">
    {step > 0 ? (
      <button type="button" onClick={goBack} className="text-minimal text-foreground/65 hover:text-evergreen transition-colors">
        ‹ Back
      </button>
    ) : <span aria-hidden />}

    {step < 2 ? (
      <button
        type="button"
        onClick={goNext}
        className="cta-spring bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 min-h-[52px] inline-flex items-center gap-3"
      >
        <span>Next</span>
        <span className="icon-chip icon-chip-light bg-background/15">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </button>
    ) : (
      <button type="submit" disabled={isSubmitting} className="… same evergreen pill as today …">
        <span>{isSubmitting ? "Sending…" : "Send"}</span>
        <span className="icon-chip …"><ArrowUpRight … /></span>
      </button>
    )}
  </div>

  <p id={RESPONSE_NOTE_ID} className="mt-3 text-minimal text-muted-foreground">
    Reply within two business days.
  </p>
</form>
```

Inputs themselves stay nearly identical to today — same `Input`/`Textarea` shadcn primitives, same `enterKeyHint` (set to `"next"` on steps 1–2 and `"send"` on step 3 — pressing Enter on the keyboard advances, matching the on-screen Next button). Pressing Enter inside the textarea inserts a newline (unchanged); user must tap Send.

Field-level shifts:
- Bump input height from `h-11` → `h-14` (per-step layouts have room; bigger tap targets)
- Drop the `border-b border-evergreen/10` field separators — there's only one field per screen, no separator needed
- Textarea `rows={4}` → `rows={5}` (uses the breathing room from removed sibling fields)

Step-1 helper text: none. Step 2 helper line below contact field: `"We'll only use this to reply."` (subtle reassurance; replaces the old placeholder-only convention now that the field stands alone). Step 3: no helper — placeholder carries it.

Auto-focus: a `useEffect(() => activeRef.current?.focus(), [step])` so each new step lands cursor in the input. On step changes use `requestAnimationFrame` to wait one frame for the slide-in.

The `onSubmit` insert payload, redirect-to-`/thank-you`, inline success state, honeypot, and `projectType` URL auto-fill all stay identical.

**2. Validation (`src/lib/validation/consultation.ts`)** — no schema change. The same zod schema validates the whole form on final submit; `form.trigger(["name"])` etc. handles per-step validation by reusing field-level rules.

**3. `src/components/QuickContactSheet.tsx`** — leave the bottom-sheet's micro-form as a single screen. The sheet is already a 3-tap escape hatch (call · email · 3-field note); turning it into a wizard inside an 88vh sheet would feel cramped. The Sheet is the "speed mode," the main form is the "guided mode." This split actually clarifies their roles.

**4. Memory** — extend `mem://constraint/three-field-lead-form` to record: "ConsultationForm is a 3-step wizard with progress bar (slim 2px evergreen fill, 'Step N of 3' label). Each step shows exactly one field. QuickContactSheet stays single-screen — it's the express lane."

### What's preserved
- All 3 inputs, exact validation rules, full submit payload, RLS contract.
- Re: {projectType} chip — surfaces on Step 3 only (where the project context is relevant).
- Inline success state, redirect-to-/thank-you, honeypot, phone-OR-email detection.
- ConsultationForm's existing API (`source`, `initialProjectType`, `successMode`, `className`) — Index.tsx and Contact.tsx need no changes.
- QuickContactSheet stays the fast escape hatch.

### What's added
- 3 micro-steps (one field each) with auto-focus on advance.
- Slim 2px progress rail + "Step N of 3" tabular-nums counter.
- Back affordance (ghost link, hidden on step 1).
- Bigger inputs (h-14) and a one-line reassurance under the contact step.

### What's removed
- The stacked 3-field layout in ConsultationForm.
- The field-divider hairlines (no longer needed in single-field views).

### Out of scope (deliberately)
- Re-introducing project type / budget / timing as chip questions. The previous pass deleted those for good reason; this wizard preserves that decision.
- Animating between steps with anything heavier than the existing `animate-in fade-in slide-in-from-bottom-1 duration-300` Tailwind utilities. No framer-motion, no layout thrash.
