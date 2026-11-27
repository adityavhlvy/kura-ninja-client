import { Link } from "react-router-dom";
import { Footer as ShellFooter } from "@adityavhlvy/design-system";
import type { RenderLink } from "@adityavhlvy/design-system";
import { channels, profile } from "@/data/portfolio";

const renderLink: RenderLink = ({ to, className, children, onClick, ...rest }) => (
  <Link to={to} className={className} onClick={onClick} {...rest}>
    {children}
  </Link>
);

export function Footer() {
  const { bio, philosophy } = profile;
  return (
    <ShellFooter
      profile={{
        name: bio.name,
        quote: philosophy.vibe_quote,
        colophon: "Map cells binned from Indonesian province boundaries.",
      }}
      channels={channels}
      renderLink={renderLink}
    />
  );
}
