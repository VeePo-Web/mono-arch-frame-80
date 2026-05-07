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

      {/* § I — What happens next */}
      <RevealSection aria-labelledby="next-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow label="WHAT HAPPENS NEXT" />
              <h2 id="next-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                A calm follow-up, on our end.
              </h2>
              {projectLabel && (
                <p className="thread-tag mt-5">Re: {projectLabel}. We'll come prepared.</p>
              )}
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <ol className="divide-y divide-border/60 border-y border-border/60">
                {[
                  { title: "We read your note", body: "Carefully — not at the bottom of an automated queue." },
                  { title: "We reply", body: "Within two business days, with honest questions and a clear next step." },
                  { title: "We walk it through", body: "On the property if it makes sense, or by phone if that's easier." },
                ].map((step, i) => (
                  <li
                    key={step.title}
                    className="py-7 lg:py-8"
                    data-reveal
                    style={{ ["--reveal-delay" as string]: `${300 + i * 140}ms` }}
                  >
                    <h3 className="text-title text-foreground">{step.title}</h3>
                    <p className="mt-3 text-body text-muted-foreground max-w-[52ch]">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </RevealSection>

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
