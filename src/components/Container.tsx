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
      "mx-auto px-6 md:px-12 lg:px-20",
      size === "wide" ? "max-w-[1360px]" : "max-w-[1200px]",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
