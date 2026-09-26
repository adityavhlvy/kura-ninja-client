import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { flagships, projects, shortTitle, statusLabel, type Project } from "@/data/portfolio";
import { PageIntro } from "@/components/PageIntro";
import { ease } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

// Filter chips: tools used by more than one project, most common first.
const TOOLS = Object.entries(
  projects.flatMap((p) => p.techStack).reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {}),
)
  .filter(([, n]) => n > 1)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([t]) => t);

function Card({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="relative overflow-hidden border border-line bg-sunk">
        <img
          src={project.image}
          alt={`${project.title}, main screen`}
          loading="lazy"
          decoding="async"
          className={clsx(
            "w-full object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.03]",
            wide ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]",
          )}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-sea">
          {shortTitle(project)}
        </h2>
        <span className="shrink-0 font-mono text-xs text-mute">{project.date}</span>
      </div>
      <p className="mt-2 line-clamp-2 max-w-[60ch] text-sm leading-relaxed text-mute">{project.description}</p>
      <p className="mt-3 text-xs text-mute">
        {statusLabel[project.status]}, {project.visibility === "private" ? "internal" : "public"}
      </p>
    </Link>
  );
}

export default function Work() {
  useTitle("Work");
  const [tool, setTool] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (!tool || p.techStack.includes(tool)) &&
        (!q || `${p.title} ${p.description} ${p.techStack.join(" ")}`.toLowerCase().includes(q)),
    );
  }, [tool, query]);

  const chip = (active: boolean) =>
    clsx(
      "h-9 border px-3 text-sm transition-colors",
      active ? "border-ink bg-ink text-paper" : "border-line text-mute hover:border-ink hover:text-ink",
    );

  return (
    <>
      <PageIntro title="Work">
        {projects.length} projects, from enterprise platforms at Pupuk Indonesia to research on satellite imagery and
        small things built for fun.
      </PageIntro>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col gap-5 border-y border-line py-5 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="work-search" className="text-xs text-mute">
              Search
            </label>
            <input
              id="work-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, tool, or topic"
              className="h-10 w-full border border-line bg-transparent px-3 text-sm outline-none placeholder:text-mute focus:border-sea lg:w-64"
            />
          </div>
          <div role="group" aria-label="Filter by tool" className="flex flex-wrap gap-2 lg:ml-4">
            <button type="button" aria-pressed={!tool} onClick={() => setTool(null)} className={chip(!tool)}>
              Everything
            </button>
            {TOOLS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tool === t}
                onClick={() => setTool(tool === t ? null : t)}
                className={chip(tool === t)}
              >
                {t}
              </button>
            ))}
          </div>
          <p role="status" className="font-mono text-xs whitespace-nowrap text-mute lg:ml-auto">
            {shown.length} of {projects.length}
          </p>
        </div>

        <motion.ul layout className="grid gap-x-10 gap-y-16 py-14 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => {
              // The first flagship in the current result spans the full row.
              const wide = flagships.includes(p) && shown.length > 1 && p === shown[0];
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease }}
                  className={clsx(wide && "md:col-span-2")}
                >
                  <Card project={p} wide={wide} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {shown.length === 0 && (
          <div className="border border-dashed border-line px-6 py-16 text-center">
            <p className="text-lg">No project matches {query ? `"${query}"` : "that filter"}.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTool(null);
              }}
              className="link mt-3 text-sm text-sea"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
