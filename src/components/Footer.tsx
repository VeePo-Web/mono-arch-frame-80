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
 * Footer — quiet magazine colophon. Two thin rows, hair rule between.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 md:mt-24 border-t border-foreground/12 bg-card">
      <Container size="wide">
        {/* Row 1 — brand · CTA */}
        <div className="py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-10 border-b border-foreground/10">
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
              className="h-8 w-auto"
              loading="lazy"
              decoding="async"
            />
            <span className="font-serif text-foreground/85 text-[1rem] leading-tight">
              Haven Creek Renovations
            </span>
            <span className="t-micro hidden md:inline ml-3">© {year}</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 min-h-[44px] text-minimal text-foreground hover:text-evergreen transition-colors duration-300 shrink-0"
          >
            <span>Get a Free Quote</span>
            <span className="icon-chip bg-evergreen/[0.06]">
              <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Row 2 — pages · locator */}
        <div className="py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-10">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="t-micro hover:text-evergreen transition-colors duration-300"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="t-micro">Foothills, AB · © {year}</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
