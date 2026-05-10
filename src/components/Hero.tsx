import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { useReveal } from "@/hooks/useReveal";
import { workPhotos } from "@/assets/photography";
import { galleryPlates } from "@/data/galleryPlates";

/**
 * Hero — magazine-grade editorial split.
 * Left: eyebrow + .t-display H1 + .t-lede + one solid evergreen CTA + reply note.
 * Right: 16:10 photo plate, no caption — the photo speaks for itself.
 */
const Hero = () => {
  const plate = galleryPlates.find((p) => p.slug === "bearspaw-wraparound-deck")!;
  const photoSrc = workPhotos[plate.slug];
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });

  return (
    <section
      ref={ref}
      data-revealed={revealed}
      aria-labelledby="hero-heading"
      className="relative pt-28 md:pt-40 section-yb"
    >
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — type column */}
          <div className="lg:col-span-5 flex flex-col">
            <h1
              id="hero-heading"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
              className="t-display wrap-editorial text-foreground"
            >
              One trusted contractor for the property you value.
            </h1>

            <p
              className="t-lede mt-8 max-w-[44ch]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "240ms" }}
            >
              Hands-on finishing, repairs, and decks across rural Alberta. One
              person plans the work and walks the finish with you.
            </p>

            <div
              className="mt-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: "360ms" }}
            >
              <Link
                to="/contact"
                className={cn(
                  "cta-spring inline-flex items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "px-6 min-h-[52px] text-[15px] font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label="Get a free quote — start a conversation about your property"
              >
                Get a Free Quote
              </Link>
            </div>

            <p
              className="mt-5 text-sm text-muted-foreground"
              data-reveal
              style={{ ["--reveal-delay" as string]: "460ms" }}
            >
              Replies within two business days.
            </p>
          </div>

          {/* Right — photo plate, caption-free */}
          <figure
            className="lg:col-span-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "320ms" }}
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm hero-plate">
              <img
                src={photoSrc}
                alt={`${plate.title} — ${plate.area}, Alberta`}
                width={1600}
                height={1000}
                loading="eager"
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
