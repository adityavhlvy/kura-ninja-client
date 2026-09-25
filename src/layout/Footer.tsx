import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiLinkedinLogoLight,
  PiGithubLogoLight,
  PiEnvelopeLight,
  PiSlidersHorizontalLight,
  PiClockLight,
} from "react-icons/pi";
import { SiGitlab } from "react-icons/si";
import { playTick } from "@/lib/sound";
import profileJson from "../data/profile.json";

type TextSize = "normal" | "large" | "xlarge";

export default function Footer() {
  const [a11yOpen, setA11yOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const a11yRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState("");

  // Live time (WIB / UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTimeStr(`${formatted} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load preferences
  useEffect(() => {
    setHighContrast(localStorage.getItem("a11y-high-contrast") === "true");
    setGrayscale(localStorage.getItem("a11y-grayscale") === "true");
    setTextSize(
      (localStorage.getItem("a11y-text-size") as TextSize) || "normal"
    );
  }, []);

  // Apply preferences
  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast-mode",
      highContrast
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

  // Outside click
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
    <footer className="w-full border-t border-border/80 bg-card/60 backdrop-blur-md text-muted-foreground text-xs select-none relative z-30 font-mono">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Identity and affiliation */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span className="font-bold text-foreground">
            {profileJson.bio.name}
          </span>
          <span className="hidden sm:inline text-border">/</span>
          <span className="text-[11px] text-muted-foreground/90">
            {profileJson.bio.current_role_detail}
          </span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/adityavhlvy/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick()}
            className="p-1.5 rounded-full hover:text-primary hover:bg-muted transition-colors"
            title="GitHub"
            aria-label="GitHub profile"
          >
            <PiGithubLogoLight size={16} />
          </a>
          <a
            href="https://gitlabduo.pupuk-indonesia.com/adityavhlvy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick()}
            className="p-1.5 rounded-full hover:text-primary hover:bg-muted transition-colors"
            title="Pupuk Indonesia GitLab"
            aria-label="GitLab profile"
          >
            <SiGitlab size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/adityavahlevynugraha"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick()}
            className="p-1.5 rounded-full hover:text-primary hover:bg-muted transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn profile"
          >
            <PiLinkedinLogoLight size={16} />
          </a>
          <a
            href={`mailto:${profileJson.contact.email}`}
            onClick={() => playTick()}
            className="p-1.5 rounded-full hover:text-primary hover:bg-muted transition-colors"
            title="Email"
            aria-label="Send Email"
          >
            <PiEnvelopeLight size={16} />
          </a>
        </div>

        {/* Right: Clock & A11y Drawer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full border border-border/40">
            <PiClockLight size={13} className="text-primary" />
            <span>{timeStr || "Jakarta"}</span>
          </div>

          <div ref={a11yRef} className="relative">
            <button
              type="button"
              onClick={() => {
                playTick();
                setA11yOpen(!a11yOpen);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border transition-all cursor-pointer ${
                a11yOpen || hasActiveA11y
                  ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50"
              }`}
              title="Accessibility settings"
              aria-label="Accessibility settings"
            >
              <PiSlidersHorizontalLight size={13} />
              <span>A11y</span>
            </button>

            <AnimatePresence>
              {a11yOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-10 right-0 w-52 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-3 space-y-3 z-50 text-foreground"
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border-b border-border/50 pb-1.5">
                    Display Settings
                  </div>

                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        playTick();
                        setHighContrast(!highContrast);
                      }}
                      className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-muted text-xs cursor-pointer transition-colors"
                    >
                      <span>High Contrast</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          highContrast
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {highContrast ? "ON" : "OFF"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTick();
                        setGrayscale(!grayscale);
                      }}
                      className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-muted text-xs cursor-pointer transition-colors"
                    >
                      <span>Monochrome</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          grayscale
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {grayscale ? "ON" : "OFF"}
                      </span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground mb-1.5">
                      Font Scale
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {(["normal", "large", "xlarge"] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            playTick();
                            setTextSize(sz);
                          }}
                          className={`py-1 rounded text-center text-xs font-bold transition-colors cursor-pointer ${
                            textSize === sz
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/60 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {sz === "normal" ? "1x" : sz === "large" ? "1.2x" : "1.4x"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveA11y && (
                    <button
                      type="button"
                      onClick={() => {
                        playTick();
                        setHighContrast(false);
                        setGrayscale(false);
                        setTextSize("normal");
                      }}
                      className="w-full py-1 text-[10px] text-destructive hover:bg-destructive/10 rounded font-bold transition-colors cursor-pointer"
                    >
                      Reset Accessibility
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </footer>
  );
}
