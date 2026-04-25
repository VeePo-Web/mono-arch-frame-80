import { useEffect, useRef } from "react";

/**
 * useDrift — scroll-coupled headline drift.
 * Maps the element's vertical viewport position to a CSS variable `--drift`,
 * which the element's transform consumes for a barely-perceptible 4px settle.
 * One IntersectionObserver per element, no scroll listener, RAF-throttled.
 */
export function useDrift<T extends HTMLElement = HTMLHeadingElement>(maxDrift = 4) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let isVisible = false;

    const update = () => {
      rafId = 0;
      if (!isVisible) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 when element is at viewport bottom, 1 when at top.
      const progress = Math.min(1, Math.max(0, 1 - (rect.top + rect.height / 2) / vh));
      const drift = -maxDrift * progress;
      node.style.setProperty("--drift", `${drift.toFixed(2)}px`);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          window.addEventListener("scroll", onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: [0, 0.1, 0.5, 1] },
    );
    obs.observe(node);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxDrift]);

  return ref;
}
