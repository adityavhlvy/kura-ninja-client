import { useTime } from "../context/TimeContext";

export default function AtmosphereIndicator() {
  const { theme, formattedTime, hour } = useTime();

  // Custom flex text for midnight hours
  const flexText =
    theme.period === "midnight" ? `// aktif jam ${hour} pagi` : theme.flexText;

  // Time-based tip - encourage visiting at different times
  const getTimeTip = () => {
    const currentHour = hour;
    if (currentHour >= 20 || currentHour < 5) {
      return "☀️ Visit during the day for a different vibe!";
    }
    if (currentHour >= 17 && currentHour < 20) {
      return "✨ Golden hour - sunset palette active";
    }
    if (currentHour >= 5 && currentHour < 8) {
      return "🌙 Early dawn - morning ambient mode";
    }
    return "🌙 Come back at night to see the stars!";
  };

  return (
    <div className="relative group hidden sm:flex items-center">
      {/* Integrated Header Capsule */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 hover:bg-muted/70 border border-border/60 hover:border-primary/40 rounded-sm text-xs font-mono transition-colors cursor-default select-none shadow-xs"
        title={`${theme.label} Mode · ${formattedTime}`}
        aria-label={`Atmosphere time indicator: ${formattedTime}`}
      >
        <span className="text-xs leading-none select-none">{theme.emoji}</span>
        <span
          className={`text-[11px] font-mono font-medium ${theme.primaryColor} leading-none`}
        >
          {formattedTime}
        </span>
      </div>

      {/* Tooltip Dropdown */}
      <div className="absolute right-0 top-full mt-2 px-3 py-2.5 bg-card/95 backdrop-blur-md border border-border/70 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 pointer-events-none transition-all duration-200 whitespace-nowrap min-w-[190px] z-50">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-bold font-mono ${theme.primaryColor}`}>
            {theme.label} Mode
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60">
            UTC+7
          </span>
        </div>
        <div className="text-[10px] text-foreground/80 font-mono mt-1">
          {flexText}
        </div>
        <div className="border-t border-border/40 mt-2 pt-1.5">
          <div className="text-[9px] text-muted-foreground/70 font-mono">
            {getTimeTip()}
          </div>
        </div>
      </div>
    </div>
  );
}
