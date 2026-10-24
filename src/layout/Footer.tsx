import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { LogoMark } from "@/components/LogoMark";
import { NAV } from "./Header";
import { wrap } from "@/lib/wrap";

const PLACES = ["LinkedIn", "GitHub"];

/** A designed close: ways to reach me large, links small, and the name across the full width, cut by the bottom edge. */
export function Footer() {
  const { contact, bio, philosophy } = profile;
  return (
    <footer className="overflow-hidden bg-sunk pt-20 md:pt-28">
      <div className={`${wrap} grid gap-12 md:grid-cols-12 md:gap-6`}>
        <ul className="space-y-2 text-[clamp(1.375rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-tight md:col-span-5">
          <li>
            <a href={`mailto:${contact.email}`} className="text-sea hover:text-ink">
              Email
            </a>
          </li>
          {contact.socials
            .filter((s) => PLACES.includes(s.name))
            .map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-sea hover:text-ink">
                  {s.name}
                </a>
              </li>
            ))}
        </ul>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-6 md:col-span-6 md:col-start-7 md:grid-cols-3">
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-sea">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {contact.socials
              .filter((s) => !PLACES.includes(s.name))
              .map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-sea">
                    {s.name}
                  </a>
                </li>
              ))}
          </ul>
          <p className="col-span-2 text-mute md:col-span-1">{philosophy.vibe_quote}</p>
        </nav>
      </div>
      <div className={`${wrap} mt-20 flex flex-wrap items-center justify-between gap-4 text-sm text-mute md:mt-24`}>
        <span>
          © {new Date().getFullYear()} {bio.name}. Map cells binned from Indonesian province boundaries.
        </span>
        <Link to="/" className="group inline-flex items-center gap-3 text-ink" aria-label="Home">
          <LogoMark arrive={false} className="w-12" />
        </Link>
      </div>
      <p aria-hidden="true" className={`${wrap} display mt-8 -mb-[0.2em] text-[min(6.6vw,96px)] leading-none whitespace-nowrap`}>
        {bio.name}
      </p>
    </footer>
  );
}
