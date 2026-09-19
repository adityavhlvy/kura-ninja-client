import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscClose, VscChevronLeft, VscChevronRight } from "react-icons/vsc";

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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
        >
          <VscClose size={24} />
        </button>

        {/* Counter / Title */}
        <div className="absolute top-4 left-4 text-white/80 font-mono text-xs flex items-center gap-2 z-50">
          <span>{title}</span>
          <span>•</span>
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <VscChevronLeft size={28} />
          </button>
        )}

        {/* Image Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="max-w-5xl max-h-[85vh] flex items-center justify-center"
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - view ${currentIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
          />
        </motion.div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
          >
            <VscChevronRight size={28} />
          </button>
        )}
      </div>
    </AnimatePresence>
  );
}
