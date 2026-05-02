import { cn } from "@/lib/utils";

/**
 * SectionTransition — cinematic gradient bleed between adjacent sections.
 *
 * Uses oklch color-mix for perceptually smooth interpolation. "dramatic"
 * intensity gives a 6-stop gradient for high-contrast (light↔dark) crossings;
 * "normal" gives a calmer 4-stop. A radial softener layer fades the edges so
 * the seam never reads as a hard band.
 *
 * Heights deliberately compact — we want a breath of pacing, not a wall.
 */

const COLOR_MAP = {
  cream: "hsl(var(--background))",
  evergreen: "hsl(var(--evergreen-deep))",
} as const;

type SectionColor = keyof typeof COLOR_MAP;

interface SectionTransitionProps {
  from: SectionColor;
  to: SectionColor;
  intensity?: "normal" | "dramatic";
  /** Tailwind height utility override, e.g. "h-24". */
  height?: string;
}

const SectionTransition = ({
  from,
  to,
  intensity = "normal",
  height,
}: SectionTransitionProps) => {
  const fromColor = COLOR_MAP[from];
  const toColor = COLOR_MAP[to];
  const isSame = from === to;
  const isDramatic = intensity === "dramatic";

  const gradient = (() => {
    if (isDramatic) {
      const s1 = `color-mix(in oklch, ${fromColor} 85%, ${toColor} 15%)`;
      const s2 = `color-mix(in oklch, ${fromColor} 60%, ${toColor} 40%)`;
      const s3 = `color-mix(in oklch, ${fromColor} 30%, ${toColor} 70%)`;
      const s4 = `color-mix(in oklch, ${fromColor} 10%, ${toColor} 90%)`;
      return `linear-gradient(to bottom, ${fromColor} 0%, ${s1} 15%, ${s2} 35%, ${s3} 60%, ${s4} 85%, ${toColor} 100%)`;
    }
    if (isSame) return fromColor;
    const mid = `color-mix(in oklch, ${fromColor} 35%, ${toColor} 65%)`;
    return `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 6%, ${mid} 50%, ${toColor} 94%, ${toColor} 100%)`;
  })();

  const radialOverlay = !isSame
    ? `radial-gradient(ellipse at center, transparent 35%, ${toColor} 100%)`
    : undefined;

  const heightClass =
    height || (isDramatic ? "h-16 sm:h-28 lg:h-40" : "h-8 sm:h-16 lg:h-24");

  return (
    <div
      aria-hidden="true"
      className={cn("w-full relative", heightClass)}
      style={{ background: gradient, contain: "layout style" }}
    >
      {radialOverlay && (
        <div
          className={isDramatic ? "absolute inset-0 opacity-30" : "absolute inset-0 opacity-15"}
          style={{ background: radialOverlay }}
        />
      )}
    </div>
  );
};

export default SectionTransition;
