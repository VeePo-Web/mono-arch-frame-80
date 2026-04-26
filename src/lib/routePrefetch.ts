/**
 * Centralised route-chunk prefetch map.
 *
 * Each entry is a `() => Promise<...>` that triggers Vite's dynamic import,
 * which in turn warms the modulepreload cache. Calling the same importer
 * twice is a no-op — the browser/Vite dedupe.
 *
 * Used by:
 * - `RoutePrefetcher` (idle-time warm from "/")
 * - Drawer + SectionRail links (`onPointerDown` / `onFocus`) — by the time
 *   the click event fires (~80-150ms later on touch), the chunk is in cache.
 */

type Importer = () => Promise<unknown>;

export const routeImporters: Record<string, Importer> = {
  "/about": () => import("@/pages/About"),
  "/services": () => import("@/pages/Services"),
  "/services/interior-finishing": () => import("@/pages/InteriorFinishing"),
  "/services/exterior-finishing": () => import("@/pages/ExteriorFinishing"),
  "/services/decking": () => import("@/pages/Decking"),
  "/work": () => import("@/pages/Work"),
  "/service-areas": () => import("@/pages/ServiceAreas"),
  "/service-areas/bragg-creek": () => import("@/pages/areas/BraggCreek"),
  "/service-areas/rocky-view-county": () => import("@/pages/areas/RockyView"),
  "/service-areas/bearspaw": () => import("@/pages/areas/Bearspaw"),
  "/service-areas/water-valley": () => import("@/pages/areas/WaterValley"),
  "/contact": () => import("@/pages/Contact"),
};

/** Fire-and-forget prefetch by route path. Safe to call repeatedly. */
export const prefetchRoute = (to: string): void => {
  const importer = routeImporters[to];
  if (importer) void importer();
};

/** Connection-aware prefetch gate (Save-Data + 2g). */
export const shouldPrefetch = (): boolean => {
  type NetInfo = { saveData?: boolean; effectiveType?: string };
  const nav = navigator as Navigator & { connection?: NetInfo };
  const c = nav.connection;
  if (!c) return true;
  if (c.saveData) return false;
  if (c.effectiveType === "slow-2g" || c.effectiveType === "2g") return false;
  return true;
};
