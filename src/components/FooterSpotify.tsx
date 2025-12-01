import { useEffect, useState } from 'react';
import getNowPlayingItem from '../lib/spotify';
import { SlSocialSpotify } from 'react-icons/sl';

export default function FooterSpotify() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        const fetchData = () => {
            if (document.hidden) return;
            getNowPlayingItem().then((data) => {
                setResult(data);
                setLoading(false);
            });
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-2 animate-pulse">
                <SlSocialSpotify />
                <span>Loading Spotify...</span>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="flex items-center gap-2 text-base-content/50">
                <SlSocialSpotify />
                <span>Not Playing</span>
            </div>
        );
    }

    return (
        <a
            href={result.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#1DB954] transition-colors max-w-[200px]"
            title={`${result.title} by ${result.artist}`}
        >
            <SlSocialSpotify className={result.isPlaying ? "text-[#1DB954] animate-pulse" : ""} />
            <div className="flex items-center overflow-hidden whitespace-nowrap mask-linear-fade">
                <span className="truncate text-xs">
                    {result.title} - {result.artist}
                </span>
            </div>
        </a>
    );
}
