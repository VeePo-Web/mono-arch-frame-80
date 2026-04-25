import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * useReveal — single shared IntersectionObserver hook.
 * Sets data-revealed="true" on the element when it enters the viewport,
 * which CSS rules in index.css use to animate `[data-reveal]` and
 * `[data-reveal-mask]` elements with the dissolve / mask-draw choreography.
 *
 * Zero JS animation library — pure CSS handles the motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.15, once = true } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, revealed };
}
