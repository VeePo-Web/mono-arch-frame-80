/**
 * Routes where the nav should be transparent at the very top of the page.
 * Excludes form-centric routes where a clear bar reads as more trustworthy.
 */
export const routeHasTransparentTop = (pathname: string): boolean => {
  if (pathname === "/contact" || pathname === "/thank-you") return false;
  return true;
};

export type PageSection = { id: string; label: string };

/**
 * Per-route in-page section anchors for the desktop inline nav row.
 * The row only renders when a route has ≥2 sections (NavLinks returns null
 * otherwise) — single-section pages collapse to a clean Logo · right cluster
 * silhouette.
 */
const SECTIONS_BY_ROUTE: Record<string, PageSection[]> = {
  "/": [
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
  "/about": [
    { id: "how-we-work", label: "How we work" },
    { id: "areas", label: "Areas" },
  ],
};

export const getSectionsForRoute = (pathname: string): PageSection[] =>
  SECTIONS_BY_ROUTE[pathname] ?? [];
