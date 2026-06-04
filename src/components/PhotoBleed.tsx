/**
 * PhotoBleed — silent, full-viewport-width photograph between text sections.
 *
 * A quiet visual exhale. Cream background dissolves softly into the top and
 * bottom of the image so there is never a hard banner seam. No overlay text,
 * no caption, no CTA — the photograph is the moment.
 *
 * Escapes any parent `<Container>` via `w-screen` + centered translate trick.
 */
type PhotoBleedProps = {
  src: string;
  alt: string;
  /** CSS `object-position` value. Defaults to `50% 50%`. */
  position?: string;
  /** Optional override for image priority. Defaults to lazy. */
  priority?: boolean;
};

const PhotoBleed = ({ src, alt, position = "50% 50%", priority = false }: PhotoBleedProps) => {
  return (
    <section
      aria-hidden="true"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
    >
      <div className="relative min-h-[35svh] md:min-h-[48vh] lg:min-h-[52vh]">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover scale-[1.04]"
          style={{ objectPosition: position, filter: "blur(2px) saturate(0.92)" }}
        />

        {/* Warm cream wash — mutes the photo further so it whispers */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "hsl(var(--background) / 0.22)" }}
        />

        {/* Top dissolve — cream melts deep into the photo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 md:h-56 lg:h-72"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 35%, hsl(var(--background) / 0.4) 70%, transparent 100%)",
          }}
        />

        {/* Bottom dissolve — cream rises */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56 lg:h-72"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 35%, hsl(var(--background) / 0.4) 70%, transparent 100%)",
          }}
        />
      </div>


    </section>
  );
};

export default PhotoBleed;
