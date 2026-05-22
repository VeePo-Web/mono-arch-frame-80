import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";
import X from "lucide-react/dist/esm/icons/x";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";

interface MenuDrawerProps {
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

/**
 * MenuDrawer — mobile/tablet fullscreen nav (Apple-grade).
 *
 * Top-aligned editorial menu. Each route is a full-width row separated
 * by a hair rule; the active row carries a 6px evergreen dot. The CTA
 * sits below the list with no divider rail. A quiet phone link below
 * the CTA preserves the path to contact while the drawer covers the
 * header.
 *
 * Hidden at lg+ where inline header routes own primary nav.
 */
const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const { pathname } = useLocation();
  const close = () => onOpenChange(false);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-drawer__overlay fixed inset-0 z-[90]" />
        <Dialog.Content
          id="site-map-drawer"
          aria-describedby={undefined}
          className={cn(
            "menu-drawer fixed inset-0 z-[91] flex flex-col bg-background",
            "focus:outline-none",
          )}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>

          {/* Close — absolute, corner. Matches the hamburger silhouette. */}
          <Dialog.Close
            aria-label="Close menu"
            className={cn(
              "absolute z-20 inline-flex items-center justify-center h-11 w-11 rounded-lg",
              "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]",
              "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            style={{
              top: "max(1rem, calc(env(safe-area-inset-top) + 0.625rem))",
              right: "max(1rem, env(safe-area-inset-right))",
            }}
          >
            <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
          </Dialog.Close>

          {/* Body — top-aligned, scrolls if it must. */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-6 md:px-10"
            style={{
              paddingTop: "max(6rem, calc(env(safe-area-inset-top) + 5rem))",
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
            }}
          >
            <div className="max-w-md mx-auto md:mx-0">
              {/* Routes — hair-ruled rows */}
              <nav aria-label="Site">
                <ul className="flex flex-col border-t border-foreground/10">
                  {ROUTES.map((r) => {
                    const active = pathname === r.to;
                    return (
                      <li key={r.to} className="border-b border-foreground/10">
                        <Link
                          to={r.to}
                          onClick={close}
                          onPointerDown={() => prefetchRoute(r.to)}
                          onMouseEnter={() => prefetchRoute(r.to)}
                          onFocus={() => prefetchRoute(r.to)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "menu-drawer__link group t-section",
                            "flex items-center justify-between gap-4 py-5",
                            "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            active ? "text-evergreen" : "text-foreground hover:text-evergreen",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                          )}
                        >
                          <span>{r.label}</span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-1.5 w-1.5 rounded-full bg-evergreen transition-opacity duration-300",
                              active ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA — no border rail above */}
              <Link
                to="/contact"
                onClick={close}
                onPointerDown={() => prefetchRoute("/contact")}
                onMouseEnter={() => prefetchRoute("/contact")}
                onFocus={() => prefetchRoute("/contact")}
                className={cn(
                  "menu-drawer__cta cta-spring mt-8",
                  "inline-flex items-center justify-center w-full",
                  "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                  "min-h-[52px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                Get a Free Quote
              </Link>

              {/* Quiet phone fallback — header phone is hidden behind the drawer */}
              <a
                href={`tel:${STUDIO_PHONE_TEL}`}
                onClick={close}
                aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
                className={cn(
                  "menu-drawer__tel mt-4 flex items-center justify-center",
                  "min-h-[44px] t-micro tracking-[0.14em] text-foreground/60 hover:text-foreground",
                  "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                )}
              >
                Or call {STUDIO_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuDrawer;
