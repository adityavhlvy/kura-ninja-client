export async function getWakaTimeStats() {
  try {
    const response = await fetch('/api/wakatime', {
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return null;
  }
}
