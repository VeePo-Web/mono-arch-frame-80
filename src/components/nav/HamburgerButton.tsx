import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  className?: string;
}

/**
 * Editorial three-line → X morph.
 * - Two hairlines at rest (top + bottom of a 3×4 stage).
 * - Open state collapses both to the centre and rotates ±45°.
 * - Honours prefers-reduced-motion via duration-0 fallback in index.css.
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
      "relative z-10 inline-flex items-center justify-center h-11 w-11 rounded-full",
      "hover:bg-foreground/[0.04] transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3 w-4" data-open={open}>
      <span className="hamburger-line hamburger-line--top absolute left-0 right-0 h-px bg-foreground" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 right-0 h-px bg-foreground" />
    </span>
  </button>
);

export default HamburgerButton;
