import { useEffect, useState } from "react";

/**
 * useScrollProgress — rAF-throttled scroll-depth normalised to [0, 1].
 *
 * Returns `Math.min(window.scrollY / max, 1)`. Used by Navigation to
 * smoothly interpolate the bar's backdrop alpha + blur radius across
 * the first `max` pixels of scroll (Royal-style "growing glass").
 */
export function useScrollProgress(max = 80): number {
  const [progress, setProgress] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Math.min(window.scrollY / max, 1);
  });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setProgress(Math.min(window.scrollY / max, 1));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [max]);

  return progress;
}
