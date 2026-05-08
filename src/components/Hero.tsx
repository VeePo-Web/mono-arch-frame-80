import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import { cn } from "@/lib/utils";
import Container from "./Container";

/**
 * Hero — type-only home opener. H1 + subhead + one CTA. No eyebrow, no accent.
 */
const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-28 md:pt-44 pb-16 md:pb-28"
    >
      <Container size="wide">
        <div className="max-w-4xl">
          <h1
            id="hero-heading"
            className="text-display text-foreground max-w-[18ch] text-balance leading-[1.05]"
          >
            <span className="block overflow-hidden">
              <span className="block reveal-up" style={{ animationDelay: "120ms" }}>
                One trusted contractor
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block reveal-up" style={{ animationDelay: "240ms" }}>
                for the property you value.
              </span>
            </span>
          </h1>

          <p
            className="text-subhead text-muted-foreground mt-8 max-w-[52ch] reveal-up"
            style={{ animationDelay: "380ms" }}
          >
            Hands-on finishing, repairs, and decks across rural Alberta. One
            person plans the work and walks the finish with you.
          </p>

          <div className="mt-10 reveal-up" style={{ animationDelay: "500ms" }}>
            <Link
              to="/contact"
              className={cn(
                "group/btn inline-flex items-center gap-3 rounded-full",
                "bg-evergreen text-evergreen-foreground",
                "pl-7 pr-1.5 py-1.5 min-h-[52px] text-minimal",
                "transition-all duration-500 ease-swift",
                "hover:bg-evergreen-hover active:scale-[0.98]",
                "shadow-[0_1px_0_hsl(145_22%_38%/0.4)_inset,0_18px_36px_-12px_hsl(145_24%_8%/0.30)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label="Get a free quote — start a conversation about your property"
            >
              <span>Get a Free Quote</span>
              <span className="icon-chip icon-chip-light bg-background/15">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
