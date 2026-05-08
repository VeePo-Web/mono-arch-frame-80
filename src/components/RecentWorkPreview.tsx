import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import RevealSection from "./RevealSection";
import SectionHeader from "./SectionHeader";
import ProjectPlaceholder from "./gallery/ProjectPlaceholder";
import { SECTION_PADDING } from "@/lib/spacing";
import { galleryPlates } from "@/data/galleryPlates";
import { workPhotos } from "@/assets/photography";

/**
 * RecentWorkPreview — inline 6-tile gallery on the home page.
 * Same 1/2/3-col grid as `/work`, with a quiet "See all work →" text link
 * underneath. Visitors see the work without a click.
 */
const RecentWorkPreview = () => {
  const tiles = galleryPlates.slice(0, 6);

  return (
    <RevealSection
      id="recent-work"
      aria-labelledby="recent-work-heading"
      className={cn(SECTION_PADDING.standard, "section-wash")}
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1400px" }}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="recent-work-heading"
            eyebrow="Recent work"
            title="A quiet record of recent projects."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
          {tiles.map((p, i) => (
            <article
              key={p.slug}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${180 + i * 70}ms` }}
              className="group"
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
                className="transition-transform duration-700 ease-weighted group-hover:scale-[1.005]"
              />
              <div className="mt-4">
                <h3 className="text-title text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.category} · {p.area}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-12 md:mt-16"
          data-reveal
          style={{ ["--reveal-delay" as string]: "600ms" }}
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-minimal text-foreground hover:text-evergreen transition-colors duration-300 underline underline-offset-[6px] decoration-evergreen/40 hover:decoration-evergreen"
          >
            <span>See all work</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </RevealSection>
  );
};

export default RecentWorkPreview;
