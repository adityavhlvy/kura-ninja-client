"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function InitialLoader({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    });

    useEffect(() => {
        // Brief pause to let fonts/assets settle, then reveal
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onCompleteRef.current();
            }, 600);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
                >
                    {/* Simple brand mark that fades out */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.05, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span className="text-4xl">🐢</span>
                        <div className="w-12 h-[2px] bg-primary/40 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
