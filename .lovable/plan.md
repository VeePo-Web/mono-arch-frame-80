## Add Cory's contact details to the footer

### What
Add Cory's email (`coryschwindt@gmail.com`) and phone (`403 970-7691`) to the site footer so they are visible on both desktop and mobile.

### How
1. **Consolidate email constant** — add `STUDIO_EMAIL = "coryschwindt@gmail.com"` to `src/lib/studioContact.ts` so phone and email share one source of truth.
2. **Deduplicate** — replace the three hardcoded `coryschwindt@gmail.com` strings in `Contact.tsx`, `QuickContactSheet.tsx`, `ContactBrandStack.tsx`, and `MenuOverlay.tsx` with imports from `studioContact.ts`.
3. **Update Footer** — insert email + phone into the existing bottom row of `src/components/Footer.tsx` as quiet `.t-micro` text links (tel:+14039707691 and mailto:) so they sit alongside the current pages nav and locator. Both rows remain structurally identical; no extra rows or grids are introduced.

### No visual system changes
Footer keeps its two-row layout, hair rule, and existing typography tokens. Contact links use the same `.t-micro` size and `hover:text-evergreen` transition already used by footer page links.