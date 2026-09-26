import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { PiArrowUpRightBold } from "react-icons/pi";
import { otherProjects, statusLabel, type Project } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";

export function WorkIndex() {
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30 });
  const sy = useSpring(y, { stiffness: 260, damping: 30 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">Before, and on the side</h2>
        </Reveal>
        <Link to="/projects" className="group text-sm font-medium text-sea">
          <Roll>All work and filters</Roll>
        </Link>
      </div>

      <ul className="mt-10 border-t border-line" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
        {otherProjects.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
              <Link
                to={`/projects/${p.slug}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
                onFocus={() => setHovered(null)}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-6 transition-colors hover:bg-sunk md:grid-cols-[5rem_minmax(0,1.3fr)_minmax(0,1fr)_9rem_2rem] md:px-3"
              >
                <span className="font-mono text-xs text-mute">{p.date}</span>
                <span className="text-xl font-semibold tracking-tight transition-transform duration-500 ease-out-quint group-hover:translate-x-2 md:text-2xl">
                  {p.title}
                </span>
                <span className="hidden truncate text-sm text-mute md:block">{p.techStack.slice(0, 3).join(", ")}</span>
                <span className="hidden text-sm text-mute md:block">{statusLabel[p.status]}</span>
                <PiArrowUpRightBold
                  aria-hidden="true"
                  className="justify-self-end text-mute transition-[color,transform] duration-300 group-hover:rotate-45 group-hover:text-sea"
                />
              </Link>
          </motion.li>
        ))}
      </ul>

      {/* Cursor-following preview, mouse only. Decorative: the row is the link. */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-20 hidden md:block"
      >
        <AnimatePresence>
          {hovered?.image && (
            <motion.img
              key={hovered.slug}
              src={hovered.image}
              alt=""
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 left-6 aspect-[4/3] w-72 border border-line object-cover shadow-[0_20px_50px_-20px_rgb(18_21_24/0.45)]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
