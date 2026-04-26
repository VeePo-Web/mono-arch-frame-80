import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import RevealSection from "@/components/RevealSection";

interface Testimonial {
  quote: string;
  attribution: string;
  area: string;
  /** TODO marker — flips a tiny visual indicator until the real quote lands. */
  pending?: boolean;
}

// TODO: replace with real client copy when collected.
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

/**
 * TestimonialSpine — three quiet attributed quotes.
 *
 * Sam's persona doc names testimonials as required trust evidence.
 * Until real client quotes are collected, each card carries
 * data-status="placeholder" so a single grep can find them.
 *
 * Editorial pattern: hairline-bordered card, italic Fraunces quote,
 * Inter attribution. Three columns at lg+, stacked on mobile.
 */
const TestimonialSpine = () => (
  <RevealSection
    aria-labelledby="testimonials-heading"
    className="py-16 md:py-32"
  >
    <Container size="wide">
      <div
        className="max-w-2xl mx-auto text-center"
        data-reveal
        style={{ ["--reveal-delay" as string]: "0ms" }}
      >
        <Eyebrow align="center" label="Words from clients" />
        <h2
          id="testimonials-heading"
          className="text-headline text-foreground mt-6 max-w-[24ch] mx-auto text-balance"
        >
          What it feels like to work with us.
        </h2>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={`${t.attribution}-${t.area}`}
            data-reveal
            data-status={t.pending ? "placeholder" : undefined}
            style={{ ["--reveal-delay" as string]: `${180 + i * 120}ms` }}
            className="testimonial-card"
          >
            <blockquote>
              <span aria-hidden="true" className="text-evergreen/40 mr-1">&ldquo;</span>
              {t.quote}
              <span aria-hidden="true" className="text-evergreen/40 ml-1">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-7 pt-5 border-t border-evergreen/15 flex items-baseline justify-between gap-3 text-minimal">
              <span className="text-foreground/85">— {t.attribution}</span>
              <span className="text-evergreen/70 tabular-nums">{t.area}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p
        className="mt-12 text-center text-minimal text-muted-foreground"
        data-reveal
        style={{ ["--reveal-delay" as string]: "560ms" }}
      >
        More on the way as projects wrap.
      </p>
    </Container>
  </RevealSection>
);

export default TestimonialSpine;
