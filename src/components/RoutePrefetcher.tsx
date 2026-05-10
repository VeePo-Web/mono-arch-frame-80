import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { prefetchRoute, PREFETCHABLE_ROUTES } from "@/lib/routePrefetch";

/**
 * RoutePrefetcher — idle-time route warming.
 *
 * On every route, after `requestIdleCallback` fires, dynamically import()
 * every other top-level route via `prefetchRoute()` (which dedupes). Vite
 * turns these into <link rel="modulepreload"> + parallel chunk fetches,
 * so the next click navigation commits without showing the Suspense
 * fallback. On-demand pointerdown warming (in Navigation + MenuDrawer)
 * covers the cold-click window before idle fires.
 *
 * Guards:
 *   - Skips on Save-Data / 2g connections
 *   - prefetchRoute() dedupes, so this runs cheaply on every route change
 */

type NetInfo = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
};

function shouldPrefetch(): boolean {
  const nav = navigator as Navigator & { connection?: NetInfo };
  const c = nav.connection;
  if (!c) return true;
  if (c.saveData) return false;
  if (c.effectiveType === "slow-2g" || c.effectiveType === "2g") return false;
  return true;
}

const RoutePrefetcher = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!shouldPrefetch()) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };

    const run = () => {
      for (const route of PREFETCHABLE_ROUTES) {
        if (route === pathname) continue;
        prefetchRoute(route);
      }
    };

    const handle = w.requestIdleCallback
      ? w.requestIdleCallback(run, { timeout: 4000 })
      : window.setTimeout(run, 2500);

    return () => {
      if (w.requestIdleCallback && typeof handle === "number") {
        const cancel = (window as unknown as { cancelIdleCallback?: (h: number) => void })
          .cancelIdleCallback;
        cancel?.(handle);
      } else {
        clearTimeout(handle as unknown as number);
      }
    };
  }, [pathname]);

  return null;
};

export default RoutePrefetcher;
