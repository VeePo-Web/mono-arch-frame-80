import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Fires on pointerdown — used to warm the overlay chunk before click commits. */
  onPointerDown?: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  className?: string;
}

/**
 * Two-line hamburger glyph, square 44×44, 8px radius.
 *
 * At rest:  two horizontal lines (top + bottom), 10px apart.
 * Hover:    top slides right 2px, bottom slides left 2px (500ms).
 * Open:     lines rotate to form an X.
 *
 * Pure transform/opacity only — never animate width/top/bottom.
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
    <span className="hamburger-stage relative block h-[10px] w-5" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 right-0 h-[1.5px] bg-foreground rounded-full" />
    </span>
  </button>
);

export default HamburgerButton;
