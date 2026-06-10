import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { routeHasTransparentTop } from "@/lib/pageSections";
import HamburgerButton from "@/components/nav/HamburgerButton";
import BrandMark from "@/components/nav/BrandMark";
import NavLinks from "@/components/nav/NavLinks";
import PhoneLink from "@/components/nav/PhoneLink";
import Container from "@/components/Container";

const MenuOverlay = lazy(() => import("@/components/nav/MenuOverlay"));

/**
 * Navigation — Logo · inline section anchors · Phone · Quote CTA · Menu pill.
 *
 * Always sticky. A single rAF scroll handler writes `--nav-progress` (0..1)
 * across the first 80px of scroll, which drives the brand-mark crossfade,
 * the inline `.nav-link` colour blend, AND the progressive cream backdrop
 * fade (background, blur, hairline, brushed-glass top highlight). The
 * `data-scrolled` attribute remains for the discrete legibility switches
 * (underline colour, active route colour, phone hover).
 */
const NAV_PROGRESS_MAX = 80;

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTouched, setMenuTouched] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const transparentRoute = routeHasTransparentTop(pathname);

  // Single rAF loop — write `--nav-progress` + toggle `data-scrolled`.
  useEffect(() => {
    let raf = 0;
    let pending = false;
    const apply = () => {
      const y = window.scrollY;
      const p = Math.min(y / NAV_PROGRESS_MAX, 1);
      if (headerRef.current) {
        headerRef.current.style.setProperty("--nav-progress", p.toFixed(3));
      }
      setScrolled(y > NAV_PROGRESS_MAX);
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Warm the overlay chunk shortly after first paint.
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

  const openMenu = () => {
    setMenuTouched(true);
    setMenuOpen(true);
  };

  const warmMenu = () => {
    void import("@/components/nav/MenuOverlay");
    prefetchRoute("/contact");
  };

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
        ref={headerRef}
        role="banner"
        data-scrolled={scrolled}
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          "min-h-[64px] md:min-h-[72px] lg:min-h-[80px]",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Container size="wide" className="min-h-[64px] md:min-h-[72px] lg:min-h-[80px] relative">
          <nav
            aria-label="Primary"
            className="grid grid-cols-[auto_1fr_auto] items-center min-h-[64px] md:min-h-[72px] lg:min-h-[80px] gap-3"
          >
            {/* Left — brand */}
            <Link
              to="/"
              onPointerDown={warmRoute("/")}
              onMouseEnter={warmRoute("/")}
              onFocus={warmRoute("/")}
              aria-label="Haven Creek Renovations — home"
              className={cn(
                "brand-mark inline-flex items-center shrink-0 rounded-sm",
                "transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              <BrandMark />
            </Link>

            {/* Center — inline routes (lg+) */}
            <NavLinks />

            {/* Right — desktop CTA + mobile hamburger */}
            <div className="flex items-center justify-end gap-2 md:gap-3">
              <PhoneLink />
              {pathname !== "/contact" && (
                <Link
                  to="/contact"
                  onPointerDown={warmRoute("/contact")}
                  onMouseEnter={warmRoute("/contact")}
                  onFocus={warmRoute("/contact")}
                  className={cn(
                    "nav-quote-cta cta-spring hidden lg:inline-flex items-center justify-center",
                    "h-10 px-5 rounded-lg",
                    "bg-evergreen text-evergreen-foreground",
                    "text-[14px] font-medium tracking-[-0.005em] leading-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  Get a Free Quote
                </Link>
              )}
              <HamburgerButton
                open={menuOpen}
                onClick={openMenu}
                onPointerDown={warmMenu}
              />
            </div>
          </nav>
        </Container>
      </header>

      {!transparentRoute && (
        <div
          aria-hidden="true"
          className="min-h-[64px] md:min-h-[72px] lg:min-h-[80px]"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        />
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
