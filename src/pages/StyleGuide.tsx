import { useState } from "react";
import Container from "@/components/Container";
import { useSeo } from "@/hooks/useSeo";
import { HEADLINE, BODY, EYEBROW, STAT, UI, MEASURE } from "@/lib/typography";
import { SECTION_PADDING, CONTENT_GAP, MAX_WIDTH } from "@/lib/spacing";
import StatCard from "@/components/ui/StatCard";
import InfoCard from "@/components/ui/InfoCard";
import BentoGrid, { BentoTile } from "@/components/ui/BentoGrid";
import { cn } from "@/lib/utils";

/**
 * StyleGuide — internal developer reference at /style-guide.
 * Excluded from sitemap + robots. Renders every token live so any change
 * to typography.ts / spacing.ts shows up here immediately.
 */

const Swatch = ({ name, hsl, fg }: { name: string; hsl: string; fg?: boolean }) => (
  <div className="surface-card p-5">
    <div
      className="h-20 w-full rounded-md mb-3 border border-border/60"
      style={{ background: `hsl(${hsl})` }}
    />
    <p className="font-sans text-sm font-semibold text-foreground">{name}</p>
    <p className="font-sans text-[0.8125rem] text-foreground/65 mt-1">hsl({hsl})</p>
    {fg && <p className="font-sans text-xs text-foreground/55 mt-1">Used as a foreground color.</p>}
  </div>
);

const TokenRow = ({
  name,
  cls,
  preview,
}: {
  name: string;
  cls: string;
  preview: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="surface-card p-5 md:p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-sans text-sm font-semibold text-foreground">{name}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(cls);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="font-sans text-xs font-semibold text-evergreen hover:text-evergreen-hover transition-colors"
        >
          {copied ? "Copied" : "Copy class"}
        </button>
      </div>
      <div className="mb-4 py-2">{preview}</div>
      <code className="block font-mono text-[0.75rem] text-foreground/70 bg-muted/60 rounded px-2 py-1.5 overflow-x-auto">
        {cls}
      </code>
    </div>
  );
};

const SubHead = ({ id, label, title, intro }: { id: string; label: string; title: string; intro: string }) => (
  <div id={id} className="mb-10 scroll-mt-32">
    <span className={EYEBROW.standard}>{label}</span>
    <h2 className={cn(HEADLINE.subsection, "mt-3 text-foreground")}>{title}</h2>
    <p className={cn(BODY.standard, MEASURE.editorial, "mt-3")}>{intro}</p>
  </div>
);

