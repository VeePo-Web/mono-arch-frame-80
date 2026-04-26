import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeImporters, shouldPrefetch } from "@/lib/routePrefetch";

/**
 * RoutePrefetcher — idle-time route warming from the home page.
 *
 * After requestIdleCallback fires, dynamically import() the routes a visitor
 * is most likely to hit. Vite turns these into <link rel="modulepreload">
 * + parallel chunk fetches, so the actual click navigation is instant.
 *
 * Drawer + section-rail links separately warm their own chunks on
 * pointerdown/focus via `prefetchRoute()` — see `src/lib/routePrefetch.ts`.
 *
 * Guards: only runs from "/", skips Save-Data / 2g.
 */
const PRIORITY = ["/services", "/work", "/contact", "/about"] as const;

const RoutePrefetcher = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    if (!shouldPrefetch()) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };

    const run = () => {
      // Order = expected click likelihood. Vite emits modulepreload links
      // in the same order so the network prioritises top-to-bottom.
      for (const path of PRIORITY) {
        routeImporters[path]?.();
      }
    };

    const handle = w.requestIdleCallback
      ? w.requestIdleCallback(run, { timeout: 4000 })
      : window.setTimeout(run, 2500);

    return () => {
      if (w.requestIdleCallback && typeof handle === "number") {
        w.cancelIdleCallback?.(handle);
      } else {
        clearTimeout(handle as unknown as number);
      }
    };
  }, [pathname]);

  return null;
};

export default RoutePrefetcher;
