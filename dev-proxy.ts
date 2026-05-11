/**
 * Local dev proxy for WakaTime API (bypasses CORS)
 * Run: bun dev-proxy.ts
 */

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY || "";

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === "/api/wakatime") {
      try {
        const response = await fetch(
          "https://wakatime.com/api/v1/users/current/stats/last_7_days",
          {
            headers: {
              Authorization: `Basic ${btoa(WAKATIME_API_KEY)}`,
            },
          }
        );

        if (!response.ok) {
          return Response.json({ error: "WakaTime API error" }, { status: response.status, headers: corsHeaders });
        }

        const json = await response.json();
        const data = json.data;

        const result = {
          formatted_total: data.human_readable_total_including_other_language || data.human_readable_total || "0 hrs",
          total_seconds: data.total_seconds_including_other_language || data.total_seconds || 0,
          daily_average: data.human_readable_daily_average_including_other_language || data.human_readable_daily_average || "0 hrs",
          languages: (data.languages || []).slice(0, 6).map((lang: any) => ({
            name: lang.name,
            percent: lang.percent,
            text: lang.text,
          })),
          editors: (data.editors || []).slice(0, 3).map((editor: any) => ({
            name: editor.name,
            percent: editor.percent,
          })),
        };

        return Response.json(result, { headers: corsHeaders });
      } catch (error) {
        console.error("Proxy error:", error);
        return Response.json({ error: "Proxy error" }, { status: 500, headers: corsHeaders });
      }
    }

    return Response.json({ error: "Not found" }, { status: 404, headers: corsHeaders });
  },
});

console.log(`🐢 Dev proxy running at http://localhost:${server.port}`);
