import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { ChannelList } from "@/components/ChannelList";
import { LogoMark } from "@/components/LogoMark";
import { NAV } from "./Header";
import { wrap } from "@/lib/wrap";

/** A designed close: every way to reach me, links small, and the name across the full width, cut by the bottom edge. */
export function Footer() {
  const { bio, philosophy } = profile;
  return (
    <footer className="overflow-hidden bg-sunk pt-20 md:pt-28">
      <div className={`${wrap} grid gap-12 md:grid-cols-12 md:gap-6`}>
        <ChannelList className="md:col-span-6" />
        <nav aria-label="Footer" className="grid grid-cols-2 gap-6 md:col-span-5 md:col-start-8">
          <ul className="space-y-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-sea">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="col-span-2 text-mute">{philosophy.vibe_quote}</p>
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
