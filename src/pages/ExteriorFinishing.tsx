import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
// Eyebrow no longer used directly — SectionHeader carries it.
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";

import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { photography } from "@/assets/photography";
import { projects } from "@/data/projects";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const NEEDS = [
  { title: "Siding & trim repair", body: "Targeted replacement on the faces that have seen the most weather, blended back into the existing line." },
  { title: "Soffit, fascia & venting", body: "Eaves restored to a clean line; airflow corrected so the attic dries the way it should." },
  { title: "Entrances, stairs & rails", body: "The high-touch exterior details — rebuilt to feel solid and to last another decade." },
  { title: "Weather protection", body: "Sealing, flashing, and the small repairs that keep small failures from becoming big ones." },
];


const ExteriorFinishing = () => {
  useSeo({
    title: "Exterior Finishing & Repairs",
    description:
      "Durable exterior finishing and repairs for rural Alberta homes — siding, soffit, fascia, entrances, and weather-side detail work across Bragg Creek and Rocky View.",
    path: "/services/exterior-finishing",
  });

  const proof = projects.find((p) => p.category === "Exterior Repairs");

  return (
    <main id="main">
      <ServiceJsonLd
        name="Exterior Finishing & Repairs"
        description="Durable exterior finishing and repairs — siding, soffit, fascia, entrances, and weather-side details — for rural Alberta properties."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: "Exterior Finishing & Repairs", url: `${SITE}/services/exterior-finishing` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="EXTERIOR FINISHING & REPAIRS"
        headline="Practical protection for the property you keep."
        accentWord="protection"
        subhead="Repairs, finishing, and weather-facing detail work that respects the home and the land around it. Built for prairie exposure and a long horizon."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      {/* § I — Common needs (2x2 bento) */}
      <RevealSection id="needs" aria-labelledby="needs-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="needs-heading"
                title="Four kinds of exterior work, handled with one standard."
                titleWidth="wide"
                bottomGap="none"
              />
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className={cn(BODY.standard, MEASURE.prose)}>
                Most of what we do outside is preventive — catching the small failures
                before they invite the bigger ones. The rest is the visible repair work
                that brings the exterior back to a clean line.
              </p>
            </div>
          </div>

          <BentoGrid layout="2x2">
            {NEEDS.map((n, i) => (
              <div key={n.title} data-reveal style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }} className="h-full">
                <BentoTile title={n.title} body={n.body} />
              </div>
            ))}
          </BentoGrid>
        </Container>
      </RevealSection>

      {/* § II — Rural property considerations */}
      <RevealSection id="rural" aria-labelledby="rural-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="rural-heading"
                eyebrow="Rural considerations"
                title="Planned around the realities of the property."
                lede="Exterior work on a rural acreage isn't the same as a suburban repair. Weather windows, distance, access, and what's around the home all change what's possible — and when."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <ol className="divide-y divide-border/60 border-y border-border/60">
                {[
                  { title: "Weather exposure", body: "South and west faces wear differently than north and east. We plan repairs for the exposure, not the average." },
                  { title: "Seasonal timing", body: "Some work has a window. We schedule against the season so the finish has time to set up before the next snowfall." },
                  { title: "Access & distance", body: "Equipment, materials, and travel are part of the planning — not surprises that show up on the invoice." },
                  { title: "Surroundings", body: "Trees, landscaping, animal routines — what surrounds the work shapes how the work gets done." },
                ].map((step, i) => (
                  <li
                    key={step.title}
                    className="py-7 lg:py-8"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 140}ms` }}
                  >
                    <h3 className={cn(HEADLINE.card, "text-foreground")}>{step.title}</h3>
                    <p className={cn(BODY.card, "mt-3", MEASURE.prose)}>{step.body}</p>
                  </li>
                ))}
              </ol>
              <p className={cn(BODY.standard, "mt-7 italic text-foreground/75 max-w-[58ch]")}>
                We work around the land, animals, and family routines — and leave the property the way we found it, minus the work that needed doing.
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Project proof */}
      {proof && (
        <RevealSection id="proof" aria-labelledby="proof-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
          <Container size="wide">
            <h2 id="proof-heading" className={cn(EYEBROW.standard, "mb-8")} data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              Recent work
            </h2>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10 overflow-hidden">
                  <img
                    src={photography.serviceExterior}
                    alt="Exterior repair work on a Rocky View acreage — eaves and weather-side trim restored."
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <p className={cn(EYEBROW.standard, "mb-4")}>
                    {proof.category} · {proof.area}
                  </p>
                  <h3 className={cn(HEADLINE.subsection, "text-foreground")}>{proof.title}</h3>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: "Scope", body: proof.scope },
                      { label: "Challenge", body: proof.challenge },
                      { label: "Result", body: proof.result },
                      { label: "Why it mattered", body: proof.whyItMattered, italic: true },
                    ].map((row) => (
                      <div key={row.label}>
                        <p className={cn(EYEBROW.standard, "mb-2")}>{row.label}</p>
                        <p className={cn(BODY.card, row.italic && "italic")}>{row.body}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/work"
                    className="group/ghost mt-8 inline-flex items-center gap-3 text-foreground/85 hover:text-evergreen transition-colors duration-500"
                  >
                    <span>See more exterior work</span>
                    <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
                  </Link>
                </div>
              </div>
            </PremiumCard>
          </Container>
        </RevealSection>
      )}

      <BigCloseCTA
        variant="compact"
        heading="A weather-side repair, a full-property refresh, or somewhere in between."
        primary={{ to: "/contact?service=exterior-finishing", label: "Get a Free Quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default ExteriorFinishing;
