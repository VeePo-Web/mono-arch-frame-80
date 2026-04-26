import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

interface ServicePlateProps {
  service: Service;
  className?: string;
}

/**
 * ServicePlate — typographic plate used inside Services-overview cards.
 *
 * Same hairline-grid background and Fraunces-italic stamp as ProjectPlaceholder,
 * but anchored on the service's roman numeral and short promise instead of a
 * "photo pending" notice (services aren't waiting for photographs — they're
 * already abstract).
 */
const ServicePlate = ({ service, className }: ServicePlateProps) => (
  <div
    className={cn(
      "photo-pending photo-pending--service border-b border-border",
      className,
    )}
    role="img"
    aria-label={`${service.title} — service plate ${service.numeral}`}
    data-service-slug={service.slug}
  >
    <span className="numeral-disc relative z-10" aria-hidden="true">
      {service.numeral}
    </span>

    <p className="relative z-10 font-serif italic font-light text-foreground/80 text-[1.1rem] leading-snug max-w-[20ch] text-balance">
      {service.title}.
    </p>

    <span
      aria-hidden="true"
      className="relative z-10 block w-10 h-px bg-evergreen/30 mt-1"
    />

    <p className="relative z-10 text-minimal text-evergreen/75">
      Service No. {service.numeral}
    </p>
  </div>
);

export default ServicePlate;
