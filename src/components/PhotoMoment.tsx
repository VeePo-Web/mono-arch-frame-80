import { useEffect, useRef, useState } from "react";
import { photography } from "@/assets/photography";

/**
 * PhotoMoment — the page's single full-bleed cinematic moment.
 *
 * One photograph, one line of type. Subtle parallax on scroll, soft top &
 * bottom dissolves so it bleeds into the surrounding sections instead of
 * appearing as a hard plate. The headline lands top-left where the sky
 * has the most negative space — composition was shot for this.
 */
const PhotoMoment = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Reveal on intersect
  useEffect(() => {
    if (!sectionRef.current) return;
    const node = sectionRef.current;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setVisible(true),
      { threshold: 0.18 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Lightweight parallax — translateY only, throttled to rAF
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    let ticking = false;
    const tick = () => {
      ticking = false;
      const sec = sectionRef.current;
      const img = imgRef.current;
      if (!sec || !img) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (above viewport) → 1 (below) — center at 0
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const y = Math.max(-40, Math.min(40, -progress * 28));
      img.style.transform = `translate3d(0, ${y}px, 0) scale(1.06)`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="photo-moment-heading"
      className="relative min-h-[60svh] sm:min-h-[72vh] flex items-center overflow-hidden bg-evergreen-deep"
    >
      {/* Photograph */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <img
            src={photography.closingPhotoMoment}
            alt="A finished cedar-clad acreage home glowing at twilight in the rural Alberta foothills."
            width={2000}
            height={1125}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: "70% 60%" }}
          />
        </div>
        {/* Tonal wash to keep type legible without crushing the photograph */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, hsl(var(--evergreen-deep) / 0.78) 0%, hsl(var(--evergreen-deep) / 0.55) 35%, hsl(var(--evergreen-deep) / 0.20) 65%, hsl(var(--evergreen-deep) / 0.45) 100%)",
          }}
        />
      </div>

      {/* Top dissolve — into preceding cream section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 sm:h-24 lg:h-36 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.5) 35%, transparent 100%)",
        }}
      />
      {/* Bottom dissolve — into following dark CTA */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 sm:h-24 lg:h-36 z-[1]"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--evergreen-deep)) 0%, hsl(var(--evergreen-deep) / 0.55) 40%, transparent 100%)",
        }}
      />

      {/* Type — anchored top-left where the sky has the most room */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className={`max-w-[26ch] transition-all duration-[900ms] ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-[0.7rem] tracking-[0.22em] uppercase text-background/65 mb-6">
              The work, settled
            </p>
            <h2
              id="photo-moment-heading"
              className="text-display text-background leading-[1.05] tracking-[-0.01em]"
              style={{ textShadow: "0 2px 24px hsl(145 30% 6% / 0.45)" }}
            >
              Built for the property
              <br />
              you&rsquo;ll{" "}
              <span className="text-display-italic text-background/95">keep</span>.
            </h2>
            <p
              className={`mt-6 max-w-[40ch] font-serif italic text-background/80 text-[1.05rem] leading-relaxed transition-opacity duration-700 delay-300 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ textShadow: "0 1px 16px hsl(145 30% 6% / 0.5)" }}
            >
              One contractor, hands on the work, walking the finish with you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoMoment;
