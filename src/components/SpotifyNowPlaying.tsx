import { useEffect, useState } from 'react';
import { SlSocialSpotify } from 'react-icons/sl';
import getNowPlayingItem from '../lib/spotify';
import { motion } from 'framer-motion';

export default function SpotifyNowPlaying() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>({});

    useEffect(() => {
        const fetchData = () => {
            // Only fetch if the tab is visible
            if (document.hidden) return;

            getNowPlayingItem().then((data) => {
                setResult(data);
                setLoading(false);
            });
        };

        // Initial fetch
        fetchData();

        // Poll every 5 seconds
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group h-full">
            <div className={`absolute inset-0 ${result.isPlaying ? 'bg-[#1DB954]' : 'bg-base-content/20'} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
            <div className="relative card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-content/10 overflow-hidden w-full h-full hover:scale-[1.02] transition-transform duration-300">
                <div className="card-body p-4 flex flex-col items-center justify-center gap-3 h-full">
                    <div className="relative shrink-0">
                        {loading ? (
                            <div className="w-24 h-24 md:w-40 md:h-40 bg-base-300 rounded-xl animate-pulse"></div>
                        ) : (
                            <div className="w-24 h-24 md:w-40 md:h-40 relative">
                                {(result.isPlaying || result.isRecent) ? (
                                    <motion.img
                                        src={result.albumImageUrl}
                                        alt={result.title}
                                        className={`w-full h-full rounded-2xl object-cover shadow-2xl ${!result.isPlaying && 'grayscale-50'}`}
                                        animate={result.isPlaying ? {
                                            scale: [1, 1.02, 1],
                                            boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1)", "0 20px 25px -5px rgba(29, 185, 84, 0.3)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"]
                                        } : {
                                            scale: 1,
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-base-200 rounded-2xl flex items-center justify-center text-base-content/30">
                                        <SlSocialSpotify size={48} />
                                    </div>
                                )}
                                <div className={`absolute -bottom-2 -right-2 ${result.isPlaying ? 'bg-[#1DB954]' : 'bg-base-content'} text-base-100 rounded-full p-1.5 shadow-lg border-4 border-base-100`}>
                                    <SlSocialSpotify size={16} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0 w-full flex flex-col items-center justify-center text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${result.isPlaying ? 'text-[#1DB954]' : 'text-base-content/50'}`}>
                                {loading ? 'LOADING' : result.isPlaying ? 'NOW PLAYING' : result.isRecent ? 'LAST PLAYED' : 'OFFLINE'}
                            </span>
                            {result.isPlaying && (
                                <div className="flex gap-[3px] items-end h-3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-[#1DB954] rounded-full"
                                            animate={{ height: [4, 12, 4] }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                                delay: i * 0.1
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="space-y-2 w-full flex flex-col items-center">
                                <div className="h-5 bg-base-300 rounded w-3/4 animate-pulse"></div>
                                <div className="h-3 bg-base-300 rounded w-1/2 animate-pulse"></div>
                            </div>
                        ) : (result.isPlaying || result.isRecent) ? (
                            <a
                                href={result.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group/text w-full"
                            >
                                <h3 className={`font-bold text-base md:text-lg truncate transition-colors ${result.isPlaying ? 'group-hover/text:text-[#1DB954]' : 'text-base-content/70'}`}>
                                    {result.title}
                                </h3>
                                <p className="text-xs md:text-sm text-base-content/60 truncate font-medium mt-0.5">
                                    {result.artist}
                                </p>
                            </a>
                        ) : (
                            <div>
                                <h3 className="font-bold text-base text-base-content/50">Not Playing</h3>
                                <p className="text-xs text-base-content/40">Spotify</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
