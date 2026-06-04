## Goal
Add a desktop right cluster: **Phone · Get a Free Quote · Menu pill**, while keeping the inline routes row. Menu pill becomes visible at every breakpoint and opens the existing MenuOverlay.

## Changes

**1. `src/components/Navigation.tsx`**
- Right cluster at `lg+` becomes (in order): `PhoneLink` → `.nav-quote-cta` "Get a Free Quote" → `.menu-pill`.
- Remove `lg:hidden` from the `.menu-pill` wrapper so it shows at every breakpoint.
- At `<lg`, hide the phone link and Quote CTA (keep mobile minimal: logo + menu pill only — same as today).
- Spacing: `gap-2 md:gap-3` between right-cluster items; phone gets `mr-1` breathing room from the CTA.

**2. New `src/components/nav/PhoneLink.tsx`**
- Small `<a href="tel:...">` with phone glyph (lucide `Phone`, 14px) + formatted number.
- `text-[13px] lg:text-[14px] font-medium tracking-[-0.01em]`.
- Color follows `--nav-progress` the same way `.nav-link` does (cream over hero → foreground when scrolled). Add `.nav-phone` class in `index.css` that mirrors the `.nav-link` color-mix rule, no underline by default, evergreen on hover.
- Hidden below `lg` (`hidden lg:inline-flex`).
- Phone number sourced from the same constant the MenuOverlay rail already uses (single source of truth).

**3. `src/index.css`**
- Add `.nav-phone` rule (color-mix with `--nav-progress`, hover → `hsl(var(--evergreen))`, 300ms transition).
- No other token changes.

**4. `mem://index.md` (Core)**
Update three lines that currently forbid this:
- "Desktop Quote CTA…" → right cluster at lg+ is **Phone · Quote CTA · Menu pill**; pill is visible at every breakpoint.
- "At `<lg` the nav right cluster is the `.menu-pill` alone…" → keep the `<lg` half (pill alone), drop the "and the pill is gone at lg+" half.
- "Phone link is NEVER in the header…" → replace with: Phone link lives in the desktop header (lg+ only) and inside MenuOverlay's contact rail; never on mobile header chrome.

## Out of scope
- MenuOverlay internals (untouched).
- Inline `NavLinks` (untouched — stays as the center row).
- Mobile header layout (untouched — logo + menu pill only).
- Scroll hide/reveal behavior (untouched).
- Footer, page sections, forms.

## Technical notes
- `.menu-pill` already supports both breakpoints visually; only the parent wrapper's `lg:hidden` is removing it. Just drop that class.
- Phone constant: reuse whatever `MenuOverlay.tsx` imports (likely `siteContact` or inline string — plan will read it during build to keep one source).
- No new deps.
