// @ts-nocheck
import spotifyHandler from "./api/spotify";
import telemetryHandler from "./api/telemetry";

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/spotify" || url.pathname === "/api/telemetry") {
      const handler =
        url.pathname === "/api/spotify" ? spotifyHandler : telemetryHandler;
      let status = 200;
      const headers = new Headers();
      let body: string = "";

      const mockRes: any = {
        setHeader(name: string, value: string) {
          headers.set(name, value);
          return this;
        },
        status(code: number) {
          status = code;
          return this;
        },
        json(data: any) {
          body = JSON.stringify(data);
          headers.set("Content-Type", "application/json");
          return this;
        },
        end() {
          return this;
        },
      };

      const mockReq: any = {
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
      };

      try {
        await handler(mockReq, mockRes);
      } catch (err) {
        console.error("Proxy error:", err);
        return new Response(
          JSON.stringify({
            error: "Internal server error in serverless proxy",
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return new Response(body, {
        status,
        headers,
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log("Local Dev Spotify Proxy listening on http://localhost:8080");
