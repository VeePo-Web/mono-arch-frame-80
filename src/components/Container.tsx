import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Wider editorial flair when needed (e.g. hero); default = 1240 max */
  size?: "default" | "wide";
}

/**
 * Single source of truth for content width + horizontal gutter.
 * Editorial gutters: 24 / 48 / 80px to give pages magazine-margin breathing room.
 */
const Container = ({ children, size = "default", className, ...rest }: ContainerProps) => (
  <div
    className={cn(
      // Mobile floor uses max() so iOS notched-landscape safe-area insets
      // cannot push text under the speaker cutout. sm+ keeps the existing
      // 24px paper margin; md/lg are byte-for-byte unchanged.
      "mx-auto",
      "pl-[max(1.25rem,env(safe-area-inset-left))]",
      "pr-[max(1.25rem,env(safe-area-inset-right))]",
      "sm:pl-6 sm:pr-6 md:px-12 lg:px-20",
      size === "wide" ? "max-w-[1360px]" : "max-w-[1200px]",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
