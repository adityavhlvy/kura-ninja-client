import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiXLight, PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { playTick } from "@/lib/sound";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  title?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  title = "",
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        playTick();
        onClose();
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  const handlePrev = () => {
    playTick();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    playTick();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 select-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            playTick();
            onClose();
          }}
          className="absolute top-5 right-5 text-white/70 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
          title="Close (Esc)"
          aria-label="Close lightbox"
        >
          <PiXLight size={20} />
        </button>

        {/* Counter / Title */}
        <div className="absolute top-5 left-5 text-white/80 font-mono text-xs flex items-center gap-2.5 z-50 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="font-semibold text-white">{title}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/70">
            {currentIndex + 1} of {images.length}
          </span>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
            title="Previous (Arrow Left)"
            aria-label="Previous image"
          >
            <PiCaretLeftLight size={24} />
          </button>
        )}

        {/* Image Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl max-h-[85vh] flex items-center justify-center"
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - view ${currentIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
          />
        </motion.div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
            title="Next (Arrow Right)"
            aria-label="Next image"
          >
            <PiCaretRightLight size={24} />
          </button>
        )}
      </div>
    </AnimatePresence>
  );
}
