import { useEffect, useState } from 'react';
import { getTopTracksItems } from '../lib/spotify';
import { SlSocialSpotify } from 'react-icons/sl';

export default function SpotifyTopTracks() {
    const [loading, setLoading] = useState(true);
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        getTopTracksItems().then((items) => {
            setTracks(items);
            setLoading(false);
        });
    }, []);

    return (
        <div className="relative card bg-base-100/80 backdrop-blur-md shadow-xl border border-base-content/10 overflow-hidden w-full h-full hover:scale-[1.02] transition-transform duration-300">
            <div className="card-body p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2 shrink-0">
                    <h3 className="font-bold text-sm md:text-base flex items-center gap-2">
                        <SlSocialSpotify className="text-[#1DB954]" />
                        On Repeat
                    </h3>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Top Tracks</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {loading ? (
                        Array(5).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-base-200/50 animate-pulse">
                                <div className="w-8 h-8 bg-base-300 rounded-md"></div>
                                <div className="flex-1 space-y-1">
                                    <div className="h-3 bg-base-300 rounded w-3/4"></div>
                                    <div className="h-2 bg-base-300 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        tracks.slice(0, 4).map((track, index) => (
                            <a
                                key={index}
                                href={track.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-base-content/5 transition-colors group"
                            >
                                <div className="relative shrink-0">
                                    <img
                                        src={track.albumImageUrl}
                                        alt={track.title}
                                        className="w-8 h-8 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-md transition-colors flex items-center justify-center">
                                        <SlSocialSpotify className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100" size={12} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-xs md:text-sm truncate group-hover:text-[#1DB954] transition-colors">
                                        {track.title}
                                    </h4>
                                    <p className="text-[10px] md:text-xs text-base-content/60 truncate">
                                        {track.artist}
                                    </p>
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
