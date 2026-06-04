import * as Dialog from "@radix-ui/react-dialog";
import { Link, useLocation } from "react-router-dom";

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
 * Evergreen-deep veil scales from the top in 520ms. Film grain + soft
 * vignette layer over the ground, Fly4Me register. Oversized serif route
 * names cascade in 90ms apart with a blur-to-sharp reveal.
 *
 * Mobile rhythm: routes top-anchored under the close, oversized CTA mid,
 * contact rail pinned bottom above safe-area.
 * Desktop rhythm: routes top-anchored cols 1-9, contact rail bottom-right
 * cols 10-12, CTA sits beneath the route stack.
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

          {/* Film grain — depth, prevents flat digital green */}
          <div aria-hidden="true" className="menu-overlay__grain pointer-events-none absolute inset-0" />
          {/* Vignette — pulls focus to the route list */}
          <div aria-hidden="true" className="menu-overlay__vignette pointer-events-none absolute inset-0" />

          {/* Close — matches the trigger pill silhouette */}
          <Dialog.Close
            aria-label="Close menu"
            className={cn(
              "menu-overlay__close group absolute z-20 inline-flex items-center justify-center shrink-0",
              "gap-2 sm:gap-2.5 rounded-full",
              "h-10 md:h-11 px-4 md:px-5",
              "bg-evergreen-foreground/[0.08] text-evergreen-foreground",
              "hover:bg-evergreen-foreground/[0.14]",
              "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60",
            )}
            style={{
              top: "max(1rem, calc(env(safe-area-inset-top) + 0.625rem))",
              right: "max(1rem, env(safe-area-inset-right))",
              boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.06)",
            }}
          >
            <span className="relative block h-3 w-[18px]">
              <span className="absolute left-0 right-0 top-[5.25px] h-[1.5px] bg-evergreen-foreground rounded-full rotate-45" />
              <span className="absolute left-0 right-0 top-[5.25px] h-[1.5px] bg-evergreen-foreground rounded-full -rotate-45" />
            </span>
            <span className="text-[13px] md:text-[14px] font-medium tracking-[-0.01em] leading-none">
              Close
            </span>
          </Dialog.Close>

          {/* Body — 12-col grid at lg+, vertically centered stack on mobile */}
          <div
            className={cn(
              "menu-overlay__body relative z-10 flex-1 w-full overflow-y-auto",
              "px-6 md:px-10 lg:px-16",
              "grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-10",
              "lg:items-center",
            )}
            style={{
              paddingTop: "max(6rem, calc(env(safe-area-inset-top) + 5rem))",
              paddingBottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
            }}
          >
            {/* Routes — centered vertically on mobile, top-anchored on lg+ */}
            <nav aria-label="Site" className="lg:col-span-9 w-full self-center lg:self-start flex flex-col justify-center min-h-0">
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
                          "menu-overlay__link group inline-flex items-center gap-4 sm:gap-5 py-1",
                          "font-serif tracking-[-0.03em] leading-[0.95]",
                          // Mobile: width-bound so longest word ("Services") never clips.
                          // Desktop (lg+): viewport-height bound for cinematic scale.
                          "text-[clamp(2.5rem,13vw,4.75rem)] lg:text-[clamp(3.25rem,9vh,5.75rem)]",
                          "transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          active
                            ? "text-evergreen-foreground"
                            : "text-evergreen-foreground/85 hover:text-evergreen-foreground hover:translate-x-3",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60 rounded-sm",
                        )}
                      >
                        {/* Active rule — sits left of the word */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "menu-overlay__rule inline-block h-[2px] w-[22px] lg:w-[28px] bg-evergreen-foreground/70 shrink-0",
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

            {/* Contact rail — pinned bottom on mobile, bottom-right at lg+ */}
            <aside
              className={cn(
                "menu-overlay__rail w-full",
                "lg:col-span-3 lg:justify-self-end lg:text-right lg:self-end",
                "mt-6 lg:mt-0 pt-6 lg:pt-0 border-t border-evergreen-foreground/15 lg:border-0",
              )}
            >
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
                      "inline-block text-lg md:text-xl font-semibold tracking-[-0.01em]",
                      "text-evergreen-foreground",
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
