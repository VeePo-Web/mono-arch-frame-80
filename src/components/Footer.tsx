import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import logo from "@/assets/logo/haven-creek-mark.webp";

const PAGES = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

/**
 * Footer — single horizontal row at md+ (brand · Pages inline · CTA),
 * stacked on mobile. Copyright sits inline with the brand mark.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 md:mt-28 border-t border-border/70 bg-card">
      <Container size="wide">
        <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
          <Link
            to="/"
            aria-label="Haven Creek Renovations — home"
            className="inline-flex items-center gap-3 shrink-0"
          >
            <img
              src={logo}
              alt="Haven Creek Renovations"
              width={36}
              height={36}
              className="h-9 w-auto"
              loading="lazy"
              decoding="async"
            />
            <span className="font-serif text-foreground/85 text-[1rem] leading-tight">
              Haven Creek Renovations
            </span>
            <span className="text-minimal text-muted-foreground hidden md:inline">
              © {year}
            </span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 md:gap-x-8 gap-y-3">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-body text-foreground/75 hover:text-evergreen transition-colors duration-300"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 min-h-[44px] text-minimal text-foreground hover:text-evergreen transition-colors duration-300 shrink-0"
          >
            <span>Get a Free Quote</span>
            <span className="icon-chip bg-evergreen/[0.06]">
              <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>

          <p className="text-minimal text-muted-foreground md:hidden">
            © {year} Haven Creek Renovations
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
