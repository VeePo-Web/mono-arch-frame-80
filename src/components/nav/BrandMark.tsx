import logoDark from "@/assets/logo/haven-creek-horizontal.webp";
import logoCream from "@/assets/logo/haven-creek-horizontal-white.webp";

/**
 * BrandMark — two-layer crossfade.
 *
 * Dark mark is the base; cream mark sits absolute on top with opacity
 * driven by `--nav-progress` (0..1). At scrollY=0 over a hero/cinematic
 * photo, the cream layer reads fully; after ~80px scroll it crossfades
 * to the dark mark. 320ms `var(--ease-swift)` on opacity.
 */
const BrandMark = () => (
  <span className="brand-mark__stack relative inline-block">
    <img
      src={logoDark}
      alt="Haven Creek Renovations"
      width={200}
      height={36}
      className="h-9 md:h-10 lg:h-11 w-auto block select-none"
      {...({ fetchpriority: "high" } as Record<string, string>)}
      decoding="async"
      draggable={false}
    />
    <img
      src={logoCream}
      alt=""
      aria-hidden="true"
      width={200}
      height={36}
      className="brand-mark__cream pointer-events-none absolute inset-0 h-9 md:h-10 lg:h-11 w-auto block select-none"
      decoding="async"
      draggable={false}
      style={{ opacity: "calc(1 - var(--nav-progress, 0))" }}
    />
  </span>
);

export default BrandMark;
