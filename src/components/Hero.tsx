import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import PrimaryCTA from "./PrimaryCTA";
import logoMark from "@/assets/logo/haven-creek-mark.webp";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * Hero — the signature opening (per knowledge/2.1 + 2.3 §4).
 * Asymmetric 12-col grid: editorial type left, mandated proof-chip fallback right.
 * No stock luxury imagery — see 1.5 §Dealbreakers. The fallback IS the design until real photos arrive.
 */
const Hero = () => (
  <section
    aria-labelledby="hero-heading"
    className="relative pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden"
  >
    {/* Subtle vertical hairline — the "creek" suggestion, never said out loud. */}
    <div
      aria-hidden="true"
      className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-evergreen/10 -z-10"
    />

    <Container size="wide">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: editorial type column */}
        <div className="lg:col-span-7">
          <div className="reveal-up" style={{ animationDelay: "0ms" }}>
            <Eyebrow numeral="HC" label="EST. ALBERTA · RURAL HOMES" />
          </div>

          <h1
            id="hero-heading"
            className="text-display text-foreground mt-8 reveal-up"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-display-italic text-evergreen">Trusted</span> renovations
            for rural homes.
          </h1>

          <p
            className="text-subhead text-muted-foreground mt-6 max-w-xl reveal-up"
            style={{ animationDelay: "160ms" }}
          >
            Hands-on finishing, repairs, and decks — from planning through completion.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 reveal-up"
            style={{ animationDelay: "240ms" }}
          >
            <PrimaryCTA to="/contact">Request a Consultation</PrimaryCTA>
            <PrimaryCTA to="/work" variant="ghost">
              View Our Work
            </PrimaryCTA>
          </div>

          <p
            className="mt-6 text-minimal text-muted-foreground max-w-md reveal-up"
            style={{ animationDelay: "320ms" }}
          >
            No pressure. Just a clear conversation about your property.
          </p>

          {/* Service-area trust line */}
          <div
            className="mt-12 pt-8 border-t border-border/60 reveal-up"
            style={{ animationDelay: "400ms" }}
          >
            <p className="text-minimal text-muted-foreground mb-3">Serving</p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {serviceAreas.map((area, i) => (
                <li key={area.slug} className="flex items-center gap-5">
                  <Link
                    to={area.href}
                    className="text-body text-foreground/85 hover:text-evergreen transition-colors text-[0.95rem]"
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

        {/* Right: editorial proof panel (mandated fallback per 2.1) */}
        <div className="lg:col-span-5 reveal-up" style={{ animationDelay: "200ms" }}>
          <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-card border border-border rounded-md overflow-hidden">
            {/* Vertical evergreen line — the creek suggestion */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-12 bottom-12 w-px bg-evergreen/40"
            />

            {/* Logo monogram watermark */}
            <img
              src={logoMark}
              alt=""
              aria-hidden="true"
              width={400}
              height={400}
              className="absolute -right-12 -bottom-12 w-[60%] opacity-[0.06] pointer-events-none select-none"
              fetchPriority="high"
              decoding="async"
            />

            {/* Three proof chips — Interior · Exterior · Decking */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
              <div>
                <Eyebrow label="WHAT WE DO" />
                <p className="mt-6 text-subhead text-foreground/85 max-w-[20ch]">
                  Three services. One contractor. Held to the same standard.
                </p>
              </div>

              <ul className="space-y-5">
                {services.map((s) => (
                  <li key={s.slug} className="group">
                    <Link
                      to={s.href}
                      className="block py-2 transition-all duration-300"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="numeral-mark tabular-nums w-4">{s.numeral}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors leading-tight">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-minimal text-muted-foreground">
                            {s.promise}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-3.5 w-3.5 text-evergreen/50 group-hover:text-evergreen group-hover:translate-x-1 transition-all"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 ml-8 h-px w-12 bg-evergreen/30 group-hover:w-24 transition-all duration-500" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Continue cue */}
      <div className="mt-20 flex items-center justify-center">
        <a
          href="#trust-promise"
          className="inline-flex flex-col items-center gap-2 text-minimal text-muted-foreground hover:text-evergreen transition-colors group"
          aria-label="Continue reading"
        >
          <span>Continue</span>
          <ChevronDown
            className="h-4 w-4 group-hover:translate-y-0.5 transition-transform"
            aria-hidden="true"
          />
        </a>
      </div>
    </Container>
  </section>
);

export default Hero;
