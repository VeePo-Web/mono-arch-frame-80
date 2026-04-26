import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import TestimonialSpine from "@/components/TestimonialSpine";
import ProjectPlaceholder from "@/components/gallery/ProjectPlaceholder";
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { serviceAreas } from "@/data/serviceAreas";

// Lazy: form pulls in react-hook-form + zod resolver — fetched only when the
// final CTA enters the viewport, keeping the home-page initial JS lean.
const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

// Lazy: Selected Works lives below the fold and pulls in 6 inline-SVG plates.
// Splitting it shaves the eager Index chunk by ~5 KB gz.
const SelectedWorks = lazy(() => import("@/components/gallery/SelectedWorks"));

const SECTION_PADDING = "py-28 md:py-40";

/** Postal-code prefixes for the four areas — drawn from Canada Post FSAs. */
const AREA_POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

const Index = () => {
  useSeo({
    title: "Trusted Renovations for Rural Homes",
    description:
      "Hands-on interior finishing, exterior repairs, and decking for rural and acreage homeowners across Bragg Creek, Rocky View County, Bearspaw, and Water Valley.",
    path: "/",
  });

  return (
    <main id="main">
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
      <FAQJsonLd
        items={[
          {
            question: "What kind of renovation work does Haven Creek take on?",
            answer:
              "Three core services: interior finishing (the visible details — trim, transitions, fit, and finish), exterior finishing and repairs (durable protection against weather and time), and decking (outdoor living that fits the property and lasts). Each is handled hands-on, planning through completion.",
          },
          {
            question: "Which areas do you serve?",
            answer:
              "Bragg Creek, Rocky View County, Bearspaw, and Water Valley — rural and acreage properties across the foothills west and north of Calgary.",
          },
          {
            question: "How does the consultation process work?",
            answer:
              "Start with a request through the consultation form. We follow up to discuss your property, the scope you're considering, and your timeline. Quotes are custom — based on the work, the site, and the materials that suit it. There's no obligation to proceed.",
          },
          {
            question: "Do you handle phased renovations over time?",
            answer:
              "Yes. Many rural homeowners prefer to improve their property one thoughtful stage at a time. Working with one trusted contractor across phases means continuity — someone who already knows the building, the land, and how you live on it.",
          },
          {
            question: "What does property respect mean on a Haven Creek job site?",
            answer:
              "It means careful access, clean equipment management, awareness of land, animals, and family routines, and leaving the property the way we found it — minus the work that needed doing.",
          },
        ]}
      />


      <Hero />

      {/* ─── § I — The seven things you're probably wondering ──────────── */}
      <RevealSection
        id="trust-promise"
        aria-labelledby="trust-heading"
        className={SECTION_PADDING}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow label="What you're probably thinking" />
              <h2 id="trust-heading" data-drift className="text-headline text-foreground mt-6 max-w-[18ch]">
                The seven things most rural homeowners want to know first.
              </h2>
              <p className="mt-7 text-body text-muted-foreground max-w-md">
                Said plainly. Answered the same way. If any of these were on
                your mind, you&apos;re in the right place.
              </p>
            </div>

            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <ul aria-label="Common questions from rural homeowners">
                {[
                  {
                    n: "01",
                    q: "Will you respect my property?",
                    a: "Yes — access, animals, equipment, and clean-up are part of the deliverable, not afterthoughts. The site is left the way we found it, minus the work that needed doing.",
                  },
                  {
                    n: "02",
                    q: "Can I trust who's in my home?",
                    a: "The same person plans the work, does the work, and walks the finish with you. No rotating cast of unfamiliar trades coming and going.",
                  },
                  {
                    n: "03",
                    q: "How many people will be coming and going?",
                    a: "As few as the work allows. Most days it's one or two familiar faces — quiet on arrival, careful on the property, gone when they said they would be.",
                  },
                  {
                    n: "04",
                    q: "Will it actually be finished — or just done?",
                    a: "Fit, edges, transitions, and the small details decide that. They're the work, not extras. We don't call a project complete until it reads that way.",
                  },
                  {
                    n: "05",
                    q: "Can you support phased projects over years?",
                    a: "Yes. Many of our clients improve their property one stage at a time. Working with the same contractor across phases means continuity — we already know the building and the land.",
                  },
                  {
                    n: "06",
                    q: "How does pricing work?",
                    a: "Custom, written plainly, after we see the property. No template numbers, no surprises mid-project. The quote follows the conversation.",
                  },
                  {
                    n: "07",
                    q: "What happens after I reach out?",
                    a: "A real reply within two business days — from a real person, not an automated funnel. We talk first; we walk the property second.",
                  },
                ].map((row) => (
                  <li key={row.n} className="fear-row">
                    <span className="numeral-disc shrink-0" aria-hidden="true">
                      {row.n}
                    </span>
                    <p className="fear-q">{row.q}</p>
                    <p className="fear-a">{row.a}</p>
                  </li>
                ))}
              </ul>

              <div
                className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: "300ms" }}
              >
                <Link to="/contact" className="cta-anchor group/btn">
                  <span>Request a Consultation</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
                <p className="trust-microcopy">
                  <span>Reply within 2 business days</span>
                  <span>No obligation</span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § I.b — Mid-page conversion bridge ───────────────────────── */}
      <RevealSection aria-label="Quick consultation invitation" className="py-14 md:py-20">
        <Container size="wide">
          <div className="conversion-bridge flex flex-col md:flex-row md:items-center md:justify-between gap-7 md:gap-10 py-10 md:py-12">
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
              className="font-serif italic font-light text-foreground/85 text-[1.35rem] md:text-[1.55rem] leading-snug max-w-[36ch] text-balance"
            >
              Already nodding? Let&apos;s start a quiet conversation.
            </p>
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
              className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 shrink-0"
            >
              <Link to="/contact" className="cta-anchor group/btn">
                <span>Request a Consultation</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
              <p className="trust-microcopy">
                <span>2-business-day reply</span>
                <span>No obligation</span>
              </p>
            </div>
          </div>
        </Container>
      </RevealSection>

      <RevealSection
        id="services-preview"
        aria-labelledby="services-heading"
        className={cn(SECTION_PADDING, "section-wash")}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="What we build" />
              <h2 id="services-heading" data-drift className="text-headline text-foreground mt-6 max-w-[20ch]">
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
                  <div className="relative p-9 lg:p-11 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-10">
                      <span className="numeral-disc">{s.numeral}</span>
                      <span className="h-px w-8 bg-evergreen/30 group-hover:w-20 transition-all duration-700 ease-weighted" />
                    </div>

                    <h3 className="text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                      {s.title}
                    </h3>

                    <p className="mt-4 text-body text-muted-foreground text-[0.98rem] leading-relaxed flex-1">
                      {s.cardBody}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-3 text-minimal text-foreground/70 group-hover:text-evergreen transition-colors duration-500">
                      <span>Read the service</span>
                      <span className="block w-6 h-px bg-evergreen/50 group-hover:w-12 transition-all duration-500 ease-swift" />
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
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1600px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div
              className="lg:col-span-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow label="The approach" />
              <h2 id="approach-heading" data-drift className="text-headline text-foreground mt-6">
                A path you can see from the start.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                Three quiet steps. No hand-offs in between. The same person who plans
                the work walks the site with you when it&apos;s finished.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <ol className="space-y-14 lg:space-y-16">
                {[
                  { n: "01", title: "Conversation", body: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
                  { n: "02", title: "Planning", body: "Scope, materials, design considerations, and the practical realities of working on a rural property — clarified before we lift a tool." },
                  { n: "03", title: "Hands-On Completion", body: "The work is completed with attention to fit, finish, durability, and the small details that decide whether a renovation reads as finished." },
                ].map((step, i) => (
                  <li
                    key={step.n}
                    className="group/disc relative pl-14"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 200}ms` }}
                  >
                    <span className="absolute left-0 top-1 numeral-disc" aria-hidden="true">
                      {step.n}
                    </span>
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[58ch]">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>

              <div
                className="mt-16 pt-10 border-t border-border/60 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
                data-reveal
                style={{ ["--reveal-delay" as string]: "1100ms" }}
              >
                <p className="font-serif italic font-light text-foreground/85 text-[1.1rem] leading-snug max-w-md">
                  From conversation to completion, you talk to one person.
                </p>
                <Link to="/contact" className="cta-anchor group/btn shrink-0">
                  <span>Start that conversation</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </div>
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
              <Eyebrow label="The work" />
              <h2 id="work-heading" data-drift className="text-headline text-foreground mt-6 max-w-[18ch]">
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
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
                      <ProjectVignette
                        category={p.category as VignetteCategory}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-weighted group-hover:scale-[1.015]"
                      />
                    </div>

                    <div className="p-8 lg:p-9 flex flex-col flex-1">
                      <p className="text-minimal text-evergreen/80">
                        {p.category} · {p.area}
                      </p>
                      <h3 className="mt-4 text-title text-foreground group-hover:text-evergreen transition-colors duration-500">
                        {p.title}
                      </h3>
                      <p className="mt-4 text-body text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                        {p.scope}
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </article>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* ─── § IV.b — Selected Works (featured-plate gallery) ──────────── */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="min-h-[800px]"
            style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1600px" }}
          />
        }
      >
        <SelectedWorks />
      </Suspense>

      {/* ─── § V — Trust Panel: three quiet reassurances ──────────────── */}
      <RevealSection
        aria-labelledby="trust-panel-heading"
        className="py-24 md:py-32"
      >
        <Container size="wide">
          <h2 id="trust-panel-heading" className="sr-only">Why homeowners choose Haven Creek</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-14">
            {[
              {
                n: "01",
                title: "Local",
                body: "Bragg Creek, Bearspaw, Rocky View County, and Water Valley. Four communities — one team that knows them.",
              },
              {
                n: "02",
                title: "Hands-on",
                body: "One contractor across planning, the work itself, and the final walk-through. No fragmented trades.",
              },
              {
                n: "03",
                title: "Long-term",
                body: "Built for clients improving their property in phases — over years, not just one project.",
              },
            ].map((c, i) => (
              <div
                key={c.n}
                className="relative"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              >
                <span className="numeral-disc mb-6" aria-hidden="true">
                  {c.n}
                </span>
                <h3 className="mt-6 text-title text-foreground">{c.title}</h3>
                <p className="mt-4 text-body text-muted-foreground text-[0.98rem] leading-relaxed max-w-[36ch]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* ─── § VI — Service Areas Roster ────────────────────────────────── */}
      <RevealSection
        id="areas"
        aria-labelledby="areas-heading"
        className={cn(SECTION_PADDING, "section-wash")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1400px" }}
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div
              className="lg:col-span-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow label="Where we work" />
              <h2 id="areas-heading" data-drift className="text-headline text-foreground mt-6">
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

      {/* ─── § VII — Final CTA: deep-evergreen anchor close ──────────── */}
      <RevealSection
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative py-36 md:py-48 overflow-hidden bg-evergreen-deep"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px 1200px",
          backgroundImage:
            "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
        }}
      >
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
            <div
              className="lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow tone="light" label="Next step" />
              <h2
                id="final-cta-heading"
                data-drift
                className="text-headline text-background mt-6 max-w-[20ch]"
              >
                A quiet conversation about your property.
              </h2>
              <p className="mt-7 text-body text-background/85 max-w-[44ch]">
                No template quote. No pressure. We reply within two business days.
              </p>

              {/* Direct-contact escape hatch */}
              <div className="mt-10 pt-8 border-t border-background/15 max-w-[44ch] space-y-3">
                <p className="text-minimal text-background/65">
                  Or reach us directly
                </p>
                <p>
                  <a
                    href="mailto:hello@havencreekrenovations.ca"
                    className="font-serif italic text-background/90 hover:text-background text-[1.05rem] transition-colors duration-300"
                  >
                    hello@havencreekrenovations.ca
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+14035550100"
                    className="font-serif italic text-background/90 hover:text-background text-[1.05rem] transition-colors duration-300 tabular-nums"
                  >
                    (403) 555-0100
                  </a>
                </p>
              </div>

              {/* Promise list — left rule + hanging numerals */}
              <ul className="mt-12 max-w-[44ch] border-l border-background/15 pl-6 space-y-4 text-body text-background/85 text-[0.98rem]">
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

            <div
              className="lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <div className="surface-card">
                <div className="p-7 md:p-9">
                  <p
                    data-drift
                    className="font-serif text-foreground text-[1.3rem] md:text-[1.5rem] leading-snug"
                  >
                    Tell us about the project.
                  </p>
                  <p className="mt-2 text-minimal text-muted-foreground">
                    A few details so we can come prepared.
                  </p>

                  <div className="mt-7 mb-6 h-px bg-foreground/10" />

                  <Suspense
                    fallback={
                      <div
                        aria-hidden="true"
                        className="h-[460px] rounded-md bg-foreground/[0.03] animate-pulse"
                      />
                    }
                  >
                    <ConsultationForm source="home_final_cta" />
                  </Suspense>
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
