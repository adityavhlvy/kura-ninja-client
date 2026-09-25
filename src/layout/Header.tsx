import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiSunLight,
  PiMoonLight,
  PiMagnifyingGlassLight,
  PiSpeakerHighLight,
  PiSpeakerSimpleSlashLight,
} from "react-icons/pi";
import KuraTurtle from "../components/svg/KuraTurtle";
import { playTick, playPop, isSoundEnabled, setSoundEnabled } from "@/lib/sound";

interface HeaderProps {
  onOpenCommandPalette?: () => void;
}

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/about", label: "About" },
  { path: "/certifications", label: "Certifications" },
  { path: "/contact", label: "Contact" },
];

export default function Header({ onOpenCommandPalette }: HeaderProps) {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState("senja");
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "senja";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
    setSoundOn(isSoundEnabled());
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === "senja" ? "fajar" : "senja";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
    playPop();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playTick();
  };

  const isSenja = theme === "senja";

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto w-full max-w-5xl rounded-full bg-card/85 backdrop-blur-2xl border border-border/80 px-3 sm:px-4 py-2 shadow-2xl shadow-black/15 flex items-center justify-between transition-all duration-300"
        >
          {/* Brand */}
          <Link
            to="/"
            onClick={() => playTick()}
            className="flex items-center gap-2 px-1 group"
          >
            <div className="relative flex items-center justify-center">
              <KuraTurtle size={36} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                kura-ninja
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/75 tracking-wider hidden sm:block">
                ADITYA VAHLEVY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-muted/40 p-1 rounded-full border border-border/40">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => playTick()}
                  className={`relative px-3.5 py-1 text-xs font-mono tracking-tight transition-colors duration-200 select-none ${
                    isActive
                      ? "text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-active-pill"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 cursor-pointer ${
                soundOn
                  ? "bg-primary/15 text-primary border-primary/40 shadow-xs"
                  : "bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border-border/60"
              }`}
              title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
              aria-label={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
            >
              {soundOn ? (
                <PiSpeakerHighLight size={15} />
              ) : (
                <PiSpeakerSimpleSlashLight size={15} />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60 transition-colors cursor-pointer"
              title={`Switch to ${isSenja ? "Fajar (light theme)" : "Senja (dark theme)"}`}
              aria-label="Toggle visual theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSenja ? (
                    <PiSunLight size={15} className="text-primary" />
                  ) : (
                    <PiMoonLight size={15} className="text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Command Palette Button */}
            <button
              type="button"
              onClick={() => {
                playTick();
                onOpenCommandPalette?.();
              }}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60 transition-colors cursor-pointer"
              title="Search and actions (Ctrl+K)"
              aria-label="Open command palette"
            >
              <PiMagnifyingGlassLight size={13} className="shrink-0" />
              <span className="text-[11px]">Command</span>
              <kbd className="text-[9px] px-1 py-0.5 rounded bg-background/80 border border-border/60 text-muted-foreground leading-none">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Hamburger Morph */}
            <button
              type="button"
              onClick={() => {
                playTick();
                setMobileMenuOpen((prev) => !prev);
              }}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full bg-muted/40 border border-border/60 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-3.5 h-[1.5px] bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : "mb-1"
                }`}
              />
              <span
                className={`w-3.5 h-[1.5px] bg-foreground transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-40 md:hidden p-4 rounded-3xl bg-card/95 backdrop-blur-2xl border border-border shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.path);

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        playTick();
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-2xl text-sm font-mono transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-foreground/80 hover:bg-muted"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-2 pt-3 border-t border-border/50 flex justify-between items-center px-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette?.();
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground"
                >
                  <PiMagnifyingGlassLight size={14} />
                  <span>Command Palette (⌘K)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
