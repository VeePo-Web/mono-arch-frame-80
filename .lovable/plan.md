# Nav v2 — Transparent-to-Glass, Award-Grade Polish

The transparent → frosted morph is wired up. This pass closes the remaining gaps that separate "good" from Fantasy/Royal-grade craft: the spacer cancels the transparency on every route, the morph is a binary jump (no easing-in of the blur), the logo + icons have no contrast strategy when sitting over photography, and the section-rail underline lacks the FLIP slide that Royal uses.

## What's wrong right now

1. **Spacer kills transparency.** `<div className="h-[60px] sm:h-16" />` is rendered on every route, so the hero starts *below* the nav. The "transparent over hero" promise is invisible to the user. Sub-page heroes (`pt-28 md:pt-44`) already account for the bar; Hero.tsx does too. The spacer is only needed on Contact/ThankYou.
2. **Binary morph.** The shell jumps from transparent → opaque at scrollY > 24. Flex/Royal interpolate opacity smoothly across a 0–80px window so the bar *grows* a backdrop instead of snapping one on.
3. **No contrast on transparent state.** Logo, phone icon, hamburger lines all use `text-foreground` (dark espresso). Over a cream hero this is fine; over the dark `photography.heroAcreage` slice in the right column it's still fine because the gradient mask cleans it up — but on small viewports where the photo crops in further, the right cluster can sit on a darker patch. We need a soft top scrim on `<sm` only when transparent (the Royal trick) so we never bet on "the gradient will save us."
4. **No FLIP underline.** SectionRail uses per-tab `scaleX` toggles. Royal's underline *slides* between tabs because all tabs share one indicator positioned via `--ind-x` / `--ind-w`. Memory already records this as the canon, but the implementation never landed.
5. **Hover state on Quote CTA is flat.** Memory says primary CTAs use `.cta-spring` (1px lift + halo + spring press). The nav Quote button has `hover:bg-evergreen-hover active:scale-[0.98]` only — no lift, no halo. Inconsistent with the rest of the site.
6. **Phone link mobile-tap is silent.** On mobile, tapping Phone fires `tel:` but a 0.97 active scale would confirm the press the way the Quote button does.
7. **Drawer open ↔ nav opacity collision.** When the drawer opens, the nav stays visible underneath. On the transparent state this looks correct; on the scrolled state it double-stacks two opaque surfaces. Fade the nav's `bg/border/shadow` to 0 while drawer is open (220ms) so the drawer reads as the only chrome.
8. **No reduced-transparency honoring.** A user who sets `prefers-reduced-transparency` (Apple a11y setting, increasingly respected) should get the opaque shell from scroll = 0. We should honor it.

## The plan

### 1. Smooth opacity interpolation (replace `useScrolled` boolean with `useScrollProgress`)
- New hook `src/hooks/useScrollProgress.ts`: returns a 0..1 number based on `Math.min(window.scrollY / 80, 1)`, rAF-throttled, passive.
- Navigation reads progress and applies `style={{ ['--nav-bg' as any]: progress, ['--nav-shadow' as any]: progress }}` on the header.
- Header uses CSS vars for bg/border/shadow alpha:
  ```css
  .nav-shell {
    background: hsl(var(--background) / calc(var(--nav-bg, 0) * 0.95));
    border-bottom: 1px solid hsl(var(--border) / calc(var(--nav-bg, 0) * 0.5));
    box-shadow: 0 4px 24px -8px hsl(var(--evergreen) / calc(var(--nav-bg, 0) * 0.10));
    backdrop-filter: blur(calc(var(--nav-bg, 0) * 12px));
    -webkit-backdrop-filter: blur(calc(var(--nav-bg, 0) * 12px));
  }
  ```
- Result: as the user scrolls 0 → 80px the backdrop *grows*. No layout thrash, no jump.
- On `/contact` and `/thank-you`: skip the hook, set `--nav-bg: 1` always.

### 2. Drop the spacer on transparent routes
- Replace the always-rendered spacer with `{!routeHasTransparentTop(pathname) && <div className="h-[60px] sm:h-16" />}`.
- Audit `Hero.tsx`, `SubPageHero.tsx`, and `Index.tsx` first beat: confirm they already pad for the 60/64px bar (`pt-28 md:pt-44` covers it). If not, bump `pt` only on the offending file — do not introduce a global spacer crutch.

### 3. Mobile-only top scrim when transparent
- Inside `<header>`, render a `<div aria-hidden className="lg:hidden absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/70 via-background/25 to-transparent" style={{ opacity: 1 - progress }} />`.
- Costs one paint, no compositing layer. Disappears as the real backdrop fades in. Fixes legibility on cropped mobile heroes.

