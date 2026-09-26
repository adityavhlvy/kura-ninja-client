import { useMemo, useRef, useState, useId } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { archipelago } from "@/data/portfolio";

// Grid geometry mirrors scripts/build-archipelago.ts (pointy-top, odd rows
// shifted half a cell). K scales degrees to SVG units.
const K = 20;
const R = archipelago.radiusDeg * K;
const W = Math.sqrt(3) * R;
const H = 1.5 * R;
const VIEW_W = Math.ceil(archipelago.cols * W + W);
const VIEW_H = Math.ceil(archipelago.rows * H + R);

const centre = (q: number, r: number): [number, number] => [q * W + (r & 1 ? W / 2 : 0) + W / 2, r * H + R];

function hexPath(s: number) {
  return (
    "M" +
    [0, 1, 2, 3, 4, 5]
      .map((k) => {
        const a = ((-90 + 60 * k) * Math.PI) / 180;
        return `${(s * Math.cos(a)).toFixed(2)} ${(s * Math.sin(a)).toFixed(2)}`;
      })
      .join("L") +
    "Z"
  );
}
const HEX = hexPath(R * 0.84);

const TONES = ["var(--land-a)", "var(--land-b)", "var(--land-c)"];

type Cell = { key: string; x: number; y: number; p: number; delay: number };

const CELLS: Cell[] = archipelago.hexes.map(([q, r, p]) => {
  const [x, y] = centre(q, r);
  return { key: `${q}.${r}`, x, y, p, delay: q * 11 + (r % 4) * 25 };
});
const CELL_AT = new Map(CELLS.map((c) => [c.key, c]));

/** Nearest cell to an SVG-space point, checking the 3x3 neighbourhood. */
function cellAt(x: number, y: number): Cell | undefined {
  const r0 = Math.round((y - R) / H);
  let best: Cell | undefined;
  let bestD = Infinity;
  for (let r = r0 - 1; r <= r0 + 1; r++) {
    const q0 = Math.round((x - W / 2 - (r & 1 ? W / 2 : 0)) / W);
    for (let q = q0 - 1; q <= q0 + 1; q++) {
      const c = CELL_AT.get(`${q}.${r}`);
      if (!c) continue;
      const d = (c.x - x) ** 2 + (c.y - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
  }
  return bestD < (R * 1.2) ** 2 ? best : undefined;
}

export type Province = (typeof archipelago.provinces)[number] & { cells: number };

const CELL_COUNT = archipelago.provinces.map((_, i) => CELLS.filter((c) => c.p === i).length);

export function ArchipelagoMap({
  onProvince,
  className,
}: {
  onProvince?: (p: Province | null) => void;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const maskId = useId();
  const glowId = useId();

  // The sonar follows the pointer on a spring so it trails a little.
  const mx = useMotionValue(VIEW_W * 0.42);
  const my = useMotionValue(VIEW_H * 0.55);
  const sx = useSpring(mx, { stiffness: 180, damping: 26 });
  const sy = useSpring(my, { stiffness: 180, damping: 26 });
  const radius = useSpring(0, { stiffness: 120, damping: 20 });

  const activeCells = useMemo(() => (active === null ? [] : CELLS.filter((c) => c.p === active)), [active]);

  const pick = (p: number | null) => {
    if (p === active) return;
    setActive(p);
    onProvince?.(p === null ? null : { ...archipelago.provinces[p], cells: CELL_COUNT[p] });
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    mx.set(pt.x);
    my.set(pt.y);
    radius.set(150);
    const cell = cellAt(pt.x, pt.y);
    pick(cell ? cell.p : null);
  };

  const onLeave = () => {
    radius.set(0);
    pick(null);
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      role="img"
      aria-label={`Map of Indonesia drawn as ${CELLS.length} hexagonal cells across ${archipelago.provinces.length} provinces`}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={onLeave}
    >
      <defs>
        <path id={`${maskId}-hex`} d={HEX} />
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_W} height={VIEW_H}>
          <motion.circle cx={sx} cy={sy} r={radius} fill={`url(#${glowId})`} />
        </mask>
      </defs>

      <g>
        {/* Translate on the group, animate the path: a CSS transform on the
            path would otherwise replace its position. */}
        {CELLS.map((c) => (
          <g key={c.key} transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`}>
            <path
              d={HEX}
              className="hex-in"
              style={{ fill: TONES[c.p % 3], ["--d" as string]: `${c.delay}ms` }}
            />
          </g>
        ))}
      </g>

      {/* Sonar: the same cells in sea colour, revealed only near the pointer. */}
      <g mask={`url(#${maskId})`} aria-hidden="true">
        {CELLS.map((c) => (
          <use key={c.key} href={`#${maskId}-hex`} x={c.x} y={c.y} style={{ fill: "var(--sea)", opacity: 0.55 }} />
        ))}
      </g>

      <g aria-hidden="true">
        {activeCells.map((c, i) => (
          <motion.use
            key={c.key}
            href={`#${maskId}-hex`}
            x={c.x}
            y={c.y}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: Math.min(i * 0.004, 0.2) }}
            style={{ fill: "var(--sea)" }}
          />
        ))}
      </g>
    </svg>
  );
}
