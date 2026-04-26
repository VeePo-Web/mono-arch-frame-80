import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";

/**
 * StickyConsultBar — quiet, persistent consultation handle.
 *
 * Behaviour:
 *  - Hidden by default. Reveals once the visitor has scrolled ~85vh past
 *    the top (sentinel placed below the hero region).
 *  - Hides automatically once the final-CTA section enters the viewport
 *    (so the inline form is the only invitation in that frame).
 *  - Hidden entirely on /contact and /thank-you (we're already there).
 *  - Dismissible — choice is remembered for the session via sessionStorage,
 *    so it doesn't nag, and resets next visit.
 *  - Honors prefers-reduced-motion (no slide animation).
 *
 * Implementation note: two IntersectionObservers, no scroll handler.
 * The bar mounts at the route layer (App.tsx), so it persists across
 * scrolls but doesn't carry state between routes.
 */
const STORAGE_KEY = "hc:cta-bar:dismissed";

const StickyConsultBar = () => {
  const { pathname } = useLocation();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [pastHero, setPastHero] = useState(false);
  const [atFinalCta, setAtFinalCta] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Routes where the bar is never useful
  const suppressed = pathname === "/contact" || pathname === "/thank-you";

  // Restore the session-scoped dismiss state on mount + route change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    // Reset the "at final CTA" gate on route change
    setAtFinalCta(false);
  }, [pathname]);

  // Watch the sentinel — once it leaves the top (we've scrolled past it),
  // the bar becomes eligible to show.
  useEffect(() => {
    if (suppressed) return;
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [suppressed, pathname]);

  // Watch for the final-CTA section. Re-runs on route change so it picks
  // up the new home page mount of #final-cta.
  useEffect(() => {
    if (suppressed) return;
    let obs: IntersectionObserver | null = null;
    // Defer one frame so the new route's DOM is in place
    const id = requestAnimationFrame(() => {
      const target = document.getElementById("final-cta");
      if (!target) return;
      obs = new IntersectionObserver(
        ([entry]) => setAtFinalCta(entry.isIntersecting),
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
      );
      obs.observe(target);
    });
    return () => {
      cancelAnimationFrame(id);
      obs?.disconnect();
    };
  }, [suppressed, pathname]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* sessionStorage unavailable — non-fatal */
    }
  };

  if (suppressed) return null;

  const show = pastHero && !atFinalCta && !dismissed;

  // Toggle a body data-attribute so layout can leave room for the bar
  // (e.g. the footer copyright row otherwise sits behind it on phones).
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.stickyBar = show ? "shown" : "hidden";
    return () => {
      document.body.dataset.stickyBar = "hidden";
    };
  }, [show]);

  return (
    <>
      {/* Sentinel — placed at ~85vh from the top of the document.
          Once it scrolls out, the bar becomes eligible. */}
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="absolute left-0 w-px h-px pointer-events-none"
        style={{ top: "85vh" }}
      />

      <aside
        role="complementary"
        aria-label="Contact shortcut"
        aria-hidden={!show}
        data-show={show ? "true" : "false"}
        className={cn(
          "sticky-cta-bar",
          // Don't intercept clicks while hidden
          show ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        {/* Lead label — desktop / tablet only. On phones the consultation pill
            takes the full width so the tap target is unmistakable. */}
        <p className="hidden sm:block text-minimal text-foreground/70 pl-1">
          Ready when you are.
        </p>

        <div className="flex flex-1 sm:flex-initial sm:ml-auto items-center gap-2">
          <Link
            to="/contact"
            onClick={handleDismiss}
            className={cn(
              "group/btn flex sm:inline-flex flex-1 sm:flex-initial items-center justify-between sm:justify-start gap-2.5 rounded-full",
              "bg-evergreen text-evergreen-foreground",
              "pl-6 pr-1.5 py-1.5 text-minimal",
              // 48px min on phones (Apple/Google guideline), 40px on tablet+ to stay quiet.
              "min-h-[48px] sm:min-h-[40px]",
              "transition-colors duration-300",
              "hover:bg-evergreen-hover focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <span>Request a Consultation</span>
            <span className="icon-chip icon-chip-light bg-background/15">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss consultation shortcut"
            className={cn(
              // 44×44 on phones; tighter on tablet+.
              "inline-flex items-center justify-center h-11 w-11 sm:h-9 sm:w-9 rounded-full shrink-0",
              "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.05]",
              "transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default StickyConsultBar;
