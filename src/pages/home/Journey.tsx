import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journey } from "@/data/portfolio";
import { ArchipelagoMap, VIEW_H, VIEW_W, project } from "@/components/ArchipelagoMap";
import { Reveal } from "@/components/Reveal";
import { wrap } from "@/lib/wrap";

// The map tells one story: where the path went. Places are set by hand because
// journey.json is synced from data/ and has no coordinates.
// ponytail: city-level points; add lon/lat to data/journey.json if stops multiply.
const STOPS = [
  { id: "sma", city: "Pekanbaru", lon: 101.45, lat: 0.51, note: "first code" },
  { id: "uni", city: "Jakarta", lon: 106.78, lat: -6.23, note: "computer science" },
  { id: "astra", city: "Jakarta", lon: 106.9, lat: -6.17, note: "production planning" },
  { id: "research", city: "Jakarta", lon: 106.78, lat: -6.23, note: "satellite imagery" },
  { id: "pupuk", city: "Jakarta, and wherever the work goes", lon: 106.82, lat: -6.2, note: "AI, maps, logistics" },
] as const;

// Places the work took me beyond the desk, drawn as dashed side trips.
const TRIPS = [{ city: "Batam", lon: 104.03, lat: 1.1, note: "procurement workshop, 2026" }];

const nodes = STOPS.map((s) => ({ ...s, node: journey.find((j) => j.id === s.id) })).filter((s) => s.node);
const pts = nodes.map((s) => project(s.lon, s.lat));
// One gentle arc from Riau down to Java.
const [a, b] = [pts[0], pts.at(-1)!];
const ROUTE = `M${a[0]} ${a[1]} Q${a[0] + 120} ${(a[1] + b[1]) / 2 - 40} ${b[0]} ${b[1]}`;

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.5"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [pk, jk] = [project(101.45, 0.51), project(106.82, -6.2)];
  const trip = project(TRIPS[0].lon, TRIPS[0].lat);

  return (
    <section ref={ref} aria-labelledby="journey-title" className="grain mt-24 overflow-hidden py-20 md:mt-32 md:py-28">
      <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:gap-6`}>
        <Reveal className="lg:col-span-4">
          <h2 id="journey-title" className="label">
            03 Path
          </h2>
          <p className="mt-6 max-w-[22ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-semibold tracking-tight">
            From a school lab in Riau to systems that run across the country.
          </p>
          <ol className="mt-10 border-t border-line">
            {nodes.map(({ id, note, node }) => (
              <li key={id} className="flex items-baseline gap-4 border-b border-line py-3">
                <span className="w-12 shrink-0 font-mono text-xs text-mute tabular-nums">{node!.year}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{node!.details.company ?? node!.label}</span>
                  <span className="block text-sm text-mute">{note}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* self-start: the grid would stretch this box to the list's height and skew the % label positions. */}
        <div className="relative self-start lg:col-span-8 lg:self-center">
          <ArchipelagoMap className="h-auto w-full touch-pan-y opacity-70">
            <g aria-hidden="true" fill="none" strokeLinecap="round">
              <motion.path d={ROUTE} stroke="var(--sea)" strokeWidth={4} style={{ pathLength: draw }} />
              <path
                d={`M${jk[0]} ${jk[1]} Q${(jk[0] + trip[0]) / 2 + 30} ${(jk[1] + trip[1]) / 2} ${trip[0]} ${trip[1]}`}
                stroke="var(--sea)"
                strokeWidth={2.5}
                strokeDasharray="2 10"
                opacity={0.8}
              />
              {[pk, jk].map(([x, y], i) => (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <circle r={22} fill="var(--sea)" opacity={0.18} className="animate-ping [animation-duration:2.4s]" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <circle r={9} fill="var(--sea)" stroke="var(--paper)" strokeWidth={3} />
                </g>
              ))}
              <circle cx={trip[0]} cy={trip[1]} r={6} fill="var(--paper)" stroke="var(--sea)" strokeWidth={3} />
            </g>
          </ArchipelagoMap>
          {/* Labels in HTML, placed in % of the map so they stay crisp and readable at any width. */}
          {/* Labels sit out in the sea (dx, dy in % of the map) with a leader line to their dot. */}
          <MapLabel at={pk} dx={-2} dy={-24} title="Pekanbaru" sub="2018, where it started" />
          <MapLabel at={jk} dx={-6} dy={22} title="Jakarta" sub="2021 to now" />
          <MapLabel at={trip} dx={8} dy={-30} title={TRIPS[0].city} sub={TRIPS[0].note} quiet />
        </div>
      </div>
    </section>
  );
}

function MapLabel({
  at: [x, y],
  dx,
  dy,
  title,
  sub,
  quiet,
}: {
  at: [number, number];
  dx: number;
  dy: number;
  title: string;
  sub: string;
  /** Side trip: quieter, and hidden on phones where there is no room. */
  quiet?: boolean;
}) {
  const [px, py] = [(x / VIEW_W) * 100, (y / VIEW_H) * 100];
  const [lx, ly] = [px + dx, py + dy];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${quiet ? "hidden md:block" : ""}`}>
      <svg className="absolute inset-0 size-full overflow-visible">
        <line x1={`${px}%`} y1={`${py}%`} x2={`${lx}%`} y2={`${ly}%`} stroke="var(--sea)" strokeWidth={1} opacity={0.6} />
      </svg>
      <span
        className="absolute border border-line bg-paper px-2 py-1 text-xs whitespace-nowrap md:text-sm"
        style={{ left: `${lx}%`, top: `${ly}%`, transform: `translate(${dx < 0 ? "-60%" : "-20%"}, ${dy < 0 ? "-100%" : "0"})` }}
      >
        <span className={quiet ? "block text-mute" : "block font-semibold"}>{title}</span>
        <span className="hidden font-mono text-xs text-mute md:block">{sub}</span>
      </span>
    </div>
  );
}
