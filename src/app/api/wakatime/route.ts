import { NextResponse } from 'next/server';

const API_KEY = process.env.WAKATIME_API_KEY;
const BASE_URL = 'https://wakatime.com/api/v1';

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: 'WakaTime API key not configured' }, { status: 500 });
  }

  const encodedKey = Buffer.from(API_KEY).toString('base64');

  try {
    const response = await fetch(`${BASE_URL}/users/current/stats/last_7_days`, {
      headers: {
        Authorization: `Basic ${encodedKey}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch WakaTime data' }, { status: response.status });
    }

    const data = await response.json();

    if (!data.data) {
      return NextResponse.json({ error: 'No WakaTime data available' }, { status: 404 });
    }

    const result = {
      total_seconds: data.data.human_readable_total_including_other_language,
      daily_average: data.data.human_readable_daily_average_including_other_language,
      languages: data.data.languages?.slice(0, 5).map((lang: any) => ({
        name: lang.name,
        percent: lang.percent,
        color: lang.color,
      })) || [],
      categories: data.data.categories?.slice(0, 3).map((cat: any) => ({
        name: cat.name,
        percent: cat.percent,
      })) || [],
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
