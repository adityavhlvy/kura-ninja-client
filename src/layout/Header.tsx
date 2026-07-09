import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlDoc, SlMenu } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import KuraTurtle from "../components/svg/KuraTurtle";

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
    if (segments.length === 0) return "kura-ninja › src › views › Home.tsx";

    const fileMap: Record<string, string> = {
      about: "kura-ninja › src › views › about.md",
      contact: "kura-ninja › src › views › contact.json",
      projects: "kura-ninja › src › quests › projects.json",
      certifications: "kura-ninja › src › quests › badges.json",
      "design-system": "kura-ninja › DESIGN.md",
    };

    return fileMap[segments[0]] || `kura-ninja › src › views › ${segments[0]}`;
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
        <Link
          to="/"
          className="flex items-center gap-2 px-2 hover:opacity-80 transition-opacity"
        >
          <KuraTurtle size={56} />
          <span className="font-bold text-foreground/80 text-sm hidden sm:inline">
            Kura Ninja
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2 text-foreground text-[11px] md:text-xs font-mono opacity-50">
        <SlDoc size={14} className="shrink-0" />
        <span className="truncate max-w-[80px] md:max-w-none">
          {getBreadcrumbs(pathname)}
        </span>
      </div>

      {/* Theme Toggle — responsive container */}
      <div className="flex items-center">
        {/* Mobile Toggle — compact sky scene */}
        <button
          onClick={toggleTheme}
          className="relative flex sm:hidden items-center bg-muted/80 border border-border hover:border-primary/40 rounded-full p-1 h-9 w-[86px] overflow-hidden transition-all duration-500 group shadow-md cursor-pointer select-none"
          aria-label={`Switch to ${isSenja ? "Fajar" : "Senja"} theme`}
          title={
            isSenja ? "Switch to Fajar (Dawn)" : "Switch to Senja (Twilight)"
          }
        >
          {/* Sliding sky-scene portal capsule */}
          <motion.div
            className="absolute top-1 bottom-1 w-[38px] rounded-full overflow-hidden border border-white/10 shadow-inner z-0 pointer-events-none"
            initial={false}
            animate={{
              x: isSenja ? 40 : 0,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          >
            {/* Sky gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isSenja
                  ? "linear-gradient(to bottom, #0a0a20 0%, #180e2a 40%, #3c1a4c 75%, #6a2a35 100%)"
                  : "linear-gradient(to bottom, #ff9e79 0%, #ffc3a0 35%, #ffd480 70%, #ffeaa7 100%)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Stars (senja only) */}
            <motion.div
              animate={{ opacity: isSenja ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div className="absolute top-1 left-2 w-[1px] h-[1px] bg-white/70 rounded-full" />
              <div className="absolute top-3 left-4 w-[1.5px] h-[1.5px] bg-white/80 rounded-full shadow-[0_0_2px_#fff]" />
              <div className="absolute top-1.5 right-2.5 w-[1px] h-[1px] bg-white/50 rounded-full" />
            </motion.div>

            {/* Horizon line */}
            <div className="absolute bottom-1.5 left-0 right-0 h-[1px] bg-white/15" />

            {/* Ground */}
            <motion.div
              animate={{
                backgroundColor: isSenja ? "#09090e" : "#8a583e",
              }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-1"
            />
          </motion.div>

          {/* Fajar Icon */}
          <div className="flex items-center justify-center w-[38px] h-full z-10 transition-colors duration-300 pointer-events-none">
            <Sun
              className={`w-4 h-4 transition-colors duration-300 ${!isSenja ? "text-amber-950 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            />
          </div>

          {/* Senja Icon */}
          <div className="flex items-center justify-center w-[38px] h-full z-10 transition-colors duration-300 pointer-events-none">
            <Moon
              className={`w-4 h-4 transition-colors duration-300 ${isSenja ? "text-primary font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            />
          </div>
        </button>

        {/* Desktop Toggle — sky scene */}
        <button
          onClick={toggleTheme}
          className="relative hidden sm:flex items-center bg-muted/80 border border-border hover:border-primary/40 rounded-full p-1 h-9 w-[172px] font-mono text-[11px] select-none cursor-pointer overflow-hidden transition-all duration-500 group shadow-md"
          aria-label={`Switch to ${isSenja ? "Fajar" : "Senja"} theme`}
          title={
            isSenja ? "Switch to Fajar (Dawn)" : "Switch to Senja (Twilight)"
          }
        >
          {/* Sliding sky-scene portal capsule */}
          <motion.div
            className="absolute top-1 bottom-1 w-[82px] rounded-full overflow-hidden border border-white/10 shadow-inner z-0 pointer-events-none"
            initial={false}
            animate={{
              x: isSenja ? 82 : 0,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          >
            {/* Sky gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: isSenja
                  ? "linear-gradient(to bottom, #0a0a20 0%, #180e2a 40%, #3c1a4c 75%, #6a2a35 100%)"
                  : "linear-gradient(to bottom, #ff9e79 0%, #ffc3a0 35%, #ffd480 70%, #ffeaa7 100%)",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Stars (senja only) */}
            <motion.div
              animate={{ opacity: isSenja ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div className="absolute top-1 left-2 w-[1.5px] h-[1.5px] bg-white/70 rounded-full" />
              <div className="absolute top-3 left-6 w-[2px] h-[2px] bg-white/80 rounded-full shadow-[0_0_2px_#fff]" />
              <div className="absolute top-1.5 right-4 w-[1px] h-[1px] bg-white/50 rounded-full" />
              <div className="absolute top-2.5 right-8 w-[1.5px] h-[1.5px] bg-white/60 rounded-full" />
            </motion.div>

            {/* Horizon line */}
            <div className="absolute bottom-1.5 left-0 right-0 h-[1px] bg-white/15" />

            {/* Ground */}
            <motion.div
              animate={{
                backgroundColor: isSenja ? "#09090e" : "#8a583e",
              }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-1"
            />
          </motion.div>

          {/* Fajar Label */}
          <div className="flex items-center justify-center gap-1.5 w-[82px] h-full z-10 transition-colors duration-300 pointer-events-none">
            <Sun
              className={`w-3.5 h-3.5 transition-colors duration-300 ${!isSenja ? "text-amber-950 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            />
            <span
              className={`font-semibold transition-colors duration-300 ${!isSenja ? "text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            >
              Fajar
            </span>
          </div>

          {/* Senja Label */}
          <div className="flex items-center justify-center gap-1.5 w-[82px] h-full z-10 transition-colors duration-300 pointer-events-none">
            <Moon
              className={`w-3.5 h-3.5 transition-colors duration-300 ${isSenja ? "text-primary font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            />
            <span
              className={`font-semibold transition-colors duration-300 ${isSenja ? "text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" : "text-muted-foreground/60 group-hover:text-muted-foreground"}`}
            >
              Senja
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
