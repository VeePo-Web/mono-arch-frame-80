import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import PremiumCard from "@/components/PremiumCard";
import { ProjectVignette, type VignetteCategory } from "@/components/ProjectVignette";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { serviceAreas } from "@/data/serviceAreas";

const SECTION_PADDING = "py-28 md:py-40";

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
      <section
        id="trust-promise"
        aria-labelledby="trust-heading"
        className={SECTION_PADDING}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 800px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label="THE PROMISE" />
              <h2 id="trust-heading" className="text-headline text-foreground mt-6 max-w-[18ch]">
                One contractor. One relationship. A clearer path from idea to completion.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8 space-y-7">
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
      </section>

      {/* ─── § II — Services Preview ─────────────────────────────────────── */}
      <section
        id="services-preview"
        aria-labelledby="services-heading"
        className={cn(SECTION_PADDING, "bg-card/40")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1100px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="lg:col-span-7">
              <Eyebrow numeral="II" label="WHAT WE BUILD" />
              <h2 id="services-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                Three services, held to one standard.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8">
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
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <PremiumCard featured={i === 0} className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
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

                    <div className="mt-9 inline-flex items-center gap-3 text-minimal text-evergreen">
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
      </section>

      {/* ─── § III — Full-Circle Approach ───────────────────────────────── */}
      <section
        id="approach"
        aria-labelledby="approach-heading"
        className={SECTION_PADDING}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 900px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
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
              <div
                aria-hidden="true"
                className="absolute left-[15px] top-3 bottom-3 w-px path-line"
              />
              <ol className="space-y-12 lg:space-y-14">
                {[
                  { n: "01", title: "Conversation", body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
                  { n: "02", title: "Planning", body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool." },
                  { n: "03", title: "Hands-On Completion", body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished." },
                ].map((step) => (
                  <li key={step.n} className="group/disc relative pl-12">
                    <span className="absolute left-0 top-1 numeral-disc" aria-hidden="true">
                      {step.n}
                    </span>
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[52ch]">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── § IV — Project Gallery Preview (with vignettes) ────────────── */}
      <section
        id="work-preview"
        aria-labelledby="work-heading"
        className={cn(SECTION_PADDING, "bg-card/40")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="lg:col-span-7">
              <Eyebrow numeral="IV" label="THE WORK" />
              <h2 id="work-heading" className="text-headline text-foreground mt-6 max-w-[18ch]">
                Real properties. Real outcomes. Worth a closer look.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8 flex lg:items-end lg:justify-end">
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
            {projects.map((p) => (
              <article key={p.slug} className="group">
                <PremiumCard className="h-full">
                  <div className="flex flex-col h-full">
                    {/* Vignette top */}
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-evergreen/10">
                      <ProjectVignette
                        category={p.category as VignetteCategory}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-weighted group-hover:scale-[1.015]"
                      />
                    </div>

                    <div className="p-8 lg:p-9 flex flex-col flex-1">
                      <Eyebrow label={p.category.toUpperCase()} />
                      <h3 className="text-title text-foreground mt-5 group-hover:text-evergreen transition-colors duration-500">
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
      </section>

      {/* ─── § V — Service Areas ────────────────────────────────────────── */}
      <section
        id="areas"
        aria-labelledby="areas-heading"
        className={SECTION_PADDING}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
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
                {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      to={area.href}
                      className="group flex items-center justify-between gap-6 py-7 transition-all duration-500 ease-swift"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title text-foreground group-hover:text-evergreen transition-all duration-500 group-hover:translate-x-1.5">
                          {area.name}
                        </h3>
                        <p className="mt-2 text-body text-muted-foreground text-[0.95rem]">
                          {area.shortLine}
                        </p>
                      </div>
                      <span className="icon-chip shrink-0 bg-evergreen/[0.06]">
                        <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── § VI — Final CTA: textured deep-evergreen close ────────────── */}
      <section
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative py-32 md:py-44 overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
        }}
      >
        {/* Drawn-in vertical hairline */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 w-px bg-background/10"
        />

        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="light" numeral="VI" label="NEXT STEP" />
              <h2
                id="final-cta-heading"
                className="text-headline text-background mt-6 max-w-[18ch]"
              >
                Ready to talk through your next property improvement?
              </h2>
              <ul className="mt-12 space-y-4 text-body text-background/85 max-w-xl">
                {[
                  "Hands-on support from planning to completion.",
                  "Interior finishing, exterior repairs, and decking for rural homes.",
                  "A respectful process built around trust, privacy, and long-term care.",
                  "Serving Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
                ].map((line, i) => (
                  <li key={line} className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="text-minimal text-background/50 tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Double-Bezel CTA stack on the right */}
            <div className="lg:col-span-5">
              <PremiumCard tone="evergreen">
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
              </PremiumCard>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Index;
