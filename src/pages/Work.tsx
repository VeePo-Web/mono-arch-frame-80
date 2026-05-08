import { useMemo, useState } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import ProjectPlaceholder from "@/components/gallery/ProjectPlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { galleryPlates, type PlateCategory } from "@/data/galleryPlates";
import { workPhotos } from "@/assets/photography";
import { HEADLINE, BODY, EYEBROW } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

type TypeFilter = "All" | PlateCategory;
type AreaFilter = "All" | "Bragg Creek" | "Rocky View County" | "Bearspaw" | "Water Valley";

const TYPE_FILTERS: TypeFilter[] = ["All", "Interior Finishing", "Exterior Repairs", "Decking"];
const AREA_FILTERS: AreaFilter[] = ["All", "Bragg Creek", "Rocky View County", "Bearspaw", "Water Valley"];

const Work = () => {
  useSeo({
    title: "Our Work — Selected Projects",
    description:
      "A selected collection of recent renovation work across rural Alberta — interior finishing, exterior repairs, and decking on properties in Bragg Creek, Bearspaw, and area.",
    path: "/work",
  });

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [areaFilter, setAreaFilter] = useState<AreaFilter>("All");
  const totalPlates = galleryPlates.length;
  const [filtersOpen, setFiltersOpen] = useState(totalPlates >= 8);

  const visible = useMemo(() => {
    return galleryPlates.filter((p) => {
      const typeOk = typeFilter === "All" || p.category === typeFilter;
      const areaOk = areaFilter === "All" || p.area === areaFilter;
      return typeOk && areaOk;
    });
  }, [typeFilter, areaFilter]);

  const renderRow = <T extends string>(
    label: string,
    options: T[],
    value: T,
    setValue: (v: T) => void,
    rowKey: string,
  ) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
      <p className="text-[0.7rem] tracking-[0.18em] uppercase text-evergreen/70 font-medium shrink-0 w-16">
        {label}
      </p>
      <div
        role="tablist"
        aria-label={`Filter projects by ${label.toLowerCase()}`}
        className="flex flex-wrap gap-2 md:gap-3"
      >
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={`${rowKey}-${opt}`}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setValue(opt)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-minimal",
                "transition-all duration-500 ease-swift border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "bg-evergreen text-evergreen-foreground border-evergreen"
                  : "bg-transparent text-foreground/75 border-border hover:border-evergreen/40 hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Our Work", url: `${SITE}/work` },
        ]}
      />

      <SubPageHero
        headline="Real properties. Real outcomes. Worth a closer look."
        accentWord="closer"
        subhead="Each plate is a record of a real project — what we found, what we did, and what changed for the homeowner."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      {/* § I — Filter rail (collapsible) */}
      <RevealSection aria-labelledby="filter-heading" className="pt-2 pb-8 md:pt-6 md:pb-12">
        <Container size="wide">
          <h2 id="filter-heading" className="sr-only">Filter projects</h2>
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="filter-rows"
              className="inline-flex items-center gap-2 text-[0.78rem] tracking-[0.18em] uppercase text-evergreen/80 hover:text-evergreen transition-colors duration-300 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4"
            >
              <span>Filter</span>
              <span className="text-evergreen/55 normal-case tracking-normal tabular-nums">
                ({visible.length} of {totalPlates})
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  filtersOpen && "rotate-180",
                )}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
            {filtersOpen && (
              <div id="filter-rows" className="mt-5 flex flex-col gap-4 md:gap-5">
                {renderRow<TypeFilter>("Type", TYPE_FILTERS, typeFilter, setTypeFilter, "type")}
                {renderRow<AreaFilter>("Area", AREA_FILTERS, areaFilter, setAreaFilter, "area")}
              </div>
            )}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Plate grid */}
      <RevealSection aria-labelledby="grid-heading" className={cn(SECTION_PADDING.standard, "section-wash pt-0 md:pt-0")}>
        <Container size="wide">
          <h2 id="grid-heading" className="sr-only">Project plates</h2>

          {visible.length === 0 ? (
            <div
              className="max-w-xl mx-auto text-center py-20"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <p className={cn(EYEBROW.standard, "mb-5")}>No plates yet</p>
              <p className={BODY.standard}>
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
                      <ProjectPlaceholder
                        project={{
                          slug: p.slug,
                          title: p.title,
                          area: p.area,
                          category: p.category,
                        }}
                        index={i}
                        photoSrc={workPhotos[p.slug]}
                        priority={i === 0}
                        className="border-b border-evergreen/10 transition-transform duration-700 ease-weighted group-hover:scale-[1.005]"
                      />

                      <div className="p-7 lg:p-8 flex flex-col flex-1">
                        <p className={EYEBROW.standard}>
                          {p.category} · {p.area}
                        </p>
                        <h3 className={cn(HEADLINE.card, "mt-4 text-foreground group-hover:text-evergreen transition-colors duration-500")}>
                          {p.title}
                        </h3>
                        <p className={cn(BODY.card, "mt-4 flex-1")}>
                          {p.scope}
                        </p>
                        <p className={cn(BODY.card, "mt-5 italic text-foreground/85 border-l-2 border-evergreen/35 pl-4")}>
                          {p.whyItMattered}
                        </p>
                      </div>
                    </div>
                  </PremiumCard>
                </article>
              ))}
            </div>
          )}
        </Container>
      </RevealSection>

      <BigCloseCTA
        variant="compact"
        heading="See a project that resembles yours? Let's talk it through."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/services", label: "Browse services" }}
      />
    </main>
  );
};

export default Work;
