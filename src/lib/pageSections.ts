/**
 * Per-page section navigation config.
 * Maps each route to anchor links surfaced in the top-bar Section Rail.
 * Pages with fewer than 2 sections return [] (no rail rendered).
 *
 * Anchors must match `id="…"` attributes on the corresponding page sections.
 * Adding/removing entries here is the single point of truth — components
 * never hardcode section names.
 */

export interface PageSection {
  /** Display label in the rail. Keep ≤ 12 chars for the floating pill. */
  name: string;
  /** Element id (without the `#`) that the anchor scrolls to. */
  anchor: string;
}

const pageSections: Record<string, PageSection[]> = {
  "/": [
    { name: "Trust", anchor: "trust-promise" },
    { name: "Services", anchor: "services-preview" },
    { name: "Approach", anchor: "approach" },
    { name: "Work", anchor: "work-preview" },
    { name: "Areas", anchor: "areas" },
    { name: "Contact", anchor: "final-cta" },
  ],
  "/services": [
    { name: "The Three", anchor: "services-three" },
    { name: "How", anchor: "circle" },
    { name: "Quote", anchor: "quote" },
  ],
  "/services/interior-finishing": [
    { name: "Meaning", anchor: "meaning" },
    { name: "Why", anchor: "why" },
    { name: "Craft", anchor: "craft" },
    { name: "Proof", anchor: "proof" },
  ],
  "/services/exterior-finishing": [
    { name: "Needs", anchor: "needs" },
    { name: "Rural", anchor: "rural" },
    { name: "Respect", anchor: "respect" },
    { name: "Proof", anchor: "proof" },
  ],
  "/services/decking": [
    { name: "Planning", anchor: "planning" },
    { name: "Lifestyle", anchor: "lifestyle" },
    { name: "Materials", anchor: "materials" },
    { name: "Proof", anchor: "proof" },
  ],
  "/service-areas": [
    { name: "Roster", anchor: "roster" },
    { name: "Fit", anchor: "fit" },
  ],
  "/about": [
    { name: "Philosophy", anchor: "philosophy" },
    { name: "Respect", anchor: "respect" },
    { name: "Continuity", anchor: "continuity" },
    { name: "Long-term", anchor: "longterm" },
  ],
  "/contact": [
    { name: "Form", anchor: "form" },
    { name: "Process", anchor: "quote" },
    { name: "Areas", anchor: "areas" },
  ],
};

/** Returns the section anchors for the current page, or [] if none. */
export const getPageSections = (pathname: string): PageSection[] =>
  pageSections[pathname] ?? [];
