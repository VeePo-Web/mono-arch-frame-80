import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  className?: string;
}

/**
 * Editorial two-line → X morph.
 * - At rest: top line full width, bottom line 70% width left-aligned —
 *   the asymmetry reads as "list" not "equals sign."
 * - Open: both lines extend to full width, cross at the centre at ±45°.
 * - Honours prefers-reduced-motion via duration-1ms fallback in index.css.
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
      "relative z-10 inline-flex items-center justify-center h-11 w-11 rounded-full shrink-0",
      "hover:bg-foreground/[0.04] active:scale-95 transition-[background-color,transform]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3 w-4" data-open={open}>
      <span className="hamburger-line hamburger-line--top absolute left-0 h-px bg-foreground" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 h-px bg-foreground" />
    </span>
  </button>
);

export default HamburgerButton;
