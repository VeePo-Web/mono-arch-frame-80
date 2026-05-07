import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const RESPECT = [
  { n: "01", title: "Access", body: "We arrive when we said we would, take the route that respects the property, and leave gates the way we found them." },
  { n: "02", title: "Animals & family routines", body: "Dogs, horses, kids, work-from-home — the day on the property goes on. We work around it, not through it." },
  { n: "03", title: "Equipment & materials", body: "Staged where they belong, off the lawn, off the drive. Cleaned up at the end of every day, not the end of the job." },
  { n: "04", title: "Leave it as we found it", body: "Minus the work that needed doing. The site is part of the deliverable." },
];




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
        eyebrowLabel="ABOUT"
        headline="A hands-on renovation partner for rural properties."
        accentWord="hands-on"
        subhead="Haven Creek was built for homeowners who want a more personal, less scattered way to improve the property they care about."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
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

            <div className="lg:col-span-7 lg:pl-8">
              <ol className="divide-y divide-border/60 border-y border-border/60">
                {RESPECT.map((step, i) => (
                  <li
                    key={step.n}
                    className="py-8 lg:py-10"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 140}ms` }}
                  >
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[58ch]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* §IV "A longer horizon" — folded into §I working philosophy. */}

      <BigCloseCTA
        variant="compact"
        heading="Tell us about the property and what's on your mind."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/services", label: "What we offer" }}
      />
    </main>
  );
};

export default About;
