import type { ReactNode } from "react";

interface SectionHeaderProps {
  numeral?: string;          // e.g. "I", "II", "III"
  eyebrow: string;           // e.g. "THE PROMISE"
  headingId: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

/**
 * SectionHeader — quiet editorial section intro.
 * Per 2.3 §16: shorter copy blocks, stronger section titles, large negative space.
 * No heavy ornamentation — a numeral + hairline + label, then heading + optional serif italic subhead.
 */
const SectionHeader = ({
  numeral,
  eyebrow,
  headingId,
  heading,
  subheading,
  align = "left",
  children,
}: SectionHeaderProps) => {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignClass}`}>
      <div className="flex items-center gap-3 mb-5">
        {numeral && <span className="numeral-mark tabular-nums">{numeral}</span>}
        <span className="w-8 h-px bg-evergreen/30" aria-hidden="true" />
        <span className="text-minimal text-evergreen">{eyebrow}</span>
      </div>
      <h2 id={headingId} className="text-headline text-foreground mb-4 max-w-3xl">
        {heading}
      </h2>
      {subheading && (
        <p className="text-subhead text-muted-foreground max-w-2xl">{subheading}</p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
