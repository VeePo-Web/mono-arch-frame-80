/**
 * HeroVignette — minimalist hand-drawn line composition of a rural property scene.
 * A single house silhouette, a tree, a horizon line — drawn with stroke-dasharray
 * animation that completes once on mount. ~2 KB inline, no network request.
 *
 * Used as the hero proof panel watermark — solves "no real photography yet"
 * without resorting to luxury stock (forbidden per knowledge/1.5 §Dealbreakers).
 */
const HeroVignette = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 480 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Land horizon */}
    <line
      x1="20"
      y1="280"
      x2="460"
      y2="280"
      stroke="hsl(var(--evergreen) / 0.30)"
      strokeWidth="0.75"
      className="vignette-stroke"
      style={{ animationDelay: "0ms" }}
    />

    {/* Distant ridge */}
    <path
      d="M 30 268 L 110 248 L 180 258 L 250 240 L 330 252 L 410 244 L 460 256"
      stroke="hsl(var(--evergreen) / 0.20)"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="vignette-stroke"
      style={{ animationDelay: "200ms" }}
    />

    {/* House — main gable */}
    <path
      d="M 200 280 L 200 200 L 252 162 L 304 200 L 304 280 Z"
      stroke="hsl(var(--evergreen) / 0.42)"
      strokeWidth="0.9"
      strokeLinejoin="round"
      className="vignette-stroke"
      style={{ animationDelay: "400ms" }}
    />

    {/* House — chimney */}
    <path
      d="M 280 188 L 280 168 L 290 168 L 290 196"
      stroke="hsl(var(--evergreen) / 0.40)"
      strokeWidth="0.9"
      strokeLinejoin="round"
      className="vignette-stroke"
      style={{ animationDelay: "550ms" }}
    />

    {/* House — door */}
    <path
      d="M 240 280 L 240 250 L 264 250 L 264 280"
      stroke="hsl(var(--evergreen) / 0.50)"
      strokeWidth="0.9"
      className="vignette-stroke"
      style={{ animationDelay: "700ms" }}
    />

    {/* House — window */}
    <rect
      x="270"
      y="222"
      width="20"
      height="18"
      stroke="hsl(var(--evergreen) / 0.50)"
      strokeWidth="0.8"
      className="vignette-stroke"
      style={{ animationDelay: "800ms" }}
    />

    {/* Tree — trunk + canopy lines */}
    <line
      x1="120"
      y1="280"
      x2="120"
      y2="240"
      stroke="hsl(var(--evergreen) / 0.50)"
      strokeWidth="1"
      className="vignette-stroke"
      style={{ animationDelay: "300ms" }}
    />
    <path
      d="M 120 240 L 105 220 L 120 200 L 135 220 L 120 240 M 120 220 L 110 208 L 120 192 L 130 208 L 120 220 M 120 200 L 113 188 L 120 180 L 127 188 L 120 200"
      stroke="hsl(var(--evergreen) / 0.45)"
      strokeWidth="0.85"
      strokeLinejoin="round"
      className="vignette-stroke"
      style={{ animationDelay: "500ms" }}
    />

    {/* Small fence posts to suggest property boundary */}
    <g
      stroke="hsl(var(--evergreen) / 0.28)"
      strokeWidth="0.6"
      className="vignette-stroke"
      style={{ animationDelay: "900ms" }}
    >
      <line x1="40" y1="280" x2="40" y2="270" />
      <line x1="60" y1="280" x2="60" y2="270" />
      <line x1="80" y1="280" x2="80" y2="270" />
      <line x1="380" y1="280" x2="380" y2="270" />
      <line x1="400" y1="280" x2="400" y2="270" />
      <line x1="420" y1="280" x2="420" y2="270" />
      <line x1="440" y1="280" x2="440" y2="270" />
    </g>

    {/* Sun — single thin circle */}
    <circle
      cx="380"
      cy="100"
      r="22"
      stroke="hsl(var(--evergreen) / 0.20)"
      strokeWidth="0.5"
      className="vignette-stroke"
      style={{ animationDelay: "1000ms" }}
    />
  </svg>
);

export default HeroVignette;
