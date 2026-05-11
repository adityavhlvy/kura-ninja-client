const client_id = import.meta.env.PUBLIC_SPOTIFY_CLIENT_ID || "";
const client_secret = import.meta.env.PUBLIC_SPOTIFY_CLIENT_SECRET || "";
const refresh_token = import.meta.env.PUBLIC_SPOTIFY_REFRESH_TOKEN || "";

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Token caching mechanism
let cachedToken: string | null = null;
let tokenExpiryTime: number = 0;

const getAccessToken = async () => {
    const now = Date.now();
    if (cachedToken && now < tokenExpiryTime) {
        return { access_token: cachedToken };
    }

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
        cache: 'no-store'
    });

    const data = await response.json();
    if (data.access_token) {
        cachedToken = data.access_token;
        // Spotify tokens expire in 3600s usually. Set a safe margin (e.g., 3500s)
        const expiresIn = data.expires_in || 3600;
        tokenExpiryTime = now + (expiresIn * 1000) - 60000; // 1 min buffer
    }

    return data;
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(`${NOW_PLAYING_ENDPOINT}?ts=${Date.now()}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-store'
    });
};

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

export const getTopTracks = async () => {
    const { access_token } = await getAccessToken();

    return fetch(`${TOP_TRACKS_ENDPOINT}&ts=${Date.now()}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-store'
    });
};

export const getRecentlyPlayed = async () => {
    const { access_token } = await getAccessToken();

    return fetch(`${RECENTLY_PLAYED_ENDPOINT}&ts=${Date.now()}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-store'
    });
};

// Spotify API Types
interface SpotifyImage {
    url: string;
}

interface SpotifyArtist {
    name: string;
}

interface SpotifyAlbum {
    images: SpotifyImage[];
}

interface SpotifyTrack {
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    external_urls: {
        spotify: string;
    };
}

interface SpotifyNowPlaying {
    is_playing: boolean;
    item: SpotifyTrack;
}

export async function getTopTracksItems() {
    const response = await getTopTracks();
    if (response.status === 204 || response.status > 400) {
        return [];
    }

    const { items } = await response.json();

    return items.map((track: SpotifyTrack) => ({
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        albumImageUrl: track.album.images[0].url,
    }));
}

export default async function getNowPlayingItem() {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
        console.warn("Spotify: No content (204) or Error. Falling back to Recently Played.");
        // Fallback to recently played
        const recentResponse = await getRecentlyPlayed();
        if (recentResponse.status !== 200) {
            return false;
        }
        const recent = await recentResponse.json();
        if (recent.items.length === 0) {
            return false;
        }

        const track: SpotifyTrack = recent.items[0].track;
        const albumImageUrl = track.album.images[0].url;
        const artist = track.artists.map((_artist) => _artist.name).join(', ');
        const songUrl = track.external_urls.spotify;
        const title = track.name;

        return {
            albumImageUrl,
            artist,
            isPlaying: false,
            songUrl,
            title,
            isRecent: true // Flag to indicate this is a recent track, not live
        };
    }

    const song: SpotifyNowPlaying = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;

    return {
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
        isRecent: !isPlaying,
    };
}
