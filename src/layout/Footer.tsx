import { VscSourceControl, VscCheck, VscBell } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FooterSpotify from "../components/FooterSpotify";
import LiveClock from "../components/LiveClock";

const HINTS = [
  "Ctrl+K → Command Palette",
  "↑↑↓↓←→←→BA → ???",
  "F12 console → secret",
  "Night mode → falling stars",
];

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hintIndex, setHintIndex] = useState(0);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [textSize, setTextSize] = useState<"normal" | "large" | "xlarge">(
    "normal",
  );
  const a11yRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate hints
  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((i) => (i + 1) % HINTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Load a11y prefs
  useEffect(() => {
    setHighContrast(localStorage.getItem("a11y-high-contrast") === "true");
    setGrayscale(localStorage.getItem("a11y-grayscale") === "true");
    setTextSize((localStorage.getItem("a11y-text-size") as any) || "normal");
  }, []);

  // Apply a11y
  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast-mode",
      highContrast,
    );
    localStorage.setItem("a11y-high-contrast", String(highContrast));
    document.documentElement.classList.toggle("grayscale-mode", grayscale);
    localStorage.setItem("a11y-grayscale", String(grayscale));
    document.documentElement.classList.remove(
      "text-base",
      "text-lg",
      "text-xl",
    );
    if (textSize === "large") document.documentElement.classList.add("text-lg");
    else if (textSize === "xlarge")
      document.documentElement.classList.add("text-xl");
    else document.documentElement.classList.add("text-base");
    localStorage.setItem("a11y-text-size", textSize);
  }, [highContrast, grayscale, textSize]);

  // Close a11y panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (a11yRef.current && !a11yRef.current.contains(e.target as Node)) {
        setA11yOpen(false);
      }
    };
    if (a11yOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [a11yOpen]);

  const hasActiveA11y = highContrast || grayscale || textSize !== "normal";

  return (
    <footer className="w-full bg-muted border-t border-border text-foreground/70 text-xs flex items-center justify-between px-3 py-1 select-none z-50 font-mono relative">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscSourceControl className="text-sm" />
          <span>dev*</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscCheck className="text-sm" />
          <span>0 errors</span>
        </div>
        <div className="hidden md:flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors border-l border-border pl-3 ml-1">
          <FooterSpotify />
        </div>

        {/* Hint — rotating */}
        <div className="hidden lg:flex items-center border-l border-border pl-3 ml-1 overflow-hidden h-5">
          <span className="text-primary/50 mr-1.5">💡</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={hintIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-muted-foreground"
            >
              {HINTS[hintIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>
            Ln {mousePos.y}, Col {mousePos.x}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>UTF-8</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>TypeScript React</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors border-l border-border pl-3 ml-1">
          <LiveClock />
        </div>

        {/* Accessibility toggle */}
        <div ref={a11yRef} className="relative">
          <button
            onClick={() => setA11yOpen(!a11yOpen)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
              a11yOpen || hasActiveA11y
                ? "bg-primary/20 text-primary"
                : "hover:bg-foreground/5 text-foreground/60"
            }`}
            title="Accessibility"
            aria-label="Accessibility settings"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="4" r="2" />
              <path d="M12 6v5m0 0l-3 5m3-5l3 5" />
              <path d="M6 9h12" />
            </svg>
            <span className="hidden sm:inline">A11y</span>
          </button>

          {/* Dropdown panel */}
          <AnimatePresence>
            {a11yOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-8 right-0 w-48 bg-card border border-border rounded-sm shadow-2xl overflow-hidden"
              >
                <div className="p-2 space-y-0.5">
                  <A11yToggle
                    label="High Contrast"
                    active={highContrast}
                    onClick={() => setHighContrast(!highContrast)}
                  />
                  <A11yToggle
                    label="Grayscale"
                    active={grayscale}
                    onClick={() => setGrayscale(!grayscale)}
                  />
                </div>
                <div className="px-2 py-2 border-t border-border/50">
                  <div className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1.5">
                    Text Size
                  </div>
                  <div className="flex gap-1">
                    {(["normal", "large", "xlarge"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setTextSize(size)}
                        className={`flex-1 py-1 text-center font-bold rounded-sm transition-colors ${
                          textSize === size
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-foreground/5"
                        }`}
                        style={{
                          fontSize:
                            size === "normal"
                              ? "10px"
                              : size === "large"
                                ? "12px"
                                : "14px",
                        }}
                      >
                        A
                      </button>
                    ))}
                  </div>
                </div>
                {hasActiveA11y && (
                  <button
                    onClick={() => {
                      setHighContrast(false);
                      setGrayscale(false);
                      setTextSize("normal");
                    }}
                    className="w-full text-[9px] text-destructive/60 hover:text-destructive py-1.5 border-t border-border/50 transition-colors"
                  >
                    RESET
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 hover:bg-foreground/5 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscBell className="text-sm" />
        </div>
      </div>
    </footer>
  );
}

function A11yToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-foreground/5 transition-colors"
    >
      <span className="text-[11px] text-foreground/70">{label}</span>
      <div
        className={`w-6 h-3.5 rounded-full relative transition-colors ${active ? "bg-primary" : "bg-border"}`}
      >
        <div
          className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${
            active
              ? "bg-primary-foreground left-[11px]"
              : "bg-muted-foreground/50 left-[2px]"
          }`}
        />
      </div>
    </button>
  );
}
