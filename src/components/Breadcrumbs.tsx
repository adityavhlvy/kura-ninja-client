import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="text-sm breadcrumbs mb-4">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span className="capitalize">{value}</span>
                            ) : (
                                <Link to={to} className="capitalize">{value}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
