import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { PiArrowDownBold, PiArrowCounterClockwiseBold, PiCheckBold, PiCopyBold } from "react-icons/pi";
import { LogoMark, MarkLoader, StaticMark } from "@/components/LogoMark";
import { Reveal, RiseWords } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import { CLEAR, FAVICON, MARK, PHI } from "@/lib/avnMark";
import { useTitle } from "@/lib/useTitle";
import { wrap } from "@/lib/wrap";

const { H, box: B, spine: SPINE } = MARK;
const ANGLE = `${MARK.angle.toFixed(1)}°`;
const fix = (v: number, d = 2) => v.toFixed(d);
/** Fixed grounds for the light and dark tests, so they hold in either site theme. */
const LIGHT = "bg-[#eceee9] text-[#121518]";
const DARK = "bg-[#0e1113] text-[#e7e9e4]";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line">
      <div className={clsx(wrap, "py-20 md:py-28")}>
        <p className="label mb-4">{label}</p>
        <RiseWords as="h2" text={title} className="display max-w-[20ch] text-[clamp(2rem,4.5vw,3.75rem)]" />
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}

/** Adds a class for one run of a CSS animation, restartable on demand. */
function useReplay(ms: number) {
  const [on, setOn] = useState(false);
  const timer = useRef<number>(0);
  const play = useCallback(() => {
    setOn(false);
    window.clearTimeout(timer.current);
    requestAnimationFrame(() => {
      setOn(true);
      timer.current = window.setTimeout(() => setOn(false), ms);
    });
  }, [ms]);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return [on, play] as const;
}

