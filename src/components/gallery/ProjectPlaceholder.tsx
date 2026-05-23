import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/**
 * Generic plate shape — used by Work-page cards and anywhere else that wants
 * a calm photo tile (or a quiet typographic fallback when the photo is pending).
 */
export interface PlateLike {
  slug: string;
  title: string;
  area: string;
  category?: string;
}

interface ProjectPlaceholderProps {
  project: Project | PlateLike;
  index: number;
  compact?: boolean;
  className?: string;
  /** Optional photograph URL. When supplied, renders a clean full-bleed image. */
  photoSrc?: string;
  /** Hint to eager-load (e.g. above-the-fold first card). */
  priority?: boolean;
}

/**
 * ProjectPlaceholder — calm project tile.
 *
 * Photograph mode (`photoSrc` set): full-bleed image only — no Roman numeral
 * overlay, no "Plate" mark. The accompanying card text below the image
 * carries the title and area.
 *
 * Pending mode (no `photoSrc`): a quiet typographic fallback with title +
 * area — no numeral disc, no "Photograph in progress" caption.
 */
const ProjectPlaceholder = ({
  project,
  index: _index,
  compact = false,
  className,
  photoSrc,
  priority = false,
}: ProjectPlaceholderProps) => {
  if (photoSrc) {
    return (
      <figure
        data-photo-status="photographed"
        data-project-slug={project.slug}
        className={cn(
          "photo-pending photo-pending--photographed relative overflow-hidden",
          compact && "photo-pending--compact",
          className,
        )}
      >
        <img
          src={photoSrc}
          alt={project.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          width={1024}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-weighted will-change-transform"
        />
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
      aria-label={`${project.title} — ${project.area}`}
    >
      <p
        className={cn(
          "relative z-10 font-serif text-foreground/80 leading-snug max-w-[24ch] text-balance",
          compact ? "text-[1rem]" : "text-[1.15rem]",
        )}
      >
        {project.title}
      </p>
      <p className="relative z-10 mt-2 text-minimal text-evergreen/75 tabular-nums">
        {project.area}
      </p>
    </div>
  );
};

export default ProjectPlaceholder;
