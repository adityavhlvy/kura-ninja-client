import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { THEMES } from "../config/theme";
import { SlArrowLeft, SlDoc, SlArrowDown, SlMenu } from "react-icons/sl";

interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
    const location = useLocation();
    const [currentTheme, setCurrentTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
        setCurrentTheme(savedTheme);
    }, []);

    const changeTheme = (theme: string) => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        setCurrentTheme(theme);
    };

    const getBreadcrumbs = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0) return 'src > view > home > Home.tsx';

        const fileMap: Record<string, string> = {
            'about': 'src > view > about > About.tsx',
            'projects': 'src > view > projects > Projects.tsx',
            'certifications': 'src > view > certifications > Certifications.tsx'
        };

        return fileMap[segments[0]] || `src > view > ${segments[0]} > ${segments[0].charAt(0).toUpperCase() + segments[0].slice(1)}.tsx`;
    };

    const currentThemeIcon = THEMES.find(t => t.name === currentTheme)?.icon;

    return (
        <div className="navbar border-b bg-base-100 z-30 min-h-[4rem]">
            <div className='navbar-start'>
                <button className="btn btn-ghost btn-circle mr-2" onClick={toggleSidebar}>
                    {isSidebarOpen ? <SlArrowLeft size={24} /> : <SlMenu size={24} />}
                </button>
                <Link to="/" className="btn btn-ghost text-xl">Logo</Link>
            </div>
            <div className='navbar-center hidden md:flex'>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-base-200 text-base-content text-sm font-mono border border-base-300">
                    <SlDoc size={16} />
                    <span className="font-bold">{getBreadcrumbs(location.pathname)}</span>
                </div>
            </div>
            <div className='navbar-end'>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 flex items-center gap-2">
                        {currentThemeIcon}
                        <span className="capitalize hidden sm:inline">{currentTheme}</span>
                        <SlArrowDown size={12} className="opacity-60" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto">

                        {
                            THEMES.map((theme) => (
                                <li key={theme.name}>
                                    <button
                                        className={`btn btn-sm btn-block btn-ghost justify-start ${currentTheme === theme.name ? 'btn-active' : ''}`}
                                        onClick={() => changeTheme(theme.name)}
                                    >
                                        <span className="text-lg">{theme.icon}</span>
                                        <span className="capitalize">{theme.name}</span>
                                    </button>
                                </li>
                            ))
                        }
                    </ul >
                </div >
            </div >
        </div >
    );
}
