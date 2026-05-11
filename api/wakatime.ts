import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'WakaTime API key not configured' });
  }

  try {
    const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'WakaTime API error' });
    }

    const json = await response.json();
    const data = json.data;

    if (!data) {
      return res.status(404).json({ error: 'No data' });
    }

    const result = {
      formatted_total: data.human_readable_total_including_other_language || data.human_readable_total || '0 hrs',
      total_seconds: data.total_seconds_including_other_language || data.total_seconds || 0,
      daily_average: data.human_readable_daily_average_including_other_language || data.human_readable_daily_average || '0 hrs',
      languages: (data.languages || []).slice(0, 6).map((lang: any) => ({
        name: lang.name,
        percent: lang.percent,
        text: lang.text,
        hours: lang.hours,
        minutes: lang.minutes,
      })),
      editors: (data.editors || []).slice(0, 3).map((editor: any) => ({
        name: editor.name,
        percent: editor.percent,
      })),
      operating_systems: (data.operating_systems || []).slice(0, 3).map((os: any) => ({
        name: os.name,
        percent: os.percent,
      })),
    };

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(result);
  } catch (error) {
    console.error('WakaTime proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