### 4. FLIP shared-underline on SectionRail
- Wrap the link list in a positioned container; render ONE absolutely-positioned `<span className="rail-indicator" />` driven by `style={{ '--ind-x': `${rect.left}px`, '--ind-w': `${rect.width}px` }}`.
- `useLayoutEffect`: when `active` changes, measure the active anchor's offsetLeft + offsetWidth (relative to the scroll container), set CSS vars. The underline slides via `transform: translateX(var(--ind-x))` + `width: var(--ind-w)` with `transition: transform 420ms var(--ease-swift), width 420ms var(--ease-swift)`.
- Remove per-tab `nav-tab-rule` spans.
- Hide indicator (`opacity: 0`) when `active` is null (e.g. above the first section).
- This finally honors the `mem://` core: "Section rail uses ONE shared sliding underline (FLIP indicator with CSS vars `--ind-x`/`--ind-w`)."

### 5. Quote CTA gets `.cta-spring` parity
- Add `.cta-spring` class alongside the existing classes on the nav Quote `<Link>`.
- Confirms: 1px lift on hover, soft evergreen halo (box-shadow), 0.97 spring press. Consistent with every other primary CTA on the site.

### 6. Phone link tactile feedback
- Add `active:scale-[0.96]` and a 150ms `transition-transform` to the Phone `<a>` so the tap registers visually on touch.

### 7. Drawer-open dims the nav backdrop
- Track `drawerOpen` (already in state). When true, force `--nav-bg: 0` via inline style with a 220ms transition. Logo and right cluster stay visible above the drawer overlay (z-index already correct), but no double-glass stack.
- Already covered by the CSS-var setup — just gate the var.

### 8. Honor `prefers-reduced-transparency`
- In CSS:
  ```css
  @media (prefers-reduced-transparency: reduce) {
    .nav-shell { --nav-bg: 1 !important; backdrop-filter: none !important; }
  }
  ```
- Users with the Apple a11y setting get the opaque shell immediately. No backdrop-filter cost.

### 9. Section-rail visibility refinement
- Currently `hidden lg:flex`. Keep that — but on transparent routes (over hero), fade the rail in only after `progress > 0.4`. Reason: at the very top of the home page the rail competes with the hero headline. Once the user starts scrolling, the rail joins the conversation. `style={{ opacity: Math.max(0, progress * 1.6 - 0.4) }}`.

### 10. Logo crispness
- The logo is a 160×28 PNG/WebP. On the transparent state, add a barely-perceptible `drop-shadow(0 1px 2px hsl(var(--background) / 0.4))` so the wordmark holds against any photography behind it. Removed once `progress > 0.3` (the real backdrop takes over).

### 11. Edge case: route-change flash
- When navigating from `/contact` (opaque) to `/` (transparent), the bar should *fade out* its backdrop, not snap. The CSS-var approach handles this for free since `--nav-bg` transitions on a regular CSS transition. Add `transition: --nav-bg 320ms ease-out` via `@property --nav-bg { syntax: '<number>'; inherits: false; initial-value: 0; }` registration. (Falls back gracefully on browsers without `@property`.)

## Files touched

- `src/hooks/useScrollProgress.ts` — new (replaces `useScrolled` for nav; keep `useScrolled` if anything else imports it — `rg` confirms it's only used by Navigation, so delete).
- `src/components/Navigation.tsx` — switch to progress, drop spacer, add scrim, add `.cta-spring`, gate var on drawerOpen, add logo drop-shadow.
- `src/components/nav/SectionRail.tsx` — FLIP indicator refactor + opacity gate from progress (read via context or prop).
- `src/index.css` — `.nav-shell` styles, `@property --nav-bg`, `prefers-reduced-transparency` block, `.rail-indicator` styles, drop legacy `.nav-tab-rule`.
- No memory edits — every change reinforces existing core rules.

## Out of scope

- No change to drawer structure, anchor lists, copy, or CTA target.
- No additional animations on the logo wordmark itself (Royal-style "morph" reads as gimmicky for a contractor).
- No sticky mobile CTA, no scroll-up reveal trick — both violate `mem://constraint/no-floating-fab` and the round-6 simplification ethos.

## Why this is the right level of detail

The brief is "transparent-to-glass like Flex/Royal." Flex achieves it with a binary `isScrolled` jump and a hard shadow; Royal achieves it with smooth CSS-var interpolation, a mobile scrim, and a sliding underline. We're choosing the Royal path because it's the higher-craft reference and matches the existing memory canon ("FLIP indicator", "soft evergreen halo", "300ms ease-out"). Every step above is the minimum work needed to make the canon real on screen.
