import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRIMARY = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Selected Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const SERVICES = [
  { label: "Interior Finishing", to: "/services/interior-finishing" },
  { label: "Exterior Repairs", to: "/services/exterior-finishing" },
  { label: "Decking", to: "/services/decking" },
  { label: "All Services", to: "/services", muted: true },
];

const AREAS = [
  { label: "Bragg Creek", to: "/service-areas/bragg-creek" },
  { label: "Rocky View County", to: "/service-areas/rocky-view-county" },
  { label: "Bearspaw", to: "/service-areas/bearspaw" },
  { label: "Water Valley", to: "/service-areas/water-valley" },
  { label: "All Areas", to: "/service-areas", muted: true },
];

const COMPANY = [
  { label: "About Haven Creek", to: "/about" },
  { label: "Selected Work", to: "/work" },
  { label: "Service Areas", to: "/service-areas" },
];

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

/**
 * MenuDrawer — Round 3 "phone-book" cleanup.
 *
 * Top: close button.
 * Body:
 *   1. Horizontal primary row: Home · About · Selected Work · Contact
 *   2. Three same-shape link columns: Services · Service Areas · Company
 * Bottom rail: trust line + phone + email + "Get a Free Quote" CTA.
 *
 * Removed: dossier strip ("Edition I"), italic display Home, scroll mask.
 * Larger 18px link rows + 52px tap targets — built for finger taps and
 * older eyes, not portfolio screenshots.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  // Close on route change
  useEffect(() => {
    if (open) onOpenChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleQuote = () => {
    onOpenChange(false);
    if (isMobile) {
      // Defer so the close animation doesn't fight the sheet enter
      setTimeout(() => openQuickContact({ source: "quick_contact_sheet" }), 220);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-drawer__overlay fixed inset-0 z-[90]" />
        <Dialog.Content
          id="site-map-drawer"
          aria-describedby={undefined}
          className={cn(
            "menu-drawer fixed inset-0 z-[91] flex flex-col",
            "bg-background/97 backdrop-blur-2xl",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>

          {/* Plaster-grain veil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* Close button */}
          <div
            className="relative z-10 flex items-center justify-end px-6 md:px-10 lg:px-16"
            style={{
              paddingTop: "max(1.25rem, calc(env(safe-area-inset-top) + 0.75rem))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            <Dialog.Close
              className={cn(
                "inline-flex items-center justify-center gap-2 h-12 min-w-[48px] px-3 rounded-full",
                "text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-foreground/[0.05]",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              <span className="hidden sm:inline">Close</span>
            </Dialog.Close>
          </div>

          {/* Scrollable content body */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 pt-4 md:pt-6"
            style={{
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            {/* Primary horizontal row — siblings, no soloist */}
            <nav
              aria-label="Main pages"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-6 md:pb-8 border-b border-border/60"
              style={{ animationDelay: "120ms" }}
            >
              {PRIMARY.map((p, i) => {
                const isActive = pathname === p.to;
                return (
                  <Link
                    key={p.to}
                    to={p.to}
                    onClick={() => onOpenChange(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "menu-drawer__link inline-flex items-center min-h-[44px]",
                      "text-base md:text-lg font-medium transition-colors duration-300",
                      isActive ? "text-evergreen" : "text-foreground/85 hover:text-evergreen",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
                    )}
                    style={{ animationDelay: `${160 + i * 40}ms` }}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </nav>

            {/* Three same-shape columns: Services · Service Areas · Company */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 max-w-5xl">
              <DrawerColumn label="Services" delay={300}>
                {SERVICES.map((s, i) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    muted={s.muted}
                    delay={340 + i * 30}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Service Areas" delay={400}>
                {AREAS.map((a, i) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    muted={a.muted}
                    delay={440 + i * 30}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Company" delay={520}>
                {COMPANY.map((c, i) => (
                  <DrawerLink
                    key={c.to}
                    to={c.to}
                    onClick={() => onOpenChange(false)}
                    delay={560 + i * 30}
                    active={pathname === c.to}
                  >
                    {c.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>
            </div>
          </div>

          {/* Bottom rail — trust line · phone · email · CTA */}
          <div
            className="relative z-10 border-t border-border/60 bg-background/40 backdrop-blur-sm"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="px-6 md:px-10 lg:px-16 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                <p className="text-foreground/70 flex items-center gap-2">
                  <span
                    className="menu-trust-dot inline-block h-1.5 w-1.5 rounded-full bg-evergreen/80"
                    aria-hidden="true"
                  />
                  Family-run · Foothills, AB
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-foreground/75">
                  <a
                    href={`tel:${STUDIO_PHONE_TEL}`}
                    onClick={() => onOpenChange(false)}
                    className="hover:text-evergreen transition-colors min-h-[44px] inline-flex items-center font-medium"
                  >
                    {STUDIO_PHONE_DISPLAY}
                  </a>
                  <span className="hidden md:inline text-foreground/30" aria-hidden="true">·</span>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    onClick={() => onOpenChange(false)}
                    className="hover:text-evergreen transition-colors min-h-[44px] inline-flex items-center break-all"
                  >
                    {STUDIO_EMAIL}
                  </a>
                </div>
              </div>

              {isMobile ? (
                <button
                  type="button"
                  onClick={handleQuote}
                  className={cn(
                    "menu-drawer__cta nav-pill group/btn flex items-center justify-between gap-3",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium min-h-[52px]",
                    "active:scale-[0.985] transition-transform duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Get a Free Quote</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                </button>
              ) : (
                <Link
                  to="/contact"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "menu-drawer__cta nav-pill group/btn inline-flex items-center gap-3 shrink-0",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-sm font-medium min-h-[44px]",
                    "hover:bg-evergreen-hover transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Get a Free Quote</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// ─── Sub-components ───

const DrawerColumn = ({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) => (
  <div>
    <p
      className="menu-drawer__label text-evergreen text-xs font-semibold uppercase tracking-[0.14em] mb-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      {label}
    </p>
    <div className="flex flex-col">{children}</div>
  </div>
);

const DrawerLink = ({
  to,
  onClick,
  muted,
  delay,
  active,
  children,
}: {
  to: string;
  onClick: () => void;
  muted?: boolean;
  delay: number;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={cn(
      "menu-drawer__link py-1.5 min-h-[52px] flex items-center transition-colors duration-300",
      "text-[1.0625rem] md:text-[1.125rem]",
      muted
        ? "text-foreground/55 hover:text-evergreen text-base"
        : "text-foreground/85 hover:text-evergreen",
      active && "text-evergreen",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </Link>
);

export default MenuDrawer;
