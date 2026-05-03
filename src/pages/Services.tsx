import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import ServicePlate from "@/components/gallery/ServicePlate";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { services } from "@/data/services";
import { servicePhotos } from "@/assets/photography";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

// (Service plates are typographic — no category-to-vignette map needed.)

const SERVICE_DETAIL: Record<string, string> = {
  "interior-finishing":
    "The visible part of the work — trim, transitions, casings, baseboards, and built-ins. The detail-level work that decides whether a renovation reads as finished or merely complete.",
  "exterior-finishing":
    "Siding, soffit, fascia, entrances, stairs, rails, and weather-side detail work. Built for prairie exposure and the realities of rural property care.",
  decking:
    "Decks planned around the way you actually use the back of the home — privacy, exposure, view, and the structure underneath. Built to stay where it's put.",
};

const Services = () => {
  useSeo({
    title: "Services — Three, Held to One Standard",
    description:
      "Interior finishing, exterior finishing & repairs, and decking — three focused renovation services for rural Alberta homes, held to one consistent standard.",
    path: "/services",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="SERVICES"
        headline="Three services, held to one standard."
        accentWord="held"
        subhead="We chose focus over breadth on purpose. Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care, scaled to what the weather and the land require."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
      />

      {/* § I — Service hierarchy */}
      <RevealSection id="services-three" aria-labelledby="services-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="services-heading"
                eyebrow="What we build"
                title="In order of where the craft shows most."
                bottomGap="none"
              />
            </div>
          </div>

          <div className="space-y-7 lg:space-y-9">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 130}ms` }}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <PremiumCard featured={i === 0} className="h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-evergreen/10 overflow-hidden">
                      <ServicePlate
                        service={s}
                        photoSrc={servicePhotos[s.slug]}
                        className="h-full border-b-0 transition-transform duration-700 ease-weighted group-hover:scale-[1.005]"
                      />
                    </div>
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="numeral-disc">{s.numeral}</span>
                        <span className="h-px w-8 bg-evergreen/30 group-hover:w-20 transition-all duration-700 ease-weighted" />
                      </div>
                      <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                        {s.title}
                      </h3>
                      <p className={cn(BODY.large, "mt-3")}>
                        {s.promise}
                      </p>
                      <p className={cn(BODY.card, "mt-5", MEASURE.prose)}>
                        {SERVICE_DETAIL[s.slug]}
                      </p>
                      <div className="mt-7 inline-flex items-center gap-3 text-minimal text-evergreen self-start">
                        <span>See {s.shortName.toLowerCase()} in detail</span>
                        <span className="icon-chip bg-evergreen/[0.06]">
                          <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Full-circle support */}
      <RevealSection id="circle" aria-labelledby="circle-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="circle-heading"
                eyebrow="Full-circle support"
                title="One conversation. One contractor. One relationship."
                lede="Most renovation friction lives in the gaps between trades. We close those gaps by holding the work together — from the first walk-through to the final inspection."
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
                    { n: "01", title: "Conversation", body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
                    { n: "02", title: "Planning", body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool." },
                    { n: "03", title: "Hands-On Completion", body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished." },
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

      {/* § III — Custom quote */}
      <RevealSection id="quote" aria-labelledby="quote-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="quote-heading"
                eyebrow="About quotes"
                title="Pricing is custom because the work is."
                titleWidth="wide"
                bottomGap="none"
              />
              <div className={cn("mt-7 space-y-6", MEASURE.prose)}>
                <p className={BODY.large}>
                  We don't publish flat rates because rural projects don't have flat
                  realities. Site access, scope, materials, and the condition of what's
                  already there all change the answer. So the quote is built around your
                  property — not a template.
                </p>
                <p className={BODY.standard}>
                  We'll talk through what's possible, what's worth it, and what isn't.
                  No pressure either way.
                </p>
              </div>
            </div>

            <div className="lg:col-span-12" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <p className={cn(EYEBROW.quiet, "mb-5 mt-4")}>What a quote includes</p>
              <BentoGrid layout="auto">
                {[
                  "Scope of work, written plainly",
                  "Materials & finishes, by name",
                  "Timeline & a clear, all-in price",
                ].map((item, i) => (
                  <BentoTile
                    key={item}
                    eyebrow={String(i + 1).padStart(2, "0")}
                    title={item}
                    compact
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </Container>
      </RevealSection>

      <ClosingCta
        numeral="IV"
        eyebrow="DISCUSS YOUR PROJECT"
        heading="Tell us what you're considering. We'll come prepared."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/work", label: "View Our Work" }}
      />
    </main>
  );
};

export default Services;
