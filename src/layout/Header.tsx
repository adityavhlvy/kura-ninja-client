import { Link, useLocation } from "react-router-dom";
import { Header as ShellHeader, NAV } from "@adityavhlvy/design-system";
import type { RenderLink } from "@adityavhlvy/design-system";

export { NAV };

const renderLink: RenderLink = ({ to, className, children, onClick, ...rest }) => (
  <Link to={to} className={className} onClick={onClick} {...rest}>
    {children}
  </Link>
);

export function Header({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { pathname } = useLocation();
  return <ShellHeader activePath={pathname} onSearch={onOpenCommand} renderLink={renderLink} />;
}
