import { lazy, Suspense, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { serviceAreas } from "@/data/serviceAreas";
import { projectTypeFromQuery } from "@/lib/validation/consultation";
import { BODY } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

const SITE = "https://havencreekrenovations.ca";

// TODO: replace with real number when ready.
const STUDIO_PHONE = "403 970-7691";
const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_EMAIL = "cory@havencreekrenovations.com";

const POSTAL: Record<string, string> = {
  "bragg-creek": "T0L",
  "rocky-view-county": "T4A",
  bearspaw: "T3R",
  "water-valley": "T0M",
};

const STEPS = [
  { n: "01", title: "You write", body: "A few details about the property and what you're considering. Five fields, two minutes." },
  { n: "02", title: "We reply", body: "Within two business days. A real reply from a real person — Cory — with honest questions and a clear next step." },
];

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialProjectType = useMemo(
    () => projectTypeFromQuery(searchParams.get("service")) ?? null,
    [searchParams],
  );

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
        eyebrowLabel="CONTACT"
        headline="Let's talk through your property."
        accentWord="talk"
        subhead="This is the beginning of a relationship, not a sales trap. Share a few details and we'll come prepared."
        dossier={{ sectionNo: "XI", coord: "Contact · Bragg Creek · Bearspaw · Rocky View · Water Valley" }}
      />

      {/* § I — What happens + form + direct-contact panel */}
      <RevealSection id="form" aria-labelledby="form-heading" className="pb-24 md:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Sticky left rail — stays visible as the form is filled */}
            <div
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <SectionHeader
                id="form-heading"
                eyebrow="What happens next"
                title="A calm, four-step path."
                bottomGap="none"
              />
              <ol className="mt-10 border-l-2 border-evergreen/35 pl-6 space-y-7">
                {STEPS.map((s) => (
                  <li key={s.n}>
                    <p className="flex items-baseline gap-3 text-minimal text-evergreen mb-1.5">
                      <span className="numeral-mark tabular-nums">{s.n}</span>
                      <span>{s.title}</span>
                    </p>
                    <p className="text-body text-muted-foreground  leading-relaxed max-w-[42ch]">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-10 font-serif italic text-foreground/75 text-[1.05rem] max-w-md">
                "The form should feel like the beginning of a relationship, not a sales trap."
              </p>
            </div>

            {/* Right column — form, then direct-contact panel below */}
            <div className="lg:col-span-7 space-y-16" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
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
                      <div aria-hidden="true" className="h-[520px] rounded-md bg-foreground/[0.03] animate-pulse" />
                    }
                  >
                    <ConsultationForm
                      source="contact_page"
                      initialProjectType={initialProjectType}
                      successMode="redirect"
                    />
                  </Suspense>
                </div>
              </PremiumCard>

              {/* Direct-contact panel — for visitors who'd rather not use a form */}
              <div
                className="border-t border-evergreen/15 pt-12"
                data-reveal
                style={{ ["--reveal-delay" as string]: "260ms" }}
              >
                <SectionHeader
                  as="h3"
                  eyebrow="Or reach us directly"
                  title="Prefer to write or call?"
                  lede="Either reaches the same small team. We answer in the order notes arrive."
                  titleWidth="wide"
                  bottomGap="none"
                />

                <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
                  <li>
                    <a
                      href={`mailto:${STUDIO_EMAIL}`}
                      className="contact-row group flex items-baseline justify-between gap-6 py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="numeral-mark tabular-nums text-evergreen/70">01</span>
                        <span className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                          {STUDIO_EMAIL}
                        </span>
                      </span>
                      <span className="text-minimal text-evergreen/65">EMAIL</span>
                    </a>
                  </li>
                  <li>
                    {/* TODO: replace with real phone number */}
                    <a
                      href={`tel:${STUDIO_PHONE_TEL}`}
                      className="contact-row group flex items-baseline justify-between gap-6 py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="numeral-mark tabular-nums text-evergreen/70">02</span>
                        <span className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2 tabular-nums">
                          {STUDIO_PHONE}
                        </span>
                      </span>
                      <span className="text-minimal text-evergreen/65">PHONE</span>
                    </a>
                  </li>
                  <li>
                    <div className="flex items-baseline justify-between gap-6 py-5">
                      <span className="flex items-baseline gap-4">
                        <span className="numeral-mark tabular-nums text-evergreen/70">03</span>
                        <span className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground/85">
                          Reply within two business days
                        </span>
                      </span>
                      <span className="text-minimal text-evergreen/65 tabular-nums">MON–FRI</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — Custom quote reassurance */}
      <RevealSection id="quote" aria-labelledby="quote-heading" className={cn(SECTION_PADDING.standard, "section-wash cv-auto")}>
        <Container size="wide">
          <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <SectionHeader
              id="quote-heading"
              eyebrow="About the quote"
              title="Pricing is custom because the work is."
              lede="We don't quote on instinct, and we don't quote without seeing the property. The number we send back is built on the scope, the site, and the materials that suit it — not on a template."
              align="center"
              titleWidth="wide"
              bottomGap="none"
            />
            <p className={cn(BODY.standard, "mt-5 max-w-[58ch] mx-auto text-center")}>
              No obligation to proceed, either way.
            </p>
          </div>
        </Container>
      </RevealSection>

      {/* § III — Service-area trust line */}
      <RevealSection id="areas" aria-labelledby="areas-heading" className={cn(SECTION_PADDING.standard, "cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <SectionHeader
                id="areas-heading"
                eyebrow="Where we work"
                title="Local, by choice."
                lede="If your property sits in or near one of these communities, we're glad to talk."
                titleWidth="none"
                bottomGap="none"
              />
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
