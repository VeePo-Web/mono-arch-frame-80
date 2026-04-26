import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import RevealSection from "@/components/RevealSection";
import TestimonialSpine from "@/components/TestimonialSpine";
import StatCard from "@/components/ui/StatCard";
import InfoCard from "@/components/ui/InfoCard";
import BentoGrid, { BentoTile } from "@/components/ui/BentoGrid";
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { HEADLINE, BODY, EYEBROW, MEASURE } from "@/lib/typography";
import { SECTION_PADDING, CONTENT_GAP } from "@/lib/spacing";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";

// Lazy: form pulls in react-hook-form + zod resolver — fetched only when the
// final CTA enters the viewport, keeping the home-page initial JS lean.
const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

/** Postal-code prefixes for the four areas — drawn from Canada Post FSAs. */
const AREA_POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

/** Short scannable descriptors — bento copy is tight on purpose. */
const AREA_BENTO_LINE: Record<string, string> = {
  "bragg-creek": "Wooded lots and quiet drives.",
  "rocky-view-county": "Acreages cared for over years.",
  bearspaw: "Established homes, discreet work.",
  "water-valley": "Practical work, real distance.",
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

      {/* ─── § I — Trust strip: 3 stat cards (replaces FAQ wall) ─────── */}
      <RevealSection
        id="trust-strip"
        aria-labelledby="trust-strip-heading"
        className={SECTION_PADDING.compact}
      >
        <Container size="wide">
          <h2 id="trust-strip-heading" className="sr-only">What working with Haven Creek looks like</h2>
          <div className={cn("grid grid-cols-1 sm:grid-cols-3", CONTENT_GAP.cardGrid)}>
            <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <StatCard
                label="Reply"
                value="2 days"
                caption="Or sooner. From a real person, not a funnel."
              />
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <StatCard
                label="Areas served"
                value="4"
                caption="Bragg Creek · Rocky View · Bearspaw · Water Valley."
              />
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "240ms" }}>
              <StatCard
                label="One contractor"
                value="Start → finish"
                caption="The same person plans, builds, and walks the finish."
              />
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § II — Services preview (3 InfoCards, no walls of text) ── */}
      <RevealSection
        id="services-preview"
        aria-labelledby="services-heading"
        className={cn(SECTION_PADDING.standard, "section-wash")}
      >
        <Container size="wide">
          <div className="max-w-[62ch] mb-12 md:mb-16" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow label="What we build" />
            <h2 id="services-heading" data-drift className={cn(HEADLINE.section, "mt-5 text-foreground max-w-[20ch]")}>
              Three services. One standard.
            </h2>
            <p className={cn(BODY.large, MEASURE.prose, "mt-5")}>
              Interior finishing leads — that's where the craft is felt most clearly.
              Exterior repairs and decking carry the same care.
            </p>
          </div>

          <div className={cn("grid grid-cols-1 md:grid-cols-3", CONTENT_GAP.cardGrid)}>
            {services.map((s, i) => (
              <div
                key={s.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <InfoCard
                  eyebrow={`SERVICE ${s.numeral}`}
                  title={s.title}
                  body={s.promise}
                  to={s.href}
                  linkLabel={`See ${s.shortName.toLowerCase()}`}
                  featured={i === 0}
                />
              </div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* ─── § III — Approach (3-step bento) ─────────────────────────── */}
      <RevealSection
        id="approach"
        aria-labelledby="approach-heading"
        className={SECTION_PADDING.standard}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 1000px" }}
      >
        <Container size="wide">
          <div className="max-w-[62ch] mb-12 md:mb-16" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow label="The approach" />
            <h2 id="approach-heading" data-drift className={cn(HEADLINE.section, "mt-5 text-foreground")}>
              A path you can see from the start.
            </h2>
            <p className={cn(BODY.large, MEASURE.prose, "mt-5")}>
              Three quiet steps. No hand-offs in between.
            </p>
          </div>

          <BentoGrid layout="auto">
            {[
              { n: "01", t: "Conversation", b: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan." },
              { n: "02", t: "Planning", b: "Scope, materials, and the practical realities of working on a rural property — clarified before we lift a tool." },
              { n: "03", t: "Hands-on completion", b: "Built with attention to fit, finish, and the small details that decide whether a renovation reads as finished." },
            ].map((step, i) => (
              <div
                key={step.n}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${220 + i * 110}ms` }}
              >
                <BentoTile eyebrow={step.n} title={step.t} body={step.b} />
              </div>
            ))}
          </BentoGrid>

          <div
            className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "560ms" }}
          >
            <Link to="/contact" className="cta-anchor group/btn">
              <span>Start that conversation</span>
              <span className="icon-chip icon-chip-light bg-background/15">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
            <p className={cn(BODY.caption, "italic font-serif")}>
              You talk to one person from first walk-through to final.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § IV — Testimonials (kept as-is, content-vis fast) ──────── */}
      <TestimonialSpine />

      {/* ─── § V — Service areas (2x2 bento, replaces long list) ─────── */}
      <RevealSection
        id="areas"
        aria-labelledby="areas-heading"
        className={cn(SECTION_PADDING.standard, "section-wash")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 900px" }}
      >
        <Container size="wide">
          <div className="max-w-[62ch] mb-12 md:mb-16" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow label="Where we work" />
            <h2 id="areas-heading" data-drift className={cn(HEADLINE.section, "mt-5 text-foreground")}>
              Local, by choice.
            </h2>
            <p className={cn(BODY.large, MEASURE.prose, "mt-5")}>
              Four communities. Each one different in pace, exposure, and the kind of property care it asks for.
            </p>
          </div>

          <BentoGrid layout="2x2">
            {serviceAreas.map((area, i) => (
              <div
                key={area.slug}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${180 + i * 100}ms` }}
              >
                <BentoTile
                  eyebrow={AREA_POSTAL[area.slug]}
                  title={area.name}
                  body={AREA_BENTO_LINE[area.slug]}
                  to={area.href}
                />
              </div>
            ))}
          </BentoGrid>
        </Container>
      </RevealSection>

      <RevealSection
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative pt-20 md:pt-44 pb-24 md:pb-52 overflow-hidden bg-evergreen-deep"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px 1200px",
          // Layered washes: warm radial from upper-left + cool halo behind the
          // form column + gentle bottom vignette so the silhouette reads quieter.
          backgroundImage: [
            "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
            "radial-gradient(60% 50% at 78% 32%, hsl(145 18% 30% / 0.55), transparent 70%)",
            "linear-gradient(to bottom, transparent 60%, hsl(145 30% 10% / 0.35))",
          ].join(", "),
        }}
      >
        {/* Brand silhouette — single-stroke skyline along bottom edge */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 w-full h-16 md:h-[120px] text-background/[0.06] pointer-events-none"
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
          {/* Mobile: flex-col with explicit order so the form lands second.
              Desktop: 12-col grid where text takes 6, form takes 6, and the
              direct-contact + promise blocks live inside the text column via
              `lg:contents` (CSS Display: contents flattens the wrapper into
              the grid so order classes still apply on desktop). */}
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-x-20 lg:gap-y-0 lg:items-start">
            {/* 1. Headline + lede — first on mobile, top of left column on desktop */}
            <div
              className="order-1 lg:order-1 lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <Eyebrow tone="light" label="Next step" />
              <h2
                id="final-cta-heading"
                data-drift
                className="text-headline text-background mt-6 max-w-[22ch]"
              >
                Let&apos;s talk about what you&apos;re thinking.
              </h2>
              <p className="mt-7 text-body text-background/85 max-w-[46ch]">
                Tell us a little about the place and what&apos;s on your mind. We&apos;ll write
                back within two business days — usually the same day — with a couple of
                clear questions, not a template quote.
              </p>
              <p className="mt-4 text-minimal text-background/60 max-w-[46ch]">
                A real person reads every message. No drip emails, no calls unless you ask for one.
              </p>
            </div>

            {/* 2. Form bezel — promoted to second position on mobile (order-2),
                desktop keeps it on the right column (lg:col-span-6 lg:row-span-3
                so the text column's three children stack to its left). */}
            <div
              className="order-2 lg:order-2 lg:col-span-6 lg:row-span-3"
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <div className="cta-bezel">
                <div className="cta-bezel__core p-5 sm:p-7 md:p-9">
                  <p
                    data-drift
                    className="font-serif text-foreground text-[1.25rem] sm:text-[1.3rem] md:text-[1.5rem] leading-snug"
                  >
                    What should we know before we reach out?
                  </p>
                  <p className="mt-2 text-minimal text-muted-foreground">
                    Just enough so the first reply is useful — five fields, two minutes.
                  </p>

                  <div className="mt-6 sm:mt-7 mb-5 sm:mb-6 h-px bg-foreground/10" />

                  <Suspense
                    fallback={
                      <div
                        aria-hidden="true"
                        className="h-[640px] md:h-[460px] rounded-md bg-foreground/[0.03] animate-pulse"
                      />
                    }
                  >
                    <ConsultationForm source="home_final_cta" />
                  </Suspense>
                </div>
                <span aria-hidden="true" className="cta-bezel__seal">
                  Edition I · No. VII
                </span>
              </div>
            </div>

            {/* 3. Direct-contact escape hatch — third on mobile (after form),
                second item in the text column on desktop. Mobile renders as
                full-width tap rows with leading icons. */}
            <div
              className="order-3 lg:order-3 lg:col-span-6 lg:mt-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: "260ms" }}
            >
              <div className="pt-6 lg:pt-8 border-t border-background/20 max-w-[46ch]">
                <p className="text-minimal text-background/65">
                  Or reach us directly
                </p>
                {/* Mobile: full-width tap rows. Desktop: italic inline text. */}
                <div className="mt-4 grid grid-cols-1 gap-2 sm:gap-3 lg:hidden">
                  <a
                    href="mailto:hello@havencreekrenovations.ca"
                    className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/20 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                    aria-label="Email hello@havencreekrenovations.ca"
                  >
                    <Mail className="h-4 w-4 text-background/85 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-serif italic text-[0.98rem] truncate">
                      hello@havencreekrenovations.ca
                    </span>
                  </a>
                  <a
                    href="tel:+14035550100"
                    className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/20 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                    aria-label="Call (403) 555-0100"
                  >
                    <Phone className="h-4 w-4 text-background/85 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-serif italic text-[0.98rem] tabular-nums">
                      (403) 555-0100
                    </span>
                  </a>
                </div>
                {/* Desktop only — original italic inline list */}
                <div className="hidden lg:block space-y-3 mt-3">
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
              </div>
            </div>

            {/* 4. Promise list — last on mobile (closing reassurance),
                third item in the text column on desktop. */}
            <div
              className="order-4 lg:order-4 lg:col-span-6 lg:mt-12"
              data-reveal
              style={{ ["--reveal-delay" as string]: "340ms" }}
            >
              <ul className="max-w-[46ch] border-l border-background/15 pl-6 space-y-4 text-body text-background/85 text-[0.98rem]">
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
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default Index;

