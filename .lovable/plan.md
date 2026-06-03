# Nav bar rebuild — visible logo + inline route nav

Two problems, one pass:

1. **Logo disappears on dark photos** (hero, cinematic sub-page heroes) and reads too small at `h-7/h-8`.
2. **No section nav.** Every route is one tap behind the Menu pill, which hides the IA. We need classic horizontal nav at desktop: **Logo · Home About Services Work Contact · Get a Free Quote**.

This is a meaningful register change. Several Core memory rules ("Nav right cluster is exactly the Menu pill", "Five routes live only inside MenuOverlay", "Phone + Quote never in the header", "No inline desktop routes") get overridden and will be rewritten when I implement.

---

## 1. Logo — visible on every background, properly sized

**Two-layer crossfade, driven by scroll progress.** Both files already exist:
- `src/assets/logo/haven-creek-horizontal.webp` — dark mark (cream sections)
- `src/assets/logo/haven-creek-horizontal-white.webp` — cream mark (dark hero photo)

Render both stacked. Dark layer is the base. Cream layer sits absolute over it with `opacity: calc(1 - var(--nav-progress))` — so over the hero/cinematic media it's **100% cream**, and after scrolling past ~80px on cream sections it crossfades to **100% dark**. 300ms `cubic-bezier(0.22, 1, 0.36, 1)` transition so the swap reads as Apple-soft, not a flicker.

**Size step-up.** Logo grows from `h-7 md:h-8` → `h-9 md:h-10 lg:h-11` (≈36/40/44px). Width auto. Stays inside the bar's `min-h-[64px] md:min-h-[72px] lg:min-h-[80px]` so the bar shape doesn't change.

**Scroll progress wiring.** The `useScrollProgress` rAF loop already exists and writes `--nav-progress` (0..1) to the document. It's currently dormant. Re-attach it inside `Navigation.tsx` (one rAF, same handler that drives the direction-aware hide — no second listener).

**Optional fallback for cinematic routes.** On any route whose top is a cinematic-media hero (Home, About, Services, Work, Contact under the new hero plan), we force `--nav-progress: 0` until scrollY > 80, regardless of section background. Guarantees the cream logo over the photo.

---

## 2. Section nav — inline route links at desktop

Pattern: **Logo (left) · 5 routes (center) · "Get a Free Quote" CTA (right) · Hamburger (mobile only)**.

### Breakpoint behavior

| Breakpoint | Logo | Routes | CTA | Trigger |
|---|---|---|---|---|
| `< lg` (mobile/tablet) | shown | hidden | hidden | Menu pill (existing hamburger) |
| `≥ lg` | shown | inline | solid evergreen pill | hidden |

`lg` (1024px) is the breakpoint — below it, the route row would crowd the logo, so we fall back to the existing overlay flow. **MenuOverlay is preserved as-is** for `< lg` — same veil, same cascading serif, same overlay CTA + contact rail. No changes to overlay internals.

### Desktop route row

- Five `NavLink`s — Home · About · Services · Work · Contact
- Centered within the bar using a 3-column flex layout (`logo | routes | cta`)
- Type: `text-[14px] font-medium tracking-[-0.005em]`, color `text-foreground/80`, hover `text-foreground`, **active = `text-evergreen` + 2px evergreen underline** (the underline animates in via `transform: scaleX` from left, 300ms `cubic-bezier(0.22, 1, 0.36, 1)` — same cadence as `.row-wash`)
- Crossfade companion: routes get the same dark↔cream treatment as the logo via `color: hsl(var(--nav-progress) === 0 ? evergreen-foreground : foreground)` driven by a CSS custom property pair (cleaner: two color stops blended through `color-mix(in oklab, var(--cream-link), var(--dark-link), var(--nav-progress))`)
- `prefetchRoute()` on `pointerDown` + `mouseEnter` + `focus` (same warming pattern already used for the overlay)
- Spacing: `gap-x-8 xl:gap-x-10`

### Desktop CTA

- Solid evergreen pill on the right — same `bg-evergreen text-evergreen-foreground` + `.cta-spring` button language as every other primary CTA on the site
- Copy: **"Get a Free Quote"** (exact site-wide string)
- Size: `h-10 px-5 rounded-lg text-[14px] font-medium`
- Links to `/contact` (warm-prefetched)
- This overrides the "Quote CTA is NEVER in the header" rule for `≥ lg` only — mobile still relies on the overlay

### Mobile trigger

- Existing `.menu-pill` (`HamburgerButton`) renders only at `< lg` (add `lg:hidden`)
- Everything inside MenuOverlay stays untouched — it's still the mobile IA + the contact rail (phone)

### Bar behavior

- Bar stays fully transparent at scrollY=0 (no backdrop)
- **New:** past `scrollY > 80`, fade in a subtle cream backdrop — `bg-background/85` + `backdrop-blur-md` + 1px bottom hairline `border-foreground/8`. This is the legibility surface for the inline route row once the page has scrolled past the hero. Animates over 300ms. Direction-aware hide (existing logic) is preserved.
- Reasoning: the previous "never paint a backdrop" rule worked because there were no inline links to keep legible. Adding routes requires a quiet surface once content scrolls under them — Fly4Me does the same.

---

## Out of scope

- MenuOverlay internals (cascading routes, contact rail, CTA) — untouched
- Footer — untouched
- Cinematic hero plan from previous turn — independent
- Form / page / route work — untouched

---

## Technical notes

**Files touched:**
- `src/components/Navigation.tsx` — restructure into 3-col flex (logo · routes · cta), add `lg:hidden` to `HamburgerButton`, mount inline `<NavLink>` row, mount desktop CTA, restore `useScrollProgress` write to `--nav-progress`, add scrolled-backdrop class toggle past 80px
- `src/components/nav/BrandMark.tsx` (new, small) — two-layer crossfade `<img>` pair; extracts the logo block out of `Navigation.tsx`
- `src/components/nav/NavLinks.tsx` (new, small) — the 5-route row + animated underline
- `src/index.css` — add `.nav-link` + `.nav-link--active` underline animation, restore/define `.brand-mark__cream` opacity binding to `--nav-progress`, add `.havencreek-nav[data-scrolled="true"]` backdrop styles
- `src/hooks/useScrollProgress.ts` — verify it still exists; re-wire if dormant
- `mem://index.md` Core — rewrite the four contradicted rules (Menu pill is entire chrome, routes only in overlay, phone/quote never in header, no inline desktop routes, no backdrop) to reflect the new ≥lg pattern. Add a new memory file `mem://features/desktop-inline-nav` with the breakpoint contract.

**Animation budget:** logo crossfade 300ms, route underline 300ms, backdrop fade 300ms, direction-aware hide 500ms — all `cubic-bezier(0.22, 1, 0.36, 1)`. No new motion grammar.

**A11y:**
- `<nav aria-label="Primary">` wraps the route row (already present, scope expanded)
- Active link gets `aria-current="page"` via `NavLink`
- Focus rings preserved via `focus-visible:ring-evergreen`
- Skip-to-content link untouched

**Perf:** No new listeners. The single rAF scroll handler in `Navigation.tsx` updates both `--nav-progress` and the `data-scrolled` attribute. No layout thrash — all driven via CSS custom properties.
