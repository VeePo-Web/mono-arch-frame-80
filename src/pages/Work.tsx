import { useState } from "react";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import Lightbox from "@/components/gallery/Lightbox";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { uploadedProjectPhotos, photography } from "@/assets/photography";

const SITE = "https://havencreekrenovations.ca";

const Work = () => {
  useSeo({
    title: "Our Work — Selected Projects",
    description:
      "A collection of recent renovation work across rural Alberta — interior finishing, exterior repairs, and decking on properties in Bragg Creek, Bearspaw, and area.",
    path: "/work",
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Our Work", url: `${SITE}/work` },
        ]}
      />

      <SubPageHero
        headline="Real properties. Real outcomes."
        primaryCta={{ to: "/contact", label: "Get a Free Quote" }}
        backdrop={photography.exteriorDetailSoffit}
      />

      <RevealSection aria-labelledby="grid-heading" className="section-y">
        <Container size="wide">
          <h2 id="grid-heading" className="sr-only">Projects</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2 lg:gap-3">
            {uploadedProjectPhotos.map((photo, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open photo ${i + 1} of ${uploadedProjectPhotos.length}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${(i % 8) * 60}ms` }}
                className="group relative aspect-[4/5] overflow-hidden bg-evergreen/[0.04] transition-transform duration-500 ease-weighted hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-evergreen"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-weighted will-change-transform group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
        </Container>
      </RevealSection>

      <Lightbox
        photos={uploadedProjectPhotos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      <BigCloseCTA heading="See a project that resembles yours?" />
    </main>
  );
};

export default Work;
