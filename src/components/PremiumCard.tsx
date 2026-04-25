import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  /** "default" plaster bezel · "evergreen" deep-tone bezel for the final CTA. */
  tone?: "default" | "evergreen";
  /** Extra class for the inner core. */
  coreClassName?: string;
  /** Featured emphasis — slightly darker ring at rest. */
  featured?: boolean;
  children: ReactNode;
}

/**
 * PremiumCard — Double-Bezel architecture.
 * Outer shell carries ambient haptic shadow + concentric ring + plaster wash.
 * Inner core carries the solid surface + inset top highlight.
 * The two share concentric radii via --r-shell / --r-core tokens.
 *
 * Used for Services preview, Project gallery, Final CTA panel, and Footer brand block.
 */
const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ tone = "default", className, coreClassName, featured, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bezel-shell",
        tone === "evergreen" && "bezel-shell-evergreen",
        featured && "ring-1 ring-evergreen/20",
        className,
      )}
      {...rest}
    >
      <div className={cn("bezel-core h-full", coreClassName)}>{children}</div>
    </div>
  ),
);
PremiumCard.displayName = "PremiumCard";

export default PremiumCard;
