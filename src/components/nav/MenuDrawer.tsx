import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Phone from "lucide-react/dist/esm/icons/phone";
import Mail from "lucide-react/dist/esm/icons/mail";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { openQuickContact } from "@/lib/quickContact";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logo/haven-creek-horizontal.webp";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRIMARY_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
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

const STUDIO_PHONE_TEL = "+14035550100";
const STUDIO_PHONE_DISPLAY = "(403) 555-0100";
const STUDIO_EMAIL = "hello@havencreekrenovations.ca";

/**
 * MenuDrawer — fullscreen editorial Site Map.
 *
 * Replaces the right-anchored mobile sheet AND the desktop inline link list.
 * Triggered by the always-on hamburger from the floating nav island.
 * Three columns of cross-page navigation, italic primary links above,
 * trust line + Consultation CTA pinned at the bottom rail.
 *
 * Built on Radix Dialog directly so we get focus trap, scroll lock,
 * Escape, and return-focus for free without the side-sheet animation.
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
    } else {
      // Desktop routes to /contact via Link below — handled there
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

          {/* Top row — logo (left) + close (right). Mirrors the floating island so
              the spatial transition feels intentional. */}
          <div
            className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-20"
            style={{
              paddingTop: "max(1.25rem, calc(env(safe-area-inset-top) + 0.75rem))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            <Link
              to="/"
              onClick={() => onOpenChange(false)}
              aria-label="Haven Creek — home"
              className="inline-flex items-center"
            >
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={160}
                height={28}
                className="h-6 md:h-7 w-auto"
                decoding="async"
              />
            </Link>
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
          <div className="relative z-10 mt-6 md:mt-10 px-6 md:px-12 lg:px-20 dossier-strip" aria-hidden="true">
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
            className="relative z-10 flex-1 overflow-y-auto px-6 md:px-12 lg:px-20 pt-6 md:pt-10"
            style={{
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
            }}
          >
            {/* Primary numbered list — italic serif, big, generous tap targets */}
            <ul className="space-y-1 max-w-3xl">
              {PRIMARY_LINKS.map((link, i) => (
                <li key={link.to} className="overflow-hidden">
                  <Link
                    to={link.to}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "menu-drawer__primary",
                      "flex items-baseline gap-4 py-2 md:py-3 px-1 -mx-1 rounded-sm",
                      "text-[1.65rem] md:text-[2.25rem] lg:text-[2.6rem] font-serif italic font-light leading-tight min-h-[56px]",
                      pathname === link.to ? "text-evergreen" : "text-foreground hover:text-evergreen",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    )}
                    style={{ animationDelay: `${100 + i * 60}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-7 md:w-9 text-[0.7rem] md:text-[0.75rem] tracking-[0.18em] tabular-nums not-italic font-sans font-medium pt-3 text-evergreen/55"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Three-column grid: Services · Areas · Reach */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16 max-w-5xl">
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

              <DrawerColumn label="Service Areas" delay={420}>
                {AREAS.map((a, i) => (
                  <DrawerLink
                    key={a.to}
                    to={a.to}
                    onClick={() => onOpenChange(false)}
                    muted={a.muted}
                    delay={460 + i * 30}
                    active={pathname === a.to}
                  >
                    {a.label}
                  </DrawerLink>
                ))}
              </DrawerColumn>

              <DrawerColumn label="Reach Us" delay={540}>
                <a
                  href={`tel:${STUDIO_PHONE_TEL}`}
                  onClick={() => onOpenChange(false)}
                  className="menu-drawer__link group flex items-center gap-3 py-1.5 min-h-[44px] text-foreground/85 hover:text-evergreen transition-colors"
                  style={{ animationDelay: "580ms" }}
                >
                  <Phone className="h-4 w-4 text-evergreen/70 group-hover:text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>{STUDIO_PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  onClick={() => onOpenChange(false)}
                  className="menu-drawer__link group flex items-center gap-3 py-1.5 min-h-[44px] text-foreground/85 hover:text-evergreen transition-colors break-all"
                  style={{ animationDelay: "610ms" }}
                >
                  <Mail className="h-4 w-4 text-evergreen/70 group-hover:text-evergreen shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  <span>hello@havencreekrenovations.ca</span>
                </a>
              </DrawerColumn>
            </div>
          </div>

          {/* Bottom rail — trust line + Consultation CTA */}
          <div
            className="relative z-10 border-t border-border/60 bg-background/40 backdrop-blur-sm"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="px-6 md:px-12 lg:px-20 py-4 md:py-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <p className="text-minimal text-foreground/70 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-evergreen/80" aria-hidden="true" />
                Family-run · Foothills, AB
              </p>

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
                    "menu-drawer__cta group/btn inline-flex items-center gap-3",
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
