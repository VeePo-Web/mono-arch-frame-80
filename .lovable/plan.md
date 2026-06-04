Lock `/contact` desktop to a single viewport — footer is unreachable. Audit a few small UX nits at the same time. Mobile untouched.

### 1. Lock the page (no scroll → no footer on desktop)
**`src/pages/Contact.tsx` desktop section**
- Swap `min-h-[calc(100svh-80px)]` → `h-[calc(100svh-80px)] overflow-hidden` so the section is exactly viewport-height.
- Add a `useEffect` that, when `matchMedia("(min-width: 1024px)")` matches on `/contact`, sets `document.documentElement.style.overflow = "hidden"` and clears on cleanup / on resize below `lg`. Mobile path stays scrollable. Footer still renders in the DOM (a11y + SEO), it just sits below the locked viewport and can't be reached.

### 2. Visual audit fixes (desktop panel only)
**`src/pages/Contact.tsx`**
- Right panel currently relies on `flex-1 justify-center` — add `min-h-0` on the body wrapper to guarantee it never pushes the panel taller than the locked section on shorter laptops (720px).
- Move the "Replies in 2 business days" eyebrow inside the same vertical-centered column as the form so the whole block centers as a unit (currently the eyebrow sits with `mb-6` above an auto-centered form, which slightly off-centers the visual mass).

**`src/components/ConsultationForm.tsx` (dark tone only)**
- Textarea: hide the resize handle in dark tone (`resize-none`) — drag handles read as raw HTML against the cinematic panel. Cream tone keeps `resize-y`.
- Submit button: button stays `w-full` in dark tone; that's already in. Confirm `flex` not `inline-flex` (already set) — no change.
- Project chip `Re: {label}` already uses `text-evergreen-foreground/70` in dark tone — no change.

**`src/components/contact/ContactBrandStack.tsx`**
- Cap mark height tighter so the cascade fits on 720px laptops without the phone link risking clip: `h-[40vh] max-h-[460px]` → `h-[34vh] max-h-[380px]`.
- Reduce inter-element spacing one notch on short viewports: `mt-10 mb-8` rule → `mt-8 mb-6`; phone `mt-10` → `mt-8`. Keeps the cascade airy on tall screens, prevents overflow on short ones.

### 3. Out of scope
- Mobile (`lg:hidden`) block, `.contact-sticky-cta`, SubPageHero, schema, submit logic, Footer component, Navigation.
- No new tokens, no new components, no copy changes beyond what's listed.

### Result
At `lg+` on `/contact`: page is a fixed, single-viewport split. No vertical scroll, footer not reachable. Brand cascade and form both visually centered with safe spacing down to 1280×720. Mobile behaviour unchanged.