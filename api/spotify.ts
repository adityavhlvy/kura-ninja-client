import type { VercelRequest, VercelResponse } from '@vercel/node';

// Read secrets from server environment (never exposed to client browser)
const client_id = process.env.SPOTIFY_CLIENT_ID || process.env.PUBLIC_SPOTIFY_CLIENT_ID || "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || process.env.PUBLIC_SPOTIFY_CLIENT_SECRET || "";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || process.env.PUBLIC_SPOTIFY_REFRESH_TOKEN || "";

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
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

  if (!response.ok) {
    throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
  }

  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!client_id || !client_secret || !refresh_token) {
      return res.status(500).json({ error: 'Spotify credentials not configured' });
    }

    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Fallback if not playing (204) or API error
    if (response.status === 204 || response.status > 400) {
      const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (recentResponse.status !== 200) {
        return res.status(200).json(null);
      }

      const recent = await recentResponse.json();
      if (!recent.items || recent.items.length === 0) {
        return res.status(200).json(null);
      }

      const track = recent.items[0].track;
      return res.status(200).json({
        albumImageUrl: track.album.images[0]?.url || "",
        artist: track.artists.map((_artist: any) => _artist.name).join(', '),
        isPlaying: false,
        songUrl: track.external_urls.spotify,
        title: track.name,
        isRecent: true,
      });
    }

    const song = await response.json();
    if (!song.item) {
      return res.status(200).json(null);
    }

    return res.status(200).json({
      albumImageUrl: song.item.album.images[0]?.url || "",
      artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
      isRecent: !song.is_playing,
    });
  } catch (error) {
    console.error('Spotify serverless handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
