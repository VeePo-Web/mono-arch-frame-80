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
}

/**
 * ProjectPlaceholder — honest, photo-pending plate.
 *
 * Per Sam's persona: photographs are the primary trust asset; synthetic
 * line-drawings read as stand-ins on second glance. Until real photography
 * arrives, this card tells the truth: a numbered figure, "Photograph in
 * progress", a hairline, then the property's locality.
 *
 * Accepts a full Project or any plate-like object so it can drive Work-page
 * cards and Selected-Works sidebar rows from the same component.
 *
 * Carries `data-photo-status="pending"` so a future loop can swap in a
 * real `<img>` element by replacing this slot — no other changes needed.
 */
const ProjectPlaceholder = ({
  project,
  index,
  compact = false,
  className,
}: ProjectPlaceholderProps) => {
  const figureMark =
    "romanNumeral" in project && project.romanNumeral
      ? project.romanNumeral
      : String(index + 1).padStart(2, "0");

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
