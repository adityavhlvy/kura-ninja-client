/**
 * Bins the province boundaries in data/geospatial-data into a pointy-top hex
 * grid and writes src/data/archipelago.json for the hero map.
 *
 * The CSV is gitignored (tens of MB), so this runs by hand: `bun run map`.
 * The output is small and committed, so builds never need the raw data.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CSV = join(root, "data/geospatial-data/wilayah_provinsi_202604102227.csv");
const OUT = join(root, "src/data/archipelago.json");

/** Hex circumradius in degrees. 0.3 keeps Bali and Nusa Tenggara readable. */
const R = 0.3;
const W = Math.sqrt(3) * R;
const H = 1.5 * R;
const BBOX = { minLon: 94.8, maxLon: 141.2, minLat: -11.2, maxLat: 6.3 };

type Ring = [number, number][];
interface Province { code: string; name: string; polygons: Ring[][] }

function parseCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function parseMultiPolygon(wkt: string): Ring[][] {
  const body = wkt.replace(/^MULTIPOLYGON\s*\(\(\(/, "").replace(/\)\)\)\s*$/, "");
  return body.split(/\)\)\s*,\s*\(\(/).map((poly) =>
    poly.split(/\)\s*,\s*\(/).map((ring) =>
      ring.split(",").map((pt) => {
        const [lon, lat] = pt.trim().split(/\s+/).map(Number);
        return [lon, lat] as [number, number];
      }),
    ),
  );
}

function inRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inProvince(x: number, y: number, p: Province): boolean {
  return p.polygons.some((rings) => inRing(x, y, rings[0]) && !rings.slice(1).some((h) => inRing(x, y, h)));
}

/** Grid cell for a lon/lat, nearest centre by brute check of the 3x3 neighbourhood. */
function cellOf(lon: number, lat: number): [number, number] {
  const r0 = Math.round((BBOX.maxLat - lat) / H);
  let best: [number, number] = [0, 0];
  let bestD = Infinity;
  for (let r = r0 - 1; r <= r0 + 1; r++) {
    const off = r & 1 ? W / 2 : 0;
    const q0 = Math.round((lon - BBOX.minLon - off) / W);
    for (let q = q0 - 1; q <= q0 + 1; q++) {
      const [cx, cy] = centre(q, r);
      const d = (cx - lon) ** 2 + (cy - lat) ** 2;
      if (d < bestD) { bestD = d; best = [q, r]; }
    }
  }
  return best;
}

function centre(q: number, r: number): [number, number] {
  return [BBOX.minLon + q * W + (r & 1 ? W / 2 : 0), BBOX.maxLat - r * H];
}

const lines = readFileSync(CSV, "utf-8").trim().split("\n").slice(1);
const provinces: Province[] = lines.map((line) => {
  const [name, code, , , geom] = parseCsvLine(line);
  return { name, code, polygons: parseMultiPolygon(geom) };
});

const cells = new Map<string, number>();
const votes = new Map<string, Map<number, number>>();

// Pass 1: every boundary vertex votes for its cell, so small islands survive.
provinces.forEach((p, pi) => {
  for (const rings of p.polygons) for (const [lon, lat] of rings[0]) {
    const key = cellOf(lon, lat).join(",");
    const v = votes.get(key) ?? new Map<number, number>();
    v.set(pi, (v.get(pi) ?? 0) + 1);
    votes.set(key, v);
  }
});

// Pass 2: cell centres inside a province win outright.
const cols = Math.ceil((BBOX.maxLon - BBOX.minLon) / W) + 1;
const rows = Math.ceil((BBOX.maxLat - BBOX.minLat) / H) + 1;
for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
  const [x, y] = centre(q, r);
  const pi = provinces.findIndex((p) => inProvince(x, y, p));
  if (pi >= 0) cells.set(`${q},${r}`, pi);
}
for (const [key, v] of votes) {
  if (cells.has(key)) continue;
  const [pi, n] = [...v.entries()].sort((a, b) => b[1] - a[1])[0];
  if (n >= 3) cells.set(key, pi); // ignore one-vertex slivers
}

const hexes = [...cells.entries()]
  .map(([key, pi]) => [...key.split(",").map(Number), pi] as [number, number, number])
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

writeFileSync(
  OUT,
  JSON.stringify({
    radiusDeg: R,
    cols,
    rows,
    provinces: provinces.map(({ code, name }) => ({ code, name })),
    hexes,
  }),
);
console.log(`[map] ${hexes.length} hexes across ${provinces.length} provinces -> src/data/archipelago.json`);
