import { Link, useLocation } from "react-router-dom";
import { SlHome, SlInfo, SlPhone, SlSocialInstagram, SlSocialLinkedin, SlEnvolope } from "react-icons/sl";
import { FiFolder } from "react-icons/fi";

interface FileTreeSidebarProps {
    isCollapsed: boolean;
}

function FileTreeSidebar({ isCollapsed }: FileTreeSidebarProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const getLinkClass = (path: string) => {
        const baseClass = isCollapsed ? "justify-center" : "";
        const activeClass = isActive(path) ? "bg-base-300 border-l-4 border-primary" : "";
        return `${baseClass} ${activeClass}`;
    };

    return (
        <ul className="menu bg-base-200 w-full h-full rounded-box">
            <li>
                <Link to="/" className={getLinkClass("/")}>
                    <SlHome size={20} />
                    {!isCollapsed && "Home"}
                </Link>
            </li>
            <li>
                <Link to="/projects" className={getLinkClass("/projects")}>
                    <FiFolder size={20} />
                    {!isCollapsed && "Projects"}
                </Link>
            </li>
            <li>
                <Link to="/about" className={getLinkClass("/about")}>
                    <SlInfo size={20} />
                    {!isCollapsed && "About"}
                </Link>
            </li>
            <li className={isCollapsed ? "tooltip tooltip-right" : ""} data-tip="Contacts">
                {isCollapsed ? (
                    <a className="justify-center">
                        <SlPhone size={20} />
                    </a>
                ) : (
                    <details open>
                        <summary>
                            <SlPhone size={20} />
                            Contacts
                        </summary>
                        <ul>
                            <li><a><SlSocialInstagram size={16} /> Instagram</a></li>
                            <li><a><SlSocialLinkedin size={16} /> LinkedIn</a></li>
                            <li><a><SlEnvolope size={16} /> Gmail</a></li>
                        </ul>
                    </details>
                )}
            </li>
        </ul>
    );
}

export default FileTreeSidebar;