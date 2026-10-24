import { Link } from "react-router-dom";
import { journey, profile } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { JourneyLegend, JourneyMarker } from "@/components/JourneyMarker";
import { wrap } from "@/lib/wrap";

function PathGroup({ title, items }: { title: string; items: typeof journey }) {
  return (
    <div>
      <p className="mb-3 border-b border-ink pb-2 text-sm font-semibold">{title}</p>
      <ul className="divide-y divide-line">
        {items.map((n) => (
          <li key={n.id} className="flex items-center gap-3 py-3.5">
            <JourneyMarker type={n.type} />
            <span className="min-w-0 flex-1">
              <strong className="block font-medium text-ink">{n.details.role}</strong>
              <span className="block text-sm text-mute">{n.details.company ?? n.label}</span>
            </span>
            <span className="shrink-0 font-mono text-xs text-mute tabular-nums">{n.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutBrief() {
  const workAndResearch = journey
    .filter((j) => j.type === "work" || j.type === "achievement")
    .slice()
    .reverse()
    .slice(0, 4);

  const leadership = journey.filter((j) => j.type === "org").reverse().slice(0, 2);
  const education = journey.filter((j) => j.type === "education").reverse().slice(0, 2);

  return (
    <section aria-labelledby="about-brief-title" className={`${wrap} pt-24 md:pt-32`}>
      {/* Top: Bio story & Structured Facts */}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-9">
          <h2 id="about-brief-title" className="label">
            About
          </h2>
          <p className="mt-6 text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.4] text-ink">
            I work where AI orchestration, geospatial intelligence and fullstack engineering meet. Before Pupuk Indonesia I
            digitised production planning at Astra Otoparts, then forecast rice yield from satellite imagery as a research
            assistant. I think about system design more than is healthy at 2am.
          </p>
          <div className="mt-8">
            <Link to="/about" className="group inline-flex items-center gap-2 font-medium text-sea">
              <Roll>More about me</Roll>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

      </div>

      {/* Middle: the latest of each kind; the full path lives on /about */}
      <Reveal delay={0.2} className="mt-20 border-t border-line pt-12 md:mt-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="label">Path</h3>
          <JourneyLegend />
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <PathGroup title="Work & Research" items={workAndResearch} />
          <div className="space-y-10">
            <PathGroup title="Leadership" items={leadership} />
            <PathGroup title="Education" items={education} />
          </div>
        </div>
      </Reveal>

      {/* Bottom: Philosophy Callout Card */}
      <Reveal delay={0.25} className="mt-16 md:mt-24">
        <div className="border-l-2 border-sea bg-sunk p-8 md:p-12">
          <p className="label">Philosophy</p>
          <blockquote className="mt-4 max-w-[36ch] text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-snug tracking-tight text-ink">
            “{profile.philosophy.quote}”
          </blockquote>
          <p className="mt-4 text-sm text-mute">{profile.philosophy.comment}</p>
        </div>
      </Reveal>
    </section>
  );
}
