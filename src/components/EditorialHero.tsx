import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import Container from "./Container";
import { ChevronDown } from "lucide-react";

interface CtaSpec { to: string; label: string }

interface EditorialHeroProps {
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
 * Upgrade pass (craft, not composition):
 *   1. Photo backdrop with slow Ken Burns + scroll parallax + filmic grain.
 *   2. Lit cream radial veil (anchored to the type column).
 *   3. Monumental ghosted serif watermark with multiply blend + drawing rule.
 *   4. Refined corner brackets (28px legs, hairline, clip-path draw-in).
 *   5. H1 with per-word clip reveal cascade (overflow-hidden, translateY 110%→0).
 *   6. Desktop-only cursor parallax (inertial, ±6px) layered on the photo.
 *   7. Bottom meta strip: live evergreen dot + locator + scroll cue.
 *
 * Honors brand rails: no eyebrow above H1, no italic-evergreen accent,
 * no folio/Plate chrome, single primary CTA, dark-on-cream, reduced-motion
 * collapses to plain opacity fades.
 */
const EditorialHero = ({
  headline,
  subhead,
  primaryCta,
  backdrop,
  watermark = "About",
  locator = "Foothills · Alberta",
}: EditorialHeroProps) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0 });
  const photoRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  // Scroll parallax (photo 0.3×, watermark 0.6×) + desktop cursor parallax
  // (±6px on photo, inertial lerp). Single rAF loop services both writes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const section = ref.current;

    // cursor state
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let running = false;

    const writePhoto = () => {
      if (!photoRef.current) return;
      photoRef.current.style.setProperty("--cursor-x", current.x.toFixed(3));
      photoRef.current.style.setProperty("--cursor-y", current.y.toFixed(3));
    };

    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      if (photoRef.current) {
        photoRef.current.style.setProperty("--parallax-y", `${y * -0.3}px`);
      }
      if (watermarkRef.current) {
        watermarkRef.current.style.setProperty("--parallax-y", `${y * -0.6}px`);
      }

      // cursor lerp toward target
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        current.x += dx * 0.06;
        current.y += dy * 0.06;
        writePhoto();
        running = true;
        raf = window.requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const requestTick = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(tick);
    };

    const onScroll = () => requestTick();

    const onPointerMove = (e: PointerEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!running) requestTick();
    };

    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!running) requestTick();
    };

    // initial paint
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (finePointer && !reduce && section) {
      section.addEventListener("pointermove", onPointerMove);
      section.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (section) {
        section.removeEventListener("pointermove", onPointerMove);
        section.removeEventListener("pointerleave", onPointerLeave);
      }
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref]);

  // Split headline into words for clip-reveal cascade.
  const words = headline.split(/(\s+)/);

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
          <div className="about-hero__grain" />
          <div className="about-hero__veil" />
          <div className="about-hero__vignette" />
        </div>
      )}

      {/* Corner hairlines — quiet anchoring chrome */}
      <span
        aria-hidden="true"
        className="about-hero__corner about-hero__corner--tl"
      />
      <span
        aria-hidden="true"
        className="about-hero__corner about-hero__corner--br"
      />

      <Container size="wide" className="relative z-10">
        {/* Monumental ghosted watermark with drawing hair-rule */}
        <span
          ref={watermarkRef}
          aria-hidden="true"
          className="about-hero__watermark select-none pointer-events-none"
        >
          {watermark}
        </span>

        <h1
          id="about-hero-heading"
          aria-label={headline}
          className="t-headline wrap-editorial text-foreground relative about-hero__h1"
        >
          {words.map((w, i) => {
            if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
            // visible-word slot count for staggering
            const wordIndex = words.slice(0, i).filter((s) => !/^\s+$/.test(s)).length;
            return (
              <span
                key={i}
                className="about-hero__line"
                aria-hidden="true"
                style={{ ["--word-delay" as string]: `${360 + wordIndex * 90}ms` }}
              >
                <span className="about-hero__line-inner">{w}</span>
              </span>
            );
          })}
        </h1>

        {subhead && (
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "1100ms" }}
            className="t-lede mt-7 max-w-[52ch] relative"
          >
            {subhead}
          </p>
        )}

        {primaryCta && (
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "1320ms" }}
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
        style={{ ["--reveal-delay" as string]: "1480ms" }}
      >
        <Container size="wide">
          <div className="border-t border-foreground/12 pt-5 md:pt-6 flex items-center justify-between">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="about-hero__live-dot" />
              <span className="t-eyebrow text-foreground/55">{locator}</span>
            </span>
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

export default EditorialHero;
