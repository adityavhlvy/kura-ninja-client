export default async function getNowPlayingItem() {
  try {
    const response = await fetch("/api/spotify");
    if (!response.ok) return false;
    return await response.json();
  } catch (err) {
    console.error("Spotify API error:", err);
    return false;
  }
}
