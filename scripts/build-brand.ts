// Writes the static brand kit from the same geometry the site renders
// (src/lib/avnMark.ts). Run with `bun run brand`. SVGs are always written.
// PNGs need ImageMagick (`magick`) on PATH and are skipped without it.
// The mark is monochrome for now. Colour comes later.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { CLEAR, FAVICON, MARK, PHI, SMALL } from "../src/lib/avnMark";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "../public");
const OUT = join(PUBLIC, "brand");
mkdirSync(OUT, { recursive: true });

const INK = "#121518";
const INK_DARK = "#e7e9e4";
const PAPER = "#eceee9";
const PAPER_DARK = "#0e1113";
const GUIDE = "#8a908d";

type Mark = typeof MARK;
const { H } = MARK;
const n = (v: number) => +v.toFixed(3);
const viewBox = (m: Mark) => `${m.box.x} ${m.box.y} ${m.box.w} ${m.box.h}`;

/** Mark as fill + stroke. `cls` swaps the colour attributes for classes, for themed files. */
const paths = (m: Mark, ink: string, cls = false) => {
  const fill = cls ? `class="f"` : `fill="${ink}"`;
  const stroke = cls ? `class="s"` : `stroke="${ink}"`;
  const wave = m.wave ? `<path ${stroke} fill="none" stroke-width="${n(m.t)}" d="${m.wave}"/>` : "";
  return `<path ${fill} d="${m.zig}"/>${wave}`;
};

/** The mark drawn `w` px wide with its top-left box corner at (x, y). */
const place = (m: Mark, x: number, y: number, w: number, ink: string) => {
  const k = w / m.box.w;
  return `<g transform="translate(${n(x)} ${n(y)}) scale(${n(k)}) translate(${-m.box.x} ${-m.box.y})">${paths(m, ink)}</g>`;
};

