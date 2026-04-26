import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — center row of in-page anchors for the current route.
 *
 * Renders nothing when fewer than 2 sections are mapped (Work, ThankYou, 404).
 * Smooth-scrolls with a 72px header offset; the active anchor gets a
 * 2px left-anchored underline that animates `scale-x` from 0 → 1.
 *
 * Visible from `md+`. The bar overflow is hidden inside the solid header,
 * so labels never spill — page configs keep section count ≤ 6 to fit.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = getPageSections(pathname);
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
      className="hidden md:flex items-center min-w-0 max-w-full overflow-hidden"
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
                "relative inline-flex items-center px-3 py-2 whitespace-nowrap shrink-0",
                "text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground",
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
