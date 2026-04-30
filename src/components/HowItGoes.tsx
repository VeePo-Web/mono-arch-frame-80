import { cn } from "@/lib/utils";
import Container from "./Container";
import RevealSection from "./RevealSection";
import Eyebrow from "./Eyebrow";
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
    n: "01",
    t: "Conversation",
    b: "We talk through the property — priorities, timeline, and whether the work is one project or part of a longer plan.",
  },
  {
    n: "02",
    t: "Planning",
    b: "Scope, materials, and the practical realities of working on a rural property — clarified before we lift a tool.",
  },
  {
    n: "03",
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
        <div
          className="max-w-[62ch] mb-10 md:mb-14"
          data-reveal
          style={{ ["--reveal-delay" as string]: "0ms" }}
        >
          <Eyebrow label="How it goes" />
          <h2
            id="how-it-goes-heading"
            data-drift
            className={cn(HEADLINE.section, "mt-5 text-foreground max-w-[20ch]")}
          >
            A path you can see from the start.
          </h2>
        </div>

        <ol className="border-t border-evergreen/15">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${180 + i * 110}ms` }}
              className="group/row grid grid-cols-[3.25rem_1fr] md:grid-cols-[4rem_minmax(0,16rem)_1fr] items-start gap-5 md:gap-8 py-7 md:py-9 border-b border-evergreen/15 transition-colors duration-500 hover:bg-evergreen/[0.025]"
            >
              <span
                aria-hidden="true"
                className="font-serif italic text-evergreen/70 text-2xl md:text-3xl tabular-nums leading-none pt-1 transition-colors duration-500 group-hover/row:text-evergreen"
              >
                {step.n}
              </span>
              <h3
                className={cn(
                  HEADLINE.subsection,
                  "text-foreground transition-colors duration-500 group-hover/row:text-evergreen",
                )}
              >
                {step.t}
              </h3>
              <p
                className={cn(
                  BODY.standard,
                  "max-w-[58ch] col-span-2 md:col-span-1",
                )}
              >
                {step.b}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </RevealSection>
  );
};

export default HowItGoes;
