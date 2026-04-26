import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import { useDrift } from "@/hooks/useDrift";
import { serviceAreas } from "@/data/serviceAreas";
import { photography } from "@/assets/photography";

/**
 * Hero — five-second trust answer.
 *
 * The persona's verbatim primary hook is the H1:
 *   "One trusted contractor for the property you value."
 *
 * The right column is no longer a colophon vanity; it is a *behavioural*
 * promise list answering four of Sam's seven named fears in the first
 * viewport, capped with a single "Trusted in" line that names the four
 * communities. No fake imagery — typography is the proof here.
 */

const FIELD_NOTES = [
  {
    title: "One person on site",
    body: "Plans the work, does the work, walks the finish with you.",
  },
  {
    title: "Property left as found",
    body: "Access, animals, and clean-up are part of the deliverable.",
  },
  {
    title: "Real reply within two business days",
    body: "From a person, not a funnel.",
  },
  {
    title: "No template quote",
    body: "Built around your site, your scope, your materials.",
  },
];

const Hero = () => {
  const headlineRef = useDrift<HTMLHeadingElement>(4);
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-32 md:pt-52 pb-16 md:pb-36 overflow-hidden"
    >
      {/* Soft photographic backdrop — the brand's first real photograph,
          held in the right-side bloom area at low opacity so the typography
          remains the primary signal. */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-24 w-[680px] h-[520px] -z-10 hidden md:block overflow-hidden rounded-[3rem]"
        style={{
          maskImage:
            "radial-gradient(ellipse at 70% 40%, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.55) 45%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 40%, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.55) 45%, transparent 75%)",
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
          className="w-full h-full object-cover opacity-[0.55]"
        />
      </div>

      {/* Soft radial bloom — kept as the warming overlay above the photograph */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(145 18% 28% / 0.07), transparent 70%)",
        }}
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Headline column */}
          <div className="lg:col-span-8">
            <div className="reveal-up" style={{ animationDelay: "0ms" }}>
              <Eyebrow label="Haven Creek · Rural Alberta" />
            </div>

            <h1
              ref={headlineRef}
              id="hero-heading"
              data-drift
              className="text-display text-foreground mt-10 max-w-[18ch] text-balance"
            >
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "120ms" }}>
                  One{" "}
                  <span className="relative inline-block text-display-italic text-evergreen">
                    trusted
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
                  contractor
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block reveal-up" style={{ animationDelay: "240ms" }}>
                  for the property you value.
                </span>
              </span>
            </h1>

            <p
              className="text-subhead text-muted-foreground mt-10 max-w-[52ch] reveal-up"
              style={{ animationDelay: "380ms" }}
            >
              Hands-on finishing, repairs, and decks across rural Alberta. One
              person plans the work, does the work, and walks the finish with you.
              No rotating trades.
            </p>

            <div
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 reveal-up"
              style={{ animationDelay: "500ms" }}
            >
              <Link
                to="/contact"
                className="cta-anchor group/btn"
                aria-label="Request a consultation — start a conversation about your property"
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
                <span>View the Work</span>
                <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
              </Link>
            </div>

            {/* Trust microcopy — answers three of Sam's fears in one line */}
            <p
              className="trust-microcopy mt-7 reveal-up"
              style={{ animationDelay: "620ms" }}
            >
              <span>Reply within 2 business days</span>
              <span>No obligation</span>
              <span>No pressure</span>
            </p>
          </div>

          {/* Right "Field notes" promise column */}
          <aside
            className="hidden lg:block lg:col-span-4"
            aria-label="What this means in practice"
          >
            <div
              className="reveal-up border-l border-evergreen/20 pl-7"
              style={{ animationDelay: "740ms" }}
            >
              <p className="text-minimal text-evergreen/80 mb-7">
                What this means in practice
              </p>

              <ul className="space-y-6">
                {FIELD_NOTES.map((note, i) => (
                  <li key={note.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="text-minimal text-evergreen/80 tabular-nums pt-1 w-6 shrink-0"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-foreground/90 text-[1.02rem] leading-snug">
                        {note.title}
                      </p>
                      <p className="mt-1.5 text-minimal text-muted-foreground leading-relaxed normal-case tracking-normal">
                        {note.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-9 pt-6 border-t border-evergreen/15">
                <p className="text-minimal text-evergreen/80 mb-3">Trusted in</p>
                <p className="font-serif italic text-foreground/85 text-[1rem] leading-relaxed">
                  {serviceAreas.map((a, i) => (
                    <span key={a.slug}>
                      <Link
                        to={a.href}
                        className="rounded-sm hover:text-evergreen focus-visible:outline-none focus-visible:underline focus-visible:decoration-evergreen focus-visible:underline-offset-4 focus-visible:text-evergreen transition-colors duration-300"
                      >
                        {a.name}
                      </Link>
                      {i < serviceAreas.length - 1 && (
                        <span className="text-evergreen/35" aria-hidden="true">{" · "}</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile fallback — Trusted-in line + the promise list collapsed to a single grid */}
        <div
          className="lg:hidden mt-14 pt-8 border-t border-border/60 reveal-up"
          style={{ animationDelay: "740ms" }}
        >
          <p className="text-minimal text-evergreen/80 mb-5">
            What this means in practice
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FIELD_NOTES.map((note, i) => (
              <li key={note.title} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="text-minimal text-evergreen/80 tabular-nums pt-0.5 w-6 shrink-0"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-foreground/90 text-[1rem] leading-snug">
                    {note.title}
                  </p>
                  <p className="mt-1 text-minimal text-muted-foreground leading-relaxed normal-case tracking-normal">
                    {note.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 pt-6 border-t border-evergreen/15 text-minimal text-evergreen/80 mb-3">
            Trusted in
          </p>
          <p className="font-serif italic text-foreground/85 text-[1rem] leading-relaxed">
            {serviceAreas.map((a, i) => (
              <span key={a.slug}>
                <Link
                  to={a.href}
                  className="rounded-sm hover:text-evergreen focus-visible:outline-none focus-visible:underline focus-visible:decoration-evergreen focus-visible:underline-offset-4 focus-visible:text-evergreen transition-colors duration-300"
                >
                  {a.name}
                </Link>
                {i < serviceAreas.length - 1 && (
                  <span className="text-evergreen/35" aria-hidden="true">{" · "}</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
