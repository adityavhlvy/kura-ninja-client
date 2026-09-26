import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiArrowLeftBold, PiArrowRightBold, PiXBold } from "react-icons/pi";
import { ease } from "./Reveal";

/** Full-screen screenshot viewer. Esc closes, arrow keys page, focus returns on close. */
export function Lightbox({
  images,
  index,
  title,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      returnTo?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndex]);

  const control = "grid size-11 place-items-center border border-white/25 text-white hover:bg-white hover:text-black transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0b0d0f]/95 text-white"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
            <p className="font-mono text-xs text-white/70">
              {title}, {index + 1} of {images.length}
            </p>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className={control}>
              <PiXBold aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-20">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`${title} screenshot ${index + 1}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease }}
                className="max-h-full max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            {images.length > 1 && (
              <div className="absolute inset-x-4 bottom-8 flex justify-between md:inset-x-5 md:top-1/2 md:bottom-auto md:-translate-y-1/2">
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  className={control}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndex((index - 1 + images.length) % images.length);
                  }}
                >
                  <PiArrowLeftBold aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  className={control}
                  onClick={(e) => {
                    e.stopPropagation();
                    onIndex((index + 1) % images.length);
                  }}
                >
                  <PiArrowRightBold aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
