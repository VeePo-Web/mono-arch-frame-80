import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";

interface ServicePlateProps {
  service: Service;
  className?: string;
  /**
   * Optional photograph URL. When supplied, the plate renders the real image
   * with the editorial numeral mark layered over a gradient scrim so it
   * always meets WCAG-AA contrast. When absent, the typographic plate is
   * preserved.
   */
  photoSrc?: string;
}

/**
 * ServicePlate — editorial service plate.
 *
 * Two render modes share outer dimensions so swapping in a real photograph
 * causes zero layout shift:
 *   1. Photograph mode (`photoSrc` set) — full-bleed `<img>` + gradient scrim
 *      + small italic numeral overlay.
 *   2. Typographic mode (no `photoSrc`) — original numeral-disc + service
 *      title plate.
 */
const ServicePlate = ({ service, className, photoSrc }: ServicePlateProps) => {
  if (photoSrc) {
    return (
      <figure
        className={cn(
          "photo-pending photo-pending--service photo-pending--photographed border-b border-border relative overflow-hidden",
          className,
        )}
        data-service-slug={service.slug}
        data-photo-status="photographed"
      >
        <img
          src={photoSrc}
          alt={`${service.title} — ${service.promise}`}
          loading="lazy"
          decoding="async"
          width={1024}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-weighted will-change-transform"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, hsl(145 24% 8% / 0.6) 0%, hsl(145 24% 8% / 0.2) 55%, transparent 100%)",
          }}
        />

        <span
          className="absolute top-4 left-4 z-10 font-serif italic text-[1rem] text-background/90 drop-shadow-[0_1px_2px_hsl(145_24%_8%/0.55)]"
          aria-hidden="true"
        >
          {service.numeral}
        </span>

        <figcaption className="absolute left-4 right-4 bottom-3 z-10">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-background/85">
            Service No. {service.numeral}
          </span>
        </figcaption>
      </figure>
    );
  }

  return (
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
};

export default ServicePlate;
