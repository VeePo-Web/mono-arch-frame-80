import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import PrimaryCTA from "@/components/PrimaryCTA";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { serviceAreas } from "@/data/serviceAreas";

const SECTION_PADDING = "py-24 md:py-36";

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label="THE PROMISE" />
              <h2
                id="trust-heading"
                className="text-headline text-foreground mt-6 max-w-[18ch]"
              >
                One contractor. One relationship. A clearer path from idea to completion.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8 space-y-6">
              <p className="text-body text-foreground/85">
                Renovation work should feel as solid as the result. Too many handoffs make
                the project feel scattered — and rural properties deserve more care than that.
              </p>
              <p className="text-body text-muted-foreground">
                Haven Creek was built for homeowners who want a more personal, hands-on
                way to improve their property. Fewer voices on the phone. More attention
                to the work itself.
              </p>
              <div className="pt-2">
                <PrimaryCTA to="/about" variant="ghost">
                  How we work
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── § II — Services Preview ─────────────────────────────────────── */}
      <section
        id="services-preview"
        aria-labelledby="services-heading"
        className={`${SECTION_PADDING} bg-card/50`}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1100px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <Eyebrow numeral="II" label="WHAT WE BUILD" />
              <h2
                id="services-heading"
                className="text-headline text-foreground mt-6 max-w-[20ch]"
              >
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                className="card-soft group p-8 lg:p-10 flex flex-col h-full"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <span className="numeral-mark tabular-nums">{s.numeral}</span>
                  <span className="h-px w-6 bg-evergreen/30 group-hover:w-14 transition-all duration-500 ease-smooth" />
                </div>

                <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-300">
                  {s.title}
                </h3>

                <p className="mt-3 text-subhead text-foreground/70 text-[1.05rem]">
                  {s.promise}
                </p>

                <p className="mt-5 text-body text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                  {s.cardBody}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-minimal text-evergreen">
                  <span>See the work</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Featured emphasis on Interior Finishing (per 2.2) */}
                {i === 0 && (
                  <div
                    aria-hidden="true"
                    className="absolute -inset-px rounded-md ring-1 ring-evergreen/0 group-hover:ring-evergreen/20 transition-all duration-500 pointer-events-none"
                  />
                )}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── § III — Full-Circle Approach (signature moment #2) ─────────── */}
      <section
        id="approach"
        aria-labelledby="approach-heading"
        className={SECTION_PADDING}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 900px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow numeral="III" label="THE APPROACH" />
              <h2
                id="approach-heading"
                className="text-headline text-foreground mt-6"
              >
                A path you can see from the start.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Three quiet steps. No hand-offs in between. The same person who plans
                the work walks the site with you when it's finished.
              </p>
            </div>

            {/* Vertical editorial path */}
            <div className="lg:col-span-7 lg:pl-8 relative">
              <div
                aria-hidden="true"
                className="absolute left-[15px] top-3 bottom-3 w-px path-line"
              />
              <ol className="space-y-12 lg:space-y-14">
                {[
                  {
                    n: "01",
                    title: "Conversation",
                    body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan.",
                  },
                  {
                    n: "02",
                    title: "Planning",
                    body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool.",
                  },
                  {
                    n: "03",
                    title: "Hands-On Completion",
                    body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished.",
                  },
                ].map((step) => (
                  <li key={step.n} className="relative pl-12">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 flex items-center justify-center h-8 w-8 rounded-full bg-background border border-evergreen/40 text-minimal text-evergreen tabular-nums"
                    >
                      {step.n}
                    </span>
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-prose">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── § IV — Project Gallery Preview ─────────────────────────────── */}
      <section
        id="work-preview"
        aria-labelledby="work-heading"
        className={`${SECTION_PADDING} bg-card/50`}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1000px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <Eyebrow numeral="IV" label="THE WORK" />
              <h2
                id="work-heading"
                className="text-headline text-foreground mt-6 max-w-[18ch]"
              >
                Real properties. Real outcomes. Worth a closer look.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8 flex lg:items-end lg:justify-end">
              <PrimaryCTA to="/work" variant="ghost">
                See all work
              </PrimaryCTA>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((p) => (
              <article
                key={p.slug}
                className="card-project group p-8 lg:p-10 flex flex-col h-full"
              >
                <Eyebrow label={p.category.toUpperCase()} />

                <h3 className="text-title text-foreground mt-6 group-hover:text-evergreen transition-colors">
                  {p.title}
                </h3>

                <p className="mt-2 text-minimal text-muted-foreground">
                  {p.area}
                </p>

                <p className="mt-6 text-body text-foreground/80 text-[0.95rem] leading-relaxed">
                  {p.scope}
                </p>

                <div className="mt-6 pt-6 border-t border-border/70">
                  <p className="text-minimal text-evergreen mb-2">Why it mattered</p>
                  <p className="text-body text-muted-foreground italic text-[0.95rem]">
                    {p.whyItMattered}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── § V — Service Areas (signature moment #3) ──────────────────── */}
      <section
        id="areas"
        aria-labelledby="areas-heading"
        className={SECTION_PADDING}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 700px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow numeral="V" label="WHERE WE WORK" />
              <h2
                id="areas-heading"
                className="text-headline text-foreground mt-6"
              >
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
                      className="group flex items-baseline justify-between gap-6 py-7 transition-all duration-300"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-300 group-hover:translate-x-1">
                          {area.name}
                        </h3>
                        <p className="mt-2 text-body text-muted-foreground text-[0.95rem]">
                          {area.shortLine}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-4 w-4 text-evergreen/40 group-hover:text-evergreen group-hover:translate-x-1 transition-all duration-300 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── § VI — Final CTA ───────────────────────────────────────────── */}
      <section
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className={`${SECTION_PADDING} bg-evergreen text-evergreen-foreground relative overflow-hidden`}
      >
        {/* Subtle texture: vertical hairline */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 bottom-0 w-px bg-background/10"
        />

        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow tone="light" numeral="VI" label="NEXT STEP" />
              <h2
                id="final-cta-heading"
                className="text-headline text-background mt-6 max-w-[18ch]"
              >
                Ready to talk through your next property improvement?
              </h2>
              <ul className="mt-10 space-y-3 text-body text-background/80 max-w-xl">
                {[
                  "Hands-on support from planning to completion.",
                  "Interior finishing, exterior repairs, and decking for rural homes.",
                  "A respectful process built around trust, privacy, and long-term care.",
                  "Serving Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-px w-4 bg-background/40 shrink-0"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:pt-12 flex flex-col gap-5">
              <Link
                to="/contact"
                className="inline-flex items-center justify-between gap-4 bg-background text-foreground px-8 py-5 rounded-md hover:bg-background/95 hover:-translate-y-px transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen group"
              >
                <span className="text-minimal">Request a Consultation</span>
                <ArrowRight
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center justify-between gap-4 border border-background/30 text-background px-8 py-5 rounded-md hover:border-background hover:bg-background/[0.04] transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen"
              >
                <span className="text-minimal">Talk Through Your Project</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <p className="mt-2 text-minimal text-background/70">
                Custom quotes based on your property, scope, and timeline.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default Index;
