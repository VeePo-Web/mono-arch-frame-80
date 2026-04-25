import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

const SECTION = "py-24 md:py-32";
const SITE = "https://havencreekrenovations.ca";

const POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

const STEPS = [
  { n: "01", title: "You write", body: "Share a few details about the project, the property, and what you're considering." },
  { n: "02", title: "We reply", body: "Within two business days. A real reply from a real person — not an automated funnel." },
  { n: "03", title: "We walk the property", body: "Or talk by phone if that's easier. We come prepared, ask honest questions, and listen." },
  { n: "04", title: "A thoughtful quote", body: "Built around your property — scope, materials, timeline, and an all-in price, written plainly." },
];

const Contact = () => {
  useSeo({
    title: "Contact — Talk Through Your Project",
    description:
      "Request a consultation for renovation work in rural Alberta. We respond within two business days — no pressure, no automated funnel, just a clear conversation.",
    path: "/contact",
  });

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Contact", url: `${SITE}/contact` },
        ]}
      />

      <SubPageHero
        eyebrowNumeral="·"
        eyebrowLabel="CONTACT"
        headline="Let's talk through your property."
        accentWord="talk"
        subhead="This is the beginning of a relationship, not a sales trap. Share a few details and we'll come prepared."
        coordMark="Reply within two business days"
      />

      {/* § I — What happens + form */}
      <RevealSection aria-labelledby="form-heading" className="pb-24 md:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="I" label="WHAT HAPPENS NEXT" />
              <h2 id="form-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                A calm, four-step path.
              </h2>
              <ol className="mt-10 border-l-2 border-evergreen/35 pl-6 space-y-7">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <p className="flex items-baseline gap-3 text-minimal text-evergreen mb-1.5">
                      <span className="numeral-mark tabular-nums">{s.n}</span>
                      <span>{s.title}</span>
                    </p>
                    <p className="text-body text-muted-foreground text-[0.95rem] leading-relaxed max-w-[42ch]">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-10 font-serif italic text-foreground/75 text-[1.05rem] max-w-md">
                "The form should feel like the beginning of a relationship, not a sales trap."
              </p>
            </div>

            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <PremiumCard tone="evergreen" className="bezel-shell-closing">
                <div className="p-7 md:p-10">
                  <p className="font-serif text-foreground text-[1.3rem] md:text-[1.5rem] leading-snug">
                    Tell us about the project.
                  </p>
                  <p className="mt-2 text-minimal text-muted-foreground">
                    A few details so we can come prepared.
                  </p>
                  <div className="mt-7 mb-6 h-px w-full bg-foreground/10" />
                  <Suspense
                    fallback={
                      <div aria-hidden="true" className="h-[460px] rounded-md bg-foreground/[0.03] animate-pulse" />
                    }
                  >
                    <ConsultationForm source="contact_page" />
                  </Suspense>
                </div>
              </PremiumCard>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Custom quote reassurance */}
      <RevealSection aria-labelledby="quote-heading" className={cn(SECTION, "section-wash")}>
        <Container size="wide">
          <div className="max-w-3xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <Eyebrow align="center" numeral="II" label="ABOUT THE QUOTE" />
            <h2 id="quote-heading" className="text-headline text-foreground mt-6 max-w-[26ch] mx-auto">
              Pricing is custom because the work is.
            </h2>
            <p className="mt-7 text-body text-muted-foreground max-w-[58ch] mx-auto">
              We don't quote on instinct, and we don't quote without seeing the property.
              The number we send back is built on the scope, the site, and the materials
              that suit it — not on a template.
            </p>
            <p className="mt-5 text-body text-muted-foreground max-w-[58ch] mx-auto">
              No obligation to proceed, either way.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Service-area trust line */}
      <RevealSection aria-labelledby="areas-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="III" label="WHERE WE WORK" />
              <h2 id="areas-heading" className="text-headline text-foreground mt-6">
                Local, by choice.
              </h2>
              <p className="mt-6 text-body text-muted-foreground max-w-md">
                If your property sits in or near one of these communities, we're glad to
                talk.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {serviceAreas.map((a, i) => (
                  <li
                    key={a.slug}
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${180 + i * 80}ms` }}
                  >
                    <Link
                      to={a.href}
                      className="area-row group flex items-baseline justify-between gap-6 py-6"
                    >
                      <span className="font-serif text-[1.25rem] md:text-[1.4rem] text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                        {a.name}
                      </span>
                      <span className="text-minimal text-evergreen/70 tabular-nums">
                        {POSTAL[a.slug]}
                      </span>
                    </Link>
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

export default Contact;
