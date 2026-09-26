// Geometry of the mark: the sun (Aditya) as a satellite records it, a disc
// resolved into square pixels. A V (Vahlevy) is cut out of it and closes on
// one sea pixel at the centre (Nugraha). Shared by the React components and
// scripts/build-brand.ts, so every file of the kit draws the same cells.

export type Cell = { x: number; y: number; core: boolean };

/**
 * Cells per side for the official mark. Odd, so one pixel sits dead centre.
 * Thirteen is the smallest grid where each arm of the V has four steps and
 * reads as a letter. At nine the arms shrink to two steps and read as a face.
 */
export const MARK_N = 13;

/** Every cell inside the disc, with the V cells flagged as cut. */
function layout(n: number) {
  const c = (n - 1) / 2;
  // Radius reaches 0.6 past the centre of the edge cells, which keeps the
  // outline round without single stray pixels at the corners.
  const r2 = (c + 0.6) ** 2;
  const inDisc = (x: number, y: number) => (x - c) ** 2 + (y - c) ** 2 <= r2;
  const out: (Cell & { cut: boolean })[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inDisc(x, y)) continue;
      // The V climbs from the centre at 45 degrees, one cell wide, and stops
      // before the rim so the outline of the sun is never broken.
      const rise = c - y;
      const onRim = !inDisc(x - 1, y) || !inDisc(x + 1, y) || !inDisc(x, y - 1);
      const cut = rise >= 1 && Math.abs(x - c) === rise && !onRim;
      out.push({ x, y, core: x === c && y === c, cut });
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
