import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";
import { HEADLINE, BODY } from "@/lib/typography";

/**
 * SectionHeader — the canonical eyebrow + H2 + lede trio.
 *
 * One header system for the whole site. Locks the spacing rhythm:
 *   Eyebrow → H2:    mt-5
 *   H2     → lede:   mt-5
 *   header → block:  mb-12 md:mb-16   (compact: mb-10 md:mb-14, "none": 0)
 *
 * Replaces every hand-built `<Eyebrow /> + <h2 className={cn(HEADLINE.section, …)}>
 * + <p className={BODY.large}>` trio that drifted across pages.
 *
 * USAGE
 *   <SectionHeader
 *     eyebrow="Where we work"
 *     title="Local, by choice."
 *     lede="Four communities — each different in pace, exposure, and care."
 *     id="areas-heading"
 *   />
 *
 *   <SectionHeader as="h3" eyebrow="·" title="Prefer to write or call?"
 *     compact bottomGap="none" />
 */

type Tone = "default" | "light";
type Align = "left" | "center";
type TitleWidth = "default" | "wide" | "narrow" | "none";
type BottomGap = "default" | "compact" | "none";
type As = "h2" | "h3";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lede?: string;
  /** id for the heading — also wire as `aria-labelledby` on the surrounding section. */
  id?: string;
  align?: Align;
  tone?: Tone;
  /** Caps the title width. default = max-w-[20ch], wide = [26ch], narrow = [16ch]. */
  titleWidth?: TitleWidth;
  /** Bottom margin on the wrapper. */
  bottomGap?: BottomGap;
  /** Add `data-drift` to the heading for the home/marquee Ken Burns rhyme. */
  drift?: boolean;
  /** Demote to <h3> + HEADLINE.subsection for nested sub-sections. */
  as?: As;
  className?: string;
}

const TITLE_WIDTH: Record<TitleWidth, string> = {
  default: "max-w-[20ch]",
  wide: "max-w-[26ch]",
  narrow: "max-w-[16ch]",
  none: "",
};

const BOTTOM_GAP: Record<BottomGap, string> = {
  default: "mb-12 md:mb-16",
  compact: "mb-10 md:mb-14",
  none: "",
};

const SectionHeader = ({
  eyebrow,
  title,
  lede,
  id,
  align = "left",
  tone = "default",
  titleWidth = "default",
  bottomGap = "default",
  drift = false,
  as = "h2",
  className,
}: SectionHeaderProps) => {
  const isLight = tone === "light";
  const isCenter = align === "center";
  const Heading = as;

  const headingTypeClass = as === "h2" ? HEADLINE.section : HEADLINE.subsection;
  const headingColor = isLight ? "text-background" : "text-foreground";
  const ledeColor = isLight ? "text-background/85" : undefined; // BODY.large already has text-foreground/85

  return (
    <div
      className={cn(
        "max-w-[62ch]",
        isCenter && "mx-auto text-center",
        BOTTOM_GAP[bottomGap],
        className,
      )}
    >
      <Eyebrow label={eyebrow} align={align} tone={isLight ? "light" : "default"} />
      <Heading
        id={id}
        data-drift={drift ? "" : undefined}
        className={cn(
          headingTypeClass,
          "mt-5",
          headingColor,
          TITLE_WIDTH[titleWidth],
          isCenter && titleWidth !== "none" && "mx-auto",
        )}
      >
        {title}
      </Heading>
      {lede && (
        <p
          className={cn(
            BODY.large,
            "mt-5 max-w-[58ch]",
            ledeColor,
            isCenter && "mx-auto",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
