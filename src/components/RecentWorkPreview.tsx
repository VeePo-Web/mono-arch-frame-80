import { useState } from "react";
import { Link } from "react-router-dom";
import RevealSection from "./RevealSection";
import Container from "./Container";
import Lightbox from "./gallery/Lightbox";
import { homeRecentPhotos } from "@/assets/photography";

/**
 * RecentWorkPreview — six curated real photos in a 1/2/3-col grid, lightbox on tap,
 * one quiet "See all work" link below.
 */
const RecentWorkPreview = () => {
  const tiles = homeRecentPhotos;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <RevealSection
      id="recent-work"
      aria-labelledby="recent-work-heading"
      className="section-y"
    >
      <Container size="wide">
        <div
          className="inline-flex items-center gap-4 mb-12 md:mb-16"
          data-reveal
          style={{ ["--reveal-delay" as string]: "0ms" }}
        >
          <span className="block w-10 h-px bg-evergreen/60" aria-hidden="true" />
          <h2 id="recent-work-heading" className="t-eyebrow m-0">Recent work</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 lg:gap-3">
          {tiles.map((photo, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open photo ${i + 1} of ${tiles.length}`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${120 + i * 70}ms` }}
              className="group relative aspect-[4/5] overflow-hidden bg-evergreen/[0.04] transition-transform duration-500 ease-weighted hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-evergreen"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-weighted will-change-transform group-hover:scale-[1.02]"
              />
            </button>
          ))}
        </div>

        <div
          className="mt-12 md:mt-16"
          data-reveal
          style={{ ["--reveal-delay" as string]: "600ms" }}
        >
          <Link
            to="/work"
            className="inline-block text-foreground hover:text-evergreen transition-colors duration-300 underline underline-offset-[6px] decoration-evergreen/40 hover:decoration-evergreen"
          >
            See all work →
          </Link>
        </div>
      </Container>

      <Lightbox
        photos={tiles}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </RevealSection>
  );
};

export default RecentWorkPreview;
