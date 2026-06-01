import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Phone from "lucide-react/dist/esm/icons/phone";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { prefetchRoute } from "@/lib/routePrefetch";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { routeHasTransparentTop } from "@/lib/pageSections";
import HamburgerButton from "@/components/nav/HamburgerButton";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Overlay is interaction-only — defer past LCP, then warm on idle.
const MenuOverlay = lazy(() => import("@/components/nav/MenuOverlay"));

const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_PHONE_DISPLAY = "403 970-7691";

/**
 * Navigation — one shape, every breakpoint.
 *
 * Brand left · Phone + Quote CTA + Menu trigger right. No inline routes —
 * all five routes live inside MenuOverlay. The bar is transparent over
 * hero content, gains a cream wash + 1px evergreen hairline past 24px,
 * and tucks away on downward scroll past 240px.
 */
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTouched, setMenuTouched] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const { pathname } = useLocation();
  const onContactRoute = pathname === "/contact" || pathname === "/thank-you";
  const transparentRoute = routeHasTransparentTop(pathname);
  // 40px interpolation range — glass kicks in within the first scroll gesture (iOS register).
  const scrollProgress = useScrollProgress(40);
  // Form routes pin to opaque. Menu-open hides the backdrop. Otherwise interpolate.
  const navBg = menuOpen ? 0 : transparentRoute ? scrollProgress : 1;

  // Direction-aware hide — past 240px, scrolling down tucks the bar; any
  // upward intent or returning near the top reveals it.
  useEffect(() => {
    if (menuOpen) {
      setHidden(false);
      return;
    }
    let raf = 0;
    let pending = false;
    const apply = () => {
      const y = window.scrollY;
      const last = lastYRef.current;
      if (y > 240 && y - last > 4) setHidden(true);
      else if (last - y > 4 || y < 80) setHidden(false);
      lastYRef.current = y;
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };
    lastYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  // Warm the overlay chunk shortly after first paint so the first Menu tap
  // is always instant — in addition to the pointerdown warm on the trigger.
  useEffect(() => {
    const warm = () => void import("@/components/nav/MenuOverlay");
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    const w = window as IdleWindow;
    const ric = w.requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(warm, { timeout: 2000 });
      return () => {
        const cancel = (window as IdleWindow & {
          cancelIdleCallback?: (id: number) => void;
        }).cancelIdleCallback;
        if (typeof cancel === "function") cancel(id);
      };
    }
    const t = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const handleQuoteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactRoute) return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      e.preventDefault();
      openQuickContact({ source: "quick_contact_sheet" });
    }
  };

  const openMenu = () => {
    setMenuTouched(true);
    setMenuOpen(true);
  };

  // Pointerdown on the trigger fires ~80–120ms before click on touch
  // devices — enough lead time to warm overlay + likely destination.
  const warmMenu = () => {
    void import("@/components/nav/MenuOverlay");
    prefetchRoute("/contact");
  };

  // Logo feather shadow only while floating over photography.
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
        data-hidden={hidden && !menuOpen}
        className={cn(
          "havencreek-nav nav-shell fixed inset-x-0 top-0 z-50",
          // min-h (not h) so safe-area-inset padding pushes the bar DOWN
          // rather than eating its content area (border-box math bug).
          "min-h-[56px] md:min-h-[68px] lg:min-h-20",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[hidden=true]:-translate-y-full",
        )}
        style={
          {
            paddingTop: "env(safe-area-inset-top)",
            ["--nav-bg" as string]: navBg.toFixed(3),
            ["--nav-progress" as string]: navBg.toFixed(3),
          } as React.CSSProperties
        }
      >
        {/* Mobile-only legibility scrim — fades out as the real backdrop fades in. */}
        <div
          aria-hidden="true"
          className="md:hidden absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-background/70 via-background/25 to-transparent"
          style={{ opacity: 1 - navBg }}
        />

        <Container size="wide" className="min-h-[56px] md:min-h-[68px] lg:min-h-20 relative">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between min-h-[56px] md:min-h-[68px] lg:min-h-20 gap-2 sm:gap-3"
          >
            {/* Brand — two-layer crossfade: cream over hero, foreground after scroll */}
            <Link
              to="/"
              onPointerDown={warmRoute("/")}
              onMouseEnter={warmRoute("/")}
              onFocus={warmRoute("/")}
              aria-label="Haven Creek Renovations — home"
              className={cn(
                "brand-mark inline-flex items-center shrink-0 rounded-sm relative",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {/* Base (dark) — full opacity */}
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="h-6 sm:h-7 w-auto block transition-[filter] duration-300"
                style={{ filter: logoShadow }}
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
              />
              {/* Cream overlay — visible over hero, fades as nav-progress rises */}
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width={160}
                height={28}
                className="brand-mark__cream pointer-events-none absolute inset-0 h-6 sm:h-7 w-auto block"
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: 1 - navBg,
                }}
                decoding="async"
              />
            </Link>

            {/* Right cluster — Phone (flat) · Quote (square solid) · Menu (square ghost) */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 justify-end">
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2 shrink-0",
                  "h-11 min-w-[44px] px-2 md:px-2.5",
                  "text-[13px] md:text-sm font-medium text-foreground/75 hover:text-evergreen",
                  "transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "active:scale-[0.96]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md",
                )}
              >
                <Phone className="h-[17px] w-[17px] md:h-4 md:w-4" strokeWidth={1.65} aria-hidden="true" />
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
                  // Hide on mobile — lives inside the overlay there.
                  "hidden md:inline-flex",
                  "nav-quote-cta cta-spring shrink-0 items-center justify-center rounded-lg",
                  "bg-evergreen text-evergreen-foreground",
                  "text-[14px] sm:text-[15px] font-semibold whitespace-nowrap",
                  "h-10 sm:h-11 px-3.5 sm:px-5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                Get a Free Quote
              </Link>

              <HamburgerButton open={menuOpen} onClick={openMenu} onPointerDown={warmMenu} showWord />
            </div>
          </nav>
        </Container>
      </header>

      {/* Spacer only on routes where the bar owns its own band (form routes). */}
      {!transparentRoute && (
        <div aria-hidden="true" className="h-[60px] sm:h-16 md:h-20" />
      )}

      {menuTouched && (
        <Suspense fallback={null}>
          <MenuOverlay open={menuOpen} onOpenChange={setMenuOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Navigation;
