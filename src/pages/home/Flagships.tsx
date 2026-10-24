import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { archipelago, flagships, shortTitle, type Project } from "@/data/portfolio";
import { ArchipelagoMap, type Province } from "@/components/ArchipelagoMap";
import { fieldClass } from "@/components/button";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { wrap } from "@/lib/wrap";

// The screen that shows the work itself: the agent graph, the demand map, the
// route on the map. Text never sits on top of it, because the interfaces are
// full of their own text and the two fought each other.
const PLATE: Record<string, string> = {
  pinter: "/assets/pinter/galleries/pinter-agent-builder-canvas.png",
  "aegis-atlas": "/assets/aegis-atlas/galleries/aegis-atlas-fertilizer-demand-map.png",
  nexus: "/assets/nexus/galleries/nexus-vista-home.png",
};

/** One plate per platform: the title on top, the story on the left, its real interface on the right. */
function Panel({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const video = useRef<HTMLVideoElement>(null);
  const title = shortTitle(project);

  // Play only while on screen, and never for readers who asked for less motion.
  useEffect(() => {
    const v = video.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const facts = (project.beforeAfter ?? []).filter((f) => f.after !== "Not measured").slice(0, 3);

  return (
    <article
      ref={ref}
      id={index === 0 ? "work" : undefined}
      data-theme="dark"
      className="scroll-mt-16 bg-paper py-20 text-ink md:py-24"
    >
      <div className={wrap}>
        <header className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <h2 className="display text-[clamp(2.25rem,4.2vw,3.75rem)]">{title}</h2>
          <span className="tabular-nums text-mute">{project.date}</span>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed">{project.description}</p>
            {facts.length > 0 && (
              <dl className="mt-8 space-y-5">
                {facts.map((f) => (
                  <div key={f.measure}>
                    <dt className="text-mute">{f.measure}</dt>
                    <dd className="mt-0.5 font-medium">{f.after}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Link to={`/projects/${project.slug}`} className="group mt-8 inline-flex text-lg font-medium text-sea">
              <Roll>Read the case study</Roll>
            </Link>
          </Reveal>
          <div className="overflow-hidden lg:col-span-8">
            {project.video ? (
              <motion.video
                ref={video}
                src={project.video}
                preload="none"
                loop
                muted
                playsInline
                poster={PLATE[project.slug] ?? project.image}
                style={{ scale }}
                className="aspect-[16/10] w-full object-cover object-left-top"
              />
            ) : (
              <motion.img
                src={PLATE[project.slug] ?? project.image}
                alt={`${title}, a working screen`}
                loading="lazy"
                decoding="async"
                style={{ scale }}
                className="aspect-[16/10] w-full object-cover object-left-top"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// The live map from Atlas, closing the work on the home page.
/** The live thing: the map of Indonesia, binned into hex cells. */
export function MapScreen() {
  const [province, setProvince] = useState<Province | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const shown = province ?? (picked === null ? null : archipelago.provinces[picked]);
  return (
    <div className="mt-24 bg-sunk py-20 md:mt-32 md:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6`}>
        <Reveal delay={0.12} className="lg:col-span-4">
          <h2 className="text-[clamp(1.375rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
            Explore Indonesia
          </h2>
          <p aria-live="polite" className="mt-4 min-h-[4lh] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-snug">
            {shown ? (
              <span className="font-semibold text-sea">{shown.name}</span>
            ) : (
              <>
                An interactive hex map across all {archipelago.provinces.length} provinces. Hover or tap on any province
                to inspect.
              </>
            )}
          </p>
          <label className="mt-6 block">
            <span className="label">Or pick one</span>
            <select
              value={picked ?? ""}
              onChange={(e) => setPicked(e.target.value === "" ? null : Number(e.target.value))}
              className={`${fieldClass} mt-2`}
            >
              <option value="">All provinces</option>
              {archipelago.provinces.map((p, i) => (
                <option key={p.code} value={i}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <ArchipelagoMap onProvince={setProvince} selected={picked} className="h-auto w-full touch-pan-y" />
        </Reveal>
      </div>
    </div>
  );
}

export function Flagships() {
  return (
    <section aria-label="Three platforms at Pupuk Indonesia">
      {flagships.map((p, i) => (
        <Panel key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}
