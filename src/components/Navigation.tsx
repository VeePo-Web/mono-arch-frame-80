import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo/haven-creek-horizontal.webp";
import Container from "./Container";

const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/**
 * Navigation — paper-thin masthead.
 * Per 2.3: quiet, calm, restraint-first. The CTA solidifies on scroll.
 */
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Skip to content for keyboard / screen readers */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-evergreen focus:text-evergreen-foreground focus:rounded-md focus:text-minimal"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-smooth",
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <Container size="wide">
          <nav
            aria-label="Primary"
            className={cn(
              "flex items-center justify-between transition-[height] duration-300",
              scrolled ? "h-16" : "h-20",
            )}
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="Haven Creek Renovations — home"
              className="flex items-center group"
            >
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={180}
                height={28}
                className="h-7 w-auto"
                fetchPriority="high"
                decoding="async"
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "relative text-minimal text-foreground/75 hover:text-evergreen transition-colors duration-300",
                        "after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-px after:bg-evergreen",
                        "after:transition-all after:duration-300 after:ease-smooth",
                        isActive ? "text-evergreen after:w-full" : "after:w-0 hover:after:w-full",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right CTA */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className={cn(
                  "inline-flex items-center gap-2 text-minimal min-h-[40px] transition-all duration-300 ease-smooth",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  scrolled
                    ? "bg-evergreen text-evergreen-foreground px-5 py-2.5 rounded-md hover:bg-evergreen-hover hover:-translate-y-px"
                    : "text-foreground/80 hover:text-evergreen px-2 py-2",
                )}
              >
                <span>Request a Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-foreground hover:text-evergreen transition-colors"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile sheet — full-screen editorial menu */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] bg-background animate-in fade-in duration-200 md:hidden"
        >
          <Container size="wide">
            <div className="flex items-center justify-between h-20">
              <img src={logo} alt="" width={180} height={28} className="h-7 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center h-11 w-11 -mr-2 text-foreground hover:text-evergreen transition-colors"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </Container>

          <Container size="wide">
            <ul className="mt-12 space-y-7">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.to}
                  className="reveal-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "block text-headline font-serif italic font-light leading-tight",
                        "transition-colors duration-300",
                        isActive ? "text-evergreen" : "text-foreground hover:text-evergreen",
                      )
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-16 pt-8 border-t border-border">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 text-minimal min-h-[44px] bg-evergreen text-evergreen-foreground px-7 py-3.5 rounded-md hover:bg-evergreen-hover transition-colors"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <p className="mt-4 text-minimal text-muted-foreground">
                No pressure. Just a clear conversation.
              </p>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Navigation;
