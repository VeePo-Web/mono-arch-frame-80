import { lazy, Suspense } from "react";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

/**
 * BigCloseCTA — the home page's final "tell us about the place" moment.
 *
 * Stripped of editorial cosplay (no "Edition I" seal, no "Next step" eyebrow,
 * no "Or reach us directly" preamble). Headline + sub + form + two contact
 * tiles. The radial bloom and skyline silhouette stay — they're the warmth.
 */
const BigCloseCTA = () => {
  return (
    <RevealSection
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative pt-20 md:pt-32 pb-24 md:pb-44 overflow-hidden bg-evergreen-deep"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "1200px 1100px",
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
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-20 lg:gap-y-0 lg:items-start">
          {/* Left — headline + contact tiles */}
          <div
            className="order-1 lg:col-span-6"
            data-reveal
            style={{ ["--reveal-delay" as string]: "0ms" }}
          >
            <SectionHeader
              id="final-cta-heading"
              title="Tell us about the place."
              lede="Cory replies within two business days."
              tone="light"
              titleWidth="narrow"
              bottomGap="none"
              drift
            />

            <div className="mt-12 lg:pt-10 lg:border-t lg:border-background/15 max-w-[46ch]">
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <a
                  href="mailto:cory@havencreekrenovations.com"
                  className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/15 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                  aria-label="Email cory@havencreekrenovations.com"
                >
                  <Mail className="h-4 w-4 text-background/80 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-serif italic text-[0.98rem] truncate">
                    cory@havencreekrenovations.com
                  </span>
                </a>
                <a
                  href="tel:+14039707691"
                  className="group/btn flex items-center gap-3 min-h-[56px] px-4 rounded-full bg-background/[0.06] text-background border border-background/15 hover:bg-background/[0.10] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
                  aria-label="Call 403 970-7691"
                >
                  <Phone className="h-4 w-4 text-background/80 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="font-serif italic text-[0.98rem] tabular-nums">
                    403 970-7691
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right — form bezel */}
          <div
            className="order-2 lg:col-span-6"
            data-reveal
            style={{ ["--reveal-delay" as string]: "240ms" }}
          >
            <div className="cta-bezel">
              <div className="cta-bezel__core p-5 sm:p-7 md:p-9">
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
            </div>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
};

export default BigCloseCTA;
