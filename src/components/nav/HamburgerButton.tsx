import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  className?: string;
}

/**
 * Round 7: square 44×44 icon-only hamburger with pure-transform morph.
 * - Three 1.5px lines fixed at top/middle/bottom — only `transform` animates.
 * - X = top translateY+rotate(45°), bottom translateY-rotate(45°), middle scaleX(0).
 * - Zero layout events per frame → 60fps on low-end Android.
 * - Honours prefers-reduced-motion via index.css.
 */
const HamburgerButton = ({
  open,
  onClick,
  label,
  className,
}: HamburgerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label ?? (open ? "Close menu" : "Open menu")}
    aria-expanded={open}
    aria-controls="site-map-drawer"
    className={cn(
      "hamburger-btn relative z-10 inline-flex items-center justify-center shrink-0",
      "h-11 w-11 rounded-lg",
      "text-foreground hover:bg-foreground/[0.05] active:scale-95",
      "transition-[background-color,transform] duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3.5 w-5" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--mid    absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
    </span>
  </button>
);

export default HamburgerButton;
