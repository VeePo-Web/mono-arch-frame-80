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
 * Navigation — Logo · inline routes · CTA · (mobile: hamburger).
 *
 * Three-col flex. At lg+ the route row + solid evergreen "Get a Free Quote"
 * CTA render inline; below lg the hamburger reveals MenuOverlay (unchanged).
 *
 * A single rAF scroll handler drives:
 *  • `--nav-progress` (0..1) for the brand-mark + nav-link crossfade
 *  • `data-scrolled` for the cream backdrop past 80px
 *  • direction-aware hide past 240px
 */
const NAV_PROGRESS_MAX = 80;
const HIDE_THRESHOLD = 320;
const DOWN_DELTA = 12;
const UP_DELTA = 8;
const TOGGLE_COOLDOWN_MS = 180;

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTouched, setMenuTouched] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastYRef = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const transparentRoute = routeHasTransparentTop(pathname);
  const lastToggleAtRef = useRef(0);

  // Single rAF loop — progress + scrolled + direction-aware hide.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let pending = false;
    const apply = () => {
      const y = window.scrollY;
      const last = lastYRef.current;
      const p = Math.min(y / NAV_PROGRESS_MAX, 1);
      if (headerRef.current) {
        headerRef.current.style.setProperty("--nav-progress", p.toFixed(3));
      }
      setScrolled(y > NAV_PROGRESS_MAX);

      if (reduceMotion) {
        setHidden(false);
      } else if (menuOpen) {
        setHidden(false);
      } else {
        const now = performance.now();
        const cooled = now - lastToggleAtRef.current > TOGGLE_COOLDOWN_MS;
        if (y < 80) {
          setHidden((h) => {
            if (h) lastToggleAtRef.current = now;
            return false;
          });
        } else if (cooled) {
          if (y > HIDE_THRESHOLD && y - last > DOWN_DELTA) {
            setHidden((h) => {
              if (!h) lastToggleAtRef.current = now;
              return true;
            });
          } else if (last - y > UP_DELTA) {
            setHidden((h) => {
              if (h) lastToggleAtRef.current = now;
              return false;
            });
          }
        }
      }

      lastYRef.current = y;
      pending = false;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(apply);
    };
    lastYRef.current = window.scrollY;
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

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
        data-hidden={hidden && !menuOpen}
        data-scrolled={scrolled}
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          "min-h-[64px] md:min-h-[72px] lg:min-h-[80px]",
          "transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[hidden=true]:-translate-y-full",
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
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02]",
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
