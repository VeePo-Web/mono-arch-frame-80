import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { BODY, MEASURE, HEADLINE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";
import { services } from "@/data/services";

const SITE = "https://havencreekrenovations.ca";

const SCOPE: Record<string, string[]> = {
  "interior-finishing": [
    "Trim, casing, transitions",
    "Built-ins & finish carpentry",
    "Doors, hardware, fit-and-finish",
  ],
  "exterior-finishing": [
    "Siding, soffit, fascia",
    "Entrances, stairs, railings",
    "Weather-side detail & rebuild",
  ],
  decking: [
    "Site-aware planning",
    "Composite, cedar, treated",
    "Built for rural exposure",
  ],
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
      />

      {/* § I — Service rail (rows, not cards) */}
      <RevealSection id="services-three" aria-labelledby="services-three-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <h2 id="services-three-heading" className="sr-only">Our three services</h2>
          <ol className="border-t border-evergreen/15">
            {services.map((s, i) => (
              <li
                key={s.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                className="border-b border-evergreen/15"
              >
                <Link
                  to={s.href}
                  className="group block py-10 md:py-14 transition-colors duration-500 hover:bg-evergreen/[0.025] focus-visible:outline-none focus-visible:bg-evergreen/[0.04]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                    <div className="lg:col-span-5">
                      <h3 className={cn(HEADLINE.subsection, "text-foreground transition-colors duration-500 group-hover:text-evergreen")}>
                        {s.title}
                      </h3>
                      <p className={cn(BODY.standard, "mt-4 max-w-[44ch]")}>{s.promise}</p>
                    </div>
                    <ul className="lg:col-span-5 space-y-2 border-l border-evergreen/15 pl-5">
                      {(SCOPE[s.slug] ?? []).map((line) => (
                        <li key={line} className="text-sm text-foreground/75 leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="lg:col-span-2 lg:text-right">
                      <span className="inline-flex items-center gap-2 text-minimal text-evergreen">
                        <span>See {s.shortName.toLowerCase()}</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-500 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </RevealSection>

      {/* § II — Custom quote */}
      <RevealSection id="quote" aria-labelledby="quote-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
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
          </div>
        </Container>
      </RevealSection>

      <BigCloseCTA
        variant="compact"
        heading="Tell us about the project. We'll come prepared."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/work", label: "View our work" }}
      />
    </main>
  );
};

export default Services;
