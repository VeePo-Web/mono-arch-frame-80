import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { services } from "@/data/services";
import { photography } from "@/assets/photography";

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
        headline="Three services. One standard."
        subhead="Three focused services, held to the same hands-on standard."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        backdrop={photography.interiorDetailTrim}
      />

      <RevealSection id="services-three" aria-labelledby="services-three-heading" className="section-y">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 mb-12 md:mb-20">
            <p className="md:col-span-3 t-eyebrow">What we do</p>
            <h2
              id="services-three-heading"
              className="md:col-span-9 t-section text-foreground max-w-[16ch]"
            >
              Three services, held to one standard.
            </h2>
          </div>

          <ul className="border-t border-foreground/12">
            {services.map((s, i) => (
              <li
                key={s.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                className="row-wash border-b border-foreground/12 grid grid-cols-12 gap-6 items-baseline py-7 md:py-9 px-2 -mx-2"
              >
                <h3 className="col-span-12 md:col-span-5 t-section text-foreground">
                  {s.title}
                </h3>
                <div className="col-span-12 md:col-span-7 space-y-3">
                  <p className="t-body text-foreground/85">{s.promise}</p>
                  <p className="t-body text-foreground/70">{s.cardBody}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </RevealSection>

      <BigCloseCTA />
    </main>
  );
};

export default Services;
