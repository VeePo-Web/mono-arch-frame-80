/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SPACING TOKENS — Haven Creek Renovations
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 8-point grid. Semantic names. The single source of truth for vertical
 * rhythm and content gaps. Replaces scattered `py-20 md:py-40` strings.
 *
 * USAGE:
 *   import { SECTION_PADDING, CONTENT_GAP, MAX_WIDTH } from "@/lib/spacing";
 *   <section className={SECTION_PADDING.standard}>…</section>
 *   <div className={CONTENT_GAP.cardGrid}>…</div>
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// SECTION VERTICAL PADDING
// ───────────────────────────────────────────────────────────────────────────

export const SECTION_PADDING = {
  /** Standard section — 80px mobile / 128px desktop. */
  standard: "py-20 md:py-32",
  /** Compact — supporting / transitional sections. 64 / 96px. */
  compact: "py-16 md:py-24",
  /** Terminal — final CTA / contact. 96 / 160px. */
  terminal: "py-24 md:py-40",
  /** Hero — top-of-page. Often combined with other sizing. */
  hero: "py-16 md:py-24",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// CONTENT GAPS (between cards / list items / columns)
// ───────────────────────────────────────────────────────────────────────────

export const CONTENT_GAP = {
  /** Standard 3-up card grid. */
  cardGrid: "gap-6 md:gap-8",
  /** Bento grid — slightly tighter to feel cohesive. */
  bento: "gap-4 md:gap-6",
  /** Two-column editorial layout (text + image). */
  editorial: "gap-12 md:gap-16 lg:gap-20",
  /** Vertical stack — paragraphs / list items. */
  prose: "space-y-5 md:space-y-6",
  /** Tight stack — labels / supporting lines. */
  tight: "space-y-2 md:space-y-3",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// MAX WIDTHS
// ───────────────────────────────────────────────────────────────────────────

export const MAX_WIDTH = {
  /** Optimal reading measure — every paragraph block. */
  prose: "max-w-[62ch]",
  /** Wider editorial measure. */
  editorial: "max-w-[72ch]",
  /** Card grid container. */
  cardGrid: "max-w-[1200px]",
  /** Wide page container — heroes, bento. */
  wide: "max-w-[1360px]",
} as const;
