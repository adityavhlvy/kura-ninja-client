// Geometry of the AVN mark. A is Λ, V is V, and Λ joined to V makes N, so one
// zigzag of five strokes /\/\/ carries all three letters. A wave runs the same
// path with every turn rounded. Stacked, the sharp line and the wave split at
// each turn and leave small counters, so each peak reads as an A again.
// Every measure comes from the cap height H and the golden ratio.
// Shared by the React components, the /brand page, and scripts/build-brand.ts.

export type Pt = { x: number; y: number };

export const PHI = (1 + Math.sqrt(5)) / 2;

/** Cap height in drawing units. 21 is a Fibonacci number, so H/φ steps stay near whole units. */
const H = 21;

type Spec = { strokes: number; t: number; o: number; slope: number };

/**
 * Centreline of the zigzag. Pointed turns sit so their miter tip passes the
 * cap or base line by `o` (optical overshoot). Both terminals are cut flat
 * exactly on the lines, so they need no overshoot.
 */
function spine({ strokes, t, o, slope }: Spec): Pt[] {
  const miter = t / 2 / Math.sin(Math.atan(slope));
  const ys = [H];
  for (let i = 1; i < strokes; i++) ys.push(i % 2 ? miter - o : H + o - miter);
  ys.push(strokes % 2 ? 0 : H);
  const pts = [{ x: 0, y: H }];
  for (let i = 1; i < ys.length; i++) pts.push({ x: pts[i - 1].x + Math.abs(ys[i] - ys[i - 1]) * slope, y: ys[i] });
  return pts;
}

const sub = (a: Pt, b: Pt) => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: Pt, b: Pt) => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: Pt, k: number) => ({ x: a.x * k, y: a.y * k });
const unit = (a: Pt) => mul(a, 1 / Math.hypot(a.x, a.y));

/** Where the line through p along d crosses the line through q along e. */
function meet(p: Pt, d: Pt, q: Pt, e: Pt): Pt {
  const s = ((q.x - p.x) * e.y - (q.y - p.y) * e.x) / (d.x * e.y - d.y * e.x);
  return add(p, mul(d, s));
}

/** Filled outline of a stroked polyline: miter joins, both ends cut horizontal. */
function outline(pts: Pt[], t: number): Pt[] {
  const edge = (k: number) =>
    pts.map((p, i) => {
      const segs = [i - 1, i].filter((s) => s >= 0 && s < pts.length - 1);
      const [a, b] = segs.map((s) => {
        const d = sub(pts[s + 1], pts[s]);
        const n = unit({ x: -d.y, y: d.x });
        return { p: add(pts[s], mul(n, (k * t) / 2)), d };
      });
      return b ? meet(a.p, a.d, b.p, b.d) : meet(a.p, a.d, p, { x: 1, y: 0 });
    });
  return [...edge(1), ...edge(-1).reverse()];
}

/**
 * The wave: the same spine with every inner turn filleted at radius r. With
 * the largest radius, the arcs meet at each stroke's midpoint and the wave is
 * made only of arcs. Ends are trimmed by t so they hide inside the sharp stroke.
 */
function wavePath(pts: Pt[], r: number, trim: number): string {
  const dir = (i: number) => unit(sub(pts[i + 1], pts[i]));
  const start = add(pts[0], mul(dir(0), trim));
  let d = `M${n(start.x)} ${n(start.y)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const u1 = dir(i - 1);
    const u2 = dir(i);
    const reach = r / Math.tan(Math.acos(-(u1.x * u2.x + u1.y * u2.y)) / 2);
    const a = sub(pts[i], mul(u1, reach));
    const b = add(pts[i], mul(u2, reach));
    const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
    d += `L${n(a.x)} ${n(a.y)}A${n(r)} ${n(r)} 0 0 ${sweep} ${n(b.x)} ${n(b.y)}`;
  }
  const end = sub(pts[pts.length - 1], mul(dir(pts.length - 2), trim));
  return `${d}L${n(end.x)} ${n(end.y)}`;
}

const n = (v: number) => +v.toFixed(3);
const polyPath = (ps: Pt[]) => `M${ps.map((p) => `${n(p.x)} ${n(p.y)}`).join("L")}Z`;
const spanX = (ps: Pt[]) => [Math.min(...ps.map((p) => p.x)), Math.max(...ps.map((p) => p.x))];

/** The one slope that makes the outline exactly φ·H wide. Bisection, 50 steps is past float precision. */
function goldenSlope(strokes: number, t: number, o: number) {
  let lo = 0.1;
  let hi = 1.5;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const [x0, x1] = spanX(outline(spine({ strokes, t, o, slope: mid }), t));
    if (x1 - x0 > PHI * H) hi = mid;
    else lo = mid;
  }
  return lo;
}

function build(spec: Spec, withWave: boolean) {
  const pts = spine(spec);
  const shape = outline(pts, spec.t);
  const [x0, x1] = spanX(shape);
  const inner = Math.hypot(pts[2].x - pts[1].x, pts[2].y - pts[1].y);
  const r = (inner / 2) * spec.slope;
  const first = unit(sub(pts[0], pts[1]));
  const last = unit(sub(pts[pts.length - 1], pts[pts.length - 2]));
  const ends = [add(pts[0], mul(first, spec.t)), ...pts.slice(1, -1), add(pts[pts.length - 1], mul(last, spec.t))];
  return {
    ...spec,
    H,
    spine: pts,
    /** Centreline run past both terminals by t. A thick stroke along it reveals the zigzag in order. */
    trace: `M${ends.map((p) => `${n(p.x)} ${n(p.y)}`).join("L")}`,
    r,
    /** viewBox that hugs the drawing, overshoot included. */
    box: { x: n(x0), y: n(-spec.o), w: n(x1 - x0), h: n(H + 2 * spec.o) },
    zig: polyPath(shape),
    wave: withWave ? wavePath(pts, r, spec.t) : "",
    /** Stroke angle from the baseline, in degrees. The same for every stroke. */
    angle: 90 - (Math.atan(spec.slope) * 180) / Math.PI,
  };
}

const T = H / PHI ** 5;
const SLOPE = goldenSlope(5, T, T / 4);

/** Main mark, 48 px and up: ΛVN zigzag plus the wave. Box is φ:1. */
export const MARK = build({ strokes: 5, t: T, o: T / 4, slope: SLOPE }, true);

/** Small mark, under 48 px: ΛV alone, which is also N. Heavier stroke, same angle. */
export const SMALL = build({ strokes: 3, t: H / PHI ** 4, o: H / PHI ** 4 / 4, slope: SLOPE }, false);

/** Clear space on every side: H/φ², about 8 units. */
export const CLEAR = H / PHI ** 2;

/**
 * 16 px favicon, drawn on the pixel grid. Cap and base sit on whole rows, the
 * flat terminals are exactly 2 px wide, and the outer edges climb 5 px over
 * 14 rows, so every outer corner lands on a pixel corner. That moves the
 * angle by under one degree from the main mark.
 */
export const FAVICON = (() => {
  const slope = 5 / 14;
  const k = 14 / H;
  const t = (2 * Math.cos(Math.atan(slope))) / k;
  const shape = outline(spine({ strokes: 3, t, o: 0, slope }), t).map((p) => ({ x: p.x * k, y: p.y * k }));
  const [x0, x1] = spanX(shape);
  const dx = Math.round((16 - (x1 - x0)) / 2) - x0;
  return polyPath(shape.map((p) => ({ x: p.x + dx, y: p.y + 1 })));
})();
