/**
 * GalleryVignettes — six architectural line drawings for Selected Works.
 * Same visual language as ProjectVignette: evergreen ink (0.20–0.55 opacity)
 * on plaster fill, draftsman's-note dimension marks, ~600 bytes each.
 *
 * Six plates × two per category. Drawn at 320×240 viewBox to match preview.
 */

import type { PlateVignetteKey } from "@/data/galleryPlates";

interface VignetteProps {
  className?: string;
}

const baseSvgProps = {
  viewBox: "0 0 320 240",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true" as const,
  preserveAspectRatio: "xMidYMid meet" as const,
};

/* ── Interior I — refined trim & transition (Bragg Creek) ─────────────── */
export const InteriorTrimVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Floor + baseboard */}
    <line x1="0" y1="190" x2="320" y2="190" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.9" />
    <line x1="0" y1="194" x2="320" y2="194" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Door opening */}
    <line x1="80" y1="40" x2="80" y2="190" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="84" y1="44" x2="84" y2="190" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    <line x1="220" y1="40" x2="220" y2="190" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="216" y1="44" x2="216" y2="190" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Header trim */}
    <line x1="74" y1="40" x2="226" y2="40" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="74" y1="36" x2="226" y2="36" stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55" />
    {/* Transition strip on floor */}
    <line x1="78" y1="187" x2="222" y2="187" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Mitered corner detail */}
    <line x1="80" y1="40" x2="84" y2="44" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.5" />
    <line x1="220" y1="40" x2="216" y2="44" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.5" />
    {/* Plumb dimension marks */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="56" y1="40" x2="64" y2="40" />
      <line x1="60" y1="40" x2="60" y2="190" />
      <line x1="56" y1="190" x2="64" y2="190" />
    </g>
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="80" y1="210" x2="80" y2="218" />
      <line x1="80" y1="214" x2="220" y2="214" />
      <line x1="220" y1="210" x2="220" y2="218" />
    </g>
  </svg>
);

/* ── Interior II — built-in shelving (Water Valley) ───────────────────── */
export const InteriorShelvingVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Floor */}
    <line x1="0" y1="200" x2="320" y2="200" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.9" />
    {/* Cabinet outer frame */}
    <rect x="50" y="40" width="220" height="160" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <rect x="54" y="44" width="212" height="152" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Vertical dividers */}
    <line x1="120" y1="44" x2="120" y2="196" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.8" />
    <line x1="200" y1="44" x2="200" y2="196" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.8" />
    {/* Horizontal shelves */}
    <g stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7">
      <line x1="54" y1="80" x2="266" y2="80" />
      <line x1="54" y1="118" x2="266" y2="118" />
      <line x1="54" y1="156" x2="266" y2="156" />
    </g>
    {/* Book silhouettes — simple vertical strokes */}
    <g stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.9" strokeLinecap="square">
      <line x1="62" y1="50" x2="62" y2="78" />
      <line x1="68" y1="52" x2="68" y2="78" />
      <line x1="74" y1="48" x2="74" y2="78" />
      <line x1="80" y1="54" x2="80" y2="78" />
      <line x1="88" y1="50" x2="88" y2="78" />
      <line x1="96" y1="52" x2="96" y2="78" />
      <line x1="104" y1="48" x2="104" y2="78" />
    </g>
    <g stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.9" strokeLinecap="square">
      <line x1="128" y1="86" x2="128" y2="116" />
      <line x1="136" y1="88" x2="136" y2="116" />
      <line x1="144" y1="84" x2="144" y2="116" />
      <line x1="152" y1="90" x2="152" y2="116" />
      <line x1="162" y1="86" x2="162" y2="116" />
      <line x1="172" y1="88" x2="172" y2="116" />
      <line x1="182" y1="84" x2="182" y2="116" />
    </g>
    {/* Baseboard return */}
    <line x1="50" y1="194" x2="270" y2="194" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.8" />
    {/* Plumb mark */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="30" y1="40" x2="38" y2="40" />
      <line x1="34" y1="40" x2="34" y2="200" />
      <line x1="30" y1="200" x2="38" y2="200" />
    </g>
  </svg>
);

