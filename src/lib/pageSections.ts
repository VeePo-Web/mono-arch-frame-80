/**
 * Per-page section navigation config.
 * Maps each route to anchor links surfaced in the top-bar Section Rail.
 * Pages with fewer than 2 sections return [] (no rail rendered).
 *
 * Anchors must match `id="…"` attributes on the corresponding page sections.
 * Adding/removing entries here is the single point of truth — components
 * never hardcode section names.
 *
 * Label voice (Round 4 — "grandpa-grade"): plain English a stranger can
 * match to a page heading at a glance. Avoid abstract single-word nouns
 * ("Promise", "Approach", "Land"). Keep ≤ 18 chars so the rail fits at md.
 */

export interface PageSection {
  /** Display label in the rail. Keep ≤ 18 chars. */
  name: string;
  /** Element id (without the `#`) that the anchor scrolls to. */
  anchor: string;
}

const pageSections: Record<string, PageSection[]> = {
  "/": [
    { name: "Trust", anchor: "trust-promise" },
    { name: "Services", anchor: "services-preview" },
    { name: "How We Work", anchor: "approach" },
    { name: "Our Work", anchor: "work-preview" },
    { name: "Where We Work", anchor: "areas" },
    { name: "Contact", anchor: "final-cta" },
  ],
  "/services": [
    { name: "Services", anchor: "services-three" },
    { name: "How It Works", anchor: "circle" },
    { name: "Get a Quote", anchor: "quote" },
  ],
  "/services/interior-finishing": [
    { name: "What It Is", anchor: "meaning" },
    { name: "Why It Matters", anchor: "why" },
    { name: "How We Build", anchor: "craft" },
    { name: "Our Work", anchor: "proof" },
  ],
  "/services/exterior-finishing": [
    { name: "What It Is", anchor: "needs" },
    { name: "Rural Homes", anchor: "rural" },
    { name: "Care for Land", anchor: "respect" },
    { name: "Our Work", anchor: "proof" },
  ],
  "/services/decking": [
    { name: "Planning", anchor: "planning" },
    { name: "Outdoor Living", anchor: "lifestyle" },
    { name: "Materials", anchor: "materials" },
    { name: "Our Work", anchor: "proof" },
  ],
  "/service-areas": [
    { name: "Where We Work", anchor: "roster" },
    { name: "Coverage Area", anchor: "fit" },
  ],
  "/about": [
    { name: "Our Approach", anchor: "philosophy" },
    { name: "Care for Land", anchor: "respect" },
    { name: "Long Relationships", anchor: "continuity" },
    { name: "Built to Last", anchor: "longterm" },
  ],
  "/contact": [
    { name: "Get in Touch", anchor: "form" },
    { name: "How It Works", anchor: "quote" },
    { name: "Where We Work", anchor: "areas" },
  ],
};

/** Returns the section anchors for the current page, or [] if none. */
export const getPageSections = (pathname: string): PageSection[] =>
  pageSections[pathname] ?? [];
