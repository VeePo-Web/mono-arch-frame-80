import { Link } from "react-router-dom";
import Container from "@/components/Container";
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
    description:
      "This page seems to have wandered off. Find your way back to the work, the services, or the front page.",
    path: "/404",
    noindex: true,
  });

  return (
    <main id="main">
      <SubPageHero
        headline="This page seems to have wandered off."
        subhead="It may have moved, been renamed, or never quite made it onto the map. A few honest places to head next."
        primaryCta={{ to: "/", label: "Return home" }}
      />

      <RevealSection className="section-y">
        <Container size="wide">
          <ul className="border-t border-foreground/12">
            {NEXT_LINKS.map((link, i) => (
              <li
                key={link.to}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
                className="row-wash border-b border-foreground/12"
              >
                <Link
                  to={link.to}
                  className="grid grid-cols-12 gap-6 items-baseline py-7 md:py-9 px-2 -mx-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm group"
                >
                  <span className="col-span-12 md:col-span-5 t-section text-foreground transition-transform duration-500 ease-weighted group-hover:translate-x-1.5">
                    {link.title}
                  </span>
                  <span className="col-span-12 md:col-span-7 t-body text-foreground/70">
                    {link.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </RevealSection>
    </main>
  );
};

export default NotFound;
