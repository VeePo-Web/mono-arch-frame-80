import { Suspense, lazy, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useScrolled } from "@/hooks/useScrolled";
import { routeHasTransparentTop } from "@/lib/pageSections";
import HamburgerButton from "@/components/nav/HamburgerButton";
import SectionRail from "@/components/nav/SectionRail";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Drawer is interaction-only — defer it past the LCP-critical bundle.
const MenuDrawer = lazy(() => import("@/components/nav/MenuDrawer"));

const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_PHONE_DISPLAY = "403 970-7691";

/**
 * Navigation — Round 6 "Shape Hierarchy".
 *
 * Solid full-width bar. Three-zone grid:
 *   [ Logo ]  [ SectionRail (lg+) ]  [ Phone · Quote · Menu ]
 *
 * Right cluster reads 1-2-3 by SHAPE, not weight:
 * - Phone: flat ghost icon, no chip — looks like an affordance, not a button.
 * - Quote: solid evergreen SQUARE button (8px radius) — universal "submit" shape.
 * - Menu: 44×44 square ghost — matches the Quote silhouette.
 *
 * Performance: MenuDrawer is lazy-loaded (mounted on first touch).
 * No useIsMobile subscription — the QuickContact branch uses a one-shot
 * window.matchMedia check at click time.
 * No close-on-pathname effect — drawer link onClicks already close it.
 */
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTouched, setDrawerTouched] = useState(false);
  const { pathname } = useLocation();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";
  const scrolled = useScrolled(24);
  // Transparent only at the very top of routes whose hero owns the canvas.
  const transparent = !scrolled && routeHasTransparentTop(pathname);

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactRoute) return;
    // One-shot media query — no subscription, no React re-renders.
    if (window.matchMedia("(max-width: 767px)").matches) {
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
        data-transparent={transparent}
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          "h-[60px] sm:h-16",
          "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          transparent
            ? "bg-transparent border-b border-transparent shadow-none"
            : "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-[0_4px_24px_-8px_hsl(var(--evergreen)/0.10)]",
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

            {/* Section rail — center. lg+ only (round 6). */}
            <div className="hidden lg:flex justify-center min-w-0">
              <SectionRail />
            </div>
            <div className="lg:hidden" aria-hidden="true" />

            {/* Right cluster — Phone (flat) · Quote (square solid) · Menu (square ghost) */}
            <div className="flex items-center gap-1 sm:gap-2 justify-end">
              {/* Phone — flat ghost icon. No background chip ever. */}
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 shrink-0",
                  "h-11 min-w-[44px] px-2 lg:px-2.5",
                  "text-sm font-medium text-foreground/75 hover:text-evergreen",
                  "transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                )}
              >
                <Phone className="h-[18px] w-[18px] lg:h-4 lg:w-4" strokeWidth={1.85} aria-hidden="true" />
                <span className="hidden lg:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              {/* Quote CTA — primary. Square solid. Universal "action" shape. */}
              <Link
                to="/contact"
                onClick={handleQuoteClick}
                aria-label="Get a quote"
                className={cn(
                  "shrink-0 inline-flex items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[15px] font-semibold whitespace-nowrap",
                  "h-11 px-4 sm:px-5",
                  "transition-colors duration-300",
                  "hover:bg-evergreen-hover active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                Get a Quote
              </Link>

              {/* Menu — square ghost, matches Quote silhouette */}
              <HamburgerButton open={drawerOpen} onClick={openDrawer} />
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
