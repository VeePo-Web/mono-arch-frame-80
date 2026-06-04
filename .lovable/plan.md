## Remove "Get a Free Quote" CTA from MenuOverlay

The user wants the oversized "Get a Free Quote" button removed from the full-screen `MenuOverlay`. The header already exposes this CTA inline on desktop, and the overlay's contact rail provides direct phone/email access.

### Scope
- **MenuOverlay.tsx** — remove the CTA `<Link>` block (lines ~153–172) and the `handleQuoteClick` helper that only existed to route that button to the mobile quick-contact sheet.
- No changes to the header bar, route list, contact rail, or overlay animations.
- No changes to the `openQuickContact` system itself — other callers remain intact.