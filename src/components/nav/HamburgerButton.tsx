import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  /** Show visible "Menu" text label at md+ (default true on the primary nav). */
  showLabel?: boolean;
  className?: string;
}

/**
 * Three-line "Menu" → X morph.
 * - At rest: three full-width horizontal lines (the universal menu glyph).
 * - Open: top + bottom rotate to form the X; middle line fades out.
 * - Optional visible "Menu" label at md+ for grandma-grade legibility.
 * - Honours prefers-reduced-motion via index.css.
 */
const HamburgerButton = ({
  open,
  onClick,
  label,
  showLabel = false,
  className,
}: HamburgerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label ?? (open ? "Close menu" : "Open menu")}
    aria-expanded={open}
    aria-controls="site-map-drawer"
    className={cn(
      "relative z-10 inline-flex items-center justify-center gap-2 shrink-0",
      "h-11 min-w-[44px] px-2.5 rounded-full",
      "text-sm font-medium text-foreground/85 hover:text-foreground",
      "hover:bg-foreground/[0.04] active:scale-95",
      "transition-[background-color,transform,color]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3.5 w-5" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 h-px bg-foreground" />
      <span className="hamburger-line hamburger-line--mid    absolute left-0 h-px bg-foreground" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 h-px bg-foreground" />
    </span>
    {showLabel && (
      <span className="hidden md:inline">{open ? "Close" : "Menu"}</span>
    )}
  </button>
);

export default HamburgerButton;
