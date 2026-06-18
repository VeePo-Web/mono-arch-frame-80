## Objective
Transform Cory's headshot from a tiny, unstyled square thumbnail into a prominent, world-class sidebar portrait that feels intentional and premium on both desktop and mobile.

## Current Problems
- Forced `aspect-square` crop on a 480×640 portrait photo cuts off the subject
- `w-32 md:w-40` is too small to register as a signature element
- No border radius, no shadow, no frame — reads as unfinished raw markup
- Left-aligned tiny block on mobile looks like a UI chip, not a personal photo

## Changes

### 1. Restore natural portrait ratio
- Remove `aspect-square` and `object-cover`
- Add `aspect-[3/4]` so the full portrait is visible without cropping

### 2. Increase size dramatically
- Mobile: `w-44` (176 px) — centered, not left-aligned
- Tablet: `w-56` (224 px)
- Desktop (`lg+`): `w-full` so the portrait fills the `lg:col-span-3` sidebar column (≈280–300 px)

### 3. Apply editorial frame treatment
- Add `rounded-sm` for subtle corner radius consistent with site photo grammar
- Add `hero-plate` class for the Apple-soft drop shadow + 1 px hairline border
- Remove the plain `block` display in favor of `mx-auto lg:mx-0` so it centers on mobile and left-aligns on desktop

### 4. Adjust spacing and layout
- Increase bottom margin from `mb-6` to `mb-8` to give the image breathing room against the "A note from Cory" eyebrow
- Keep the existing `data-reveal` animation and stagger timing intact

### 5. Mobile polish
- Center the image column on mobile with `mx-auto` so it feels like a deliberate signature block above the letter, not a forgotten left-rail thumbnail
- Maintain left alignment on `lg+` to preserve the editorial sidebar rhythm

## Technical Details
- **File**: `src/pages/About.tsx` — the `<img>` inside the "How we work" section left rail
- **Classes to update**: swap the existing className string for the new treatment
- **No new dependencies** — reuses existing `hero-plate` utility and design tokens
- **Image quality**: source is 480 px wide; displayed at ≤300 px on desktop, so it downscales cleanly with no blur

## Outcome
A framed, properly proportioned portrait that sits confidently in the sidebar, casts a soft editorial shadow, and scales gracefully from a centered mobile feature to a anchored desktop signature element.