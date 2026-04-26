import { useEffect, useState } from "react";
import type { PageSection } from "@/lib/pageSections";

/**
 * Tracks which page section is currently in view. Round 5: lean.
 *
 * - Single IntersectionObserver, no scroll/resize listeners.
 * - rAF-debounced recompute.
 * - Pauses work when the tab is hidden.
 *
 * `headerOffset` matches the solid nav bar height + breathing room so a
 * section is considered "active" the moment its title clears the bar.
 */
export const useActiveSection = (
  sections: PageSection[],
  headerOffset = 96,
): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) {
      setActive(null);
      return;
    }

    const ids = sections.map((s) => s.anchor);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    let raf = 0;
    const recompute = () => {
      if (typeof document !== "undefined" && document.hidden) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let current: string | null = elements[0]?.id ?? null;
        let bestTop = -Infinity;
        for (const el of elements) {
          const top = el.getBoundingClientRect().top;
          if (top - headerOffset <= 0 && top > bestTop) {
            bestTop = top;
            current = el.id;
          }
        }
        setActive(current);
      });
    };

    const observer = new IntersectionObserver(recompute, {
      rootMargin: `-${headerOffset}px 0px -40% 0px`,
      threshold: [0, 0.5, 1],
    });
    elements.forEach((el) => observer.observe(el));

    // Initial paint.
    recompute();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
    // sections is recreated on each render; depend on a stable signature.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map((s) => s.anchor).join("|"), headerOffset]);

  return active;
};
