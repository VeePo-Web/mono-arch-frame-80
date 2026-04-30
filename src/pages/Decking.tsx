import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import InfoCard from "@/components/ui/InfoCard";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { DeckingVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projects } from "@/data/projects";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const PLANNING = [
  { n: "01", title: "Use & layout", body: "Where the family actually sits, eats, watches the dog, watches the weather. The deck should follow the use." },
  { n: "02", title: "Site & exposure", body: "Sun, wind, view, privacy, grade, and the trees you'd never cut down. The site decides more than the materials do." },
  { n: "03", title: "Materials & longevity", body: "Composite, cedar, treated lumber — chosen for the use, the climate, and how much maintenance the owner actually wants." },
];

const SCOPES = [
  "New deck builds",
  "Deck rebuilds & replacements",
  "Multi-tier & step-down platforms",
  "Stairs, rails & gates",
  "Privacy screens & integrated planters",
];

const Decking = () => {
  useSeo({
    title: "Decking for Rural Properties",
    description:
      "Decks built for how rural homeowners live on the land — privacy, exposure, view, and durability planned together. Serving Bragg Creek, Bearspaw, and area.",
    path: "/services/decking",
  });

  const proof = projects.find((p) => p.category === "Decking");

  return (
    <main id="main">
      <ServiceJsonLd
        name="Decking"
        description="Decks planned around how the family actually uses the property — privacy, exposure, structure, and materials chosen for long-term durability."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: "Decking", url: `${SITE}/services/decking` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="DECKING"
        headline="Outdoor space that earns its place."
        accentWord="earns"
        subhead="A deck is a way to live better on the property. We plan it around how you actually use the back of your home — and build it to stay there."
        primaryCta={{ to: "/contact", label: "Get a Quote" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        dossier={{ sectionNo: "VI", coord: "Decking · Outdoor living", edition: "Edition I" }}
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <DeckingVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.75rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate III · Deck section
              </span>
            </div>
          </div>
        }
      />

      {/* § I — Planning (3 InfoCards) */}
      <RevealSection id="planning" aria-labelledby="planning-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="planning-heading"
                eyebrow="How we plan a deck"
                title="The planning decides whether the deck gets used."
                titleWidth="wide"
                bottomGap="none"
              />
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className={cn(BODY.standard, MEASURE.prose)}>
                The most-used decks aren't the largest — they're the ones planned around
                a few honest answers. We start there.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PLANNING.map((p, i) => (
              <div key={p.n} data-reveal style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}>
                <InfoCard eyebrow={p.n} title={p.title} body={p.body} featured={i === 0} />
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Pull quote */}
      <RevealSection id="lifestyle" aria-labelledby="lifestyle-heading" className={cn(SECTION_PADDING.compact, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" label="Why it matters" />
            <h2 id="lifestyle-heading" className="sr-only">Why decking matters on rural property</h2>
            <p className={cn(BODY.quote, "mt-7 max-w-[36ch] mx-auto")}>
              On a rural property, a deck is the room you use most without realizing it.
              It should sit where it belongs.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Scopes (bento) */}
      <RevealSection id="materials" aria-labelledby="materials-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="materials-heading"
                eyebrow="Materials & scope"
                title="We recommend after we walk the site, not before."
                lede="Material choices depend on how the deck will be used, the conditions of the site, the budget, and how much maintenance the owner actually wants to keep up with. We'll talk through the trade-offs clearly."
                titleWidth="wide"
                bottomGap="none"
              />
            </div>
          </div>

          <BentoGrid layout="auto">
            {SCOPES.map((s, i) => (
              <div key={s} data-reveal style={{ ["--reveal-delay" as string]: `${180 + i * 80}ms` }} className="h-full">
                <BentoTile eyebrow={String(i + 1).padStart(2, "0")} title={s} compact />
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
                <Eyebrow numeral="IV" label="PROJECT PROOF" />
                <h2 id="proof-heading" className={cn(HEADLINE.section, "text-foreground mt-6 max-w-[20ch]")}>
                  A wraparound deck on a Bearspaw property.
                </h2>
              </div>
            </div>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10">
                  <DeckingVignette className="absolute inset-0 w-full h-full" />
                  <span
                    className="absolute top-4 left-5 text-[0.75rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                    aria-hidden="true"
                  >
                    Plate III
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <p className={cn(EYEBROW.standard, "mb-4")}>{proof.category} · {proof.area}</p>
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
                    <span>See more decking work</span>
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
        heading="A new deck, a rebuild, or something planned for next season."
        body="Tell us how you'd like to use the back of the property. We'll plan around the site and the way you actually live there."
        primary={{ to: "/contact", label: "Get a Quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default Decking;
