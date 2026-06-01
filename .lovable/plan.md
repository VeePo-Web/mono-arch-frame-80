# Execute the Nav & Menu Handoff

Implement the four changes the handoff committed to: one trigger at every breakpoint, full-viewport evergreen-deep menu overlay (same component desktop + mobile), two-line hamburger glyph with opposite-slide hover, and a brand-mark cream→foreground crossfade. Performance posture stays as-is (rAF scroll handler, `React.lazy` overlay, `prefetchRoute()` warming) and gets one additional tightening: warm the overlay chunk on first `requestIdleCallback`, not just on `pointerdown`.

This is a tone change for the whole site — the bar will read as "studio" instead of "small business." It's also a deliberate override of three existing memory rules; the index gets updated in the same pass.

## File changes

### 1. `src/components/Navigation.tsx` — one trigger, always

- Delete the `PRIMARY_ROUTES` map and the entire inline-routes block (lines ~165–193).
- Collapse the grid from `[auto_1fr_auto]` to `[auto_auto]` (`justify-between`) — brand left, right cluster right, nothing in the middle.
- Make the hamburger trigger visible at every breakpoint (remove the `md:hidden` wrapper on `HamburgerButton`).
- Rename local references: `drawerOpen` → `menuOpen`, `setDrawerOpen` → `setMenuOpen`, `openDrawer` → `openMenu`, `warmDrawer` → `warmMenu`. Swap the lazy import from `MenuDrawer` to `MenuOverlay`.
- Add a one-shot `requestIdleCallback` (with `setTimeout` fallback) inside the existing scroll-effect cleanup branch to prefetch the overlay chunk shortly after first paint — so the first tap is always warm.
- Update the logo's `style` to drive both `filter` (existing feather shadow) and a CSS-variable–backed opacity crossfade: when `navBg < 0.3` the wordmark gets a cream tint via `mix-blend-mode: difference` is *not* what we want — instead, swap to a two-layer approach: render the dark logo at full opacity and a cream-tinted overlay copy at `opacity: (1 - navBg)` so the brand reads cream over hero and foreground after scroll. Implementation: one `<picture>`/`<span>` wrapper with two stacked `<img>` elements, the top one masked by `filter: brightness(0) invert(1)` (turns the dark mark cream-white) and faded out as `--nav-progress` rises.
- Keep Quote CTA + phone exposed exactly as today — no change to either.

### 2. `src/components/nav/MenuOverlay.tsx` — new file (replaces MenuDrawer)

Build the Fly4Me-style veil, translated to Haven Creek's palette. Built on the same Radix `Dialog` primitives MenuDrawer used.

Structure:

```text
<Dialog.Root>
  <Dialog.Overlay class="menu-overlay__veil" />     // evergreen-deep, scales from top
  <Dialog.Content class="menu-overlay">
    <Dialog.Close class="menu-overlay__close" />     // icon-only X, top-right, mirrors hamburger
    <div class="menu-overlay__body">                 // 12-col grid at lg+, flex column at <lg
      <nav class="menu-overlay__nav">                // cols 1-9 — oversized link list, center-justified
        {5 routes — Home, About, Services, Work, Contact}
      </nav>
      <aside class="menu-overlay__rail">             // cols 10-12 / bottom on mobile — slim contact
        email + phone, fades in last
      </aside>
    </div>
  </Dialog.Content>
</Dialog.Root>
```

Behaviour:
- Veil: `bg-evergreen-deep`, `transform-origin: top`, scales from `scaleY(0)` to `scaleY(1)` over 520ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Each link row: oversized type (`clamp(2.5rem, 9vh, 5.75rem)`, `leading-[0.95]`, `tracking-[-0.03em]`), serif (`font-serif` token), `text-evergreen-foreground/85` resting → `text-evergreen-foreground` hover, hover translates the word `translate-x-3` over 500ms.
- Active route: 28×2px evergreen rule (`bg-evergreen-foreground/70`) sits to the left of the word with a 20px gap. Persistent on the active row; absent on the others (no hover-to-reveal — the rule is only for the active route).
- Per-row cascade: opacity 0 + 18px translateY + 6px blur → resolved, 900ms each, staggered 90ms apart starting 360ms after open. Implemented in CSS via `.menu-overlay__row:nth-child(N)` keyframe delays so React doesn't drive timing.
- Contact rail: small uppercase eyebrow (`Contact`) above two link rows (`hello@havencreek.ca`, `403 970-7691`), fades in at 720ms.
- Close affordance: one icon-only X top-right, square 44×44, matches the hamburger silhouette exactly. Backdrop tap closes (Radix handles). Esc closes (Radix handles).
- Body scroll lock: Radix handles.
- `prefersReducedMotion`: collapses every animation to a 60ms opacity change via the existing `@media (prefers-reduced-motion: reduce)` block in `index.css`.

