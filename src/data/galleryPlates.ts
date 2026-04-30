/**
 * Gallery plates — six selected works for the editorial Selected Works section.
 * Per knowledge/2.1 §Project Gallery as Primary Proof Engine + 2.2 §Page 8.
 * Each plate carries scope / challenge / result / why-it-mattered, plus a
 * vignetteKey that resolves to one of six architectural line-drawings.
 */

export type PlateCategory = "Interior Finishing" | "Exterior Repairs" | "Decking";

export type PlateVignetteKey =
  | "interior-trim"
  | "interior-shelving"
  | "exterior-siding"
  | "exterior-soffit"
  | "decking-wraparound"
  | "decking-stepdown";

export interface GalleryPlate {
  slug: string;
  romanNumeral: string;     // "IV", "V", … — continues from the preview's I–III
  figmark: string;          // "iv", "v", … — lowercase Fraunces italic
  title: string;
  category: PlateCategory;
  area: string;
  scope: string;
  challenge: string;
  result: string;
  whyItMattered: string;
  vignetteKey: PlateVignetteKey;
}

export const galleryPlates: GalleryPlate[] = [
  {
    slug: "bragg-creek-trim-transitions",
    romanNumeral: "IV",
    figmark: "iv",
    title: "Trim & transition rework",
    category: "Interior Finishing",
    area: "Bragg Creek",
    scope:
      "Main-floor trim, casings, and transition details across four rooms of a long-occupied family home.",
    challenge:
      "Earlier trades had left edges that didn't quite line up. Transitions between rooms fought one another.",
    result:
      "A main floor that finally reads as one space — every casing landing where it should, every transition resolved.",
    whyItMattered:
      "Owners stopped noticing the unfinished details and started noticing the home again.",
    vignetteKey: "interior-trim",
  },
  {
    slug: "water-valley-builtin-shelving",
    romanNumeral: "V",
    figmark: "v",
    title: "Built-in library shelving",
    category: "Interior Finishing",
    area: "Water Valley",
    scope:
      "Wall-spanning built-in shelving with concealed structural support and integrated baseboard return.",
    challenge:
      "An out-of-plumb wall and irregular floor meant nothing could be cut to a single template.",
    result:
      "Shelves read as part of the architecture. Every reveal sits flush; every shelf sits level despite the wall behind it.",
    whyItMattered:
      "A reading room the family uses every evening, instead of a wall the family stopped looking at.",
    vignetteKey: "interior-shelving",
  },
  {
    slug: "rocky-view-siding-repair",
    romanNumeral: "VI",
    figmark: "vi",
    title: "Exterior craft & detail work",
    category: "Exterior Repairs",
    area: "Rocky View County",
    scope:
      "Beam, ceiling, and structural detail work bringing an acreage home's main volume back to a finished baseline.",
    challenge:
      "Years of weather and earlier patch jobs had left the structure honest but tired. Smaller failures were inviting bigger ones.",
    result:
      "Spaces back to a maintenance baseline — repaired, sealed, and ready for the next decade.",
    whyItMattered:
      "Stewardship work that protects everything else the owner has invested in the property.",
    vignetteKey: "exterior-siding",
  },
  {
    slug: "bearspaw-soffit-fascia",
    romanNumeral: "VII",
    figmark: "vii",
    title: "Structural & roofline work",
    category: "Exterior Repairs",
    area: "Bearspaw",
    scope:
      "Roof framing rebuild around a gable end, opened up to correct earlier work and prepare a sound deck for finish.",
    challenge:
      "Original roof framing had been compromised during an earlier job. Moisture was beginning to find its way in.",
    result:
      "Roofline restored to a clean line; the structure ready for the next layer to land properly.",
    whyItMattered:
      "Solving the cause of a problem before the visible damage forced a much larger repair.",
    vignetteKey: "exterior-soffit",
  },
  {
    slug: "bearspaw-wraparound-deck",
    romanNumeral: "VIII",
    figmark: "viii",
    title: "Wraparound deck rebuild",
    category: "Decking",
    area: "Bearspaw",
    scope:
      "Replacement deck planned around privacy, view, and how the family actually uses the back of the home.",
    challenge:
      "The original deck didn't match how the family lived on the property. Layout, exposure, and access all needed rethinking.",
    result:
      "A deck that became the most-used room of the house — properly framed, properly drained, properly finished.",
    whyItMattered:
      "Outdoor living that respects the land it sits on.",
    vignetteKey: "decking-wraparound",
  },
  {
    slug: "water-valley-stepdown-platform",
    romanNumeral: "IX",
    figmark: "ix",
    title: "Step-down platform & stair",
    category: "Decking",
    area: "Water Valley",
    scope:
      "Two-tier deck with a step-down platform and integrated stair, framed to follow a sloped grade.",
    challenge:
      "A steep grade and an established tree line ruled out a single-level deck. The platforms had to follow the land.",
    result:
      "A pair of platforms that feel inevitable on the site — connected, not stacked.",
    whyItMattered:
      "An outdoor space that finally uses the part of the property that always felt unreachable.",
    vignetteKey: "decking-stepdown",
  },
];

export const getPlateBySlug = (slug: string) =>
  galleryPlates.find((p) => p.slug === slug);
