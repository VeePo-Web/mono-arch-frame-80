import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STAT, EYEBROW, BODY } from "@/lib/typography";

interface StatCardProps {
  /** The big number or short value (e.g. "12+", "4", "100%"). */
  value: ReactNode;
  /** Small label above the value. */
  label: string;
  /** One-line caption underneath. Keep ≤ 12 words. */
  caption?: string;
  className?: string;
}

/**
 * StatCard — a single trust-signal tile.
 * Bold serif number, eyebrow above, one-line caption below.
 * Built on the same `surface-card` language so it sits naturally in any grid.
 */
const StatCard = ({ value, label, caption, className }: StatCardProps) => (
  <div
    className={cn(
      "surface-card p-6 md:p-7 flex flex-col items-start text-left",
      className,
    )}
  >
    <span className={EYEBROW.stat}>{label}</span>
    <span className={cn(STAT.standard, "mt-3")}>{value}</span>
    {caption && (
      <p className={cn(BODY.caption, "mt-2 max-w-[28ch]")}>{caption}</p>
    )}
  </div>
);

export default StatCard;
