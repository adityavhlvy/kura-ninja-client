import clsx from "clsx";
import { useId, type CSSProperties } from "react";
import { MARK, SMALL } from "@/lib/avnMark";

// The AVN mark. Geometry and meaning: src/lib/avnMark.ts and the /brand page.
// Keyframes: styles.css (.avn-*). Colour comes from `color`, so set text-*.

const viewBox = (m: typeof MARK) => `${m.box.x} ${m.box.y} ${m.box.w} ${m.box.h}`;
/** Wide enough to cover the miter tips, which sit t / (2 sin α) off the centreline. */
const TRACE_W = MARK.t * 4;

/**
 * Animated main mark. Writes itself once on mount: the zigzag along its
 * spine, then the wave. Inside a `.group`, hover or keyboard focus redraws
 * the wave. Use it at 48 px wide or more. Below that, use StaticMark small.
 */
export function LogoMark({
  className,
  arrive = true,
  replay = false,
}: {
  className?: string;
  /** Play the writing on mount. */
  arrive?: boolean;
  /** Force the wave redraw from outside, for demos. */
  replay?: boolean;
}) {
  const id = useId();
  return (
    <svg
      viewBox={viewBox(MARK)}
      aria-hidden="true"
      className={clsx("avn-mark shrink-0 overflow-visible", arrive && "is-arriving", replay && "is-replaying", className)}
    >
      <mask id={id} maskUnits="userSpaceOnUse">
        <path d={MARK.trace} pathLength={1} className="avn-trace" fill="none" stroke="#fff" strokeWidth={TRACE_W} />
      </mask>
      <path d={MARK.zig} mask={`url(#${id})`} className="fill-current" />
      <path d={MARK.wave} pathLength={1} className="avn-wave stroke-current" fill="none" strokeWidth={MARK.t} />
    </svg>
  );
}

/** Looping loader: a pen runs the line over a faint copy. Holds still under reduced motion. */
export function MarkLoader({ className, label = "Loading" }: { className?: string; label?: string }) {
  const id = useId();
  return (
    <span role="status" className={clsx("inline-flex flex-col items-center gap-3", className)}>
      <svg viewBox={viewBox(MARK)} aria-hidden="true" className="w-full overflow-visible">
        <mask id={id} maskUnits="userSpaceOnUse">
          <path d={MARK.trace} pathLength={1} className="avn-load" fill="none" stroke="#fff" strokeWidth={TRACE_W} />
        </mask>
        <g className="opacity-15">
          <StaticPaths />
        </g>
        <g mask={`url(#${id})`}>
          <StaticPaths />
        </g>
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

function StaticPaths({ small = false }: { small?: boolean }) {
  if (small) return <path d={SMALL.zig} className="fill-current" />;
  return (
    <>
      <path d={MARK.zig} className="fill-current" />
      <path d={MARK.wave} className="stroke-current" fill="none" strokeWidth={MARK.t} />
    </>
  );
}

/** Still mark. `small` is ΛV alone, for anything under 48 px wide. */
export function StaticMark({ className, small = false, style }: { className?: string; small?: boolean; style?: CSSProperties }) {
  return (
    <svg viewBox={viewBox(small ? SMALL : MARK)} aria-hidden="true" className={clsx("overflow-visible", className)} style={style}>
      <StaticPaths small={small} />
    </svg>
  );
}
