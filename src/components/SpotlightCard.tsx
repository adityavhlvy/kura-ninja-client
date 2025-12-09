
import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
    children: React.ReactNode;
    title?: string;
    badge?: string;
    className?: string;
    delay?: number;
}

export default function SpotlightCard({
    children,
    title,
    badge,
    className = "",
    delay = 0
}: SpotlightCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onMouseMove={onMouseMove}
            className={`group relative border border-base-content/10 bg-base-100/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(var(--primary-channel), 0.15),
                          transparent 80%
                        )
                      `,
                }}
            />
            <div className="relative p-8 space-y-6 h-full flex flex-col">
                {(title || badge) && (
                    <div className="flex justify-between items-center mb-2">
                        {title && <h2 className="text-2xl font-bold tracking-tight opacity-90">{title}</h2>}
                        {badge && <span className="badge badge-sm badge-neutral font-mono uppercase tracking-wider opacity-70">{badge}</span>}
                    </div>
                )}
                <div className="grow">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
