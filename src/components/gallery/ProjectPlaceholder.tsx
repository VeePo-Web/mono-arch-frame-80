import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/**
 * Generic plate shape — used by Work-page cards (driven by GalleryPlate)
 * and by anywhere else that wants the typographic "photo-pending" treatment.
 */
export interface PlateLike {
  slug: string;
  title: string;
  area: string;
  category?: string;
  /** Optional roman numeral — overrides the index-derived "01" if present. */
  romanNumeral?: string;
}

interface ProjectPlaceholderProps {
  /** Either a full Project (preview cards) or any PlateLike. */
  project: Project | PlateLike;
  index: number;
  /** Compact variant — smaller numeral, single-line meta, used in sidebars. */
  compact?: boolean;
  className?: string;
  /**
   * Optional photograph URL. When supplied, the plate renders the real image
   * with the same outer dimensions as the typographic shell, with the editorial
   * numeral + "Plate" mark layered on a soft gradient scrim so they always
   * read at WCAG-AA contrast. When absent, the original "Photograph in
   * progress" treatment is preserved for projects still being shot.
   */
  photoSrc?: string;
  /** Hint to eager-load (e.g. above-the-fold home gallery first card). */
  priority?: boolean;
}

/**
 * ProjectPlaceholder — editorial project plate.
 *
 * Two render modes share the same outer dimensions so swapping a typographic
 * placeholder for a real photograph causes zero layout shift:
 *
 *   1. Photograph mode (`photoSrc` set) — full-bleed `<img>` with a bottom
 *      gradient scrim, an italic "Plate {numeral}" mark, and the area name
 *      in tabular tracking. The image carries `data-photo-status="photographed"`.
 *
 *   2. Photo-pending mode (no `photoSrc`) — the original honest typographic
 *      plate carrying the numeral disc, "Photograph in progress." caption,
 *      hairline rule, and area name. Marked `data-photo-status="pending"`.
 *
 * Accepts a full Project or any PlateLike so it can drive Work-page cards
 * and Selected-Works sidebar rows from the same component.
 */
const ProjectPlaceholder = ({
  project,
  index,
  compact = false,
  className,
  photoSrc,
  priority = false,
}: ProjectPlaceholderProps) => {
  const figureMark =
    "romanNumeral" in project && project.romanNumeral
      ? project.romanNumeral
      : String(index + 1).padStart(2, "0");

  if (photoSrc) {
    return (
      <figure
        data-photo-status="photographed"
        data-project-slug={project.slug}
        className={cn(
          "photo-pending photo-pending--photographed border-b border-border relative overflow-hidden",
          compact && "photo-pending--compact",
          className,
        )}
      >
        <img
          src={photoSrc}
          alt={`${project.title} — ${project.area}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          width={1024}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-weighted will-change-transform"
        />

        {/* Bottom gradient scrim — guarantees AA contrast on caption */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(145 24% 8% / 0.55) 0%, hsl(145 24% 8% / 0.18) 55%, transparent 100%)",
          }}
        />

        {/* Top-left numeral, kept as the editorial signature */}
        <span
          className={cn(
            "absolute top-4 left-4 z-10 font-serif italic text-[1rem] tracking-tight",
            "text-background/90 drop-shadow-[0_1px_2px_hsl(145_24%_8%/0.55)]",
            compact && "text-[0.85rem] top-3 left-3",
          )}
          aria-hidden="true"
        >
          {figureMark}
        </span>

        {/* Bottom-left area + figcaption */}
        <figcaption
          className={cn(
            "absolute left-4 right-4 bottom-3 z-10 flex items-end justify-between gap-4",
            compact && "left-3 right-3 bottom-2",
          )}
        >
          <span
            className={cn(
              "text-[0.65rem] tracking-[0.2em] uppercase text-background/85",
              compact && "text-[0.6rem]",
            )}
          >
            {project.area}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
    <div
      data-photo-status="pending"
      data-project-slug={project.slug}
      className={cn(
        "photo-pending border-b border-border",
        compact && "photo-pending--compact",
        className,
      )}
      role="img"
      aria-label={`${project.title} — photograph in progress`}
    >
      <span
        className={cn(
          "numeral-disc relative z-10",
          compact && "scale-[0.78] origin-top-left",
        )}
        aria-hidden="true"
      >
        {figureMark}
      </span>

      <p
        className={cn(
          "relative z-10 font-serif italic font-light text-foreground/70 leading-snug max-w-[24ch] text-balance",
          compact ? "text-[0.92rem]" : "text-[1.05rem]",
        )}
      >
        Photograph in&nbsp;progress.
      </p>

      <span
        aria-hidden="true"
        className="relative z-10 block w-10 h-px bg-evergreen/30 mt-1"
      />

      <p className="relative z-10 text-minimal text-evergreen/75 tabular-nums">
        {project.area}
      </p>
    </div>
  );
};

export default ProjectPlaceholder;
