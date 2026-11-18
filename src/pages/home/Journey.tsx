import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArchipelagoMap, VIEW_H, VIEW_W, project } from "@/components/ArchipelagoMap";
import { Reveal } from "@/components/Reveal";
import { wrap } from "@/lib/wrap";

// The map tells one story: where the work went. Places are set by hand because
// journey.json has no coordinates.
const [pk, jk] = [project(101.45, 0.51), project(106.82, -6.2)];
const trip = project(104.03, 1.1);
const ROUTE = `M${pk[0]} ${pk[1]} Q${pk[0] + 120} ${(pk[1] + jk[1]) / 2 - 40} ${jk[0]} ${jk[1]}`;

const CHAPTERS = [
  {
    place: "Riau",
    years: "2018",
    title: "First code in a school lab.",
    body: "One server, one all-nighter at a time.",
  },
  {
    place: "Jakarta",
    years: "2021–2024",
    title: "Computer science, then production planning.",
    body: "At Astra Otoparts I learned how a factory really decides before I learned how to model it.",
  },
  {
    place: "Jakarta",
    years: "2025–now",
    title: "Satellite imagery, then AI and maps.",
    body: "At Pupuk Indonesia I build the systems I used to study.",
  },
];

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.12, 0.8], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(value < 0.42 ? 0 : value < 0.72 ? 1 : 2);
  });

  return (
    <section
      ref={ref}
      aria-labelledby="journey-title"
      className="grain flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 items-center overflow-hidden py-8"
    >
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-12 lg:gap-6`}>
        <Reveal className="lg:col-span-4">
          <h2 id="journey-title" className="label">
            03 / Path
          </h2>
          <p className="mt-5 max-w-[16ch] text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.05] font-semibold tracking-tight">
            Closer to the work.
          </p>
          <p className="mt-4 max-w-[42ch] text-sm text-mute">
            A school lab in Riau, then Jakarta. Every move put me nearer to the people doing the work, and to the systems
            that decide how it runs.
          </p>

          <div className="relative mt-8 pl-6">
            <span aria-hidden="true" className="absolute top-0 left-0 h-full w-px bg-line" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: draw }}
              className="absolute top-0 left-0 h-full w-px origin-top bg-sea"
            />
            <ol className="space-y-6">
              {CHAPTERS.map((chapter, index) => (
                <li key={chapter.title} className="relative">
                  <span
                    className={`absolute top-1.5 -left-[29px] size-[9px] rounded-full border-2 border-paper transition-colors duration-300 ${
                      active >= index ? "bg-sea" : "bg-paper ring-1 ring-line"
                    }`}
                  />
                  <p
                    className={`font-mono text-[10px] tracking-[0.12em] transition-colors duration-300 ${
                      active >= index ? "text-sea" : "text-mute"
                    }`}
                  >
                    {chapter.place.toUpperCase()} / {chapter.years}
                  </p>
                  <p
                    className={`mt-2 text-[1.05rem] font-semibold leading-snug transition-opacity duration-300 ${
                      active === index ? "opacity-100" : "opacity-55"
                    }`}
                  >
                    {chapter.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{chapter.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-t border-line pt-4 font-mono text-[10px] tracking-[0.08em] text-mute">
              2026 / ONE WEEK IN BATAM, WATCHING PROCUREMENT RUN BY HAND
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="border border-line bg-sunk/40 p-3">
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
                      <circle
                        r={22}
                        fill="var(--sea)"
                        opacity={0.18}
                        className="animate-ping [animation-duration:2.4s]"
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                      <circle r={9} fill="var(--sea)" stroke="var(--paper)" strokeWidth={3} />
                    </g>
                  ))}
                  <circle cx={trip[0]} cy={trip[1]} r={6} fill="var(--paper)" stroke="var(--sea)" strokeWidth={3} />
                </g>
              </ArchipelagoMap>
              <MapLabel at={pk} dx={-6} dy={-26} title="Pekanbaru" sub="2018, where it started" active={active === 0} delay={0.1} />
              <MapLabel at={jk} dx={-6} dy={22} title="Jakarta" sub="2021 to now" active={active >= 1} delay={0.3} />
              <MapLabel at={trip} dx={12} dy={-36} title="Batam" sub="procurement workshop, 2026" quiet delay={0.5} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3 font-mono text-[10px] tracking-[0.08em] text-mute">
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
  active,
  delay = 0,
}: {
  at: [number, number];
  dx: number;
  dy: number;
  title: string;
  sub: string;
  quiet?: boolean;
  active?: boolean;
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
        className={`absolute border bg-paper px-2 py-1 text-xs whitespace-nowrap transition-colors duration-300 md:text-sm ${
          active ? "border-sea" : "border-line"
        }`}
        style={{ left: `${lx}%`, top: `${ly}%`, transform: `translate(${dx < 0 ? "-60%" : "-20%"}, ${dy < 0 ? "-100%" : "0"})` }}
      >
        <span className={quiet ? "block text-mute" : "block font-semibold"}>{title}</span>
        <span className="hidden font-mono text-xs text-mute md:block">{sub}</span>
      </motion.span>
    </div>
  );
}
