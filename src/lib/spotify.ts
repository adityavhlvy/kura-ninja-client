const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
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
    });

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

export const getTopTracks = async () => {
    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getRecentlyPlayed = async () => {
    const { access_token } = await getAccessToken();

    return fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export async function getTopTracksItems() {
    const response = await getTopTracks();
    if (response.status === 204 || response.status > 400) {
        return [];
    }

    const { items } = await response.json();

    return items.map((track: any) => ({
        artist: track.artists.map((_artist: any) => _artist.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
        albumImageUrl: track.album.images[0].url,
    }));
}

export default async function getNowPlayingItem() {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
        // Fallback to recently played
        const recentResponse = await getRecentlyPlayed();
        if (recentResponse.status !== 200) {
            return false;
        }
        const recent = await recentResponse.json();
        if (recent.items.length === 0) {
            return false;
        }

        const track = recent.items[0].track;
        const albumImageUrl = track.album.images[0].url;
        const artist = track.artists.map((_artist: any) => _artist.name).join(', ');
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

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
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
