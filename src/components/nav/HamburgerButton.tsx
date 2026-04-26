import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  /** Mark current route as living inside the drawer — adds a calm static
   *  evergreen bar 4px below the icon. No animation, no ambiguity. */
  current?: boolean;
  className?: string;
}

/**
 * Round 5: square 48×48 icon-only hamburger.
 * - Three 1.5px lines (canonical menu glyph) → X morph on open.
 * - Optional `current` data flag draws a 2px evergreen "you are here" bar.
 * - No visible "Menu" word, no pulse — calmer next to the Quote pill.
 * - Honours prefers-reduced-motion via index.css.
 */
const HamburgerButton = ({
  open,
  onClick,
  label,
  current = false,
  className,
}: HamburgerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label ?? (open ? "Close menu" : "Open menu")}
    aria-expanded={open}
    aria-controls="site-map-drawer"
    data-current={current ? "true" : undefined}
    className={cn(
      "hamburger-btn relative z-10 inline-flex items-center justify-center shrink-0",
      "h-12 w-12 rounded-full",
      "text-foreground hover:bg-foreground/[0.05] active:scale-95",
      "transition-[background-color,transform]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3.5 w-5" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--mid    absolute left-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 h-[1.5px] bg-foreground rounded-full" />
    </span>
  </button>
);

export default HamburgerButton;
