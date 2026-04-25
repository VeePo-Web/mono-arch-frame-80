import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Retained for back-compat — visual treatment is now uniform. */
  tone?: "default" | "evergreen";
  /** Extra class for the inner core. */
  coreClassName?: string;
  /** Featured emphasis — slightly more prominent border. */
  featured?: boolean;
  children: ReactNode;
}

/**
 * PremiumCard — single flat editorial surface.
 * The double-bezel chain was retired in the declutter pass; one paper-soft
 * shadow + one hairline border carries every card on the site.
 */
const PremiumCard = forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, coreClassName, featured, children, tone: _tone, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "surface-card",
        featured && "surface-card-featured",
        className,
      )}
      {...rest}
    >
      <div className={cn("h-full", coreClassName)}>{children}</div>
    </div>
  ),
);
PremiumCard.displayName = "PremiumCard";

export default PremiumCard;
