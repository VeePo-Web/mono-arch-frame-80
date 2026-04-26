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
const Container = ({ children, size = "default", className, style, ...rest }: ContainerProps) => (
  <div
    className={cn(
      // Mobile floor 20px → recovers 8px of usable width on 320–375px phones.
      // sm+ keeps the existing 24px paper margin; md/lg unchanged.
      "mx-auto px-5 sm:px-6 md:px-12 lg:px-20",
      size === "wide" ? "max-w-[1360px]" : "max-w-[1200px]",
      className,
    )}
    // Honour iOS notched-landscape safe area without changing portrait gutters.
    style={{
      paddingLeft: "max(var(--safe-left, 0px), 0px)",
      paddingRight: "max(var(--safe-right, 0px), 0px)",
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
