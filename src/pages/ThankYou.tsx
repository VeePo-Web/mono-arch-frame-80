import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { useSeo } from "@/hooks/useSeo";
import { PROJECT_TYPES } from "@/lib/validation/consultation";

const SECTION = "py-20 md:py-28";

const NEXT_LINKS = [
  { to: "/work", title: "Our Work", body: "Recent plates from rural properties." },
  { to: "/services", title: "Services", body: "Three services, held to one standard." },
  { to: "/service-areas", title: "Service Areas", body: "Four communities we know well." },
  { to: "/about", title: "About", body: "How we work, and why." },
];

interface ThankYouState {
  name?: string;
  projectType?: string;
  preferredTime?: string | null;
  submittedAt?: string;
  source?: string;
}

const PROJECT_LABEL = new Map<string, string>(PROJECT_TYPES.map((p) => [p.value, p.label]));

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state ?? null) as ThankYouState | null;

  const personalized = Boolean(state?.name);
  const firstName = useMemo(() => {
    if (!state?.name) return "";
    return state.name.trim().split(/\s+/)[0];
  }, [state?.name]);
  const projectLabel = state?.projectType ? PROJECT_LABEL.get(state.projectType) : undefined;
  const receivedAt = useMemo(() => {
    if (!state?.submittedAt) return null;
    const d = new Date(state.submittedAt);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [state?.submittedAt]);

  useSeo({
    title: personalized
      ? `Thank you, ${firstName} — We've Got Your Note`
      : "Thank You — We've Got Your Note",
    description:
      "Your consultation request has been received. We respond within two business days.",
    path: "/thank-you",
    noindex: true,
  });

  const headline = personalized
    ? `Thank you, ${firstName}. We've got your note.`
    : "Thank you. We've got your note.";
  const accent = personalized ? firstName : "got";

  return (
    <main id="main">
      <SubPageHero
        compact
        eyebrowLabel="RECEIVED"
        headline={headline}
        accentWord={accent}
        subhead="We respond within two business days. If your project is time-sensitive, mention it when we reach out."
        dossier={{ sectionNo: "XII", coord: "Fig. iv. RECEIVED" }}
      />

      {/* Receipt stamp — only when arriving from a successful submission */}
      {receivedAt && (
        <RevealSection className="pt-10 md:pt-14">
          <Container size="wide">
            <div
              className="max-w-3xl mx-auto"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
              role="status"
              aria-live="polite"
            >
              <div className="figure-footnote flex items-center gap-3">
                <svg
                  className="receipt-check-svg shrink-0"
                  width="22"
                  height="22"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="hsl(var(--evergreen) / 0.7)"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 10 16.5 L 14.5 21 L 22.5 12.5"
                    stroke="hsl(var(--evergreen))"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span className="footnote-figmark">Fig. iv.</span>
                <span className="flex-1">RECEIVED</span>
                <span className="text-evergreen/60 tabular-nums normal-case tracking-[0.18em]">
                  {receivedAt}
                </span>
              </div>
              {projectLabel && (
                <p className="thread-tag mt-5">Re: {projectLabel}.</p>
              )}
            </div>
          </Container>
        </RevealSection>
      )}

      {/* § I — What happens next */}
      <RevealSection aria-labelledby="next-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="I" label="WHAT HAPPENS NEXT" />
              <h2 id="next-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                A calm follow-up, on our end.
              </h2>
              {projectLabel && (
                <p className="thread-tag mt-5">Re: {projectLabel}. We'll come prepared.</p>
              )}
            </div>
            <div className="lg:col-span-7 lg:pl-8 relative">
              <div className="surveyor-frame relative">
                <span className="surveyor-tr" aria-hidden="true" />
                <span className="surveyor-bl" aria-hidden="true" />
                <div
                  aria-hidden="true"
                  className="absolute left-[15px] top-3 bottom-3 w-px"
                  data-line-draw
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, hsl(var(--evergreen) / 0.45) 0 3px, transparent 3px 7px)",
                  }}
                />
                <ol className="space-y-10">
                  {[
                    { n: "01", title: "We read your note", body: "Carefully — not at the bottom of an automated queue." },
                    { n: "02", title: "We reply", body: "Within two business days, with honest questions and a clear next step." },
                    { n: "03", title: "We walk it through", body: "On the property if it makes sense, or by phone if that's easier." },
                  ].map((step, i) => (
                    <li
                      key={step.n}
                      className="relative pl-12"
                      data-reveal
                      style={{ ["--reveal-delay" as string]: `${300 + i * 180}ms` }}
                    >
                      <span className="absolute left-0 top-1 numeral-disc numeral-disc-survey">{step.n}</span>
                      <h3 className="text-title text-foreground">{step.title}</h3>
                      <p className="mt-3 text-body text-muted-foreground max-w-[52ch]">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </RevealSection>

      {/* § II — While you wait */}
      <RevealSection aria-labelledby="while-heading" className={cn(SECTION, "section-wash cv-auto")}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-12 md:mb-16">
            <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="II" label="WHILE YOU WAIT" />
              <h2 id="while-heading" className="text-headline text-foreground mt-6 max-w-[22ch]">
                A few quiet places to look.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
            {NEXT_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${180 + i * 90}ms` }}
              >
                <PremiumCard className="h-full">
                  <div className="p-6 lg:p-7 flex flex-col h-full">
                    <span className="numeral-disc">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-6 font-serif text-[1.2rem] text-foreground group-hover:text-evergreen transition-colors duration-500">
                      {link.title}
                    </h3>
                    <p className="mt-3 text-body text-muted-foreground text-[0.92rem] leading-relaxed flex-1">
                      {link.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 text-minimal text-evergreen self-start">
                      <span>Open</span>
                      <span className="icon-chip bg-evergreen/[0.06]">
                        <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* § III — Quiet sign-off (different copy for direct visits) */}
      <RevealSection className="py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-2xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            {personalized ? (
              <p className="font-serif italic font-light text-foreground/75 text-[1.4rem] md:text-[1.6rem] leading-snug">
                No need to refresh — we'll come to you.
              </p>
            ) : (
              <>
                <p className="font-serif italic font-light text-foreground/75 text-[1.4rem] md:text-[1.6rem] leading-snug">
                  Looking for the contact form?
                </p>
                <Link
                  to="/contact"
                  className="group/ghost mt-6 inline-flex items-center gap-3 text-minimal text-foreground/80 hover:text-evergreen transition-colors duration-500"
                >
                  <span>Open Contact</span>
                  <span className="icon-chip bg-evergreen/[0.06]">
                    <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </>
            )}
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default ThankYou;
