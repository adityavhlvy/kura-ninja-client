import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiErrorWarningLine,
  RiVolumeUpLine,
  RiPaletteLine,
  RiQuestionMark,
  RiPhoneLine,
  RiFileTextLine,
} from "react-icons/ri";

const AntiUX = () => {
  const [age, setAge] = useState(0);
  const [name, setName] = useState("#000000");
  const [phone, setPhone] = useState("");
  const [isRolling, setIsRolling] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(0);
  const [tosAgreed, setTosAgreed] = useState(false);
  const [submitRepo, setSubmitRepo] = useState({ x: 0, y: 0 });
  const [submitted, setSubmitted] = useState(false);

  // RNG Phone Logic
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentDigit(Math.floor(Math.random() * 10));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const toggleRoll = () => {
    if (isRolling) {
      setPhone((prev) => prev + currentDigit);
      setIsRolling(false);
    } else {
      if (phone.length >= 12) return;
      setIsRolling(true);
    }
  };

  // Runaway Button Logic
  const moveButton = () => {
    if (!tosAgreed) return; // Don't run away if ToS not agreed (that's too easy)
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    setSubmitRepo({ x, y });
  };

  // Hex Name Logic
  const hexToName = (hex: string) => {
    const syllables = ["ka", "zu", "mi", "ra", "po", "nyo", "chi", "ko"];
    const val = parseInt(hex.replace("#", ""), 16);
    const idx = val % syllables.length;
    return `Agent ${syllables[idx]}-${val
      .toString(36)
      .slice(0, 3)
      .toUpperCase()}`;
  };

  const currentName = hexToName(name);

  return (
    <div className="absolute inset-0 bg-base-100 text-base-content font-sans flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-content to-transparent pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        className="w-full max-w-sm card bg-base-200 shadow-xl border-2 border-base-content/10 skew-x-1"
      >
        <div className="card-body p-3">
          <div className="flex items-center gap-2 mb-1 border-b-2 border-error/50 pb-1">
            <RiErrorWarningLine className="text-lg text-error animate-pulse" />
            <h1 className="text-md font-black uppercase tracking-tighter">
              Hell Form v6.6.6
            </h1>
          </div>

          {submitted ? (
            <div className="text-center space-y-3 py-6">
              <h2 className="text-lg font-bold text-error">
                FATAL ERROR: Success
              </h2>
              <p className="opacity-70 text-xs">
                We didn't expect anyone to get this far.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setPhone("");
                  setTosAgreed(false);
                }}
                className="btn btn-neutral btn-sm w-full"
              >
                Suffer Again
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* 1. NAME (Color) */}
              <div className="form-control w-full">
                <div className="flex gap-2 items-center p-1.5 bg-base-300 rounded border border-dashed border-base-content/20">
                  <input
                    type="color"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-6 h-6 cursor-crosshair rounded border border-base-content"
                  />
                  <div className="flex-1 font-mono text-[10px] opacity-80 leading-tight">
                    <span className="font-bold text-primary">
                      {currentName}
                    </span>
                  </div>
                  <RiPaletteLine className="text-xs opacity-50" />
                </div>
              </div>

              {/* 2. AGE (Scream/Slider) */}
              <div className="form-control w-full">
                <div className="flex items-center gap-2 bg-base-300 p-1.5 rounded">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    className="range range-error range-xs"
                  />
                  <span className="text-lg font-black min-w-[2ch] font-mono text-right">
                    {age}
                  </span>
                  <RiVolumeUpLine className="text-xs opacity-50" />
                </div>
              </div>

              {/* 3. PHONE (RNG Slot) */}
              <div className="form-control w-full">
                <label className="label p-0 min-h-0 mb-0.5">
                  <span className="label-text text-[9px] font-bold uppercase flex items-center gap-1">
                    <RiPhoneLine /> Phone (Stop the Slot)
                  </span>
                </label>
                <div className="flex items-center gap-2 bg-base-300 p-1.5 rounded border border-base-content/10">
                  <div className="font-mono text-sm tracking-widest bg-base-100 px-2 py-1 rounded border border-base-content/20 flex-1 h-8 flex items-center overflow-x-auto">
                    {phone}
                    <span className="text-error animate-pulse ml-1">
                      {isRolling ? currentDigit : phone.length < 12 ? "#" : ""}
                    </span>
                  </div>
                  <button
                    className={`btn btn-xs ${
                      isRolling ? "btn-error" : "btn-success"
                    } w-12`}
                    onClick={toggleRoll}
                    disabled={phone.length >= 12 && !isRolling}
                  >
                    {isRolling ? "STOP" : "ROLL"}
                  </button>
                  <button
                    className="btn btn-xs btn-ghost text-[9px]"
                    onClick={() => {
                      setPhone("");
                      setIsRolling(false);
                    }}
                  >
                    CLR
                  </button>
                </div>
              </div>

              {/* 4. ToS (Infinite Scroll) */}
              <div className="form-control w-full">
                <div
                  className="h-20 bg-base-100 border border-base-content/20 rounded p-2 overflow-y-scroll text-[9px] opacity-70 mb-1"
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    if (
                      target.scrollHeight - target.scrollTop <=
                      target.clientHeight + 50
                    ) {
                      setTosAgreed(true);
                    }
                  }}
                >
                  <p className="font-bold mb-1">TERMS OF ETERNAL SUFFERING</p>
                  <p>
                    By scrolling, you agree to: <br />
                    1. Give us your firstborn.
                    <br />
                    2. Never use a mouse again.
                    <br />
                    3. Listen to baby shark on loop.
                    <br />
                    (Scroll 5000px down to accept)
                  </p>
                  <div className="h-[5000px]"></div>
                  <p className="text-success font-bold mt-2">
                    YOU HAVE ARRIVED.
                  </p>
                </div>
                {tosAgreed ? (
                  <div className="text-xs text-success font-bold text-center">
                    AGREED TO SUFFERING
                  </div>
                ) : (
                  <div className="text-[9px] text-error text-center animate-pulse">
                    SCROLL TO BOTTOM TO ENABLE SUBMIT
                  </div>
                )}
              </div>

              {/* 5. RUNAWAY SUBMIT */}
              <div className="relative h-12 w-full">
                <motion.button
                  animate={submitRepo}
                  transition={{ type: "spring", stiffness: 500, damping: 10 }}
                  onHoverStart={moveButton}
                  onClick={() => setSubmitted(true)}
                  disabled={!tosAgreed}
                  className="absolute top-0 left-0 right-0 btn btn-error btn-sm w-full font-black uppercase tracking-widest border-b-4 active:border-b-0"
                >
                  Submit Soul
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-1 text-[9px] font-mono opacity-20">
        ANTG-EXP-001 // DO NOT ENJOY
      </div>
    </div>
  );
};

export default AntiUX;
