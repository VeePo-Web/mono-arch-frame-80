import havenCreekMark from "@/assets/logo/haven-creek-mark.webp";
import havenCreekWordmark from "@/assets/logo/haven-creek-horizontal.webp";
import { STUDIO_PHONE_DISPLAY, STUDIO_PHONE_TEL } from "@/lib/studioContact";

/**
 * ContactBrandStack — left-column cinematic cascade for /contact desktop.
 *
 * Mirrors the Royal Mechanical message-overlay brand identity:
 * mark → hairline → wordmark → tagline → phone, each fading in with
 * a blur-to-sharp lift on its own delay. Pointer-events disabled
 * except the phone tel: link.
 */
const ContactBrandStack = () => {
  return (
    <div
      className="hidden lg:flex relative h-full w-full flex-col items-center justify-center px-10 pointer-events-none"
      aria-hidden="true"
    >
      {/* Brand mark */}
      <img
        src={havenCreekMark}
        alt=""
        width={480}
        height={480}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="contact-cascade-item h-[34vh] max-h-[380px] w-auto object-contain"
        style={{ ["--cascade-delay" as string]: "80ms" }}
      />

      {/* Evergreen hairline */}
      <div
        className="contact-cascade-item mt-10 mb-8 h-px w-28 bg-gradient-to-r from-transparent via-evergreen/60 to-transparent"
        style={{ ["--cascade-delay" as string]: "450ms" }}
      />

      {/* Wordmark */}
      <img
        src={havenCreekWordmark}
        alt=""
        width={360}
        height={60}
        loading="eager"
        decoding="async"
        className="contact-cascade-item h-auto w-auto max-w-[360px] object-contain"
        style={{ ["--cascade-delay" as string]: "550ms" }}
      />

      {/* Tagline */}
      <p
        className="contact-cascade-item mt-6 t-lede italic text-foreground/70 text-center"
        style={{ ["--cascade-delay" as string]: "700ms" }}
      >
        Trusted renovations for rural Alberta.
      </p>

      {/* Phone — only interactive element */}
      <a
        href={`tel:${STUDIO_PHONE_TEL}`}
        aria-hidden={false}
        aria-label={`Call Haven Creek at ${STUDIO_PHONE_DISPLAY}`}
        className="contact-cascade-item pointer-events-auto mt-10 inline-flex flex-col items-center gap-1 group"
        style={{ ["--cascade-delay" as string]: "850ms" }}
      >
        <span className="t-eyebrow text-evergreen/70 group-hover:text-evergreen transition-colors duration-300 ease-weighted">
          Call
        </span>
        <span className="font-serif text-3xl tabular-nums text-foreground transition-transform duration-300 ease-weighted group-hover:scale-[1.03]">
          {STUDIO_PHONE_DISPLAY}
        </span>
      </a>
    </div>
  );
};

export default ContactBrandStack;
