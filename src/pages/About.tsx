import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";
import { photography } from "@/assets/photography";

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
        backdrop={photography.areaFoothills}
      />

      {/* § I — How we work */}
      <RevealSection id="how-we-work" aria-labelledby="how-we-work-heading" className="section-y">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-10">
            <p className="md:col-span-3 t-eyebrow" data-reveal>How we work</p>
            <h2
              id="how-we-work-heading"
              className="md:col-span-9 t-section text-foreground max-w-[18ch]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              Held to two standards — the work, and the experience.
            </h2>
          </div>

          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            <p className="md:col-span-6 t-body text-foreground/85 max-w-[58ch]">
              A finished renovation is judged twice. Once when it's done, and again every
              day after. The first judgement is about quality — does the work fit, does
              it last, does it read as resolved. The second is about the experience — what
              it was like to live with the project from start to finish. We hold both
              standards because the homeowner does.
            </p>
            <p className="md:col-span-6 t-body text-foreground/70 max-w-[58ch]">
              In practice that means careful access — the route, the gates, the hours.
              It means working around dogs, horses, kids, and the rhythm of a working
              acreage. Equipment and materials stay where they belong, off the lawn and
              off the drive, and we clean up at the end of every day. When the project
              closes we leave the property the way we found it — minus the work that
              needed doing.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Where we work — magazine directory list */}
      <RevealSection id="areas" aria-labelledby="areas-heading" className="section-y">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-10 mb-10 md:mb-14">
            <p className="md:col-span-3 t-eyebrow" data-reveal>Where we work</p>
            <h2
              id="areas-heading"
              className="md:col-span-9 t-section text-foreground max-w-[18ch]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              Across the foothills.
            </h2>
          </div>

          <ul className="border-t border-foreground/12 grid grid-cols-1 md:grid-cols-2">
            {serviceAreas.map((a, i) => (
              <li
                key={a.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="row-wash border-b border-foreground/12 md:[&:nth-child(2n-1)]:border-r border-foreground/12 px-2 -mx-2 py-6 md:py-7 flex items-baseline justify-between gap-6"
              >
                <span className="t-title text-foreground">{a.name}</span>
                <span className="t-micro whitespace-nowrap">AB</span>
              </li>
            ))}
          </ul>
        </Container>
      </RevealSection>

      <BigCloseCTA />
    </main>
  );
};

export default About;
