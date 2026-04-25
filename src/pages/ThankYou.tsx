import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { useSeo } from "@/hooks/useSeo";

const SECTION = "py-20 md:py-28";

const NEXT_LINKS = [
  { to: "/work", title: "Our Work", body: "Recent plates from rural properties." },
  { to: "/services", title: "Services", body: "Three services, held to one standard." },
  { to: "/service-areas", title: "Service Areas", body: "Four communities we know well." },
  { to: "/about", title: "About", body: "How we work, and why." },
];

const ThankYou = () => {
  useSeo({
    title: "Thank You — We've Got Your Note",
    description: "Your consultation request has been received. We respond within two business days.",
    path: "/thank-you",
    noindex: true,
  });

  return (
    <main id="main">
      <SubPageHero
        compact
        eyebrowNumeral="·"
        eyebrowLabel="RECEIVED"
        headline="Thank you. We've got your note."
        accentWord="got"
        subhead="We respond within two business days. If your project is time-sensitive, mention it when we reach out."
        coordMark="Fig. iv. RECEIVED"
      />

      {/* § I — What happens next */}
      <RevealSection aria-labelledby="next-heading" className={SECTION}>
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
              <Eyebrow numeral="I" label="WHAT HAPPENS NEXT" />
              <h2 id="next-heading" className="text-headline text-foreground mt-6 max-w-[20ch]">
                A calm follow-up, on our end.
              </h2>
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

      {/* § III — Quiet sign-off */}
      <RevealSection className="py-20 md:py-28">
        <Container size="wide">
          <div className="max-w-2xl mx-auto text-center" data-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <p className="font-serif italic font-light text-foreground/75 text-[1.4rem] md:text-[1.6rem] leading-snug">
              No need to refresh — we'll come to you.
            </p>
          </div>
        </Container>
      </RevealSection>
    </main>
  );
};

export default ThankYou;
