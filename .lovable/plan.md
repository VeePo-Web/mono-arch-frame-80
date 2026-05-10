# Section Audit — Home → Hero

## 1. Source of truth
- `src/components/Hero.tsx` (only renderer)
- `src/index.css` lines 1485-1590 (`.t-display`, `.hero-plate`, `.reveal-up`, tokens)
- `src/data/galleryPlates.ts` (sources `bearspaw-wraparound-deck`)
- Core memory rules touching Hero: type-only headline, single CTA, 12-col split, photo-right caption strip, `.t-display` reserved for Hero H1, `.cta-spring` on primary CTAs, `.section-y` rhythm, no arbitrary `text-[…]` sizes, eyebrow-OR-lede, gallery tiles carry no description.

## 2. Findings (every issue)

### Readability — ❌
- **`src/index.css:1495` — `.t-display { line-height: 0.98 }`** combined with **`Hero.tsx:39, 44, 49`** wrapping every line in `<span className="block overflow-hidden">` permanently clips descenders. The `p` in "property" and the `y` in "you" lose their tails. **This is the bug the user keeps flagging.**
- `Hero.tsx:88` — reply microcopy uses `text-[13px]` (arbitrary size). Token violation; should be `.t-micro` or `.t-eyebrow`.
- `Hero.tsx:74` — CTA label uses `text-minimal` (retired legacy class), not a `t-*` token.

### Hierarchy — ❌
- Hero carries **two eyebrows**: left column "Family-run · Foothills, AB" (line 28) AND right column "Recent work — Bearspaw" (line 102). Core rule: eyebrow OR lede, one voice per section. Strip the right-column eyebrow.
- Bottom locator strip (lines 116-122) repeats the same locator already in the top-left eyebrow ("Foothills, AB"). Redundant.

### Consistency with the rest of the site — ❌
- **Caption strip under hero photo (lines 110-115)** carries project title + "Category · Area". The user's new rule: **gallery tiles show photo only, no description**. The hero photo is a project tile — strip the caption.
- CTA does not use `.cta-spring` (Core rule for all primary CTAs). It rolls its own hover/active classes inline.
- Section padding is `pt-28 md:pt-40 pb-16 md:pb-24` (line 22) — per-page override. Should use `.section-y` or `.section-yt`/explicit hero rhythm utility (Hero is the one place the top is taller; keep `.section-yb` for the bottom and use a single `pt-28 md:pt-36` on the top only — or add a one-off `.hero-y` utility). Pick deletion: drop the bottom `pb-16 md:pb-24` and let the next section's `.section-y` carry the rhythm.
- `border-t border-foreground/10` on the bottom locator strip — but locator strip is being deleted, so this resolves itself.

### Simplicity / Fantasy.co test — ❌ (heavy deletion warranted)
Delete, in order of impact:
1. **Right-column eyebrow line** ("Recent work — Bearspaw") + its rule. Photo speaks for itself.
2. **Photo caption strip** (title + Category · Area). Gallery rule = no description.
3. **Bottom locator strip** ("Haven Creek / 2026" + "Foothills, AB · Available across rural Alberta"). Decorative chrome that exists only to look designed.
4. **Reply-time microcopy** ("Replies within two business days") — keep, it's a real promise. But move down in priority and demote to `.t-micro`.

What remains in the left column: small evergreen rule + eyebrow → H1 → lede → CTA → quiet `.t-micro` reply line. What remains in the right column: photo plate. Nothing else. That's the Fantasy.co bar.

### Motion — ⚠
- Three stacked `reveal-up` line-clips on the H1 (lines 38-52) deliver the entrance, but the `overflow-hidden` wrappers stay in the DOM after the animation ends, which is exactly why descenders clip permanently.
- Fix path: drop the per-line `overflow-hidden` wrappers entirely, keep one `data-reveal` on the H1 element so the standard 800ms cadence applies. Same family-run eyebrow + lede + CTA all get `data-reveal` with `--reveal-delay`. One motion language matches the rest of the site.

