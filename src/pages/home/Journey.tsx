import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { journey } from "@/data/portfolio";
import { ArchipelagoMap, VIEW_H, VIEW_W, project } from "@/components/ArchipelagoMap";
import { Reveal } from "@/components/Reveal";
import { wrap } from "@/lib/wrap";

// The map tells one story: where the path went. Places are set by hand because
// journey.json is synced from data/ and has no coordinates.
const STOPS = [
  { id: "sma", city: "Pekanbaru", lon: 101.45, lat: 0.51, note: "first code" },
  { id: "uni", city: "Jakarta", lon: 106.78, lat: -6.23, note: "computer science" },
  { id: "astra", city: "Jakarta", lon: 106.9, lat: -6.17, note: "production planning" },
  { id: "research", city: "Jakarta", lon: 106.78, lat: -6.23, note: "satellite imagery" },
  { id: "pupuk", city: "Jakarta, and wherever the work goes", lon: 106.82, lat: -6.2, note: "AI, maps, logistics" },
] as const;

const TRIPS = [{ city: "Batam", lon: 104.03, lat: 1.1, note: "procurement workshop, 2026" }];

const nodes = STOPS.map((s) => ({ ...s, node: journey.find((j) => j.id === s.id) })).filter((s) => s.node);
const groups = [
  { city: "Pekanbaru", nodes: nodes.filter((n) => n.city === "Pekanbaru") },
  { city: "Jakarta", nodes: nodes.filter((n) => n.city.startsWith("Jakarta")) },
];
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
            03 / Path
          </h2>
          <p className="mt-6 max-w-[22ch] text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-semibold tracking-tight">
            From a school lab in Riau to systems that run across the country.
          </p>
          <p className="mt-4 max-w-[42ch] text-sm text-mute">
            Three places, one direction. The pins are the stops; Batam is the one side trip.
          </p>

          <div className="relative mt-10 pl-6">
            <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-line" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: draw }}
              className="absolute top-0 left-0 h-full w-px origin-top bg-sea"
            />
            <ol className="space-y-8">
              {groups.map((group) => (
                <li key={group.city} className="relative">
                  <span className="absolute top-1.5 -left-[29px] size-[9px] rounded-full border-2 border-paper bg-sea" />
                  <p className="font-mono text-[10px] tracking-[0.12em] text-sea">{group.city.toUpperCase()}</p>
                  <ul className="mt-3 space-y-3">
                    {group.nodes.map(({ id, note, node }) => (
                      <li key={id} className="grid grid-cols-[44px_1fr] gap-3">
                        <span className="font-mono text-[11px] text-mute tabular-nums">{node!.year}</span>
                        <span>
                          <span className="block font-medium">{node!.details.company ?? node!.label}</span>
                          <span className="block text-sm text-mute">{note}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="relative">
                <span className="absolute top-1.5 -left-[29px] size-[9px] rounded-full border-2 border-paper bg-paper ring-1 ring-sea" />
                <p className="font-mono text-[10px] tracking-[0.12em] text-mute">BATAM / SIDE TRIP</p>
                <ul className="mt-3 space-y-3">
                  <li className="grid grid-cols-[44px_1fr] gap-3">
                    <span className="font-mono text-[11px] text-mute tabular-nums">2026</span>
                    <span>
                      <span className="block font-medium">Procurement workshop</span>
                      <span className="block text-sm text-mute">{TRIPS[0].note}</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </Reveal>

        <div className="self-start lg:col-span-8 lg:self-center">
          <div className="border border-line bg-sunk/40 p-4">
            <div className="relative">
              <ArchipelagoMap className="h-auto w-full touch-pan-y">
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
              <MapLabel at={pk} dx={-6} dy={-26} title="Pekanbaru" sub="2018, where it started" delay={0.1} />
              <MapLabel at={jk} dx={-6} dy={22} title="Jakarta" sub="2021 to now" delay={0.3} />
              <MapLabel at={trip} dx={12} dy={-36} title={TRIPS[0].city} sub={TRIPS[0].note} quiet delay={0.5} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3 font-mono text-[10px] tracking-[0.08em] text-mute">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-sea" /> STOP
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6 border-t border-dashed border-sea" /> SIDE TRIP
              </span>
              <span className="ml-auto">2018 TO NOW</span>
            </div>
          </div>
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
  delay = 0,
}: {
  at: [number, number];
  dx: number;
  dy: number;
  title: string;
  sub: string;
  /** Side trip: quieter, and hidden on phones where there is no room. */
  quiet?: boolean;
  delay?: number;
}) {
  const [px, py] = [(x / VIEW_W) * 100, (y / VIEW_H) * 100];
  const [lx, ly] = [px + dx, py + dy];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${quiet ? "hidden md:block" : ""}`}>
      <svg className="absolute inset-0 size-full overflow-visible">
        <line x1={`${px}%`} y1={`${py}%`} x2={`${lx}%`} y2={`${ly}%`} stroke="var(--sea)" strokeWidth={1} opacity={0.6} />
      </svg>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="absolute border border-line bg-paper px-2 py-1 text-xs whitespace-nowrap md:text-sm"
        style={{ left: `${lx}%`, top: `${ly}%`, transform: `translate(${dx < 0 ? "-60%" : "-20%"}, ${dy < 0 ? "-100%" : "0"})` }}
      >
        <span className={quiet ? "block text-mute" : "block font-semibold"}>{title}</span>
        <span className="hidden font-mono text-xs text-mute md:block">{sub}</span>
      </motion.span>
    </div>
  );
}
