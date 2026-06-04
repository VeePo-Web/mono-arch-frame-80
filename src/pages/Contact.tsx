import { lazy, Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import ContactBrandStack from "@/components/contact/ContactBrandStack";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { useSeo } from "@/hooks/useSeo";
import { projectTypeFromQuery } from "@/lib/validation/consultation";
import { photography } from "@/assets/photography";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

const SITE = "https://havencreekrenovations.ca";
const STUDIO_PHONE = "403 970-7691";
const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_EMAIL = "cory@havencreekrenovations.com";
const STUDIO_LOCATION = "Foothills, AB";
const FORM_ID = "contact-form";

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

  // Desktop (lg+) only: lock the page to a single viewport so the footer
  // is unreachable. Mobile keeps native scroll.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const apply = () => {
      document.documentElement.style.overflow = mql.matches ? "hidden" : "";
    };
    apply();
    mql.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <main id="main">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE },
          { name: "Contact", url: `${SITE}/contact` },
        ]}
      />

      {/* ──────────────────────────────────────────────────────────────────
          DESKTOP (lg+) — Two-column split.
          Brand cascade left (cream) · dark evergreen form panel right (520px).
          Sits below the nav and fills the rest of the viewport.
          ────────────────────────────────────────────────────────────────── */}
      <section
        className="hidden lg:flex relative w-full h-[calc(100svh-80px)] overflow-hidden"
        aria-label="Contact"
      >
        {/* Left: brand cascade — fills remaining width */}
        <div className="flex-1 min-w-0">
          <ContactBrandStack />
        </div>

        {/* Right: dark form panel */}
        <aside
          className="relative w-[520px] shrink-0 bg-evergreen-deep text-evergreen-foreground flex flex-col"
          aria-labelledby="form-heading-desktop"
        >
          {/* Hairline accent top */}
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-evergreen-foreground/30 to-transparent"
            aria-hidden="true"
          />

          <h2 id="form-heading-desktop" className="sr-only">Contact form</h2>

          {/* Form body — centered, no scroll */}
          <div className="flex-1 min-h-0 flex flex-col justify-center px-10 py-10">
            <p className="t-eyebrow text-evergreen-foreground/55 mb-6">
              Replies in 2 business days
            </p>
            <Suspense
              fallback={
                <div aria-hidden="true" className="h-[420px] rounded-md bg-evergreen-foreground/5 animate-pulse" />
              }
            >
              <ConsultationForm
                source="contact_page"
                initialProjectType={initialProjectType}
                successMode="redirect"
                tone="dark"
              />
            </Suspense>
          </div>
        </aside>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          MOBILE (< lg) — Original single-column layout. UNCHANGED.
          ────────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden">
        <SubPageHero
          headline="Let's talk through your property."
          subhead="Cory replies within two business days."
          backdrop={photography.closingPhotoMoment}
        />

        <RevealSection id="form" aria-labelledby="form-heading" className="section-y pb-32">
          <Container size="wide">
            <div className="mx-auto max-w-xl">
              <h2 id="form-heading" className="sr-only">Contact form</h2>
              <Suspense
                fallback={
                  <div aria-hidden="true" className="h-[420px] rounded-md bg-foreground/[0.03] animate-pulse" />
                }
              >
                <ConsultationForm
                  source="contact_page"
                  initialProjectType={initialProjectType}
                  successMode="redirect"
                  formId={FORM_ID}
                />
              </Suspense>

              <div
                className="mt-20 pt-10 border-t border-foreground/12"
                data-reveal
                style={{ ["--reveal-delay" as string]: "180ms" }}
              >
                <p className="t-eyebrow">Or reach us directly</p>

                <ul className="mt-6 border-t border-foreground/12">
                  <li className="row-wash border-b border-foreground/12">
                    <a
                      href={`mailto:${STUDIO_EMAIL}`}
                      className="group flex items-baseline justify-between gap-6 py-5 px-2 -mx-2"
                    >
                      <span className="t-title text-foreground transition-transform duration-500 ease-weighted group-hover:translate-x-1.5">
                        {STUDIO_EMAIL}
                      </span>
                      <span className="t-micro">EMAIL</span>
                    </a>
                  </li>
                  <li className="row-wash border-b border-foreground/12">
                    <a
                      href={`tel:${STUDIO_PHONE_TEL}`}
                      className="group flex items-baseline justify-between gap-6 py-5 px-2 -mx-2"
                    >
                      <span className="t-title text-foreground transition-transform duration-500 ease-weighted group-hover:translate-x-1.5 tabular-nums">
                        {STUDIO_PHONE}
                      </span>
                      <span className="t-micro">PHONE</span>
                    </a>
                  </li>
                  <li className="border-b border-foreground/12">
                    <div className="flex items-baseline justify-between gap-6 py-5 px-2 -mx-2">
                      <span className="t-title text-foreground">{STUDIO_LOCATION}</span>
                      <span className="t-micro">LOCATION</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </RevealSection>

        {/* Mobile sticky submit — submits the form above via formId */}
        <div className="contact-sticky-cta" aria-hidden="false">
          <button
            type="submit"
            form={FORM_ID}
            data-sticky-submit-for={FORM_ID}
            className="cta-spring w-full inline-flex items-center justify-center bg-evergreen text-evergreen-foreground rounded-lg h-12 px-6 text-[15px] font-semibold disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default Contact;
