import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Wider editorial flair when needed (e.g. hero); default = 1280 max */
  size?: "default" | "wide";
}

/**
 * Single source of truth for content width + horizontal gutter.
 * Per knowledge/2.1 §Desktop: max 1180–1280px content with generous gutters.
 */
const Container = ({ children, size = "default", className, ...rest }: ContainerProps) => (
  <div
    className={cn(
      "mx-auto px-6 md:px-10 lg:px-14",
      size === "wide" ? "max-w-[1440px]" : "max-w-[1280px]",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);

export default Container;
