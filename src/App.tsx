import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PageSlug from "./components/PageSlug";
import RoutePrefetcher from "./components/RoutePrefetcher";

// Eager: home (LCP-critical) + 404 (tiny, instant fallback)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy routes — split into separate JS chunks, fetched on demand
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const InteriorFinishing = lazy(() => import("./pages/InteriorFinishing"));
const ExteriorFinishing = lazy(() => import("./pages/ExteriorFinishing"));
const Decking = lazy(() => import("./pages/Decking"));
const Work = lazy(() => import("./pages/Work"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const BraggCreek = lazy(() => import("./pages/areas/BraggCreek"));
const RockyView = lazy(() => import("./pages/areas/RockyView"));
const Bearspaw = lazy(() => import("./pages/areas/Bearspaw"));
const WaterValley = lazy(() => import("./pages/areas/WaterValley"));
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
  // useLayoutEffect: scroll happens before paint — no flash of previous-route scroll position
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Mount toasters + the QuickContactSheet only after first paint to keep them
// out of the eager bundle. They're all interaction-only surfaces.
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

// Minimal, bg-matching fallback — invisible during fast chunk loads, no layout shift
const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RoutePrefetcher />
        <PageSlug />
        <Navigation />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/interior-finishing" element={<InteriorFinishing />} />
            <Route path="/services/exterior-finishing" element={<ExteriorFinishing />} />
            <Route path="/services/decking" element={<Decking />} />
            <Route path="/work" element={<Work />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/service-areas/bragg-creek" element={<BraggCreek />} />
            <Route path="/service-areas/rocky-view-county" element={<RockyView />} />
            <Route path="/service-areas/bearspaw" element={<Bearspaw />} />
            <Route path="/service-areas/water-valley" element={<WaterValley />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <DeferredOverlays />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