### Responsive — ⚠ (tied to descender fix)
- At 928×672 (the user's current viewport), the H1 is sub-`lg` so the photo stacks below — fine. The clipped `p`/`y` is visible here. After fix: should hold cleanly 360 → 1920.
- Single-column stack at <lg currently respects `pt-28` — keep.

### Accessibility — ✓ mostly clean
- CTA target is 52px ≥ 44 ✓
- Focus ring present ✓
- Alt text "Wraparound cedar deck — Bearspaw, Alberta" — truthful ✓
- One `<h1 id="hero-heading">` ✓

## 3. Fixes (smallest possible)

### Fix A — Kill descender clipping (root cause + per-instance)
- **`src/index.css:1495`**: change `.t-display` `line-height: 0.98` → `line-height: 1.06`. Add `padding-bottom: 0.08em` to the rule so descenders always clear, even inside future `overflow-hidden` parents.
- Same hardening for `.t-headline` (`src/index.css:1503`): `line-height: 1.04` → `1.08`, add `padding-bottom: 0.06em`.

### Fix B — Hero.tsx rewrite of the H1 block
Replace lines 35-53 (the three `overflow-hidden`/`reveal-up` line-clip wrappers) with a single H1 carrying `data-reveal`:
```tsx
<h1
  id="hero-heading"
  data-reveal
  style={{ ["--reveal-delay" as string]: "120ms" }}
  className="mt-7 t-display wrap-editorial text-foreground"
>
  One trusted contractor for the property you value.
</h1>
```
- Removes 3 nested wrappers, eliminates the clip mechanism entirely.
- Consistent with the project's single 800ms reveal cadence.

### Fix C — Migrate the rest of the left column to `data-reveal`
- Eyebrow row (line 27): swap `reveal-up` + inline delay → `data-reveal` + `--reveal-delay: 0ms`.
- Lede `<p>` (line 56): swap → `data-reveal` + `--reveal-delay: 220ms`.
- CTA wrapper (line 64): swap → `data-reveal` + `--reveal-delay: 340ms`.
- Reply line (line 86): swap → `data-reveal` + `--reveal-delay: 440ms`. Replace `text-[13px] text-muted-foreground` with `t-micro normal-case tracking-normal` (or just `t-eyebrow normal-case tracking-normal` — pick `t-micro`-with-overrides since copy is sentence-case).
  - Cleanest: keep it `text-muted-foreground` plus a new tiny rule, **or** simpler — just use `text-sm text-muted-foreground` (token-class) since `13px` precision isn't worth a new utility.

### Fix D — CTA uses `.cta-spring`
Replace the bespoke `transition-all duration-500 ease-weighted hover:bg-evergreen-hover active:scale-[0.98] shadow-[…]` chain on the CTA (lines 70-76) with `cta-spring`. Keep `bg-evergreen text-evergreen-foreground`, `pl-7 pr-1.5 py-1.5 min-h-[52px]`, and the focus ring. Removes ~3 lines of bespoke motion code, complies with Core rule.

### Fix E — Strip right-column chrome
- Delete lines 99-104 (the "Recent work — Bearspaw" eyebrow row + its hairline rule).
- Delete lines 110-115 (the `<figcaption>` strip with title + Category · Area).
- The `<figure>` becomes: `data-reveal` figure → `.hero-plate` photo only.

### Fix F — Strip bottom locator strip
Delete lines 117-123 (`<div className="hidden lg:flex … mt-24 pt-6 border-t …">…</div>`). Saves a hair-rule, removes redundant locator info.

### Fix G — Section padding
On the `<section>` (line 22): `pt-28 md:pt-40 pb-16 md:pb-24` → `pt-28 md:pt-40 section-yb`. Keeps the deliberately taller hero top, hands the bottom rhythm to the global token. (Or keep as-is — but flagging for the consistency rule.)

## 4. Verify (after edits)
- `browser--navigate_to_sandbox` to `/` at 1440 wide, screenshot.
- Resize to 390 wide, screenshot.
- `image_tools--zoom_image` on the H1 (focus on "property" and "you") — confirm `p` and `y` tails are fully visible.
- `image_tools--zoom_image` on the CTA — confirm cream text on solid evergreen, no contrast issue.
- `code--read_console_logs` + `code--read_runtime_errors` — must be clean.

## 5. Out of scope (do not touch in this pass)
- `RecentWorkPreview` captions (separate section audit).
- `Navigation` header (separate audit).
- `BigCloseCTA` (separate audit).
- Anything in `/about`, `/services`, `/work`, `/contact`.

## Files that will change
- `src/index.css` — `.t-display` + `.t-headline` line-height + descender padding.
- `src/components/Hero.tsx` — H1 rewrite, motion migration, CTA → `.cta-spring`, delete right-column eyebrow + caption + bottom locator strip, optional padding token swap.

## Expected diff size
~40 lines deleted, ~10 lines edited. Net deletion. Fantasy.co bar met.
