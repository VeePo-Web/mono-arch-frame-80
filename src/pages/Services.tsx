import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { SECTION_PADDING } from "@/lib/spacing";
import { services } from "@/data/services";

const SITE = "https://havencreekrenovations.ca";

const Services = () => {
  useSeo({
    title: "Services — Three, Held to One Standard",
    description:
      "Interior finishing, exterior finishing & repairs, and decking — three focused renovation services for rural Alberta homes, held to one consistent standard.",
    path: "/services",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
        ]}
      />

      <SubPageHero
        headline="Three services, held to one standard."
        accentWord="held"
        subhead="We chose focus over breadth on purpose. Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care, scaled to what the weather and the land require."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
      />

      <RevealSection id="services-three" aria-labelledby="services-three-heading" className={SECTION_PADDING.standard}>
        <Container size="wide">
          <h2 id="services-three-heading" className="sr-only">Our three services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {services.map((s, i) => (
              <article
                key={s.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <h3 className="text-headline-sm font-serif text-foreground">{s.title}</h3>
                <p className="mt-4 text-body text-foreground/85 leading-relaxed">{s.promise}</p>
                <p className="mt-3 text-body text-muted-foreground leading-relaxed">{s.cardBody}</p>
              </article>
            ))}
          </div>
        </Container>
      </RevealSection>

      <BigCloseCTA
        variant="compact"
        heading="Tell us about the project. We'll come prepared."
        primary={{ to: "/contact", label: "Get a Free Quote" }}
      />
    </main>
  );
};

export default Services;
