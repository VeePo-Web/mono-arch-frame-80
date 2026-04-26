import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ClosingCta from "@/components/ClosingCta";
import { ExteriorVignette } from "@/components/ProjectVignette";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projects } from "@/data/projects";

const SECTION = "py-16 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const NEEDS = [
  { n: "01", title: "Siding & trim repair", body: "Targeted replacement on the faces that have seen the most weather, blended back into the existing line." },
  { n: "02", title: "Soffit, fascia & venting", body: "Eaves restored to a clean line; airflow corrected so the attic dries the way it should." },
  { n: "03", title: "Entrances, stairs & rails", body: "The high-touch exterior details — rebuilt to feel solid and to last another decade." },
  { n: "04", title: "Weather-related protection", body: "Sealing, flashing, and the small repairs that keep small failures from becoming big ones." },
];

const RESPECT = [
  "Land",
  "Driveway access",
  "Equipment management",
  "Landscaping",
  "Animals",
  "Family routines",
  "Privacy",
];

const ExteriorFinishing = () => {
  useSeo({
    title: "Exterior Finishing & Repairs",
    description:
      "Durable exterior finishing and repairs for rural Alberta homes — siding, soffit, fascia, entrances, and weather-side detail work across Bragg Creek and Rocky View.",
    path: "/services/exterior-finishing",
  });

  const proof = projects.find((p) => p.category === "Exterior Repairs");

  return (
    <main id="main">
      <ServiceJsonLd
        name="Exterior Finishing & Repairs"
        description="Durable exterior finishing and repairs — siding, soffit, fascia, entrances, and weather-side details — for rural Alberta properties."
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Services", url: `${SITE}/services` },
          { name: "Exterior Finishing & Repairs", url: `${SITE}/services/exterior-finishing` },
        ]}
      />

      <SubPageHero
        eyebrowLabel="EXTERIOR FINISHING & REPAIRS"
        headline="Practical protection for the property you keep."
        accentWord="protection"
        subhead="Repairs, finishing, and weather-facing detail work that respects the home and the land around it. Built for prairie exposure and a long horizon."
        primaryCta={{ to: "/contact", label: "Request a Consultation" }}
        secondaryCta={{ to: "/work", label: "See the work" }}
        dossier={{ sectionNo: "V", coord: "Exterior · Stewardship", edition: "Edition I" }}
        vignette={
          <div className="bezel-shell">
            <div className="bezel-core relative aspect-[3/4] overflow-hidden">
              <ExteriorVignette className="absolute inset-0 w-full h-full" />
              <span
                className="absolute top-5 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                aria-hidden="true"
              >
                Plate II · Eave & soffit
              </span>
            </div>
          </div>
        }
      />

      {/* § I — Common needs */}
      <RevealSection aria-labelledby="needs-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="flex items-start justify-between gap-6">
                <Eyebrow numeral="I" label="WHAT THE WORK COVERS" />
                <span className="coord-mark hidden md:inline-flex">Repairs · Finishing · Maintenance</span>
              </div>
              <h2 id="needs-heading" className="text-headline text-foreground mt-6 max-w-[22ch]">
                Four kinds of exterior work, handled with one standard.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <p className="text-body text-muted-foreground">
                Most of what we do outside is preventive — catching the small failures
                before they invite the bigger ones. The rest is the visible repair work
                that brings the exterior back to a clean line.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9">
            {NEEDS.map((n, i) => (
              <PremiumCard
                key={n.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
                className="h-full"
              >
                <div className="p-8 lg:p-10 flex gap-6">
                  <span className="numeral-disc shrink-0">{n.n}</span>
                  <div>
                    <h3 className="text-title text-foreground">{n.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground text-[0.95rem] leading-relaxed">
                      {n.body}
                    </p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § II — Rural property considerations */}
      <RevealSection aria-labelledby="rural-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="II" label="RURAL CONSIDERATIONS" />
              <h2 id="rural-heading" className="text-headline text-foreground mt-6">
                Planned around the realities of the property.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Exterior work on a rural acreage isn't the same as a suburban repair.
                Weather windows, distance, access, and what's around the home all change
                what's possible — and when.
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
                    { n: "01", title: "Weather exposure", body: "South and west faces wear differently than north and east. We plan repairs for the exposure, not the average." },
                    { n: "02", title: "Seasonal timing", body: "Some work has a window. We schedule against the season so the finish has time to set up before the next snowfall." },
                    { n: "03", title: "Access & distance", body: "Equipment, materials, and travel are part of the planning — not surprises that show up on the invoice." },
                    { n: "04", title: "Surroundings", body: "Trees, landscaping, animal routines — what surrounds the work shapes how the work gets done." },
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

      {/* § III — Property respect */}
      <RevealSection aria-labelledby="respect-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="III" label="WHAT WE PROTECT" />
              <h2 id="respect-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                We work around what the property already is.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-[55ch]">
                A rural exterior job touches more than the building. We leave the property
                the way we found it — minus the work that needed doing.
              </p>
            </div>
            <div className="lg:col-span-5 lg:pt-8" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="figure-footnote mb-5">
                <span className="footnote-figmark">Fig. iii.</span>
                <span className="flex-1">RESPECT, ITEMIZED</span>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {RESPECT.map((r, i) => (
                  <li key={r} className="flex items-baseline gap-4 py-3.5">
                    <span className="numeral-mark tabular-nums text-evergreen/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-foreground/85 text-[0.95rem]">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § IV — Project proof */}
      {proof && (
        <RevealSection aria-labelledby="proof-heading" className={cn(SECTION, "section-wash cv-auto")}>
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-14 md:mb-20">
              <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
                <div className="flex items-start justify-between gap-6">
                  <Eyebrow numeral="IV" label="PROJECT PROOF" />
                  <span className="coord-mark hidden md:inline-flex">Plate · {proof.area}</span>
                </div>
                <h2 id="proof-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                  Stewardship on a Rocky View acreage.
                </h2>
              </div>
            </div>

            <PremiumCard className="overflow-hidden" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-evergreen/10">
                  <ExteriorVignette className="absolute inset-0 w-full h-full" />
                  <span
                    className="absolute top-4 left-5 text-[0.7rem] tracking-[0.18em] text-evergreen/70 font-serif italic"
                    aria-hidden="true"
                  >
                    Plate II
                  </span>
                </div>
                <div className="lg:col-span-7 p-8 md:p-12">
                  <div className="figure-footnote mb-5">
                    <span className="footnote-figmark">Fig. iv.</span>
                    <span className="flex-1">{proof.category.toUpperCase()}</span>
                    <span className="text-evergreen/80 tabular-nums normal-case tracking-[0.18em]">{proof.area}</span>
                  </div>
                  <h3 className="text-title text-foreground">{proof.title}</h3>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { n: "01", label: "Scope", body: proof.scope },
                      { n: "02", label: "Challenge", body: proof.challenge },
                      { n: "03", label: "Result", body: proof.result },
                      { n: "04", label: "Why it mattered", body: proof.whyItMattered, italic: true },
                    ].map((row) => (
                      <div key={row.n}>
                        <p className="flex items-baseline gap-2 text-minimal text-evergreen mb-2">
                          <span className="numeral-mark tabular-nums">{row.n}</span>
                          <span>{row.label}</span>
                        </p>
                        <p
                          className={cn(
                            "text-body text-foreground/80 text-[0.95rem] leading-relaxed",
                            row.italic && "italic text-muted-foreground",
                          )}
                        >
                          {row.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/work"
                    className="group/ghost mt-8 inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
                  >
                    <span>See more exterior work</span>
                    <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
                  </Link>
                </div>
              </div>
            </PremiumCard>
          </Container>
        </RevealSection>
      )}

      <ClosingCta
        numeral="V"
        eyebrow="DISCUSS THE WORK"
        heading="A weather-side repair, a full-property refresh, or somewhere in between."
        body="Reach out and we'll plan around the property — the access, the season, and what the home actually needs."
        primary={{ to: "/contact", label: "Request a Consultation" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </main>
  );
};

export default ExteriorFinishing;
