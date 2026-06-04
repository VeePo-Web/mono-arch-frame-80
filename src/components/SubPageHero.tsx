import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import Container from "./Container";

interface CtaSpec { to: string; label: string }

interface SubPageHeroProps {
  headline: string;
  subhead?: string;
  primaryCta?: CtaSpec;
}

/**
 * SubPageHero — type-only, magazine grammar. One size site-wide.
 * Mirrors Hero: self-wires useReveal so its data-reveal children cascade in.
 */
const SubPageHero = ({ headline, subhead, primaryCta }: SubPageHeroProps) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });
  return (
    <section
      ref={ref}
      data-revealed={revealed}
      aria-labelledby="subpage-hero-heading"
      className="relative pt-28 md:pt-40 section-yb"
    >

      <Container size="wide">
        <h1
          id="subpage-hero-heading"
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
          className="t-headline wrap-editorial text-foreground"
        >
          {headline}
        </h1>

        {subhead && (
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "240ms" }}
            className="t-lede mt-7 max-w-[52ch]"
          >
            {subhead}
          </p>
        )}

        {primaryCta && (
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "360ms" }}
            className="mt-10"
          >
            <Link
              to={primaryCta.to}
              className={cn(
                "cta-spring inline-flex items-center justify-center rounded-lg",
                "bg-evergreen text-evergreen-foreground",
                "px-6 min-h-[52px] text-sm font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {primaryCta.label}
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default SubPageHero;
