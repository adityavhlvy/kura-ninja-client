import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { journey, type JourneyNode } from "@/data/portfolio";
import { JourneyLegend, JourneyMarker } from "@/components/JourneyMarker";
import { useMedia } from "@/lib/useMedia";

function Stop({ node }: { node: JourneyNode }) {
  const { details } = node;
  return (
    <article className="flex w-[19rem] shrink-0 flex-col md:w-[22rem]">
      <div className="flex items-center gap-3">
        <JourneyMarker type={node.type} className="size-5" />
        <span className="h-px flex-1 bg-line" />
      </div>
      <p className="display mt-6 text-6xl text-ink/90">{node.year}</p>
      <h3 className="mt-5 text-lg font-semibold leading-snug">{details.role}</h3>
      <p className="text-sm text-mute">
        {details.company ?? node.label}, {details.date}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-mute">{details.description}</p>
      <p className="mt-auto pt-5 text-sm font-medium text-sea">{details.highlight}</p>
    </article>
  );
}

function Heading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 className="display text-[clamp(2rem,4vw,3.5rem)]">How I got here</h2>
      <JourneyLegend />
    </div>
  );
}

/** Pinned rail: vertical scroll pans the milestones sideways. */
function PinnedRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section ref={section} style={{ height: `calc(100vh + ${distance}px)` }} className="relative mt-28 md:mt-40">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10">
          <Heading />
        </div>
        <motion.div ref={track} style={{ x }} className="mt-14 flex w-max gap-12 px-5 md:px-10">
          {journey.map((n) => (
            <Stop key={n.id} node={n} />
          ))}
        </motion.div>
        <div className="mx-auto mt-12 w-full max-w-[1440px] px-5 md:px-10">
          <div className="h-px w-full bg-line">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-sea" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Touch, narrow screens, or reduced motion: a plain swipeable row. */
function ScrollRail() {
  return (
    <section className="mt-28 md:mt-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Heading />
      </div>
      <div className="mt-10 flex snap-x snap-mandatory scroll-px-5 gap-10 overflow-x-auto px-5 pb-6 md:scroll-px-10 md:px-10" tabIndex={0} aria-label="Career milestones, scroll sideways">
        {journey.map((n) => (
          <div key={n.id} className="snap-start">
            <Stop node={n} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  const wide = useMedia("(min-width: 1024px) and (hover: hover)");
  const reduce = useReducedMotion();
  return wide && !reduce ? <PinnedRail /> : <ScrollRail />;
}
