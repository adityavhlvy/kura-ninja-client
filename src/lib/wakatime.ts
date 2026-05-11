export async function getWakaTimeStats() {
  try {
    const response = await fetch('/api/wakatime');

    if (!response.ok) {
      console.error('WakaTime: returned', response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return null;
  }
}
