import { useEffect, useState } from "react";

/**
 * useScrolled — rAF-throttled boolean scroll subscription.
 * Returns true once window.scrollY exceeds `threshold`.
 *
 * Single-purpose, scoped to the nav. No global state, no context.
 * Initial value reads window.scrollY synchronously so the first paint
 * matches the actual scroll position (no flash of transparent header on
 * a page reload mid-scroll).
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > threshold;
  });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
