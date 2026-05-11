import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoidMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  isVoid: boolean;
}

const VOID_RESPONSES = [
  "...",
  "NO ONE LISTENS",
  "ECHO",
  "EMPTY",
  "WHY",
  "DARKNESS",
  "ALONE",
  "VOID",
  "FORGOTTEN",
  "SILENCE",
  "NOTHING MATTERS",
  "WHO ARE YOU",
  "STOP",
  "I HEAR YOU",
  "DO YOU HEAR ME",
  "COLD",
  "INFINITE",
];

const ScreamingVoid = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<VoidMessage[]>([]);
  const [screamCount, setScreamCount] = useState(0);
  const [voidAwakened, setVoidAwakened] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Void awakens after 3 screams
  useEffect(() => {
    if (screamCount >= 3 && !voidAwakened) {
      setVoidAwakened(true);
    }
  }, [screamCount, voidAwakened]);

  // Pulse intensity based on recent activity
  useEffect(() => {
    if (messages.length > 0) {
      setPulseIntensity(Math.min(messages.length * 0.1, 1));
    }
    const decay = setInterval(() => {
      setPulseIntensity((p) => Math.max(p - 0.02, 0));
    }, 500);
    return () => clearInterval(decay);
  }, [messages.length]);

  // Cleanup old messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => prev.filter((msg) => Date.now() - msg.id < 12000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;

    const newMessage: VoidMessage = {
      id: Date.now(),
      text: input.toUpperCase(),
      x: (Math.random() - 0.5) * 60,
      y: 0,
      rotation: (Math.random() - 0.5) * 40,
      scale: 0.8 + Math.random() * 0.8,
      isVoid: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setScreamCount((c) => c + 1);
    textareaRef.current?.focus();

    // Void responds with increasing probability
    const responseChance = Math.min(0.3 + screamCount * 0.05, 0.8);
    if (Math.random() < responseChance) {
      const delay = 800 + Math.random() * 2000;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: VOID_RESPONSES[Math.floor(Math.random() * VOID_RESPONSES.length)],
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 40,
            rotation: (Math.random() - 0.5) * 90,
            scale: 0.4 + Math.random() * 0.4,
            isVoid: true,
          },
        ]);
      }, delay);
    }
  }, [input, screamCount]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-black flex flex-col items-center justify-center overflow-hidden z-10 select-none"
    >
      {/* Deep space background */}
      <div className="absolute inset-0">
        {/* Radial void gradient */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(${voidAwakened ? "20,0,0" : "0,0,0"},1) 0%, 
              rgba(0,0,0,1) 50%, 
              rgba(0,0,0,1) 100%)`,
          }}
        />

        {/* Pulsing core */}
        <motion.div
          animate={{
            scale: [1, 1.1 + pulseIntensity * 0.3, 1],
            opacity: [0.02 + pulseIntensity * 0.05, 0.05 + pulseIntensity * 0.1, 0.02 + pulseIntensity * 0.05],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(${voidAwakened ? "100,0,0" : "30,30,50"},0.3) 0%, transparent 70%)`,
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 1.5}px`,
                height: `${1 + Math.random() * 1.5}px`,
              }}
            />
          ))}
        </div>

        {/* Concentric rings (appear when void awakens) */}
        {voidAwakened && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0.5 + ring * 0.3, 1 + ring * 0.5],
                  opacity: [0.1, 0],
                }}
                transition={{
                  duration: 4 + ring,
                  repeat: Infinity,
                  delay: ring * 1.5,
                  ease: "easeOut",
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 border border-red-500/20 rounded-full"
                style={{
                  width: `${200 + ring * 100}px`,
                  height: `${200 + ring * 100}px`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-12 md:top-16 left-0 right-0 text-center pointer-events-none"
      >
        <h1
          className="text-[10px] md:text-xs tracking-[1em] uppercase font-mono"
          style={{ color: voidAwakened ? "rgba(180,0,0,0.3)" : "rgba(255,255,255,0.1)" }}
        >
          The Void
        </h1>
        {voidAwakened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-[9px] font-mono text-red-500/30 mt-2 tracking-[0.5em]"
          >
            IT LISTENS
          </motion.p>
        )}
      </motion.div>

      {/* Floating Messages */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.3, y: 0 }}
              animate={{
                opacity: [0, msg.isVoid ? 0.4 : 0.9, 0],
                scale: [0.3, msg.scale * 1.5, msg.scale * 2],
                y: msg.isVoid ? [0, -200 - Math.random() * 200] : [0, -400 - Math.random() * 200],
                x: [0, msg.x * 4],
                rotate: [0, msg.rotation],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: msg.isVoid ? 6 : 8, ease: "easeOut" }}
              className={`absolute text-center whitespace-nowrap ${
                msg.isVoid
                  ? "font-serif-accent text-red-500/60 text-sm"
                  : "font-mono text-white/80 text-lg md:text-xl"
              }`}
              style={{
                textShadow: msg.isVoid
                  ? "0 0 20px rgba(255,0,0,0.3)"
                  : "0 0 30px rgba(255,255,255,0.2)",
                mixBlendMode: "screen",
              }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scream counter */}
      {screamCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-12 right-6 text-[9px] font-mono text-[#222] text-right"
        >
          <div>SCREAMS: {screamCount}</div>
          {voidAwakened && <div className="text-red-500/30 mt-1">VOID: AWAKE</div>}
        </motion.div>
      )}

      {/* Input Area */}
      <div className="absolute bottom-12 md:bottom-16 z-30 w-full max-w-lg px-6">
        <div className="relative">
          {/* Glow behind input when typing */}
          {input.length > 0 && (
            <div className="absolute -inset-4 bg-white/[0.02] blur-xl rounded-full pointer-events-none" />
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SCREAM INTO THE VOID..."
            className="w-full bg-transparent border-b border-white/[0.08] focus:border-white/20 p-4 text-center text-xl md:text-2xl outline-none resize-none placeholder-[#222] focus:placeholder-[#333] text-white/90 h-20 transition-all font-light tracking-wide"
            style={{ caretColor: voidAwakened ? "#ff3333" : "#ffffff" }}
            autoFocus
          />

          <div className="mt-4 flex items-center justify-center gap-4">
            <motion.span
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[10px] font-mono text-[#333] tracking-[0.5em]"
            >
              ENTER TO RELEASE
            </motion.span>
          </div>
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="absolute bottom-3 left-0 right-0 text-center text-[8px] font-mono text-[#1a1a1a] tracking-[0.3em]">
        EXP-002 // VOID_INTERFACE // {voidAwakened ? "ACTIVE" : "DORMANT"}
      </div>
    </div>
  );
};

export default ScreamingVoid;
