import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas, getServiceArea } from "@/data/serviceAreas";
import { services } from "@/data/services";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";


const NUMERAL_BY_SLUG: Record<string, string> = {
  "bragg-creek": "V.i",
  "rocky-view-county": "V.ii",
  bearspaw: "V.iii",
  "water-valley": "V.iv",
};

interface AreaPageProps {
  slug: string;
  /** Per-area headline override; defaults to "{Name} renovation work, kept local." */
  headline?: string;
  accentWord?: string;
  /** Map of services.slug → area-specific micro-copy line shown under the service body. */
  serviceLines: Record<string, string>;
  /** Closing-band heading override. */
  closingHeading: string;
  /** Optional metaDescription override (otherwise generated from area data). */
  metaDescription?: string;
}

const AreaLocalBusinessJsonLd = ({ name, area }: { name: string; area: string }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Haven Creek Renovations",
    url: `${SITE}/service-areas/${area}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "AB",
      addressCountry: "CA",
    },
    areaServed: { "@type": "City", name },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

const AreaPage = ({
  slug,
  headline,
  accentWord = "kept",
  serviceLines,
  closingHeading,
  metaDescription,
}: AreaPageProps) => {
  const area = getServiceArea(slug);
  if (!area) {
    return (
      <main id="main" className="min-h-screen flex items-center justify-center">
        <p className="text-body text-muted-foreground">Area not found.</p>
      </main>
    );
  }

  const computedHeadline = headline ?? `${area.name} renovation work, kept local.`;
  const description =
    metaDescription ??
    `${area.page.intro} Interior finishing, exterior repairs, and decking, planned with local context.`;

  const otherAreas = serviceAreas.filter((a) => a.slug !== slug);

  useSeo({
    title: `${area.name} Renovations`,
    description,
    path: area.href,
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Service Areas", url: `${SITE}/service-areas` },
          { name: area.name, url: `${SITE}${area.href}` },
        ]}
      />
      <AreaLocalBusinessJsonLd name={area.name} area={area.slug} />

      <SubPageHero
        folio={`${area.name}, AB`}
        headline={computedHeadline}
        accentWord={accentWord}
        subhead={area.page.intro}
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      {/* § I — Local context */}
      <RevealSection aria-labelledby="context-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="context-heading"
                eyebrow="Local context"
                title={`Built around what ${area.name} actually is.`}
                lede="Each community has its own pace and its own quirks. We plan around the ones we know — because they shape the work as much as the scope does."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <div data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
                <p className="pull-quote text-[1.3rem] md:text-[1.55rem] leading-snug max-w-[34ch]">
                  {area.context}
                </p>
                <p className="mt-7 font-serif italic text-foreground/70 text-[1.05rem]">
                  — {area.page.fitNote}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — How we serve here */}
      <RevealSection aria-labelledby="services-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20 items-end">
            <div className="lg:col-span-12" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="services-heading"
                eyebrow="How we serve here"
                title={`The same three services, with ${area.name} in mind.`}
                titleWidth="wide"
                bottomGap="none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <PremiumCard featured={i === 0} className="h-full">
                  <div className="relative p-8 lg:p-10 flex flex-col h-full">
                    <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-subhead text-foreground/70 text-[1.02rem]">
                      {s.promise}
                    </p>
                    <p className="mt-5 text-body text-muted-foreground leading-relaxed flex-1">
                      {s.cardBody}
                    </p>
                    <p className="mt-6 pl-4 border-l-2 border-evergreen/30 text-body text-foreground/75 italic leading-relaxed">
                      {serviceLines[s.slug]}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 text-minimal text-evergreen">
                      <span>See the work</span>
                      <span className="icon-chip bg-evergreen/[0.06]">
                        <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § III — Other nearby areas */}
      <RevealSection aria-labelledby="nearby-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="nearby-heading"
                eyebrow="Also nearby"
                title="The other communities we serve."
                lede="Many of our clients have property in more than one of these areas. The relationship moves with them."
                titleWidth="none"
                bottomGap="none"
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border/60">
                {otherAreas.map((other, i) => (
                  <li
                    key={other.slug}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${180 + i * 90}ms` }}
                  >
                    <Link
                      to={other.href}
                      className="area-row group flex items-baseline justify-between gap-6 py-8"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[1.4rem] md:text-[1.65rem] leading-tight text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                          {other.name}
                        </h3>
                        <p className="mt-1.5 text-body text-muted-foreground ">
                          {other.shortLine}
                        </p>
                      </div>
                      <span className="icon-chip bg-evergreen/[0.06] shrink-0">
                        <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      <BigCloseCTA
        variant="compact"
        heading={closingHeading}
        primary={{ to: "/contact", label: "Get a Free Quote" }}
        secondary={{ to: "/service-areas", label: "All service areas" }}
      />
    </main>
  );
};

export default AreaPage;
