# Work Hero — Editorial Upgrade (EditorialHero parity)

## Intent
Bring `/work` up to the same cinematic register as `/about` and `/services` by swapping its `SubPageHero` for the shared `EditorialHero`. Same craft pass — photo backdrop with Ken Burns + scroll parallax, lit cream radial veil, filmic grain, ghosted serif watermark with drawing hair-rule, corner hairlines, per-word H1 clip-reveal cascade, desktop cursor parallax, bottom meta strip.

## Single move
Edit `src/pages/Work.tsx`:

- Replace the `SubPageHero` import with `EditorialHero` (`import EditorialHero from "@/components/EditorialHero"`).
- Replace the hero element with:

  ```tsx
  <EditorialHero
    headline="Real properties. Real outcomes."
    subhead="A working portfolio of recent renovation work across rural Alberta — interior finishing, exterior repairs, and decking."
    primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
    backdrop={photography.exteriorDetailSoffit}
    watermark="Work"
    locator="Foothills · Alberta"
  />
  ```

That's it. The grid + Lightbox + BigCloseCTA below stay byte-identical.

## Per-page voice
| Knob       | Value                                |
| ---------- | ------------------------------------ |
| Watermark  | `Work`                               |
| Backdrop   | `photography.exteriorDetailSoffit` (the existing hero photo — craft-cropped, tonal match) |
| Locator    | `Foothills · Alberta`                |
| Subhead    | Quiet one-liner naming the portfolio scope (currently the page has no subhead; adding one because the headline alone reads thin against the cinematic plate, and the meta description copy already says exactly this) |

## Rails preserved
- Plain `text-foreground` headline, no italic-evergreen.
- Single primary CTA, "Get a Free Quote", solid evergreen.
- Dark-on-cream, no folio, no Plate/Fig. chrome.
- Reduced-motion collapses to opacity fades.
- Photo grid below is untouched — `/work` is still "one wall of photos", just preceded by a cinematic title plate instead of a flat type slab.

## Out of scope
- `Contact` hero — separate turn (the desktop two-column split needs its own design call per memory).
- Renaming `.about-hero*` CSS selectors — wait until all four heroes have shipped.
- Memory entry for editorial-hero composition — wait for Contact decision before locking the rule.

## Technical notes
- `EditorialHero` and `photography.exteriorDetailSoffit` are already in the project; no new imports beyond the component swap.
- No CSS or component file changes. One file edited.
