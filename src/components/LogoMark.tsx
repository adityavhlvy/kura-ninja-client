import clsx from "clsx";
import type { CSSProperties } from "react";
import { cellsPath, MARK_N, sunCells, type Cell } from "@/lib/sunPixel";

// The sun as a satellite records it. Geometry and meaning: src/lib/sunPixel.ts
// and the /brand page. Keyframes: styles.css (.sun-*).

const CACHE = new Map<number, Cell[]>();
const cellsFor = (n: number) => {
  if (!CACHE.has(n)) CACHE.set(n, sunCells(n));
  return CACHE.get(n)!;
};

const vars = (c: Cell, n: number) => {
  const mid = (n - 1) / 2;
  return {
    "--row": c.y / n,
    "--dist": Math.hypot(c.x - mid, c.y - mid) / mid,
  } as CSSProperties;
};

/**
 * Animated mark. Scans in row by row once on mount, like a push-broom
 * sensor. Inside a `.group`, hover or keyboard focus sends a ripple out from
 * the sea core so the pixels show themselves.
 */
export function LogoMark({
  className,
  n = MARK_N,
  arrive = true,
  rippling = false,
}: {
  className?: string;
  n?: number;
  /** Play the scan-in on mount. */
  arrive?: boolean;
  /** Force the ripple from outside, for demos. */
  rippling?: boolean;
}) {
  const cells = cellsFor(n);
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      aria-hidden="true"
      className={clsx("sun-mark shrink-0 overflow-visible", rippling && "is-rippling", className)}
    >
      {/* Separate squares leave hairline seams at small sizes. This seamless
          copy sits underneath at rest and steps aside while cells move. */}
      <g className={clsx("sun-base", arrive && "sun-base-in")}>
        <path d={cellsPath(cells.filter((c) => !c.core))} className="fill-ink" />
        <path d={cellsPath(cells.filter((c) => c.core))} className="fill-sea" />
      </g>
      {cells.map((c) => (
        <g key={`${c.x}-${c.y}`} className={clsx(arrive && "sun-in")} style={vars(c, n)}>
          <rect
            x={c.x}
            y={c.y}
            width={1.02}
            height={1.02}
            className={clsx("sun-cell", c.core ? "fill-sea" : "fill-ink")}
          />
        </g>
      ))}
      {arrive && (
        <rect
          x={-0.5}
          y={0}
          width={n + 1}
          height={0.18}
          className="sun-sweep fill-sea"
          style={{ "--span": `${n}px` } as CSSProperties}
        />
      )}
    </svg>
  );
}

/** Looping scan for real loading states. Holds still under reduced motion. */
export function SunLoader({ className, label = "Loading" }: { className?: string; label?: string }) {
  const n = MARK_N;
  const cells = cellsFor(n);
  return (
    <span role="status" className={clsx("inline-flex flex-col items-center gap-3", className)}>
      <svg viewBox={`-0.5 -0.5 ${n + 1} ${n + 1}`} aria-hidden="true" className="size-full">
        {cells.map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x}
            y={c.y}
            width={1.02}
            height={1.02}
            className={clsx("sun-load", c.core ? "fill-sea" : "fill-ink")}
            style={vars(c, n)}
          />
        ))}
        <rect
          x={-0.5}
          y={-0.1}
          width={n + 1}
          height={0.2}
          className="sun-load-sweep fill-sea"
          style={{ "--span": `${n}px` } as CSSProperties}
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Still mark as one path per colour. For kit previews, diagrams, and misuse samples. */
export function StaticMark({
  className,
  n = MARK_N,
  inset = 0,
  sun = "fill-ink",
  core = "fill-sea",
  style,
  rounded = false,
}: {
  className?: string;
  n?: number;
  inset?: number;
  sun?: string;
  core?: string;
  style?: CSSProperties;
  rounded?: boolean;
}) {
  const cells = cellsFor(n);
  const s = 1 - inset * 2;
  // The rounded version exists only to show misuse on /brand.
  if (rounded) {
    return (
      <svg viewBox={`0 0 ${n} ${n}`} aria-hidden="true" className={className} style={style}>
        {cells.map((c) => (
          <rect key={`${c.x}-${c.y}`} x={c.x + 0.08} y={c.y + 0.08} width={0.84} height={0.84} rx={0.42} className={c.core ? core : sun} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${n} ${n}`} aria-hidden="true" shapeRendering={s === 1 ? "crispEdges" : undefined} className={className} style={style}>
      <path d={cellsPath(cells.filter((c) => !c.core), inset)} className={sun} />
      <path d={cellsPath(cells.filter((c) => c.core), inset)} className={core} />
    </svg>
  );
}
