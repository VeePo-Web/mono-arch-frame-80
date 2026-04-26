import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useIsMobile } from "@/hooks/use-mobile";
import HamburgerButton from "@/components/nav/HamburgerButton";
import SectionRail from "@/components/nav/SectionRail";
import MenuDrawer from "@/components/nav/MenuDrawer";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";

// Routes whose primary entry-point lives inside the drawer (not in the
// section rail). When the user is on one of these, the hamburger gets a
// small evergreen dot — a "you are here" hint without opening the menu.
const DRAWER_ROUTE_PREFIXES = [
  "/services/",
  "/service-areas/",
  "/about",
  "/work",
];

/**
 * Navigation — Round 4 "Grandpa-Grade" cleanup.
 *
 * Solid full-width bar. Three-zone grid:
 *   [ Logo ]  [ SectionRail (md+) ]  [ Phone · Quote · Menu ]
 *
 * Round 4 changes vs round 3:
 * - Phone link visible from xs (icon always; number from md+).
 * - Quote CTA is the visually heaviest control — h-12 mobile / h-11 desktop,
 *   15px semibold. Icon chip from md+.
 * - Hamburger lines bumped to 1.5px. Tiny evergreen dot when current route
 *   lives inside the drawer.
 * - Bar height: h-15 mobile / h-16 desktop for full 48px tap zones.
 *
 * Drawer: fullscreen overlay with the only persistent secondary CTA at its
 * bottom rail. No FAB, no sticky bar (constraint).
 */
const Navigation = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";

  const currentLivesInDrawer = useMemo(
    () => DRAWER_ROUTE_PREFIXES.some((p) => pathname.startsWith(p)),
    [pathname],
  );

  // IntersectionObserver on a 1px sentinel — adds shadow on scroll, no scroll handler.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-40px 0px 0px 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Close drawer on route change (defence in depth — also handled inside drawer).
  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-px w-px" />

      <header
        role="banner"
        data-scrolled={scrolled}
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          "h-[60px] sm:h-16",
          "bg-background/95 backdrop-blur-sm",
          "border-b border-border/60",
          "transition-shadow duration-300",
          scrolled && "shadow-[0_2px_12px_-6px_hsl(20_8%_14%/0.12)]",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Container size="wide" className="h-full">
          <nav
            aria-label="Primary"
            className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-2 sm:gap-3"
          >
            {/* Brand — left. Persistent full horizontal logo. */}
            <Link
              to="/"
              aria-label="Haven Creek Renovations — home"
              className={cn(
                "inline-flex items-center shrink-0 rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="h-6 sm:h-7 w-auto"
                fetchPriority="high"
                decoding="async"
              />
            </Link>

            {/* Section rail — center. Truly centered via grid 1fr column. */}
            <div className="hidden md:flex justify-center min-w-0">
              <SectionRail />
            </div>
            {/* Mobile spacer keeps right cluster pinned right when rail hidden */}
            <div className="md:hidden" aria-hidden="true" />

            {/* Right cluster — Phone · Quote · Menu */}
            <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
              {/* Phone — always-visible icon (xs), full number from md+ */}
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full shrink-0",
                  "h-12 min-w-[48px] px-2.5 md:px-3",
                  "text-sm font-medium text-foreground/80 hover:text-evergreen hover:bg-foreground/[0.05]",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <Phone className="h-[18px] w-[18px] md:h-4 md:w-4" strokeWidth={1.85} aria-hidden="true" />
                <span className="hidden md:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              {/* Quote CTA — heaviest control on the page */}
              <Link
                to="/contact"
                onClick={handleQuoteClick}
                aria-label="Get a free quote"
                className={cn(
                  "nav-pill group/btn shrink-0",
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[15px] font-semibold",
                  "h-12 sm:h-11 px-5 sm:px-5 md:pl-5 md:pr-1.5",
                  "transition-colors duration-300",
                  "hover:bg-evergreen-hover active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span className="sm:hidden">Quote</span>
                <span className="hidden sm:inline">Get a Quote</span>
                <span className="hidden md:inline-flex icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
                </span>
              </Link>

              {/* Menu hamburger — labeled "Menu" md+, dot if current route lives inside */}
              <HamburgerButton
                open={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                showLabel
                currentDot={currentLivesInDrawer}
              />
            </div>
          </nav>
        </Container>
      </header>

      {/* Spacer so page content doesn't slide under the fixed bar. */}
      <div aria-hidden="true" className="h-[60px] sm:h-16" />

      <MenuDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};

export default Navigation;
