// Writes the static brand kit from the same geometry the site renders
// (src/lib/sunPixel.ts). Run with `bun run brand`. SVGs are always written.
// PNGs need ImageMagick (`magick`) on PATH and are skipped without it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { cellsPath, MARK_N, sunCells } from "../src/lib/sunPixel";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "../public");
const OUT = join(PUBLIC, "brand");
mkdirSync(OUT, { recursive: true });

const INK = "#121518";
const INK_DARK = "#e7e9e4";
const PAPER = "#eceee9";
const PAPER_DARK = "#0e1113";
const SEA = "#1f3fd1";
const SEA_DARK = "#8098ff";

const cells = sunCells(MARK_N);
const SUN = cellsPath(cells.filter((c) => !c.core));
const CORE = cellsPath(cells.filter((c) => c.core));
const N = MARK_N;

const write = (name: string, svg: string) => {
  writeFileSync(join(name.startsWith("/") ? PUBLIC : OUT, name.replace(/^\//, "")), svg);
  console.log(`[brand] ${name}`);
};

// Favicon follows the OS theme. Half a cell of padding keeps it off the tab edge.
write(
  "/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 ${N + 1} ${N + 1}" shape-rendering="crispEdges">
  <style>.s{fill:${INK}}.c{fill:${SEA}}@media (prefers-color-scheme:dark){.s{fill:${INK_DARK}}.c{fill:${SEA_DARK}}}</style>
  <path class="s" d="${SUN}"/><path class="c" d="${CORE}"/>
</svg>
`,
);

write(
  "mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" width="512" height="512" shape-rendering="crispEdges">
  <path fill="${INK}" d="${SUN}"/><path fill="${SEA}" d="${CORE}"/>
</svg>
`,
);

write(
  "mark-dark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" width="512" height="512" shape-rendering="crispEdges">
  <path fill="${INK_DARK}" d="${SUN}"/><path fill="${SEA_DARK}" d="${CORE}"/>
</svg>
`,
);

// One colour for stamps, embossing, and watermarks. The core stays open, so
// the centre still reads without the sea.
write(
  "mark-mono.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N} ${N}" width="512" height="512" shape-rendering="crispEdges">
  <path fill="currentColor" d="${SUN}"/>
</svg>
`,
);

// App icon: the mark on an ink tile, 2 cells of clear space. Corners stay
// square. iOS and Android apply their own mask.
const TILE = N + 4;
write(
  "app-icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE} ${TILE}" width="512" height="512" shape-rendering="crispEdges">
  <rect width="${TILE}" height="${TILE}" fill="${PAPER_DARK}"/>
  <g transform="translate(2 2)"><path fill="${INK_DARK}" d="${SUN}"/><path fill="${SEA_DARK}" d="${CORE}"/></g>
</svg>
`,
);

// Lockup: mark plus the handle in Archivo. The text stays live, so it needs
// Archivo installed to render true. Use the PNG where fonts are unknown.
write(
  "lockup.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${N * 6.2} ${N}" width="${Math.round(N * 6.2 * 16)}" height="${N * 16}">
  <g shape-rendering="crispEdges"><path fill="${INK}" d="${SUN}"/><path fill="${SEA}" d="${CORE}"/></g>
  <text x="${N + 1.6}" y="${N * 0.73}" fill="${INK}" font-family="Archivo, sans-serif" font-size="${N * 0.62}" font-weight="600" letter-spacing="-0.12" style="font-variation-settings:'wdth' 112">adityavhlvy</text>
</svg>
`,
);

// Loader: rows light up top to bottom like a push-broom scanner, then fade
// in the same order. It loops because loading is a real, ongoing state.
const PERIOD = 1.6;
const rowDelay = (y: number) => ((y / N) * PERIOD * 0.7).toFixed(3);
const loaderCells = cells
  .map((c) => `<rect x="${c.x}" y="${c.y}" width="1" height="1" class="${c.core ? "c" : "s"}" style="animation-delay:${rowDelay(c.y)}s"/>`)
  .join("");
write(
  "loader.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 ${N + 1} ${N + 1}" width="96" height="96" shape-rendering="crispEdges">
  <style>
    .s{fill:${INK}}.c{fill:${SEA}}.l{fill:${SEA}}
    @media (prefers-color-scheme:dark){.s{fill:${INK_DARK}}.c,.l{fill:${SEA_DARK}}}
    rect.s,rect.c{animation:scan ${PERIOD}s cubic-bezier(.22,1,.36,1) infinite both}
    .l{animation:sweep ${PERIOD}s linear infinite}
    @keyframes scan{0%{opacity:.14}18%{opacity:1}55%{opacity:1}100%{opacity:.14}}
    @keyframes sweep{0%{transform:translateY(0);opacity:1}70%{transform:translateY(${N}px);opacity:1}71%,100%{opacity:0}}
    @media (prefers-reduced-motion:reduce){rect.s,rect.c,.l{animation:none}.l{opacity:0}}
  </style>
  ${loaderCells}
  <rect class="l" x="-0.5" y="-0.1" width="${N + 1}" height="0.2"/>
</svg>
`,
);

writeFileSync(
  join(PUBLIC, "site.webmanifest"),
  JSON.stringify(
    {
      name: "Aditya Vahlevy Nugraha",
      short_name: "adityavhlvy",
      start_url: "/",
      display: "standalone",
      background_color: PAPER,
      theme_color: PAPER_DARK,
      icons: [
        { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/brand/app-icon.svg", sizes: "any", type: "image/svg+xml" },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log("[brand] /site.webmanifest");

const magick = (args: string[]) => spawnSync("magick", args, { stdio: "inherit" }).status === 0;
if (spawnSync("magick", ["-version"]).status !== 0) {
  console.log("[brand] magick not found, PNGs skipped");
} else {
  const png = (src: string, out: string, size: number) =>
    magick(["-background", "none", "-density", "600", join(OUT, src), "-resize", `${size}x${size}`, out]) &&
    console.log(`[brand] ${out.replace(PUBLIC, "")}`);
  png("app-icon.svg", join(PUBLIC, "apple-touch-icon.png"), 180);
  png("app-icon.svg", join(OUT, "icon-192.png"), 192);
  png("app-icon.svg", join(OUT, "icon-512.png"), 512);
  png("mark.svg", join(OUT, "mark-1024.png"), 1024);
}
