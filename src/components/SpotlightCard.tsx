"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onMouseMove={onMouseMove}
            className={`group relative border border-border/50 bg-card/50 backdrop-blur-md rounded-sm overflow-hidden transition-all duration-500 hover:border-primary/20 hover:bg-card/80 ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          350px circle at ${mouseX}px ${mouseY}px,
                          rgba(var(--primary-rgb, 240,160,48), 0.05),
                          transparent 60%
                        )
                      `,
                }}
            />
            <div className="relative p-6 h-full flex flex-col">
                {(title || badge) && (
                    <div className="flex justify-between items-center mb-6">
                        {title && <h2 className="text-xl font-mono font-bold tracking-tight text-muted-foreground group-hover:text-primary transition-colors uppercase">{title}</h2>}
                        {badge && <Badge variant="outline" className="font-mono uppercase tracking-widest text-[10px] border-border rounded-sm">{badge}</Badge>}
                    </div>
                )}
                <div className="grow">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
