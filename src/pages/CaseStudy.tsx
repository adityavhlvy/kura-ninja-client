import { useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import { PiArrowLeftBold, PiArrowUpRightBold } from "react-icons/pi";
import { getProject, projects, shortTitle, statusLabel, type Project } from "@/data/portfolio";
import { Reveal, RiseWords, ease } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { Roll } from "@/components/Roll";
import { ProjectLogo } from "@/components/ProjectLogo";
import { useTitle } from "@/lib/useTitle";
import NotFound from "./NotFound";

type SectionDef = { id: string; label: string; body: ReactNode };

/** Groups the single-paragraph case study into readable paragraphs of ~3 sentences. */
function paragraphs(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join("").trim());
  return out;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li key={t} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-mute">
          <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-1.5 size-2.5 fill-sea">
            <path d="M10 1.5l7.4 4.25v8.5L10 18.5l-7.4-4.25v-8.5z" />
          </svg>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function buildSections(p: Project): SectionDef[] {
  const s: SectionDef[] = [];
  if (p.caseStudy)
    s.push({
      id: "story",
      label: "The story",
      body: (
        <div className="prose-body space-y-5 text-[17px]">
          {paragraphs(p.caseStudy).map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      ),
    });
  if (p.fiveWOneH)
    s.push({
      id: "scope",
      label: "Scope",
      body: (
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {Object.entries(p.fiveWOneH).map(([k, v]) => (
            <div key={k} className="border-t border-line pt-3">
              <dt className="label capitalize">{k}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  if (p.problemChangeResult?.length)
    s.push({
      id: "problems",
      label: "Problems solved",
      body: (
        <ol className="space-y-10">
          {p.problemChangeResult.map((pcr) => (
            <li key={pcr.problem} className="grid gap-5 border-t border-line pt-5 md:grid-cols-3 md:gap-8">
              {(
                [
                  ["Problem", pcr.problem],
                  ["Change", pcr.change],
                  ["Result", pcr.result],
                ] as const
              ).map(([k, v]) => (
                <div key={k}>
                  <p className={clsx("label", k === "Result" && "text-sea")}>{k}</p>
                  <p className="mt-2 text-sm leading-relaxed">{v}</p>
                </div>
              ))}
            </li>
          ))}
        </ol>
      ),
    });
  if (p.beforeAfter?.length)
    s.push({
      id: "before-after",
      label: "Before and after",
      body: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="label py-3 pr-6 font-normal">Measure</th>
                <th scope="col" className="label py-3 pr-6 font-normal">Before</th>
                <th scope="col" className="label py-3 font-normal">After</th>
              </tr>
            </thead>
            <tbody>
              {p.beforeAfter.map((row) => (
                <tr key={row.measure} className="border-b border-line align-top">
                  <th scope="row" className="py-4 pr-6 font-medium">{row.measure}</th>
                  <td className="py-4 pr-6 text-mute">{row.before}</td>
                  <td className="py-4">
                    {row.after}
                    {row.evidence && <span className="mt-1 block font-mono text-[11px] break-all text-mute">{row.evidence}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    });
  const built = p.contributions?.length ? p.contributions : p.details;
  if (built?.length)
    s.push({ id: "built", label: p.contributions?.length ? "My part" : "What I built", body: <Bullets items={built} /> });
  if (p.contributions?.length && p.details?.length)
    s.push({ id: "platform", label: "Platform scope", body: <Bullets items={p.details} /> });
  if (p.keyDecisions?.length)
    s.push({
      id: "decisions",
      label: "Decisions",
      body: (
        <ol className="space-y-8">
          {p.keyDecisions.map((d, i) => (
            <li key={d.decision} className="grid grid-cols-[2.5rem_1fr] gap-2">
              <span className="font-mono text-sm text-sea">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-semibold">{d.decision}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{d.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    });
  if (p.technicalChallenges?.length)
    s.push({ id: "hard-parts", label: "Hard parts", body: <Bullets items={p.technicalChallenges} /> });
  if (p.notMeasured?.length || p.readiness)
    s.push({
      id: "honesty",
      label: "Not measured yet",
      body: (
        <div className="space-y-8">
          {p.notMeasured?.length ? (
            <ul className="space-y-2 text-sm text-mute">
              {p.notMeasured.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ) : null}
          {p.readiness && (
            <div>
              <p className="text-sm text-mute">My own readiness estimate, self-assessed and not audited:</p>
              <dl className="mt-4 flex flex-wrap gap-10">
                {Object.entries(p.readiness).map(([k, v]) => (
                  <div key={k}>
                    <dt className="label capitalize">{k}</dt>
                    <dd className="display mt-1 text-4xl">{v}<span className="text-lg text-mute">/100</span></dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      ),
    });
  if (p.evidenceCommits?.length)
    s.push({
      id: "commits",
      label: "Commits",
      body: (
        <>
          <p className="mb-4 text-sm text-mute">Commit hashes the claims on this page trace back to. The repositories are internal.</p>
          <ul className="flex flex-wrap gap-2">
            {p.evidenceCommits.map((c) => (
              <li key={c} className="border border-line px-2 py-1 font-mono text-xs">{c}</li>
            ))}
          </ul>
        </>
      ),
    });
  return s;
}

function Gallery({ project }: { project: Project }) {
  const images = project.images?.length ? project.images : project.image ? [project.image] : [];
  const [open, setOpen] = useState<number | null>(null);
  if (!images.length) return null;
  const [first, ...rest] = images;

  const shot = (src: string, i: number, className: string) => (
    <motion.button
      key={src}
      type="button"
      onClick={() => setOpen(i)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay: Math.min(i, 3) * 0.08 }}
      className={clsx("group block overflow-hidden border border-line bg-sunk", className)}
      aria-label={`Open screenshot ${i + 1} of ${images.length}`}
    >
      <img
        src={src}
        alt=""
        loading={i ? "lazy" : "eager"}
        decoding="async"
        className="size-full object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.02]"
      />
    </motion.button>
  );

  return (
    <section aria-label="Screens" className="mx-auto max-w-[1440px] px-5 md:px-10">
      {shot(first, 0, "aspect-[16/9] w-full")}
      {rest.length > 0 && (
        <div className={clsx("mt-4 grid gap-4", rest.length === 1 ? "grid-cols-1" : "grid-cols-2", rest.length >= 3 && "md:grid-cols-3")}>
          {rest.map((src, i) => shot(src, i + 1, "aspect-[16/10] w-full"))}
        </div>
      )}
      <Lightbox images={images} index={open} title={project.title} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [active, setActive] = useState<string | null>(null);
  useTitle(project?.title ?? "Not found");

  if (!project) return <NotFound />;

  const sections = buildSections(project);
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const isPublic = project.visibility === "public";

  return (
    <article>
      <header className="mx-auto max-w-[1440px] px-5 pt-28 pb-12 md:px-10 md:pt-36">
        <Link to="/projects" className="group inline-flex items-center gap-2 text-sm text-mute hover:text-ink">
          <PiArrowLeftBold aria-hidden="true" className="transition-transform group-hover:-translate-x-1" />
          <Roll>All work</Roll>
        </Link>
        <ProjectLogo project={project} className="mt-10 size-14" />
        <RiseWords as="h1" text={project.title} className="display mt-8 max-w-[20ch] text-[clamp(2.5rem,6.4vw,6rem)]" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Reveal delay={0.2}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-mute">{project.summary ?? project.description}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
              <div>
                <dt className="label">Year</dt>
                <dd className="mt-1">{project.date}</dd>
              </div>
              <div>
                <dt className="label">Status</dt>
                <dd className="mt-1">{statusLabel[project.status]}</dd>
              </div>
              <div className="col-span-2">
                <dt className="label">Stack</dt>
                <dd className="mt-1 leading-relaxed">{project.techStack.join(", ")}</dd>
              </div>
              <div className="col-span-2">
                <dt className="label">Source</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
                  {isPublic && project.links.length ? (
                    project.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                        {l.label} <PiArrowUpRightBold aria-hidden="true" />
                      </a>
                    ))
                  ) : (
                    <span className="text-mute">Internal. Source is not public.</span>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <Gallery project={project} />

      {sections.length > 0 && (
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-24 md:px-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-20">
          {/* Short pages get an empty rail instead of a one-item contents list. */}
          <nav aria-label="On this page" className={clsx("hidden", sections.length > 2 && "lg:block")}>
            <ul className="sticky top-24 space-y-1 border-l border-line">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={clsx(
                      "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                      active === s.id ? "border-sea text-ink" : "border-transparent text-mute hover:text-ink",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-24 lg:col-start-2">
            {sections.map((s) => (
              <motion.section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                onViewportEnter={() => setActive(s.id)}
                viewport={{ margin: "-40% 0px -55% 0px" }}
                className="scroll-mt-24"
              >
                <Reveal>
                  <h2 id={`${s.id}-h`} className="display mb-8 text-3xl md:text-4xl">{s.label}</h2>
                  {s.body}
                </Reveal>
              </motion.section>
            ))}
          </div>
        </div>
      )}

      <nav aria-label="Next project" className="mx-auto mt-32 max-w-[1440px] px-5 md:px-10">
        <Link to={`/projects/${next.slug}`} className="group grid items-end gap-8 border-t border-ink pt-8 md:grid-cols-[1fr_22rem]">
          <div>
            <p className="text-sm text-mute">Next project</p>
            <p className="display mt-3 text-[clamp(2.25rem,5vw,4.5rem)] transition-colors group-hover:text-sea">
              {shortTitle(next)}
            </p>
          </div>
          {next.image && (
            <div className="hidden overflow-hidden border border-line md:block">
              <img
                src={next.image}
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-105"
              />
            </div>
          )}
        </Link>
      </nav>
    </article>
  );
}
