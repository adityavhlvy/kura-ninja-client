import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PiArrowUpRightBold } from "react-icons/pi";
import { otherProjects, statusLabel } from "@/data/portfolio";
import { buttonClass } from "@/components/button";
import { Roll } from "@/components/Roll";
import { ease } from "@/components/Reveal";
import { wrap } from "@/lib/wrap";

// The rest of the work as a line-up on fixed column starts. Titles take the ink,
// the stack, status, and year share the size but take the quiet ink, so each
// row reads title first.
const ROW = "text-[clamp(1.375rem,2.5vw,2.25rem)] leading-[1.5]";
const DOT: Record<string, string> = {
  active: "bg-sea",
  "in-progress": "bg-mute",
  completed: "bg-ink",
  archived: "bg-line",
};

export function WorkIndex() {
  return (
    <section id="work-index" className={`${wrap} scroll-mt-20 pt-24 md:pt-32`}>
      <p className="label">02 / Before, and on the side</p>
      <h2 className="display mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,3.25rem)]">The rest of the work.</h2>
      <p className="mt-4 max-w-[52ch] text-mute">
        Shipped, in development, and the side quests that taught me the stack. Every row opens a case study.
      </p>

      <div className="mt-12 hidden border-b border-line pb-3 font-mono text-[10px] tracking-[0.12em] text-mute md:grid md:grid-cols-[42fr_20fr_22fr_8fr_4fr]">
        <span>PROJECT</span>
        <span>STACK</span>
        <span>STATUS</span>
        <span className="text-right">YEAR</span>
        <span />
      </div>

      <ul>
        {otherProjects.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.07 }}
          >
            <Link
              to={`/projects/${p.slug}`}
              className={`group relative block border-t border-line py-5 md:grid md:grid-cols-[42fr_20fr_22fr_8fr_4fr] md:items-baseline ${ROW}`}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-sea"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.05 + i * 0.05, ease }}
              />
              <span className="block transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-sea">
                {p.title}
              </span>
              <span className="flex items-center justify-between gap-4 text-lg text-mute md:contents md:text-[length:inherit]">
                <span>{p.techStack[0]}</span>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className={`size-1.5 shrink-0 rounded-full ${DOT[p.status] ?? "bg-line"}`} />
                  {statusLabel[p.status]}
                </span>
                <span className="text-right whitespace-nowrap tabular-nums">{p.date}</span>
              </span>
              <PiArrowUpRightBold
                aria-hidden="true"
                className="hidden justify-self-end text-mute transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sea md:block"
              />
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link to="/projects" className={`${buttonClass("outline")} mt-10`}>
        <Roll>All work, with search and filters</Roll>
        <PiArrowUpRightBold aria-hidden="true" />
      </Link>
    </section>
  );
}
