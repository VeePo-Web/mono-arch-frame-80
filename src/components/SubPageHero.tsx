import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import Container from "./Container";
import ScrollCue from "./nav/ScrollCue";

interface CtaSpec { to: string; label: string }

interface SubPageHeroProps {
  headline: string;
  subhead?: string;
  primaryCta?: CtaSpec;
  backdrop?: string;
}

/**
 * SubPageHero — type-only, magazine grammar. One size site-wide.
 * Optional heavily-blurred photo backdrop sits behind the type as
 * atmosphere; type remains the design.
 */
const SubPageHero = ({ headline, subhead, primaryCta, backdrop }: SubPageHeroProps) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });
  return (
    <section
      ref={ref}
      data-revealed={revealed}
      aria-labelledby="subpage-hero-heading"
      className="relative overflow-hidden pt-28 md:pt-40 section-yb min-h-[88vh] flex flex-col justify-center"
    >
      {backdrop && (
        <div className="hero-backdrop" aria-hidden="true">
          <img
            src={backdrop}
            alt=""
            className="hero-backdrop__img"
            loading="lazy"
            decoding="async"
          />
          <div className="hero-backdrop__veil" />
        </div>
      )}

      <Container size="wide" className="relative z-10">
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

      <ScrollCue />
    </section>
  );
};

export default SubPageHero;
