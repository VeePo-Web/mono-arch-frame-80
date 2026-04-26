import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { prefetchRoute } from "@/lib/routePrefetch";

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
 * MenuDrawer — Round 7: lighter motion, prefetched routes.
 *
 * - Item stagger handled by CSS `:nth-of-type` (no inline animation-delay).
 * - Body uses `overscroll-contain scroll-smooth` so iOS rubber-band
 *   doesn't leak to the page underneath.
 * - Every link warms its route chunk on `pointerdown`/`focus` — by the
 *   time the click fires, the chunk is in cache.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();

  const closeAndQuickContact = () => {
    onOpenChange(false);
    setTimeout(() => openQuickContact({ source: "quick_contact_sheet" }), 220);
  };

  const warm = (to: string) => () => prefetchRoute(to);

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
                "inline-flex items-center justify-center h-11 w-11 rounded-lg",
                "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
            </Dialog.Close>
          </div>

          {/* Scrollable content body */}
          <div
            className="relative z-10 flex-1 overflow-y-auto overscroll-contain scroll-smooth px-6 md:px-10 lg:px-16 pt-1 md:pt-3"
            style={{
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            {/* Single primary "Home" anchor */}
            <Link
              to="/"
              onClick={() => onOpenChange(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "menu-drawer__link inline-flex items-center mb-4 md:mb-6",
                "text-2xl md:text-3xl font-semibold tracking-tight",
                pathname === "/" ? "text-evergreen" : "text-foreground hover:text-evergreen",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
              )}
            >
              Home
            </Link>

            {/* Three same-shape columns: Services · Service Areas · Company */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 max-w-5xl">
              <DrawerColumn label="Services">
                {SERVICES.map((s) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    onWarm={warm(s.to)}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Service Areas">
                {AREAS.map((a) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    onWarm={warm(a.to)}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Company">
                {COMPANY.map((c) => (
                  <DrawerLink
                    key={c.to}
                    to={c.to}
                    onClick={() => onOpenChange(false)}
                    onWarm={warm(c.to)}
                    active={pathname === c.to}
                  >
                    {c.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>
            </div>

            {/* Tiny secondary contact row beneath the columns */}
            <div className="menu-drawer__label mt-8 md:mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/70">
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
                  "menu-drawer__cta md:hidden cta-spring",
                  "inline-flex items-center justify-center gap-2.5",
                  "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                  "min-h-[52px] w-full",
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
                onPointerDown={warm("/contact")}
                onFocus={warm("/contact")}
                className={cn(
                  "menu-drawer__cta hidden md:inline-flex cta-spring",
                  "items-center justify-center gap-2.5 shrink-0",
                  "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                  "min-h-[44px] min-w-[200px]",
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="menu-drawer__label text-evergreen text-[11px] font-semibold uppercase tracking-[0.16em] mb-2">
      {label}
    </p>
    <div className="flex flex-col">{children}</div>
  </div>
);

const DrawerLink = ({
  to,
  onClick,
  onWarm,
  active,
  children,
}: {
  to: string;
  onClick: () => void;
  onWarm: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
    onPointerDown={onWarm}
    onFocus={onWarm}
    aria-current={active ? "page" : undefined}
    className={cn(
      "menu-drawer__link py-1 min-h-[44px] flex items-center transition-colors duration-300",
      "text-[1.0625rem] md:text-[1.125rem]",
      active
        ? "text-evergreen font-semibold"
        : "text-foreground/85 hover:text-evergreen",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
    )}
  >
    {children}
  </Link>
);

export default MenuDrawer;
