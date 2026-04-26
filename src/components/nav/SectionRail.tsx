import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — Round 5: one cue, not three.
 *
 * Active anchor: 2px center-anchored evergreen underline + font-semibold
 * weight bump. No background chip — calmer, easier to scan.
 *
 * Always renders in scroll-x mode with an edge-fade mask. The mask is
 * harmless when content fits; when it doesn't, the user can scroll the
 * rail without a UI hint about overflow detection. No ResizeObserver.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = useMemo(() => getPageSections(pathname), [pathname]);
  const active = useActiveSection(sections, HEADER_OFFSET + 24);

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

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="section-rail section-rail-mask hidden md:flex items-center min-w-0 max-w-full"
    >
      <div className="flex items-center gap-0.5">
        {sections.map((section) => {
          const isActive = active === section.anchor;
          return (
            <a
              key={section.anchor}
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
              <span
                aria-hidden="true"
                className="nav-tab-rule"
                style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SectionRail;
