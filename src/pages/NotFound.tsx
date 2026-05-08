import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import PremiumCard from "@/components/PremiumCard";
import RevealSection from "@/components/RevealSection";
import SubPageHero from "@/components/SubPageHero";
import { useSeo } from "@/hooks/useSeo";

const NEXT_LINKS = [
  { to: "/", title: "Home", body: "Start at the front." },
  { to: "/services", title: "Services", body: "Three services we focus on." },
  { to: "/work", title: "Our Work", body: "Plates from recent properties." },
];

const NotFound = () => {
  useSeo({
    title: "404 — Off Map",
    description: "This page seems to have wandered off. Find your way back to the work, the services, or the front page.",
    path: "/404",
    noindex: true,
  });

  return (
    <main id="main">
      <SubPageHero
        compact
        folio="404 · Page not found"
        headline="This page seems to have wandered off."
        accentWord="wandered"
        subhead="It may have moved, been renamed, or never quite made it onto the map. A few honest places to head next."
        primaryCta={{ to: "/", label: "Return home" }}
        secondaryCta={{ to: "/contact", label: "Talk to us" }}
      />

      <RevealSection className="pb-24 md:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {NEXT_LINKS.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-[var(--r-shell)]"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
              >
                <PremiumCard className="h-full">
                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    <Eyebrow label="HEAD HERE" />
                    <h3 className="mt-7 font-serif text-[1.45rem] text-foreground group-hover:text-evergreen transition-colors duration-500">
                      {link.title}
                    </h3>
                    <p className="mt-3 text-body text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                      {link.body}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-3 text-minimal text-evergreen self-start">
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
    </main>
  );
};

export default NotFound;
