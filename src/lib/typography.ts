/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TYPOGRAPHY TOKENS — Haven Creek Renovations
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The single source of truth for type on the site. Every page consumes these
 * tokens — never raw `text-[0.95rem]`, `text-xs` on body copy, or one-off
 * font-size overrides.
 *
 * ─── HARD LEGIBILITY RULES ────────────────────────────────────────────────
 *  1. Body copy is NEVER smaller than `text-base` (16px).
 *  2. Labels / eyebrows are NEVER smaller than 12px.
 *  3. `text-muted-foreground` is FORBIDDEN on paragraphs longer than 2 lines.
 *     Use `text-foreground/85` instead — same calm, full contrast.
 *  4. Card titles are 20px+ at minimum.
 *  5. Optimal reading measure is 62ch. Hard ceiling is 72ch.
 *
 * ─── FONT STACK ───────────────────────────────────────────────────────────
 *   Display / Serif: Fraunces (variable)  → headlines, quotes, numerals
 *   Body / Sans:     Inter                 → all body, UI, labels
 *
 * ─── USAGE ────────────────────────────────────────────────────────────────
 *   import { HEADLINE, BODY, EYEBROW } from "@/lib/typography";
 *   <h1 className={HEADLINE.hero}>…</h1>
 *   <p  className={BODY.large}>…</p>
 *   <span className={EYEBROW.standard}>…</span>
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// HEADLINES (Fraunces serif)
// ───────────────────────────────────────────────────────────────────────────

export const HEADLINE = {
  /** H1 — hero only. Fluid 44 → 80px. */
  hero: "font-serif font-normal tracking-[-0.02em] leading-[1.05] text-[clamp(2.75rem,5vw+1rem,5rem)] text-balance",
  /** H2 — major section title. Fluid 32 → 52px. */
  section: "font-serif font-normal tracking-[-0.02em] leading-[1.1] text-[clamp(2rem,2.5vw+0.75rem,3.25rem)] text-balance",
  /** H3 — sub-section / card group title. 24 → 30px. */
  subsection: "font-serif font-normal tracking-[-0.015em] leading-[1.2] text-2xl md:text-3xl",
  /** H3/H4 — card title. 20 → 22px, semibold-ish weight via 500. */
  card: "font-serif font-medium tracking-[-0.01em] leading-[1.25] text-xl md:text-[1.375rem]",
  /** Compact card title — for dense bento tiles. 18px floor. */
  compact: "font-serif font-medium tracking-[-0.01em] leading-[1.3] text-lg md:text-xl",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// BODY COPY (Inter sans)
// ───────────────────────────────────────────────────────────────────────────

export const BODY = {
  /** Lead paragraph under a hero or section H2. 18px, generous leading. */
  large: "font-sans text-lg leading-[1.7] text-foreground/85",
  /** Standard body — the default for any paragraph. 16px floor. */
  standard: "font-sans text-base leading-[1.7] text-foreground/85",
  /** Card body — 16px, slightly tighter leading. NEVER smaller. */
  card: "font-sans text-base leading-[1.65] text-foreground/80",
  /** Caption / supporting line. 14px floor — only for true captions. */
  caption: "font-sans text-sm leading-[1.55] text-foreground/70",
  /** Editorial quote — italic serif at body size. */
  quote: "font-serif italic font-light text-xl md:text-[1.5rem] leading-[1.45] text-foreground/90 text-balance",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// EYEBROWS / LABELS / METADATA
// ───────────────────────────────────────────────────────────────────────────

export const EYEBROW = {
  /** Default eyebrow — 12px, wide tracking, semibold. */
  standard: "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-evergreen",
  /** Quiet eyebrow — same size, foreground/70 instead of evergreen. */
  quiet: "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground/65",
  /** Numeric / stat label — 13px so the number reads clearly. */
  stat: "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-evergreen",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// STAT NUMBERS (Fraunces serif, used in StatCard)
// ───────────────────────────────────────────────────────────────────────────

export const STAT = {
  /** Big stat figure — 40 → 56px. */
  large: "font-serif font-normal tracking-[-0.02em] leading-[1] text-[clamp(2.5rem,3.5vw+0.5rem,3.5rem)] text-foreground",
  /** Standard stat figure — 32 → 40px. */
  standard: "font-serif font-normal tracking-[-0.02em] leading-[1] text-4xl md:text-[2.5rem] text-foreground",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// UI TEXT (buttons, links, microcopy)
// ───────────────────────────────────────────────────────────────────────────

export const UI = {
  /** CTA button text — 15px, semibold. */
  button: "font-sans text-[0.9375rem] font-semibold tracking-[-0.005em]",
  /** Inline link / arrow link. 15px, medium. */
  link: "font-sans text-[0.9375rem] font-medium",
  /** Microcopy under a CTA (e.g. "2-day reply · No obligation"). 13px floor. */
  micro: "font-sans text-[0.8125rem] text-foreground/65",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// READING MEASURES
// ───────────────────────────────────────────────────────────────────────────

export const MEASURE = {
  /** Optimal reading length — use on every paragraph block. */
  prose: "max-w-[62ch]",
  /** Wider editorial measure — quotes, captions under hero. */
  editorial: "max-w-[72ch]",
  /** Narrow — pull-quotes, stat captions. */
  narrow: "max-w-[36ch]",
} as const;
