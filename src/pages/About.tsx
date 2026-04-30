import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import InfoCard from "@/components/ui/InfoCard";
import BentoGrid, { BentoTile } from "@/components/ui/BentoGrid";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { HEADLINE, BODY, MEASURE } from "@/lib/typography";
import { SECTION_PADDING, CONTENT_GAP } from "@/lib/spacing";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const RESPECT = [
  { n: "01", title: "Access", body: "We arrive when we said we would, take the route that respects the property, and leave gates the way we found them." },
  { n: "02", title: "Animals & family routines", body: "Dogs, horses, kids, work-from-home — the day on the property goes on. We work around it, not through it." },
  { n: "03", title: "Equipment & materials", body: "Staged where they belong, off the lawn, off the drive. Cleaned up at the end of every day, not the end of the job." },
  { n: "04", title: "Leave it as we found it", body: "Minus the work that needed doing. The site is part of the deliverable." },
];

const CONTINUITY = [
  { n: "01", title: "Personal involvement", body: "The same person who plans the work is the person doing it — and the person you call when there's a question." },
  { n: "02", title: "Fewer handoffs", body: "Most renovation friction lives in the gaps between trades. We close those gaps by holding the work together." },
  { n: "03", title: "A long-term relationship", body: "Many of our clients improve their property over years. We're built for that pace, and for that trust." },
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
        dossier={{ sectionNo: "II", coord: "About · Working philosophy", edition: "Edition I" }}
      />

      {/* § I — Working philosophy */}
      <RevealSection id="philosophy" aria-labelledby="philosophy-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-6" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="Working philosophy" />
              <h2 id="philosophy-heading" className="sr-only">Working philosophy</h2>
              <p className="pull-quote text-[1.5rem] md:text-[1.85rem] mt-7 leading-snug max-w-[22ch]">
                &ldquo;The experience of quality. The quality of experience.&rdquo;
              </p>
              <p className="mt-6 text-minimal text-evergreen/70">— The work, in one line.</p>
            </div>

            <div className="lg:col-span-6 space-y-7" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <p className="text-body text-foreground/85">
                A finished renovation is judged twice. Once when it's done, and again every
                day after. The first judgement is about quality — does the work fit, does
                it last, does it read as resolved. The second is about the experience —
                what it was like to live with the project from start to finish.
              </p>
              <p className="text-body text-muted-foreground">
                We hold both standards because the homeowner does. The job isn't finished
                until both feel right.
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
              <Eyebrow label="Property respect" />
              <h2 id="respect-heading" className="text-headline text-foreground mt-6">
                The property is part of the deliverable.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Rural homeowners care about who is on their property — and how. The
                trust isn&apos;t separate from the work. It is the work.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <ol className="space-y-12 lg:space-y-14">
                {RESPECT.map((step, i) => (
                  <li
                    key={step.n}
                    className="relative pl-14"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 180}ms` }}
                  >
                    <span className="absolute left-0 top-1 numeral-disc">{step.n}</span>
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[58ch]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Hands-on continuity */}
      <RevealSection id="continuity" aria-labelledby="continuity-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="Hands-on continuity" />
              <h2 id="continuity-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                The same person, from first walk-through to final.
              </h2>
            </div>
          </div>

          <div className={cn("grid grid-cols-1 md:grid-cols-3", CONTENT_GAP.cardGrid)}>
            {CONTINUITY.map((c, i) => (
              <div
                key={c.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <InfoCard eyebrow={c.n} title={c.title} body={c.body} />
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Long-term relationship */}
      <RevealSection id="longterm" aria-labelledby="longterm-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" label="A longer horizon" />
            <h2 id="longterm-heading" className="text-headline text-foreground mt-6 max-w-[24ch] mx-auto">
              Most rural properties are improved a stage at a time.
            </h2>
            <p className="mt-7 text-body text-muted-foreground max-w-[58ch] mx-auto">
              A deck this year. Interior finishing next. Exterior repairs the year after.
              Working with one trusted contractor across phases means continuity —
              someone who already knows the building, the land, and how you live on it.
            </p>
            <p className="mt-7 font-serif italic text-foreground/85 text-[1.1rem]">
              We're built for that pace.
            </p>
          </div>
        </Container>
      </RevealSection>

      <ClosingCta
        numeral="V"
        eyebrow="START THE CONVERSATION"
        heading="Tell us about the property and what's on your mind."
        body="One project or many. We're glad to walk it through."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/services", label: "What we offer" }}
      />
    </main>
  );
};

export default About;
