import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import InfoCard from "@/components/ui/InfoCard";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { InteriorVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projects } from "@/data/projects";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const DETAILS = [
  { n: "01", label: "Trim & casings" },
  { n: "02", label: "Door & window transitions" },
  { n: "03", label: "Baseboard returns" },
  { n: "04", label: "Hardware fit" },
  { n: "05", label: "Edge alignment" },
  { n: "06", label: "Built-in joinery" },
];

const CRAFT = [
  {
    n: "01",
    title: "Transitions",
    body:
      "Where one material meets another — flooring to tile, trim to wall, casing to baseboard. Resolved cleanly so the eye doesn't catch.",
  },
  {
    n: "02",
    title: "Edges",
    body:
      "Mitres that close, reveals that read straight, returns that resolve. The edges are where careless work shows up first.",
  },
  {
    n: "03",
    title: "Fit",
    body:
      "Built-ins and millwork that sit against the wall the way they should — even when the wall, floor, or ceiling won't quite cooperate.",
  },
];

const InteriorFinishing = () => {
  useSeo({
    title: "Interior Finishing for Rural Homes",
    description:
      "Trim, transitions, built-ins, and the small details that decide whether a renovation feels finished. Hands-on interior finishing across Bragg Creek, Bearspaw, and area.",
    path: "/services/interior-finishing",
  });

  const proof = projects.find((p) => p.category === "Interior Finishing");

  return (
    <main id="main">
      <ServiceJsonLd
        name="Interior Finishing"
        description="Trim, transitions, built-ins, and the small details that decide whether a renovation reads as finished."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: "Interior Finishing", url: `${SITE}/services/interior-finishing` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="INTERIOR FINISHING"
        headline="Where a home starts to feel finished."
        accentWord="finished"
        subhead="The visible part of the work — the part you'll see and feel every day. Detail, fit, and the small resolutions that decide whether a renovation reads as complete."
        primaryCta={{ to: "/contact", label: "Discuss interior finishing" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        dossier={{ sectionNo: "IV", coord: "Interior · Flagship craft", edition: "Edition I" }}
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <InteriorVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.75rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate I · Cabinetry section
              </span>
            </div>
          </div>
        }
      />

      {/* § I — What it means + details bento */}
      <RevealSection id="meaning" aria-labelledby="meaning-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="I" label="WHAT THE WORK COVERS" />
              <h2 id="meaning-heading" className={cn(HEADLINE.section, "text-foreground mt-6 max-w-[20ch]")}>
                Interior finishing is the work that holds the rest together.
              </h2>
              <p className={cn(BODY.large, "mt-7", MEASURE.prose)}>
                It's the part of a renovation that decides whether a room feels resolved
                or merely complete. Trim that lands where it should. Transitions that
                don't fight one another. Built-ins that sit against the wall the way they
                were drawn.
              </p>
            </div>
          </div>

          <div data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
            <p className={cn(EYEBROW.quiet, "mb-5")}>Details we obsess over</p>
            <BentoGrid layout="auto">
              {DETAILS.map((d) => (
                <BentoTile key={d.n} eyebrow={d.n} title={d.label} compact />
              ))}
            </BentoGrid>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Why it matters (pull quote) */}
      <RevealSection id="why" aria-labelledby="why-heading" className={cn(SECTION_PADDING.compact, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" numeral="II" label="WHY IT MATTERS" />
            <h2 id="why-heading" className="sr-only">Why interior finishing matters</h2>
            <p className={cn(BODY.quote, "mt-7 max-w-[34ch] mx-auto")}>
              This is the part you see and feel every day. It either rewards a closer look,
              or it doesn't.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Craft & detail (3 InfoCards w/ vignette) */}
      <RevealSection id="craft" aria-labelledby="craft-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="III" label="CRAFT & DETAIL" />
              <h2 id="craft-heading" className={cn(HEADLINE.section, "text-foreground mt-6 max-w-[20ch]")}>
                Three details that decide the read of a finished room.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {CRAFT.map((c, i) => (
              <div
                key={c.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <InfoCard
                  eyebrow={`Detail ${c.n}`}
                  title={c.title}
                  body={c.body}
                  media={
                    <div className="relative aspect-[4/3]">
                      <InteriorVignette className="absolute inset-0 w-full h-full" />
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
      {proof && (
        <RevealSection id="proof" aria-labelledby="proof-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
              <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
                <Eyebrow numeral="IV" label="PROJECT PROOF" />
                <h2 id="proof-heading" className={cn(HEADLINE.section, "text-foreground mt-6 max-w-[20ch]")}>
                  A recent interior, finished as it should be.
                </h2>
              </div>
            </div>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10">
                  <InteriorVignette className="absolute inset-0 w-full h-full" />
                  <span
                    className="absolute top-4 left-5 text-[0.75rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                    aria-hidden="true"
                  >
                    Plate I
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
                        <p className={cn(EYEBROW.standard, "mb-2")}>
                          {row.n} · {row.label}
                        </p>
                        <p className={cn(BODY.card, row.italic && "italic")}>{row.body}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/work"
                    className="group/ghost mt-8 inline-flex items-center gap-3 text-foreground/85 hover:text-evergreen transition-colors duration-500"
                  >
                    <span>See more interior work</span>
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
        heading="Tell us about the interior finishing on your mind."
        body="Whether it's a single room or a whole-floor finish, we're glad to walk through the property and talk it through."
        primary={{ to: "/contact", label: "Get a Quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default InteriorFinishing;
