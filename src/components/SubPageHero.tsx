import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface CtaSpec { to: string; label: string }

interface SubPageHeroProps {
  headline: string;
  subhead?: string;
  primaryCta?: CtaSpec;
  /** @deprecated retained as no-op for back-compat — magazine pass uses one size. */
  compact?: boolean;
  /** @deprecated kept for back-compat. */
  accentWord?: string;
}

/**
 * SubPageHero — type-only, magazine grammar. One size site-wide.
 */
const SubPageHero = ({ headline, subhead, primaryCta }: SubPageHeroProps) => {
  return (
    <section
      aria-labelledby="subpage-hero-heading"
      className="relative pt-28 md:pt-44 pb-12 md:pb-24"
    >
      <Container size="wide">
        <div className="max-w-[20ch] md:max-w-[18ch]">
          <h1
            id="subpage-hero-heading"
            className="t-headline wrap-editorial text-foreground"
          >
            <span className="block overflow-hidden">
              <span className="block reveal-up" style={{ animationDelay: "120ms" }}>
                {headline}
              </span>
            </span>
          </h1>
        </div>

        {subhead && (
          <p
            className="t-lede mt-7 max-w-[52ch] reveal-up"
            style={{ animationDelay: "300ms" }}
          >
            {subhead}
          </p>
        )}

        {primaryCta && (
          <div className="mt-10 reveal-up" style={{ animationDelay: "440ms" }}>
            <Link
              to={primaryCta.to}
              className={cn(
                "group/btn inline-flex items-center gap-3 rounded-full",
                "bg-evergreen text-evergreen-foreground",
                "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                "transition-all duration-500 ease-weighted",
                "hover:bg-evergreen-hover active:scale-[0.98]",
                "shadow-[0_1px_0_hsl(145_22%_38%/0.4)_inset,0_18px_36px_-12px_hsl(145_24%_8%/0.30)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <span>{primaryCta.label}</span>
              <span className="icon-chip icon-chip-light bg-background/15">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default SubPageHero;
