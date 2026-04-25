import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import InteriorFinishing from "./pages/InteriorFinishing";
import ExteriorFinishing from "./pages/ExteriorFinishing";
import Decking from "./pages/Decking";
import Work from "./pages/Work";
import ServiceAreas from "./pages/ServiceAreas";
import BraggCreek from "./pages/areas/BraggCreek";
import RockyView from "./pages/areas/RockyView";
import Bearspaw from "./pages/areas/Bearspaw";
import WaterValley from "./pages/areas/WaterValley";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
