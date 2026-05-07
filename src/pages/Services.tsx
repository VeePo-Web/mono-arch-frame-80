import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import ServicesGrid from "@/components/ServicesGrid";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { BODY, MEASURE } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

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

      {/* § I — Service cards (shared with Home) */}
      <div id="services-three">
        <ServicesGrid />
      </div>

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
