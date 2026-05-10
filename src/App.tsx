import { lazy, Suspense, startTransition, useEffect, useLayoutEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RoutePrefetcher from "./components/RoutePrefetcher";

// Eager: home (LCP-critical) + 404 (tiny, instant fallback)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy routes — split into separate JS chunks, fetched on demand
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

// QuickContactSheet only renders after a user interaction (custom event fired
// by the drawer / mobile triggers). Defer it past the LCP-critical bundle.
const QuickContactSheet = lazy(() => import("./components/QuickContactSheet"));

// Toaster + Sonner only render output after a user interaction.
// Defer them so they don't ship in the eager LCP-critical bundle.
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function DeferredOverlays() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const idle = (cb: () => void) => {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb);
      else setTimeout(cb, 200);
    };
    idle(() => setReady(true));
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <QuickContactSheet />
      <Toaster />
      <Sonner />
    </Suspense>
  );
}

/**
 * AnimatedRoutes — keeps the previous route painted while the next chunk
 * loads, eliminating the Suspense blank-flash on warm clicks. React Router
 * doesn't auto-wrap navigations in startTransition, so we defer the
 * location update ourselves.
 */
function AnimatedRoutes() {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(location);
  useEffect(() => {
    if (location === displayed) return;
    startTransition(() => setDisplayed(location));
  }, [location, displayed]);
  return (
    <Routes location={displayed}>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/work" element={<Work />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/thank-you" element={<ThankYou />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RoutePrefetcher />
        <Navigation />
        <Suspense fallback={null}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
        <DeferredOverlays />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
