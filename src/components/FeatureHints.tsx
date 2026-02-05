import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlClose } from 'react-icons/sl';

interface Hint {
    id: string;
    icon: string;
    title: string;
    description: string;
}

const hints: Hint[] = [
    {
        id: 'ctrl-k',
        icon: '⌨️',
        title: 'Quick Navigation',
        description: 'Press Ctrl+K to open command palette',
    },
    {
        id: 'time',
        icon: '🌙',
        title: 'Time-Based Theme',
        description: 'Visit at night to see falling stars ✨',
    },
    {
        id: 'konami',
        icon: '🎮',
        title: 'Secret Code',
        description: 'Try ↑↑↓↓←→←→BA for a surprise',
    },
    {
        id: 'console',
        icon: '🐢',
        title: 'Dev Tools',
        description: 'Open console (F12) for a hidden message',
    },
];

export default function FeatureHints() {
    const [currentHint, setCurrentHint] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Wait for mount to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || isMinimized) return;

        // Rotate hints every 5 seconds
        const interval = setInterval(() => {
            setCurrentHint(prev => (prev + 1) % hints.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [mounted, isMinimized]);

    // Don't render until mounted
    if (!mounted) return null;

    const hint = hints[currentHint];

    return (
        <AnimatePresence mode="wait">
            {isMinimized ? (
                <motion.button
                    key="minimized"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsMinimized(false)}
                    className="fixed bottom-12 right-6 z-[100] btn btn-circle btn-primary shadow-lg border-white/20"
                    title="Show Hints"
                >
                    <span className="text-xl">💡</span>
                </motion.button>
            ) : (
                <motion.div
                    key="expanded"
                    initial={{ opacity: 0, y: 10, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 10, x: 20 }}
                    className="fixed bottom-12 right-6 z-[100] max-w-sm"
                >
                    <div className="relative bg-base-200/90 backdrop-blur-md border border-primary/20 rounded-xl p-5 shadow-xl flex items-center gap-4 group">
                        {/* Minimize Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                            className="absolute -top-2 -right-2 btn btn-xs btn-circle btn-neutral opacity-0 group-hover:opacity-100 transition-opacity shadow-md border border-white/10"
                            title="Minimize"
                        >
                            <SlClose size={10} />
                        </button>

                        <span className="text-3xl">{hint.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-base text-primary mb-1">{hint.title}</div>
                            <div className="text-xs text-base-content/80 leading-snug">{hint.description}</div>
                        </div>

                        {/* Progress dots */}
                        <div className="flex flex-col gap-1.5">
                            {hints.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentHint ? 'bg-primary' : 'bg-base-content/20'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
