import React from "react";
import { motion } from "framer-motion";
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
  delay = 0,
}: SpotlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`group relative border border-border/50 bg-card/50 backdrop-blur-md rounded-sm transition-colors duration-300 hover:border-primary/20 ${className}`}
    >
      <div className="relative p-6 h-full flex flex-col">
        {(title || badge) && (
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-6">
            {title && (
              <h3 className="text-sm font-mono font-bold tracking-widest text-muted-foreground uppercase min-w-0 break-words">
                {title}
              </h3>
            )}
            {badge && (
              <Badge
                variant="outline"
                className="font-mono uppercase tracking-widest text-[10px] border-border rounded-sm shrink-0"
              >
                {badge}
              </Badge>
            )}
          </div>
        )}
        <div className="grow">{children}</div>
      </div>
    </motion.div>
  );
}