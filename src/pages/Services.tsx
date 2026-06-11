import { Link } from "react-router-dom";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import EditorialHero from "@/components/EditorialHero";
import PhotoBleed from "@/components/PhotoBleed";
import BigCloseCTA from "@/components/BigCloseCTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { services } from "@/data/services";
import { photography } from "@/assets/photography";

import serviceInterior from "@/assets/photography/service-interior-finishing.jpg";
import serviceExterior from "@/assets/photography/service-exterior-finishing.jpg";
import serviceDecking from "@/assets/photography/service-decking.jpg";

const SITE = "https://havencreekrenovations.ca";

const SERVICE_PHOTOS: Record<string, string> = {
  "interior-finishing": serviceInterior,
  "exterior-finishing": serviceExterior,
  "decking": serviceDecking,
};

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

      <EditorialHero
        headline="Three services. One standard."
        subhead="Three focused services, held to the same hands-on standard."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        backdrop={photography.interiorDetailTrim}
        watermark="Services"
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
                className="border-b border-foreground/12"
              >
                <Link
                  to="/work"
                  className="row-wash group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center py-8 md:py-10 px-2 -mx-2"
                  aria-label={`${s.title} — see related work`}
                >
                  <div className="md:col-span-5 overflow-hidden aspect-[4/3] bg-evergreen/[0.04]">
                    <img
                      src={SERVICE_PHOTOS[s.slug]}
                      alt={`${s.title} — Haven Creek Renovations`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 ease-weighted will-change-transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <h3 className="t-section text-foreground transition-colors duration-300 group-hover:text-evergreen">
                      {s.title}
                    </h3>
                    <p className="t-body text-foreground/85">{s.promise}</p>
                    <p className="t-body text-foreground/70">{s.cardBody}</p>
                    <p className="t-micro text-evergreen/80 pt-2">
                      See related work →
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </RevealSection>

      <PhotoBleed
        src={photography.deckingDetailEndgrain}
        alt="End-grain of a cedar deck board with a fallen leaf catching afternoon light"
        position="50% 50%"
      />

      <BigCloseCTA />
    </main>
  );
};

export default Services;
