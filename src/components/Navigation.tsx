import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo/haven-creek-horizontal.webp";
import logoMark from "@/assets/logo/haven-creek-mark.webp";

const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/**
 * Navigation — Floating Glass Island.
 * Detached from the top, rounded-full, soft plaster glass with a hairline ring.
 * On scroll past 80px the island contracts (no background swap, no jank).
 * Link hover = chip background fade. Active route = 4px evergreen dot.
 * CTA uses the Button-in-Button trailing icon pattern.
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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
            "pointer-events-auto",
            "relative flex items-center gap-1.5",
            "bg-background/72 backdrop-blur-xl",
            "rounded-full",
            "ring-1 ring-foreground/[0.08]",
            "shadow-[0_1px_0_hsl(36_25%_99%/0.5)_inset,0_18px_40px_-18px_hsl(20_8%_14%/0.18),0_8px_24px_-12px_hsl(20_8%_14%/0.10)]",
            "transition-all duration-700 ease-weighted",
            scrolled ? "p-1.5 max-w-[min(94vw,940px)]" : "p-2 max-w-[min(96vw,1040px)]",
          )}
        >
          {/* Inset top highlight via pseudo — uses index.css? Inline gradient instead for surgical control. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, hsl(36 25% 99% / 0.5) 0%, hsl(36 25% 99% / 0) 40%)",
            }}
          />

          {/* Brand chip — left, with meridian dot when scrolled */}
          <Link
            to="/"
            aria-label="Haven Creek Renovations — home"
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-full",
              "transition-all duration-700 ease-weighted",
              scrolled ? "px-2.5 py-1.5" : "px-3 py-2",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-[5px] w-[5px] rounded-full bg-evergreen",
                "transition-all duration-700 ease-weighted",
                scrolled ? "opacity-100 scale-100" : "opacity-0 scale-50 -ml-2",
              )}
            />
            <img
              src={scrolled ? logoMark : logo}
              alt="Haven Creek Renovations"
              width={scrolled ? 28 : 160}
              height={28}
              className={cn(
                "transition-all duration-700 ease-weighted",
                scrolled ? "h-7 w-7" : "h-6 w-auto",
              )}
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          {/* Hairline divider */}
          <span
            aria-hidden="true"
            className="hidden md:block relative z-10 h-5 w-px bg-foreground/10 mx-1"
          />

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
                      {/* Active dot — draws in via scaleX */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-1/2 -bottom-px h-[3px] w-[3px] rounded-full bg-evergreen",
                          "transition-transform duration-500 ease-swift",
                          isActive ? "scale-100" : "scale-0",
                        )}
                        style={{ transformOrigin: "center" }}
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
            <span className="hidden sm:inline">
              {scrolled ? "Consultation" : "Request a Consultation"}
            </span>
            <span className="sm:hidden">Consultation</span>
            <span className="icon-chip icon-chip-light bg-background/15">
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
            </span>
          </Link>

          {/* Mobile hamburger — two-line morph */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden relative z-10 inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-foreground/[0.04] transition-colors"
          >
            <span className="relative block h-3 w-4">
              <span className="absolute left-0 right-0 top-0 h-px bg-foreground" />
              <span className="absolute left-0 right-0 bottom-0 h-px bg-foreground" />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile glass overlay */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] md:hidden bg-background/85 backdrop-blur-2xl animate-in fade-in duration-300"
        >
          {/* Plaster-grain veil sits on top of body grain — feels physical */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply"
               style={{
                 backgroundImage:
                   "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
               }}
          />

          <div className="relative h-full flex flex-col px-6 pt-5 pb-10">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)} aria-label="Haven Creek — home">
                <img src={logo} alt="" width={160} height={28} className="h-6 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-foreground/[0.05] transition-colors"
              >
                <span className="relative block h-3 w-3">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-foreground rotate-45" />
                  <span className="absolute inset-x-0 top-1/2 h-px bg-foreground -rotate-45" />
                </span>
              </button>
            </div>

            <ul className="mt-16 space-y-2">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.to}
                  className="overflow-hidden"
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block py-3 text-headline font-serif italic font-light leading-tight",
                        "reveal-up",
                        isActive ? "text-evergreen" : "text-foreground hover:text-evergreen",
                      )
                    }
                    style={{ animationDelay: `${80 + i * 70}ms` }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10 border-t border-border/60">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group/btn inline-flex items-center gap-3 bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-minimal min-h-[48px]"
              >
                <span>Request a Consultation</span>
                <span className="icon-chip icon-chip-light bg-background/15">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
                </span>
              </Link>
              <p className="mt-4 text-minimal text-muted-foreground">
                No pressure. Just a clear conversation.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
