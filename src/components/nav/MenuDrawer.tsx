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


/**
 * MenuDrawer — Round 6: tighter, one close affordance.
 *
 * Two zones:
 *   1. Big "Home" link + 3 same-shape link columns + tiny contact row.
 *   2. Bottom rail: trust line + 1 CTA pill.
 *
 * Round 6 changes:
 * - Close affordance: icon-only square X (matches the new square hamburger).
 *   Backdrop tap also closes — those two are the only ways out.
 * - Tighter Home link spacing + 44px row min-height (was 48px) so all
 *   destinations fit above the fold on a 6.1" phone.
 * - Per-link animation-delay inline styles dropped — column-level stagger
 *   (parent menu-drawer__label) provides enough warmth without N inline styles.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();

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

          {/* Close button — icon-only square X (round 6: one close affordance) */}
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
            className="relative z-10 flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 pt-1 md:pt-3"
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
              style={{ animationDelay: "120ms" }}
            >
              Home
            </Link>

            {/* Three same-shape columns: Services · Service Areas · Company */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 max-w-5xl">
              <DrawerColumn label="Services" delay={200}>
                {SERVICES.map((s) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Service Areas" delay={300}>
                {AREAS.map((a) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Company" delay={400}>
                {COMPANY.map((c) => (
                  <DrawerLink
                    key={c.to}
                    to={c.to}
                    onClick={() => onOpenChange(false)}
                    active={pathname === c.to}
                  >
                    {c.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>
            </div>

          </div>

          {/* Bottom rail — trust line + ONE CTA */}
          <div
            className="relative z-10 border-t border-border/60 bg-background/40 backdrop-blur-sm"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="px-6 md:px-10 lg:px-16 py-4 md:py-5 flex md:justify-end">

              {/* Mobile CTA — opens QuickContactSheet */}
              <button
                type="button"
                onClick={closeAndQuickContact}
                className={cn(
                  "menu-drawer__cta md:hidden",
                  "inline-flex items-center justify-center gap-2.5",
                  "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                  "min-h-[52px] w-full",
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
                  "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                  "min-h-[44px] min-w-[200px]",
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
      className="menu-drawer__label text-evergreen text-[11px] font-semibold uppercase tracking-[0.16em] mb-2"
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
  active,
  children,
}: {
  to: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    onClick={onClick}
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
