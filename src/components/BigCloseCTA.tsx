import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";

interface BigCloseCTAProps {
  heading?: string;
  lede?: string;
  primary?: { to: string; label: string };
}

/**
 * BigCloseCTA — magazine close. Hair rule above, .t-headline H2,
 * one solid evergreen square CTA matching nav grammar. Same on every page.
 */
const BigCloseCTA = ({
  heading = "Tell us about the place.",
  lede = "Tell us about the property — we'll come look, talk it through, and quote it honestly.",
  primary = { to: "/contact", label: "Get a Free Quote" },
}: BigCloseCTAProps) => {
  return (
    <RevealSection
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="section-y border-t border-foreground/10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 480px" }}
    >
      <Container size="wide">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="t-headline text-foreground reveal-up"
            style={{ animationDelay: "60ms" }}
          >
            {heading}
          </h2>
          <p
            className="mt-6 t-lede reveal-up"
            style={{ animationDelay: "180ms" }}
          >
            {lede}
          </p>
          <div className="mt-10 reveal-up" style={{ animationDelay: "300ms" }}>
            <Link
              to={primary.to}
              className={cn(
                "cta-spring inline-flex items-center justify-center rounded-lg",
                "bg-evergreen text-evergreen-foreground",
                "px-6 min-h-[52px] text-[15px] font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {primary.label}
            </Link>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
};

export default BigCloseCTA;
