import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const About = () => {
  useSeo({
    title: "About — Hands-On Renovation",
    description:
      "A hands-on renovation partner for rural and acreage homeowners. Property respect, fewer handoffs, and quality work from planning through completion across rural Alberta.",
    path: "/about",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "About", url: `${SITE}/about` },
        ]}
      />

      <SubPageHero
        headline="A hands-on renovation partner for rural properties."
        subhead="Haven Creek was built for homeowners who want a more personal, less scattered way to improve the property they care about."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      {/* § I — How we work (philosophy + property respect, merged) */}
      <RevealSection id="how-we-work" aria-labelledby="how-we-work-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="how-we-work-heading"
                title="How we work."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7 space-y-7" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <p className="text-body text-foreground/85 leading-relaxed max-w-[58ch]">
                A finished renovation is judged twice. Once when it's done, and again every
                day after. The first judgement is about quality — does the work fit, does
                it last, does it read as resolved. The second is about the experience — what
                it was like to live with the project from start to finish. We hold both
                standards because the homeowner does.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed max-w-[58ch]">
                In practice that means careful access — the route, the gates, the hours.
                It means working around dogs, horses, kids, and the rhythm of a working
                acreage. Equipment and materials stay where they belong, off the lawn and
                off the drive, and we clean up at the end of every day. When the project
                closes we leave the property the way we found it — minus the work that
                needed doing.
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Where we work */}
      <RevealSection id="areas" aria-labelledby="areas-heading" className={SECTION}>
        <Container size="wide">
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <SectionHeader
              id="areas-heading"
              title="Where we work."
              titleWidth="none"
              bottomGap="none"
            />
          </div>
          <p
            className="mt-8 md:mt-10 text-headline-sm font-serif text-foreground/85 leading-snug max-w-3xl"
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            {serviceAreas.map((a) => a.name).join(" · ")}
          </p>
        </Container>
      </RevealSection>

      <BigCloseCTA />
    </main>
  );
};

export default About;
