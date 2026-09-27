// Geometry of the mark: the sun (Aditya) as a satellite records it, a radiant solar
// disc with 8 Surya rays (cardinal spikes + diagonal flares). A V (Vahlevy) is cut
// out of it at 45 degrees, guiding focus down into a 3-tier deep ocean basin at the
// centre (Nugraha). Shared by the React components and scripts/build-brand.ts.

export type Cell = { x: number; y: number; core: boolean };

/**
 * Cells per side for the official mark. Odd, so one pixel sits dead centre.
 * Thirteen is the optimal grid where each arm of the V has three clean steps,
 * the 8 solar rays radiate with authority, and the sea basin holds true depth.
 */
export const MARK_N = 13;

/** Every cell inside the disc and 8 solar rays, with the V cells flagged as cut. */
function layout(n: number) {
  const c = (n - 1) / 2;
  // Core disc radius
  const r2 = (c * 0.88) ** 2;
  const inDisc = (x: number, y: number) => (x - c) ** 2 + (y - c) ** 2 <= r2;

  // 8 Radiant Solar Rays (Surya):
  // Cardinal spikes: 2-step extensions to grid edge (North, South, East, West)
  const isCardinal = (x: number, y: number) =>
    (x === c && (y === 0 || y === 1 || y === n - 1 || y === n - 2)) ||
    (y === c && (x === 0 || x === 1 || x === n - 1 || x === n - 2));

  // Diagonal flares:
  const diagDist = Math.max(1, Math.round(c * 0.67));
  const isDiag = (x: number, y: number) =>
    Math.abs(x - c) === diagDist && Math.abs(y - c) === diagDist;

  const isRay = (x: number, y: number) => isCardinal(x, y) || isDiag(x, y);

  // The V climbs from y = c - 1 upward at 45 degrees, one cell wide:
  const maxRise = Math.max(1, Math.floor(c * 0.55));
  const isV = (x: number, y: number) => {
    const rise = c - y;
    return rise >= 1 && rise <= maxRise && Math.abs(x - c) === rise;
  };

  // The Sea (Nugraha): 3-tier deep ocean basin (7-5-3 cells at n=13)
  const seaW0 = Math.max(1, Math.round(c * 0.5));
  const seaW1 = Math.max(0, seaW0 - 1);
  const seaW2 = Math.max(0, seaW0 - 2);
  const isSea = (x: number, y: number) =>
    (y === c && Math.abs(x - c) <= seaW0) ||
    (y === c + 1 && Math.abs(x - c) <= seaW1) ||
    (y === c + 2 && Math.abs(x - c) <= seaW2);

  const out: (Cell & { cut: boolean })[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const inMark = inDisc(x, y) || isRay(x, y);
      if (!inMark) continue;

      const cut = isV(x, y);
      const core = isSea(x, y);
      out.push({ x, y, core, cut });
    }
  }
  return out;
}

/** Cells of the mark on an n x n grid (n odd, 13 or more). */
export function sunCells(n: number = MARK_N): Cell[] {
  return layout(n)
    .filter((p) => !p.cut)
    .map(({ x, y, core }) => ({ x, y, core }));
}

/** The cells the V removes. Used to draw the V on its own on /brand. */
export function cutCells(n: number = MARK_N): Cell[] {
  return layout(n)
    .filter((p) => p.cut)
    .map(({ x, y }) => ({ x, y, core: false }));
}

/** One path for a set of cells, so adjacent squares render without seams. */
export function cellsPath(cells: Cell[], inset = 0): string {
  const s = 1 - inset * 2;
  return cells.map((p) => `M${p.x + inset} ${p.y + inset}h${s}v${s}h${-s}z`).join("");
}
