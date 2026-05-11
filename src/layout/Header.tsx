import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlDoc, SlMenu } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { pathname } = useLocation();
  const [currentTheme, setCurrentTheme] = useState("senja");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "senja";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = currentTheme === "senja" ? "fajar" : "senja";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setCurrentTheme(next);
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

  const isSenja = currentTheme === "senja";

  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-border bg-background z-30 px-4">
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-9 md:w-9"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <SlArrowLeft size={18} /> : <SlMenu size={18} />}
        </Button>
        <Link to="/" className="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity">
          <span className="text-lg">🐢</span>
          <span className="font-bold text-foreground/80 text-sm hidden sm:inline">Kura Ninja</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-2 text-foreground text-[11px] md:text-xs font-mono opacity-50">
        <SlDoc size={14} className="shrink-0" />
        <span className="truncate max-w-[80px] md:max-w-none">
          {getBreadcrumbs(pathname)}
        </span>
      </div>

      {/* Theme Toggle — sky scene */}
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="relative h-8 w-16 rounded-full overflow-hidden border border-border hover:border-primary/40 transition-all duration-500 group"
          aria-label={`Switch to ${isSenja ? "Fajar" : "Senja"} theme`}
          title={isSenja ? "Switch to Fajar (Dawn)" : "Switch to Senja (Twilight)"}
        >
          {/* Sky gradient background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isSenja
                ? "linear-gradient(to bottom, #0a0a1a 0%, #1a1030 40%, #3a2040 70%, #5a3030 100%)"
                : "linear-gradient(to bottom, #e08050 0%, #f0a060 30%, #f8c080 60%, #fde8b0 100%)"
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Stars (senja only) */}
          <motion.div
            animate={{ opacity: isSenja ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <div className="absolute top-1.5 left-3 w-[2px] h-[2px] bg-white/60 rounded-full" />
            <div className="absolute top-2.5 right-4 w-[1.5px] h-[1.5px] bg-white/40 rounded-full" />
            <div className="absolute top-1 right-2 w-[1px] h-[1px] bg-white/50 rounded-full" />
          </motion.div>

          {/* Celestial body — moon or sun */}
          <motion.div
            animate={{
              x: isSenja ? 8 : 36,
              y: isSenja ? 4 : 2,
              scale: isSenja ? 0.9 : 1.1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-0 left-0"
          >
            <motion.div
              animate={{
                backgroundColor: isSenja ? "#e8e0c0" : "#f0c040",
                boxShadow: isSenja
                  ? "0 0 4px rgba(232,224,192,0.3)"
                  : "0 0 8px rgba(240,192,64,0.5), 0 0 16px rgba(240,160,40,0.2)",
              }}
              transition={{ duration: 0.5 }}
              className="w-4 h-4 rounded-full"
            />
            {/* Moon crescent shadow */}
            <motion.div
              animate={{ opacity: isSenja ? 1 : 0, scale: isSenja ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="absolute top-[1px] left-[3px] w-3 h-3 rounded-full bg-[#1a1030]"
            />
          </motion.div>

          {/* Horizon line */}
          <div className="absolute bottom-2 left-0 right-0 h-[1px] bg-white/10" />

          {/* Ground */}
          <motion.div
            animate={{
              backgroundColor: isSenja ? "#0a0a12" : "#8a7060"
            }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-2 rounded-b-full"
          />
        </button>
      </div>
    </header>
  );
}
