import { Link } from "react-router-dom";
import { journey, profile } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { wrap } from "@/lib/wrap";

const FACTS = [
  { label: "Now", value: "Software & AI Engineer, Pupuk Indonesia" },
  { label: "Studied", value: "Computer Science, Universitas Pertamina, cum laude" },
  { label: "Scholarship", value: "APERTI BUMN" },
];

/** Two rows that share one vertical line at 34%: facts and story, then the path. */
export function AboutBrief() {
  const half = Math.ceil(journey.length / 2);
  const cols = [journey.slice(0, half), journey.slice(half)];
  return (
    <section aria-labelledby="about-brief" className={`${wrap} pt-24 md:pt-32`}>
      <div className="grid gap-10 md:grid-cols-[34fr_66fr] md:gap-0">
        <dl className="order-2 grid grid-cols-2 gap-5 md:order-none md:block md:w-48 md:space-y-5">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt className="text-mute">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <Reveal className="md:pr-[10%]">
          <h2 id="about-brief" className="sr-only">
            About
          </h2>
          <p className="text-[clamp(1.25rem,1.7vw,1.625rem)] leading-[1.35]">
            I work where AI orchestration, geospatial intelligence and fullstack engineering meet. Before Pupuk Indonesia I
            digitised production planning at Astra Otoparts, then forecast rice yield from satellite imagery as a research
            assistant. I think about system design more than is healthy at 2am.
          </p>
          <Link to="/about" className="group mt-6 inline-flex font-medium text-sea">
            <Roll>More about me</Roll>
          </Link>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-[34fr_66fr] md:gap-0">
        <p className="font-semibold">Path</p>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 md:pr-[10%]">
          {cols.map((col, i) => (
            <ul key={i} className="space-y-2.5">
              {col.map((n) => (
                <li key={n.id} className="flex justify-between gap-6">
                  <span>
                    {n.details.role}, {n.details.company ?? n.label}
                  </span>
                  <span className="shrink-0 text-mute tabular-nums">{n.year}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Reveal className="mt-20 md:ml-[34%]">
        <blockquote className="max-w-[30ch] text-[clamp(1.375rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
          <p>{profile.philosophy.quote}</p>
        </blockquote>
        <p className="mt-3 text-mute">{profile.philosophy.comment}</p>
      </Reveal>
    </section>
  );
}
