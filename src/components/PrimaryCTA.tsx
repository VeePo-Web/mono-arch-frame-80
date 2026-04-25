import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrimaryCTAProps {
  to: string;
  children: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

/**
 * PrimaryCTA — Haven Creek's calm consultation CTA.
 *
 * Per knowledge/2.1 §CTA Specifications + 1.5 §CTA Color:
 *  - Primary: deep evergreen fill, off-white text, rounded but not pill, subtle 2px lift on hover.
 *  - Secondary: outlined evergreen, restraint-first.
 *  - Ghost: link with hairline rule, expands gently on hover.
 *
 * The CTA should feel like "a solid front-door handle — clear, reliable, easy to use" (2.3 §6).
 */
const PrimaryCTA = ({ to, children, variant = "primary", className, ariaLabel }: PrimaryCTAProps) => {
  const base =
    "inline-flex items-center gap-2.5 text-minimal min-h-[44px] transition-all duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (variant === "secondary") {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        className={cn(
          base,
          "px-7 py-3.5 rounded-md border border-evergreen/40 text-foreground hover:border-evergreen hover:bg-evergreen/[0.04] hover:-translate-y-px",
          className,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    );
  }

  if (variant === "ghost") {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        className={cn(
          base,
          "py-2 text-foreground/80 hover:text-evergreen group/ghost",
          className,
        )}
      >
        <span>{children}</span>
        <span className="inline-block w-5 h-px bg-evergreen/60 group-hover/ghost:w-10 transition-all duration-300" />
      </Link>
    );
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={cn(
        base,
        "bg-evergreen text-evergreen-foreground px-8 py-3.5 rounded-md",
        "hover:bg-evergreen-hover hover:-translate-y-px hover:shadow-card",
        "active:translate-y-0 active:shadow-soft",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
};

export default PrimaryCTA;
