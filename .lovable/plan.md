# Fix the nav menu — Fly4Me register, Haven Creek palette

Four problems, four fixes. Closes the gap between the current overlay and the Fly4Me feel you're after, on mobile especially.

---

## 1. Top bar — uncramp the mobile right cluster

**Now:** Logo · Phone icon · "Get a Free Quote" pill · hamburger. On a 390px viewport with safe areas, the CTA squeezes the phone icon and pushes the hamburger to the edge.

**Change:**
- **Mobile (<md):** Logo · Phone icon · hamburger. CTA disappears from the bar.
- **md+ (tablet/desktop):** Unchanged — Logo · Phone with number · Get a Free Quote · Menu.
- The quote CTA gets a proper home inside the overlay (see §3).

Phone stays in the bar at every breakpoint per your "always one tap to call" rule.

## 2. Hamburger — give it a voice

**Now:** Two anonymous lines, 44×44 square. No label.

**Change:** Restore the Fly4Me-style **"Menu"** word beside the glyph at **md+** only (where there's room and it reads as editorial chrome, not clutter). On mobile, stays icon-only — the hamburger glyph is enough when the bar is sparse.

Same two-line → X morph on open. Same transform-only animation (no width/top/bottom).

Close affordance inside the overlay also gains its "Close" word at md+, mirroring the trigger.

## 3. Overlay layout — rebuild mobile rhythm

**Now:** `items-center` on the grid floats the routes mid-screen on mobile; the contact rail orphans below them with no anchor. Reads like a half-finished dropdown.

**Change — mobile (single column):**

```text
┌────────────────────────────┐
│                       Close│  ← top-right, mirrors hamburger
│                            │
│ ─── Home                   │  ← routes top-anchored
│     About                  │     under the close, large
│     Services               │     cascade in 90ms beat
│     Work                   │
│     Contact                │
│                            │
│   [ Get a Free Quote ]     │  ← oversized CTA, full-width
│                            │     square solid evergreen
│   ─────────────────────    │  ← hair rule
│   CONTACT                  │
│   hello@havencreek.ca      │  ← rail pinned to bottom
│   403 970-7691             │     above safe-area inset
└────────────────────────────┘
```

**Change — desktop (lg+):** Routes col 1-9 left-aligned, contact rail col 10-12 bottom-right. Routes top-anchored (not vertically centered) so the cascade reads from the top edge like Fly4Me's. CTA sits as an oversized button under the routes at lg too.

## 4. Cinematic finish — grain, vignette, type weight

Match Fly4Me's atmosphere over the evergreen-deep ground:

- **Film grain** — `radial-gradient` micro-dots at 5% opacity, `mix-blend-overlay`. Prevents the flat digital green.
- **Vignette** — radial darken from transparent to `evergreen-deep/55` at edges. Pulls focus to the route list.
- **Route type scale on mobile:** bump from `clamp(2.5rem, 9vh, 5.75rem)` to `clamp(3rem, 11vh, 6rem)`. On a 390×700 viewport, route names land at ~77px (now ~63px) — reads as a statement.
- **Cascade timing:** keep 360ms start + 90ms beat. Tighten the rail fade to 720ms (from 920ms) so it doesn't feel orphaned after the routes settle.
- **Active-route rule** stays 28×2px cream, left of the word.

---

## Memory updates required

This intentionally overrides four Core rules. After implementation:

- `Header is the same shape at every breakpoint` → revised: brand + phone are constant; CTA hidden <md, lives in overlay instead.
- `Quote CTA is always exposed at every breakpoint` → revised: exposed at md+; on mobile, lives in overlay (still one tap from hamburger).
- `Hamburger ... Never with a "Menu" word` → revised: "Menu" / "Close" word shown at md+ only; mobile stays icon-only.
- `ONE close affordance: icon-only square X` → revised: icon at mobile, icon + "Close" word at md+.
- `MenuOverlay ... Same overlay at every breakpoint` → revised: same overlay, mobile gets top-anchored routes + bottom-pinned rail + inline CTA; desktop unchanged in spirit.

I'll rewrite `mem://features/two-tier-navigation` and the relevant Core lines in the same pass.

---

## Files touched

- `src/components/Navigation.tsx` — hide CTA <md, conditionally render "Menu" label at md+.
- `src/components/nav/HamburgerButton.tsx` — accept optional `label` prop, render at md+.
- `src/components/nav/MenuOverlay.tsx` — top-anchor routes on mobile, pin rail to bottom, add inline CTA button, add grain + vignette layers, bump mobile type scale, add "Close" word at md+.
- `src/index.css` — `.menu-overlay__grain`, `.menu-overlay__vignette` utilities; adjust `.menu-overlay__rail` delay.
- `mem://index.md` + `mem://features/two-tier-navigation` — reflect the four revised rules.

## Out of scope

Footer, hero, page content, route changes, color tokens, no new dependencies.

## Performance

No regressions. Grain/vignette are CSS-only paint layers (cheap), no extra JS, no new chunks. Overlay still lazy-loaded, warmed on idle + hamburger pointerdown.
