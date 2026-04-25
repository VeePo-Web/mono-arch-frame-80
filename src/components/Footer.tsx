import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "./Container";
import logo from "@/assets/logo/haven-creek-mark.webp";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/serviceAreas";

/**
 * Footer — quiet closing page.
 * Three editorial blocks; warm card surface; hairline rule above; logo + serif italic line as the brand signature.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-evergreen/15 bg-card">
      <Container size="wide">
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link to="/" aria-label="Haven Creek Renovations — home" className="inline-block">
              <img
                src={logo}
                alt="Haven Creek Renovations"
                width={56}
                height={56}
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-6 text-subhead text-foreground/80 max-w-sm">
              One trusted contractor for the property you value.
            </p>
            <p className="mt-4 text-body text-muted-foreground max-w-sm text-[0.95rem] leading-relaxed">
              Hands-on renovation work for rural homes across Bragg Creek,
              Rocky View County, Bearspaw, and Water Valley.
            </p>
          </div>

          {/* Services + Areas columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <p className="text-minimal text-evergreen mb-5">· SERVICES</p>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={s.href}
                      className="text-body text-foreground/80 hover:text-evergreen transition-colors duration-500 text-[0.95rem]"
                    >
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-minimal text-evergreen mb-5">· AREAS</p>
              <ul className="space-y-3">
                {serviceAreas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={a.href}
                      className="text-body text-foreground/80 hover:text-evergreen transition-colors duration-500 text-[0.95rem]"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + CTA */}
          <div className="md:col-span-3">
            <p className="text-minimal text-evergreen mb-5">· TALK IT THROUGH</p>
            <p className="text-body text-foreground/80 text-[0.95rem] leading-relaxed">
              Reach out and we'll respond within two business days.
            </p>
            <Link
              to="/contact"
              className="group/btn mt-6 inline-flex items-center gap-3 text-minimal text-foreground hover:text-evergreen transition-colors duration-500"
            >
              <span>Request a Consultation</span>
              <span className="icon-chip bg-evergreen/[0.06]">
                <ArrowUpRight className="h-3.5 w-3.5 text-evergreen" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-border py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-minimal text-muted-foreground">
            © {year} Haven Creek Renovations · Alberta, Canada
          </p>
          <p className="text-minimal text-muted-foreground">
            The experience of quality. The quality of experience.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
