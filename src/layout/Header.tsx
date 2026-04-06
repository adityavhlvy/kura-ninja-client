import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { THEMES } from "../config/theme";
import { SlArrowLeft, SlDoc, SlArrowDown, SlMenu } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <header className="flex h-16 w-full items-center justify-between border-b bg-background z-30 px-4">
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-10 md:w-10"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <SlArrowLeft size={24} /> : <SlMenu size={24} />}
        </Button>
        <Link href="/" className="flex items-center gap-2 px-2 hover:bg-accent rounded-md py-1 transition-colors">
          <span className="text-xl">🐢</span>
          <span className="font-bold text-foreground/80 hidden sm:inline">Kura Ninja</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 text-foreground text-xs md:text-sm font-mono opacity-70">
        <SlDoc size={16} className="shrink-0" />
        <span className="font-bold truncate max-w-[100px] md:max-w-none">
          {getBreadcrumbs(pathname)}
        </span>
      </div>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="m-0 md:m-1 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white border-none h-8 md:h-10"
            >
              {currentThemeIcon}
              <span className="capitalize hidden sm:inline">{currentTheme}</span>
              <SlArrowDown size={12} className="opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 max-h-96 overflow-y-auto bg-card border-border shadow-2xl">
            {THEMES.map((theme) => (
              <DropdownMenuItem 
                key={theme.name}
                className={`flex items-center gap-2 cursor-pointer ${currentTheme === theme.name ? "bg-accent text-accent-foreground" : ""}`}
                onClick={() => changeTheme(theme.name)}
              >
                <span className="text-lg">{theme.icon}</span>
                <span className="capitalize">{theme.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
