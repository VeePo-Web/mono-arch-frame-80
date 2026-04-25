import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { GalleryVignette } from "@/components/gallery/GalleryVignettes";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { galleryPlates, type PlateCategory } from "@/data/galleryPlates";

const SECTION = "py-24 md:py-32";
const SITE = "https://havencreekrenovations.ca";

type Filter = "All" | PlateCategory | "Bragg Creek" | "Rocky View County" | "Bearspaw" | "Water Valley";

const FILTERS: { label: Filter; group: "category" | "area" | "all" }[] = [
  { label: "All", group: "all" },
  { label: "Interior Finishing", group: "category" },
  { label: "Exterior Repairs", group: "category" },
  { label: "Decking", group: "category" },
  { label: "Bragg Creek", group: "area" },
  { label: "Rocky View County", group: "area" },
  { label: "Bearspaw", group: "area" },
  { label: "Water Valley", group: "area" },
];

const Work = () => {
  useSeo({
    title: "Our Work — Selected Projects",
    description:
      "A selected collection of recent renovation work across rural Alberta — interior finishing, exterior repairs, and decking on properties in Bragg Creek, Bearspaw, and area.",
    path: "/work",
  });

  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return galleryPlates;
    return galleryPlates.filter(
      (p) => p.category === filter || p.area === filter,
    );
  }, [filter]);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Our Work", url: `${SITE}/work` },
        ]}
      />

      <SubPageHero
        eyebrowNumeral="·"
        eyebrowLabel="THE WORK"
        headline="Real properties. Real outcomes. Worth a closer look."
        accentWord="closer"
        subhead="Each plate is a record of a real project — what we found, what we did, and what changed for the homeowner."
        primaryCta={{ to: "/contact", label: "Discuss similar work" }}
        secondaryCta={{ to: "/services", label: "Our services" }}
        coordMark={`${galleryPlates.length} plates · Edition I`}
      />

      {/* § I — Filter rail */}
      <RevealSection aria-labelledby="filter-heading" className="pt-4 pb-8 md:pt-8 md:pb-12">
        <Container size="wide">
          <h2 id="filter-heading" className="sr-only">Filter projects</h2>
          <div
            role="tablist"
            aria-label="Filter projects by category or area"
            className="flex flex-wrap gap-2 md:gap-3"
            data-reveal
            style={{ ["--reveal-delay" as string]: "0ms" }}
          >
            {FILTERS.map((f) => {
              const active = filter === f.label;
              return (
                <button
                  key={f.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.label)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-minimal",
                    "transition-all duration-500 ease-swift border",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active
                      ? "bg-evergreen text-evergreen-foreground border-evergreen"
                      : "bg-transparent text-foreground/75 border-border hover:border-evergreen/40 hover:text-foreground",
                  )}
                >
                  {f.group === "area" && (
                    <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-background/70" : "bg-evergreen/50")} />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Plate grid */}
      <RevealSection aria-labelledby="grid-heading" className={cn(SECTION, "section-wash pt-0 md:pt-0")}>
        <Container size="wide">
          <h2 id="grid-heading" className="sr-only">Project plates</h2>

          {visible.length === 0 ? (
            <div
              className="max-w-xl mx-auto text-center py-20"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <div className="figure-footnote justify-center mb-5">
                <span className="footnote-figmark">Fig. —.</span>
                <span>NO PLATES YET</span>
              </div>
              <p className="text-body text-muted-foreground">
                No plates in this category yet. We're adding work as it's photographed.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
              {visible.map((p, i) => (
                <article
                  key={p.slug}
                  className="group"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <PremiumCard className="h-full transition-transform duration-700 ease-weighted group-hover:-translate-y-1">
                    <div className="flex flex-col h-full">
                      <div className="relative aspect-[4/3] overflow-hidden border-b border-evergreen/10">
                        <GalleryVignette
                          vignetteKey={p.vignetteKey}
                          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-weighted group-hover:scale-[1.015]"
                        />
                        <span
                          className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                          aria-hidden="true"
                        >
                          Plate {p.romanNumeral}
                        </span>
                      </div>

                      <div className="px-7 lg:px-8 pt-5">
                        <div className="figure-footnote">
                          <span className="footnote-figmark">Fig. {p.figmark}.</span>
                          <span className="flex-1">{p.category.toUpperCase()}</span>
                          <span className="text-evergreen/55 tabular-nums normal-case tracking-[0.18em]">{p.area}</span>
                        </div>
                      </div>

                      <div className="p-7 lg:p-8 pt-4 flex flex-col flex-1">
                        <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                          {p.title}
                        </h3>
                        <p className="mt-4 text-body text-foreground/80 text-[0.95rem] leading-relaxed flex-1">
                          {p.scope}
                        </p>
                        <div className="mt-5 pl-4 border-l-2 border-evergreen/35">
                          <p className="text-minimal text-evergreen mb-1.5">Why it mattered</p>
                          <p className="text-body text-muted-foreground italic text-[0.95rem]">
                            {p.whyItMattered}
                          </p>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </article>
              ))}
            </div>
          )}
        </Container>
      </RevealSection>

      <ClosingCta
        numeral="·"
        eyebrow="WORK LIKE THIS"
        heading="See a project that resembles yours? Let's talk through it."
        body="Most of our work begins with a homeowner pointing at a plate and saying — that one, but for our property."
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/services", label: "Browse services" }}
      />
    </main>
  );
};

export default Work;
