import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import RevealSection from "@/components/RevealSection";
import { SECTION_PADDING } from "@/lib/spacing";

interface Testimonial {
  quote: string;
  attribution: string;
  area: string;
  pending?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Walked the project with us start to finish. The site was the way they found it — better.",
    attribution: "Acreage owner",
    area: "Bragg Creek",
    pending: true,
  },
  {
    quote:
      "Cleaned up at the end of every day. The property never felt occupied.",
    attribution: "Homeowner",
    area: "Bearspaw",
    pending: true,
  },
  {
    quote:
      "We knew exactly what was happening, every week. No surprises, no follow-ups needed.",
    attribution: "Family steward",
    area: "Rocky View County",
    pending: true,
  },
];

interface TestimonialSpineProps {
  tone?: "light" | "dark";
}

const TestimonialSpine = ({ tone = "light" }: TestimonialSpineProps) => {
  const dark = tone === "dark";
  return (
    <RevealSection
      aria-labelledby="testimonials-heading"
      className={cn(SECTION_PADDING.standard, dark && "bg-evergreen-deep text-background")}
    >
      <Container size="wide">
        <div data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <SectionHeader
            id="testimonials-heading"
            eyebrow="Words from clients"
            title="What it feels like to work with us."
            align="center"
            titleWidth="wide"
            tone={dark ? "light" : undefined}
          />
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={`${t.attribution}-${t.area}`}
              data-reveal
              data-status={t.pending ? "placeholder" : undefined}
              style={{ ["--reveal-delay" as string]: `${180 + i * 120}ms` }}
              className={cn(
                "testimonial-card",
                dark && "!bg-background/[0.04] !border-background/15 !text-background/90",
              )}
            >
              <blockquote>
                <span aria-hidden="true" className={cn("mr-1", dark ? "text-background/40" : "text-evergreen/40")}>&ldquo;</span>
                {t.quote}
                <span aria-hidden="true" className={cn("ml-1", dark ? "text-background/40" : "text-evergreen/40")}>&rdquo;</span>
              </blockquote>
              <figcaption
                className={cn(
                  "mt-7 pt-5 flex items-baseline justify-between gap-3 text-minimal border-t",
                  dark ? "border-background/15" : "border-evergreen/15",
                )}
              >
                <span className={dark ? "text-background/85" : "text-foreground/85"}>— {t.attribution}</span>
                <span className={cn("tabular-nums", dark ? "text-background/65" : "text-evergreen/70")}>{t.area}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {!dark && (
          <p
            className="mt-12 text-center text-minimal text-muted-foreground"
            data-reveal
            style={{ ["--reveal-delay" as string]: "560ms" }}
          >
            More on the way as projects wrap.
          </p>
        )}
      </Container>
    </RevealSection>
  );
};

export default TestimonialSpine;
