import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { routeHasTransparentTop } from "@/lib/pageSections";
import HamburgerButton from "@/components/nav/HamburgerButton";
import Container from "@/components/Container";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

// Overlay is interaction-only — defer past LCP, then warm on idle.
const MenuOverlay = lazy(() => import("@/components/nav/MenuOverlay"));

/**
 * Navigation — Fantasy/Fly4Me register.
 *
 * One shape, every breakpoint. Logo left, single dark evergreen Menu pill
 * right. Bar is fully transparent at all times — the pill IS the chrome.
 * No backdrop, no scrim, no inline routes. Phone + Quote live inside the
 * overlay only. Direction-aware hide past 240px scroll.
 */
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTouched, setMenuTouched] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const { pathname } = useLocation();
  const transparentRoute = routeHasTransparentTop(pathname);

  // Direction-aware hide — past 240px, downward scroll tucks the bar;
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
        role="banner"
        data-hidden={hidden && !menuOpen}
        className={cn(
          "havencreek-nav fixed inset-x-0 top-0 z-50",
          // More breathing room — Fly4Me sits at 64/80; we match.
          "min-h-[64px] md:min-h-[72px] lg:min-h-[80px]",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[hidden=true]:-translate-y-full",
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Container size="wide" className="min-h-[64px] md:min-h-[72px] lg:min-h-[80px] relative">
          <nav
            aria-label="Primary"
            className="flex items-center justify-between min-h-[64px] md:min-h-[72px] lg:min-h-[80px] gap-3"
          >
            {/* Brand — single dark mark. Site is cream-only, no crossfade needed. */}
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
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="h-7 md:h-8 w-auto block"
                {...({ fetchpriority: "high" } as Record<string, string>)}
                decoding="async"
              />
            </Link>

            {/* Right — single dark evergreen Menu pill. Phone + Quote live
                inside the overlay; the pill is the entire chrome. */}
            <HamburgerButton open={menuOpen} onClick={openMenu} onPointerDown={warmMenu} />
          </nav>
        </Container>
      </header>

      {/* Spacer only on routes where the bar owns its own band (form routes). */}
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