function CopyHex({ hex, theme }: { hex: string; theme: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setDone(false), 1400);
    return () => window.clearTimeout(t);
  }, [done]);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(hex).then(() => setDone(true))}
      className="group flex w-full items-center justify-between border-b border-line py-2.5 text-left font-mono text-sm transition-colors hover:text-sea"
      aria-label={`Copy ${theme} value ${hex}`}
    >
      <span>
        <span className="text-mute">{theme}</span> {hex}
      </span>
      <span aria-live="polite" className="flex items-center gap-1.5 text-xs text-mute group-hover:text-sea">
        {done ? (
          <>
            <PiCheckBold aria-hidden="true" /> Copied
          </>
        ) : (
          <PiCopyBold aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

/** Wordmark set the way the lockup files set it: Archivo 600, width 112, tracking −3%. */
function Words({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx("font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_112]", className)}>{children}</span>;
}

const polyline = (from: number, to: number) =>
  `M${SPINE.slice(from, to + 1)
    .map((p) => `${p.x} ${p.y}`)
    .join("L")}`;

/* ------------------------------------------------------------------ */
/* Name: each letter lights its strokes                                */
/* ------------------------------------------------------------------ */

type Part = "a" | "v" | "n" | "wave";

const NAME: { part: Part; key: string; word: string; body: string; from: number; to: number }[] = [
  {
    part: "a",
    key: "Λ",
    word: "Aditya",
    body: "A without its bar: two strokes meeting at a point. The wave passes under the point and puts a bar back, so every peak reads as an A again.",
    from: 0,
    to: 2,
  },
  {
    part: "v",
    key: "V",
    word: "Vahlevy",
    body: "The next two strokes, the same angle turned over. The second stroke of Λ is the first stroke of V. Nothing is drawn twice.",
    from: 1,
    to: 3,
  },
  {
    part: "n",
    key: "N",
    word: "Nugraha",
    body: "Λ and V joined make /\\/, which is an N on a slant. The last three strokes close the name, so five strokes carry all three letters.",
    from: 2,
    to: 5,
  },
  {
    part: "wave",
    key: "∿",
    word: "The wave",
    body: "One continuous stroke over the same path, every turn rounded. The sharp line is the engineer, the wave is the hand. Where they part, small counters open.",
    from: 0,
    to: 5,
  },
];

function NameMark({ part }: { part: Part | null }) {
  const id = useId();
  const active = NAME.find((n) => n.part === part);
  const strokes = active && active.part !== "wave";
  return (
    <svg viewBox={`${B.x - 1} ${B.y - 1} ${B.w + 2} ${B.h + 2}`} aria-hidden="true" className="w-full overflow-visible">
      <mask id={id} maskUnits="userSpaceOnUse">
        {strokes && (
          <path d={polyline(active.from, active.to)} fill="none" stroke="#fff" strokeWidth={MARK.t * 4} strokeLinejoin="miter" />
        )}
      </mask>
      <g style={{ opacity: part ? 0.14 : 1, transition: "opacity 300ms" }}>
        <path d={MARK.zig} className="fill-ink" />
        <path d={MARK.wave} fill="none" className="stroke-ink" strokeWidth={MARK.t} />
      </g>
      {strokes && <path d={MARK.zig} mask={`url(#${id})`} className="fill-sea" />}
      {part === "wave" && <path d={MARK.wave} fill="none" className="stroke-sea" strokeWidth={MARK.t} />}
    </svg>
  );
}

function NameSection() {
  const [part, setPart] = useState<Part | null>(null);
  return (
    <Section id="name" label="01 · The name" title="Three letters, *one* line.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <div className="mx-auto max-w-sm bg-sunk p-8 md:max-w-none md:p-12">
            <NameMark part={part} />
          </div>
          <p className="label mt-3">Point at a line to light its part of the mark.</p>
        </div>
        <ol className="border-t border-line" onMouseLeave={() => setPart(null)}>
          {NAME.map((n) => (
            <li key={n.part}>
              <div
                tabIndex={0}
                onMouseEnter={() => setPart(n.part)}
                onFocus={() => setPart(n.part)}
                onBlur={() => setPart(null)}
                className={clsx(
                  "grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line py-7 outline-offset-0 transition-colors md:grid-cols-[6rem_1fr] md:py-9",
                  part === n.part ? "text-ink" : part ? "text-mute" : "text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className={clsx("display text-[clamp(2.25rem,4vw,3.5rem)] transition-colors", part === n.part && "text-sea")}
                >
                  {n.key}
                </span>
                <div>
                  <h3 className="text-xl font-semibold md:text-2xl">{n.word}</h3>
                  <p className="prose-body mt-2">{n.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Construction: rules with their guides                               */
/* ------------------------------------------------------------------ */

type Guide = "grid" | "box" | "angle" | "stroke" | "overshoot" | "wave" | "space";

const RULES: { guide: Guide; title: string; body: string }[] = [
  { guide: "grid", title: `Cap height H = ${H}`, body: "Every other measure comes from H and the golden ratio. 21 is a Fibonacci number, so the steps stay near whole units." },
  { guide: "box", title: "Golden box, φ : 1", body: `The mark is exactly φ·H wide, ${fix(B.w)} units. The angle is solved to make it so, not picked by eye.` },
  { guide: "angle", title: `One angle, ${ANGLE}`, body: "All five strokes lean the same way from the baseline. No stroke is adjusted on its own." },
  { guide: "stroke", title: "Stroke t = H/φ⁵", body: `${fix(MARK.t)} units, one weight for the zigzag and the wave. The dashed line is the spine both are built on.` },
  { guide: "overshoot", title: "Overshoot o = t/4", body: "Points look shorter than flats, so every pointed turn passes the cap or base line a little. The two flat terminals sit exactly on the lines." },
  { guide: "wave", title: `Wave radius r = ${fix(MARK.r)}`, body: "Each turn of the spine is filleted with the largest radius that fits, so the arcs meet at every stroke's midpoint and the wave is made only of arcs." },
  { guide: "space", title: "Clear space H/φ²", body: `${fix(CLEAR)} units on every side, about a third of the height. Nothing else enters it, including the words.` },
];

function ConstructionSection() {
  const [g, setG] = useState<Guide | null>(null);
  const on = (k: Guide) => ({ opacity: g === k ? 1 : 0, transition: "opacity 250ms" });
  const x0 = B.x;
  const x1 = B.x + B.w;
  const pad = CLEAR + 1.5;
  const off = MARK.r / Math.sin(Math.atan(MARK.slope));
  const a = (MARK.angle * Math.PI) / 180;
  const arc = 5;
  const cols = Array.from({ length: Math.floor(x1) - Math.ceil(x0) + 1 }, (_, i) => Math.ceil(x0) + i);
  const rows = Array.from({ length: H + 1 }, (_, i) => i);

  return (
    <Section id="construction" label="02 · Shape" title="Built on a ratio, *not* by eye.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-20">
        <div className="bg-sunk p-4 md:p-8">
          <svg
            viewBox={`${x0 - pad} ${-pad} ${B.w + 2 * pad} ${H + 2 * pad}`}
            className="w-full overflow-visible"
            role="img"
            aria-label="Construction drawing of the mark with its grid, golden box, angle, stroke, overshoot, wave radius, and clear space"
          >
            <g className="fill-ink" style={{ opacity: g && g !== "wave" && g !== "stroke" ? 0.25 : 0.92, transition: "opacity 250ms" }}>
              <path d={MARK.zig} />
              <path d={MARK.wave} fill="none" className="stroke-ink" strokeWidth={MARK.t} />
            </g>
            <g className="stroke-mute" strokeWidth={0.04} style={{ opacity: g === "grid" ? 0.9 : 0.3, transition: "opacity 250ms" }}>
              {cols.map((u) => (
                <line key={`c${u}`} x1={u} y1={0} x2={u} y2={H} />
              ))}
              {rows.map((v) => (
                <line key={`r${v}`} x1={x0} y1={v} x2={x1} y2={v} />
              ))}
            </g>

            <g className="fill-none stroke-sea" strokeWidth={0.1}>
              <g style={on("box")}>
                <rect x={x0} y={0} width={B.w} height={H} strokeDasharray="0.4 0.25" />
                <line x1={x0 + H} y1={0} x2={x0 + H} y2={H} strokeDasharray="0.4 0.25" />
              </g>
              <path
                d={`M${arc} ${H}A${arc} ${arc} 0 0 0 ${arc * Math.cos(a)} ${H - arc * Math.sin(a)}`}
                style={on("angle")}
              />
              <path d={polyline(0, 5)} strokeDasharray="0.5 0.3" className="stroke-paper" style={on("stroke")} />
              <g style={on("overshoot")}>
                <line x1={x0 - 1} y1={0} x2={x1 + 1} y2={0} />
                <line x1={x0 - 1} y1={H} x2={x1 + 1} y2={H} />
                <line x1={x0 - 1} y1={-MARK.o} x2={x1 + 1} y2={-MARK.o} strokeDasharray="0.3 0.2" />
                <line x1={x0 - 1} y1={H + MARK.o} x2={x1 + 1} y2={H + MARK.o} strokeDasharray="0.3 0.2" />
              </g>
              <g style={on("wave")}>
                {SPINE.slice(1, -1).map((p) => (
                  <circle key={p.x} cx={p.x} cy={p.y < H / 2 ? p.y + off : p.y - off} r={MARK.r} strokeDasharray="0.3 0.2" />
                ))}
                <path d={MARK.wave} strokeWidth={MARK.t} className="stroke-sea" />
              </g>
              <rect
                x={x0 - CLEAR}
                y={B.y - CLEAR}
                width={B.w + 2 * CLEAR}
                height={B.h + 2 * CLEAR}
                strokeDasharray="0.4 0.25"
                style={on("space")}
              />
            </g>
            <g className="fill-mute font-mono" fontSize={0.9}>
              <text x={x0} y={H + 1.6} style={on("box")}>
                φ·H = {fix(B.w)}
              </text>
              <text x={arc + 0.6} y={H - 1} className="fill-sea" style={on("angle")}>
                {ANGLE}
              </text>
              <text x={x1 + 1.2} y={0.3} style={on("overshoot")}>
                cap
              </text>
              <text x={x1 + 1.2} y={H + 0.3} style={on("overshoot")}>
                base
              </text>
              <text x={x0} y={-0.8} style={on("grid")}>
                H = {H}
              </text>
              <text x={x0 - CLEAR} y={B.y - CLEAR - 0.6} style={on("space")}>
                H/φ² = {fix(CLEAR)}
              </text>
            </g>
          </svg>
        </div>

        <ul className="border-t border-line" onMouseLeave={() => setG(null)}>
          {RULES.map((r) => (
            <li key={r.guide}>
              <div
                tabIndex={0}
                onMouseEnter={() => setG(r.guide)}
                onFocus={() => setG(r.guide)}
                onBlur={() => setG(null)}
                className="group grid grid-cols-[1fr] gap-1 border-b border-line py-5 outline-offset-0"
              >
                <h3 className={clsx("font-semibold transition-colors", g === r.guide && "text-sea")}>{r.title}</h3>
                <p className="text-sm leading-relaxed text-mute">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <a href="/brand/construction.svg" download className="link mt-10 inline-flex items-center gap-1.5 font-mono text-sm">
        <PiArrowDownBold aria-hidden="true" className="text-mute" /> construction.svg
      </a>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Sizes: light and dark, large down to 16 px                          */
/* ------------------------------------------------------------------ */

const LADDER = [192, 96, 48];
const SMALL_LADDER = [32, 24];

function SizeRow({ ground, label }: { ground: string; label: string }) {
  return (
    <div className={clsx(ground, "p-8 md:p-12")}>
      <p className="mb-8 font-mono text-xs opacity-60">{label}</p>
      <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
        {LADDER.map((w) => (
          <figure key={w} className="flex flex-col items-start gap-3">
            <StaticMark style={{ width: w }} />
            <figcaption className="font-mono text-xs opacity-60">{w}</figcaption>
          </figure>
        ))}
        {SMALL_LADDER.map((h) => (
          <figure key={h} className="flex flex-col items-start gap-3">
            <StaticMark small style={{ height: h }} />
            <figcaption className="font-mono text-xs opacity-60">{h}</figcaption>
          </figure>
        ))}
        <figure className="flex flex-col items-start gap-3">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
            <path d={FAVICON} className="fill-current" />
          </svg>
          <figcaption className="font-mono text-xs opacity-60">16</figcaption>
        </figure>
      </div>
    </div>
  );
}

function SizesSection() {
  return (
    <Section id="sizes" label="03 · Size" title="Full mark down to 48, *ΛV* below.">
      <p className="prose-body mb-12 max-w-[60ch] text-lg">
        Under 48 px the counters close and the wave turns to noise. So small sizes drop to ΛV alone, three strokes with a
        heavier weight. It is still A, V, and N. At 16 px the favicon is redrawn on the pixel grid: cap and base on whole
        rows, every outer corner on a pixel corner.
      </p>
      <div className="grid gap-4">
        <SizeRow ground={LIGHT} label="light" />
        <SizeRow ground={DARK} label="dark" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

const COLOURS = [
  {
    name: "Ink",
    token: "--ink",
    swatch: "bg-ink",
    light: "#121518",
    dark: "#e7e9e4",
    contrast: "15.7 : 1 on paper",
    body: "The mark is one ink on one ground. It has to work as a stamp, an emboss, and a 16 px tab before it earns a colour.",
  },
  {
    name: "Paper",
    token: "--paper",
    swatch: "bg-paper border border-line",
    light: "#eceee9",
    dark: "#0e1113",
    contrast: "Ground for everything",
    body: "Cool chart paper. In dark mode the two swap: paper becomes night, ink becomes light.",
  },
];

function ColourSection() {
  return (
    <Section id="colour" label="04 · Colour" title="Monochrome *first*.">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {COLOURS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08}>
            <div className={clsx(c.swatch, "aspect-[4/3] w-full")} />
            <h3 className="mt-5 text-2xl font-semibold">{c.name}</h3>
            <p className="label mt-1">
              {c.token} · {c.contrast}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mute">{c.body}</p>
            <div className="mt-4 border-t border-line">
              <CopyHex hex={c.light} theme="Light" />
              <CopyHex hex={c.dark} theme="Dark" />
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.16} className="md:pt-2">
          <h3 className="text-2xl font-semibold">Colour, later</h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            The site keeps its sea blue as an accent for links and focus. The mark does not use it yet. A colour for the
            mark comes once the shape has been tested in one ink.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

function TypeSection() {
  return (
    <Section id="type" label="05 · Type" title="The mark stands *φ* times the capitals.">
      <div className="space-y-10 text-[clamp(1.75rem,6vw,5.5rem)] leading-none">
        <div className="flex flex-wrap items-end gap-x-[0.38em] gap-y-6">
          <StaticMark className="h-[1.1em]" />
          <Words>Aditya Vahlevy Nugraha</Words>
        </div>
        <div className="flex flex-wrap items-end gap-x-[0.38em] gap-y-6 text-[0.7em]">
          <StaticMark className="h-[1.1em]" />
          <Words>adityavhlvy</Words>
        </div>
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">Lockups</h3>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            Full name for CVs, cards, and documents. The handle where it is typed: URLs, usernames, the site header. Cap
            height of the words is H/φ, baselines align, and the gap is the clear space H/φ².
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Archivo</h3>
          <p className="mt-2 text-3xl [font-variation-settings:'wdth'_118]" style={{ fontWeight: 760 }}>
            Words, headlines
          </p>
          <p className="mt-2 text-sm text-mute">Semibold, width 112, tracking −3%. The width axis does the work a second font would.</p>
        </div>
        <div>
          <h3 className="font-semibold">IBM Plex Mono</h3>
          <p className="mt-2 font-mono text-2xl">2026 · {ANGLE}</p>
          <p className="mt-2 text-sm text-mute">Data only: years, codes, values, labels.</p>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Kit: one variant per job                                            */
/* ------------------------------------------------------------------ */

type KitItem = { name: string; job: string; files: { href: string; label: string }[]; preview: ReactNode };

const KIT: KitItem[] = [
  {
    name: "Lockup, full name",
    job: "CV, business card, slides, documents. The default when there is room for the whole name.",
    files: [
      { href: "/brand/lockup-name.svg", label: "lockup-name.svg" },
      { href: "/brand/lockup-name-dark.svg", label: "lockup-name-dark.svg" },
    ],
    preview: (
      <span className="flex items-end gap-1.5 text-xs whitespace-nowrap">
        <StaticMark className="h-[1.6em]" />
        <Words>Aditya Vahlevy Nugraha</Words>
      </span>
    ),
  },
  {
    name: "Lockup, handle",
    job: "Site header, GitHub, anywhere the name is typed as one word.",
    files: [{ href: "/brand/lockup.svg", label: "lockup.svg" }],
    preview: (
      <span className="flex items-end gap-2.5 text-xl">
        <StaticMark className="h-[1.5em]" />
        <Words>adityavhlvy</Words>
      </span>
    ),
  },
  {
    name: "Mark",
    job: "Avatars, portfolio, stickers. 48 px wide and up.",
    files: [
      { href: "/brand/mark.svg", label: "mark.svg" },
      { href: "/brand/mark-dark.svg", label: "mark-dark.svg" },
      { href: "/brand/mark-1024.png", label: "mark-1024.png" },
    ],
    preview: <StaticMark className="w-28" />,
  },
  {
    name: "Small mark",
    job: "ΛV alone, for anything under 48 px: inline icons, small avatars, watermarks in a corner.",
    files: [{ href: "/brand/mark-small.svg", label: "mark-small.svg" }],
    preview: <StaticMark small className="h-14" />,
  },
  {
    name: "Favicon",
    job: "Browser tabs and bookmarks. Drawn on the 16 px grid. Follows the system light or dark setting on its own.",
    files: [{ href: "/favicon.svg", label: "favicon.svg" }],
    preview: (
      <span className="flex items-end gap-5">
        {[16, 32, 48].map((s) => (
          <span key={s} className="flex flex-col items-center gap-2">
            <img src="/favicon.svg" width={s} height={s} alt="" />
            <span className="label">{s}</span>
          </span>
        ))}
      </span>
    ),
  },
  {
    name: "App icon",
    job: `Home screen shortcut and installed web app. The mark on a night tile, 1/φ of the tile wide.`,
    files: [
      { href: "/brand/app-icon.svg", label: "app-icon.svg" },
      { href: "/apple-touch-icon.png", label: "apple-touch-icon.png" },
      { href: "/brand/icon-192.png", label: "icon-192.png" },
      { href: "/brand/icon-512.png", label: "icon-512.png" },
    ],
    preview: <img src="/brand/app-icon.svg" width={80} height={80} alt="" className="size-20" />,
  },
  {
    name: "Loader",
    job: "First paint and page changes. The only version that loops, because loading is still happening.",
    files: [{ href: "/brand/loader.svg", label: "loader.svg" }],
    preview: <MarkLoader className="w-24" label="Loader preview" />,
  },
  {
    name: "One colour",
    job: "Stamps, embossing, single-ink print. Takes the colour of the text around it.",
    files: [{ href: "/brand/mark-mono.svg", label: "mark-mono.svg" }],
    preview: <StaticMark className="w-28 text-mute" />,
  },
];

function KitSection() {
  return (
    <Section id="kit" label="06 · Kit" title="One version *per* job.">
      <ul className="border-t border-line">
        {KIT.map((k) => (
          <li key={k.name} className="grid gap-6 border-b border-line py-8 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-12">
            <div className="flex h-32 items-center justify-center overflow-hidden bg-sunk px-3">{k.preview}</div>
            <div>
              <h3 className="text-xl font-semibold">{k.name}</h3>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-mute">{k.job}</p>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:items-end">
              {k.files.map((f) => (
                <li key={f.href}>
                  <a href={f.href} download className="link inline-flex items-center gap-1.5 font-mono text-sm">
                    <PiArrowDownBold aria-hidden="true" className="text-mute" /> {f.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

function MotionCard({ title, body, children, action }: { title: string; body: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex aspect-square items-center justify-center bg-sunk p-12">{children}</div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mute">{body}</p>
        </div>
        {action}
      </div>
    </div>
  );
}

function PlayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className={clsx(buttonClass("outline"), "shrink-0")} aria-label={label}>
      <PiArrowCounterClockwiseBold aria-hidden="true" />
      <Roll>Play</Roll>
    </button>
  );
}

function MotionSection() {
  const [arrival, setArrival] = useState(0);
  const [replaying, replay] = useReplay(700);

  return (
    <Section id="motion" label="07 · Motion" title="It moves like a *pen*, not a sticker.">
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        <MotionCard
          title="Arrival"
          body="The zigzag writes itself along its spine, once, then the wave follows on top."
          action={<PlayButton onClick={() => setArrival((a) => a + 1)} label="Replay arrival" />}
        >
          <LogoMark key={arrival} className="w-full max-w-56" />
        </MotionCard>
        <MotionCard
          title="Touch"
          body="Hover or focus the logo in the header. The wave redraws over the sharp line."
          action={<PlayButton onClick={replay} label="Play touch" />}
        >
          <LogoMark arrive={false} replay={replaying} className="w-full max-w-56" />
        </MotionCard>
        <MotionCard title="Loading" body="The only loop. A pen runs the line over a faint copy. Under reduced motion it holds still.">
          <MarkLoader className="w-full max-w-56" label="Loader preview" />
        </MotionCard>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Misuse                                                              */
/* ------------------------------------------------------------------ */

const DONTS: { note: string; mark: ReactNode }[] = [
  { note: "Use the full mark under 48 px. The counters close. Use ΛV.", mark: <StaticMark className="w-8" /> },
  { note: "Stretch or slant it. Every stroke shares one angle.", mark: <StaticMark className="w-[55%] scale-x-150 skew-x-12" /> },
  {
    note: "Draw the wave alone. Without the sharp line it is a squiggle.",
    mark: (
      <svg viewBox={`${B.x} ${B.y} ${B.w} ${B.h}`} aria-hidden="true" className="w-[55%] overflow-visible">
        <path d={MARK.wave} fill="none" className="stroke-ink" strokeWidth={MARK.t} />
      </svg>
    ),
  },
  { note: "Turn it over. Upside down the A reads as V.", mark: <StaticMark className="w-[55%] rotate-180" /> },
  { note: "Add glow or gradient. It is one flat ink.", mark: <StaticMark className="w-[55%] drop-shadow-[0_0_8px_var(--sea)]" /> },
];

function MisuseSection() {
  return (
    <Section id="misuse" label="08 · Keep it" title="Five ways to *break* it.">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
        {DONTS.map((d) => (
          <li key={d.note}>
            <div className="relative flex aspect-square items-center justify-center bg-sunk">
              {d.mark}
              <span aria-hidden="true" className="absolute top-3 left-3 font-mono text-xs text-mute">
                Don&apos;t
              </span>
              <svg aria-hidden="true" viewBox="0 0 10 10" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
                <line x1={0} y1={10} x2={10} y2={0} className="stroke-mute" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              <span className="sr-only">Don&apos;t: </span>
              {d.note}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Brand() {
  useTitle("Brand");
  const [replaying, replay] = useReplay(700);
  return (
    <>
      <header className={clsx(wrap, "grid gap-12 pt-32 pb-20 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:items-end md:gap-20 md:pt-40 md:pb-28")}>
        <div>
          <p className="label mb-6">Brand · Aditya Vahlevy Nugraha</p>
          <RiseWords as="h1" text="A, V, and N in *five* strokes." className="display max-w-[14ch] text-[clamp(2.75rem,7vw,6.5rem)]" />
          <Reveal delay={0.25} className="prose-body mt-8 text-lg">
            A drops its bar and becomes Λ. Joined to a V, it makes an N. So one zigzag carries all three initials. A wave
            runs the same path with every turn rounded: the sharp line is how I build software, the curve is the person
            building it. Every measure comes from one height and φ = {fix(PHI, 3)}.
          </Reveal>
          <Reveal delay={0.35} className="mt-10 flex flex-wrap gap-3">
            <a href="#kit" className={buttonClass("primary")}>
              <Roll>Get the files</Roll>
            </a>
            <a href="#name" className={buttonClass("outline")}>
              <Roll>Read the mark</Roll>
            </a>
          </Reveal>
        </div>
        <div>
          <button type="button" onClick={replay} className="block w-full bg-sunk p-10 md:p-14" aria-label="Redraw the wave">
            <LogoMark replay={replaying} className="w-full" />
          </button>
          <p className="label mt-3">Click the mark to redraw the wave.</p>
        </div>
      </header>

      <NameSection />
      <ConstructionSection />
      <SizesSection />
      <ColourSection />
      <TypeSection />
      <KitSection />
      <MotionSection />
      <MisuseSection />
    </>
  );
}
