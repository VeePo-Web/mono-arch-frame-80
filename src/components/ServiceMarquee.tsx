import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import RevealSection from "./RevealSection";
import SectionHeader from "./SectionHeader";
import { HEADLINE, BODY, EYEBROW } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";
import { services } from "@/data/services";
import { servicePhotos } from "@/assets/photography";

/**
 * ServiceMarquee — three full-bleed editorial service panels.
 *
 * Each panel:
 *   • Big italic numeral (I · II · III)
 *   • Service name (HEADLINE.section)
 *   • Promise + short scope list
 *   • Anchored photograph with slow ken-burns drift
 *   • Single ghost-arrow CTA → service page
 *
 * Layout alternates left/right on lg+. On mobile every panel stacks
 * (photo above text). Reveal: headline rises, photo zooms 1.04 → 1.0.
 *
 * This is the page's signature scroll moment.
 */

const SCOPE: Record<string, string[]> = {
  "interior-finishing": [
    "Trim, casing, and transitions",
    "Built-ins and finish carpentry",
    "Doors, hardware, and fit-and-finish",
  ],
  "exterior-finishing": [
    "Siding, soffit, and fascia repair",
    "Entrances, stairs, and railings",
    "Weather-facing detail and rebuild",
  ],
  decking: [
    "Site-aware planning",
    "Composite, cedar, and pressure-treated",
    "Structural integrity for rural exposure",
  ],
};

const ServiceMarquee = () => {
  return (
    <RevealSection
      id="services-preview"
      aria-labelledby="services-heading"
      className={SECTION_PADDING.standard}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 2400px" }}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="services-heading"
            eyebrow="What we build"
            title="Three services. One standard."
            lede="Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care."
            drift
          />
        </div>

        <div className="space-y-20 md:space-y-32">
          {services.map((s, i) => {
            const photo = servicePhotos[s.slug];
            const flipped = i % 2 === 1;

            return (
              <article
                key={s.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: "0ms" }}
                className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center",
                )}
              >
                {/* Photo panel */}
                <div
                  className={cn(
                    "lg:col-span-7 relative overflow-hidden rounded-sm",
                    "aspect-[16/10] lg:aspect-[5/4]",
                    flipped ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={s.title}
                      width={1280}
                      height={1024}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover photo-zoom-in"
                    />
                  ) : (
                    <div className="w-full h-full bg-evergreen/[0.06]" />
                  )}
                  {/* Numeral overlay */}
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-5 md:top-7 md:left-7 font-serif italic text-background/85 text-5xl md:text-7xl leading-none drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
                  >
                    {s.numeral}
                  </span>
                  {/* Soft bottom wash so any caption pinned later stays legible */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, hsl(0 0% 0% / 0.18), transparent 35%)",
                    }}
                  />
                </div>

                {/* Text panel */}
                <div
                  className={cn(
                    "lg:col-span-5",
                    flipped ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <span className={EYEBROW.standard}>{`Service ${s.numeral}`}</span>
                  <h3
                    data-drift
                    className={cn(
                      HEADLINE.section,
                      "mt-4 text-foreground max-w-[16ch]",
                    )}
                  >
                    {s.title}
                  </h3>
                  <p className={cn(BODY.large, "mt-5 max-w-[44ch]")}>{s.promise}</p>

                  <ul className="mt-7 space-y-3 border-l border-evergreen/20 pl-5 max-w-[44ch]">
                    {(SCOPE[s.slug] ?? []).map((line) => (
                      <li
                        key={line}
                        className="font-sans text-base text-foreground/80 leading-relaxed"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={s.href}
                    className="cta-ghost group/ghost mt-8 inline-flex"
                    aria-label={`See ${s.shortName.toLowerCase()}`}
                  >
                    <span>{`See ${s.shortName.toLowerCase()}`}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-evergreen transition-transform duration-500 ease-swift group-hover/ghost:translate-x-0.5 group-hover/ghost:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </RevealSection>
  );
};

export default ServiceMarquee;
