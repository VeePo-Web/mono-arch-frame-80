import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { useSeo } from "@/hooks/useSeo";
import { PROJECT_TYPES } from "@/lib/validation/consultation";

const SECTION = "py-14 md:py-28";

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
              <div className="flex items-center gap-3 text-[0.78rem] tracking-[0.18em] uppercase text-evergreen">
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
                <span className="flex-1">Received</span>
                <span className="text-evergreen/60 tabular-nums normal-case">
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

      {/* §I 3-step list retired — the hero subhead already promises the reply window. */}

      {/* § II — Quiet sign-off + while-you-wait links */}
      <RevealSection className="py-16 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            {personalized ? (
              <p className="font-serif italic font-light text-foreground/75 text-[1.3rem] md:text-[1.5rem] leading-snug">
                No need to refresh — we'll come to you.
              </p>
            ) : (
              <p className="font-serif italic font-light text-foreground/75 text-[1.3rem] md:text-[1.5rem] leading-snug">
                Looking for the contact form?{" "}
                <Link to="/contact" className="not-italic underline decoration-evergreen/40 underline-offset-4 hover:text-evergreen transition-colors">
                  Open Contact
                </Link>
                .
              </p>
            )}
            <p className="mt-8 text-minimal text-evergreen/70">
              While you wait —{" "}
              <Link to="/work" className="hover:text-evergreen transition-colors underline decoration-evergreen/30 underline-offset-4">
                see the work
              </Link>
              {" "}or{" "}
              <Link to="/services" className="hover:text-evergreen transition-colors underline decoration-evergreen/30 underline-offset-4">
                browse services
              </Link>
              .
            </p>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default ThankYou;
