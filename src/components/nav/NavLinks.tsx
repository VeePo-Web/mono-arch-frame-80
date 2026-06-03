import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";

const ROUTES: Array<{ to: string; label: string }> = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

/**
 * NavLinks — desktop inline route row.
 *
 * Renders at lg+. Each link uses `.nav-link` for the dark↔cream crossfade
 * (driven by `--nav-progress`) and `.nav-link--active` for the animated
 * 2px evergreen underline (scaleX from left over 300ms).
 */
const NavLinks = () => {
  const warm = (to: string) => () => prefetchRoute(to);
  return (
    <ul className="hidden lg:flex items-center justify-center gap-x-8 xl:gap-x-10">
      {ROUTES.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === "/"}
            onPointerDown={warm(to)}
            onMouseEnter={warm(to)}
            onFocus={warm(to)}
            className={({ isActive }) =>
              cn("nav-link", isActive && "nav-link--active")
            }
          >
            <span className="nav-link__label">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
