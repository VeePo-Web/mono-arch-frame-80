import { lazy, Suspense, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/Container";
import { EYEBROW } from "@/lib/typography";
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
        headline="Let's talk through your property."
        subhead="Share a few details and Cory will reply within two business days."
      />

      <RevealSection id="form" aria-labelledby="form-heading" className="pb-24 md:pb-32">
        <Container size="wide">
          <div className="mx-auto max-w-2xl space-y-16">
            <PremiumCard tone="evergreen" className="bezel-shell-closing" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <div className="p-7 md:p-10">
                <h2 id="form-heading" className="sr-only">Contact form</h2>
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

            <div
              className="border-t border-evergreen/15 pt-12"
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <p className={EYEBROW.standard}>Or reach us directly</p>

              <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
                <li>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    className="contact-row group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2">
                      {STUDIO_EMAIL}
                    </span>
                    <span className="text-minimal text-evergreen/65">EMAIL</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${STUDIO_PHONE_TEL}`}
                    className="contact-row group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="font-serif text-[1.1rem] md:text-[1.2rem] text-foreground transition-all duration-500 ease-swift group-hover:text-evergreen group-hover:translate-x-2 tabular-nums">
                      {STUDIO_PHONE}
                    </span>
                    <span className="text-minimal text-evergreen/65">PHONE</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default Contact;
