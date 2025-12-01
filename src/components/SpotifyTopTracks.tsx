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
        <div className="w-full h-full bg-base-100/50 backdrop-blur-sm rounded-2xl p-6 border border-base-content/5">
            <div className="flex items-center gap-2 mb-6">
                <SlSocialSpotify className="text-[#1DB954] text-2xl" />
                <h3 className="font-bold text-xl">On Repeat</h3>
            </div>

            <div className="space-y-4">
                {loading ? (
                    Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 animate-pulse">
                            <div className="w-6 h-6 bg-base-300 rounded-full"></div>
                            <div className="w-12 h-12 bg-base-300 rounded-md"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-base-300 rounded w-3/4"></div>
                                <div className="h-3 bg-base-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    tracks.map((track, index) => (
                        <div key={index} className="flex items-center gap-4 group">
                            <div className="font-mono text-lg font-bold text-base-content/30 w-6 text-right group-hover:text-[#1DB954] transition-colors">
                                {index + 1}
                            </div>
                            <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="relative block shrink-0">
                                <img
                                    src={track.albumImageUrl}
                                    alt={track.title}
                                    className="w-12 h-12 rounded-md object-cover shadow-sm group-hover:scale-105 transition-transform"
                                />
                            </a>
                            <div className="flex-1 min-w-0">
                                <a
                                    href={track.songUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-bold text-sm hover:text-[#1DB954] truncate block transition-colors"
                                >
                                    {track.title}
                                </a>
                                <p className="text-xs text-base-content/60 truncate">{track.artist}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
