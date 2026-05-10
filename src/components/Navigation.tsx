import { Suspense, lazy, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useScrollProgress } from "@/hooks/useScrollProgress";
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
 * Navigation — Round 7 "Growing Glass".
 *
 * Single CSS variable `--nav-bg` (0..1) drives backdrop alpha, border,
 * shadow, AND backdrop-blur radius via calc(). The variable comes from
 * useScrollProgress (0..80px scroll → 0..1) on transparent-top routes,
 * or pinned to 1 on form routes / when prefers-reduced-transparency.
 *
 * Drawer-open clamps `--nav-bg` back to 0 so the drawer reads as the
 * sole chrome instead of double-stacking glass.
 */
const Navigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTouched, setDrawerTouched] = useState(false);
  const { pathname } = useLocation();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";
  const transparentRoute = routeHasTransparentTop(pathname);
  const scrollProgress = useScrollProgress(80);
  // Form routes pin to opaque. Drawer-open hides the backdrop. Otherwise interpolate.
  const navBg = drawerOpen ? 0 : transparentRoute ? scrollProgress : 1;

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactRoute) return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      e.preventDefault();
      openQuickContact({ source: "quick_contact_sheet" });
    }
  };

  const openDrawer = () => {
    setDrawerTouched(true);
    setDrawerOpen(true);
  };

  // Section rail fades in once the user is committed to scrolling, so it
  // doesn't compete with the hero headline at viewport 0.
  const railOpacity = transparentRoute
    ? Math.max(0, scrollProgress * 1.6 - 0.4)
    : 1;
  // Logo earns a feather drop-shadow only while floating over photography.
  const logoShadow = navBg < 0.3 ? `drop-shadow(0 1px 2px hsl(0 0% 0% / ${(0.3 - navBg) * 0.5}))` : "none";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-evergreen focus:text-evergreen-foreground focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={cn(
          "havencreek-nav nav-shell fixed inset-x-0 top-0 z-50",
          "h-[60px] sm:h-16",
        )}
        style={
          {
            paddingTop: "env(safe-area-inset-top)",
            ["--nav-bg" as string]: navBg.toFixed(3),
          } as React.CSSProperties
        }
      >
        {/* Mobile-only legibility scrim — fades out as the real backdrop fades in. */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/70 via-background/25 to-transparent"
          style={{ opacity: 1 - navBg }}
        />

        <Container size="wide" className="h-full relative">
          <nav
            aria-label="Primary"
            className="grid grid-cols-[auto_1fr_auto] items-center h-full gap-2 sm:gap-3"
          >
            {/* Brand */}
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
                className="h-6 sm:h-7 w-auto transition-[filter] duration-300"
                style={{ filter: logoShadow }}
                fetchPriority="high"
                decoding="async"
              />
            </Link>

            {/* Section rail — center. lg+ only. */}
            <div
              className="hidden lg:flex justify-center min-w-0 transition-opacity duration-300 ease-out"
              style={{ opacity: railOpacity, pointerEvents: railOpacity < 0.1 ? "none" : "auto" }}
            >
              <SectionRail />
            </div>
            <div className="lg:hidden" aria-hidden="true" />

            {/* Right cluster — Phone (flat) · Quote (square solid) · Menu (square ghost) */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 justify-end">
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 shrink-0",
                  "h-11 min-w-[44px] px-2 lg:px-2.5",
                  "text-sm font-medium text-foreground/75 hover:text-evergreen",
                  "transition-[color,transform] duration-150",
                  "active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                )}
              >
                <Phone className="h-[18px] w-[18px] lg:h-4 lg:w-4" strokeWidth={1.75} aria-hidden="true" />
                <span className="hidden lg:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              <Link
                to="/contact"
                onClick={handleQuoteClick}
                aria-label="Get a quote"
                className={cn(
                  "nav-quote-cta shrink-0 inline-flex items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[14px] sm:text-[15px] font-semibold whitespace-nowrap",
                  "h-10 sm:h-11 px-3.5 sm:px-5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                Get a Quote
              </Link>

              <HamburgerButton open={drawerOpen} onClick={openDrawer} />
            </div>
          </nav>
        </Container>
      </header>

      {/* Spacer only on routes where the bar owns its own band (form routes). */}
      {!transparentRoute && (
        <div aria-hidden="true" className="h-[60px] sm:h-16" />
      )}

      {drawerTouched && (
        <Suspense fallback={null}>
          <MenuDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Navigation;
