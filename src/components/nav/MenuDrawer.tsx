import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SERVICES = [
  { label: "Interior Finishing", to: "/services/interior-finishing" },
  { label: "Exterior Repairs", to: "/services/exterior-finishing" },
  { label: "Decking", to: "/services/decking" },
];

const AREAS = [
  { label: "Bragg Creek", to: "/service-areas/bragg-creek" },
  { label: "Rocky View County", to: "/service-areas/rocky-view-county" },
  { label: "Bearspaw", to: "/service-areas/bearspaw" },
  { label: "Water Valley", to: "/service-areas/water-valley" },
];

const COMPANY = [
  { label: "About", to: "/about" },
  { label: "Selected Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

/**
 * MenuDrawer — Round 5 "ruthless simplification".
 *
 * Two zones:
 *   1. Big "Home" link + 3 same-shape link columns.
 *   2. Bottom rail: trust line + 1 CTA pill.
 *
 * Phone + email live in a tiny secondary row beneath the columns.
 * No horizontal primary row, no leading dots, no plaster-grain SVG.
 * CSS media-queries pick the CTA flavour — no useIsMobile mount.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();

  // Close on route change.
  useEffect(() => {
    if (open) onOpenChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeAndQuickContact = () => {
    onOpenChange(false);
    setTimeout(() => openQuickContact({ source: "quick_contact_sheet" }), 220);
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
                "text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={1.85} aria-hidden="true" />
              <span className="hidden sm:inline">Close</span>
            </Dialog.Close>
          </div>

          {/* Scrollable content body */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 pt-2 md:pt-4"
            style={{
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            {/* Single primary "Home" anchor — RoyalMechanical-style */}
            <Link
              to="/"
              onClick={() => onOpenChange(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "menu-drawer__link inline-flex items-center min-h-[56px] mb-6 md:mb-8",
                "text-2xl md:text-3xl font-semibold tracking-tight",
                pathname === "/" ? "text-evergreen" : "text-foreground hover:text-evergreen",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
              )}
              style={{ animationDelay: "120ms" }}
            >
              Home
            </Link>

            {/* Three same-shape columns: Services · Service Areas · Company */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 max-w-5xl">
              <DrawerColumn label="Services" delay={200}>
                {SERVICES.map((s, i) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    delay={240 + i * 30}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Service Areas" delay={300}>
                {AREAS.map((a, i) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    delay={340 + i * 30}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Company" delay={400}>
                {COMPANY.map((c, i) => (
                  <DrawerLink
                    key={c.to}
                    to={c.to}
                    onClick={() => onOpenChange(false)}
                    delay={440 + i * 30}
                    active={pathname === c.to}
                  >
                    {c.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>
            </div>

            {/* Tiny secondary contact row beneath the columns */}
            <div
              className="menu-drawer__label mt-10 md:mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/70"
              style={{ animationDelay: "560ms" }}
            >
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                onClick={() => onOpenChange(false)}
                className="hover:text-evergreen transition-colors min-h-[44px] inline-flex items-center font-medium"
              >
                {STUDIO_PHONE_DISPLAY}
              </a>
              <span className="text-foreground/25" aria-hidden="true">·</span>
              <a
                href={`mailto:${STUDIO_EMAIL}`}
                onClick={() => onOpenChange(false)}
                className="hover:text-evergreen transition-colors min-h-[44px] inline-flex items-center break-all"
              >
                {STUDIO_EMAIL}
              </a>
            </div>
          </div>

          {/* Bottom rail — trust line + ONE CTA */}
          <div
            className="relative z-10 border-t border-border/60 bg-background/40 backdrop-blur-sm"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="px-6 md:px-10 lg:px-16 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-foreground/70 text-sm flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-evergreen/80"
                  aria-hidden="true"
                />
                Family-run · Foothills, AB
              </p>

              {/* Mobile CTA — opens QuickContactSheet */}
              <button
                type="button"
                onClick={closeAndQuickContact}
                className={cn(
                  "menu-drawer__cta md:hidden",
                  "inline-flex items-center justify-center gap-2.5",
                  "bg-evergreen text-evergreen-foreground rounded-full px-6 text-[15px] font-semibold",
                  "min-h-[56px] w-full",
                  "active:scale-[0.985] transition-transform duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
              </button>

              {/* Desktop CTA — routes to /contact */}
              <Link
                to="/contact"
                onClick={() => onOpenChange(false)}
                className={cn(
                  "menu-drawer__cta hidden md:inline-flex",
                  "items-center justify-center gap-2.5 shrink-0",
                  "bg-evergreen text-evergreen-foreground rounded-full px-6 text-[15px] font-semibold",
                  "min-h-[48px] min-w-[220px]",
                  "hover:bg-evergreen-hover transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
              </Link>
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
      className="menu-drawer__label text-evergreen text-[11px] font-semibold uppercase tracking-[0.16em] mb-3"
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
  delay,
  active,
  children,
}: {
  to: string;
  onClick: () => void;
  delay: number;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={cn(
      "menu-drawer__link py-1.5 min-h-[48px] flex items-center transition-colors duration-300",
      "text-[1.0625rem] md:text-[1.125rem]",
      active
        ? "text-evergreen font-semibold"
        : "text-foreground/85 hover:text-evergreen",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
    )}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </Link>
);

export default MenuDrawer;
