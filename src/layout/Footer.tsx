import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LiveClock from "../components/LiveClock";

type TextSize = "normal" | "large" | "xlarge";

export default function Footer() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const a11yRef = useRef<HTMLDivElement>(null);

  // Load stored preferences
  useEffect(() => {
    setHighContrast(localStorage.getItem("a11y-high-contrast") === "true");
    setGrayscale(localStorage.getItem("a11y-grayscale") === "true");
    setTextSize((localStorage.getItem("a11y-text-size") as TextSize) || "normal");
  }, []);

  // Apply preferences
  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast-mode",
      highContrast,
    );
    localStorage.setItem("a11y-high-contrast", String(highContrast));
    document.documentElement.classList.toggle("grayscale-mode", grayscale);
    localStorage.setItem("a11y-grayscale", String(grayscale));
    document.documentElement.classList.remove("text-lg", "text-xl");
    if (textSize === "large") document.documentElement.classList.add("text-lg");
    else if (textSize === "xlarge")
      document.documentElement.classList.add("text-xl");
    localStorage.setItem("a11y-text-size", textSize);
  }, [highContrast, grayscale, textSize]);

  // Close panel on outside click
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
    <footer className="w-full bg-muted border-t border-border text-foreground/60 text-xs flex items-center justify-between px-3 py-1.5 select-none z-50 font-mono">
      <div className="flex items-center gap-2 truncate">
        <span className="text-muted-foreground/80 truncate">
          © {new Date().getFullYear()} Aditya Vahlevy Nugraha
        </span>
        <span className="hidden sm:inline text-muted-foreground/40">
          · Kura Ninja
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <LiveClock />

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