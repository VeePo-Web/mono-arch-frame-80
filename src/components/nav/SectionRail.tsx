import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — center row of in-page anchors for the current route.
 *
 * Renders nothing when fewer than 2 sections are mapped (Work, ThankYou, 404).
 * Smooth-scrolls with a 72px header offset; the active anchor gets a 3px
 * underline AND a subtle background chip — colour-blind safe.
 *
 * Visible from `md+`. When labels would overflow the available width we
 * silently switch to a horizontally-scrollable rail with edge-fade mask
 * (`data-overflow="true"`) so the right-most label never hard-clips.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = getPageSections(pathname);
  const active = useActiveSection(sections, HEADER_OFFSET + 24);
  const navRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const activeAnchorRef = useRef<HTMLAnchorElement | null>(null);
  const [overflow, setOverflow] = useState(false);

  // Detect when label list outgrows its container — toggle scroll fallback.
  useEffect(() => {
    const nav = navRef.current;
    const inner = innerRef.current;
    if (!nav || !inner) return;

    const measure = () => {
      // 4px slack to avoid 1px subpixel false positives.
      setOverflow(inner.scrollWidth - 4 > nav.clientWidth);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [sections.length]);

  // When active changes and we're in scroll mode, ensure it's visible.
  useEffect(() => {
    if (!overflow || !activeAnchorRef.current) return;
    activeAnchorRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active, overflow]);

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
      ref={navRef}
      aria-label="Page sections"
      data-overflow={overflow ? "true" : "false"}
      className={cn(
        "section-rail hidden md:flex items-center min-w-0 max-w-full",
        overflow ? "section-rail-scroll section-rail-mask" : "overflow-hidden",
      )}
    >
      <div ref={innerRef} className="flex items-center gap-1">
        {sections.map((section) => {
          const isActive = active === section.anchor;
          return (
            <a
              key={section.anchor}
              ref={isActive ? activeAnchorRef : undefined}
              data-anchor={section.anchor}
              href={`#${section.anchor}`}
              onClick={(e) => handleClick(e, section.anchor)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "nav-tab relative inline-flex items-center px-3.5 py-2.5 whitespace-nowrap shrink-0 rounded-full",
                "text-sm transition-colors duration-300",
                isActive
                  ? "text-foreground font-semibold bg-foreground/[0.045]"
                  : "text-foreground/65 font-medium hover:text-foreground hover:bg-foreground/[0.025]",
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
