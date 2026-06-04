import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * ScrollCue — subtle Fantasy.co-style bottom-of-hero scroll affordance.
 * Tiny eyebrow label + 1px vertical rule + chevron, gentle infinite bob.
 * Fades out once the user scrolls past 80px.
 */
const ScrollCue = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-10 flex flex-col items-center gap-3 transition-opacity duration-500 ease-weighted"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      <span className="t-micro text-foreground/50">Scroll</span>
      <span className="scroll-cue-bob inline-flex flex-col items-center gap-1">
        <span className="block h-10 w-px bg-foreground/30" />
        <ChevronDown size={14} className="text-foreground/50" strokeWidth={1.5} />
      </span>
    </div>
  );
};

export default ScrollCue;