const write = (name: string, svg: string) => {
  writeFileSync(join(name.startsWith("/") ? PUBLIC : OUT, name.replace(/^\//, "")), svg);
  console.log(`[brand] ${name}`);
};

const themed = `<style>.f{fill:${INK}}.s{stroke:${INK}}@media (prefers-color-scheme:dark){.f{fill:${INK_DARK}}.s{stroke:${INK_DARK}}}</style>`;

// Favicon: the pixel-snapped ΛV. Follows the OS theme.
write(
  "/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  ${themed}<path class="f" d="${FAVICON}"/>
</svg>
`,
);

const markFile = (m: Mark, ink: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(m)}" width="${Math.round((512 * m.box.w) / m.box.h)}" height="512">
  ${paths(m, ink)}
</svg>
`;
write("mark.svg", markFile(MARK, INK));
write("mark-dark.svg", markFile(MARK, INK_DARK));
write("mark-mono.svg", markFile(MARK, "currentColor"));
write("mark-small.svg", markFile(SMALL, INK));

// App icon: the main mark on a night tile, 1/φ of the tile wide. Corners stay
// square. iOS and Android apply their own mask.
const TILE = MARK.box.w * PHI;
write(
  "app-icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(TILE)} ${n(TILE)}" width="512" height="512">
  <rect width="${n(TILE)}" height="${n(TILE)}" fill="${PAPER_DARK}"/>
  ${place(MARK, (TILE - MARK.box.w) / 2, (TILE - MARK.box.h) / 2, MARK.box.w, INK_DARK)}
</svg>
`,
);

// Lockups. Cap height of the words is H/φ, so the mark stands φ times taller
// than the capitals. Baselines align. Gap to the mark is the clear space.
// Text stays live, so it needs Archivo to render true. textLength pins the
// width so a fallback font cannot overflow. Widths were measured in Chromium
// at 100 px, Archivo 600, wdth 112, tracking −3%. Re-measure if the type changes.
const ARCHIVO_CAP = 0.686;
const FS = H / PHI / ARCHIVO_CAP;
const words = (text: string, at100: number, x: number, ink: string) =>
  `<text x="${n(x)}" y="${H}" fill="${ink}" font-family="Archivo, sans-serif" font-size="${n(FS)}" font-weight="600" letter-spacing="${n(-0.03 * FS)}" textLength="${n((at100 / 100) * FS)}" style="font-variation-settings:'wdth' 112">${text}</text>`;
const WORDS = { handle: { text: "adityavhlvy", at100: 554 }, name: { text: "Aditya Vahlevy Nugraha", at100: 1178 } };
const lockup = ({ text, at100 }: { text: string; at100: number }, ink: string) => {
  const x = MARK.box.x + MARK.box.w + CLEAR;
  const w = MARK.box.w + CLEAR + (at100 / 100) * FS;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK.box.x} ${MARK.box.y} ${n(w)} ${MARK.box.h}" width="${Math.round(w * 16)}" height="${Math.round(MARK.box.h * 16)}">
  ${paths(MARK, ink)}
  ${words(text, at100, x, ink)}
</svg>
`;
};
write("lockup.svg", lockup(WORDS.handle, INK));
write("lockup-name.svg", lockup(WORDS.name, INK));
write("lockup-name-dark.svg", lockup(WORDS.name, INK_DARK));

// Loader: a pen segment runs the line over a faint copy. It loops because
// loading is a real, ongoing state. Holds still under reduced motion.
const TRACE_W = n(MARK.t * 4);
write(
  "loader.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox(MARK)}" width="96" height="${Math.round((96 * MARK.box.h) / MARK.box.w)}">
  ${themed.replace(
    "</style>",
    `.l{stroke-dasharray:.4 1.6;animation:l 1.6s cubic-bezier(.65,0,.35,1) infinite}@keyframes l{from{stroke-dashoffset:1.4}to{stroke-dashoffset:-1}}@media (prefers-reduced-motion:reduce){.l{animation:none;stroke-dasharray:none}}</style>`,
  )}
  <mask id="m" maskUnits="userSpaceOnUse"><path class="l" d="${MARK.trace}" pathLength="1" fill="none" stroke="#fff" stroke-width="${TRACE_W}"/></mask>
  <g opacity=".15">${paths(MARK, "", true)}</g>
  <g mask="url(#m)">${paths(MARK, "", true)}</g>
</svg>
`,
);

/* ------------------------------------------------------------------ */
/* Construction sheet: grid, guides, versions, light and dark tests    */
/* ------------------------------------------------------------------ */

const SHEET_W = 1600;
const mono = `font-family="IBM Plex Mono, ui-monospace, monospace"`;
const label = (x: number, y: number, s: string, fill = GUIDE, anchor = "start") =>
  `<text x="${n(x)}" y="${n(y)}" ${mono} font-size="13" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const line = (x1: number, y1: number, x2: number, y2: number, dash = "", w = 1) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${GUIDE}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

/** Construction drawing of one mark, `k` px per unit, box corner at (ox, oy). */
function construction(m: Mark, ox: number, oy: number, k: number, full: boolean) {
  const X = (u: number) => ox + (u - m.box.x) * k;
  const Y = (v: number) => oy + (v - m.box.y) * k;
  const x0 = m.box.x;
  const x1 = m.box.x + m.box.w;
  const out: string[] = [];

  // Unit grid across the box.
  for (let u = Math.ceil(x0); u <= x1; u++) out.push(line(X(u), Y(0), X(u), Y(H), "", 0.4));
  for (let v = 0; v <= H; v++) out.push(line(X(x0), Y(v), X(x1), Y(v), "", 0.4));
  out.push(place(m, X(x0), Y(m.box.y), m.box.w * k, INK));

  // Cap, base, and overshoot lines.
  out.push(line(X(x0) - 40, Y(0), X(x1) + 40, Y(0), "", 1), line(X(x0) - 40, Y(H), X(x1) + 40, Y(H), "", 1));
  out.push(line(X(x0) - 40, Y(-m.o), X(x1) + 40, Y(-m.o), "3 3"), line(X(x0) - 40, Y(H + m.o), X(x1) + 40, Y(H + m.o), "3 3"));
  out.push(label(X(x1) + 48, Y(0) + 4, "cap"), label(X(x1) + 48, Y(H) + 4, "base"));

  // Spine and the fillet circles the wave is cut from.
  out.push(
    `<path d="${m.spine.map((p, i) => `${i ? "L" : "M"}${n(X(p.x))} ${n(Y(p.y))}`).join("")}" fill="none" stroke="${PAPER}" stroke-width="1" stroke-dasharray="4 3"/>`,
  );
  if (full) {
    const off = m.r / Math.sin(Math.atan(m.slope));
    m.spine.slice(1, -1).forEach((p) => {
      const cy = p.y < H / 2 ? p.y + off : p.y - off;
      out.push(`<circle cx="${n(X(p.x))}" cy="${n(Y(cy))}" r="${n(m.r * k)}" fill="none" stroke="${GUIDE}" stroke-dasharray="2 3"/>`);
    });
    // Golden box: φ·H by H, split into a square and a smaller golden rectangle.
    out.push(
      `<rect x="${n(X(x0))}" y="${n(Y(0))}" width="${n(m.box.w * k)}" height="${n(H * k)}" fill="none" stroke="${GUIDE}" stroke-dasharray="6 4"/>`,
      line(X(x0 + H), Y(0), X(x0 + H), Y(H), "6 4"),
      label(X(x0), Y(H) + 30, `φ·H = ${n(m.box.w)}`),
      label(X(x0) - 48, Y(H / 2), `H = ${H}`, GUIDE, "end"),
    );
    // Clear space.
    const c = CLEAR * k;
    out.push(
      `<rect x="${n(X(x0) - c)}" y="${n(Y(m.box.y) - c)}" width="${n(m.box.w * k + 2 * c)}" height="${n(m.box.h * k + 2 * c)}" fill="none" stroke="${GUIDE}" stroke-dasharray="1 4"/>`,
      label(X(x0) - c, Y(m.box.y) - c - 8, `clear space H/φ² = ${n(CLEAR)}`),
    );
  }
  if (full) {
    out.push(label(X(x1) + 48, Y(-m.o) - 6, "overshoot o = t/4"));
    out.push(label(X(m.spine[0].x) + m.t * k * 3.4, Y(H) - 10, `${m.angle.toFixed(1)}°`, INK));
  }
  out.push(label(X(x0), Y(m.box.y) - (full ? 70 : 14), full ? `stroke t = H/φ⁵ = ${n(m.t)} · fillet r = ${n(m.r)}` : `ΛV · t = H/φ⁴ = ${n(m.t)}`, INK));
  return out.join("");
}

/** 16 px favicon on its pixel grid, `k` px per pixel. */
function pixelGrid(ox: number, oy: number, k: number) {
  const out = [`<rect x="${ox}" y="${oy}" width="${16 * k}" height="${16 * k}" fill="#fff"/>`];
  for (let i = 0; i <= 16; i++) out.push(line(ox + i * k, oy, ox + i * k, oy + 16 * k, "", 0.5), line(ox, oy + i * k, ox + 16 * k, oy + i * k, "", 0.5));
  out.push(`<g transform="translate(${ox} ${oy}) scale(${k})"><path fill="${INK}" d="${FAVICON}"/></g>`);
  out.push(label(ox, oy - 12, "favicon 16 px · corners on the pixel grid", INK));
  return out.join("");
}

const ROW = 420;
const BASE = 360;

/** One row of every version on a given ground. */
function versions(y: number, bg: string, ink: string, tag: string) {
  const lock = (w: typeof WORDS.name, x: number, yy: number, px: number) => {
    const k = px / MARK.box.h;
    const tx = MARK.box.x + MARK.box.w + CLEAR;
    return `<g transform="translate(${x} ${yy}) scale(${n(k)}) translate(${-MARK.box.x} ${-MARK.box.y})">${paths(MARK, ink)}${words(w.text, w.at100, tx, ink)}</g>`;
  };
  const sizes = [16, 24, 32];
  const ladder = [192, 128, 96, 64, 48];
  let x = 60;
  const ladderSvg = ladder
    .map((w) => {
      const s = place(MARK, x, y + BASE - (w * MARK.box.h) / MARK.box.w, w, ink) + label(x, y + BASE + 24, `${w}`);
      x += w + 36;
      return s;
    })
    .join("");
  const smallSvg = sizes
    .map((h) => {
      const w = (h * SMALL.box.w) / SMALL.box.h;
      const s = place(SMALL, x, y + BASE - h, w, ink) + label(x, y + BASE + 24, `${h}`);
      x += w + 36;
      return s;
    })
    .join("");
  const fav = `<g transform="translate(${x} ${y + BASE - 16})"><path fill="${ink}" d="${FAVICON}"/></g>${label(x, y + BASE + 24, "16 fav")}`;
  return `<rect x="0" y="${y}" width="${SHEET_W}" height="${ROW}" fill="${bg}"/>
  ${label(60, y + 40, tag, ink)}
  ${place(MARK, 60, y + 70, 160, ink)}
  ${lock(WORDS.name, 300, y + 90, 56)}
  ${lock(WORDS.handle, 1060, y + 100, 46)}
  ${ladderSvg}${smallSvg}${fav}`;
}

const K = 22;
const TOP = 1120;
write(
  "construction.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET_W} ${TOP + 2 * ROW}" width="${SHEET_W}" height="${TOP + 2 * ROW}">
  <rect width="${SHEET_W}" height="${TOP}" fill="${PAPER}"/>
  ${label(60, 56, "AVN · construction", INK)}
  ${construction(MARK, 260, 330, K, true)}
  ${construction(SMALL, 1250, 330, 9, false)}
  ${pixelGrid(1250, 640, 16)}
  ${label(60, TOP - 80, "Λ strokes 1–2 · V strokes 2–3 · N strokes 3–5 · wave = same spine, every turn filleted, arcs meet at stroke midpoints")}
  ${label(60, TOP - 56, "Every stroke shares one angle. Pointed turns overshoot cap and base by t/4. Flat terminals sit on the lines.")}
  ${versions(TOP, PAPER, INK, "light")}
  ${versions(TOP + ROW, PAPER_DARK, INK_DARK, "dark")}
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
