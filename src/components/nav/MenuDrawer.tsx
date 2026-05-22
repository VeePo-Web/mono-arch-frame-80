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

/**
 * MenuDrawer — mobile/tablet fullscreen nav.
 *
 * One list of 5 routes, identical treatment. One CTA pinned to the bottom.
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

          {/* Close — absolute, corner */}
          <Dialog.Close
            aria-label="Close menu"
            className={cn(
              "absolute z-20 inline-flex items-center justify-center h-11 w-11 rounded-lg",
              "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.05]",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
            style={{
              top: "max(1rem, calc(env(safe-area-inset-top) + 0.625rem))",
              right: "max(1rem, env(safe-area-inset-right))",
            }}
          >
            <X className="h-5 w-5" strokeWidth={1.85} aria-hidden="true" />
          </Dialog.Close>

          {/* Routes — one stacked list */}
          <nav
            aria-label="Site"
            className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-6 md:px-10 flex flex-col justify-center"
            style={{
              paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
              paddingBottom: "2rem",
            }}
          >
            <ul className="flex flex-col gap-1 md:gap-2 max-w-md">
              {ROUTES.map((r) => {
                const active = pathname === r.to;
                return (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      onClick={close}
                      onPointerDown={() => prefetchRoute(r.to)}
                      onMouseEnter={() => prefetchRoute(r.to)}
                      onFocus={() => prefetchRoute(r.to)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "menu-drawer__link t-section block py-2 transition-colors duration-300",
                        active
                          ? "text-evergreen"
                          : "text-foreground hover:text-evergreen",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-1 -mx-1",
                      )}
                    >
                      {r.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom rail — single CTA */}
          <div
            className="border-t border-border/60 bg-background px-6 md:px-10 py-4 md:py-5 flex md:justify-end"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <Link
              to="/contact"
              onClick={close}
              onPointerDown={() => prefetchRoute("/contact")}
              onMouseEnter={() => prefetchRoute("/contact")}
              onFocus={() => prefetchRoute("/contact")}
              className={cn(
                "menu-drawer__cta cta-spring inline-flex items-center justify-center",
                "bg-evergreen text-evergreen-foreground rounded-lg px-6 text-[15px] font-semibold",
                "min-h-[52px] md:min-h-[44px] w-full md:w-auto md:min-w-[220px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              Get a Free Quote
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuDrawer;
