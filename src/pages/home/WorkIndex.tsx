import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { otherProjects, statusLabel } from "@/data/portfolio";
import { Roll } from "@/components/Roll";
import { wrap } from "@/lib/wrap";

// The rest of the work as a line-up on fixed column starts. Titles take the ink,
// the stack, status, and year share the size but take the quiet ink, so each
// row reads title first.
const ROW = "text-[clamp(1.375rem,2.5vw,2.25rem)] leading-[1.5]";

export function WorkIndex() {
  return (
    <section className={`${wrap} pt-24 md:pt-32`}>
      <h2 className="label mb-8">02 Before, and on the side</h2>
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
              className={`group mb-7 block md:mb-5 md:grid md:grid-cols-[42fr_28fr_20fr_10fr] md:items-baseline ${ROW}`}
            >
              <span className="block transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-sea">
                {p.title}
              </span>
              <span className="flex justify-between gap-4 text-lg text-mute md:contents md:text-[length:inherit]">
                <span>{p.techStack[0]}</span>
                <span>{statusLabel[p.status]}</span>
                <span className="text-right tabular-nums">{p.date}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
      <Link to="/projects" className="group mt-10 inline-flex font-medium text-sea">
        <Roll>All work, with search and filters</Roll>
      </Link>
    </section>
  );
}
