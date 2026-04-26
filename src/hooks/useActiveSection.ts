import { useEffect, useState } from "react";
import type { PageSection } from "@/lib/pageSections";

/**
 * Tracks which page section is currently in view.
 *
 * Strategy: an IntersectionObserver fires on every section's enter/exit.
 * On each callback we re-query *all* observed elements and pick the one
 * whose top is closest to (but at or above) the header line — that's the
 * section the user is "on." This produces stable highlights even when
 * multiple sections are intersecting at once.
 *
 * `headerOffset` matches the solid nav bar height + breathing room
 * so a section is considered "active" the moment its title clears the bar.
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
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Pick the section whose top is the largest value still ≤ headerOffset.
        // Falls back to the first section if we're above all of them.
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
      // Negative top margin pulls the trigger line down to the header.
      rootMargin: `-${headerOffset}px 0px -40% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    elements.forEach((el) => observer.observe(el));

    // Initial paint + handle scroll-restored loads.
    recompute();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
    // sections is recreated on each render; depend on a stable signature.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map((s) => s.anchor).join("|"), headerOffset]);

  return active;
};
