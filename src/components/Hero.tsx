import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import { useDrift } from "@/hooks/useDrift";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * Hero — single editorial open.
 * Magazine-spread feeling: eyebrow → oversized headline → subhead → CTA pair
 * → service-area trust line. One focal point. One signature mark (the
 * italic "Trusted" + hand-drawn underline).
 */
const Hero = () => {
  const headlineRef = useDrift<HTMLHeadingElement>(4);
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-40 md:pt-52 pb-28 md:pb-40 overflow-hidden"
    >
      {/* Soft radial bloom from upper-right — invisible until you look for it */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(145 18% 28% / 0.07), transparent 70%)",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Headline column — owns the spread */}
          <div className="lg:col-span-10">
            <div className="reveal-up" style={{ animationDelay: "0ms" }}>
              <Eyebrow label="Haven Creek · Est. Alberta" />
            </div>

            <h1
              ref={headlineRef}
              id="hero-heading"
              data-drift
              className="text-display text-foreground mt-10 max-w-[16ch]"
            >
              <span className="block overflow-hidden">
                <span
                  className="block reveal-up"
                  style={{ animationDelay: "120ms" }}
                >
                  <span className="relative inline-block text-display-italic text-evergreen">
                    Trusted
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 200 12"
                      className="absolute left-0 right-0 -bottom-2 w-full h-2.5 overflow-visible"
                      fill="none"
                    >
                      <path
                        d="M 4 8 C 50 2, 110 10, 196 5"
                        stroke="hsl(var(--evergreen) / 0.55)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="vignette-stroke"
                        style={{ animationDelay: "1.0s" }}
                      />
                    </svg>
                  </span>{" "}
                  renovations
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block reveal-up"
                  style={{ animationDelay: "240ms" }}
                >
                  for rural homes.
                </span>
              </span>
            </h1>

            <p
              className="text-subhead text-muted-foreground mt-10 max-w-[44ch] reveal-up"
              style={{ animationDelay: "380ms" }}
            >
              Hands-on finishing, repairs, and decks — from planning through completion.
            </p>

            <div
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 reveal-up"
              style={{ animationDelay: "500ms" }}
            >
              <Link
                to="/contact"
                className={cn(
                  "group/btn inline-flex items-center gap-3 rounded-full",
                  "bg-evergreen text-evergreen-foreground",
                  "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                  "transition-all duration-500 ease-swift",
                  "hover:bg-evergreen-hover active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span>Request a Consultation</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>

              <Link
                to="/work"
                className="group/ghost inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-foreground transition-colors duration-500 ease-swift"
              >
                <span>View Our Work</span>
                <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
              </Link>
            </div>
          </div>

          {/* Quiet right colophon — pure type, no panel */}
          <div className="hidden lg:block lg:col-span-2">
            <div
              className="reveal-up text-right"
              style={{ animationDelay: "620ms" }}
            >
              <p className="font-serif italic font-light text-foreground/45 text-[0.95rem] leading-snug">
                Bragg Creek<br />
                Bearspaw<br />
                Rocky View<br />
                Water Valley
              </p>
              <p className="mt-6 text-minimal text-evergreen/70 tabular-nums">
                No. 001
              </p>
            </div>
          </div>
        </div>

        {/* Service-area trust line — mobile fallback */}
        <div
          className="lg:hidden mt-16 pt-8 border-t border-border/60 reveal-up"
          style={{ animationDelay: "740ms" }}
        >
          <p className="text-minimal text-muted-foreground mb-4">Serving</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {serviceAreas.map((area, i) => (
              <li key={area.slug} className="flex items-center gap-5">
                <Link
                  to={area.href}
                  className="text-body text-foreground/85 hover:text-evergreen transition-colors duration-300 text-[0.95rem]"
                >
                  {area.name}
                </Link>
                {i < serviceAreas.length - 1 && (
                  <span className="text-evergreen/40" aria-hidden="true">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
