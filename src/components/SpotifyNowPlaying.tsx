import { useEffect, useState } from 'react';
import { SlSocialSpotify } from 'react-icons/sl';
import getNowPlayingItem from '../lib/spotify';
import { motion } from 'framer-motion';

export default function SpotifyNowPlaying() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const fetchData = () => {
            if (document.hidden) return;
            getNowPlayingItem().then((data) => {
                setResult(data || null);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group h-full">
            <div className={`absolute inset-0 ${result?.isPlaying ? 'bg-primary' : 'bg-muted'} rounded-sm blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000`}></div>
            <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-sm overflow-hidden w-full h-full hover:border-primary/20 transition-all duration-500">
                <div className="p-5 flex flex-col items-center justify-center gap-5 h-full">
                    <div className="relative shrink-0">
                        {loading ? (
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-muted rounded-sm animate-pulse"></div>
                        ) : (
                            <div className="w-24 h-24 md:w-32 md:h-32 relative">
                                {result ? (
                                    <motion.img
                                        src={result.albumImageUrl}
                                        alt={result.title}
                                        className={`w-full h-full rounded-sm object-cover shadow-2xl ${!result.isPlaying && 'grayscale opacity-50'}`}
                                        animate={result.isPlaying ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted rounded-sm flex items-center justify-center text-muted-foreground/30">
                                        <SlSocialSpotify size={40} />
                                    </div>
                                )}
                                <div className={`absolute -bottom-2 -right-2 ${result?.isPlaying ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} rounded-none p-1 shadow-2xl border border-border z-10`}>
                                    <SlSocialSpotify size={14} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0 w-full flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${result?.isPlaying ? 'text-primary' : 'text-muted-foreground'}`}>
                                {loading ? 'WAIT' : result?.isPlaying ? 'LIVE' : result ? 'OFF' : 'VOID'}
                            </span>
                            {result?.isPlaying && (
                                <div className="flex gap-[2px] items-end h-2.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-[2px] bg-primary/70"
                                            animate={{ height: [2, 10, 2] }}
                                            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: i * 0.15 }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="space-y-2 w-full flex flex-col items-center">
                                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                                <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                            </div>
                        ) : result ? (
                            <a href={result.songUrl} target="_blank" rel="noopener noreferrer" className="block group/text w-full">
                                <h3 className={`font-mono font-bold text-xs md:text-sm truncate transition-colors uppercase tracking-tight ${result.isPlaying ? 'text-foreground group-hover/text:text-primary' : 'text-muted-foreground'}`}>
                                    {result.title}
                                </h3>
                                <p className="text-[10px] font-mono text-muted-foreground truncate mt-1 opacity-60 uppercase tracking-widest">
                                    {result.artist}
                                </p>
                            </a>
                        ) : (
                            <div className="opacity-30">
                                <h3 className="font-mono font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Signal Lost</h3>
                                <p className="text-[9px] font-mono uppercase mt-1 text-muted-foreground">Standby</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
