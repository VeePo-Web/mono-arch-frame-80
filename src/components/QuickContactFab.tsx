import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";

/**
 * QuickContactFab — mobile-only floating action button.
 *
 * Persistently visible on /work, /services, /about, /service-areas, and
 * /service-areas/* — pages where the StickyConsultBar isn't already
 * carrying the load and where the visitor isn't already in a contact
 * context (/contact, /thank-you).
 *
 * Tap raises the QuickContactSheet via a global event.
 *
 * UX details:
 *  - 4-second-cycle subtle "breathing" pulse on first viewport entry
 *    (3 cycles, then quiets — controlled via CSS animation count).
 *  - First-tap-of-session label flash: briefly expands to a pill showing
 *    "Start a conversation" for 2.5s, then collapses back to a circle.
 *  - Honors prefers-reduced-motion.
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

const FLASH_KEY = "hc:fab:flashed";

const QuickContactFab = () => {
  const { pathname } = useLocation();
  const isAreaSubpage = pathname.startsWith("/service-areas/");
  const visible = FAB_ROUTES.has(pathname) || isAreaSubpage;
  const [flashed, setFlashed] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  // First-view label flash (session-gated)
  useEffect(() => {
    if (!visible) return;
    if (typeof window === "undefined") return;
    let alreadyFlashed = false;
    try {
      alreadyFlashed = sessionStorage.getItem(FLASH_KEY) === "1";
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
    if (alreadyFlashed) return;

    // Wait for the FAB to enter the viewport (which, since it's fixed, is
    // immediate on route mount — but we still defer one frame so the
    // animation isn't cancelled by the route transition).
    const id = window.setTimeout(() => {
      setFlashed(true);
      setBreathe(true);
      try {
        sessionStorage.setItem(FLASH_KEY, "1");
      } catch {
        /* non-fatal */
      }
      // Collapse back to a circle after 2.5s.
      window.setTimeout(() => setFlashed(false), 2500);
    }, 600);
    return () => window.clearTimeout(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        setBreathe(false);
        openQuickContact({ source: "quick_contact_sheet" });
      }}
      aria-label="Start a conversation"
      data-flashed={flashed ? "true" : "false"}
      data-breathe={breathe ? "true" : "false"}
      className={cn(
        "lg:hidden",
        "qc-fab",
        "fixed z-40 right-4 inline-flex items-center gap-2 rounded-full",
        "bg-evergreen text-evergreen-foreground",
        "shadow-[0_8px_24px_-8px_hsl(145_24%_8%/0.45),inset_0_1px_0_hsl(145_22%_38%/0.5)]",
        "active:scale-[0.95] hover:bg-evergreen-hover",
        "transition-[width,padding,background-color] duration-500 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Width + padding swap based on flashed state
        flashed
          ? "h-14 pl-5 pr-5 justify-start"
          : "h-14 w-14 px-0 justify-center",
      )}
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
      }}
    >
      <MessageCircle className="h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden="true" />
      {flashed && (
        <span className="text-[0.85rem] font-medium whitespace-nowrap qc-fab-label">
          Start a conversation
        </span>
      )}
    </button>
  );
};

export default QuickContactFab;
