import { Link } from "react-router-dom";
import RevealSection from "./RevealSection";
import Container from "./Container";
import ProjectPlaceholder from "./gallery/ProjectPlaceholder";
import { galleryPlates } from "@/data/galleryPlates";
import { workPhotos } from "@/assets/photography";

/**
 * RecentWorkPreview — six photo tiles, no captions, one quiet "See more" link.
 * The grid is the message.
 */
const RecentWorkPreview = () => {
  const tiles = galleryPlates.slice(0, 6);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
          {tiles.map((p, i) => (
            <div
              key={p.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${120 + i * 70}ms` }}
            >
              <ProjectPlaceholder
                project={{
                  slug: p.slug,
                  title: p.title,
                  area: p.area,
                  category: p.category,
                }}
                index={i}
                photoSrc={workPhotos[p.slug]}
                priority={false}
              />
            </div>
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
            See more of our work →
          </Link>
        </div>
      </Container>
    </RevealSection>
  );
};

export default RecentWorkPreview;
