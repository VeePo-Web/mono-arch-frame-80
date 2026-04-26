import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useIsMobile } from "@/hooks/use-mobile";
import HamburgerButton from "@/components/nav/HamburgerButton";
import SectionRail from "@/components/nav/SectionRail";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Drawer is interaction-only — defer it past the LCP-critical bundle.
const MenuDrawer = lazy(() => import("@/components/nav/MenuDrawer"));

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";

// Routes whose primary entry-point lives inside the drawer.
const DRAWER_ROUTE_PREFIXES = ["/services/", "/service-areas/", "/about", "/work"];

/**
 * Navigation — Round 5 "Ruthless Simplification".
 *
 * Solid full-width bar. Three-zone grid:
 *   [ Logo ]  [ SectionRail (md+) ]  [ Phone · Quote · Menu ]
 *
 * Right-cluster hierarchy is now visually 1-2-3:
 * - Quote: solid evergreen pill (primary).
 * - Phone: ghost icon, number from lg+ (secondary).
 * - Menu: 48×48 icon-only square (tertiary). Calm 2px evergreen bar
 *   below the icon when the current route lives inside the drawer.
 *
 * Performance: MenuDrawer is lazy-loaded; no scroll-shadow IntersectionObserver.
 * The bottom border alone signals the bar — saves an observer + DOM node.
 */
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTouched, setDrawerTouched] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";

  const currentLivesInDrawer = useMemo(
    () => DRAWER_ROUTE_PREFIXES.some((p) => pathname.startsWith(p)),
    [pathname],
  );

  // Close drawer on route change.
  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile && !onContactRoute) {
      e.preventDefault();
      openQuickContact({ source: "quick_contact_sheet" });
    }
  };

  const openDrawer = () => {
    setDrawerTouched(true);
    setDrawerOpen(true);
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

      <header
        role="banner"
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          "h-[60px] sm:h-16",
          "bg-background/95 backdrop-blur-sm",
          "border-b border-border/60",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Container size="wide" className="h-full">
          <nav
            aria-label="Primary"
            className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-2 sm:gap-3"
          >
            {/* Brand — left. */}
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

            {/* Section rail — center. */}
            <div className="hidden md:flex justify-center min-w-0">
              <SectionRail />
            </div>
            <div className="md:hidden" aria-hidden="true" />

            {/* Right cluster — Phone (ghost) · Quote (primary) · Menu (icon) */}
            <div className="flex items-center gap-1 sm:gap-1.5 justify-end">
              {/* Phone — icon-only, number from lg+ */}
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full shrink-0",
                  "h-12 min-w-[48px] px-2.5 lg:px-3",
                  "text-sm font-medium text-foreground/80 hover:text-evergreen hover:bg-foreground/[0.05]",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <Phone className="h-[18px] w-[18px] lg:h-4 lg:w-4" strokeWidth={1.85} aria-hidden="true" />
                <span className="hidden lg:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              {/* Quote CTA — primary. No arrow chip, no responsive split. */}
              <Link
                to="/contact"
                onClick={handleQuoteClick}
                aria-label="Get a quote"
                className={cn(
                  "shrink-0 inline-flex items-center justify-center rounded-full",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[15px] font-semibold",
                  "h-12 sm:h-11 px-5",
                  "transition-colors duration-300",
                  "hover:bg-evergreen-hover active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span className="sm:hidden">Quote</span>
                <span className="hidden sm:inline">Get a Quote</span>
              </Link>

              {/* Menu — square icon-only */}
              <HamburgerButton
                open={drawerOpen}
                onClick={openDrawer}
                current={currentLivesInDrawer}
              />
            </div>
          </nav>
        </Container>
      </header>

      {/* Spacer so page content doesn't slide under the fixed bar. */}
      <div aria-hidden="true" className="h-[60px] sm:h-16" />

      {drawerTouched && (
        <Suspense fallback={null}>
          <MenuDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Navigation;
