import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";

interface MenuOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ROUTES = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const STUDIO_PHONE_TEL = "+14039707691";
const STUDIO_PHONE_DISPLAY = "403 970-7691";
const STUDIO_EMAIL = "hello@havencreek.ca";

/**
 * MenuOverlay — full-viewport editorial veil (desktop + mobile).
 *
 * Evergreen-deep veil scales from the top in 520ms. Oversized serif route
 * names cascade in 90ms apart with a blur-to-sharp reveal. Active route
 * carries a 28×2px cream rule to the left of the word — never an underline.
 * Contact rail fades in last bottom-right.
 *
 * Same overlay at every breakpoint. Replaces the old MenuDrawer.
 */
const MenuOverlay = ({ open, onOpenChange }: MenuOverlayProps) => {
  const { pathname } = useLocation();
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-overlay__veil fixed inset-0 z-[90]" />
        <Dialog.Content
          id="site-map-drawer"
          aria-describedby={undefined}
          className={cn(
            "menu-overlay fixed inset-0 z-[91] flex flex-col",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>

          {/* Close — mirrors hamburger silhouette */}
          <Dialog.Close
            aria-label="Close menu"
            className={cn(
              "menu-overlay__close absolute z-20 inline-flex items-center justify-center h-11 w-11 rounded-lg",
              "text-evergreen-foreground/85 hover:text-evergreen-foreground hover:bg-evergreen-foreground/[0.08]",
              "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60",
            )}
            style={{
              top: "max(1rem, calc(env(safe-area-inset-top) + 0.625rem))",
              right: "max(1rem, env(safe-area-inset-right))",
            }}
          >
            <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
          </Dialog.Close>

          {/* Body — 12-col grid at lg+, column stack <lg */}
          <div
            className={cn(
              "menu-overlay__body flex-1 w-full",
              "px-6 md:px-10 lg:px-16",
              "grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10",
              "items-center",
            )}
            style={{
              paddingTop: "max(6rem, calc(env(safe-area-inset-top) + 5rem))",
              paddingBottom: "max(2.5rem, calc(env(safe-area-inset-bottom) + 2rem))",
            }}
          >
            {/* Routes — oversized serif, center-aligned vertical rhythm */}
            <nav aria-label="Site" className="lg:col-span-9 w-full">
              <ul className="flex flex-col gap-1 sm:gap-2 md:gap-3">
                {ROUTES.map((r) => {
                  const active = pathname === r.to;
                  return (
                    <li key={r.to} className="menu-overlay__row">
                      <Link
                        to={r.to}
                        onClick={close}
                        onPointerDown={() => prefetchRoute(r.to)}
                        onMouseEnter={() => prefetchRoute(r.to)}
                        onFocus={() => prefetchRoute(r.to)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "menu-overlay__link group inline-flex items-center gap-5 py-2",
                          "font-serif tracking-[-0.03em] leading-[0.95]",
                          "text-[clamp(2.5rem,9vh,5.75rem)]",
                          "transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active
                            ? "text-evergreen-foreground"
                            : "text-evergreen-foreground/85 hover:text-evergreen-foreground hover:translate-x-3",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60 rounded-sm",
                        )}
                      >
                        {/* Active rule — 28×2px, sits left of the word */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "menu-overlay__rule inline-block h-[2px] w-[28px] bg-evergreen-foreground/70 shrink-0",
                            "transition-opacity duration-300",
                            active ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <span>{r.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact rail — fades in last */}
            <aside className="menu-overlay__rail lg:col-span-3 w-full lg:justify-self-end lg:text-right">
              <p className="t-eyebrow text-evergreen-foreground/55 mb-3">Contact</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    onClick={close}
                    className={cn(
                      "inline-block text-base md:text-lg font-medium",
                      "text-evergreen-foreground/85 hover:text-evergreen-foreground",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60 rounded-sm",
                    )}
                  >
                    {STUDIO_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${STUDIO_PHONE_TEL}`}
                    onClick={close}
                    aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                    className={cn(
                      "inline-block text-base md:text-lg font-medium",
                      "text-evergreen-foreground/85 hover:text-evergreen-foreground",
                      "transition-colors duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60 rounded-sm",
                    )}
                  >
                    {STUDIO_PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuOverlay;
