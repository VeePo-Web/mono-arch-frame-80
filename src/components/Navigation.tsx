import { Suspense, lazy, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { prefetchRoute } from "@/lib/routePrefetch";
import HamburgerButton from "@/components/nav/HamburgerButton";
import SectionRail from "@/components/nav/SectionRail";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Drawer is interaction-only — defer it past the LCP-critical bundle.
const MenuDrawer = lazy(() => import("@/components/nav/MenuDrawer"));

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";

/**
 * Navigation — Round 7 "Buttery Smooth".
 *
 * Round 7 motion adds:
 * - Quote CTA: hover lift (1px) + soft evergreen halo + 0.97 spring press.
 * - Phone: locked 44×44 hit zone aligned with hamburger silhouette.
 * - Drawer + section-rail links warm route chunks on pointerdown/focus.
 *
 * Right cluster shapes (round 6, kept):
 * - Phone: flat ghost icon (no chip).
 * - Quote: solid evergreen square (8px radius).
 * - Menu: 44×44 square ghost.
 */
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTouched, setDrawerTouched] = useState(false);
  const { pathname } = useLocation();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactRoute) return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      e.preventDefault();
      openQuickContact({ source: "quick_contact_sheet" });
    }
  };

  const warmContact = () => prefetchRoute("/contact");

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

            {/* Section rail — center. lg+ only. */}
            <div className="hidden lg:flex justify-center min-w-0">
              <SectionRail />
            </div>
            <div className="lg:hidden" aria-hidden="true" />

            {/* Right cluster — Phone (flat) · Quote (square solid) · Menu (square ghost) */}
            <div className="flex items-center gap-1 sm:gap-2 justify-end">
              {/* Phone — flat ghost icon, locked 44×44 at <lg */}
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 shrink-0",
                  "h-11 w-11 lg:w-auto lg:px-2.5",
                  "text-sm font-medium text-foreground/75 hover:text-evergreen",
                  "transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                )}
              >
                <Phone className="h-[18px] w-[18px] lg:h-4 lg:w-4" strokeWidth={1.85} aria-hidden="true" />
                <span className="hidden lg:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              {/* Quote CTA — primary. Hover-lift + spring press. */}
              <Link
                to="/contact"
                onClick={handleQuoteClick}
                onPointerDown={warmContact}
                onFocus={warmContact}
                aria-label="Get a quote"
                className={cn(
                  "cta-spring shrink-0 inline-flex items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[15px] font-semibold whitespace-nowrap",
                  "h-11 px-4 sm:px-5",
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
