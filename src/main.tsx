import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Self-hosted fonts — replaces Google Fonts. Each .css ships only the woff2
// for that subset/weight; the browser downloads only what it actually paints
// thanks to per-block unicode-range declarations.
//
// Fraunces is a variable font: a single woff2 covers all weights (100-900)
// for upright and italic respectively. Two files total.
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
// Inter — only the three weights actually used in the codebase, latin-only subset.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Web Vitals — loaded after first paint via requestIdleCallback so it never
// touches LCP. No-op in prod unless VITE_VITALS_ENDPOINT is configured.
if (typeof window !== "undefined") {
  type IdleWindow = Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  const w = window as IdleWindow;
  const idle = (cb: () => void) =>
    w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 3000 }) : setTimeout(cb, 1500);
  idle(() => {
    void import("./lib/vitals").then((m) => m.report());
  });
}
