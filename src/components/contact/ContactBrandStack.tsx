import havenCreekMark from "@/assets/logo/haven-creek-mark.webp";
import havenCreekWordmark from "@/assets/logo/haven-creek-horizontal.webp";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL } from "@/lib/studioContact";

const STUDIO_EMAIL = "cory@havencreekrenovations.com";
const STUDIO_LOCATION = "Foothills, AB";

/**
 * ContactBrandStack — left-aligned editorial stack for /contact desktop.
 *
 * Layered with the same craft chrome as EditorialHero — ghosted serif
 * "Contact" watermark, corner hairlines, per-word tagline cascade, and a
 * live evergreen meta dot on the location row — without disrupting the
 * directory grammar or the dark form panel to the right.
 */
const ContactBrandStack = () => {
  const taglineWords = "Trusted renovations for rural Alberta.".split(/(\s+)/);

  return (
    <div
      className="hidden lg:flex relative h-full w-full flex-col justify-center items-start text-left overflow-hidden"
      style={{ ["--about-hero-inset" as string]: "0px" }}
    >
      {/* Ghosted serif "Contact" watermark with drawing hair-rule */}
      <span
        aria-hidden="true"
        className="about-hero__watermark select-none pointer-events-none"
        style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
      >
        Contact
      </span>

      {/* Corner hairlines — scoped to this column */}
      <span aria-hidden="true" className="about-hero__corner about-hero__corner--tl" />
      <span aria-hidden="true" className="about-hero__corner about-hero__corner--br" />

      <div
        className="relative contact-cascade-item"
        style={{ ["--cascade-delay" as string]: "80ms" }}
      >
        <img
          src={havenCreekMark}
          alt=""
          width={140}
          height={140}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-[120px] w-auto object-contain"
          aria-hidden="true"
        />
      </div>

      <img
        src={havenCreekWordmark}
        alt="Haven Creek Renovations"
        width={280}
        height={48}
        loading="eager"
        decoding="async"
        className="contact-cascade-item relative mt-10 h-auto w-auto max-w-[260px] object-contain"
        style={{ ["--cascade-delay" as string]: "260ms" }}
      />

      <p
        className="contact-cascade-item relative mt-5 t-lede italic text-foreground/65 max-w-md"
        style={{ ["--cascade-delay" as string]: "420ms" }}
        aria-label="Trusted renovations for rural Alberta."
      >
        {taglineWords.map((w, i) => {
          if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
          const wordIndex = taglineWords.slice(0, i).filter((s) => !/^\s+$/.test(s)).length;
          return (
            <span
              key={i}
              className="about-hero__line"
              aria-hidden="true"
              style={{ ["--word-delay" as string]: `${520 + wordIndex * 80}ms` }}
            >
              <span className="about-hero__line-inner">{w}</span>
            </span>
          );
        })}
      </p>

      <div
        className="contact-cascade-item relative mt-16 w-full max-w-md"
        style={{ ["--cascade-delay" as string]: "600ms" }}
      >
        <p className="t-eyebrow text-evergreen/70 mb-5">Direct</p>
        <ul className="border-t border-foreground/12">
          <li className="border-b border-foreground/12">
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="group flex items-baseline justify-between gap-6 py-4"
            >
              <span className="t-body text-foreground transition-transform duration-500 ease-weighted group-hover:translate-x-1">
                {STUDIO_EMAIL}
              </span>
              <span className="t-micro text-foreground/45">EMAIL</span>
            </a>
          </li>
          <li className="border-b border-foreground/12">
            <a
              href={`tel:${STUDIO_PHONE_TEL}`}
              aria-label={`Call Haven Creek at ${STUDIO_PHONE_DISPLAY}`}
              className="group flex items-baseline justify-between gap-6 py-4"
            >
              <span className="t-body tabular-nums text-foreground transition-transform duration-500 ease-weighted group-hover:translate-x-1">
                {STUDIO_PHONE_DISPLAY}
              </span>
              <span className="t-micro text-foreground/45">PHONE</span>
            </a>
          </li>
          <li className="border-b border-foreground/12">
            <div className="flex items-baseline justify-between gap-6 py-4">
              <span className="inline-flex items-center gap-2.5 t-body text-foreground">
                <span aria-hidden="true" className="about-hero__live-dot" />
                {STUDIO_LOCATION}
              </span>
              <span className="t-micro text-foreground/45">STUDIO</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactBrandStack;