### 3. `src/components/nav/HamburgerButton.tsx` — two-line glyph

- Drop the middle line. Two lines only: top and bottom, each `1.5px`, full width of a `w-5` stage.
- Hover (`group:hover` on the parent button): top line `translate-x-[2px]`, bottom line `-translate-x-[2px]`, 500ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Open state: top line `rotate-45 translate-y-[5px]`, bottom line `-rotate-45 -translate-y-[5px]` — forms an X. Same easing.
- Stage height becomes `h-[10px]` (two lines, 10px apart) instead of `h-3.5`.

### 4. `src/index.css` — companion tokens & keyframes

- Remove the `.nav-link::after` / `.nav-link--active` rules (no inline desktop routes anymore).
- Add `.menu-overlay__veil`, `.menu-overlay__close`, `.menu-overlay__row` blocks with the keyframe + nth-child stagger described above. Mirror the existing `.menu-drawer__row` stagger pattern.
- Rewrite `.hamburger-line--top/--mid/--bottom` rules: drop `--mid`; add the hover slide rule (`.hamburger-btn:hover .hamburger-line--top` → `translateX(2px)`); rewrite the `[data-open="true"]` block for the two-line X morph.
- Add `--nav-progress` register documentation comment above the `--nav-bg` block (they're the same value, but the brand-mark crossfade reads cleaner under the new name in the future).
- Keep `prefers-reduced-motion` overrides — extend them to cover `.menu-overlay__veil` and `.menu-overlay__row`.

### 5. `src/components/nav/MenuDrawer.tsx` — delete

The new overlay replaces it at every breakpoint.

### 6. `mem://index.md` — update Core rules

Three Core lines contradict the new direction. Rewrite them in the same pass so future loops don't re-introduce inline routes or a 3-line hamburger:

- Replace "At md+ (≥768px) the header surfaces the 4 top-level routes inline…" with: "Header is the same shape at every breakpoint — brand mark left, Phone + Get a Free Quote + Menu trigger right. No inline routes ever. Five routes (Home · About · Services · Work · Contact) live only inside `MenuOverlay`."
- Replace "Menu drawer body is ONE flat list of all 5 routes…" with: "MenuOverlay is a full-viewport `bg-evergreen-deep` veil that scales from the top in 520ms. Oversized serif route names cascade in 90ms apart with a blur-to-sharp reveal. Active route gets a 28×2px evergreen-foreground rule to the left of the word — never an underline, never a dot. Contact rail (email + phone) fades in last bottom-right. Same overlay at desktop and mobile."
- Replace "Hamburger is the canonical three-line glyph…" with: "Hamburger is a two-line glyph (top + bottom only), square 44×44, 8px radius, visible at every breakpoint. Hover slides the top line right and the bottom line left over 500ms. Open state morphs to an X via rotate. Never animate width/top/bottom."
- Remove the "Header inline routes at md+ replace the old section rail entirely…" line — it no longer applies.
- Remove "Hamburger + drawer are mobile-only (`<md`, <768px)." — no longer true.

### 7. `src/components/Footer.tsx` (if it references the removed inline-routes pattern) — quick scan only

No expected changes; just verify nothing imports `PRIMARY_ROUTES` from Navigation.

## Performance posture (unchanged + one tightening)

- Scroll handler stays exactly as today: passive listener, one rAF, boolean guard, no React state writes on scroll.
- Overlay stays `React.lazy`-imported.
- **New:** add `requestIdleCallback` warming inside Navigation so the overlay chunk is parsed shortly after first paint, in addition to the existing `onPointerDown` warm on the hamburger.
- Veil + hamburger morph use `transform` + `opacity` only. No `backdrop-filter` on the veil (it's opaque).
- All five overlay routes warm their destination chunks on `pointerDown` + `mouseEnter` + `focus` via `prefetchRoute()` — same pattern the current drawer uses.
- CLS stays 0: header height is fixed; logo wrapper reserves the same box whether it's mid-crossfade or not.

## Verification before claiming done

1. Visual: desktop bar at `/` shows brand + Phone + Quote + Menu only — no inline routes. Mobile bar identical (Phone icon-only, no number).
2. Open the Menu at desktop. Veil drops from top in ~half a second; five oversized link names cascade in, contact rail fades in last bottom-right. X top-right closes. Backdrop tap closes. Esc closes.
3. Open the Menu at mobile (390×701 — the current viewport). Same experience, type scales down.
4. Scroll homepage past 24px — bar gains cream wash, brand-mark crossfades from cream→foreground. Scroll past 240px down — bar tucks. Scroll up one notch — bar reveals.
5. `bun run build` (if the harness runs it) succeeds.
6. No console errors on route change or menu open/close.

## Out of scope

- Hex tuning on the cream wash, the rule color, or the link opacity steps — those are round-two polish.
- Wordmark vs. text logo decision.
- Footer, hero, or any other component.
