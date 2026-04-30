import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import HowItGoes from "@/components/HowItGoes";
import ServiceMarquee from "@/components/ServiceMarquee";
import RevealSection from "@/components/RevealSection";
import TestimonialSpine from "@/components/TestimonialSpine";
import StatCard from "@/components/ui/StatCard";
import BentoGrid, { BentoTile } from "@/components/ui/BentoGrid";
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { HEADLINE, BODY } from "@/lib/typography";
import { SECTION_PADDING, CONTENT_GAP } from "@/lib/spacing";
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
              "Start with a request through the quote form. We follow up to discuss your property, the scope you're considering, and your timeline. Quotes are custom — based on the work, the site, and the materials that suit it. There's no obligation to proceed.",
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

      {/* ─── § I — Trust strip: 3 stat cards ─────────────────────────── */}
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
                caption="Foothills, west & north of Calgary."
              />
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "240ms" }}>
              <StatCard
                label="Cory · Owner-builder"
                value="Replies personally"
                caption="Every note reaches him directly. Not a funnel."
              />
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § II — How it goes (replaces Approach bento) ────────────── */}
      <HowItGoes />

      {/* ─── § III — Service marquee (signature scroll moment) ───────── */}
      <ServiceMarquee />

      {/* ─── § IV — Testimonials ─────────────────────────────────────── */}
      <TestimonialSpine />

      {/* ─── § V — Service areas (2x2 bento) ─────────────────────────── */}
      <RevealSection
        id="areas"
        aria-labelledby="areas-heading"
        className={cn(SECTION_PADDING.standard, "section-wash")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 900px" }}
      >
        <Container size="wide">
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <SectionHeader
              id="areas-heading"
              eyebrow="Where we work"
              title="Local, by choice."
              lede="Four communities. Each one different in pace, exposure, and the kind of property care it asks for."
              titleWidth="none"
              drift
            />
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

          <div
            className="mt-12 md:mt-16"
            data-reveal
            style={{ ["--reveal-delay" as string]: "640ms" }}
          >
            <Link to="/contact" className="cta-anchor group/btn">
              <span>Get a Free Quote</span>
              <span className="icon-chip icon-chip-light bg-background/15">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </RevealSection>

      <RevealSection
        id="final-cta"
        aria-labelledby="final-cta-heading"
        className="relative pt-20 md:pt-44 pb-24 md:pb-52 overflow-hidden bg-evergreen-deep"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1200px 1200px",
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
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-x-20 lg:gap-y-0 lg:items-start">
            {/* 1. Headline + lede + escape hatch (left column) */}
            <div
              className="order-1 lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <SectionHeader
                id="final-cta-heading"
                eyebrow="Next step"
                title="Tell us about the place."
                lede="A real person — Cory — will reply within two business days."
                tone="light"
                titleWidth="narrow"
                bottomGap="none"
                drift
              />

              {/* Single responsive escape hatch — one markup, fluid styling */}
              <div className="mt-10 lg:pt-8 lg:border-t lg:border-background/20 max-w-[46ch]">
                <p className="text-minimal text-background/65 mb-3 lg:mb-4">
                  Or reach us directly
                </p>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  <a
                    href="mailto:cory@havencreekrenovations.com"
                    className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/20 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                    aria-label="Email cory@havencreekrenovations.com"
                  >
                    <Mail className="h-4 w-4 text-background/85 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-serif italic text-[0.98rem] truncate">
                      cory@havencreekrenovations.com
                    </span>
                  </a>
                  <a
                    href="tel:+14039707691"
                    className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/20 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                    aria-label="Call 403 970-7691"
                  >
                    <Phone className="h-4 w-4 text-background/85 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="font-serif italic text-[0.98rem] tabular-nums">
                      403 970-7691
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Form bezel — right column desktop, second on mobile */}
            <div
              className="order-2 lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "260ms" }}
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
                    Five fields, two minutes.
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
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default Index;
