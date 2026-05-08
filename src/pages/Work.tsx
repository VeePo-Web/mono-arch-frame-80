import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import BigCloseCTA from "@/components/BigCloseCTA";
import ProjectPlaceholder from "@/components/gallery/ProjectPlaceholder";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { galleryPlates } from "@/data/galleryPlates";
import { workPhotos } from "@/assets/photography";
import { SECTION_PADDING } from "@/lib/spacing";

const SITE = "https://havencreekrenovations.ca";

const Work = () => {
  useSeo({
    title: "Our Work — Selected Projects",
    description:
      "A selected collection of recent renovation work across rural Alberta — interior finishing, exterior repairs, and decking on properties in Bragg Creek, Bearspaw, and area.",
    path: "/work",
  });

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
      />

      <RevealSection aria-labelledby="grid-heading" className={cn(SECTION_PADDING.standard, "section-wash")}>
        <Container size="wide">
          <h2 id="grid-heading" className="sr-only">Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
            {galleryPlates.map((p, i) => (
              <article
                key={p.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
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
                  priority={i === 0}
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
        </Container>
      </RevealSection>

      <BigCloseCTA heading="See a project that resembles yours?" />
    </main>
  );
};

export default Work;
