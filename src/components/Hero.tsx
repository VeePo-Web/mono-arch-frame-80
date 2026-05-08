import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { workPhotos } from "@/assets/photography";
import { galleryPlates } from "@/data/galleryPlates";

/**
 * Hero — 12-col editorial split.
 * Left: eyebrow + H1 + subhead + one solid evergreen CTA.
 * Right: 16:10 photo plate with quiet caption strip (RoyalMechanical-style,
 * adapted to Haven Creek's cream + evergreen palette — no gold, no folio).
 * Mobile (<lg) stacks the photo below the type so LCP stays text.
 */
const Hero = () => {
  // Use the wraparound deck plate as the hero photograph — most recognisable
  // "rural Alberta finished work" frame in the manifest.
  const plate = galleryPlates.find((p) => p.slug === "bearspaw-wraparound-deck")!;
  const photoSrc = workPhotos[plate.slug];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-28 md:pt-40 pb-16 md:pb-24"
    >
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left — type column */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="inline-flex items-center gap-4 reveal-up"
              style={{ animationDelay: "60ms" }}
            >
              <span className="block w-10 h-px bg-evergreen/60" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-muted-foreground">
                Family-run · Foothills, AB
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-7 text-display text-foreground max-w-[18ch] text-balance leading-[1.05]"
            >
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "160ms" }}>
                  One trusted contractor
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "280ms" }}>
                  for the property you value.
                </span>
              </span>
            </h1>

            <p
              className="text-subhead text-muted-foreground mt-7 max-w-[48ch] reveal-up"
              style={{ animationDelay: "420ms" }}
            >
              Hands-on finishing, repairs, and decks across rural Alberta. One
              person plans the work and walks the finish with you.
            </p>

            <div className="mt-9 reveal-up" style={{ animationDelay: "540ms" }}>
              <Link
                to="/contact"
                className={cn(
                  "group/btn inline-flex items-center gap-3 rounded-full",
                  "bg-evergreen text-evergreen-foreground",
                  "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                  "transition-all duration-500 ease-swift",
                  "hover:bg-evergreen-hover active:scale-[0.98]",
                  "shadow-[0_1px_0_hsl(145_22%_38%/0.4)_inset,0_18px_36px_-12px_hsl(145_24%_8%/0.30)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label="Get a free quote — start a conversation about your property"
              >
                <span>Get a Free Quote</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            </div>

            <p
              className="mt-5 text-[13px] text-muted-foreground reveal-up"
              style={{ animationDelay: "640ms" }}
            >
              Replies within two business days.
            </p>
          </div>

          {/* Right — photo plate */}
          <figure
            className="lg:col-span-7 flex flex-col reveal-up"
            style={{ animationDelay: "320ms" }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-12 h-px bg-evergreen/50" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-muted-foreground">
                Recent work · {plate.area}
              </span>
            </div>

            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm hero-plate bg-evergreen/5">
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

            <figcaption className="flex items-end justify-between gap-4 mt-5 pl-1 pr-1">
              <p className="font-serif text-[1.05rem] text-foreground leading-snug">
                {plate.title}
              </p>
              <p className="text-[10px] tracking-[0.26em] uppercase text-muted-foreground whitespace-nowrap">
                {plate.category} · {plate.area}
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
