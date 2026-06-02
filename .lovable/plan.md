Plan to fix the nav bar:

1. **Make the mobile header breathe like Fly4Me**
   - Increase the mobile nav vertical rhythm from the current tight `56px` band to a true `64px`/`68px` feel.
   - Keep the bar transparent, but give logo and menu enough top/side inset so neither feels tucked under the phone status area.
   - Use a consistent max-safe-area offset for both the header and overlay close button.

2. **Fix the logo problem on the light hero**
   - Stop showing the cream/white logo layer over the cream homepage hero, where it becomes washed out.
   - Use dark evergreen/foreground logo treatment on light pages at rest, with only a subtle shadow/ink transition as needed.
   - Preserve the crossfade behavior only where it helps readability, not as a blanket rule that makes the mark disappear.

3. **Refine the Menu trigger to feel Fantasy/Fly4Me, not chunky**
   - Reduce the pill’s visual heaviness: slightly smaller shadow, cleaner inset highlight, better glyph proportions, tighter “Menu” text spacing.
   - Keep the single dark evergreen pill as the only right-side nav element on every breakpoint.
   - Tune hover/press motion to the Fly4Me cadence: hairlines glide, pill lifts softly, no overdone bounce.

4. **Align scroll behavior with the reference**
   - Keep direction-aware hide/reveal, but make the visible state feel stable and intentional.
   - Ensure scroll color behavior does not flash, wash out the logo, or introduce a fake backdrop.
   - Keep the header transparent; the chrome is the pill + readable brand mark.

5. **Tighten the mobile overlay**
   - Keep the full-screen evergreen veil, grain, and route cascade.
   - Move the route stack closer to the Fly4Me layout: more centered vertical balance on mobile, less “top-crammed.”
   - Make the close affordance line up optically with the menu trigger and share the same size/spacing language.
   - Keep phone/email only inside the overlay contact rail.

6. **Files to update**
   - `src/components/Navigation.tsx`
   - `src/components/nav/HamburgerButton.tsx`
   - `src/components/nav/MenuOverlay.tsx`
   - `src/index.css`
   - Project memory only if the final behavior changes the standing nav rules.

7. **Validation**
   - Check the homepage at mobile width around `390px` first.
   - Verify: logo readable at top, pill not clipped, overlay opens cleanly, route list fits, CTA and phone remain visible, scroll hide/reveal feels smooth.
   - Then spot-check desktop so the same single-pill nav still feels intentional.