# Round 11 — Single button language: solid evergreen, cream text

The site has two flavours of evergreen button living side-by-side and the pale-tint flavour reads as "dark green with black text" against the cream page. We collapse the language to one: **dark evergreen fill + cream foreground**, matching the home hero's "Get a Free Quote" pill. No more pale-tint-with-dark-text tap targets.

## What changes

### 1. `src/components/QuickContactSheet.tsx` — the two big bottom-sheet pills
Currently (lines 200-235) the **Text us** and **Call us** tap targets render as:
```
bg-evergreen/[0.06] border border-evergreen/15 text-foreground
```
That's a 6%-opacity evergreen wash with dark text — exactly the offender.

Promote both to the primary CTA language:
- `bg-evergreen text-evergreen-foreground` (solid dark green + cream text)
- `border-transparent` (drop the hairline border — solid fill carries the shape)
- `hover:bg-evergreen-hover` (replace `hover:bg-evergreen/[0.10]`)
- Keep the rounded-2xl radius, min-height, and icon layout — only the colour pair changes.
- The `MessageCircle` / `Phone` icon and any helper text inside the pill must inherit cream — change `text-evergreen` → `text-evergreen-foreground` for icons sitting on the new dark fill, and any `text-muted-foreground` sub-label inside the pill → `text-evergreen-foreground/75`.

### 2. `src/components/PrimaryCTA.tsx` `secondary` variant — retire the bordered green-outline-with-dark-text style
Lines 33-35 currently render:
```
border border-evergreen/40 text-foreground hover:bg-evergreen/[0.04]
```
This is the "outline button" sibling that also reads as a green-edged button with black text on hover. Two options, picking the cleaner one to match the user's "only solid-green-with-white-text" rule:
- **Replace the `secondary` variant body with the same solid evergreen + cream pair as `primary`**, but at a slightly tighter scale (e.g. `min-h-[48px]` vs primary's `56px`, no shadow stack) so it still reads as the quieter sibling — *colour-wise identical, weight-wise lighter*.
- Audit current `<PrimaryCTA variant="secondary" />` callers (rg) and make sure the demoted-to-solid-green look doesn't create two competing primary CTAs in the same viewport. If any caller is just a quiet "learn more" link, swap it to `variant="ghost"` (the underline-arrow one) instead — that variant stays as-is.

### 3. Sweep — anywhere `bg-evergreen/[0.0x]` meets `text-foreground` on an interactive element
Run a final pass against the file list below and apply the same rule: if the element is a **button or link tap-target**, lift it to solid evergreen + cream. If it's a **decorative chip / icon halo** (non-interactive), leave the pale tint — those aren't buttons and the user's rule doesn't apply.

Files to audit (already mapped):
- `src/components/QuickContactSheet.tsx` lines 205, 227 → **buttons, lift**
- `src/components/PrimaryCTA.tsx` line 34 → **button, lift via variant rewrite above**
- `src/pages/Services.tsx` line 73 → row hover wash on a `<Link>`. This is a *list-row* hover, not a button — leave it (changing it to solid evergreen would invert the whole Services page row rail). Note as an explicit exception in memory.
- `src/components/HowItGoes.tsx` line 59 → row hover, same exception, leave.
- `src/pages/ServiceAreas.tsx` 78, `NotFound.tsx` 58, `Footer.tsx` 84, `AreaPage.tsx` 184/231 → these are `icon-chip` halos around `ArrowUpRight` glyphs, **not buttons** — leave.
- `src/components/ServicesGrid.tsx` line 53 → image-plate placeholder bg, leave.

### 4. Memory update — codify the rule
Add one new core rule to `mem://index.md`:

> Any interactive element on a cream surface uses ONE button language: solid `bg-evergreen` + `text-evergreen-foreground` (cream). Never pair a pale evergreen wash (`bg-evergreen/[0.0x]`) with `text-foreground` on a button or link tap-target — that combo reads as "dark green with black text." Pale evergreen washes are reserved for **non-interactive** chrome: icon-chip halos, image-plate placeholders, and full-row hover states on list rails.

## Files touched
- `src/components/QuickContactSheet.tsx` — re-skin two step pills
- `src/components/PrimaryCTA.tsx` — rewrite `secondary` variant body
- `mem://index.md` — add the one-button-language rule

## Files explicitly NOT touched
- `Services.tsx`, `HowItGoes.tsx` row-hover washes (full-row hovers, not buttons)
- All `icon-chip` halos (decorative, not interactive)
- `ServicesGrid.tsx` image plate (placeholder, not a button)

## Verification
After the patch, grep `rg "bg-evergreen/\[0\.|bg-evergreen-soft" src --glob '!*.css'` and confirm every remaining hit is on a non-interactive element or a row-hover. Then load `/` and `/contact` in the preview, open the QuickContactSheet on mobile width, and confirm both pills now match the solid dark-green pill language of the hero CTA.
