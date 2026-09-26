import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { profile } from "@/data/portfolio";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{" "}
    </motion.span>
  );
}

/** The quote inks in word by word as it scrolls through the viewport. */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const { quote, comment } = profile.philosophy;
  const words = quote.split(" ");
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10 md:pt-40">
      <figure className="max-w-5xl">
        <blockquote>
          <p className="display text-[clamp(2.25rem,5.4vw,4.75rem)]" aria-label={quote}>
            <span aria-hidden="true">
              {reduce
                ? quote
                : words.map((w, i) => (
                    <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
                  ))}
            </span>
          </p>
        </blockquote>
        <figcaption className="mt-8 text-mute">{comment}</figcaption>
      </figure>
    </section>
  );
}
