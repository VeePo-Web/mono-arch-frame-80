import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getSectionsForRoute } from "@/lib/pageSections";

/**
 * NavLinks — desktop inline section-anchor row.
 *
 * Routes live in MenuOverlay. The bar shows scroll-spy anchors for the
 * current page's in-page sections (from `getSectionsForRoute`). Renders
 * `null` when fewer than 2 sections exist so the bar collapses cleanly.
 *
 * Visual grammar (`.nav-link` / `.nav-link--active`) is unchanged — only
 * the link targets and active-state source differ.
 */
const NAV_OFFSET = 80; // matches lg+ bar min-h

const NavLinks = () => {
  const { pathname } = useLocation();
  const sections = getSectionsForRoute(pathname);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setActiveId("");
    if (sections.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -70% 0px" }
    );

    const tracked: Element[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        tracked.push(el);
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (sections.length < 2) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <ul className="nav-links-row hidden lg:flex items-center justify-center gap-x-8 xl:gap-x-10">
      {sections.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              aria-current={isActive ? "true" : undefined}
              className={cn("nav-link", isActive && "nav-link--active")}
            >
              <span className="nav-link__label">{label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
