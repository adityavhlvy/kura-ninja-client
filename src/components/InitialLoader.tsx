"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SlLayers } from "react-icons/sl";

export default function InitialLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 400); // Wait a bit after 100%
                    return 100;
                }
                // Randomize increment for a more organic feel
                const increment = Math.random() * 15 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 150);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 z-[100] bg-base-300 flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

                <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse"></div>
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] shadow-2xl relative shadow-primary/30">
                            <div className="w-full h-full bg-base-300/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <SlLayers className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                    </motion.div>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-end text-sm font-mono tracking-widest uppercase">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-base-content/50"
                            >
                                Initializing
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-primary font-bold"
                            >
                                {Math.floor(progress)}%
                            </motion.span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-1.5 w-full bg-base-content/10 rounded-full overflow-hidden relative">
                            {/* Shimmer effect behind progress */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                            {/* Actual Progress Bar */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent relative"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                {/* Glow effect on the tip of the progress bar */}
                                <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px]"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                    @keyframes shimmer {
                        100% {
                            transform: translateX(100%);
                        }
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
