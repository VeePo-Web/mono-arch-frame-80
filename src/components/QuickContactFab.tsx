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
 * UX details (Round 4):
 *  - Calmer breathing: 2 cycles, lower-amplitude ring (was 3 cycles).
 *  - Session-gated label flash: briefly expands to a pill showing
 *    "Start a conversation" for 2.5s on first viewport entry.
 *  - Long-idle re-flash: if the visitor is on a FAB-eligible page for
 *    >45s and has scrolled >50% of the page without engaging, we surface
 *    the label one more time (capped per session via `hc:fab:flashed-late`).
 *  - 60×60 thumb target (up from 56) for clearer hit area on 360px phones.
 *  - Z-index lowered to 30 so the StickyConsultBar always wins; offsets
 *    upward when `body[data-sticky-bar="shown"]` is set so the two pills
 *    never overlap.
 *  - Honors prefers-reduced-motion (no breathing, no late flash).
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
const LATE_FLASH_KEY = "hc:fab:flashed-late";

const QuickContactFab = () => {
  const { pathname } = useLocation();
  const isAreaSubpage = pathname.startsWith("/service-areas/");
  const visible = FAB_ROUTES.has(pathname) || isAreaSubpage;
  const [flashed, setFlashed] = useState(false);
  const [breathe, setBreathe] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const interactedRef = useRef(false);

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

    const id = window.setTimeout(() => {
      setFlashed(true);
      setBreathe(true);
      try {
        sessionStorage.setItem(FLASH_KEY, "1");
      } catch {
        /* non-fatal */
      }
      window.setTimeout(() => setFlashed(false), 2500);
    }, 600);
    return () => window.clearTimeout(id);
  }, [visible]);

  // Long-idle re-flash — once per session, only after meaningful presence.
  useEffect(() => {
    if (!visible) return;
    if (typeof window === "undefined") return;

    let alreadyLate = false;
    try {
      alreadyLate = sessionStorage.getItem(LATE_FLASH_KEY) === "1";
    } catch {
      /* non-fatal */
    }
    if (alreadyLate) return;

    // Respect reduced-motion users — they don't want re-flashes either.
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let scrolledHalf = false;
    const checkScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= 0.5) scrolledHalf = true;
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    const timer = window.setTimeout(() => {
      if (interactedRef.current) return;
      if (!scrolledHalf) return;
      setFlashed(true);
      try {
        sessionStorage.setItem(LATE_FLASH_KEY, "1");
      } catch {
        /* non-fatal */
      }
      window.setTimeout(() => setFlashed(false), 2500);
    }, 45000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", checkScroll);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        interactedRef.current = true;
        setBreathe(false);
        openQuickContact({ source: "quick_contact_sheet" });
      }}
      aria-label="Start a conversation"
      data-flashed={flashed ? "true" : "false"}
      data-breathe={breathe ? "true" : "false"}
      className={cn(
        "lg:hidden",
        "qc-fab",
        "fixed z-30 right-4 inline-flex items-center gap-2 rounded-full",
        "bg-evergreen text-evergreen-foreground",
        "shadow-[0_8px_24px_-8px_hsl(145_24%_8%/0.45),inset_0_1px_0_hsl(145_22%_38%/0.5)]",
        "active:scale-[0.95] hover:bg-evergreen-hover",
        "transition-[width,padding,background-color,bottom] duration-500 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Width + padding swap based on flashed state. 60×60 base for thumb-target.
        flashed
          ? "h-15 pl-5 pr-5 justify-start"
          : "h-15 w-15 px-0 justify-center",
      )}
      style={{
        // Sit clear of safe-area + StickyConsultBar (which publishes
        // body[data-sticky-bar="shown"] and reserves ~64px of bottom space).
        bottom:
          "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem + var(--qc-fab-extra-bottom, 0px)))",
        height: "60px",
        width: flashed ? undefined : "60px",
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
