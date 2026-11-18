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
];
