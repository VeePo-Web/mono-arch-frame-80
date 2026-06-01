import { cn } from "@/lib/utils";

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  /** Fires on pointerdown — used to warm the overlay chunk before click commits. */
  onPointerDown?: () => void;
  /** Optional label override for screen readers. */
  label?: string;
  /** Visible "Menu" word, shown at md+ only. Mobile stays icon-only. */
  showWord?: boolean;
  className?: string;
}

/**
 * Two-line hamburger glyph.
 *
 * Square 44×44 icon at mobile. At md+ with `showWord`, expands to include
 * the "Menu" / "Close" word beside the glyph (Fly4Me register).
 *
 * Pure transform/opacity only — never animate width/top/bottom.
 */
const HamburgerButton = ({
  open,
  onClick,
  onPointerDown,
  label,
  showWord = false,
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
      "hamburger-btn group relative z-10 inline-flex items-center justify-center shrink-0",
      "h-11 rounded-lg",
      showWord ? "w-11 md:w-auto md:gap-2.5 md:px-3" : "w-11",
      "text-foreground hover:bg-foreground/[0.06] active:scale-95",
      // iOS spring curve — quick attack on press, slow release.
      "transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    )}
  >
    <span className="hamburger-stage relative block h-3 w-[22px]" data-open={open}>
      <span className="hamburger-line hamburger-line--top    absolute left-0 right-0 h-[1.75px] bg-foreground rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-[2px]" />
      <span className="hamburger-line hamburger-line--bottom absolute left-0 right-0 h-[1.75px] bg-foreground rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-[2px]" />
    </span>
    {showWord && (
      <span className="hidden md:inline text-[13px] font-medium tracking-[-0.01em]">
        {open ? "Close" : "Menu"}
      </span>
    )}
  </button>
);

export default HamburgerButton;
