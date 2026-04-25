/**
 * Web Vitals reporter.
 *
 * Lazy-loaded from main.tsx inside requestIdleCallback so this file never
 * touches the LCP-critical path. ~1.5 kB gz.
 *
 * Behavior:
 *   - dev: console.info each metric so you can watch them while iterating
 *   - prod: navigator.sendBeacon to VITE_VITALS_ENDPOINT IF set, else no-op
 *
 * The endpoint is intentionally not wired to a backend yet — flipping on
 * collection is a one-env-var change the day a RUM table is added.
 */
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

const endpoint = import.meta.env.VITE_VITALS_ENDPOINT as string | undefined;
const isDev = import.meta.env.DEV;

function send(metric: Metric) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.info(`[web-vitals] ${metric.name}`, {
      value: Math.round(metric.value * 100) / 100,
      rating: metric.rating,
      id: metric.id,
    });
  }
  if (!endpoint) return;
  try {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
      path: window.location.pathname,
      ts: Date.now(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      // Fallback for older browsers — keepalive so it survives unload.
      void fetch(endpoint, { method: "POST", body, keepalive: true });
    }
  } catch {
    // Telemetry must never throw into the app.
  }
}

export function report() {
  onCLS(send);
  onFCP(send);
  onINP(send);
  onLCP(send);
  onTTFB(send);
}
