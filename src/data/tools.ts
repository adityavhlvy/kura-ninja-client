export interface Tool {
  slug: string;
  name: string;
  summary: string;
  status: "live" | "soon";
  href: string;
}

/** One entry per tool. Adding a tool is one object and one route. */
export const tools: Tool[] = [
  {
    slug: "qr",
    name: "QR Ninja",
    summary: "QR codes for links, Wi-Fi, contacts, events, and places. Custom modules, colours, logo, PNG or SVG, and short links with scan counts.",
    status: "live",
    href: "/tools/qr",
  },
  {
    slug: "qr-damage",
    name: "QR Damage Lab",
    summary: "Brush, fold, and cover a QR code, then watch the error correction budget drain. Every stroke is re-decoded in the browser.",
    status: "live",
    href: "/tools/qr/damage",
  },
  {
    slug: "mcp-xray",
    name: "MCP X-Ray",
    summary: "Point it at a public MCP endpoint and get a trace you can play back: every frame, both directions, and the server-to-client callbacks most clients hide.",
    status: "live",
    href: "/tools/mcp-xray",
  },
];
