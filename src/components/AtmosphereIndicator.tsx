import { useTime } from '../context/TimeContext';
import { motion } from 'framer-motion';

export default function AtmosphereIndicator() {
    const { theme, formattedTime, hour } = useTime();

    // Custom flex text for midnight hours
    const flexText = theme.period === 'midnight'
        ? `// aktif jam ${hour} pagi`
        : theme.flexText;

    // Time-based tip - encourage visiting at different times
    const getTimeTip = () => {
        const currentHour = hour;
        if (currentHour >= 20 || currentHour < 5) {
            return '☀️ Visit during the day for a different vibe!';
        }
        if (currentHour >= 17 && currentHour < 20) {
            return '✨ Golden hour - fireflies appearing';
        }
        if (currentHour >= 5 && currentHour < 8) {
            return '🌙 Come back at night to see the stars!';
        }
        return '🌙 Come back at night to see the stars!';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed top-20 right-4 z-40 hidden md:block"
        >
            <div className="group relative">
                {/* Main indicator */}
                <div className={`
          flex items-center gap-2 px-3 py-1.5 
          bg-base-200/80 backdrop-blur-md 
          border border-base-content/10 
          rounded-full shadow-lg
          hover:border-primary/30 
          transition-all duration-300
          cursor-default
        `}>
                    <span className="text-sm">{theme.emoji}</span>
                    <span className={`text-xs font-mono ${theme.primaryColor}`}>
                        {formattedTime}
                    </span>
                </div>

                {/* Tooltip on hover */}
                <div className={`
          absolute right-0 top-full mt-2 
          px-3 py-2 
          bg-base-300/95 backdrop-blur-md 
          border border-base-content/10 
          rounded-lg shadow-xl
          opacity-0 group-hover:opacity-100 
          translate-y-1 group-hover:translate-y-0
          pointer-events-none
          transition-all duration-300
          whitespace-nowrap
          min-w-[180px]
        `}>
                    <div className={`text-sm font-medium ${theme.primaryColor}`}>
                        {theme.label} Mode
                    </div>
                    <div className="text-xs text-base-content/60 font-mono mt-0.5">
                        {flexText}
                    </div>
                    <div className="border-t border-base-content/10 mt-2 pt-2">
                        <div className="text-[10px] text-base-content/50">
                            {getTimeTip()}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
