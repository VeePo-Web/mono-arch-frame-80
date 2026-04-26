import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — Round 7: shared sliding underline (FLIP).
 *
 * One absolutely-positioned indicator slides between active tabs by
 * writing CSS vars `--ind-x`/`--ind-w` from the active tab's geometry.
 * The user *sees* the underline glide, not flicker.
 *
 * Always renders in scroll-x mode with edge-fade mask. When the active
 * tab changes (page scroll), the rail auto-centers it horizontally so
 * the active label is never hidden behind the mask.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = useMemo(() => getPageSections(pathname), [pathname]);
  const active = useActiveSection(sections, HEADER_OFFSET + 24);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  // Measure active tab and write CSS vars for the sliding indicator.
  useLayoutEffect(() => {
    if (!active) {
      setIndicator(null);
      return;
    }
    const el = tabRefs.current.get(active);
    if (!el) return;
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active, sections]);

  // Keep active tab visible behind the edge-fade mask.
  useEffect(() => {
    if (!active) return;
    const el = tabRefs.current.get(active);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      if (window.history.replaceState) {
        window.history.replaceState(null, "", `#${anchor}`);
      }
    },
    [],
  );

  const setTabRef = useCallback(
    (anchor: string) => (el: HTMLAnchorElement | null) => {
      if (el) tabRefs.current.set(anchor, el);
      else tabRefs.current.delete(anchor);
    },
    [],
  );

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="section-rail section-rail-mask hidden lg:flex items-center min-w-0 max-w-full"
    >
      <div
        ref={innerRef}
        className="relative flex items-center gap-0.5"
        style={
          indicator
            ? ({ "--ind-x": `${indicator.x}px`, "--ind-w": `${indicator.w}px` } as React.CSSProperties)
            : undefined
        }
      >
        {sections.map((section) => {
          const isActive = active === section.anchor;
          return (
            <a
              key={section.anchor}
              ref={setTabRef(section.anchor)}
              data-anchor={section.anchor}
              href={`#${section.anchor}`}
              onClick={(e) => handleClick(e, section.anchor)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "nav-tab relative inline-flex items-center px-3 py-2 whitespace-nowrap shrink-0",
                "text-sm transition-colors duration-300",
                isActive
                  ? "text-foreground font-semibold"
                  : "text-foreground/75 font-medium hover:text-foreground",
              )}
            >
              <span>{section.name}</span>
            </a>
          );
        })}

        {/* Shared sliding underline (FLIP). One element for the whole rail. */}
        {indicator && (
          <span aria-hidden="true" className="nav-tab-indicator" />
        )}
      </div>
    </nav>
  );
};

export default SectionRail;
