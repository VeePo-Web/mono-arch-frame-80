import { useLocation } from "react-router-dom";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";

/**
 * QuickContactFab — mobile-only floating action button.
 *
 * Persistently visible on /work, /services, /about, /service-areas, and
 * /service-areas/* — pages where the StickyConsultBar isn't already
 * carrying the load (the home page) and where the visitor isn't already
 * in a contact context (/contact, /thank-you).
 *
 * Tap raises the QuickContactSheet via a global event.
 */
const FAB_ROUTES = new Set([
  "/work",
  "/services",
  "/about",
  "/service-areas",
  "/services/interior-finishing",
  "/services/exterior-finishing",
  "/services/decking",
]);

const QuickContactFab = () => {
  const { pathname } = useLocation();
  const isAreaSubpage = pathname.startsWith("/service-areas/");
  const visible = FAB_ROUTES.has(pathname) || isAreaSubpage;
  if (!visible) return null;

  // Determine source for analytics attribution.
  const source = (() => {
    if (pathname === "/work") return "quick_contact_sheet";
    if (pathname === "/services" || pathname.startsWith("/services/")) return "quick_contact_sheet";
    if (pathname === "/about") return "quick_contact_sheet";
    if (isAreaSubpage || pathname === "/service-areas") return "quick_contact_sheet";
    return "quick_contact_sheet";
  })();

  return (
    <button
      type="button"
      onClick={() => openQuickContact({ source })}
      aria-label="Open quick contact"
      className={cn(
        // Mobile-only — desktop has plenty of CTAs already.
        "lg:hidden",
        "fixed z-40 right-4 inline-flex items-center justify-center h-14 w-14 rounded-full",
        "bg-evergreen text-evergreen-foreground",
        "shadow-[0_8px_24px_-8px_hsl(145_24%_8%/0.45),inset_0_1px_0_hsl(145_22%_38%/0.5)]",
        "active:scale-[0.95] hover:bg-evergreen-hover",
        "transition-transform duration-200 ease-swift",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      style={{
        // Sit above the iOS home indicator and never collide with the
        // sticky bar (which is suppressed on these routes — the sticky bar
        // only shows on / and on long content pages once past the hero).
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
      }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
};

export default QuickContactFab;
