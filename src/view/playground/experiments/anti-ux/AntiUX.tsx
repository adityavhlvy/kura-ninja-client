import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AntiUX = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("#ff0000");
  const [phone, setPhone] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(0);
  const [tosAgreed, setTosAgreed] = useState(false);
  const [submitPos, setSubmitPos] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [cursorChaos, setCursorChaos] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // RNG Phone
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentDigit(Math.floor(Math.random() * 10));
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  // Cursor chaos after 3 hover attempts on submit
  useEffect(() => {
    if (hoverCount >= 3) {
      setCursorChaos(true);
      const timer = setTimeout(() => setCursorChaos(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hoverCount]);

  const toggleRoll = () => {
    if (isRolling) {
      setPhone((prev) => prev + currentDigit);
      setIsRolling(false);
    } else {
      if (phone.length >= 12) return;
      setIsRolling(true);
    }
  };

  const moveButton = () => {
    if (!tosAgreed) return;
    setHoverCount((c) => c + 1);
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 200;
    setSubmitPos({ x, y });
  };

  const hexToName = (hex: string) => {
    const syllables = ["Zyx", "Qor", "Vex", "Nul", "Kra", "Pho", "Xit", "Wrm"];
    const val = parseInt(hex.replace("#", ""), 16);
    return `SUBJECT-${syllables[val % syllables.length]}-${val.toString(16).slice(0, 4).toUpperCase()}`;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 bg-[#080808] text-[#ccc] flex flex-col items-center justify-center overflow-hidden z-10 ${cursorChaos ? "cursor-none" : ""}`}
      style={cursorChaos ? { cursor: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='28' font-size='28'>💀</text></svg>") 16 16, auto` } : {}}
    >
      {/* Background noise */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Red vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(180,0,0,0.08)_100%)] pointer-events-none z-0" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.1) 3px, rgba(255,0,0,0.1) 4px)",
      }} />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center space-y-6 p-8 relative z-20"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl"
            >
              💀
            </motion.div>
            <h2 className="text-2xl font-black text-red-500 uppercase tracking-[0.2em]">
              FATAL ERROR: Success
            </h2>
            <p className="text-sm text-[#555] font-mono">
              We didn't expect anyone to survive this far.
            </p>
            <p className="text-[10px] text-[#333] font-mono">
              Your data has been sent to /dev/null
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setPhone("");
                setTosAgreed(false);
                setHoverCount(0);
                setAge(0);
              }}
              className="mt-4 px-6 py-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-[0.3em] hover:bg-red-500/20 transition-colors"
            >
              Suffer Again
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md px-6 relative z-20"
          >
            {/* Header */}
            <div className="mb-8 text-center">
              <motion.h1
                animate={{ x: [0, -1, 1, 0] }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                className="text-2xl font-black uppercase tracking-[0.15em] text-red-500/80"
              >
                HELL FORM v6.6.6
              </motion.h1>
              <p className="text-[10px] font-mono text-[#444] mt-2 tracking-[0.3em]">
                EVERY FIELD IS A PUNISHMENT
              </p>
            </div>

            <div className="space-y-5">
              {/* ─── NAME (Color Picker) ─── */}
              <FieldWrapper label="IDENTITY" sublabel="Pick your name via color">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="color"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-10 h-10 cursor-crosshair rounded-none border-2 border-white/10 bg-transparent"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-mono font-bold text-white/80">{hexToName(name)}</div>
                    <div className="text-[10px] font-mono text-[#444]">{name}</div>
                  </div>
                </div>
              </FieldWrapper>

              {/* ─── AGE (Slider with screaming) ─── */}
              <FieldWrapper label="AGE" sublabel="Slide to confess your years">
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/5 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:cursor-grab"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-[#444]">FETUS</span>
                    <motion.span
                      key={age}
                      initial={{ scale: 1.5, color: "#ff0000" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      className="text-2xl font-black font-mono tabular-nums"
                    >
                      {age}
                    </motion.span>
                    <span className="text-[10px] font-mono text-[#444]">FOSSIL</span>
                  </div>
                </div>
              </FieldWrapper>

              {/* ─── PHONE (Slot Machine) ─── */}
              <FieldWrapper label="PHONE" sublabel="Stop the slot to enter each digit">
                <div className="space-y-3">
                  {/* Display */}
                  <div className="flex items-center gap-1 font-mono text-lg tracking-[0.3em] h-10 px-3 bg-black/40 border border-white/[0.06]">
                    {phone.split("").map((d, i) => (
                      <span key={i} className="text-white/70">{d}</span>
                    ))}
                    {isRolling && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-red-500 font-bold"
                      >
                        {currentDigit}
                      </motion.span>
                    )}
                    {!isRolling && phone.length < 12 && (
                      <span className="text-[#333] animate-pulse">_</span>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={toggleRoll}
                      disabled={phone.length >= 12 && !isRolling}
                      className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] border transition-colors ${
                        isRolling
                          ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30"
                          : "bg-white/[0.03] border-white/10 text-white/50 hover:text-white hover:border-white/20"
                      } disabled:opacity-20`}
                    >
                      {isRolling ? "■ STOP" : "▶ ROLL"}
                    </button>
                    <button
                      onClick={() => { setPhone(""); setIsRolling(false); }}
                      className="px-4 py-2 text-[10px] font-mono border border-white/10 text-[#555] hover:text-red-400 hover:border-red-500/30 transition-colors"
                    >
                      CLR
                    </button>
                  </div>

                  <div className="text-[9px] font-mono text-[#333] text-center">
                    {phone.length}/12 DIGITS CAPTURED
                  </div>
                </div>
              </FieldWrapper>

              {/* ─── TOS (Infinite Scroll) ─── */}
              <FieldWrapper label="TERMS" sublabel="Scroll 5000px to accept your fate">
                <div
                  className="h-24 bg-black/40 border border-white/[0.06] p-3 overflow-y-scroll text-[10px] text-[#444] font-mono leading-relaxed scrollbar-thin"
                  onScroll={(e) => {
                    const t = e.currentTarget;
                    if (t.scrollHeight - t.scrollTop <= t.clientHeight + 50) {
                      setTosAgreed(true);
                    }
                  }}
                >
                  <p className="text-red-500/60 font-bold mb-2">§ TERMS OF ETERNAL SUFFERING</p>
                  <p>By scrolling, you irrevocably agree to:</p>
                  <p className="mt-1">1. Surrender your firstborn to the void</p>
                  <p>2. Never use a mouse with your dominant hand again</p>
                  <p>3. Listen to baby shark on infinite loop</p>
                  <p>4. Accept that tabs are superior to spaces</p>
                  <p>5. Acknowledge that CSS is a programming language</p>
                  <p className="mt-2 text-[#333]">(...scroll 5000px to reach acceptance...)</p>
                  <div className="h-[5000px]" />
                  <p className="text-emerald-500 font-bold text-center py-4">
                    ✓ YOU HAVE REACHED THE BOTTOM OF DESPAIR
                  </p>
                </div>
                <div className="mt-2 text-center">
                  {tosAgreed ? (
                    <span className="text-[10px] font-mono text-emerald-500/70 tracking-[0.2em]">✓ SOUL SURRENDERED</span>
                  ) : (
                    <span className="text-[10px] font-mono text-red-500/50 animate-pulse tracking-[0.2em]">↓ KEEP SCROLLING ↓</span>
                  )}
                </div>
              </FieldWrapper>

              {/* ─── SUBMIT (Runaway) ─── */}
              <div className="relative h-16 mt-6 overflow-visible">
                <motion.button
                  animate={submitPos}
                  transition={{ type: "spring", stiffness: 600, damping: 12 }}
                  onHoverStart={moveButton}
                  onClick={() => setSubmitted(true)}
                  disabled={!tosAgreed}
                  className="absolute inset-x-0 top-0 py-3 bg-red-500 text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-red-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  SUBMIT SOUL
                </motion.button>
                {hoverCount > 0 && !submitted && (
                  <div className="absolute -bottom-4 left-0 right-0 text-center text-[9px] font-mono text-[#333]">
                    ESCAPE ATTEMPTS: {hoverCount}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[9px] font-mono text-[#222] tracking-[0.3em]">
        EXP-001 // ANTI-UX // DO NOT ENJOY
      </div>
    </div>
  );
};

/* ─── Field Wrapper ─── */
function FieldWrapper({ label, sublabel, children }: { label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">{label}</span>
        <span className="text-[9px] font-mono text-[#333]">{sublabel}</span>
      </div>
      {children}
    </div>
  );
}

export default AntiUX;
