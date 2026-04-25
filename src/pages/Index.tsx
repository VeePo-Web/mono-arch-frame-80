import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import PremiumCard from "@/components/PremiumCard";
import { ProjectVignette, type VignetteCategory } from "@/components/ProjectVignette";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useReveal } from "@/hooks/useReveal";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { serviceAreas } from "@/data/serviceAreas";

const SECTION_PADDING = "py-28 md:py-40";

/** Postal-code prefixes for the four areas — drawn from Canada Post FSAs. */
const AREA_POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

/* ─────────────────────────────────────────────────────────────────────────
   Section wrapper that wires a single IntersectionObserver to its subtree.
   Children using `data-reveal` resolve in cascade via --reveal-delay tokens.
   ───────────────────────────────────────────────────────────────────────── */
const RevealSection = ({
  children,
  className,
  ...rest
}: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.12 });
  return (
    <section ref={ref} data-revealed={revealed} className={className} {...rest}>
      {children}
    </section>
  );
};

const Index = () => {
  useDocumentTitle(
    "",
    "Hands-on interior finishing, exterior repairs, and decking for rural homeowners in Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
  );

  return (
    <main id="main">
      <LocalBusinessJsonLd />

      <Hero />

      {/* ─── § I — Trust Promise ─────────────────────────────────────────── */}
      <RevealSection
        id="trust-promise"
        aria-labelledby="trust-heading"
        className={SECTION_PADDING}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="I" label="THE PROMISE" />
              <h2 id="trust-heading" className="text-headline text-foreground mt-6 max-w-[18ch]">
                One contractor. One relationship. A clearer path from idea to completion.
              </h2>
            </div>
            <div
              className="lg:col-span-5 lg:pt-8 space-y-7"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <p className="text-body text-foreground/85">
                Renovation work should feel as solid as the result. Too many handoffs make
                the project feel scattered — and rural properties deserve more care than that.
              </p>
              <p className="pull-quote text-[1.15rem] md:text-[1.25rem]">
                Haven Creek was built for homeowners who want a more personal, hands-on
                way to improve their property.
              </p>
              <Link
                to="/about"
                className="group/ghost inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
              >
                <span>How we work</span>
                <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
              </Link>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § II — Services Preview ─────────────────────────────────────── */}
      <RevealSection
        id="services-preview"
        aria-labelledby="services-heading"
        className={cn(SECTION_PADDING, "section-wash")}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="II" label="WHAT WE BUILD" />
              <h2 id="services-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                Three services, held to one standard.
              </h2>
            </div>
            <div
              className="lg:col-span-5 lg:pt-8"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <p className="text-body text-muted-foreground">
                Interior finishing leads the work — it's where the craft is felt most
                clearly. Exterior repairs and decking carry the same care, scaled to
                what the weather and the land require.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <PremiumCard featured={i === 0} className="h-full">
                  {/* Monogram watermark — bottom-right, brand anchor */}
                  <span className="card-monogram" aria-hidden="true">HC</span>

                  <div className="relative p-8 lg:p-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-9">
                      <span className="numeral-disc">{s.numeral}</span>
                      <span className="h-px w-8 bg-evergreen/30 group-hover:w-20 transition-all duration-700 ease-weighted" />
                    </div>

                    <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                      {s.title}
                    </h3>

                    <p className="mt-3 text-subhead text-foreground/70 text-[1.05rem]">
                      {s.promise}
                    </p>

                    <p className="mt-5 text-body text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                      {s.cardBody}
                    </p>

                    {/* Micro-caption — area availability */}
                    <p className="mt-7 text-minimal text-muted-foreground/85 leading-relaxed">
                      Available in · Bragg Creek · Bearspaw · Rocky View · Water Valley
                    </p>

                    <div className="mt-5 inline-flex items-center gap-3 text-minimal text-evergreen">
                      <span>See the work</span>
                      <span className="icon-chip bg-evergreen/[0.06]">
                        <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* ─── § III — Full-Circle Approach ───────────────────────────────── */}
      <RevealSection
        id="approach"
        aria-labelledby="approach-heading"
        className={SECTION_PADDING}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div
              className="lg:col-span-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow numeral="III" label="THE APPROACH" />
              <h2 id="approach-heading" className="text-headline text-foreground mt-6">
                A path you can see from the start.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Three quiet steps. No hand-offs in between. The same person who plans
                the work walks the site with you when it's finished.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8 relative">
              {/* Drawing path-line — animates top→bottom */}
              <div
                aria-hidden="true"
                className="absolute left-[15px] top-3 bottom-3 w-px path-line"
                data-line-draw
              />
              <ol className="space-y-12 lg:space-y-14">
                {[
                  { n: "01", title: "Conversation", body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
                  { n: "02", title: "Planning", body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool." },
                  { n: "03", title: "Hands-On Completion", body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished." },
                ].map((step, i) => (
                  <li
                    key={step.n}
                    className="group/disc relative pl-12"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 220}ms` }}
                  >
                    <span className="absolute left-0 top-1 numeral-disc" aria-hidden="true">
                      {step.n}
                    </span>
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[52ch]">
                      {step.body}
                    </p>
                  </li>
                ))}
                {/* Finish marker — fades in after step 03 */}
                <li
                  className="relative pl-12"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: "1100ms" }}
                  aria-hidden="true"
                >
                  <span className="absolute left-[10px] top-2 h-[10px] w-[10px] rounded-full bg-evergreen shadow-[0_0_0_4px_hsl(var(--evergreen)/0.12)]" />
                  <p className="text-minimal text-evergreen">Done.</p>
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § IV — Project Gallery Preview ─────────────────────────────── */}
      <RevealSection
        id="work-preview"
        aria-labelledby="work-heading"
        className={cn(SECTION_PADDING, "section-wash")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1400px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="IV" label="THE WORK" />
              <h2 id="work-heading" className="text-headline text-foreground mt-6 max-w-[18ch]">
                Real properties. Real outcomes. Worth a closer look.
              </h2>
            </div>
            <div
              className="lg:col-span-5 lg:pt-8 flex lg:items-end lg:justify-end"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <Link
                to="/work"
                className="group/ghost inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
              >
                <span>See all work</span>
                <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {projects.map((p, i) => (
              <article
                key={p.slug}
                className="group"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <PremiumCard className="h-full transition-transform duration-700 ease-weighted group-hover:-translate-y-1">
                  <div className="flex flex-col h-full">
                    {/* Vignette top — with plate number overlay */}
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-evergreen/10">
                      <ProjectVignette
                        category={p.category as VignetteCategory}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-weighted group-hover:scale-[1.015]"
                      />
                      <span
                        className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic transition-transform duration-700 ease-weighted group-hover:translate-y-0.5"
                        aria-hidden="true"
                      >
                        Plate {["I", "II", "III"][i]}
                      </span>
                    </div>

                    {/* Caption hairline + category mark — figure-caption pattern */}
                    <div className="px-8 lg:px-9 pt-6">
                      <span className="block h-px w-10 bg-evergreen/35 mb-3" aria-hidden="true" />
                      <p className="text-minimal text-evergreen">{p.category.toUpperCase()}</p>
                    </div>

                    <div className="p-8 lg:p-9 pt-5 flex flex-col flex-1">
                      <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-minimal text-muted-foreground">{p.area}</p>
                      <p className="mt-5 text-body text-foreground/80 text-[0.95rem] leading-relaxed flex-1">
                        {p.scope}
                      </p>
                      <div className="mt-6 pl-4 border-l-2 border-evergreen/35">
                        <p className="text-minimal text-evergreen mb-1.5">Why it mattered</p>
                        <p className="text-body text-muted-foreground italic text-[0.95rem]">
                          {p.whyItMattered}
                        </p>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </article>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* ─── § V — Service Areas Roster ─────────────────────────────────── */}
      <RevealSection
        id="areas"
        aria-labelledby="areas-heading"
        className={SECTION_PADDING}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div
              className="lg:col-span-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow numeral="V" label="WHERE WE WORK" />
              <h2 id="areas-heading" className="text-headline text-foreground mt-6">
                Local, by choice.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Four communities. Each one different in pace, exposure, and the kind
                of property care it asks for.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border/60">
                {serviceAreas.map((area, i) => (
                  <li
                    key={area.slug}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${180 + i * 90}ms` }}
                  >
                    <Link
                      to={area.href}
                      className="area-row group flex items-baseline justify-between gap-6 py-10"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[1.65rem] md:text-[2rem] leading-tight text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                          {area.name}
                        </h3>
                        <p className="mt-2 text-body text-muted-foreground text-[0.95rem]">
                          {area.shortLine}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-minimal text-evergreen/70 tabular-nums">
                          {AREA_POSTAL[area.slug]}
                        </span>
                        <span className="icon-chip bg-evergreen/[0.06]">
                          <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § VI — Final CTA: textured deep-evergreen close ────────────── */}
      <RevealSection
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative py-32 md:py-44 overflow-hidden bg-evergreen-deep"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
        }}
      >
        {/* Center hairline */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 w-px bg-background/10"
        />

        {/* Brand silhouette — single-stroke skyline along bottom edge */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 w-full h-[120px] text-background/[0.06] pointer-events-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 0 100 L 120 100 L 160 70 L 200 100 L 360 100 L 400 75 L 440 50 L 480 75 L 520 100 L 700 100 L 760 60 L 820 100 L 980 100 L 1020 80 L 1080 65 L 1140 80 L 1180 100 L 1440 100"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line x1="0" y1="100" x2="1440" y2="100" stroke="currentColor" strokeWidth="1" />
        </svg>

        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div
              className="lg:col-span-7"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow tone="light" numeral="VI" label="NEXT STEP" />
              <h2
                id="final-cta-heading"
                className="text-headline text-background mt-6 max-w-[18ch]"
              >
                Ready to talk through your next property improvement?
              </h2>

              {/* Manifest list — left rule + hanging numerals */}
              <ul className="mt-12 max-w-xl border-l border-background/15 pl-6 space-y-5 text-body text-background/85">
                {[
                  "Hands-on support from planning to completion.",
                  "Interior finishing, exterior repairs, and decking for rural homes.",
                  "A respectful process built around trust, privacy, and long-term care.",
                  "Serving Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
                ].map((line, i) => (
                  <li key={line} className="flex items-baseline gap-5">
                    <span
                      aria-hidden="true"
                      className="text-minimal text-background/55 tabular-nums w-6"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Triple-Bezel CTA stack on the right */}
            <div
              className="lg:col-span-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <div className="bezel-shell bezel-shell-evergreen bezel-shell-closing">
                <div className="bezel-core h-full">
                  <div className="p-7 md:p-8">
                    <Link
                      to="/contact"
                      className="group/btn flex items-center justify-between gap-4 bg-evergreen text-evergreen-foreground rounded-full pl-7 pr-1.5 py-1.5 min-h-[56px] text-minimal transition-all duration-500 ease-swift hover:bg-evergreen-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                    >
                      <span>Request a Consultation</span>
                      <span className="icon-chip icon-chip-light bg-background/15">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </Link>

                    <div className="my-5 flex items-center gap-3">
                      <span className="h-px flex-1 bg-foreground/10" />
                      <span className="text-minimal text-muted-foreground">Or</span>
                      <span className="h-px flex-1 bg-foreground/10" />
                    </div>

                    <Link
                      to="/work"
                      className="group/ghost flex items-center justify-between gap-3 text-minimal text-foreground/85 hover:text-evergreen transition-colors duration-500"
                    >
                      <span>Talk Through Your Project</span>
                      <span className="block w-6 h-px bg-evergreen/50 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
                    </Link>

                    <p className="mt-6 text-minimal text-muted-foreground leading-relaxed">
                      Custom quotes based on your property, scope, and timeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default Index;
