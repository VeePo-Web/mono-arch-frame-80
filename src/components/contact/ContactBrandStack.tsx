import havenCreekMark from "@/assets/logo/haven-creek-mark.webp";
import havenCreekWordmark from "@/assets/logo/haven-creek-horizontal.webp";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL } from "@/lib/studioContact";

const STUDIO_EMAIL = "cory@havencreekrenovations.com";
const STUDIO_LOCATION = "Foothills, AB";

/**
 * ContactBrandStack — left-aligned editorial stack for /contact desktop.
 *
 * Fantasy.co-style: quiet logo + wordmark + tagline up top, then a small
 * directory of direct-contact rows pinned to the lower half of the column.
 * Everything left-justified, generous whitespace, no centered cascade.
 */
const ContactBrandStack = () => {
  return (
    <div
      className="hidden lg:flex relative h-full w-full flex-col justify-center items-start text-left"
    >
      <div className="contact-cascade-item" style={{ ["--cascade-delay" as string]: "80ms" }}>
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
        className="contact-cascade-item mt-10 h-auto w-auto max-w-[260px] object-contain"
        style={{ ["--cascade-delay" as string]: "260ms" }}
      />

      <p
        className="contact-cascade-item mt-5 t-lede italic text-foreground/65 max-w-md"
        style={{ ["--cascade-delay" as string]: "420ms" }}
      >
        Trusted renovations for rural Alberta.
      </p>

      <div
        className="contact-cascade-item mt-16 w-full max-w-md"
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
              <span className="t-body text-foreground">{STUDIO_LOCATION}</span>
              <span className="t-micro text-foreground/45">STUDIO</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactBrandStack;
