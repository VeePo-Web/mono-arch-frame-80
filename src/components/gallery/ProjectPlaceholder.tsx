import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectPlaceholderProps {
  project: Project;
  index: number;
  className?: string;
}

/**
 * ProjectPlaceholder — honest, photo-pending project card.
 *
 * Per Sam's persona: photographs are the trust asset; synthetic illustrations
 * read as stand-ins and undermine trust. Until real photography is supplied,
 * this card tells the truth: numbered project, "Photograph in progress",
 * a hairline rule, then the project's location/year and category chip.
 *
 * Carries data-photo-status="pending" so a future loop can swap in a real
 * <img> element by replacing this slot — no other changes required.
 */
const ProjectPlaceholder = ({ project, index, className }: ProjectPlaceholderProps) => {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      data-photo-status="pending"
      data-project-slug={project.slug}
      className={cn(
        "photo-pending border-b border-border",
        className,
      )}
      role="img"
      aria-label={`${project.title} — photograph in progress`}
    >
      <span className="numeral-disc relative z-10" aria-hidden="true">
        {number}
      </span>

      <p className="relative z-10 font-serif italic font-light text-foreground/70 text-[1.05rem] leading-snug max-w-[24ch] text-balance">
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
