import { lazy, Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projectTypeFromQuery } from "@/lib/validation/consultation";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

const SITE = "https://havencreekrenovations.ca";

const STUDIO_PHONE = "403 970-7691";
const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_EMAIL = "cory@havencreekrenovations.com";

// (Steps removed — the form itself is the next step. Less promise, more action.)

const Contact = () => {
  const [searchParams] = useSearchParams();
  const initialProjectType = useMemo(
    () => projectTypeFromQuery(searchParams.get("service")) ?? null,
    [searchParams],
  );

  useSeo({
    title: "Contact — Tell Us About Your Property",
    description:
      "Tell us about your renovation project in rural Alberta. A real person — Cory — replies within two business days.",
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
            {/* Sticky left rail — small promise, then out of the way */}
            <div
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <SectionHeader
                id="form-heading"
                eyebrow="What happens"
                title="Write. We reply."
                lede="Within two business days, from Cory directly."
                bottomGap="none"
              />
              <p className="mt-10 font-serif italic text-foreground/75 text-[1.05rem] max-w-md">
                "The beginning of a relationship — not a sales trap."
              </p>
            </div>

            {/* Right column — form, then direct-contact panel below */}
            <div className="lg:col-span-7 space-y-16" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              <PremiumCard tone="evergreen" className="bezel-shell-closing">
                <div className="p-7 md:p-10">
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
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default Contact;
