import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { DeckingVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projects } from "@/data/projects";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const PLANNING = [
  { n: "01", title: "Use & layout", body: "Where the family actually sits, eats, watches the dog, watches the weather. The deck should follow the use, not the other way around." },
  { n: "02", title: "Site & exposure", body: "Sun, wind, view, privacy, grade, and the trees you'd never cut down. The site decides more than the materials do." },
  { n: "03", title: "Materials & longevity", body: "Composite, cedar, treated lumber — chosen for the use, the climate, and how much maintenance the owner actually wants to do." },
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
        primaryCta={{ to: "/contact", label: "Talk through your decking project" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        dossier={{ sectionNo: "VI", coord: "Decking · Outdoor living", edition: "Edition I" }}
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <DeckingVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate III · Deck section
              </span>
            </div>
          </div>
        }
      />

      {/* § I — Planning considerations */}
      <RevealSection id="planning" aria-labelledby="planning-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="flex items-start justify-between gap-6">
                <Eyebrow numeral="I" label="HOW WE PLAN A DECK" />
                <span className="coord-mark hidden md:inline-flex">Three considerations</span>
              </div>
              <h2 id="planning-heading" className="text-headline text-foreground mt-6 max-w-[22ch]">
                The planning decides whether the deck gets used.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className="text-body text-muted-foreground">
                The most-used decks aren't the largest — they're the ones planned around
                a few honest answers. We start there.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {PLANNING.map((p, i) => (
              <PremiumCard
                key={p.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
                className="h-full"
              >
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <span className="numeral-disc">{p.n}</span>
                  <h3 className="text-title text-foreground mt-7">{p.title}</h3>
                  <p className="mt-4 text-body text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                    {p.body}
                  </p>
                </div>
              </PremiumCard>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Rural lifestyle pull-quote */}
      <RevealSection id="lifestyle" aria-labelledby="lifestyle-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" numeral="II" label="WHY IT MATTERS" />
            <h2 id="lifestyle-heading" className="sr-only">Why decking matters on rural property</h2>
            <p className="pull-quote text-[1.4rem] md:text-[1.65rem] mt-7 max-w-[36ch] mx-auto">
              On a rural property, a deck is the room you use most without realizing it.
              It should sit where it belongs.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Materials note */}
      <RevealSection id="materials" aria-labelledby="materials-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="III" label="MATERIALS & SCOPE" />
              <h2 id="materials-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                We recommend after we walk the site, not before.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-[55ch]">
                Material choices depend on how the deck will be used, the conditions of the
                site, the budget that makes sense for the project, and how much maintenance
                the owner actually wants to keep up with. We'll talk through the trade-offs
                clearly.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="figure-footnote mb-5">
                <span className="footnote-figmark">Fig. iii.</span>
                <span className="flex-1">SCOPES WE TAKE ON</span>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {[
                  "New deck builds",
                  "Deck rebuilds & replacements",
                  "Multi-tier & step-down platforms",
                  "Stairs, rails & gates",
                  "Privacy screens & integrated planters",
                ].map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 py-3.5">
                    <span className="numeral-mark tabular-nums text-evergreen/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-foreground/85 text-[0.95rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
      {proof && (
        <RevealSection id="proof" aria-labelledby="proof-heading" className={cn(SECTION, "section-wash cv-auto")}>
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
              <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
                <div className="flex items-start justify-between gap-6">
                  <Eyebrow numeral="IV" label="PROJECT PROOF" />
                  <span className="coord-mark hidden md:inline-flex">Plate · {proof.area}</span>
                </div>
                <h2 id="proof-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                  A wraparound deck on a Bearspaw property.
                </h2>
              </div>
            </div>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10">
                  <DeckingVignette className="absolute inset-0 w-full h-full" />
                  <span
                    className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                    aria-hidden="true"
                  >
                    Plate III
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <div className="figure-footnote mb-5">
                    <span className="footnote-figmark">Fig. iv.</span>
                    <span className="flex-1">{proof.category.toUpperCase()}</span>
                    <span className="text-evergreen/80 tabular-nums normal-case tracking-[0.18em]">{proof.area}</span>
                  </div>
                  <h3 className="text-title text-foreground">{proof.title}</h3>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { n: "01", label: "Scope", body: proof.scope },
                      { n: "02", label: "Challenge", body: proof.challenge },
                      { n: "03", label: "Result", body: proof.result },
                      { n: "04", label: "Why it mattered", body: proof.whyItMattered, italic: true },
                    ].map((row) => (
                      <div key={row.n}>
                        <p className="flex items-baseline gap-2 text-minimal text-evergreen mb-2">
                          <span className="numeral-mark tabular-nums">{row.n}</span>
                          <span>{row.label}</span>
                        </p>
                        <p
                          className={cn(
                            "text-body text-foreground/80 text-[0.95rem] leading-relaxed",
                            row.italic && "italic text-muted-foreground",
                          )}
                        >
                          {row.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/work"
                    className="group/ghost mt-8 inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
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
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default Decking;
