import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import RevealSection from "./RevealSection";

interface ClosingCtaProps {
  numeral?: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}

/**
 * ClosingCta — quiet evergreen-deep band that ends every sub-page.
 * Mirrors §VI on the home page but without the embedded form (calmer for
 * deep-page reading; the form remains the headline event on /contact).
 */
const ClosingCta = ({
  numeral = "·",
  eyebrow = "NEXT STEP",
  heading,
  body,
  primary = { to: "/contact", label: "Request a Consultation" },
  secondary = { to: "/work", label: "View Our Work" },
}: ClosingCtaProps) => (
  <RevealSection
    aria-labelledby="closing-cta-heading"
    className="cv-auto relative py-28 md:py-36 overflow-hidden bg-evergreen-deep"
    style={{
      backgroundImage:
        "radial-gradient(120% 80% at 15% 0%, hsl(145 22% 22%) 0%, hsl(var(--evergreen-deep)) 70%)",
      containIntrinsicSize: "1200px 600px",
    }}
  >
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-0 bottom-0 w-px bg-background/10"
    />

    <svg
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 w-full h-[100px] text-background/[0.06] pointer-events-none"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M 0 100 L 120 100 L 160 70 L 200 100 L 360 100 L 400 75 L 440 50 L 480 75 L 520 100 L 700 100 L 760 60 L 820 100 L 980 100 L 1020 80 L 1080 65 L 1140 80 L 1180 100 L 1440 100"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line x1="0" y1="100" x2="1440" y2="100" stroke="currentColor" strokeWidth="1" />
    </svg>

    <Container size="wide">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-8" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
          <div className="flex items-start justify-between gap-6">
            <Eyebrow tone="light" numeral={numeral} label={eyebrow} />
            <span className="coord-mark coord-mark-light hidden md:inline-flex">Resolution</span>
          </div>
          <h2
            id="closing-cta-heading"
            className="text-headline text-background mt-6 max-w-[22ch]"
          >
            {heading}
          </h2>
          {body && (
            <p className="mt-6 text-body text-background/80 max-w-2xl">{body}</p>
          )}
        </div>

        <div
          className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start gap-5"
          data-reveal
          style={{ ["--reveal-delay" as string]: "180ms" }}
        >
          <Link
            to={primary.to}
            className="group/btn inline-flex items-center gap-3 rounded-full bg-background text-foreground pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal transition-all duration-500 ease-swift hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-evergreen-deep"
          >
            <span>{primary.label}</span>
            <span className="icon-chip bg-evergreen/15">
              <ArrowUpRight className="h-4 w-4 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>
          <Link
            to={secondary.to}
            className="group/ghost inline-flex items-center gap-3 text-minimal text-background/85 hover:text-background transition-colors duration-500 ease-swift"
          >
            <span>{secondary.label}</span>
            <span className="block w-6 h-px bg-background/50 group-hover/ghost:w-12 transition-all duration-500 ease-swift" />
          </Link>
        </div>
      </div>
    </Container>
  </RevealSection>
);

export default ClosingCta;