/* ── Exterior I — refined siding repair (Rocky View) ──────────────────── */
export const ExteriorSidingVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Roof edge */}
    <line x1="20" y1="50" x2="300" y2="50" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="20" y1="54" x2="300" y2="54" stroke="hsl(var(--evergreen) / 0.25)" strokeWidth="0.5" />
    {/* Soffit */}
    <line x1="20" y1="68" x2="300" y2="68" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Fascia ends */}
    <line x1="20" y1="50" x2="20" y2="68" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    <line x1="300" y1="50" x2="300" y2="68" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    {/* Siding board lines */}
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55">
      <line x1="20" y1="86" x2="300" y2="86" />
      <line x1="20" y1="100" x2="300" y2="100" />
      <line x1="20" y1="114" x2="300" y2="114" />
      <line x1="20" y1="128" x2="300" y2="128" />
      <line x1="20" y1="142" x2="300" y2="142" />
      <line x1="20" y1="156" x2="300" y2="156" />
      <line x1="20" y1="170" x2="300" y2="170" />
      <line x1="20" y1="184" x2="300" y2="184" />
    </g>
    {/* Repair patch — denser strokes over a region */}
    <g stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.8">
      <line x1="120" y1="100" x2="200" y2="100" />
      <line x1="120" y1="114" x2="200" y2="114" />
      <line x1="120" y1="128" x2="200" y2="128" />
      <line x1="120" y1="142" x2="200" y2="142" />
    </g>
    {/* Patch outline marker */}
    <rect x="118" y="92" width="84" height="60" stroke="hsl(var(--bark) / 0.50)" strokeWidth="0.45" strokeDasharray="3 2" />
    {/* Ground line */}
    <line x1="0" y1="210" x2="320" y2="210" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
  </svg>
);

/* ── Exterior II — soffit & fascia (Bearspaw) ─────────────────────────── */
export const ExteriorSoffitVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Gable peak */}
    <path d="M 20 130 L 160 40 L 300 130" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <path d="M 22 134 L 160 46 L 298 134" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Soffit underside */}
    <line x1="20" y1="130" x2="20" y2="140" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    <line x1="300" y1="130" x2="300" y2="140" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    <line x1="20" y1="140" x2="300" y2="140" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Vent slats — three groups along the soffit */}
    <g stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.55">
      <line x1="70" y1="133" x2="100" y2="133" />
      <line x1="70" y1="136" x2="100" y2="136" />
      <line x1="145" y1="133" x2="175" y2="133" />
      <line x1="145" y1="136" x2="175" y2="136" />
      <line x1="220" y1="133" x2="250" y2="133" />
      <line x1="220" y1="136" x2="250" y2="136" />
    </g>
    {/* Wall siding hint */}
    <g stroke="hsl(var(--evergreen) / 0.25)" strokeWidth="0.5">
      <line x1="40" y1="160" x2="280" y2="160" />
      <line x1="40" y1="174" x2="280" y2="174" />
      <line x1="40" y1="188" x2="280" y2="188" />
      <line x1="40" y1="202" x2="280" y2="202" />
    </g>
    {/* Wall outline */}
    <line x1="40" y1="140" x2="40" y2="210" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.7" />
    <line x1="280" y1="140" x2="280" y2="210" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.7" />
    {/* Ground */}
    <line x1="0" y1="218" x2="320" y2="218" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    {/* Pitch annotation */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="180" y1="60" x2="200" y2="60" />
      <line x1="200" y1="60" x2="200" y2="80" />
    </g>
  </svg>
);

