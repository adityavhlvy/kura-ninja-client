import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { THEMES } from "../config/theme";
import { SlArrowLeft, SlDoc, SlArrowDown, SlMenu } from "react-icons/sl";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const pathname = usePathname() || "";
  const [currentTheme, setCurrentTheme] = useState("senja");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "senja";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const getBreadcrumbs = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "src > view > home > Home.tsx";

    if (segments[0] === "playground") {
      if (segments.length === 1)
        return "src > view > playground > Playground.tsx";
      const game = segments[1];
      // Simple mapping for known experiments, fall back to capitalized generic
      const gameFileMap: Record<string, string> = {
        "anti-ux": "AntiUX",
        void: "ScreamingVoid",
      };
      const fileName =
        gameFileMap[game] || game.charAt(0).toUpperCase() + game.slice(1);
      return `src > view > playground > experiments > ${game} > ${fileName}.tsx`;
    }

    const fileMap: Record<string, string> = {
      about: "src > view > about > About.tsx",
      projects: "src > view > projects > Projects.tsx",
      certifications: "src > view > certifications > Certifications.tsx",
      "design-system": "src > view > design-system > DesignSystem.tsx",
    };

    return (
      fileMap[segments[0]] ||
      `src > view > ${segments[0]} > ${segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
      }.tsx`
    );
  };

  const currentThemeIcon = THEMES.find((t) => t.name === currentTheme)?.icon;

  return (
    <div className="navbar border-b bg-base-100 z-30 min-h-16">
      <div className="navbar-start">
        <button
          className="btn btn-ghost btn-circle btn-sm md:btn-md mr-1 md:mr-2"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <SlArrowLeft size={24} /> : <SlMenu size={24} />}
        </button>
        <Link href="/" className="btn btn-ghost text-lg md:text-xl px-2 gap-2">
          <span className="text-xl">🐢</span>
          <span className="font-bold text-base-content/80 hidden sm:inline">Kura Ninja</span>
        </Link>
      </div>
      <div className="navbar-center">
        <div className="flex items-center gap-2 text-base-content text-xs md:text-sm font-mono opacity-70">
          <SlDoc size={16} className="shrink-0" />
          <span className="font-bold truncate max-w-[100px] md:max-w-none">
            {getBreadcrumbs(pathname)}
          </span>
        </div>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm md:btn-md m-0 md:m-1 flex items-center gap-2"
          >
            {currentThemeIcon}
            <span className="capitalize hidden sm:inline">{currentTheme}</span>
            <SlArrowDown size={12} className="opacity-60" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-1 p-2 shadow-2xl bg-base-300 rounded-box w-52 max-h-96 overflow-y-auto"
          >
            {THEMES.map((theme) => (
              <li key={theme.name}>
                <button
                  className={`btn btn-sm btn-block btn-ghost justify-start ${currentTheme === theme.name ? "btn-active" : ""
                    }`}
                  onClick={() => changeTheme(theme.name)}
                >
                  <span className="text-lg">{theme.icon}</span>
                  <span className="capitalize">{theme.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
