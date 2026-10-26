import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Reveal } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import { profile } from "@/data/portfolio";
import { wrap } from "@/lib/wrap";

// The lens: outside it the sentence is plain English, inside it the same
// sentence shows its structure like a dev-tools inspector. Both layers render
// the same markup, so every word lines up at every width.


const WORDS: { w: string; tag?: string; cls?: string }[] = [
  { w: "I", tag: "user" },
  { w: "read", tag: "fn read()" },
  { w: "the" },
  { w: "process,", tag: "input", cls: "italic font-light" },
  { w: "then", tag: "→" },
  { w: "write", tag: "fn write()" },
  { w: "the" },
  { w: "system.", tag: "output", cls: "text-sea" },
];

function Sentence({ x }: { x?: boolean }) {
  return (
    <>
      {WORDS.map(({ w, tag, cls }, i) => (
        <span key={i}>
          <span
            className={clsx(
              "relative inline-block",
              cls,
              x && "text-transparent [-webkit-text-stroke:1.5px_var(--sea)] outline-1 outline-sea/50 outline-dashed",
            )}
          >
            {w}
            {x && tag && (
              <span className="absolute -top-1 left-0 -translate-y-full bg-sea px-1.5 py-0.5 font-mono text-[11px] font-medium tracking-normal text-on-sea not-italic [-webkit-text-stroke:0]">
                {tag}
              </span>
            )}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

function Lens() {
  const box = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const b = box.current!;
    // Radius follows the type size: about one line tall, 56px on a phone, 110px on desktop.
    const radius = () => Math.min(110, Math.max(56, b.clientWidth * 0.08));
    const set = (x: number, y: number) => {
      const R = radius();
      top.current!.style.clipPath = `circle(${R}px at ${x}px ${y}px)`;
      Object.assign(ring.current!.style, {
        width: `${R * 2}px`,
        height: `${R * 2}px`,
        transform: `translate(${x - R}px, ${y - R}px)`,
      });
    };
    // While the pointer is away (touch, first paint, after leaving) the lens glides
    // from word to word, so it never parks on empty space. Word centres are read
    // live, so wrapping at any width is handled.
    let t = 0;
    let raf = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = () => {
      const o = b.getBoundingClientRect();
      return [...b.querySelectorAll("h1 > span > span")].map((el) => {
        const r = el.getBoundingClientRect();
        return [r.left - o.left + r.width / 2, r.top - o.top + r.height / 2] as const;
      });
    };
    const drift = () => {
      const w = words();
      t += 0.006; // one word every ~2.8s at 60fps
      const i = Math.floor(t) % w.length;
      const [a, c] = [w[i], w[(i + 1) % w.length]];
      const k = t % 1;
      const e = k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2; // ease in-out, rests on each word
      set(a[0] + (c[0] - a[0]) * e, a[1] + (c[1] - a[1]) * e);
      if (!reduce) raf = requestAnimationFrame(drift);
    };
    drift();
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      const r = b.getBoundingClientRect();
      set(e.clientX - r.left, e.clientY - r.top);
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      drift();
    };
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Same wrap rule on both layers (h1 gets balance globally, the div would not).
  const type = "display [grid-area:1/1] text-balance text-[clamp(3rem,13vw,8.5rem)] md:text-[clamp(3rem,8.2vw,8.5rem)] leading-[1.02]";
  return (
    <div ref={box} className="relative grid md:cursor-none">
      <h1 className={type}>
        <Sentence />
      </h1>
      <div ref={top} aria-hidden="true" className={`${type} bg-paper`} style={{ clipPath: "circle(0 at 0 0)" }}>
        <Sentence x />
      </div>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 rounded-full border border-sea/40 shadow-[0_0_60px_color-mix(in_oklab,var(--sea)_30%,transparent)]"
      />
    </div>
  );
}

export function Hero() {
  const { bio, contact } = profile;
  return (
    <section className="grain overflow-hidden">
      <div className={`${wrap} flex min-h-[100svh] flex-col justify-between gap-10 pt-24 pb-8 md:gap-16 md:pt-28 md:pb-10`}>
        <p className="label">
          {bio.name}
          <span className="block md:inline"> / Software Engineer, Pupuk Indonesia</span>
        </p>

        <div className="relative">
          <Lens />
          <p className="hand pointer-events-none absolute -top-12 right-0 hidden -rotate-6 text-3xl md:block lg:text-4xl">
            look through the lens ↓
          </p>
        </div>

        <Reveal delay={0.3} className="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:gap-6">
          <p className="max-w-[44ch] text-mute md:col-span-5">
            I sit with the people doing the work, learn how it really runs, then build the software for it: AI agents,
            maps, and logistics tools.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-7 md:justify-end">
            <a href="#work" className={buttonClass("primary")}>
              <Roll>See the work</Roll>
            </a>
            <a href={`mailto:${contact.email}`} className="group font-medium text-sea">
              <Roll>Email me</Roll>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
