## Problem
Both logo images (dark and cream) are RGBA with alpha channels. In `BrandMark.tsx`, the dark base logo is always rendered at full opacity while the cream overlay sits on top with `opacity: calc(1 - var(--nav-progress))`. At `scrollY=0` on the home page hero, the cream overlay is at opacity 1 but the dark logo underneath is also at opacity 1. Because both images have transparency, the dark logo bleeds through the cream one, making the brand mark look ghosted / transparent.

## Change
In `src/components/nav/BrandMark.tsx`, add an inline `opacity` style to the dark base `<img>`:

```tsx
style={{ opacity: "var(--nav-progress, 0)" }}
```

This completes the two-way crossfade:
- At `scrollY=0`: dark logo opacity = 0, cream logo opacity = 1 → only cream visible
- At `scrollY>=80px`: dark logo opacity = 1, cream logo opacity = 0 → only dark visible
- During scroll: standard crossfade with no bleed-through

No other files are touched.