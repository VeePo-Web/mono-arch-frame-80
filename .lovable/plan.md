## What changes

The nav becomes a Fantasy.co-style floating assembly: **just the logo on the left, just one dark evergreen "Menu" pill on the right.** Nothing else lives in the bar at any breakpoint. Phone and the Quote CTA move into the overlay where they get proper hierarchy.

```text
┌────────────────────────────────────────────────────────────┐
│  [HC logo]                                  [ ● Menu  ]    │   transparent bar
└────────────────────────────────────────────────────────────┘     pill is the chrome
```

## The pill (the whole point)

A single capsule trigger, sitting over the cream hero with quiet authority:

- Shape: capsule (`rounded-full`), `h-10` mobile / `h-11` md+, padding `px-4` / `px-5`
- Color: `bg-evergreen-deep` with `text-evergreen-foreground` (cream)
- Inner highlight: 1px inset top hairline `inset 0 1px 0 hsl(0 0% 100% / 0.08)` — the Fantasy "candy" bevel
- Outer shadow: `0 8px 24px -8px hsl(var(--evergreen-deep) / 0.35)` — floats without screaming
- Glyph + word together: tiny two-line glyph (12px stage, 1.5px lines, cream) + "Menu" / "Close" word in `text-[13px] font-medium tracking-[-0.01em]`
- Word is visible at **every breakpoint** (not md+ only) — that's the Fantasy register
- Hover: `translateY(-0.5px)` + shadow grows to `0 10px 28px -8px ...` over 320ms iOS spring curve
- Press: `scale-[0.97]`
- Open state: same pill, glyph morphs to X via `translateY(±5px) + rotate(±45deg)` only

## The bar

- **No glass backdrop, ever.** The pill IS the chrome — the bar itself stays fully transparent on every route and at every scroll position. Retire `--nav-bg` interpolation and the `.nav-shell` glass styling entirely.
- Mobile legibility scrim (the soft top-fade gradient) stays, but constant-on at low opacity (`opacity-100` at `from-background/40`) instead of fading with scroll.
- Direction-aware hide-on-scroll-down stays exactly as is (240px threshold, 500ms translate).
- Safe-area-inset math stays (`min-h` not `h`).
- Bar heights tighten slightly to give the pill more visual weight: `min-h-[56px] md:min-h-[64px] lg:min-h-[72px]`.

## What leaves the bar

- **Phone link** → moves into the overlay's contact rail only (already there). The header phone icon is removed entirely.
- **Quote CTA (md+)** → removed from the header. It already lives oversized inside the overlay.
- Logo crossfade (cream over hero, dark after scroll) **stays**, but now driven by route + scroll position alone since the bar never gains a backdrop.

## Overlay

Almost untouched. Only two tweaks so the entry feels matched to the new pill:
- Close affordance becomes the **same pill silhouette** as the trigger (dark evergreen capsule, "Close" word + X glyph) — same component, just `open=true`.
- Phone link in the contact rail bumps up one notch in visual weight since it's now the only place to grab a number from the chrome.

The overlay's veil, cascading serif routes, oversized cream "Get a Free Quote" CTA, contact rail — all unchanged.

## Files

- `src/components/Navigation.tsx` — strip Phone + Quote, kill `--nav-bg` interpolation and glass styles, retire `useScrollProgress` dependency for backdrop (keep only logo crossfade math), tighten heights
- `src/components/nav/HamburgerButton.tsx` — rebuild as `MenuPill`: capsule shape, dark evergreen, cream glyph + word always visible, inner highlight + drop shadow, iOS spring curves
- `src/index.css` — retire `.nav-shell` glass rules (background-color/border/shadow interpolation), add `.menu-pill` utility (capsule + bevel + shadow + hover lift)
- `src/components/nav/MenuOverlay.tsx` — swap the close button for the matching pill silhouette; bump contact-rail phone to slightly larger type
- `mem://index.md` — rewrite the two nav rules (the "no floating glassmorphism" line and the "right cluster reads by shape" line) to reflect the new pill-only chrome; mark `useScrollProgress`-driven backdrop as retired

## Out of scope

Hero, photo plates, page content, palette tokens, footer, MenuOverlay's veil/routes/CTA/rail layout, fonts. Pure nav-chrome change.

## Performance

Net negative JS — `useScrollProgress`'s rAF loop driving `--nav-bg` is removed (only the direction-aware hide rAF stays). No new dependencies. Pill is CSS-only.
