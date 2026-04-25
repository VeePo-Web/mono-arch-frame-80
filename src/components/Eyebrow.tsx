import { cn } from "@/lib/utils";

interface EyebrowProps {
  /** @deprecated retained for backwards-compat; ignored. */
  numeral?: string;
  label: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "light";
}

/**
 * Editorial eyebrow — a single hairline + label.
 * One label system across the whole site (ornament passed to .eyebrow / coord
 * marks / figmarks / numerals was retired in the editorial declutter pass).
 */
const Eyebrow = ({ label, align = "left", className, tone = "default" }: EyebrowProps) => {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span
        className={cn("h-px w-8", isLight ? "bg-background/40" : "bg-evergreen/35")}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-minimal",
          isLight ? "text-background/80" : "text-evergreen/90",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default Eyebrow;
