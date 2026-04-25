import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import Container from "./Container";
import logo from "@/assets/logo/haven-creek-mark.webp";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * Footer — Editorial Colophon.
 * Pentagram-style back-cover of a monograph: ridge silhouette echo of the Hero,
 * brand mark + composition note, three numbered columns, oversized italic
 * sign-off with hand-drawn underline, fine-print row with First Edition mark.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-evergreen/15 bg-card overflow-hidden">
      {/* Ridge silhouette echo — closes the loop with the Final CTA's skyline */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 w-full h-[36px] text-evergreen/20 pointer-events-none"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 0 32 L 120 32 L 160 18 L 200 32 L 360 32 L 400 22 L 440 12 L 480 22 L 520 32 L 700 32 L 760 16 L 820 32 L 980 32 L 1020 24 L 1080 18 L 1140 24 L 1180 32 L 1440 32"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <Container size="wide">
        {/* Composition mark — brand mark + setting note, centered */}
        <div className="pt-20 flex flex-col items-center text-center">
          <Link to="/" aria-label="Haven Creek Renovations — home" className="inline-block">
            <img
              src={logo}
              alt="Haven Creek Renovations"
              width={56}
              height={56}
              className="h-14 w-auto"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="mt-5 font-serif italic font-light text-foreground/60 text-[0.85rem] leading-relaxed max-w-md">
            Set in Fraunces &amp; Inter. Composed in Calgary, Alberta.
            <br />
            <span className="tabular-nums tracking-widest">MMXXV</span>
          </p>
        </div>

        {/* Three numbered editorial blocks */}
        <div className="mt-16 pt-12 border-t border-border/60 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          <div>
            <p className="numeral-mark mb-3">§ I</p>
            <p className="font-serif text-foreground/90 text-[1.05rem] mb-5">Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.href}
                    className="text-body text-foreground/75 hover:text-evergreen transition-colors duration-500 text-[0.92rem]"
                  >
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="numeral-mark mb-3">§ II</p>
            <p className="font-serif text-foreground/90 text-[1.05rem] mb-5">Areas</p>
            <ul className="space-y-3">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={a.href}
                    className="text-body text-foreground/75 hover:text-evergreen transition-colors duration-500 text-[0.92rem]"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="numeral-mark mb-3">§ III</p>
            <p className="font-serif text-foreground/90 text-[1.05rem] mb-5">Talk it through</p>
            <p className="text-body text-foreground/75 text-[0.92rem] leading-relaxed max-w-xs">
              Reach out and we&apos;ll respond within two business days.
            </p>
            <Link
              to="/contact"
              className="group/btn mt-5 inline-flex items-center gap-3 text-minimal text-foreground hover:text-evergreen transition-colors duration-500"
            >
              <span>Request a Consultation</span>
              <span className="icon-chip bg-evergreen/[0.06]">
                <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Oversized sign-off — hand-drawn underline echoes the Hero "Trusted" mark */}
        <div className="mt-20 pt-14 border-t border-border/60 text-center">
          <p className="colophon-signoff inline-block relative">
            Built locally. Finished personally.
            <svg
              aria-hidden="true"
              viewBox="0 0 320 14"
              className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-[68%] h-3"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 6 9 C 80 3, 200 12, 314 6"
                stroke="hsl(var(--evergreen) / 0.45)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </p>
        </div>

        {/* Fine print — First Edition mark + colophon row */}
        <div className="mt-14 border-t border-border py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-minimal text-muted-foreground">
            © {year} Haven Creek Renovations · Alberta, Canada
          </p>
          <p className="text-minimal text-muted-foreground tabular-nums">
            No. 001 — First Edition
          </p>
          <p className="text-minimal text-muted-foreground italic font-serif normal-case tracking-normal">
            The experience of quality.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
