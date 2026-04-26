import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useIsMobile } from "@/hooks/use-mobile";
import HamburgerButton from "@/components/nav/HamburgerButton";
import SectionRail from "@/components/nav/SectionRail";
import MenuDrawer from "@/components/nav/MenuDrawer";
import logo from "@/assets/logo/haven-creek-horizontal.webp";
import logoMark from "@/assets/logo/haven-creek-mark.webp";

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";

/**
 * Navigation — Two-Tier Editorial Nav.
 *
 * Top bar (this file):
 *   Logo (left) · SectionRail (center, lg+) · Phone · Consultation · Hamburger
 *
 * Drawer (MenuDrawer):
 *   Fullscreen overlay for cross-page navigation. Triggered by the
 *   always-on hamburger at every breakpoint.
 *
 * The bar's job is "where am I." The drawer's job is "where else can I go."
 * They never compete.
 */
const Navigation = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";

  // IntersectionObserver on a 1px sentinel — no scroll handler at all.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Close drawer on route change (defence in depth — also handled inside drawer).
  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleConsultClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // On touch viewports, prefer the in-place sheet so cautious leads
    // don't lose their scroll position. Skip when we're already on /contact.
    if (isMobile && !onContactRoute) {
      e.preventDefault();
      openQuickContact({ source: "quick_contact_sheet" });
    }
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-evergreen focus:text-evergreen-foreground focus:rounded-full focus:text-minimal"
      >
        Skip to content
      </a>

      {/* Sentinel: when this scrolls out of view, the island contracts. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-px w-px" />

      <header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center pointer-events-none",
          "transition-[padding] duration-700 ease-weighted",
          scrolled ? "pt-3" : "pt-5",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "nav-island pointer-events-auto",
            "relative flex items-center gap-1.5",
            "backdrop-blur-xl",
            "rounded-full",
            "transition-all duration-700 ease-weighted",
            scrolled
              ? [
                  "bg-background/85",
                  "ring-1 ring-foreground/[0.10]",
                  "shadow-[0_1px_0_hsl(36_25%_99%/0.6)_inset,0_14px_32px_-16px_hsl(20_8%_14%/0.22),0_6px_18px_-10px_hsl(20_8%_14%/0.12)]",
                  "p-1.5 max-w-[min(94vw,940px)]",
                ]
              : [
                  "bg-background/55",
                  "ring-1 ring-foreground/[0.06]",
                  "shadow-[0_1px_0_hsl(36_25%_99%/0.4)_inset,0_18px_44px_-20px_hsl(20_8%_14%/0.16),0_8px_24px_-14px_hsl(20_8%_14%/0.08)]",
                  "p-2 max-w-[min(96vw,1040px)]",
                ],
          )}
        >
          {/* Brand chip — left. Crossfade between full logo (rest) and mark (scrolled). */}
          <Link
            to="/"
            aria-label="Haven Creek Renovations — home"
            className={cn(
              "relative z-10 flex items-center rounded-full",
              "transition-all duration-700 ease-weighted",
              scrolled ? "px-2.5 py-1.5" : "px-3 py-2",
            )}
          >
            <span
              className="relative inline-flex items-center justify-start h-7"
              style={{ width: scrolled ? 28 : 160, transition: "width 700ms var(--ease-weighted)" }}
            >
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="nav-mark absolute inset-y-0 left-0 h-6 w-auto my-auto"
                data-state={scrolled ? "hidden" : "visible"}
                fetchPriority="high"
                decoding="async"
              />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="nav-mark absolute inset-y-0 left-0 h-7 w-7 my-auto"
                data-state={scrolled ? "visible" : "hidden"}
                decoding="async"
              />
            </span>
          </Link>

          {/* Section rail — in-page wayfinding (auto-highlights as you scroll). */}
          <div className="hidden lg:flex flex-1 justify-center">
            <SectionRail />
          </div>

          {/* Spacer pushes right cluster to the edge on mobile / when rail is empty. */}
          <div className="flex-1 lg:hidden" aria-hidden="true" />

          {/* Right cluster — Phone (lg+) · Consultation · Hamburger */}
          <a
            href={`tel:${STUDIO_PHONE_TEL}`}
            aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
            className={cn(
              "hidden lg:inline-flex relative z-10 items-center gap-2 rounded-full px-3 py-2",
              "text-minimal text-foreground/70 hover:text-evergreen hover:bg-foreground/[0.04]",
              "transition-colors duration-300 min-h-[40px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden xl:inline">{STUDIO_PHONE_DISPLAY}</span>
            <span className="xl:hidden">Call</span>
          </a>

          <Link
            to="/contact"
            onClick={handleConsultClick}
            className={cn(
              "relative z-10 group/btn",
              "inline-flex items-center gap-2.5 rounded-full",
              "bg-evergreen text-evergreen-foreground",
              "pl-4 sm:pl-5 pr-1.5 py-1.5",
              "text-minimal min-h-[40px]",
              "transition-all duration-500 ease-swift",
              "hover:bg-evergreen-hover active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <span className="hidden sm:inline">Consultation</span>
            <span className="sm:hidden">Consult</span>
            <span className="icon-chip icon-chip-light bg-background/15">
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
            </span>
          </Link>

          {/* Always-on hamburger — opens the editorial Site Map drawer. */}
          <HamburgerButton open={drawerOpen} onClick={() => setDrawerOpen(true)} />
        </nav>
      </header>

      <MenuDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};

export default Navigation;
