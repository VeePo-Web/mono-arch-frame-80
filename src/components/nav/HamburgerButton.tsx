import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Fires on pointerdown — used to warm the drawer chunk before click commits. */
  onPointerDown?: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  className?: string;
}

/**
 * Round 6: square 44×44 icon-only hamburger.
 * - Three 1.5px lines (canonical menu glyph) → X morph on open.
 * - Square shape (8px radius) — matches the new square Quote CTA so the
 *   right cluster reads as a coherent set of "actions" not "tags".
 * - Honours prefers-reduced-motion via index.css.
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
      "hamburger-btn relative z-10 inline-flex items-center justify-center shrink-0",
      "h-11 w-11 rounded-lg",
      "text-foreground hover:bg-foreground/[0.05] active:scale-95",
      "transition-[background-color,transform] duration-200 ease-out",
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