/* ── Decking I — wraparound (Bearspaw) ────────────────────────────────── */
export const DeckingWraparoundVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* House wall (back) */}
    <line x1="0" y1="60" x2="320" y2="60" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="0" y1="64" x2="320" y2="64" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Wraparound deck plan — L-shape outline */}
    <path
      d="M 30 90 L 180 90 L 180 130 L 290 130 L 290 200 L 30 200 Z"
      stroke="hsl(var(--evergreen) / 0.55)"
      strokeWidth="1"
    />
    {/* Deck boards (parallel) */}
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55">
      <line x1="30" y1="104" x2="180" y2="104" />
      <line x1="30" y1="118" x2="180" y2="118" />
      <line x1="30" y1="132" x2="290" y2="132" />
      <line x1="30" y1="146" x2="290" y2="146" />
      <line x1="30" y1="160" x2="290" y2="160" />
      <line x1="30" y1="174" x2="290" y2="174" />
      <line x1="30" y1="188" x2="290" y2="188" />
    </g>
    {/* Railing posts (top edge) */}
    <g stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.9">
      <line x1="40" y1="86" x2="40" y2="94" />
      <line x1="80" y1="86" x2="80" y2="94" />
      <line x1="120" y1="86" x2="120" y2="94" />
      <line x1="160" y1="86" x2="160" y2="94" />
      <line x1="200" y1="126" x2="200" y2="134" />
      <line x1="240" y1="126" x2="240" y2="134" />
      <line x1="280" y1="126" x2="280" y2="134" />
    </g>
    {/* Tree silhouette */}
    <path d="M 20 60 L 20 30 M 20 30 L 10 18 L 20 6 L 30 18 Z" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.8" />
    {/* Plan annotation */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="30" y1="216" x2="290" y2="216" />
      <line x1="30" y1="212" x2="30" y2="220" />
      <line x1="290" y1="212" x2="290" y2="220" />
    </g>
  </svg>
);

/* ── Decking II — step-down platform (Water Valley) ───────────────────── */
export const DeckingStepDownVignette = ({ className }: VignetteProps) => (
  <svg {...baseSvgProps} className={className}>
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Grade line — sloped */}
    <path d="M 0 200 L 140 200 L 200 218 L 320 218" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    {/* Upper platform */}
    <line x1="40" y1="120" x2="180" y2="120" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="40" y1="124" x2="180" y2="124" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    <line x1="40" y1="120" x2="40" y2="200" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.9" />
    <line x1="180" y1="120" x2="180" y2="160" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.9" />
    {/* Step / stringer */}
    <path d="M 180 160 L 220 160 L 220 180 L 260 180 L 260 200" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    {/* Lower platform */}
    <line x1="180" y1="180" x2="290" y2="180" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Upper platform boards */}
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55">
      <line x1="40" y1="132" x2="180" y2="132" />
      <line x1="40" y1="142" x2="180" y2="142" />
      <line x1="40" y1="152" x2="180" y2="152" />
    </g>
    {/* Railing */}
    <line x1="40" y1="90" x2="180" y2="90" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.8" />
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.5">
      <line x1="60" y1="92" x2="60" y2="120" />
      <line x1="80" y1="92" x2="80" y2="120" />
      <line x1="100" y1="92" x2="100" y2="120" />
      <line x1="120" y1="92" x2="120" y2="120" />
      <line x1="140" y1="92" x2="140" y2="120" />
      <line x1="160" y1="92" x2="160" y2="120" />
    </g>
    {/* Tree */}
    <path d="M 290 200 L 290 170 M 290 170 L 280 158 L 290 146 L 300 158 Z" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.8" />
    {/* Elevation tick */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="20" y1="120" x2="28" y2="120" />
      <line x1="24" y1="120" x2="24" y2="200" />
      <line x1="20" y1="200" x2="28" y2="200" />
    </g>
  </svg>
);

const VIGNETTES: Record<PlateVignetteKey, (props: VignetteProps) => JSX.Element> = {
  "interior-trim": InteriorTrimVignette,
  "interior-shelving": InteriorShelvingVignette,
  "exterior-siding": ExteriorSidingVignette,
  "exterior-soffit": ExteriorSoffitVignette,
  "decking-wraparound": DeckingWraparoundVignette,
  "decking-stepdown": DeckingStepDownVignette,
};

export const GalleryVignette = ({
  vignetteKey,
  className,
}: {
  vignetteKey: PlateVignetteKey;
  className?: string;
}) => {
  const Component = VIGNETTES[vignetteKey];
  return <Component className={className} />;
};
