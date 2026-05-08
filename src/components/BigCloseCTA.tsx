import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import { cn } from "@/lib/utils";

const ConsultationForm = lazy(() => import("@/components/ConsultationForm"));

interface BigCloseCTAProps {
  variant?: "full" | "compact";
  heading?: string;
  lede?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}

/**
 * BigCloseCTA — the "tell us about the place" final moment.
 *
 * `full` (default): two-column layout with embedded ConsultationForm.
 * `compact`: tighter, no form — headline + CTA pair, used on Services / Work.
 */
const BigCloseCTA = ({
  variant = "full",
  heading = "Tell us about the place.",
  lede = "Cory replies within two business days.",
  primary = { to: "/contact", label: "Get a Free Quote" },
  secondary = { to: "/work", label: "View the work" },
}: BigCloseCTAProps) => {
  const compact = variant === "compact";

  return (
    <RevealSection
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className={cn(
        "relative overflow-hidden bg-evergreen-deep",
        compact ? "pt-20 md:pt-24 pb-20 md:pb-28" : "pt-20 md:pt-32 pb-24 md:pb-44",
      )}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: compact ? "1200px 520px" : "1200px 1100px",
        backgroundImage: [
          "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
          "radial-gradient(60% 50% at 78% 32%, hsl(145 18% 30% / 0.55), transparent 70%)",
          "linear-gradient(to bottom, transparent 60%, hsl(145 30% 10% / 0.35))",
        ].join(", "),
      }}
    >
      <Container size="wide">
        {compact ? (
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }} className="max-w-[34ch]">
              <SectionHeader
                id="final-cta-heading"
                title={heading}
                lede={lede}
                tone="light"
                titleWidth="narrow"
                bottomGap="none"
                drift
              />
            </div>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:shrink-0"
              data-reveal
              style={{ ["--reveal-delay" as string]: "180ms" }}
            >
              <Link
                to={primary.to}
                className="cta-anchor group/btn"
                aria-label={primary.label}
              >
                <span>{primary.label}</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
              <Link to={secondary.to} className="cta-ghost cta-ghost--light group/ghost">
                <span>{secondary.label}</span>
                <span className="cta-ghost__rule" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-20 lg:gap-y-0 lg:items-start">
            <div
              className="order-1 lg:col-span-6"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <SectionHeader
                id="final-cta-heading"
                title={heading}
                lede={lede}
                tone="light"
                titleWidth="narrow"
                bottomGap="none"
                drift
              />

              <div className="mt-10 lg:pt-8 lg:border-t lg:border-background/15 max-w-[46ch] space-y-2 text-background/75 text-[0.95rem]">
                <p>
                  <span className="text-background/55">Or write —</span>{" "}
                  <a
                    href="mailto:cory@havencreekrenovations.com"
                    className="font-serif italic underline-offset-4 hover:underline hover:text-background transition-colors"
                  >
                    cory@havencreekrenovations.com
                  </a>
                </p>
                <p>
                  <span className="text-background/55">Or call &nbsp;—</span>{" "}
                  <a
                    href="tel:+14039707691"
                    className="font-serif italic tabular-nums underline-offset-4 hover:underline hover:text-background transition-colors"
                  >
                    403 970-7691
                  </a>
                </p>
              </div>
            </div>

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
        )}
      </Container>
    </RevealSection>
  );
};

export default BigCloseCTA;
