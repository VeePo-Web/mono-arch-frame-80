import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { InteriorVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projects } from "@/data/projects";

const SECTION = "py-24 md:py-32";
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
      "Built-ins and millwork that sit against the wall the way they should — even when the wall, the floor, or the ceiling won't quite cooperate.",
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
        eyebrowNumeral="I"
        eyebrowLabel="INTERIOR FINISHING"
        headline="Where a home starts to feel finished."
        accentWord="finished"
        subhead="The visible part of the work — the part you'll see and feel every day. Detail, fit, and the small resolutions that decide whether a renovation reads as complete."
        primaryCta={{ to: "/contact", label: "Discuss interior finishing" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        coordMark="Service No. I · Flagship craft"
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <InteriorVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate I · Cabinetry section
              </span>
            </div>
          </div>
        }
      />

      {/* § I — What it means */}
      <RevealSection aria-labelledby="meaning-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="flex items-start justify-between gap-6">
                <Eyebrow numeral="I" label="WHAT THE WORK COVERS" />
                <span className="coord-mark hidden md:inline-flex">Detail · Fit · Finish</span>
              </div>
              <h2 id="meaning-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                Interior finishing is the work that holds the rest together.
              </h2>
              <p className="mt-7 text-body text-muted-foreground max-w-[55ch]">
                It's the part of a renovation that decides whether a room feels resolved or
                merely complete. Trim that lands where it should. Transitions that don't
                fight one another. Built-ins that sit against the wall the way they were
                drawn. We treat the finishing as the work, not the wrap-up.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="figure-footnote mb-5">
                <span className="footnote-figmark">Fig. i.</span>
                <span className="flex-1">DETAILS WE OBSESS OVER</span>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {DETAILS.map((d) => (
                  <li key={d.n} className="flex items-baseline gap-4 py-3.5">
                    <span className="numeral-mark tabular-nums text-evergreen/70">{d.n}</span>
                    <span className="text-body text-foreground/85 text-[0.95rem]">{d.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Why it matters (pull quote) */}
      <RevealSection aria-labelledby="why-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" numeral="II" label="WHY IT MATTERS" />
            <h2 id="why-heading" className="sr-only">Why interior finishing matters</h2>
            <p className="pull-quote text-[1.4rem] md:text-[1.65rem] mt-7 max-w-[34ch] mx-auto">
              This is the part you see and feel every day. It either rewards a closer look,
              or it doesn't.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Craft & detail */}
      <RevealSection aria-labelledby="craft-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="flex items-start justify-between gap-6">
                <Eyebrow numeral="III" label="CRAFT & DETAIL" />
                <span className="coord-mark hidden md:inline-flex">Three close-ups</span>
              </div>
              <h2 id="craft-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                Three details that decide the read of a finished room.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {CRAFT.map((c, i) => (
              <article
                key={c.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <PremiumCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-evergreen/10">
                      <InteriorVignette className="absolute inset-0 w-full h-full" />
                      <span
                        className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                        aria-hidden="true"
                      >
                        Detail {c.n}
                      </span>
                    </div>
                    <div className="px-8 lg:px-9 pt-6">
                      <div className="figure-footnote">
                        <span className="footnote-figmark">Fig. {["a","b","c"][i]}.</span>
                        <span className="flex-1">{c.title.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-9 pt-5 flex-1">
                      <h3 className="text-title text-foreground">{c.title}</h3>
                      <p className="mt-4 text-body text-muted-foreground text-[0.95rem] leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </article>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
      {proof && (
        <RevealSection aria-labelledby="proof-heading" className={cn(SECTION, "section-wash cv-auto")}>
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
              <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
                <div className="flex items-start justify-between gap-6">
                  <Eyebrow numeral="IV" label="PROJECT PROOF" />
                  <span className="coord-mark hidden md:inline-flex">Plate · Bragg Creek</span>
                </div>
                <h2 id="proof-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                  A recent interior, finished as it should be.
                </h2>
              </div>
            </div>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10">
                  <InteriorVignette className="absolute inset-0 w-full h-full" />
                  <span
                    className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                    aria-hidden="true"
                  >
                    Plate I
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <div className="figure-footnote mb-5">
                    <span className="footnote-figmark">Fig. iv.</span>
                    <span className="flex-1">{proof.category.toUpperCase()}</span>
                    <span className="text-evergreen/55 tabular-nums normal-case tracking-[0.18em]">{proof.area}</span>
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
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default InteriorFinishing;
