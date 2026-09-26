import clsx from "clsx";

// Seven hexes: a turtle shell (kura) that is also a hex-binned map cell
// cluster. The centre cell carries the accent, like the one active region.
const R = 5.6;
const D = Math.sqrt(3) * R;
const S = R * 0.86;

function hex(cx: number, cy: number) {
  const pts = [0, 1, 2, 3, 4, 5].map((k) => {
    const a = ((-90 + 60 * k) * Math.PI) / 180;
    return `${(cx + S * Math.cos(a)).toFixed(2)} ${(cy + S * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
}

const RING = [0, 60, 120, 180, 240, 300].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return hex(16 + D * Math.cos(a), 16 + D * Math.sin(a));
});
const CORE = hex(16, 16);

export function ShellMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx("shrink-0", className)}>
      <g className="origin-center transition-transform duration-700 ease-out-quint group-hover:rotate-60">
        {RING.map((d) => (
          <path key={d} d={d} className="fill-ink" />
        ))}
      </g>
      <path d={CORE} className="fill-sea" />
    </svg>
  );
}
