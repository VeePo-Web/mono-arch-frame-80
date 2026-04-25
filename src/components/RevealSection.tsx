import type { HTMLAttributes, PropsWithChildren } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * RevealSection — wires a single IntersectionObserver to its subtree.
 * Children using `data-reveal` resolve in cascade via --reveal-delay tokens.
 * Lifted from Index.tsx so every page can share the exact same reveal cadence.
 */
const RevealSection = ({
  children,
  className,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold: 0.12 });
  return (
    <section ref={ref} data-revealed={revealed} className={className} {...rest}>
      {children}
    </section>
  );
};

export default RevealSection;
