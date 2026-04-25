/**
 * ProjectVignette — abstract craft motifs drawn as architectural line drawings.
 * One per service category. ~600 bytes each, no network request, no fake stock.
 * Reads as draftsman's notes, fully aligned with §1.5 dealbreakers list.
 */

interface VignetteProps {
  className?: string;
}

export const InteriorVignette = ({ className }: VignetteProps) => (
  <svg
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    {/* Wall + floor transition — beveled cabinet edge cross-section */}
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Floor line */}
    <line x1="0" y1="180" x2="320" y2="180" stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.9" />
    {/* Vertical millwork */}
    <line x1="60" y1="40" x2="60" y2="180" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.9" />
    <line x1="62" y1="42" x2="62" y2="180" stroke="hsl(var(--evergreen) / 0.20)" strokeWidth="0.5" />
    {/* Trim baseboard detail */}
    <path d="M 60 168 L 220 168 L 220 180" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    {/* Cabinet door panel */}
    <rect x="80" y="60" width="120" height="100" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="0.9" />
    <rect x="92" y="72" width="96" height="76" stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.6" />
    {/* Hardware pull */}
    <line x1="178" y1="108" x2="194" y2="108" stroke="hsl(var(--evergreen) / 0.70)" strokeWidth="1.4" strokeLinecap="round" />
    {/* Right wall transition */}
    <line x1="220" y1="20" x2="220" y2="180" stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.9" />
    {/* Crown molding hint */}
    <path d="M 60 50 L 220 50 L 220 40" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Plumb dimension marks */}
    <g stroke="hsl(var(--bark) / 0.40)" strokeWidth="0.4">
      <line x1="40" y1="60" x2="48" y2="60" />
      <line x1="44" y1="60" x2="44" y2="160" />
      <line x1="40" y1="160" x2="48" y2="160" />
    </g>
  </svg>
);

export const ExteriorVignette = ({ className }: VignetteProps) => (
  <svg
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Roof edge */}
    <line x1="20" y1="60" x2="300" y2="60" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    <line x1="20" y1="64" x2="300" y2="64" stroke="hsl(var(--evergreen) / 0.25)" strokeWidth="0.5" />
    {/* Soffit profile */}
    <line x1="20" y1="80" x2="300" y2="80" stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7" />
    {/* Fascia trim */}
    <line x1="20" y1="60" x2="20" y2="80" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    <line x1="300" y1="60" x2="300" y2="80" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
    {/* Vent slats */}
    <g stroke="hsl(var(--evergreen) / 0.45)" strokeWidth="0.55">
      <line x1="60" y1="68" x2="80" y2="68" />
      <line x1="60" y1="72" x2="80" y2="72" />
      <line x1="60" y1="76" x2="80" y2="76" />
      <line x1="140" y1="68" x2="160" y2="68" />
      <line x1="140" y1="72" x2="160" y2="72" />
      <line x1="140" y1="76" x2="160" y2="76" />
      <line x1="220" y1="68" x2="240" y2="68" />
      <line x1="220" y1="72" x2="240" y2="72" />
      <line x1="220" y1="76" x2="240" y2="76" />
    </g>
    {/* Siding board lines */}
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55">
      <line x1="20" y1="100" x2="300" y2="100" />
      <line x1="20" y1="118" x2="300" y2="118" />
      <line x1="20" y1="136" x2="300" y2="136" />
      <line x1="20" y1="154" x2="300" y2="154" />
      <line x1="20" y1="172" x2="300" y2="172" />
      <line x1="20" y1="190" x2="300" y2="190" />
    </g>
    {/* Ground line */}
    <line x1="0" y1="210" x2="320" y2="210" stroke="hsl(var(--evergreen) / 0.50)" strokeWidth="0.9" />
  </svg>
);

export const DeckingVignette = ({ className }: VignetteProps) => (
  <svg
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid meet"
    className={className}
  >
    <rect x="0" y="0" width="320" height="240" fill="hsl(var(--evergreen-soft) / 0.40)" />
    {/* Deck surface — parallel boards in perspective */}
    <g stroke="hsl(var(--evergreen) / 0.40)" strokeWidth="0.7">
      <line x1="20" y1="120" x2="300" y2="120" />
      <line x1="22" y1="138" x2="298" y2="138" />
      <line x1="24" y1="156" x2="296" y2="156" />
      <line x1="26" y1="174" x2="294" y2="174" />
      <line x1="28" y1="192" x2="292" y2="192" />
      <line x1="30" y1="210" x2="290" y2="210" />
    </g>
    {/* Railing top */}
    <line x1="20" y1="80" x2="300" y2="80" stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1" />
    {/* Railing posts */}
    <g stroke="hsl(var(--evergreen) / 0.55)" strokeWidth="1">
      <line x1="40" y1="80" x2="40" y2="120" />
      <line x1="120" y1="80" x2="120" y2="120" />
      <line x1="200" y1="80" x2="200" y2="120" />
      <line x1="280" y1="80" x2="280" y2="120" />
    </g>
    {/* Balusters */}
    <g stroke="hsl(var(--evergreen) / 0.30)" strokeWidth="0.55">
      <line x1="60" y1="84" x2="60" y2="120" />
      <line x1="80" y1="84" x2="80" y2="120" />
      <line x1="100" y1="84" x2="100" y2="120" />
      <line x1="140" y1="84" x2="140" y2="120" />
      <line x1="160" y1="84" x2="160" y2="120" />
      <line x1="180" y1="84" x2="180" y2="120" />
      <line x1="220" y1="84" x2="220" y2="120" />
      <line x1="240" y1="84" x2="240" y2="120" />
      <line x1="260" y1="84" x2="260" y2="120" />
    </g>
    {/* Tree silhouettes beyond the deck */}
    <path
      d="M 50 80 L 50 60 M 50 60 L 42 50 L 50 40 L 58 50 Z"
      stroke="hsl(var(--evergreen) / 0.45)"
      strokeWidth="0.8"
      fill="none"
    />
    <path
      d="M 250 80 L 250 56 M 250 56 L 240 44 L 250 32 L 260 44 Z"
      stroke="hsl(var(--evergreen) / 0.45)"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

export type VignetteCategory = "Interior Finishing" | "Exterior Repairs" | "Decking";

export const ProjectVignette = ({
  category,
  className,
}: {
  category: VignetteCategory;
  className?: string;
}) => {
  if (category === "Interior Finishing") return <InteriorVignette className={className} />;
  if (category === "Exterior Repairs") return <ExteriorVignette className={className} />;
  return <DeckingVignette className={className} />;
};
