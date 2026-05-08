import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";

interface BigCloseCTAProps {
  heading?: string;
  lede?: string;
  primary?: { to: string; label: string };
}

/**
 * BigCloseCTA — one quiet cream variant. Centered headline + one-line lede + one CTA.
 * No dark slab, no embedded form, no secondary CTA.
 */
const BigCloseCTA = ({
  heading = "Tell us about the place.",
  lede = "Cory replies within two business days.",
  primary = { to: "/contact", label: "Get a Free Quote" },
}: BigCloseCTAProps) => {
  return (
    <RevealSection
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="pt-20 md:pt-28 pb-24 md:pb-32"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1200px 420px" }}
    >
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="final-cta-heading"
            className="text-headline text-foreground reveal-up"
            style={{ animationDelay: "60ms" }}
          >
            {heading}
          </h2>
          <p
            className="mt-5 text-subhead text-muted-foreground reveal-up"
            style={{ animationDelay: "180ms" }}
          >
            {lede}
          </p>
          <div className="mt-10 reveal-up" style={{ animationDelay: "300ms" }}>
            <Link
              to={primary.to}
              className={cn(
                "group/btn inline-flex items-center gap-3 rounded-full",
                "bg-evergreen text-evergreen-foreground",
                "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                "transition-all duration-500 ease-swift",
                "hover:bg-evergreen-hover active:scale-[0.98]",
                "shadow-[0_1px_0_hsl(145_22%_38%/0.4)_inset,0_18px_36px_-12px_hsl(145_24%_8%/0.30)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span>{primary.label}</span>
              <span className="icon-chip icon-chip-light bg-background/15">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
};

export default BigCloseCTA;
