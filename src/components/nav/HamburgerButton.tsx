import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  /** Show visible "Menu" text label at md+ (default true on the primary nav). */
  showLabel?: boolean;
  /** Show the small evergreen "you are here" dot (used when current route lives inside the drawer). */
  currentDot?: boolean;
  className?: string;
}

/**
 * Three-line "Menu" → X morph.
 * - At rest: three full-width 1.5px lines (the universal menu glyph).
 * - Open: top + bottom rotate to form the X; middle line fades out.
 * - Optional visible "Menu" label at md+ for grandpa-grade legibility.
 * - Optional `currentDot` evergreen indicator at top-right when the
 *   current route is one of the drawer's secondary pages.
 * - Honours prefers-reduced-motion via index.css.
 */
const HamburgerButton = ({
  open,
  onClick,
  label,
  showLabel = false,
  currentDot = false,
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
      "h-12 min-w-[48px] px-3 rounded-full",
      "text-sm font-medium tracking-wide text-foreground hover:text-foreground",
      "hover:bg-foreground/[0.05] active:scale-95",
      "transition-[background-color,transform,color]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3.5 w-5" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--mid    absolute left-0 h-[1.5px] bg-foreground rounded-full" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 h-[1.5px] bg-foreground rounded-full" />
    </span>
    {showLabel && (
      <span className="hidden md:inline">{open ? "Close" : "Menu"}</span>
    )}
    {currentDot && !open && (
      <span
        aria-hidden="true"
        className="nav-current-dot absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-evergreen"
      />
    )}
  </button>
);

export default HamburgerButton;
