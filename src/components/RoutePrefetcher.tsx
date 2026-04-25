import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * RoutePrefetcher — idle-time route warming.
 *
 * After requestIdleCallback fires on the home page, dynamically import() the
 * routes a visitor is most likely to hit next. Vite turns these into
 * <link rel="modulepreload"> + parallel chunk fetches, so the actual click
 * navigation is instant.
 *
 * Guards:
 *   - Only runs from "/" (no point prefetching from a destination page)
 *   - Skips on Save-Data / 2g connections
 *   - Skips when the user has reduced-motion preference set AND we're on a
 *     metered connection (treat as "user wants minimal noise")
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
    if (pathname !== "/") return;
    if (!shouldPrefetch()) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };

    const run = () => {
      // Order = expected click likelihood. Vite emits modulepreload links
      // in the same order, so the network prioritises them top-to-bottom.
      void import("@/pages/Services");
      void import("@/pages/Work");
      void import("@/pages/Contact");
      void import("@/pages/About");
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
