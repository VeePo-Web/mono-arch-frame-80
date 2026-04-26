import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import { HEADLINE, BODY, EYEBROW, UI } from "@/lib/typography";

interface InfoCardProps {
  /** Optional eyebrow above title (e.g. "01" or "INTERIOR"). */
  eyebrow?: string;
  /** Card title — kept short, 2-6 words ideal. */
  title: string;
  /** Card body — capped at ~22 words for scannability. */
  body: string;
  /** Optional link — renders as "Learn more" arrow row. */
  to?: string;
  /** Link label override. */
  linkLabel?: string;
  /** Optional leading icon / numeral. */
  leading?: ReactNode;
  /** Featured emphasis — adds an evergreen tinted border. */
  featured?: boolean;
  className?: string;
}

/**
 * InfoCard — the workhorse "list item as card" primitive.
 * Always a clear box with eyebrow, title, 2-line body, optional CTA.
 * Replaces stacked unboxed paragraphs for any group of 3+ peer items.
 */
const InfoCard = ({
  eyebrow,
  title,
  body,
  to,
  linkLabel = "Learn more",
  leading,
  featured = false,
  className,
}: InfoCardProps) => {
  const inner = (
    <div className="relative p-7 md:p-8 flex flex-col h-full">
      {leading && <div className="mb-5">{leading}</div>}
      {eyebrow && <span className={EYEBROW.standard}>{eyebrow}</span>}
      <h3 className={cn(HEADLINE.card, "mt-3 text-foreground group-hover/info:text-evergreen transition-colors duration-500")}>
        {title}
      </h3>
      <p className={cn(BODY.card, "mt-3 flex-1")}>{body}</p>
      {to && (
        <span className={cn(UI.link, "mt-6 inline-flex items-center gap-2 text-evergreen")}>
          <span>{linkLabel}</span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-500 ease-swift group-hover/info:translate-x-0.5 group-hover/info:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );

  const baseClasses = cn(
    "surface-card group/info h-full block",
    featured && "surface-card-featured",
    className,
  );

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

export default InfoCard;
