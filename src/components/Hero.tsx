import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import { useDrift } from "@/hooks/useDrift";
import { photography } from "@/assets/photography";

/**
 * Hero — cinematic split-stage.
 *
 * Headline column (60%) carries the brand promise + two CTAs.
 * Photo column (40%) anchors right at md+, sits below H1 on mobile so
 * the headline + buttons land in the first viewport on every device.
 *
 * Award-tier touches:
 *  - H1 lines rise on staggered clip-path reveal (.reveal-up).
 *  - Photo gets a slow ken-burns drift via .photo-drift.
 *  - "Trusted" italic keeps its hand-drawn underline.
 *  - CTAs use the new .cta-primary spring + .cta-ghost arrow vocabulary.
 */
const Hero = () => {
  const headlineRef = useDrift<HTMLHeadingElement>(4);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-28 md:pt-44 pb-16 md:pb-32 overflow-hidden"
    >
      {/* Desktop photo stage — absolute, right-anchored, soft mask blends to cream */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 right-0 w-[44%] -z-10 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 22%, black 100%)",
        }}
      >
        <img
          src={photography.heroAcreage}
          alt=""
          width={1536}
          height={1024}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover photo-drift"
        />
        {/* Warm color wash to keep the cream palette continuous */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background) / 0.55), hsl(var(--background) / 0.10) 35%, transparent 70%)",
          }}
        />
      </div>

      {/* Soft radial bloom — kept as the warming overlay above the photograph */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(145 18% 28% / 0.08), transparent 70%)",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Headline column — wider so the H1 reads first */}
          <div className="lg:col-span-7">
            <h1
              ref={headlineRef}
              id="hero-heading"
              data-drift
              className="text-display text-foreground max-w-[18ch] text-balance"
            >
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "120ms" }}>
                  One <span className="text-display-italic text-evergreen">trusted</span> contractor
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "240ms" }}>
                  for the property you value.
                </span>
              </span>
            </h1>

            <p
              className="text-subhead text-muted-foreground mt-8 max-w-[48ch] reveal-up"
              style={{ animationDelay: "380ms" }}
            >
              Hands-on finishing, repairs, and decks across rural Alberta. One
              person plans the work and walks the finish with you.
            </p>

            {/* CTA pair — primary spring + ghost arrow */}
            <div
              className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 reveal-up"
              style={{ animationDelay: "500ms" }}
            >
              <Link
                to="/contact"
                className="cta-anchor group/btn"
                aria-label="Get a free quote — start a conversation about your property"
              >
                <span>Get a Free Quote</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>

            </div>

          </div>

          {/* Mobile photo plate — single 16:10 image below H1 */}
          <div
            className="md:hidden -mx-4 sm:-mx-6 reveal-up"
            style={{ animationDelay: "860ms" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={photography.heroAcreage}
                alt=""
                width={1536}
                height={960}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover photo-drift"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, hsl(var(--background) / 0.6), transparent 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
