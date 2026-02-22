import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
    const pathname = usePathname() || "";
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <div className="text-sm breadcrumbs mb-4">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to}>
                            {isLast ? (
                                <span className="capitalize">{value}</span>
                            ) : (
                                <Link href={to} className="capitalize">{value}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
