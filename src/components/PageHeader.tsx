import React from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  accentColor?: "primary" | "secondary" | "accent";
}

const accentStyles: Record<
  "primary" | "secondary" | "accent",
  { line: string; text: string }
> = {
  primary: { line: "bg-primary/40", text: "text-primary/80" },
  secondary: { line: "bg-secondary/40", text: "text-secondary/80" },
  accent: { line: "bg-accent/40", text: "text-accent/80" },
};

export default function PageHeader({
  title,
  subtitle,
  description,
  children,
  accentColor = "primary",
}: PageHeaderProps) {
  const accent = accentStyles[accentColor] || accentStyles.primary;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4 max-w-3xl">
        <div className="relative">
          {subtitle && (
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-[1px] w-6 ${accent.line}`} />
              <span
                className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase ${accent.text}`}
              >
                {subtitle}
              </span>
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] leading-tight relative z-10 text-foreground">
            {title}
          </h1>
        </div>

        {description && (
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl text-pretty font-light">
            {description}
          </div>
        )}
      </div>

      {children && (
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
