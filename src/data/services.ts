/**
 * Haven Creek Renovations — services data.
 * Source of truth: knowledge/2.2 §Page 3 + 1.5 §Finish-First Craft Signal.
 * Order is mandated: Interior Finishing first (flagship craft), then Exterior, then Decking.
 */

export interface Service {
  slug: string;
  numeral: string;
  title: string;
  shortName: string;
  promise: string;        // one-line outcome
  cardBody: string;       // 2–3 sentences for the cards
  href: string;
}

export const services: Service[] = [
  {
    slug: "interior-finishing",
    numeral: "I",
    title: "Interior Finishing",
    shortName: "Interior",
    promise: "Where a home starts to feel truly finished.",
    cardBody:
      "Trim, transitions, built-ins, and the small details that decide whether a renovation feels complete or pieced together. Hands-on attention from planning through final walk-through.",
    href: "/services/interior-finishing",
  },
  {
    slug: "exterior-finishing",
    numeral: "II",
    title: "Exterior Finishing & Repairs",
    shortName: "Exterior",
    promise: "Practical protection for the property you keep.",
    cardBody:
      "Siding, trim, entrances, stairs, railings, and weather-facing repairs handled with respect for the home and the land around it. Built for rural exposure and long-term durability.",
    href: "/services/exterior-finishing",
  },
  {
    slug: "decking",
    numeral: "III",
    title: "Decking",
    shortName: "Decking",
    promise: "Outdoor space that earns its place on the property.",
    cardBody:
      "Decks planned around how you actually live on the land — privacy, exposure, structure, and materials chosen to last. A practical extension of the home, not a tacked-on feature.",
    href: "/services/decking",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
