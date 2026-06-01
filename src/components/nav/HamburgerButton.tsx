import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Fires on pointerdown — used to warm the overlay chunk before click commits. */
  onPointerDown?: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  /** Retained for API compatibility; the pill always shows its word. */
  showWord?: boolean;
  className?: string;
}

/**
 * Menu pill — Fantasy.co register.
 *
 * Single dark evergreen capsule with cream "Menu" / "Close" word + a
 * two-line glyph. The pill IS the nav chrome (the bar behind it is
 * transparent), so the word is visible at every breakpoint.
 */
const HamburgerButton = ({
  open,
  onClick,
  onPointerDown,
  label,
  className,
}: HamburgerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    onPointerDown={onPointerDown}
    aria-label={label ?? (open ? "Close menu" : "Open menu")}
    aria-expanded={open}
    aria-controls="site-map-drawer"
    className={cn(
      "menu-pill group relative z-10 inline-flex items-center justify-center shrink-0",
      "gap-2 sm:gap-2.5 rounded-full",
      "h-10 md:h-11 px-4 md:px-5",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3 w-[18px]" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 right-0 h-[1.5px] bg-evergreen-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 right-0 h-[1.5px] bg-evergreen-foreground rounded-full" />
    </span>
    <span className="text-[13px] md:text-[14px] font-medium tracking-[-0.01em] leading-none">
      {open ? "Close" : "Menu"}
    </span>
  </button>
);

export default HamburgerButton;
