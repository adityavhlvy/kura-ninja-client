import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { flagships, shortTitle, type Project } from "@/data/portfolio";
import { Reveal, RiseWords, ease } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { ProjectLogo } from "@/components/ProjectLogo";

function Facts({ project }: { project: Project }) {
  const facts = (project.beforeAfter ?? []).slice(0, 3);
  if (!facts.length) return null;
  return (
    <dl className="mt-8 divide-y divide-line border-y border-line">
      {facts.map((f) => (
        <div key={f.measure} className="py-3.5">
          <dt className="text-xs text-mute">{f.measure}</dt>
          <dd className="mt-1 text-[15px] leading-snug font-medium">{f.after}</dd>
          <dd className="mt-0.5 text-xs text-mute">Before: {f.before}</dd>
        </div>
      ))}
    </dl>
  );
}

function Chapter({ project, onEnter }: { project: Project; onEnter: () => void }) {
  return (
    <motion.article
      onViewportEnter={onEnter}
      viewport={{ amount: 0.5 }}
      className="flex flex-col justify-center py-16 lg:min-h-[88vh] lg:py-0"
    >
      {/* Below lg there is no sticky frame, so the screenshot sits inline. */}
      <img
        src={project.image}
        alt={`${project.title}, main screen`}
        loading="lazy"
        decoding="async"
        className="mb-8 aspect-[16/10] w-full border border-line object-cover object-top lg:hidden"
      />
      <Reveal>
        <div className="flex items-center gap-4">
          <ProjectLogo project={project} className="size-12" />
          <span className="label">
            {project.date}, {project.visibility === "private" ? "internal" : "public"}
          </span>
        </div>
        <h3 className="display mt-6 text-[clamp(2.25rem,4.2vw,3.75rem)]">{shortTitle(project)}</h3>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-mute">{project.description}</p>
        <Facts project={project} />
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link to={`/projects/${project.slug}`} className="group inline-flex items-center gap-2 font-medium text-sea">
            <Roll>Read the case study</Roll>
          </Link>
          <span className="text-sm text-mute">{project.techStack.slice(0, 4).join(", ")}</span>
        </div>
      </Reveal>
    </motion.article>
  );
}

export function Flagships() {
  const [active, setActive] = useState(0);
  const [shot, setShot] = useState(0);
  const project = flagships[active];
  const images = project.images ?? [project.image!];

  const enter = (i: number) => () => {
    setActive(i);
    setShot(0);
  };

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10 md:pt-40">
      <div className="max-w-5xl">
        <RiseWords
          text="Three platforms I am building at Pupuk Indonesia."
          className="display text-[clamp(2.5rem,5.6vw,5rem)]"
        />
        <Reveal delay={0.2}>
          <p className="prose-body mt-6 text-lg">
            Fertilizer demand, AI agents, and national logistics. The figures below are the ones the repositories can
            back up. Anything not yet measured says so on the case study.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-x-16 lg:mt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          {flagships.map((p, i) => (
            <Chapter key={p.slug} project={p} onEnter={enter(i)} />
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center gap-4 py-20">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-sunk">
              <AnimatePresence initial={false}>
                <motion.img
                  key={images[shot]}
                  src={images[shot]}
                  alt={`${project.title} screenshot ${shot + 1}`}
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.06, zIndex: 1 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1, zIndex: 1 }}
                  exit={{ opacity: 0.999, zIndex: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0 size-full object-cover object-top"
                />
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div className="flex gap-2" role="group" aria-label={`${shortTitle(project)} screens`}>
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`Show screen ${i + 1}`}
                    aria-pressed={shot === i}
                    className={clsx(
                      "h-12 w-20 overflow-hidden border transition-[border-color,opacity] duration-200",
                      shot === i ? "border-sea" : "border-line opacity-60 hover:opacity-100",
                    )}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" />
                  </button>
                ))}
              </div>
              <ol className="flex gap-3" aria-label="Platforms">
                {flagships.map((p, i) => (
                  <li
                    key={p.slug}
                    className={clsx(
                      "text-sm transition-colors duration-300",
                      i === active ? "text-ink" : "text-mute/60",
                    )}
                  >
                    {p.title.split(" ")[0]}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
