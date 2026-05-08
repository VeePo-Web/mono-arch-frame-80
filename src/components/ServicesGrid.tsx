import Container from "./Container";
import RevealSection from "./RevealSection";
import SectionHeader from "./SectionHeader";
import { SECTION_PADDING } from "@/lib/spacing";
import { services } from "@/data/services";

/**
 * ServicesGrid — type-only home preview of the three services.
 *
 * Identical content treatment to `/services` (title + promise + cardBody).
 * No photo cards, no per-card link — services are non-clickable text on
 * both `/` and `/services`. One service treatment site-wide.
 */
const ServicesGrid = () => {
  return (
    <RevealSection
      id="services-preview"
      aria-labelledby="services-preview-heading"
      className={SECTION_PADDING.standard}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 700px" }}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="services-preview-heading"
            eyebrow="What we do"
            title="Three services. One standard."
            lede="Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {services.map((s, i) => (
            <article
              key={s.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${180 + i * 110}ms` }}
            >
              <h3 className="text-headline-sm font-serif text-foreground">{s.title}</h3>
              <p className="mt-4 text-body text-foreground/85 leading-relaxed">{s.promise}</p>
              <p className="mt-3 text-body text-muted-foreground leading-relaxed">{s.cardBody}</p>
            </article>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
};

export default ServicesGrid;
