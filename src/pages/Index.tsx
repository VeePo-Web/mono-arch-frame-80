import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import HowItGoes from "@/components/HowItGoes";
import ServiceMarquee from "@/components/ServiceMarquee";
import RevealSection from "@/components/RevealSection";
import TestimonialSpine from "@/components/TestimonialSpine";
import SectionTransition from "@/components/SectionTransition";
import PhotoMoment from "@/components/PhotoMoment";
import BigCloseCTA from "@/components/BigCloseCTA";
import StatCard from "@/components/ui/StatCard";
import BentoGrid, { BentoTile } from "@/components/ui/BentoGrid";
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { SECTION_PADDING, CONTENT_GAP } from "@/lib/spacing";
import { serviceAreas } from "@/data/serviceAreas";

/** Postal-code prefixes for the four areas — drawn from Canada Post FSAs. */
const AREA_POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

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

      {/* ─── § I — Trust strip ─────────────────────────────────────────── */}
      <RevealSection
        id="trust-strip"
        aria-labelledby="trust-strip-heading"
        className={SECTION_PADDING.compact}
      >
        <Container size="wide">
          <h2 id="trust-strip-heading" className="sr-only">What working with Haven Creek looks like</h2>
          <div className={cn("grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto", CONTENT_GAP.cardGrid)}>
            <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <StatCard
                label="Reply"
                value="2 days"
                caption="Within two business days."
              />
            </div>
            <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <StatCard
                label="Areas served"
                value="4"
                caption="Foothills, west & north of Calgary."
              />
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* ─── § II — How it goes ───────────────────────────────────────── */}
      <HowItGoes />

      <SectionTransition from="cream" to="evergreen" intensity="dramatic" />

      {/* ─── § III — Service marquee ─────────────────────────────────── */}
      <ServiceMarquee />

      <SectionTransition from="evergreen" to="cream" intensity="dramatic" />

      {/* ─── § IV — Photo moment ─────────────────────────────────────── */}
      <PhotoMoment />

      {/* ─── § V — Testimonials (dark) ───────────────────────────────── */}
      <TestimonialSpine tone="dark" />

      <SectionTransition from="evergreen" to="cream" intensity="dramatic" />

      {/* ─── § VI — Service areas (2x2 bento) ────────────────────────── */}
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
        </Container>
      </RevealSection>

      {/* ─── § VII — Big close ────────────────────────────────────────── */}
      <BigCloseCTA />
    </main>
  );
};

export default Index;
