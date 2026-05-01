import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
// Eyebrow no longer used directly — SectionHeader carries it.
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { ExteriorVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { photography } from "@/assets/photography";
import { projects } from "@/data/projects";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const NEEDS = [
  { n: "01", title: "Siding & trim repair", body: "Targeted replacement on the faces that have seen the most weather, blended back into the existing line." },
  { n: "02", title: "Soffit, fascia & venting", body: "Eaves restored to a clean line; airflow corrected so the attic dries the way it should." },
  { n: "03", title: "Entrances, stairs & rails", body: "The high-touch exterior details — rebuilt to feel solid and to last another decade." },
  { n: "04", title: "Weather protection", body: "Sealing, flashing, and the small repairs that keep small failures from becoming big ones." },
];

const RESPECT = [
  "Land",
  "Driveway access",
  "Equipment management",
  "Landscaping",
  "Animals",
  "Family routines",
  "Privacy",
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
        primaryCta={{ to: "/contact", label: "Get a Quote" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        dossier={{ sectionNo: "V", coord: "Exterior · Stewardship", edition: "Edition I" }}
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <ExteriorVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.75rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate II · Eave & soffit
              </span>
            </div>
          </div>
        }
      />

      {/* § I — Common needs (2x2 bento) */}
      <RevealSection id="needs" aria-labelledby="needs-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="needs-heading"
                eyebrow="What the work covers"
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
              <div key={n.n} data-reveal style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }} className="h-full">
                <BentoTile eyebrow={n.n} title={n.title} body={n.body} />
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

            <div className="lg:col-span-7 lg:pl-8 relative">
              <div className="surveyor-frame relative">
                <span className="surveyor-tr" aria-hidden="true" />
                <span className="surveyor-bl" aria-hidden="true" />
                <div
                  aria-hidden="true"
                  className="absolute left-[15px] top-3 bottom-3 w-px"
                  data-line-draw
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, hsl(var(--evergreen) / 0.45) 0 3px, transparent 3px 7px)",
                  }}
                />
                <ol className="space-y-10 lg:space-y-12">
                  {[
                    { n: "01", title: "Weather exposure", body: "South and west faces wear differently than north and east. We plan repairs for the exposure, not the average." },
                    { n: "02", title: "Seasonal timing", body: "Some work has a window. We schedule against the season so the finish has time to set up before the next snowfall." },
                    { n: "03", title: "Access & distance", body: "Equipment, materials, and travel are part of the planning — not surprises that show up on the invoice." },
                    { n: "04", title: "Surroundings", body: "Trees, landscaping, animal routines — what surrounds the work shapes how the work gets done." },
                  ].map((step, i) => (
                    <li
                      key={step.n}
                      className="relative pl-12"
                      data-reveal
                      style={{ ["--reveal-delay" as string]: `${300 + i * 180}ms` }}
                    >
                      <span className="absolute left-0 top-1 numeral-disc numeral-disc-survey">{step.n}</span>
                      <h3 className={cn(HEADLINE.card, "text-foreground")}>{step.title}</h3>
                      <p className={cn(BODY.card, "mt-3", MEASURE.prose)}>{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Property respect (bento) */}
      <RevealSection id="respect" aria-labelledby="respect-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="respect-heading"
                eyebrow="What we protect"
                title="We work around what the property already is."
                lede="A rural exterior job touches more than the building. We leave the property the way we found it — minus the work that needed doing."
                titleWidth="wide"
                bottomGap="none"
              />
            </div>
          </div>

          <BentoGrid layout="auto">
            {RESPECT.map((r, i) => (
              <div key={r} data-reveal style={{ ["--reveal-delay" as string]: `${180 + i * 80}ms` }} className="h-full">
                <BentoTile eyebrow={String(i + 1).padStart(2, "0")} title={r} compact />
              </div>
            ))}
          </BentoGrid>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
      {proof && (
        <RevealSection id="proof" aria-labelledby="proof-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
              <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
                <SectionHeader
                  id="proof-heading"
                  eyebrow="Project proof"
                  title="Stewardship on a Rocky View acreage."
                  bottomGap="none"
                />
              </div>
            </div>

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
                  <span
                    className="absolute top-4 left-5 text-[0.75rem] tracking-[0.18em] text-background/90 font-serif italic drop-shadow"
                    aria-hidden="true"
                  >
                    Plate II
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <p className={cn(EYEBROW.standard, "mb-4")}>
                    {proof.category} · {proof.area}
                  </p>
                  <h3 className={cn(HEADLINE.subsection, "text-foreground")}>{proof.title}</h3>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { n: "01", label: "Scope", body: proof.scope },
                      { n: "02", label: "Challenge", body: proof.challenge },
                      { n: "03", label: "Result", body: proof.result },
                      { n: "04", label: "Why it mattered", body: proof.whyItMattered, italic: true },
                    ].map((row) => (
                      <div key={row.n}>
                        <p className={cn(EYEBROW.standard, "mb-2")}>{row.n} · {row.label}</p>
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

      <ClosingCta
        numeral="V"
        eyebrow="DISCUSS THE WORK"
        heading="A weather-side repair, a full-property refresh, or somewhere in between."
        body="Reach out and we'll plan around the property — the access, the season, and what the home actually needs."
        primary={{ to: "/contact", label: "Get a Quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default ExteriorFinishing;
