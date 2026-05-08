import { cn } from "@/lib/utils";
import Container from "./Container";
import RevealSection from "./RevealSection";
import SectionHeader from "./SectionHeader";
import { HEADLINE, BODY } from "@/lib/typography";
import { SECTION_PADDING } from "@/lib/spacing";

/**
 * HowItGoes — quiet horizontal three-step strip.
 *
 * Replaces the standalone "Approach" bento with a compact rhythm:
 *   01  Conversation  — one line
 *   02  Planning      — one line
 *   03  Hands-on build — one line
 *
 * No card chrome. The numbered + serif title + sans body trio is the entire
 * design — restraint is the signal. Each row enters on a 110ms stagger.
 */

const STEPS = [
  {
    t: "Conversation",
    b: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan.",
  },
  {
    t: "Planning",
    b: "Scope, materials, and the practical realities of working on a rural property — clarified before we lift a tool.",
  },
  {
    t: "Hands-on build",
    b: "Built and walked-through by the same person. Fit, finish, and the small details that decide whether it reads as finished.",
  },
];

const HowItGoes = () => {
  return (
    <RevealSection
      id="how-it-goes"
      aria-labelledby="how-it-goes-heading"
      className={cn(SECTION_PADDING.standard, "section-wash")}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="how-it-goes-heading"
            eyebrow="How it goes"
            title="A path you can see from the start."
            drift
            bottomGap="compact"
          />
        </div>

        <ol className="border-t border-evergreen/15">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${180 + i * 110}ms` }}
              className="group/row grid grid-cols-1 md:grid-cols-[minmax(0,16rem)_1fr] items-start gap-3 md:gap-8 py-7 md:py-9 border-b border-evergreen/15 transition-colors duration-500 hover:bg-evergreen/[0.025]"
            >
              <h3
                className={cn(
                  HEADLINE.subsection,
                  "text-foreground transition-colors duration-500 group-hover/row:text-evergreen",
                )}
              >
                {step.t}
              </h3>
              <p className={cn(BODY.standard, "max-w-[58ch]")}>{step.b}</p>
            </li>
          ))}
        </ol>
      </Container>
    </RevealSection>
  );
};

export default HowItGoes;
