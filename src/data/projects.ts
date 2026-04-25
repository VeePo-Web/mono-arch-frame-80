/**
 * Project gallery placeholders — to be replaced as real photography arrives.
 * Per knowledge/2.2 §Page 8 + 2.1 §Project Gallery as Primary Proof Engine,
 * each card carries: type / location / scope / challenge / result / why it mattered.
 *
 * Until real photographs are supplied, the cards render as quiet caption-led tiles
 * (no fake luxury stock — see 1.5 §Dealbreakers).
 */

export type ProjectCategory = "Interior Finishing" | "Exterior Repairs" | "Decking";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  area: string;
  scope: string;
  challenge: string;
  result: string;
  whyItMattered: string;
}

export const projects: Project[] = [
  {
    slug: "bragg-creek-interior-finishing",
    title: "Interior finishing — Bragg Creek family home",
    category: "Interior Finishing",
    area: "Bragg Creek",
    scope:
      "Trim, transitions, and finishing details across the main floor of a long-occupied rural home.",
    challenge:
      "Several rooms had been left almost-finished by previous trades — edges that didn't quite line up, transitions that fought each other.",
    result:
      "A main floor that finally reads as one space. Every transition resolved, every edge sitting where it should.",
    whyItMattered:
      "Owners stopped noticing the unfinished details and started noticing the home again.",
  },
  {
    slug: "rocky-view-exterior-repairs",
    title: "Exterior repairs — Rocky View acreage",
    category: "Exterior Repairs",
    area: "Rocky View County",
    scope: "Siding repairs, trim replacement, and weather-side detail work on a multi-building acreage.",
    challenge:
      "Years of prairie weather had worn through the south and west exposures. Smaller failures were starting to invite bigger ones.",
    result:
      "The property's exterior is back to a maintenance baseline — sealed, repaired, and ready for the next decade of weather.",
    whyItMattered:
      "Stewardship work that protects everything else the owner has invested in the property.",
  },
  {
    slug: "bearspaw-deck-build",
    title: "Deck build — Bearspaw rural property",
    category: "Decking",
    area: "Bearspaw",
    scope:
      "Replacement deck planned around privacy, view, and the way the family actually uses the back of the home.",
    challenge:
      "The original deck didn't match how the family lived on the property. Layout, exposure, and access all needed rethinking.",
    result:
      "A deck that became the most-used room of the house — properly framed, properly drained, properly finished.",
    whyItMattered:
      "Outdoor living that respects the land it sits on.",
  },
];
