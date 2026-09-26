import { Link } from "react-router-dom";
import { profile } from "@/data/portfolio";
import { ShellMark } from "@/components/ShellMark";
import { NAV } from "./Header";

export function Footer() {
  const { contact, bio, philosophy } = profile;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div className="space-y-4">
          <Link to="/" className="group inline-flex items-center gap-2.5">
            <ShellMark className="size-6" />
            <span className="font-semibold">{bio.name}</span>
          </Link>
          <p className="max-w-xs text-sm text-mute">{philosophy.vibe_quote}</p>
        </div>

        <nav aria-label="Footer">
          <p className="label mb-3">Pages</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {contact.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noreferrer" className="link">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-2 px-5 pb-8 text-xs text-mute md:px-10">
        <span>© {new Date().getFullYear()} {bio.name}</span>
        <span>Map cells binned from Indonesian province boundaries.</span>
      </div>
    </footer>
  );
}
