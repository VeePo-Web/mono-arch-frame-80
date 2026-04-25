import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import { cn } from "@/lib/utils";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import HeroVignette from "./HeroVignette";
import { useDrift } from "@/hooks/useDrift";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * Hero — the signature opening (per knowledge/2.1 + 2.3 §4).
 * Editorial split: type-driven left column · Double-Bezel proof panel right column.
 * Hand-drawn property scene (inline SVG, ~2 KB) replaces the watermark logo.
 * Each headline line draws in via clip-path mask. Reveals stagger via reveal-up.
 */
const Hero = () => {
  const headlineRef = useDrift<HTMLHeadingElement>(4);
  return (
  <section
    aria-labelledby="hero-heading"
    className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden"
  >
    {/* Soft radial bloom from upper-right — invisible until you look for it */}
    <div
      aria-hidden="true"
      className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full -z-10"
      style={{
        background:
          "radial-gradient(closest-side, hsl(145 18% 28% / 0.08), transparent 70%)",
      }}
    />

    <Container size="wide">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* Left: editorial type column */}
        <div className="lg:col-span-7">
          <div className="reveal-up" style={{ animationDelay: "0ms" }}>
            <Eyebrow numeral="HC" label="EST. ALBERTA · RURAL HOMES" />
          </div>

          {/* Headline — three mask-revealing lines for the editorial draw effect */}
          <h1
            ref={headlineRef}
            id="hero-heading"
            data-drift
            className="text-display text-foreground mt-8 leading-[1.02]"
          >
            <span className="block overflow-hidden">
              <span
                className="block reveal-up"
                style={{ animationDelay: "120ms" }}
              >
                <span className="relative inline-block text-display-italic text-evergreen">
                  Trusted
                  {/* Hand-drawn underline — draws after the word lands */}
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
            className="text-subhead text-muted-foreground mt-7 max-w-xl reveal-up"
            style={{ animationDelay: "380ms" }}
          >
            Hands-on finishing, repairs, and decks — from planning through completion.
          </p>

          {/* CTA pair — Button-in-Button primary + ghost secondary */}
          <div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 reveal-up"
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
                "shadow-[0_1px_0_hsl(145_22%_38%/0.4)_inset,0_18px_36px_-12px_hsl(145_24%_8%/0.30)]",
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

          <p
            className="mt-7 text-minimal text-muted-foreground max-w-md reveal-up"
            style={{ animationDelay: "620ms" }}
          >
            No pressure. Just a clear conversation about your property.
          </p>

          {/* Service-area trust line */}
          <div
            className="mt-14 pt-8 border-t border-border/60 reveal-up"
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
        </div>

        {/* Right: Double-Bezel proof panel — outer shell + inner core */}
        <div
          className="lg:col-span-5 reveal-up"
          style={{ animationDelay: "320ms" }}
        >
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4]">
              {/* Hand-drawn property vignette — fills lower 60% of panel */}
              <HeroVignette className="absolute inset-x-0 bottom-0 h-[64%] w-full opacity-90 pointer-events-none" />

              {/* Vertical evergreen "creek" — left edge inlay */}
              <div
                aria-hidden="true"
                className="absolute left-0 top-12 bottom-12 w-px bg-evergreen/40"
              />

              {/* Top eyebrow + headline */}
              <div className="relative h-full flex flex-col justify-between p-7 md:p-9">
                <div>
                  <Eyebrow label="WHAT WE DO" />
                  <p className="mt-5 text-subhead text-foreground/85 max-w-[18ch] leading-snug">
                    Three services. One contractor. Held to the same standard.
                  </p>
                </div>

                {/* Three service rows — numeral disc + title + Button-in-Button arrow */}
                <ul className="space-y-2 -mx-2">
                  {services.map((s) => (
                    <li key={s.slug} className="group/disc">
                      <Link
                        to={s.href}
                        className="block px-2 py-3 rounded-lg transition-colors duration-500 ease-swift hover:bg-evergreen/[0.04]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="numeral-disc shrink-0">{s.numeral}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[1.1rem] md:text-[1.2rem] font-serif text-foreground group-hover/disc:text-evergreen transition-colors duration-500 leading-tight">
                              {s.title}
                            </h3>
                            <p className="mt-1 text-minimal text-muted-foreground">
                              {s.promise}
                            </p>
                          </div>
                          <span className="icon-chip shrink-0 bg-evergreen/[0.06]">
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-evergreen"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue cue */}
      <div className="mt-20 flex items-center justify-center reveal-up" style={{ animationDelay: "880ms" }}>
        <a
          href="#trust-promise"
          className="group inline-flex flex-col items-center gap-2 text-minimal text-muted-foreground hover:text-evergreen transition-colors duration-500"
          aria-label="Continue reading"
        >
          <span>Continue</span>
          <ChevronDown
            className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-500"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </a>
      </div>
    </Container>
  </section>
  );
};

export default Hero;
