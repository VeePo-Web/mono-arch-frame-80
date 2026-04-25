import { cn } from "@/lib/utils";

interface EyebrowProps {
  numeral?: string;
  label: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "light";
}

/**
 * Numeral · hairline · label — the editorial eyebrow used across every section.
 * Mirrors the masthead language of a thoughtful magazine (per 2.3 §16).
 */
const Eyebrow = ({ numeral, label, align = "left", className, tone = "default" }: EyebrowProps) => {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      {numeral && (
        <span
          className={cn(
            "numeral-mark tabular-nums",
            isLight && "text-background/70",
          )}
        >
          {numeral}
        </span>
      )}
      <span
        className={cn(
          "h-px w-8",
          isLight ? "bg-background/40" : "bg-evergreen/30",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "text-minimal",
          isLight ? "text-background/80" : "text-evergreen",
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default Eyebrow;
