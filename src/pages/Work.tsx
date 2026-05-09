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

const SITE = "https://havencreekrenovations.ca";

// Asymmetric editorial layout — alternating 7/5 magazine spread on lg+.
const LAYOUTS = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-24",
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-7",
  "lg:col-span-7 lg:col-start-1 lg:mt-12",
  "lg:col-span-5",
];
const ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[3/4]",
];

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

      <RevealSection aria-labelledby="grid-heading" className="section-y">
        <Container size="wide">
          <h2 id="grid-heading" className="sr-only">Projects</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-28">
            {galleryPlates.map((p, i) => (
              <article
                key={p.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className={cn("group", LAYOUTS[i % LAYOUTS.length])}
              >
                <div
                  className={cn(
                    "overflow-hidden bg-evergreen/[0.04] transition-transform duration-500 ease-weighted group-hover:-translate-y-1",
                    ASPECTS[i % ASPECTS.length],
                  )}
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
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-5 pt-3 border-t border-foreground/10 flex items-baseline justify-between gap-4">
                  <h3 className="t-title text-foreground">{p.title}</h3>
                  <p className="t-micro whitespace-nowrap">
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