const StyleGuide = () => {
  useSeo({
    title: "Style Guide — Internal Reference",
    description: "Internal design system reference for Haven Creek Renovations.",
    path: "/style-guide",
    noindex: true,
  });

  return (
    <main id="main">
      {/* Hero */}
      <section className={cn(SECTION_PADDING.compact, "border-b border-border/60")}>
        <Container size="wide">
          <span className={EYEBROW.standard}>Internal · Developer reference</span>
          <h1 className={cn(HEADLINE.section, "mt-4 text-foreground")}>
            Haven Creek Design System
          </h1>
          <p className={cn(BODY.large, MEASURE.editorial, "mt-5")}>
            Every token, every primitive, every legibility rule — rendered live. If
            something on the site looks wrong, the answer lives here. Update tokens,
            not pages.
          </p>
          <nav aria-label="Style guide sections" className="mt-8 flex flex-wrap gap-2">
            {[
              ["Rules", "rules"],
              ["Color", "color"],
              ["Typography", "type"],
              ["Spacing", "space"],
              ["Cards", "cards"],
              ["Don'ts", "donts"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="surface-card px-4 py-2 font-sans text-sm font-semibold text-foreground/85 hover:text-evergreen transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Rules */}
      <section className={SECTION_PADDING.standard}>
        <Container size="wide">
          <SubHead
            id="rules"
            label="Hard rules"
            title="The five rules that override every preference."
            intro="A 70-year-old should never have to lean in. These are non-negotiable. Every component on the site enforces them."
          />
          <div className={cn("grid grid-cols-1 md:grid-cols-2", CONTENT_GAP.cardGrid)}>
            {[
              { n: "01", t: "Body never < 16px", b: "Use BODY.standard or BODY.large. Never one-off Tailwind sizes like text-[0.95rem]." },
              { n: "02", t: "Labels never < 12px", b: "Use EYEBROW.standard. The 11px label era is over." },
              { n: "03", t: "No muted on long copy", b: "text-muted-foreground is for 1–2 line captions only. Body uses text-foreground/85." },
              { n: "04", t: "Lists of 3+ → cards", b: "If items are peer-level and listed sequentially, they get an InfoCard or BentoTile. No naked stacked paragraphs." },
              { n: "05", t: "Reading measure = 62ch", b: "Apply MEASURE.prose to every paragraph block. 72ch is the absolute ceiling." },
            ].map((r) => (
              <InfoCard key={r.n} eyebrow={r.n} title={r.t} body={r.b} />
            ))}
          </div>
        </Container>
      </section>

      {/* Color */}
      <section className={cn(SECTION_PADDING.standard, "section-wash")}>
        <Container size="wide">
          <SubHead
            id="color"
            label="Color"
            title="Warm neutrals + one evergreen accent."
            intro="No pure white. No pure black. Cedar evergreen is the only accent — opacity scales the emotion."
          />
          <div className={cn("grid grid-cols-2 md:grid-cols-4", CONTENT_GAP.bento)}>
            <Swatch name="Background" hsl="36 25% 97%" />
            <Swatch name="Card" hsl="36 22% 95%" />
            <Swatch name="Foreground" hsl="20 8% 14%" fg />
            <Swatch name="Muted FG" hsl="25 8% 38%" fg />
            <Swatch name="Evergreen" hsl="145 18% 28%" />
            <Swatch name="Evergreen Deep" hsl="145 24% 16%" />
            <Swatch name="Bark" hsl="25 15% 20%" />
            <Swatch name="Sand" hsl="35 18% 86%" />
          </div>
        </Container>
      </section>

      {/* Typography */}
      <section className={SECTION_PADDING.standard}>
        <Container size="wide">
          <SubHead
            id="type"
            label="Typography"
            title="Fraunces serif headlines, Inter sans body."
            intro="All sizes are tokenized. Fluid clamp() math handles responsive scaling — no per-breakpoint overrides."
          />
          <div className={cn("grid grid-cols-1", CONTENT_GAP.prose)}>
            <TokenRow name="HEADLINE.hero" cls={HEADLINE.hero}
              preview={<h1 className={cn(HEADLINE.hero, "text-foreground")}>Hero headline reads like this.</h1>} />
            <TokenRow name="HEADLINE.section" cls={HEADLINE.section}
              preview={<h2 className={cn(HEADLINE.section, "text-foreground")}>Section title</h2>} />
            <TokenRow name="HEADLINE.subsection" cls={HEADLINE.subsection}
              preview={<h3 className={cn(HEADLINE.subsection, "text-foreground")}>Sub-section title</h3>} />
            <TokenRow name="HEADLINE.card" cls={HEADLINE.card}
              preview={<h4 className={cn(HEADLINE.card, "text-foreground")}>Card title</h4>} />
            <TokenRow name="BODY.large" cls={BODY.large}
              preview={<p className={BODY.large}>Lead paragraph — sits under a section title or hero. 18px, leading 1.7.</p>} />
            <TokenRow name="BODY.standard" cls={BODY.standard}
              preview={<p className={BODY.standard}>Standard body — the default everywhere. 16px, leading 1.7. Easy to scan.</p>} />
            <TokenRow name="BODY.card" cls={BODY.card}
              preview={<p className={BODY.card}>Card body — 16px, slightly tighter leading. Capped at 22 words.</p>} />
            <TokenRow name="BODY.quote" cls={BODY.quote}
              preview={<p className={BODY.quote}>“The experience of quality. The quality of experience.”</p>} />
            <TokenRow name="EYEBROW.standard" cls={EYEBROW.standard}
              preview={<span className={EYEBROW.standard}>Eyebrow label</span>} />
            <TokenRow name="STAT.standard" cls={STAT.standard}
              preview={<span className={STAT.standard}>12+</span>} />
            <TokenRow name="UI.button" cls={UI.button}
              preview={<span className={cn(UI.button, "text-foreground")}>Get a Quote</span>} />
          </div>
        </Container>
      </section>

      {/* Spacing */}
      <section className={cn(SECTION_PADDING.standard, "section-wash")}>
        <Container size="wide">
          <SubHead
            id="space"
            label="Spacing"
            title="Eight-point grid. Semantic names, not raw numbers."
            intro="Use SECTION_PADDING and CONTENT_GAP. If you reach for py-32 directly, stop and pick a token."
          />
          <div className={cn("grid grid-cols-1 md:grid-cols-2", CONTENT_GAP.cardGrid)}>
            {Object.entries(SECTION_PADDING).map(([k, v]) => (
              <TokenRow
                key={k}
                name={`SECTION_PADDING.${k}`}
                cls={v}
                preview={<div className="bg-evergreen/10 rounded-md flex items-center justify-center"><div className={cn(v, "text-evergreen font-mono text-xs")}>{v}</div></div>}
              />
            ))}
            {Object.entries(MAX_WIDTH).map(([k, v]) => (
              <TokenRow
                key={k}
                name={`MAX_WIDTH.${k}`}
                cls={v}
                preview={
                  <div className="bg-evergreen/5 rounded-md p-3">
                    <div className={cn(v, "h-2 bg-evergreen/40 rounded")} />
                  </div>
                }
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Cards */}
      <section className={SECTION_PADDING.standard}>
        <Container size="wide">
          <SubHead
            id="cards"
            label="Card primitives"
            title="StatCard · InfoCard · BentoGrid."
            intro="Three surfaces cover 95% of layout needs. Always reach for these before writing a custom div."
          />

          <h3 className={cn(HEADLINE.compact, "text-foreground mt-12 mb-5")}>StatCard</h3>
          <div className={cn("grid grid-cols-1 sm:grid-cols-3", CONTENT_GAP.cardGrid)}>
            <StatCard label="Years" value="12+" caption="Hands-on rural renovation work." />
            <StatCard label="Areas" value="4" caption="Communities west and north of Calgary." />
            <StatCard label="Reply" value="2 days" caption="Or sooner. From a real person." />
          </div>

          <h3 className={cn(HEADLINE.compact, "text-foreground mt-16 mb-5")}>InfoCard</h3>
          <div className={cn("grid grid-cols-1 md:grid-cols-3", CONTENT_GAP.cardGrid)}>
            <InfoCard
              eyebrow="01"
              title="Conversation"
              body="We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan."
              to="/contact"
              linkLabel="Start"
            />
            <InfoCard
              eyebrow="02"
              title="Planning"
              body="Scope, materials, and the practical realities of working on a rural property — clarified before we lift a tool."
            />
            <InfoCard
              eyebrow="03"
              title="Hands-On"
              body="Completed with attention to fit, finish, and the small details that decide whether work reads as finished."
              featured
            />
          </div>

          <h3 className={cn(HEADLINE.compact, "text-foreground mt-16 mb-5")}>BentoGrid · 2×2</h3>
          <BentoGrid layout="2x2">
            <BentoTile eyebrow="T0L" title="Bragg Creek" body="Wooded lots and quiet drives." to="/service-areas/bragg-creek" />
            <BentoTile eyebrow="T4A" title="Rocky View" body="Acreages cared for over years." to="/service-areas/rocky-view-county" />
            <BentoTile eyebrow="T3R" title="Bearspaw" body="Established homes, discreet work." to="/service-areas/bearspaw" />
            <BentoTile eyebrow="T0M" title="Water Valley" body="Practical work for real distance." to="/service-areas/water-valley" />
          </BentoGrid>
        </Container>
      </section>

      {/* Don'ts */}
      <section className={cn(SECTION_PADDING.standard, "section-wash")}>
        <Container size="wide">
          <SubHead
            id="donts"
            label="Don'ts"
            title="The six things that break the system."
            intro="If a PR contains any of these, it gets rejected. Each one undoes years of legibility work."
          />
          <div className={cn("grid grid-cols-1 md:grid-cols-2", CONTENT_GAP.cardGrid)}>
            {[
              ["Tiny body", "text-[0.95rem] or text-sm on paragraph copy. Use BODY.standard."],
              ["Muted on essays", "text-muted-foreground on a multi-line paragraph. Use text-foreground/85."],
              ["Naked stacks", "Three or more peer paragraphs in a row with no card. Use InfoCard or BentoGrid."],
              ["Custom font sizes", "Reaching for text-[0.7rem] or arbitrary leading. Always pick a token."],
              ["Wide measure", "Paragraphs that span the full container. Apply MEASURE.prose."],
              ["Pure black/white", "#000 or #fff. Always use semantic tokens — they carry the warm undertone."],
            ].map(([t, b]) => (
              <div key={t} className="surface-card border-l-2 border-l-destructive/60 p-6">
                <span className={EYEBROW.standard}>Avoid</span>
                <h4 className={cn(HEADLINE.compact, "mt-2 text-foreground")}>{t}</h4>
                <p className={cn(BODY.card, "mt-3")}>{b}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default StyleGuide;
