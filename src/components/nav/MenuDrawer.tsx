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

const STUDIO = [
  { label: "About", to: "/about" },
  { label: "Selected Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

/**
 * MenuDrawer — fullscreen editorial Site Map (round 2 cleanup).
 *
 * Top-row: only the close button (no duplicate logo — the floating island
 * already carries the brand mark, doubling it under the close button felt
 * heavy and redundant).
 *
 * Body: a single italic display "Home" link on top, then three same-shape
 * link columns — Services · Service Areas · Studio. Mixed-shape columns
 * (icon rows beside link lists) broke the rhythm; this is uniform.
 *
 * Bottom rail: trust line · phone · email · Consultation CTA. Phone +
 * email moved out of the columns so the grid stays uniform and the
 * contact methods sit next to the primary CTA where leads expect them.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  // Close on route change
  useEffect(() => {
    if (open) onOpenChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleConsultation = () => {
    onOpenChange(false);
    if (isMobile) {
      // Defer so the close animation doesn't fight the sheet enter
      setTimeout(() => openQuickContact({ source: "quick_contact_sheet" }), 220);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop — soft plaster wash, not a flat black scrim */}
        <Dialog.Overlay className="menu-drawer__overlay fixed inset-0 z-[90]" />
        <Dialog.Content
          id="site-map-drawer"
          aria-describedby={undefined}
          className={cn(
            "menu-drawer fixed inset-0 z-[91] flex flex-col",
            "bg-background/95 backdrop-blur-2xl",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Site map</Dialog.Title>

          {/* Plaster-grain veil — same texture as elsewhere on the site */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />

          {/* Top row — close button only (logo lives on the floating island). */}
          <div
            className="relative z-10 flex items-center justify-end px-6 md:px-10 lg:px-16"
            style={{
              paddingTop: "max(1.25rem, calc(env(safe-area-inset-top) + 0.75rem))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            <Dialog.Close
              className={cn(
                "inline-flex items-center justify-center h-11 w-11 rounded-full",
                "text-foreground/75 hover:text-foreground hover:bg-foreground/[0.05]",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Dialog.Close>
          </div>

          {/* Dossier strip — unmistakably brand voice */}
          <div className="relative z-10 mt-2 md:mt-6 px-6 md:px-10 lg:px-16 dossier-strip" aria-hidden="true">
            <span className="dossier-strip__rule" />
            <span className="dossier-strip__inner">
              <span className="dossier-strip__no">Site Map</span>
              <span className="dossier-strip__dot">·</span>
              <span>Edition I</span>
            </span>
            <span className="dossier-strip__rule" />
          </div>

          {/* Scrollable content body */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 pt-8 md:pt-12"
            style={{
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            {/* Single italic "Home" — primary anchor; everything else is a column. */}
            <Link
              to="/"
              onClick={() => onOpenChange(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={cn(
                "menu-drawer__primary inline-block py-2 px-1 -mx-1 rounded-sm",
                "menu-primary-text",
                pathname === "/" ? "text-evergreen" : "text-foreground hover:text-evergreen",
                "transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              style={{ animationDelay: "120ms" }}
            >
              Home
            </Link>

            {/* Three same-shape columns: Services · Service Areas · Studio */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 max-w-5xl">
              <DrawerColumn label="Services" delay={260}>
                {SERVICES.map((s, i) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    muted={s.muted}
                    delay={300 + i * 30}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Service Areas" delay={360}>
                {AREAS.map((a, i) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    muted={a.muted}
                    delay={400 + i * 30}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="The Studio" delay={480}>
                {STUDIO.map((s, i) => (
                  <DrawerLink
                    key={s.to}
                    to={s.to}
                    onClick={() => onOpenChange(false)}
                    delay={520 + i * 30}
                    active={pathname === s.to}
                  >
                    {s.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>
            </div>
          </div>

          {/* Bottom rail — trust line · phone · email · Consultation CTA */}
          <div
            className="relative z-10 border-t border-border/60 bg-background/40 backdrop-blur-sm"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="px-6 md:px-10 lg:px-16 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left cluster: trust line + contact methods */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-minimal">
                <p className="text-foreground/70 flex items-center gap-2">
                  <span
                    className="menu-trust-dot inline-block h-1.5 w-1.5 rounded-full bg-evergreen/80"
                    aria-hidden="true"
                  />
                  Family-run · Foothills, AB
                </p>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-foreground/70">
                  <a
                    href={`tel:${STUDIO_PHONE_TEL}`}
                    onClick={() => onOpenChange(false)}
                    className="hover:text-evergreen transition-colors min-h-[32px] inline-flex items-center"
                  >
                    {STUDIO_PHONE_DISPLAY}
                  </a>
                  <span className="hidden md:inline text-foreground/30" aria-hidden="true">·</span>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    onClick={() => onOpenChange(false)}
                    className="hover:text-evergreen transition-colors min-h-[32px] inline-flex items-center break-all"
                  >
                    {STUDIO_EMAIL}
                  </a>
                </div>
              </div>

              {isMobile ? (
                <button
                  type="button"
                  onClick={handleConsultation}
                  className={cn(
                    "menu-drawer__cta group/btn flex items-center justify-between gap-3",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-minimal min-h-[52px]",
                    "active:scale-[0.985] transition-transform duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Request a Consultation</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
                  </span>
                </button>
              ) : (
                <Link
                  to="/contact"
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "menu-drawer__cta group/btn inline-flex items-center gap-3 shrink-0",
                    "bg-evergreen text-evergreen-foreground rounded-full pl-6 pr-1.5 py-1.5 text-minimal min-h-[44px]",
                    "hover:bg-evergreen-hover transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span>Request a Consultation</span>
                  <span className="icon-chip icon-chip-light bg-background/15">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
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
      className="menu-drawer__label text-minimal text-evergreen/75 mb-3"
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
      "menu-drawer__link py-1.5 min-h-[44px] flex items-center transition-colors duration-300",
      muted
        ? "text-foreground/55 hover:text-evergreen text-[0.92rem]"
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
