import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import { workPhotos } from "@/assets/photography";
import { galleryPlates } from "@/data/galleryPlates";

/**
 * Hero — magazine-grade editorial split.
 * Left: eyebrow + .t-display H1 + .t-lede + one solid evergreen CTA.
 * Right: 16:10 photo plate (Apple-soft drop) with caption strip.
 * Bottom: thin meta locator row at lg+ — pure typographic locator.
 */
const Hero = () => {
  const plate = galleryPlates.find((p) => p.slug === "bearspaw-wraparound-deck")!;
  const photoSrc = workPhotos[plate.slug];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-28 md:pt-40 pb-16 md:pb-24"
    >
      <Container size="wide">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left — type column */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className="inline-flex items-center gap-4 reveal-up"
              style={{ animationDelay: "60ms" }}
            >
              <span className="block w-10 h-px bg-evergreen/60" aria-hidden="true" />
              <span className="t-eyebrow">Family-run · Foothills, AB</span>
            </div>

            <h1
              id="hero-heading"
              className="mt-7 t-display wrap-editorial text-foreground max-w-[14ch]"
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
              className="t-lede mt-8 max-w-[44ch] reveal-up"
              style={{ animationDelay: "420ms" }}
            >
              Hands-on finishing, repairs, and decks across rural Alberta. One
              person plans the work and walks the finish with you.
            </p>

            <div className="mt-10 reveal-up" style={{ animationDelay: "540ms" }}>
              <Link
                to="/contact"
                className={cn(
                  "group/btn inline-flex items-center gap-3 rounded-full",
                  "bg-evergreen text-evergreen-foreground",
                  "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                  "transition-all duration-500 ease-weighted",
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
            className="lg:col-span-6 flex flex-col reveal-up"
            style={{ animationDelay: "320ms" }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="block w-10 h-px bg-evergreen/50" aria-hidden="true" />
              <span className="t-eyebrow">Recent work — {plate.area}</span>
            </div>

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

            <figcaption className="flex items-end justify-between gap-4 mt-5 pt-3 border-t border-foreground/10">
              <p className="t-title text-foreground leading-snug">{plate.title}</p>
              <p className="t-micro whitespace-nowrap">
                {plate.category} · {plate.area}
              </p>
            </figcaption>
          </figure>
        </div>

        {/* Bottom meta strip — pure typographic locator (lg+ only) */}
        <div className="hidden lg:flex items-end justify-between mt-24 pt-6 border-t border-foreground/10">
          <span className="t-micro">Haven Creek / 2026</span>
          <span className="t-micro text-right leading-relaxed">
            Foothills, AB · Available across rural Alberta
          </span>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
