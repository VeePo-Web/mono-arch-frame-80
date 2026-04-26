import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo/haven-creek-horizontal.webp";
import logoMark from "@/assets/logo/haven-creek-mark.webp";

const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// Three service shortcuts surfaced in the mobile sheet so mid-funnel
// visitors can skip the Services index page.
const SERVICE_SHORTCUTS = [
  { label: "Interior finishing", to: "/services/interior-finishing" },
  { label: "Exterior repairs", to: "/services/exterior-finishing" },
  { label: "Decking", to: "/services/decking" },
];

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

/**
 * Navigation — Floating Glass Island.
 * Detached from the top, rounded-full, soft plaster glass with a hairline ring.
 * On scroll past 80px the island visibly densifies (background, ring, shadow).
 * Active route = 14px hairline that draws in via scaleX (matches dossier rules).
 * Mobile menu uses the Sheet primitive (Radix dialog) for proper a11y.
 */
const Navigation = () => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // IntersectionObserver on a 1px sentinel — no scroll handler at all.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-evergreen focus:text-evergreen-foreground focus:rounded-full focus:text-minimal"
      >
        Skip to content
      </a>

      {/* Sentinel: when this scrolls out of view, the island contracts. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 left-0 h-px w-px" />

      <header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center pointer-events-none",
          "transition-[padding] duration-700 ease-weighted",
          scrolled ? "pt-3" : "pt-5",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "nav-island pointer-events-auto",
            "relative flex items-center gap-1.5",
            "backdrop-blur-xl",
            "rounded-full",
            "transition-all duration-700 ease-weighted",
            // Scroll-state contrast: the pill visibly firms up.
            scrolled
              ? [
                  "bg-background/85",
                  "ring-1 ring-foreground/[0.10]",
                  "shadow-[0_1px_0_hsl(36_25%_99%/0.6)_inset,0_14px_32px_-16px_hsl(20_8%_14%/0.22),0_6px_18px_-10px_hsl(20_8%_14%/0.12)]",
                  "p-1.5 max-w-[min(94vw,940px)]",
                ]
              : [
                  "bg-background/55",
                  "ring-1 ring-foreground/[0.06]",
                  "shadow-[0_1px_0_hsl(36_25%_99%/0.4)_inset,0_18px_44px_-20px_hsl(20_8%_14%/0.16),0_8px_24px_-14px_hsl(20_8%_14%/0.08)]",
                  "p-2 max-w-[min(96vw,1040px)]",
                ],
          )}
        >
          {/* Brand chip — left. Crossfade between full logo (rest) and mark (scrolled). */}
          <Link
            to="/"
            aria-label="Haven Creek Renovations — home"
            className={cn(
              "relative z-10 flex items-center rounded-full",
              "transition-all duration-700 ease-weighted",
              scrolled ? "px-2.5 py-1.5" : "px-3 py-2",
            )}
          >
            {/* Fixed-height stage so the swap doesn't jolt the layout. */}
            <span className="relative inline-flex items-center justify-start h-7" style={{ width: scrolled ? 28 : 160, transition: "width 700ms var(--ease-weighted)" }}>
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="nav-mark absolute inset-y-0 left-0 h-6 w-auto my-auto"
                data-state={scrolled ? "hidden" : "visible"}
                fetchPriority="high"
                decoding="async"
              />
              <img
                src={logoMark}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="nav-mark absolute inset-y-0 left-0 h-7 w-7 my-auto"
                data-state={scrolled ? "visible" : "hidden"}
                decoding="async"
              />
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex relative z-10 items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex items-center px-3.5 py-2 rounded-full",
                      "text-minimal transition-all duration-500 ease-swift",
                      "hover:bg-foreground/[0.04]",
                      isActive
                        ? "text-evergreen"
                        : "text-foreground/75 hover:text-foreground",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {/* Editorial hairline — draws in via scaleX. */}
                      <span
                        aria-hidden="true"
                        className="nav-active-rule"
                        style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right CTA — Button-in-Button pill */}
          <Link
            to="/contact"
            className={cn(
              "relative z-10 group/btn ml-auto md:ml-1",
              "inline-flex items-center gap-2.5 rounded-full",
              "bg-evergreen text-evergreen-foreground",
              "pl-5 pr-1.5 py-1.5",
              "text-minimal min-h-[40px]",
              "transition-all duration-500 ease-swift",
              "hover:bg-evergreen-hover active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <span>Consultation</span>
            <span className="icon-chip icon-chip-light bg-background/15">
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
            </span>
          </Link>

          {/* Mobile hamburger — opens the Sheet */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden relative z-10 inline-flex items-center justify-center h-11 w-11 rounded-full hover:bg-foreground/[0.04] transition-colors"
          >
            <span className="relative block h-3 w-4">
              <span className="absolute left-0 right-0 top-0 h-px bg-foreground" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-foreground" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile menu — Radix Sheet (focus trap, Escape, scroll lock, return-focus). */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          id="mobile-menu"
          className={cn(
            "md:hidden",
            "w-full sm:max-w-md",
            "bg-background/92 backdrop-blur-2xl",
            "border-l border-border/60",
            "p-0",
            // Honour iOS safe-area insets (notched landscape, home indicator).
            "[--sheet-pt:max(1.25rem,calc(var(--safe-top)+0.75rem))]",
            "[--sheet-pb:max(2rem,calc(var(--safe-bottom)+1rem))]",
            "[--sheet-pr:max(1.5rem,var(--safe-right))]",
          )}
        >
          {/* Accessible label (visually hidden) */}
          <SheetTitle className="sr-only">Site menu</SheetTitle>

          {/* Plaster-grain veil — keeps the menu surface true to the rest of the site */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          <div
            className="relative h-full flex flex-col overflow-y-auto"
            style={{
              paddingTop: "var(--sheet-pt)",
              paddingBottom: "var(--sheet-pb)",
              paddingLeft: "1.5rem",
              paddingRight: "var(--sheet-pr)",
            }}
          >
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Haven Creek — home">
                <img src={logo} alt="" width={160} height={28} className="h-6 w-auto" loading="lazy" decoding="async" />
              </Link>
              {/* Sheet's built-in close button is positioned absolute top-right by default;
                  we hide our own to avoid duplicates. */}
            </div>

            {/* Dossier-strip rule — echoes sub-page heroes */}
            <div className="mt-10 dossier-strip" aria-hidden="true">
              <span className="dossier-strip__rule" />
              <span className="dossier-strip__inner">
                <span className="dossier-strip__no">Menu</span>
                <span className="dossier-strip__dot">·</span>
                <span>Edition I</span>
              </span>
              <span className="dossier-strip__rule" />
            </div>

            {/* Primary nav — numbered serial in front of each italic label.
                Per-row min-height = 56px so every tap target sits well above
                the 48px Apple/Google guideline. */}
            <ul className="mt-5 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.to} className="overflow-hidden">
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-baseline gap-4 py-3 px-1 -mx-1 rounded-sm",
                        "text-[1.65rem] font-serif italic font-light leading-tight min-h-[56px]",
                        "reveal-up",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        isActive ? "text-evergreen" : "text-foreground hover:text-evergreen",
                      )
                    }
                    style={{ animationDelay: `${80 + i * 70}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 w-7 text-[0.7rem] tracking-[0.18em] tabular-nums not-italic font-sans font-medium pt-2",
                        "text-evergreen/55",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Service shortcuts — quiet sub-list so mid-funnel visitors can
                jump straight to a service detail page. */}
            <div className="mt-7 pt-5 border-t border-border/60">
              <p className="text-minimal text-evergreen/75 mb-3">Services</p>
              <ul className="space-y-0.5">
                {SERVICE_SHORTCUTS.map((s) => (
                  <li key={s.to}>
                    <NavLink
                      to={s.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center min-h-[44px] py-1.5 text-body text-[0.97rem] rounded-sm px-1 -mx-1",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          isActive ? "text-evergreen" : "text-foreground/80 hover:text-evergreen",
                        )
                      }
                    >
                      {s.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick-actions — tap-to-call + tap-to-email. Sized at 48×48
                with 12px gap so thumbs reach without misclick. */}
            <div className="mt-7 pt-5 border-t border-border/60">
              <p className="text-minimal text-evergreen/75 mb-3">Reach us directly</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${STUDIO_PHONE_TEL}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group/btn flex items-center gap-3 min-h-[52px] px-4 rounded-full",
                    "bg-evergreen/[0.06] text-foreground border border-evergreen/15",
                    "hover:bg-evergreen/[0.10] transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                  aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                >
                  <Phone className="h-4 w-4 text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-minimal">Call</span>
                </a>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group/btn flex items-center gap-3 min-h-[52px] px-4 rounded-full",
                    "bg-evergreen/[0.06] text-foreground border border-evergreen/15",
                    "hover:bg-evergreen/[0.10] transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                  aria-label={`Email ${STUDIO_EMAIL}`}
                >
                  <Mail className="h-4 w-4 text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-minimal">Email</span>
                </a>
              </div>
            </div>

            {/* Bottom-pinned consultation pill — full-bleed on the smallest phones */}
            <div className="mt-auto pt-8 border-t border-border/60">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={cn(
                  "group/btn flex items-center justify-between gap-3 w-full",
                  "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-minimal min-h-[52px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span>Request a Consultation</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
                </span>
              </Link>
              <p className="mt-3 text-minimal text-muted-foreground">
                No pressure. Just a clear conversation.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;
