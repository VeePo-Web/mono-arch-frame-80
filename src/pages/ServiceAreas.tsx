import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

const FIT = [
  { n: "01", title: "Drive time", body: "We plan around real travel — so the work day starts on the property, not in traffic." },
  { n: "02", title: "Seasonal weather", body: "Some work has a window. We schedule the right work for the right season." },
  { n: "03", title: "Property access", body: "Long driveways, narrow gates, snowed-in approaches — planned around, not assumed away." },
  { n: "04", title: "Land & wildlife", body: "Trees, gardens, dogs, horses. We work with what's already there." },
];

const ServiceAreas = () => {
  useSeo({
    title: "Service Areas — Local, By Choice",
    description:
      "Renovation services for rural homes across Bragg Creek, Rocky View County, Bearspaw, and Water Valley. Local, by choice — built around the realities of each community.",
    path: "/service-areas",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Service Areas", url: `${SITE}/service-areas` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="WHERE WE WORK"
        headline="Local, by choice."
        accentWord="choice"
        subhead="Four communities. Each different in pace, exposure, and the kind of property care it asks for. We chose this footprint so the work could stay personal."
        primaryCta={{ to: "/contact", label: "Discuss your area" }}
        secondaryCta={{ to: "/services", label: "Our services" }}
        dossier={{ sectionNo: "IX", coord: "Foothills · West & North of Calgary", edition: "Edition I" }}
      />

      {/* § I — Roster */}
      <RevealSection id="roster" aria-labelledby="roster-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="THE ROSTER" />
              <h2 id="roster-heading" className="text-headline text-foreground mt-6">
                Four communities we know well.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Each area has its own pace and its own demands. A Bearspaw renovation
                isn't a Bragg Creek renovation — and the work should reflect that.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border/60">
                {serviceAreas.map((area, i) => (
                  <li
                    key={area.slug}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${180 + i * 90}ms` }}
                  >
                    <Link
                      to={area.href}
                      className="area-row group flex items-baseline justify-between gap-6 py-10"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[1.65rem] md:text-[2rem] leading-tight text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                          {area.name}
                        </h3>
                        <p className="mt-2 text-body text-muted-foreground text-[0.95rem]">
                          {area.shortLine}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-minimal text-evergreen/70 tabular-nums">
                          {POSTAL[area.slug]}
                        </span>
                        <span className="icon-chip bg-evergreen/[0.06]">
                          <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Rural fit */}
      <RevealSection id="fit" aria-labelledby="fit-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="BUILT FOR RURAL SERVICE" />
              <h2 id="fit-heading" className="text-headline text-foreground mt-6 max-w-[22ch]">
                Rural property work has its own logic. We plan around it.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-[55ch]">
                Suburban contracting habits don't transfer cleanly to acreages. The
                distances are longer, the seasons matter more, and the property is part
                of the day's work — not just the location.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="figure-footnote mb-5">
                <span className="footnote-figmark">Fig. ii.</span>
                <span className="flex-1">WHAT WE PLAN AROUND</span>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {FIT.map((f) => (
                  <li key={f.n} className="flex items-baseline gap-4 py-4">
                    <span className="numeral-mark tabular-nums text-evergreen/70 w-6">{f.n}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-body text-foreground/85 text-[0.98rem]">{f.title}</p>
                      <p className="mt-1 text-body text-muted-foreground text-[0.9rem]">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      <ClosingCta
        eyebrow="LOCAL, FROM THE START"
        heading="Tell us about the property and where it sits."
        body="We'll know the road, the drive in, and what the season is asking for."
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/work", label: "View Our Work" }}
      />
    </main>
  );
};

export default ServiceAreas;
