import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getPageSections } from "@/lib/pageSections";
import { useActiveSection } from "@/hooks/useActiveSection";

/**
 * SectionRail — Round 7: FLIP shared underline.
 *
 * One absolutely-positioned `.rail-indicator` slides between tabs via
 * --ind-x / --ind-w CSS vars. Active tab change animates the bar in
 * place; no per-tab toggles.
 */
const HEADER_OFFSET = 72;

const SectionRail = () => {
  const { pathname } = useLocation();
  const sections = useMemo(() => getPageSections(pathname), [pathname]);
  const active = useActiveSection(sections, HEADER_OFFSET + 24);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<{ x: number; w: number; visible: boolean }>({
    x: 0,
    w: 0,
    visible: false,
  });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const el = active ? tabRefs.current.get(active) : null;
    if (!container || !el) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const cs = window.getComputedStyle(el);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    // offsetLeft is relative to containerRef (position: relative).
    const x = el.offsetLeft + padL;
    const w = Math.max(0, el.offsetWidth - padL - padR);
    setIndicator({ x, w, visible: true });
  }, [active]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure, sections]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure]);

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
      <div ref={containerRef} className="relative flex items-center gap-1">
        {sections.map((section) => {
          const isActive = active === section.anchor;
          return (
            <a
              key={section.anchor}
              ref={(node) => {
                if (node) tabRefs.current.set(section.anchor, node);
                else tabRefs.current.delete(section.anchor);
              }}
              data-anchor={section.anchor}
              href={`#${section.anchor}`}
              onClick={(e) => handleClick(e, section.anchor)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "nav-tab relative inline-flex items-center px-3.5 py-2 whitespace-nowrap shrink-0",
                "text-sm font-medium transition-colors duration-300",
                isActive
                  ? "text-foreground"
                  : "text-foreground/65 hover:text-foreground",
              )}
            >
              {section.name}
            </a>
          );
        })}
        <span
          aria-hidden="true"
          className="rail-indicator"
          style={
            {
              ["--ind-x" as string]: `${indicator.x}px`,
              ["--ind-w" as string]: `${indicator.w}px`,
              opacity: indicator.visible ? 1 : 0,
            } as React.CSSProperties
          }
        />
      </div>
    </nav>
  );
};

export default SectionRail;
