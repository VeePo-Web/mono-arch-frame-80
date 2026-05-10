/**
 * routePrefetch — warm a lazy route chunk before the user clicks.
 *
 * Wired onto every nav <Link> via onPointerDown / onFocus so that by the
 * time React Router commits the navigation the chunk is already in the
 * browser cache (or in-flight) — eliminating the Suspense fallback flash.
 *
 * Each loader mirrors the lazy(() => import(…)) call sites in App.tsx.
 * Vite dedupes the dynamic import, but we also keep a Set so repeat
 * pointer events don't fire extra microtasks.
 */

const loaders: Record<string, () => Promise<unknown>> = {
  "/about":     () => import("@/pages/About"),
  "/services":  () => import("@/pages/Services"),
  "/work":      () => import("@/pages/Work"),
  "/contact":   () => import("@/pages/Contact"),
  "/thank-you": () => import("@/pages/ThankYou"),
  // "/" is eagerly imported in App.tsx — no-op.
};

const warmed = new Set<string>();

export function prefetchRoute(path: string): void {
  if (warmed.has(path)) return;
  const loader = loaders[path];
  if (!loader) return;
  warmed.add(path);
  loader().catch(() => {
    // Network error — let the real navigation surface it.
    warmed.delete(path);
  });
}

export const PREFETCHABLE_ROUTES = Object.keys(loaders);
