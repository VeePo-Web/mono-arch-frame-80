import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import AboutHero from "@/components/AboutHero";
import PhotoBleed from "@/components/PhotoBleed";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";
import { photography, coryHeadshot } from "@/assets/photography";


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

      <AboutHero
        headline="A hands-on renovation partner for rural properties."
        subhead="Haven Creek was built for homeowners who want a more personal, less scattered way to improve the property they care about."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        backdrop={photography.areaFoothills}
      />

      {/* § I — How we work — signed letter */}
      <RevealSection id="how-we-work" aria-labelledby="how-we-work-heading" className="section-y">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
            {/* Left rail — signature column */}
            <div className="lg:col-span-3">
              <img
                src={coryHeadshot}
                alt="Cory, Haven Creek Renovations"
                loading="lazy"
                decoding="async"
                className="block w-32 md:w-40 aspect-square object-cover mb-6"
                data-reveal
              />
              <p
                className="t-eyebrow"
                data-reveal
                style={{ ["--reveal-delay" as string]: "120ms" }}
              >
                A note from Cory
              </p>
              <span
                className="mt-5 block h-px w-8 bg-foreground/20"
                aria-hidden="true"
                data-reveal
                style={{ ["--reveal-delay" as string]: "240ms" }}
              />
            </div>

            {/* Right column — the letter */}
            <div className="lg:col-span-9 max-w-[58ch] space-y-8">
              <h2
                id="how-we-work-heading"
                className="t-section text-foreground"
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
              >
                A finished renovation is judged twice — once when it's done, and again every day after.{" "}
                <em className="text-evergreen italic font-serif">
                  We hold both standards because the homeowner does.
                </em>
              </h2>

              <p
                className="t-lede text-foreground/75"
                data-reveal
                style={{ ["--reveal-delay" as string]: "360ms" }}
              >
                The first judgement is about quality — does the work fit, does it last,
                does it read as resolved.
              </p>

              <p
                className="t-lede text-foreground/75"
                data-reveal
                style={{ ["--reveal-delay" as string]: "480ms" }}
              >
                The second is about the experience — what it was like to live with the
                project from start to finish.
              </p>

              <p
                className="t-lede text-foreground/75"
                data-reveal
                style={{ ["--reveal-delay" as string]: "600ms" }}
              >
                In practice, that means careful access — the route, the gates, the hours.
                It means working around dogs, horses, kids, and the rhythm of a working
                acreage. Equipment and materials stay where they belong, off the lawn and
                off the drive, and we clean up at the end of every day. When the project
                closes we leave the property the way we found it — minus the work that
                needed doing.
              </p>

              <div
                className="pt-2"
                data-reveal
                style={{ ["--reveal-delay" as string]: "760ms" }}
              >
                <span className="block h-px w-10 bg-foreground/20 mb-5" aria-hidden="true" />
                <p className="font-serif italic text-foreground/70 text-base">
                  — Cory, Haven Creek Renovations
                </p>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      <PhotoBleed
        src={photography.heroDetail}
        alt="A heavy black structural bracket bolted into a stained timber post"
        position="50% 45%"
      />


      {/* § II — Where we work — editorial pass */}
      <RevealSection id="areas" aria-labelledby="areas-heading" className="section-y">

        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-10">
            <p className="md:col-span-3 t-eyebrow" data-reveal>Where we work</p>
            <h2
              id="areas-heading"
              className="md:col-span-9 t-section text-foreground max-w-[22ch]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              Across the foothills.
            </h2>
          </div>

          <div
            className="mt-14 md:mt-16 border-t border-foreground/12"
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
          />

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
            <p
              className="lg:col-span-7 t-lede text-foreground/90 max-w-[58ch]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "280ms" }}
            >
              Foothills work, mostly. Wooded acreages, working properties, and established
              country homes west and north of Calgary — places where access, weather, and
              respect for the land shape every decision.
            </p>

            <blockquote
              className="lg:col-span-4 lg:col-start-9 lg:pt-2"
              data-reveal
              style={{ ["--reveal-delay" as string]: "360ms" }}
            >
              <span className="block h-px w-8 bg-evergreen/40 mb-5" aria-hidden="true" />
              <p className="font-serif italic text-2xl lg:text-3xl text-foreground leading-[1.25] tracking-[-0.01em]">
                If we can get there in a morning, we can take care of it.
              </p>
            </blockquote>
          </div>

          <div
            className="mt-20 md:mt-24 flex items-center gap-3"
            data-reveal
            style={{ ["--reveal-delay" as string]: "480ms" }}
          >
            <span className="h-px w-6 bg-foreground/20" aria-hidden="true" />
            <p className="t-eyebrow text-evergreen/70">In the area</p>
          </div>

          <ul className="mt-8 border-t border-foreground/12">
            {serviceAreas.map((a, i) => (
              <li
                key={a.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${560 + i * 90}ms` }}
                className="row-wash border-b border-foreground/12 px-2 -mx-2 py-6 md:py-7 grid grid-cols-1 md:grid-cols-12 gap-x-8 items-baseline"
              >
                <span className="md:col-span-4 t-title text-foreground">{a.name}</span>
                <span className="hidden md:block md:col-span-8 t-micro text-foreground/60">
                  {a.shortLine}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="mt-8 t-micro text-foreground/60"
            data-reveal
            style={{ ["--reveal-delay" as string]: `${560 + serviceAreas.length * 90 + 90}ms` }}
          >
            Outside this radius? Send a note — we'll tell you straight.
          </p>
        </Container>
      </RevealSection>


      <BigCloseCTA />
    </main>
  );
};

export default About;
