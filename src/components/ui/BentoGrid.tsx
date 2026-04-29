import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import { HEADLINE, BODY, EYEBROW, UI } from "@/lib/typography";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  /** Layout preset. `2x2` = four equal tiles. `1+2` = one large + two small. */
  layout?: "2x2" | "1+2" | "auto";
}

/**
 * BentoGrid — asymmetric card grid for scan-first reading.
 * Use when a section lists 3-6 peer items. Stacks 1-up on mobile.
 */
export const BentoGrid = ({ children, className, layout = "auto" }: BentoGridProps) => {
  const layoutClasses = {
    "2x2": "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
    "1+2": "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
    auto: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6",
  } as const;
  return <div className={cn(layoutClasses[layout], className)}>{children}</div>;
};

interface BentoTileProps {
  eyebrow?: string;
  title: string;
  body?: string;
  to?: string;
  /** Make this tile span 2 columns (used in `1+2` layout for the lead tile). */
  span?: "default" | "wide" | "tall";
  className?: string;
  /** Optional leading slot — for icons, big stat numbers, etc. */
  leading?: ReactNode;
  /** Compact tile — eyebrow + title only, smaller padding. For dense itemized grids. */
  compact?: boolean;
}

/**
 * BentoTile — one cell in a BentoGrid. Card surface, scannable hierarchy.
 */
export const BentoTile = ({
  eyebrow,
  title,
  body,
  to,
  span = "default",
  className,
  leading,
  compact = false,
}: BentoTileProps) => {
  const spanClass =
    span === "wide" ? "md:col-span-2" : span === "tall" ? "md:row-span-2" : "";

  const padding = compact ? "p-5 md:p-6" : "p-6 md:p-7";

  const inner = (
    <div className={cn("relative flex flex-col h-full", padding)}>
      {leading && <div className="mb-4">{leading}</div>}
      {eyebrow && <span className={EYEBROW.standard}>{eyebrow}</span>}
      <h3
        className={cn(
          compact ? HEADLINE.compact : HEADLINE.compact,
          "mt-2.5 text-foreground group-hover/tile:text-evergreen transition-colors duration-500",
        )}
      >
        {title}
      </h3>
      {body && <p className={cn(BODY.card, "mt-3 flex-1")}>{body}</p>}
      {to && (
        <span className={cn(UI.link, "mt-5 inline-flex items-center gap-2 text-evergreen")}>
          <span>Open</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-swift group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );

  const baseClasses = cn("surface-card group/tile h-full block", spanClass, className);

  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          baseClasses,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        )}
      >
        {inner}
      </Link>
    );
  }
  return <div className={baseClasses}>{inner}</div>;
};

export default BentoGrid;
