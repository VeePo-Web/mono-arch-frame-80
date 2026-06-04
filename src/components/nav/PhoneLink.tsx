import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { STUDIO_PHONE_TEL, STUDIO_PHONE_DISPLAY } from "@/lib/studioContact";

/**
 * PhoneLink — desktop-only (lg+) phone affordance in the nav right cluster.
 * Color blends with --nav-progress (cream over hero → foreground when scrolled);
 * hover → evergreen. Hidden below lg.
 */
const PhoneLink = () => (
  <a
    href={`tel:${STUDIO_PHONE_TEL}`}
    aria-label={`Call studio at ${STUDIO_PHONE_DISPLAY}`}
    className={cn(
      "nav-phone hidden lg:inline-flex items-center gap-1.5",
      "text-[14px] font-medium tracking-[-0.01em] leading-none",
      "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    )}
  >
    <Phone size={14} strokeWidth={2} aria-hidden="true" />
    <span>{STUDIO_PHONE_DISPLAY}</span>
  </a>
);

export default PhoneLink;
