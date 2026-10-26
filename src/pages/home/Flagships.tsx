import { useRef } from "react";
import { AutoVideo } from "@/components/AutoVideo";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { flagships, shortTitle, type Project } from "@/data/portfolio";
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
  const title = shortTitle(project);
  const facts = (project.beforeAfter ?? []).filter((f) => f.after !== "Not measured").slice(0, 3);

  return (
    <article
      ref={ref}
      id={index === 0 ? "work" : undefined}
      data-theme="dark"
      className="scroll-mt-16 bg-paper py-20 text-ink md:py-24"
    >
      <div className={wrap}>
        {index === 0 && <p className="label mb-6">01 Three platforms at Pupuk Indonesia</p>}
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
              <motion.div style={{ scale }}>
                <AutoVideo
                  src={project.video}
                  poster={PLATE[project.slug] ?? project.image}
                  aria-label={`${title}, product video`}
                  className="aspect-[16/10] w-full object-cover object-left-top"
                />
              </motion.div>
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

export function Flagships() {
  return (
    <section aria-label="Three platforms at Pupuk Indonesia">
      {flagships.map((p, i) => (
        <Panel key={p.slug} project={p} index={i} />
      ))}
    </section>
  );
}
