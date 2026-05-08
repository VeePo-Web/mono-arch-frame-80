import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Hero from "@/components/Hero";
import HowItGoes from "@/components/HowItGoes";
import ServicesGrid from "@/components/ServicesGrid";
import RecentWorkPreview from "@/components/RecentWorkPreview";
import RevealSection from "@/components/RevealSection";
import BigCloseCTA from "@/components/BigCloseCTA";
import { LocalBusinessJsonLd, WebSiteJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { SECTION_PADDING } from "@/lib/spacing";
import { serviceAreas } from "@/data/serviceAreas";

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

      {/* ─── § I — Services (type-only) ──────────────────────────────── */}
      <ServicesGrid />

      {/* ─── § II — Recent work (inline 6-tile gallery) ──────────────── */}
      <RecentWorkPreview />

      {/* ─── § III — How it goes ─────────────────────────────────────── */}
      <HowItGoes />

      {/* ─── § IV — Service areas (named-list rail) ─────────────────── */}
      <RevealSection
        id="areas"
        aria-labelledby="areas-heading"
        className={cn(SECTION_PADDING.standard, "section-wash")}
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 600px" }}
      >
        <Container size="wide">
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <SectionHeader
              id="areas-heading"
              eyebrow="Where we work"
              title="Local, by choice."
              titleWidth="none"
              drift
            />
          </div>
          <p
            className="mt-8 md:mt-10 text-headline-sm font-serif text-foreground/85 leading-snug max-w-3xl"
            data-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            {serviceAreas.map((a) => a.name).join(" · ")}
          </p>
        </Container>
      </RevealSection>

      {/* ─── § V — Big close ─────────────────────────────────────────── */}
      <BigCloseCTA />
    </main>
  );
};

export default Index;
