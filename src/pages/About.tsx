import { cn } from "@/lib/utils";
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

// "Property respect" is now prose — no `RESPECT` array, no `<ol>`.




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
        accentWord="hands-on"
        subhead="Haven Creek was built for homeowners who want a more personal, less scattered way to improve the property they care about."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      {/* § I — Working philosophy */}
      <RevealSection id="philosophy" aria-labelledby="philosophy-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="philosophy-heading"
                eyebrow="Working philosophy"
                title="Held to two standards."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7 space-y-7" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <p className="text-body text-foreground/85">
                A finished renovation is judged twice. Once when it's done, and again every
                day after. The first judgement is about quality — does the work fit, does
                it last, does it read as resolved. The second is about the experience —
                what it was like to live with the project from start to finish.
              </p>
              <p className="text-body text-muted-foreground">
                We hold both standards because the homeowner does. The job isn't finished
                until both feel right. Most rural properties are improved a stage at a
                time — and we're built for that pace.
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Property respect */}
      <RevealSection id="respect" aria-labelledby="respect-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="respect-heading"
                eyebrow="Property respect"
                title="The property is part of the deliverable."
                lede="Rural homeowners care about who is on their property — and how. The trust isn't separate from the work. It is the work."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-8 space-y-7" data-reveal style={{ ["--reveal-delay" as string]: "260ms" }}>
              <p className="text-body text-foreground/85 leading-relaxed max-w-[58ch]">
                In practice this means careful access — the route, the gates, the
                hours. It means working around dogs, horses, kids, and the
                rhythm of a working acreage. Equipment and materials stay where
                they belong, off the lawn and off the drive, and we clean up at
                the end of every day, not the end of the job.
              </p>
              <p className="text-body text-muted-foreground leading-relaxed max-w-[58ch]">
                When the project closes we leave the property the way we found
                it — minus the work that needed doing. The site is part of the
                deliverable.
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Where we work (named-list rail; replaces /service-areas) */}
      <RevealSection id="areas" aria-labelledby="areas-heading" className={SECTION}>
        <Container size="wide">
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <SectionHeader
              id="areas-heading"
              eyebrow="Where we work"
              title="Local, by choice."
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

      <BigCloseCTA
        variant="compact"
        heading="Tell us about the property and what's on your mind."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
      />
    </main>
  );
};

export default About;
