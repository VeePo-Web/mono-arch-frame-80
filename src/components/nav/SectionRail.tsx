import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — center pill of in-page anchors for the current route.
 *
 * Renders nothing when fewer than 2 sections are mapped (Work, ThankYou, 404).
 * Smooth-scrolls with a 72px header offset; the active anchor gets the
 * existing `nav-active-rule` hairline that draws in via scaleX.
 *
 * Visible from `md+` so tablet visitors get wayfinding too. When the rail
 * overflows its container (long pages on narrow tablets) the row scrolls
 * horizontally with snap + masked edges so labels never truncate.
 *
 * On route change / when the active anchor moves, we auto-scroll the rail
 * so the active label stays visible without the user fishing for it.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = getPageSections(pathname);
  const active = useActiveSection(sections, HEADER_OFFSET + 24);
  const railRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      // Update the URL hash without triggering a re-scroll.
      if (window.history.replaceState) {
        window.history.replaceState(null, "", `#${anchor}`);
      }
    },
    [],
  );

  // Keep the active label visible inside the scroll container.
  useEffect(() => {
    if (!active || !railRef.current) return;
    const target = railRef.current.querySelector<HTMLAnchorElement>(
      `a[data-anchor="${active}"]`,
    );
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Page sections"
      className="hidden md:flex relative z-10 min-w-0 max-w-full"
    >
      <div
        ref={railRef}
        className="section-rail-scroll flex items-center gap-0.5 mx-1"
      >
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
                "relative inline-flex items-center px-3 py-2 rounded-full whitespace-nowrap shrink-0",
                "text-minimal transition-colors duration-500 ease-swift",
                "scroll-snap-align-center",
                "hover:bg-foreground/[0.04]",
                isActive
                  ? "text-evergreen"
                  : "text-foreground/70 hover:text-foreground",
              )}
              style={{ scrollSnapAlign: "center" }}
            >
              <span>{section.name}</span>
              <span
                aria-hidden="true"
                className="nav-active-rule"
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
