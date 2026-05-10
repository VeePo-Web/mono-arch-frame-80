# Section: Global → Nav

## Issues found

**Header bar (`src/components/Navigation.tsx`)**
- L155 — Header CTA reads "Get a Quote" while drawer + sub-pages say "Get a Free Quote". Inconsistent voice.
- L143-156 — Quote CTA missing `.cta-spring` class. Core: "Primary CTAs use the `.cta-spring` class." Currently flat colour-only.
- L158 — Hamburger always rendered. Per your decision it must be `<lg` only.
- L65 — Skip-link uses `text-minimal`. Retired class noise; swap to `.t-eyebrow` or plain `text-sm font-medium`.
- L84-88 — Mobile legibility scrim still present at `lg+` (parent has no breakpoint guard on the gradient itself, only on `.lg:hidden` — actually OK, keep).
- L59 — `logoShadow` adds a soft drop-shadow over photography; quiet, keep.

**Section rail (`src/components/nav/SectionRail.tsx`)**
- L89 — Uses `hidden md:flex` (≥768px). Core: "Section rail visible from lg+ (1024px) only." Bug. Change to `hidden lg:flex`.
- L106-111 — Active tab uses `text-foreground` vs `text-foreground/65`. Core says active state is **underline-only, never bump weight/colour**. Currently it bumps colour (acceptable per the literal rule of "never bump font-weight"), but the spec is "underline-only". Keep colour delta — underline is the actual indicator via `.rail-indicator`. ✓ acceptable.
- Container also gates on `< 2 sections` — fine. But Navigation.tsx wraps it in `hidden lg:flex` already, so the inner `md:flex` is dead code; still wrong intent.

**Drawer (`src/components/nav/MenuDrawer.tsx`)**
- L52-55 — Panel uses `bg-background/97 backdrop-blur-2xl`. Core: **"Drawer overlay uses NO backdrop-filter (panel is opaque)."** Change to `bg-background` (solid), drop `backdrop-blur-2xl`.
- L99 — `<Link to="/" style={{ animationDelay: "120ms" }}>`. Core: **"Drawer item stagger via CSS `:nth-of-type`, never inline `animation-delay` styles."** Remove inline style.
- L184 — DrawerColumn label uses `style={{ animationDelay: '${delay}ms' }}`. Same rule. Remove inline; let CSS `:nth-of-type` (or a static keyframe class) drive the stagger. Drop `delay` prop entirely.
- L124 — Bottom rail uses `bg-background/40 backdrop-blur-sm`. Same backdrop-filter ban. Use `bg-background` + the existing `border-t` hairline.
- L82 — Scroll body missing `overscroll-contain scroll-smooth`. Core requires both.
- L142 + L159 — Drawer CTAs include trailing `<ArrowUpRight />` icon. Consistency check: header Quote CTA has no arrow. The `.cta-spring` button language site-wide doesn't mandate an arrow, but the header omits it. Drop arrows on drawer CTAs to match the one shape language ("solid square evergreen, cream text, no glyph").
- L93-98 — Big "Home" link uses `text-2xl md:text-3xl font-semibold tracking-tight` (arbitrary sizes). Core: "Never use legacy classes, never inline `text-[…]` arbitrary sizes." `text-2xl/3xl` are Tailwind tokens, not arbitrary, so technically fine — but the typography system says use `.t-*`. Promote to `.t-section` (Home) and `.t-title` (Pages links) for one shared system. Pages links L209 `text-[1.0625rem] md:text-[1.125rem]` IS an arbitrary `text-[…]` — must replace with `.t-title` or `.t-lede`.

**Hamburger (`src/components/nav/HamburgerButton.tsx`)**
- ✓ clean (square 44×44, transforms only, three-line glyph). Note: visibility is now controlled by Navigation.tsx wrapper.

**Globally**
- Core memory line **"Hamburger is the canonical three-line glyph, icon-only at all breakpoints"** must change to `<lg only` per your decision. Update `mem://index.md`.

## Fix plan

### 1. `src/components/Navigation.tsx`
- L155: `Get a Quote` → `Get a Free Quote`. `aria-label="Get a quote"` → `aria-label="Get a free quote"`.
- L148: append `cta-spring` to the className list.
- L158: wrap hamburger in `<div className="lg:hidden">` so it disappears at lg+.
- L65: swap `text-minimal` for `text-sm font-medium`.

### 2. `src/components/nav/SectionRail.tsx`
- L89: `hidden md:flex` → `hidden lg:flex`.

### 3. `src/components/nav/MenuDrawer.tsx`
- L53: `bg-background/97 backdrop-blur-2xl` → `bg-background`.
- L82: add `overscroll-contain scroll-smooth` to the scroll wrapper className.
- L94: replace `text-2xl md:text-3xl font-semibold tracking-tight` with `t-section` token class.
- L99: delete `style={{ animationDelay: "120ms" }}`.
- L106: drop `delay={200}` arg; remove `delay` from `DrawerColumn` props.
- L124: `bg-background/40 backdrop-blur-sm` → `bg-background` (keep `border-t border-border/60`).
- L143 + L160: remove `<ArrowUpRight ... />` and adjacent `gap-2.5`. CTA reads simply "Get a Free Quote".
- L184: remove inline `animationDelay` style; rely on existing `.menu-drawer__label` keyframe (CSS already targets the class — stagger via `:nth-of-type` if needed, or a single shared delay).
- L209: `text-[1.0625rem] md:text-[1.125rem]` → `t-title`.

### 4. `mem://index.md`
- Replace the line "Hamburger is the canonical three-line glyph, icon-only at all breakpoints, square 44×44 with 8px radius — never a circle/pill, never with a 'Menu' word." with: "Hamburger is the canonical three-line glyph, square 44×44 with 8px radius, **visible only at <lg (mobile/tablet)**; at lg+ the section rail + hover-revealed routes carry navigation. Never a circle/pill, never with a 'Menu' word."
- Add to Core: "Header CTA copy site-wide is **'Get a Free Quote'** — never 'Get a Quote' shorthand. The drawer, header, sub-page heroes, and BigCloseCTA all use the exact same five words."
- Add to Core: "Drawer CTAs are text-only — no trailing arrow glyph. Same shape language as the header Quote CTA."

## Verify
- `browser--navigate_to_sandbox /` at 1440 + 390. Confirm: hamburger absent at 1440, rail centered, single "Get a Free Quote" pill on right.
- Open drawer at 390. Confirm: solid cream panel (no blur), no per-link inline delays in DOM, CTA reads "Get a Free Quote" with no arrow.
- `code--read_console_logs` — clean.
- Zoom on header CTA + drawer CTA — confirm `Get a Free Quote` consistent, descenders on "Free"/"Quote" not clipping.

## Out of scope
Retired-component cleanup, footer, BigCloseCTA, hero. Section rail anchor labels (separate concern — rail content per route is in `getPageSections`).
