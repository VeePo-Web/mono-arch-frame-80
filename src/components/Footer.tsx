import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import logo from "@/assets/logo/haven-creek-mark.webp";
import { serviceAreas } from "@/data/serviceAreas";

const PAGES = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

/**
 * Footer — calm, useful colophon.
 * Three columns (Services · Areas · Contact) + single copyright line.
 * The agency-self-indulgence layer (ridge silhouette, MMXXV setting note,
 * oversized italic sign-off, First Edition mark) was retired in the
 * editorial declutter pass.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 md:mt-32 border-t border-border/70 bg-card">
      <Container size="wide">
        {/* Mobile: 2-col grid (brand + contact full-width, services + areas paired).
            Desktop: identical 12-col layout to before. */}
        <div className="pt-12 md:pt-20 grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-10">
          {/* Brand mark — full width on mobile, 3-col on desktop */}
          <div className="col-span-2 md:col-span-3">
            <Link to="/" aria-label="Haven Creek Renovations — home" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={40}
                height={40}
                className="h-10 w-auto"
                loading="lazy"
                decoding="async"
              />
              <span className="font-serif text-foreground/85 text-[1.05rem] leading-tight">
                Haven Creek<br />Renovations
              </span>
            </Link>
            <p className="mt-6 text-body text-muted-foreground text-sm max-w-xs">
              Hands-on renovation for rural and acreage homes across Alberta.
            </p>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="text-minimal text-evergreen/80 mb-5">Pages</p>
            <ul className="space-y-3">
              {PAGES.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="inline-flex min-h-[44px] items-center text-body text-foreground/75 hover:text-evergreen transition-colors duration-300 text-base"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block md:col-span-3">
            <p className="text-minimal text-evergreen/80 mb-5">Where we work</p>
            <p className="text-body text-foreground/75 text-base leading-relaxed">
              {serviceAreas.map((a) => a.name).join(" · ")}
            </p>
          </div>

          <div className="col-span-2 md:col-span-3">
            <p className="text-minimal text-evergreen/80 mb-5">Contact</p>
            <Link
              to="/contact"
              className="group/btn inline-flex items-center gap-3 min-h-[44px] text-minimal text-foreground hover:text-evergreen transition-colors duration-300"
            >
              <span>Get a Free Quote</span>
              <span className="icon-chip bg-evergreen/[0.06]">
                <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Single quiet copyright row — safe-area aware on iOS */}
        <div className="footer-bottom-row mt-12 md:mt-20 border-t border-border/60 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-minimal text-muted-foreground">
            © {year} Haven Creek Renovations
          </p>
          <p className="text-minimal text-muted-foreground">
            Alberta, Canada
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
