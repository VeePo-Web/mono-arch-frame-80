import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
// Eyebrow no longer used directly — SectionHeader carries it.
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import InfoCard from "@/components/ui/InfoCard";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { photography } from "@/assets/photography";
import { projects } from "@/data/projects";
import { HEADLINE, BODY, EYEBROW } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const CRAFT = [
  {
    title: "Transitions",
    body:
      "Where one material meets another — flooring to tile, trim to wall, casing to baseboard. Resolved cleanly so the eye doesn't catch.",
  },
  {
    title: "Edges",
    body:
      "Mitres that close, reveals that read straight, returns that resolve. The edges are where careless work shows up first.",
  },
  {
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
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
      />

      {/* § I — What it means + craft details */}
      <RevealSection id="meaning" aria-labelledby="meaning-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="meaning-heading"
                title="Interior finishing is the work that holds the rest together."
                lede="It's the part of a renovation that decides whether a room feels resolved or merely complete. Trim that lands where it should. Transitions that don't fight one another. Built-ins that sit against the wall the way they were drawn."
                bottomGap="none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" id="craft">
            {CRAFT.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <InfoCard title={c.title} body={c.body} />
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
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
                    src={photography.serviceInterior}
                    alt="Interior finishing detail — trim and transition work in a recently completed rural home."
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
                    <span>See more interior work</span>
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
        heading="Tell us about the interior finishing on your mind."
        primary={{ to: "/contact?service=interior-finishing", label: "Get a Free Quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default InteriorFinishing;
