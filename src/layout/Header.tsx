import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { PiListBold, PiMagnifyingGlassBold, PiMoonBold, PiSunBold, PiXBold } from "react-icons/pi";
import clsx from "clsx";
import { ShellMark } from "@/components/ShellMark";
import { useTheme } from "@/lib/theme";
import { ease } from "@/components/Reveal";

export const NAV = [
  { to: "/projects", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/certifications", label: "Credentials" },
  { to: "/contact", label: "Contact" },
];

export function Header({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Slide away while reading down, come back the moment the reader scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 8);
  });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !menuOpen ? "-100%" : 0 }}
        transition={{ duration: 0.45, ease }}
        className={clsx(
          "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
          scrolled || menuOpen ? "border-line bg-paper" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 md:px-10">
          <Link to="/" className="group mr-auto flex items-center gap-2.5" aria-label="Kura Ninja, home">
            <ShellMark className="size-7" />
            <span className="text-[15px] font-semibold tracking-tight [font-variation-settings:'wdth'_112]">
              Kura Ninja
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className="relative block px-3 py-2 text-sm">
                    {({ isActive }) => (
                      <>
                        <span className={clsx("transition-colors", isActive ? "text-ink" : "text-mute hover:text-ink")}>
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="nav-mark"
                            className="absolute inset-x-3 -bottom-px h-0.5 bg-sea"
                            transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenCommand}
              className="hidden h-9 items-center gap-2 border border-line px-3 text-sm text-mute transition-colors hover:border-ink hover:text-ink sm:flex"
            >
              <PiMagnifyingGlassBold aria-hidden="true" />
              <span>Jump to</span>
              <kbd className="font-mono text-[11px]">{isMac ? "⌘K" : "Ctrl K"}</kbd>
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="grid size-9 place-items-center text-mute transition-colors hover:text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === "dark" ? <PiSunBold aria-hidden="true" /> : <PiMoonBold aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center md:hidden"
            >
              {menuOpen ? <PiXBold aria-hidden="true" /> : <PiListBold aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-30 flex flex-col bg-paper px-5 pt-24 pb-8 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {[{ to: "/", label: "Home" }, ...NAV].map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}
                  >
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        clsx("display block py-2 text-5xl", isActive ? "text-sea" : "text-ink")
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenCommand();
              }}
              className="mt-auto flex h-11 items-center gap-2 self-start border border-line px-4 text-sm text-mute"
            >
              <PiMagnifyingGlassBold aria-hidden="true" /> Jump to a project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
