# Section Audit — Home → Recent Work preview

## 1. Source of truth
- `src/components/RecentWorkPreview.tsx` (only renderer; mounted by `src/pages/Index.tsx`)
- `src/components/gallery/ProjectPlaceholder.tsx` (the tile)
- `src/data/galleryPlates.ts` (data source — 6 plates)
- `src/index.css` (`.section-y`, `.section-wash`, `[data-reveal]`)
- Core memory rules touching this section:
  - **"Home renders an inline 6-tile Recent Work preview … below the grid: a single quiet 'See all work →' underline-on-hover text link, never a button."**
  - **Gallery tiles show photo only — no title, no area, no caption strip, no per-project click target.** (User's new top-line rule, supersedes the old caption pattern.)
  - One spacing token site-wide: `.section-y`. No `SECTION_PADDING.*` legacy.
  - One motion cadence: 800ms reveal, 500ms hover, 300ms color.
  - No legacy `text-minimal` class — use `.t-eyebrow` / `.t-micro` / `.t-body`.

## 2. Findings

### Readability — ⚠
- `RecentWorkPreview.tsx:65` — caption row uses `t-title` (project title) + `t-micro` ("Category · Area"). The `t-micro` rule is `10.5px, 0.28em tracking, uppercase, muted-foreground` on a `border-foreground/10` divider. Legible, but the rule says **gallery has no description at all**, so it doesn't matter — the whole strip is going.
- "See all work" link (line 78) uses `text-minimal` (retired legacy class). Not a `t-*` token.

### Hierarchy — ⚠
- SectionHeader carries **eyebrow "Recent work"** + **title "A quiet record of recent projects."** This is a `eyebrow + section-title + no body` stack. Allowed by the memory rule (eyebrow names a different category from the title) but for the Fantasy.co/FlexServices bar it reads as one line too many. FlexServices "Selected Work" page uses one quiet eyebrow only. **Pick the simpler interpretation: keep eyebrow, drop the prose title** — the grid IS the answer.
- Tile uses an `<h3>` inside the caption strip. When the caption goes, the `h3` goes too. Page heading order becomes: H1 (Hero) → H2 (BigCloseCTA via SectionHeader inside it). Linear ✓.

### Consistency with the rest of the site — ❌
- `RecentWorkPreview.tsx:24` uses `SECTION_PADDING.standard` instead of `.section-y`. Token violation.
- `RecentWorkPreview.tsx:24` adds `section-wash` (vertical gradient on cream). Hero is plain `bg-background`. The gradient adds a subtle band that fights the "single voice" feel — **drop `section-wash`** so the home page reads as one continuous cream from Hero → grid → BigCloseCTA.
- `RecentWorkPreview.tsx:48` — tile transition is `duration-700` with `scale-[1.005]`. The Core motion rule is **500ms hover lift, transform-only**. Same rule used by `/work` (`-translate-y-1` over 500ms). Match it.
- "See all work" copy — user explicitly asked for **"See more of our work →"**.

### Simplicity / Fantasy.co test — ❌ (heavy deletion)
Strip in this order:
1. **Caption strip under every tile** (lines 60-67): hair rule + `<h3>` title + "Category · Area" meta. Gone. Tiles become photo-only.
2. **SectionHeader title prose** ("A quiet record of recent projects."). Keep just the eyebrow "Recent work" — and even that is optional. Pick: keep eyebrow as the only label.
3. **`section-wash` gradient.** Decoration that exists only to look designed.

What remains: small "Recent work" eyebrow → 6 photo tiles → "See more of our work →" text link. Three things. Fantasy.co bar.

### Motion — ⚠
- `transition-transform duration-700 ease-weighted group-hover:scale-[1.005]` → must be 500ms. Also `scale-[1.005]` is invisible on a 1280px tile (1.3px). Either bump to a meaningful lift OR remove. **Pick removal** (`/work` already provides the proper hover treatment on the gallery page itself; the home preview can stay calm and contemplative — pictures don't need to wiggle).
- `data-reveal` cascade ✓ (180ms + 70ms stagger). Within the 800ms cadence.

### Responsive — ✓ clean
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — handles 360 → 1920 cleanly. After captions are stripped, even better (no awkward wrap on long titles).

### Accessibility — ⚠ → ✓ (post-fix)
- Tile is a non-interactive `<article>` (no per-project page — correct). Removing the caption removes the only text content per tile. **Each tile now needs an accessible label**: `<figure role="img" aria-label="${title} — ${area}">` so screen-reader users still know what they're looking at. `ProjectPlaceholder` already does this in pending mode (line 78). For photo mode, the `<img alt>` carries the description — that's enough, no extra label needed on the wrapping figure. ✓.
- "See more of our work" link — `min-h` not enforced, but inline text link is fine. Underline visible by default ✓.

## 3. Fixes

### Fix A — RecentWorkPreview.tsx, full rewrite (smaller file)
Replace the entire component with:
- Section: `section-y` (no `section-wash`, no `SECTION_PADDING`).
- Top: single eyebrow row "Recent work" with the same evergreen-rule prefix used in Hero. No SectionHeader, no prose title.
- Grid: same `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9` of 6 `<ProjectPlaceholder>` plates. **No caption strip below any tile.** No `transition-transform` wrapper class.
- Footer: single `<Link to="/work">See more of our work →</Link>` with `t-eyebrow normal-case tracking-normal` style — no, simpler: keep it as a quiet underlined sentence in `text-foreground` with hover `text-evergreen` (300ms color), underline-offset-[6px], decoration evergreen/40. (Same grammar as existing, just different copy + no `text-minimal`.)
- Drop `SectionHeader` and `RevealSection` imports if unused after rewrite. Keep `ProjectPlaceholder`, `Container`, `RevealSection`.

### Fix B — ProjectPlaceholder.tsx, no changes
Already photo-only when `photoSrc` is set. Already carries truthful `alt`. No-op.

### Fix C — Files to leave untouched
- `src/data/galleryPlates.ts` — titles/areas still used elsewhere (Hero alt text, Work grid alt text, About logic). Don't touch.
- `src/pages/Index.tsx` — already correct (Hero → RecentWorkPreview → BigCloseCTA).
- `/work` grid — separate audit.

## 4. Verify
- `browser--navigate_to_sandbox` to `/` at 1440 wide → screenshot, scroll to grid.
- Resize to 390 → screenshot.
- `image_tools--zoom_image` on the grid: confirm zero text overlays/captions on tiles, only photos.
- `image_tools--zoom_image` on "See more of our work →": confirm cream background, dark foreground text, underline visible.
- `code--read_console_logs` + `code--read_runtime_errors` — clean.

## 5. Files that will change
- `src/components/RecentWorkPreview.tsx` — full rewrite, ~50 lines → ~40 lines, net deletion of caption strip + section-wash + SectionHeader prose.

## Out of scope
- Hero (shipped).
- `/work` grid (separate audit; same caption-strip removal will be needed there).
- BigCloseCTA, Nav, Footer.

## Expected diff
~25 lines deleted, ~10 lines simplified. Photos do all the talking.
