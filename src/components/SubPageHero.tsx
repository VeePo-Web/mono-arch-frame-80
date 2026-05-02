import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";
import Eyebrow from "./Eyebrow";

interface CtaSpec {
  to: string;
  label: string;
}

interface SubPageHeroProps {
  eyebrowLabel: string;
  /** Plain headline. Use `accentWord` to italicize+underline a single word. */
  headline: string;
  /** Optional accent word — italicized in evergreen with hand-drawn underline. */
  accentWord?: string;
  subhead?: string;
  primaryCta?: CtaSpec;
  secondaryCta?: CtaSpec;
  /** Optional right-column slot (e.g. an architectural vignette in a Bezel). */
  vignette?: ReactNode;
  /** Optional folio/locator text shown above the headline (e.g. "T0L · Bragg Creek"). */
  folio?: string;
  /** Compact variant — used by ThankYou + 404 to reduce vertical weight. */
  compact?: boolean;
}

/**
 * SubPageHero — the editorial chapter-opening pattern shared by every non-home route.
 * Eyebrow + headline + optional subhead + CTA pair. Single anchor across pages.
 */
const SubPageHero = ({
  eyebrowLabel,
  headline,
  accentWord,
  subhead,
  primaryCta,
  secondaryCta,
  vignette,
  folio,
  compact = false,
}: SubPageHeroProps) => {
  // Split the headline around accentWord (first occurrence) so we can render
  // the accent inline with the italic + underline treatment.
  const renderedHeadline = (() => {
    if (!accentWord) return <span>{headline}</span>;
    const idx = headline.indexOf(accentWord);
    if (idx === -1) return <span>{headline}</span>;
    const before = headline.slice(0, idx);
    const after = headline.slice(idx + accentWord.length);
    return (
      <>
        {before}
        <span className="relative inline-block text-display-italic text-evergreen">
          {accentWord}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 12"
            className="absolute left-0 right-0 -bottom-2 w-full h-2.5 overflow-visible"
            fill="none"
          >
            <path
              d="M 4 8 C 50 2, 110 10, 196 5"
              stroke="hsl(var(--evergreen) / 0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="vignette-stroke"
              style={{ animationDelay: "1.0s" }}
            />
          </svg>
        </span>
        {after}
      </>
    );
  })();

  return (
    <section
      aria-labelledby="subpage-hero-heading"
      className={cn(
        "relative overflow-hidden",
        compact ? "pt-24 md:pt-36 pb-10 md:pb-20" : "pt-28 md:pt-44 pb-12 md:pb-28",
      )}
    >
      {/* Radial bloom — same warm evergreen wash as the home Hero */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(closest-side, hsl(145 18% 28% / 0.08), transparent 70%)",
        }}
      />

      <Container size="wide">
        <div
          className={cn(
            "grid grid-cols-1 gap-14 lg:gap-20 items-center",
            vignette ? "lg:grid-cols-12" : "lg:grid-cols-1",
          )}
        >
          <div className={cn(vignette ? "lg:col-span-7" : "max-w-3xl")}>
            <div className="reveal-up" style={{ animationDelay: "0ms" }}>
              <Eyebrow label={eyebrowLabel} />
            </div>

            {folio && (
              <p
                className="mt-6 text-minimal text-evergreen/70 tabular-nums reveal-up"
                style={{ animationDelay: "80ms" }}
              >
                {folio}
              </p>
            )}

            {dossier && (
              <div
                className="dossier-strip reveal-up mt-7"
                style={{ animationDelay: "100ms" }}
                aria-hidden="true"
              >
                <span className="dossier-strip__rule" />
                <span className="dossier-strip__inner">
                  <span className="dossier-strip__no">
                    Section No.{" "}
                    <span className="font-serif italic not-italic-on-mobile text-evergreen/85">
                      {dossier.sectionNo}
                    </span>
                  </span>
                  <span className="dossier-strip__dot">·</span>
                  <span className="dossier-strip__coord">{dossier.coord}</span>
                  {dossier.edition && (
                    <>
                      <span className="dossier-strip__dot">·</span>
                      <span className="dossier-strip__edition">{dossier.edition}</span>
                    </>
                  )}
                </span>
                <span className="dossier-strip__rule" />
              </div>
            )}

            <h1
              id="subpage-hero-heading"
              className={cn(
                "text-foreground mt-7 leading-[1.05]",
                compact ? "text-headline" : "text-display",
              )}
            >
              <span className="block overflow-hidden">
                <span
                  className="block reveal-up"
                  style={{ animationDelay: "120ms" }}
                >
                  {renderedHeadline}
                </span>
              </span>
            </h1>

            {subhead && (
              <p
                className="text-subhead text-muted-foreground mt-7 max-w-2xl reveal-up"
                style={{ animationDelay: "300ms" }}
              >
                {subhead}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div
                className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 reveal-up"
                style={{ animationDelay: "440ms" }}
              >
                {primaryCta && (
                  <Link
                    to={primaryCta.to}
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
                    <span>{primaryCta.label}</span>
                    <span className="icon-chip icon-chip-light bg-background/15">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </Link>
                )}

                {secondaryCta && (
                  <Link
                    to={secondaryCta.to}
                    className="group/ghost inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-foreground transition-colors duration-500 ease-swift"
                  >
                    <span>{secondaryCta.label}</span>
                    <span className="block w-6 h-px bg-evergreen/60 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
                  </Link>
                )}
              </div>
            )}

          </div>

          {vignette && (
            <div
              className="lg:col-span-5 reveal-up"
              style={{ animationDelay: "320ms" }}
            >
              {vignette}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SubPageHero;
