/**
 * Haven Creek Renovations — service areas.
 * Source of truth: knowledge/2.2 §Page 9–10 + 1.5 §Rural Property Respect Standard.
 */

export interface ServiceArea {
  slug: string;
  name: string;
  href: string;
  shortLine: string;       // one-line area summary for area cards
  context: string;         // ~2 sentences, locally-aware tone
  page: {
    intro: string;         // ~3 sentences for area page hero
    fitNote: string;       // why we serve this area well
  };
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "bragg-creek",
    name: "Bragg Creek",
    href: "/service-areas/bragg-creek",
    shortLine: "Rural homes sheltered in the trees, with privacy that matters.",
    context:
      "Wooded lots, narrow drives, and homes that sit close to the land. We work in Bragg Creek with respect for access, neighbours, and the quiet that brought you here.",
    page: {
      intro:
        "Renovation work for rural homes in and around Bragg Creek — interior finishing, exterior repairs, and decking handled by one trusted contractor.",
      fitNote:
        "We treat Bragg Creek properties the way the homeowners do: with respect for the trees, the privacy, and the long-term character of the home.",
    },
  },
  {
    slug: "rocky-view-county",
    name: "Rocky View County",
    href: "/service-areas/rocky-view-county",
    shortLine: "Acreages where work is planned over years, not weekends.",
    context:
      "Rocky View properties tend to be cared for in phases — a deck this year, finishing next, exterior repairs the year after. We're built for that pace.",
    page: {
      intro:
        "Renovation support for acreage homes across Rocky View County — phased property improvements handled with continuity, not handoffs.",
      fitNote:
        "We help Rocky View homeowners plan the next thoughtful step on the property without restarting the trust-building process every time.",
    },
  },
  {
    slug: "bearspaw",
    name: "Bearspaw",
    href: "/service-areas/bearspaw",
    shortLine: "Established homes that deserve careful, discreet work.",
    context:
      "Bearspaw homeowners value discretion, refinement, and the kind of work that holds up under close inspection. The work should match the home.",
    page: {
      intro:
        "Refined renovation work for established Bearspaw homes — interior finishing, decking, and exterior care handled with quiet attention to detail.",
      fitNote:
        "Discreet working presence, careful site practice, and finishing details that reward close looking.",
    },
  },
  {
    slug: "water-valley",
    name: "Water Valley",
    href: "/service-areas/water-valley",
    shortLine: "Practical, durable work for properties that earn their keep.",
    context:
      "Water Valley homes face real weather, real distance, and real use. The work has to be planned for that — durable, dependable, and actually finished.",
    page: {
      intro:
        "Dependable renovation support for Water Valley properties — exterior repairs, decking, and interior finishing built for long winters and long roads.",
      fitNote:
        "We plan around access, weather windows, and the practical realities of working on a rural property an hour from the city.",
    },
  },
];

export const getServiceArea = (slug: string) => serviceAreas.find((a) => a.slug === slug);
