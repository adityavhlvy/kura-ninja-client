"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoidMessage {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

const ScreamingVoid = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<VoidMessage[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sound effect helper (optional, kept silent for now to avoid browser autoplay issues)
  // const playVoidSound = () => { ... }

  const screams = [
    "NO ONE LISTENS",
    "ECHO...",
    "EMPTY",
    "WHY?",
    "...",
    "DARKNESS",
    "ALONE",
    "VOID",
  ];

  const handleSubmit = () => {
    if (!input.trim()) return;

    const newMessage: VoidMessage = {
      id: Date.now(),
      text: input,
      x: Math.random() * 80 - 40, // Random spread %
      y: 0,
      rotation: Math.random() * 60 - 30,
      scale: 1 + Math.random(),
      opacity: 1,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    textareaRef.current?.focus();

    // Randomly add a "Void Response"
    if (Math.random() > 0.7) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: screams[Math.floor(Math.random() * screams.length)],
            x: Math.random() * 100 - 50,
            y: Math.random() * -50,
            rotation: Math.random() * 180,
            scale: 0.5,
            opacity: 0.5,
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Cleanup old messages to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => prev.filter((msg) => Date.now() - msg.id < 10000));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black text-neutral-400 font-serif flex flex-col items-center justify-center overflow-hidden z-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] z-10 pointer-events-none" />

      {/* Stars / Dust */}
      <div className="absolute inset-0 opacity-20 animate-pulse">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl opacity-20 tracking-[1em] uppercase mb-12 z-20 select-none">
        The Void
      </h1>

      {/* Floating Messages */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: msg.scale * 3,
                y: -500, // Drift up into nothingness
                x: msg.x * 5,
                rotate: msg.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute text-center whitespace-nowrap text-white mix-blend-difference"
              style={{ padding: "2rem" }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="z-30 w-full max-w-md px-4 text-center">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="SCREAM HERE..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-center text-xl md:text-2xl outline-none resize-none placeholder-neutral-600 focus:placeholder-neutral-500 text-white caret-red-500 h-32 transition-all focus:bg-white/10 focus:border-white/20"
          autoFocus
        />
        <p className="text-xs text-neutral-500 mt-4 tracking-[0.5em] animate-pulse">
          PRESS ENTER TO RELEASE
        </p>
      </div>
    </div>
  );
};

export default ScreamingVoid;
