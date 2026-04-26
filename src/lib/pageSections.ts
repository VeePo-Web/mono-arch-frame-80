/**
 * Per-page section navigation config.
 * Maps each route to anchor links surfaced in the top-bar Section Rail.
 * Pages with fewer than 2 sections return [] (no rail rendered).
 *
 * Anchors must match `id="…"` attributes on the corresponding page sections.
 * Adding/removing entries here is the single point of truth — components
 * never hardcode section names.
 *
 * Label voice: concrete, plain English — readers should recognise the
 * label as a section's own name without translation. Keep ≤ 14 chars
 * so the floating pill never wraps.
 */

export interface PageSection {
  /** Display label in the rail. Keep ≤ 14 chars. */
  name: string;
  /** Element id (without the `#`) that the anchor scrolls to. */
  anchor: string;
}

const pageSections: Record<string, PageSection[]> = {
  "/": [
    { name: "Promise", anchor: "trust-promise" },
    { name: "Services", anchor: "services-preview" },
    { name: "Approach", anchor: "approach" },
    { name: "Work", anchor: "work-preview" },
    { name: "Areas", anchor: "areas" },
    { name: "Contact", anchor: "final-cta" },
  ],
  "/services": [
    { name: "Services", anchor: "services-three" },
    { name: "Process", anchor: "circle" },
    { name: "Quote", anchor: "quote" },
  ],
  "/services/interior-finishing": [
    { name: "Overview", anchor: "meaning" },
    { name: "Why", anchor: "why" },
    { name: "Craft", anchor: "craft" },
    { name: "Recent Work", anchor: "proof" },
  ],
  "/services/exterior-finishing": [
    { name: "Overview", anchor: "needs" },
    { name: "Rural", anchor: "rural" },
    { name: "Stewardship", anchor: "respect" },
    { name: "Recent Work", anchor: "proof" },
  ],
  "/services/decking": [
    { name: "Planning", anchor: "planning" },
    { name: "Outside", anchor: "lifestyle" },
    { name: "Materials", anchor: "materials" },
    { name: "Recent Work", anchor: "proof" },
  ],
  "/service-areas": [
    { name: "Areas", anchor: "roster" },
    { name: "A Fit?", anchor: "fit" },
  ],
  "/about": [
    { name: "Philosophy", anchor: "philosophy" },
    { name: "Land", anchor: "respect" },
    { name: "Continuity", anchor: "continuity" },
    { name: "Long View", anchor: "longterm" },
  ],
  "/contact": [
    { name: "Get in Touch", anchor: "form" },
    { name: "Process", anchor: "quote" },
    { name: "Areas", anchor: "areas" },
  ],
};

/** Returns the section anchors for the current page, or [] if none. */
export const getPageSections = (pathname: string): PageSection[] =>
  pageSections[pathname] ?? [];
