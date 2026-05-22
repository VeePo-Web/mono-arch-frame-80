import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { prefetchRoute } from "@/lib/routePrefetch";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { routeHasTransparentTop } from "@/lib/pageSections";
import HamburgerButton from "@/components/nav/HamburgerButton";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Drawer is interaction-only — defer it past the LCP-critical bundle.
const MenuDrawer = lazy(() => import("@/components/nav/MenuDrawer"));

const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_PHONE_DISPLAY = "403 970-7691";

const PRIMARY_ROUTES = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

/**
 * Navigation — simple editorial header.
 *
 * Logo · 4 inline routes (lg+) · Phone · Quote CTA · Hamburger (<lg).
 *
 * Section rails were retired — each page has 1–3 sections and stands on its
 * own scroll. Top-level routes warm on hover/pointerdown/focus so route
 * commits are instant.
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

  // Pointerdown on the hamburger fires ~80–120ms before click on touch
  // devices — enough lead time to warm the drawer chunk + the most likely
  // destination (`/contact` for the CTA).
  const warmDrawer = () => {
    void import("@/components/nav/MenuDrawer");
    prefetchRoute("/contact");
  };

  // Logo earns a feather drop-shadow only while floating over photography.
  const logoShadow = navBg < 0.3 ? `drop-shadow(0 1px 2px hsl(0 0% 0% / ${(0.3 - navBg) * 0.5}))` : "none";

  const warmRoute = (to: string) => () => prefetchRoute(to);

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
          className="md:hidden absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/70 via-background/25 to-transparent"
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
              onPointerDown={warmRoute("/")}
              onMouseEnter={warmRoute("/")}
              onFocus={warmRoute("/")}
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
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
              />
            </Link>

            {/* Primary routes — lg+ inline */}
            <div className="hidden md:flex justify-center min-w-0">
              <ul className="flex items-center gap-1">
                {PRIMARY_ROUTES.map((r) => (
                  <li key={r.to}>
                    <NavLink
                      to={r.to}
                      onPointerDown={warmRoute(r.to)}
                      onMouseEnter={warmRoute(r.to)}
                      onFocus={warmRoute(r.to)}
                      className={({ isActive }) =>
                        cn(
                          "nav-link relative inline-flex items-center px-3.5 py-2 whitespace-nowrap",
                          "text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isActive
                            ? "text-foreground nav-link--active"
                            : "text-foreground/65 hover:text-foreground",
                        )
                      }
                    >
                      {r.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:hidden" aria-hidden="true" />

            {/* Right cluster — Phone (flat) · Quote (square solid) · Menu (square ghost) */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 justify-end">
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 shrink-0",
                  "h-11 min-w-[44px] px-2 md:px-2.5",
                  "text-sm font-medium text-foreground/75 hover:text-evergreen",
                  "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                )}
              >
                <Phone className="h-[18px] w-[18px] md:h-4 md:w-4" strokeWidth={1.75} aria-hidden="true" />
                <span className="hidden md:inline">{STUDIO_PHONE_DISPLAY}</span>
              </a>

              <Link
                to="/contact"
                onClick={handleQuoteClick}
                onPointerDown={warmRoute("/contact")}
                onMouseEnter={warmRoute("/contact")}
                onFocus={warmRoute("/contact")}
                aria-label="Get a free quote"
                className={cn(
                  "nav-quote-cta cta-spring shrink-0 inline-flex items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[14px] sm:text-[15px] font-semibold whitespace-nowrap",
                  "h-10 sm:h-11 px-3.5 sm:px-5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                Get a Free Quote
              </Link>

              <div className="md:hidden">
                <HamburgerButton open={drawerOpen} onClick={openDrawer} onPointerDown={warmDrawer} />
              </div>
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
