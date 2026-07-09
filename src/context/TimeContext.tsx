import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Time periods for atmospheric changes
export type TimePeriod =
  "dawn" | "morning" | "afternoon" | "senja" | "night" | "midnight";

interface TimeTheme {
  period: TimePeriod;
  label: string;
  emoji: string;
  flexText: string;
  gradient: string;
  particleType: "stars" | "dust" | "fireflies" | "none";
  primaryColor: string;
  accentColor: string;
}

interface TimeContextType {
  hour: number;
  minute: number;
  theme: TimeTheme;
  formattedTime: string;
}

const TIME_THEMES: Record<TimePeriod, TimeTheme> = {
  dawn: {
    period: "dawn",
    label: "Dawn",
    emoji: "🌅",
    flexText: "Early bird mode",
    gradient: "from-orange-900/20 via-pink-900/10 to-base-100",
    particleType: "dust",
    primaryColor: "text-orange-400",
    accentColor: "text-pink-400",
  },
  morning: {
    period: "morning",
    label: "Morning",
    emoji: "☀️",
    flexText: "Productive hours",
    gradient: "from-sky-900/20 via-blue-900/10 to-base-100",
    particleType: "dust",
    primaryColor: "text-sky-400",
    accentColor: "text-blue-400",
  },
  afternoon: {
    period: "afternoon",
    label: "Afternoon",
    emoji: "⚡",
    flexText: "Peak performance",
    gradient: "from-amber-900/20 via-yellow-900/10 to-base-100",
    particleType: "dust",
    primaryColor: "text-amber-400",
    accentColor: "text-yellow-400",
  },
  senja: {
    period: "senja",
    label: "Senja",
    emoji: "✨",
    flexText: "Golden hour",
    gradient: "from-purple-900/20 via-orange-900/10 to-base-100",
    particleType: "fireflies",
    primaryColor: "text-purple-400",
    accentColor: "text-orange-400",
  },
  night: {
    period: "night",
    label: "Night",
    emoji: "🦉",
    flexText: "Night owl mode",
    gradient: "from-indigo-900/20 via-purple-900/10 to-base-100",
    particleType: "stars",
    primaryColor: "text-indigo-400",
    accentColor: "text-purple-400",
  },
  midnight: {
    period: "midnight",
    label: "Midnight",
    emoji: "💀",
    flexText: "// aktif jam tidak wajar",
    gradient: "from-slate-900/30 via-zinc-900/20 to-base-100",
    particleType: "stars",
    primaryColor: "text-slate-400",
    accentColor: "text-zinc-500",
  },
};

function getTimePeriod(hour: number): TimePeriod {
  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "senja";
  if (hour >= 20 && hour < 24) return "night";
  return "midnight"; // 0-4
}

function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

const TIMEZONE = "Asia/Jakarta";

const hourFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  hour12: false,
  timeZone: TIMEZONE,
});

const minuteFormatter = new Intl.DateTimeFormat("en-GB", {
  minute: "numeric",
  timeZone: TIMEZONE,
});

const TimeContext = createContext<TimeContextType | null>(null);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return {
      hour: parseInt(hourFormatter.format(now)),
      minute: parseInt(minuteFormatter.format(now)),
    };
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        hour: parseInt(hourFormatter.format(now)),
        minute: parseInt(minuteFormatter.format(now)),
      });
    };

    // Update every minute
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const period = getTimePeriod(time.hour);
  const theme = TIME_THEMES[period];

  const value: TimeContextType = {
    hour: time.hour,
    minute: time.minute,
    theme,
    formattedTime: formatTime(time.hour, time.minute),
  };

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
}

export function useTime() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within a TimeProvider");
  }
  return context;
}

;
