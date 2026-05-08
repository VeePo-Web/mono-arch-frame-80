import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import RevealSection from "./RevealSection";
import SectionHeader from "./SectionHeader";
import { BODY, EYEBROW } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";
import { services } from "@/data/services";
import { servicePhotos } from "@/assets/photography";

/**
 * ServicesGrid — three quiet service cards, side-by-side on lg+, stacked
 * on mobile. Replaces the cinematic ServiceMarquee. One job per card:
 * photo, name, one-line promise, three-bullet scope, ghost arrow.
 */

const ServicesGrid = () => {
  return (
    <RevealSection
      id="services-preview"
      aria-labelledby="services-preview-heading"
      className={SECTION_PADDING.standard}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 900px" }}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="services-preview-heading"
            eyebrow="What we build"
            title="Three services. One standard."
            lede="Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => {
            const photo = servicePhotos[s.slug];
            return (
              <Link
                key={s.slug}
                to={s.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${180 + i * 100}ms` }}
                className={cn(
                  "group block rounded-sm overflow-hidden",
                  "border border-evergreen/10 bg-background/40",
                  "transition-colors duration-500 hover:border-evergreen/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                )}
                aria-label={`${s.title} — ${s.promise}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-evergreen/5">
                  {photo && (
                    <img
                      src={photo}
                      alt={s.title}
                      width={1280}
                      height={800}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-weighted group-hover:scale-[1.02]"
                    />
                  )}
                </div>
                <div className="p-6 md:p-7">
                  <p className={EYEBROW.standard}>{s.shortName}</p>
                  <h3 className="mt-3 text-headline-sm font-serif text-foreground">
                    {s.title}
                  </h3>
                  <p className={cn(BODY.standard, "mt-3 max-w-[34ch]")}>
                    {s.promise}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-minimal text-evergreen">
                    <span>See {s.shortName.toLowerCase()}</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </RevealSection>
  );
};

export default ServicesGrid;
