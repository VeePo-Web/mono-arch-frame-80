import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { ProjectVignette, type VignetteCategory } from "@/components/ProjectVignette";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { services } from "@/data/services";

const SECTION = "py-24 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const SERVICE_CATEGORY: Record<string, VignetteCategory> = {
  "interior-finishing": "Interior Finishing",
  "exterior-finishing": "Exterior Repairs",
  decking: "Decking",
};

const SERVICE_DETAIL: Record<string, string> = {
  "interior-finishing":
    "The visible part of the work — trim, transitions, casings, baseboards, and built-ins. The detail-level work that decides whether a renovation reads as finished or merely complete.",
  "exterior-finishing":
    "Siding, soffit, fascia, entrances, stairs, rails, and weather-side detail work. Built for prairie exposure and the realities of rural property care.",
  decking:
    "Decks planned around the way you actually use the back of the home — privacy, exposure, view, and the structure underneath. Built to stay where it's put.",
};

const Services = () => {
  useSeo({
    title: "Services — Three, Held to One Standard",
    description:
      "Interior finishing, exterior finishing & repairs, and decking — three focused renovation services for rural Alberta homes, held to one consistent standard.",
    path: "/services",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
        ]}
      />

      <SubPageHero
        eyebrowNumeral="·"
        eyebrowLabel="SERVICES"
        headline="Three services, held to one standard."
        accentWord="held"
        subhead="We chose focus over breadth on purpose. Interior finishing leads — that's where the craft is felt most clearly. Exterior repairs and decking carry the same care, scaled to what the weather and the land require."
        primaryCta={{ to: "/contact", label: "Discuss your project" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        coordMark="Section · Services"
      />

      {/* § I — Service hierarchy */}
      <RevealSection aria-labelledby="services-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="flex items-start justify-between gap-6">
                <Eyebrow numeral="I" label="WHAT WE BUILD" />
                <span className="coord-mark hidden md:inline-flex">Three services</span>
              </div>
              <h2 id="services-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                In order of where the craft shows most.
              </h2>
            </div>
          </div>

          <div className="space-y-7 lg:space-y-9">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 130}ms` }}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                aria-label={`${s.title} — ${s.promise}`}
              >
                <PremiumCard featured={i === 0} className="h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-5 relative aspect-[5/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10 overflow-hidden">
                      <ProjectVignette
                        category={SERVICE_CATEGORY[s.slug]}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-weighted group-hover:scale-[1.015]"
                      />
                      <span
                        className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                        aria-hidden="true"
                      >
                        Plate {s.numeral}
                      </span>
                    </div>
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
                      <div className="figure-footnote mb-5">
                        <span className="footnote-figmark">Fig. {s.numeral.toLowerCase()}.</span>
                        <span className="flex-1">{s.title.toUpperCase()}</span>
                        <span className="text-evergreen/55 normal-case tracking-[0.18em]">Service No. {s.numeral}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="numeral-disc">{s.numeral}</span>
                        <span className="h-px w-8 bg-evergreen/30 group-hover:w-20 transition-all duration-700 ease-weighted" />
                      </div>
                      <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-subhead text-foreground/70 text-[1.05rem]">
                        {s.promise}
                      </p>
                      <p className="mt-5 text-body text-muted-foreground text-[0.95rem] leading-relaxed">
                        {SERVICE_DETAIL[s.slug]}
                      </p>
                      <div className="mt-7 inline-flex items-center gap-3 text-minimal text-evergreen self-start">
                        <span>See {s.shortName.toLowerCase()} in detail</span>
                        <span className="icon-chip bg-evergreen/[0.06]">
                          <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Full-circle support */}
      <RevealSection aria-labelledby="circle-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="II" label="FULL-CIRCLE SUPPORT" />
              <h2 id="circle-heading" className="text-headline text-foreground mt-6">
                One conversation. One contractor. One relationship.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Most renovation friction lives in the gaps between trades. We close those
                gaps by holding the work together — from the first walk-through to the
                final inspection.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8 relative">
              <div className="surveyor-frame relative">
                <span className="surveyor-tr" aria-hidden="true" />
                <span className="surveyor-bl" aria-hidden="true" />
                <div
                  aria-hidden="true"
                  className="absolute left-[15px] top-3 bottom-3 w-px"
                  data-line-draw
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, hsl(var(--evergreen) / 0.45) 0 3px, transparent 3px 7px)",
                  }}
                />
                <ol className="space-y-10 lg:space-y-12">
                  {[
                    { n: "01", title: "Conversation", body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
                    { n: "02", title: "Planning", body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool." },
                    { n: "03", title: "Hands-On Completion", body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished." },
                  ].map((step, i) => (
                    <li
                      key={step.n}
                      className="relative pl-12"
                      data-reveal
                      style={{ ["--reveal-delay" as string]: `${300 + i * 180}ms` }}
                    >
                      <span className="absolute left-0 top-1 numeral-disc numeral-disc-survey">{step.n}</span>
                      <h3 className="text-title text-foreground">{step.title}</h3>
                      <p className="mt-3 text-body text-muted-foreground max-w-[52ch]">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Custom quote */}
      <RevealSection aria-labelledby="quote-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="III" label="ABOUT QUOTES" />
              <h2 id="quote-heading" className="text-headline text-foreground mt-6 max-w-[22ch]">
                Pricing is custom because the work is.
              </h2>
              <div className="mt-7 space-y-6 max-w-[55ch]">
                <p className="text-body text-foreground/85">
                  We don't publish flat rates because rural projects don't have flat
                  realities. Site access, scope, materials, and the condition of what's
                  already there all change the answer. So the quote is built around your
                  property — not a template.
                </p>
                <p className="text-body text-muted-foreground">
                  We'll talk through what's possible, what's worth it, and what isn't.
                  No pressure either way.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <PremiumCard className="h-full">
                <div className="p-8 lg:p-10">
                  <div className="figure-footnote mb-5">
                    <span className="footnote-figmark">Fig. iii.</span>
                    <span className="flex-1">WHAT A QUOTE INCLUDES</span>
                  </div>
                  <ul className="divide-y divide-border/60">
                    {[
                      "Scope of work, written plainly",
                      "Materials & finishes, by name",
                      "Timeline & phasing approach",
                      "Site access & seasonal considerations",
                      "A clear, all-in price",
                    ].map((item, i) => (
                      <li key={item} className="flex items-baseline gap-4 py-3.5">
                        <span className="numeral-mark tabular-nums text-evergreen/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body text-foreground/85 text-[0.95rem]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PremiumCard>
            </div>
          </div>
        </Container>
      </RevealSection>

      <ClosingCta
        numeral="IV"
        eyebrow="DISCUSS YOUR PROJECT"
        heading="Tell us what you're considering. We'll come prepared."
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/work", label: "View Our Work" }}
      />
    </main>
  );
};

export default Services;
