import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import Container from "./Container";
import { ChevronDown } from "lucide-react";

interface CtaSpec { to: string; label: string }

interface AboutHeroProps {
  headline: string;
  subhead?: string;
  primaryCta?: CtaSpec;
  backdrop?: string;
  watermark?: string;
  locator?: string;
}

/**
 * AboutHero — cinematic single-purpose hero for /about only.
 *
 * Five layered moves, ordered back-to-front:
 *   1. Photograph backdrop with slow Ken Burns drift + directional cream veil
 *      (cream top → almost-transparent middle band → cream bottom).
 *   2. Monumental ghosted serif watermark, parallaxed against the photo.
 *   3. Two L-shaped corner hairlines anchoring the content frame.
 *   4. Unhurried type cascade (corner → watermark → H1 → subhead → CTA → meta).
 *   5. Bottom hairline meta strip (locator left, scroll cue right).
 *
 * Honors brand rails: no eyebrow above H1, no italic-evergreen accent,
 * no folio/Plate chrome, single primary CTA, dark-on-cream, reduced-motion
 * collapses to plain opacity fades.
 */
const AboutHero = ({
  headline,
  subhead,
  primaryCta,
  backdrop,
  watermark = "About",
  locator = "Foothills · Alberta",
}: AboutHeroProps) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });
  const photoRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  // Parallax: photo drifts up at 0.3× scroll, watermark at 0.6× scroll.
  // Single rAF tick, transform-only — same pattern as Navigation's
  // --nav-progress writer. Disabled under prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      if (photoRef.current) {
        photoRef.current.style.setProperty("--parallax-y", `${y * -0.3}px`);
      }
      if (watermarkRef.current) {
        watermarkRef.current.style.setProperty("--parallax-y", `${y * -0.6}px`);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-revealed={revealed}
      aria-labelledby="about-hero-heading"
      className="about-hero relative overflow-hidden pt-28 md:pt-40 min-h-[92vh] flex flex-col justify-center"
    >
      {backdrop && (
        <div className="about-hero__photo" aria-hidden="true">
          <div ref={photoRef} className="about-hero__photo-shift">
            <img
              src={backdrop}
              alt=""
              className="about-hero__photo-img"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-hero__veil" />
          <div className="about-hero__vignette" />
        </div>
      )}

      {/* Corner hairlines — quiet anchoring chrome */}
      <span
        aria-hidden="true"
        className="about-hero__corner about-hero__corner--tl"
        data-reveal
        style={{ ["--reveal-delay" as string]: "0ms" }}
      />
      <span
        aria-hidden="true"
        className="about-hero__corner about-hero__corner--br"
        data-reveal
        style={{ ["--reveal-delay" as string]: "0ms" }}
      />

      <Container size="wide" className="relative z-10">
        {/* Monumental ghosted watermark */}
        <span
          ref={watermarkRef}
          aria-hidden="true"
          className="about-hero__watermark select-none pointer-events-none"
          data-reveal
          style={{ ["--reveal-delay" as string]: "200ms" }}
        >
          {watermark}
        </span>

        <h1
          id="about-hero-heading"
          data-reveal
          style={{ ["--reveal-delay" as string]: "360ms" }}
          className="t-headline wrap-editorial text-foreground relative"
        >
          {headline}
        </h1>

        {subhead && (
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "540ms" }}
            className="t-lede mt-7 max-w-[52ch] relative"
          >
            {subhead}
          </p>
        )}

        {primaryCta && (
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "720ms" }}
            className="mt-10 relative"
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

      {/* Bottom meta strip — locator + scroll cue, hairline above */}
      <div
        className="about-hero__meta"
        data-reveal
        style={{ ["--reveal-delay" as string]: "900ms" }}
      >
        <Container size="wide">
          <div className="border-t border-foreground/12 pt-5 md:pt-6 flex items-center justify-between">
            <span className="t-eyebrow text-foreground/55">{locator}</span>
            <span className="inline-flex items-center gap-2 text-foreground/45">
              <span className="t-micro hidden sm:inline">Scroll</span>
              <ChevronDown size={14} strokeWidth={1.5} className="scroll-cue-bob" />
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default AboutHero;
