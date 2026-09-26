import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import clsx from "clsx";
import { PiArrowDownBold, PiArrowCounterClockwiseBold, PiCheckBold, PiCopyBold } from "react-icons/pi";
import { LogoMark, StaticMark, SunLoader } from "@/components/LogoMark";
import { Reveal, RiseWords } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import { cellsPath, cutCells, MARK_N, sunCells } from "@/lib/sunPixel";
import { useTitle } from "@/lib/useTitle";

const N = MARK_N;
const MID = (N - 1) / 2;
const SUN = sunCells(N);
const CUT = cutCells(N);
const V_TOP = Math.min(...CUT.map((c) => c.y));
const wrap = "mx-auto max-w-[1440px] px-5 md:px-10";

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

/* ------------------------------------------------------------------ */
/* Hero: the mark leans away from the pointer, like light off a surface */
/* ------------------------------------------------------------------ */

function PointerMark() {
  const ref = useRef<SVGSVGElement>(null);
  const [p, setP] = useState<{ x: number; y: number } | null>(null);
  const [rippling, ripple] = useReplay(1000);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    setP({ x: ((e.clientX - r.left) / r.width) * N, y: ((e.clientY - r.top) / r.height) * N });
  };

  return (
    <button
      type="button"
      onClick={ripple}
      onPointerMove={onMove}
      onPointerLeave={() => setP(null)}
      className="block w-full cursor-crosshair"
      aria-label="Play the ripple on the mark"
    >
      <svg
        ref={ref}
        viewBox={`0 0 ${N} ${N}`}
        aria-hidden="true"
        className={clsx("sun-mark w-full overflow-visible", rippling && "is-rippling")}
      >
        {/* Seamless copy at rest, hidden while the pointer moves the cells. */}
        <g className="sun-base sun-base-in" style={{ opacity: p ? 0 : 1 }}>
          <path d={cellsPath(SUN.filter((c) => !c.core))} className="fill-ink" />
          <path d={cellsPath(SUN.filter((c) => c.core))} className="fill-sea" />
        </g>
        {SUN.map((c) => {
          const d = p ? Math.hypot(c.x + 0.5 - p.x, c.y + 0.5 - p.y) : Infinity;
          const scale = Math.min(1, Math.max(0.3, d / 3.2));
          return (
            <g
              key={`${c.x}-${c.y}`}
              className="sun-in"
              style={{ "--row": c.y / N } as CSSProperties}
            >
              <g
                style={{
                  transform: `scale(${scale})`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <rect
                  x={c.x}
                  y={c.y}
                  width={1.02}
                  height={1.02}
                  className={clsx("sun-cell", c.core ? "fill-sea" : "fill-ink")}
                  style={{ "--dist": Math.hypot(c.x - MID, c.y - MID) / MID } as CSSProperties}
                />
              </g>
            </g>
          );
        })}
        <rect x={-0.5} y={0} width={N + 1} height={0.12} className="sun-sweep fill-sea" style={{ "--span": `${N}px` } as CSSProperties} />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Name: each part of the name lights its part of the mark             */
/* ------------------------------------------------------------------ */

type Part = "sun" | "v" | "core" | "pixel";

const NAME: { part: Part; key: string; word: string; body: string }[] = [
  {
    part: "sun",
    key: "A",
    word: "Aditya",
    body: "Sanskrit for the sun. It is the first name and the largest shape, so the whole mark is a disc.",
  },
  {
    part: "v",
    key: "V",
    word: "Vahlevy",
    body: "Cut out of the sun, not drawn on top of it. The two arms close on one cell, the way a good analysis narrows a whole scene down to one answer.",
  },
  {
    part: "core",
    key: "N",
    word: "Nugraha",
    body: "From the Sanskrit anugraha, a gift or grace, anugerah in Indonesian. It is the one cell that is not sun: sea, at the centre, where the V lands.",
  },
  {
    part: "pixel",
    key: "px",
    word: "The pixel",
    body: "The sun is recorded, not drawn. Square cells, like a Sentinel-2 scene, the imagery behind my rice-yield research. Square also keeps the site's rule: square corners everywhere.",
  },
];

function NameMark({ part }: { part: Part | null }) {
  const dim = (on: boolean) => (part && !on ? 0.14 : 1);
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} aria-hidden="true" className="w-full" shapeRendering="crispEdges">
      <g style={{ opacity: dim(part === "sun" || part === "pixel"), transition: "opacity 300ms" }}>
        {SUN.filter((c) => !c.core).map((c) => {
          const inset = part === "pixel" ? 0.09 : 0;
          return (
            <rect
              key={`${c.x}-${c.y}`}
              x={c.x + inset}
              y={c.y + inset}
              width={1 - inset * 2 + 0.02}
              height={1 - inset * 2 + 0.02}
              className="fill-ink"
              style={{ transition: "x 300ms, y 300ms, width 300ms, height 300ms" }}
            />
          );
        })}
      </g>
      <path
        d={cellsPath(CUT)}
        className="fill-sea"
        style={{ opacity: part === "v" ? 1 : 0, transition: "opacity 300ms" }}
      />
      <rect
        x={MID}
        y={MID}
        width={1}
        height={1}
        className="fill-sea"
        style={{ opacity: dim(part === "core" || part === "v"), transition: "opacity 300ms" }}
      />
      {part === "core" && (
        <rect x={MID - 0.35} y={MID - 0.35} width={1.7} height={1.7} fill="none" className="stroke-sea" strokeWidth={0.08} />
      )}
    </svg>
  );
}

function NameSection() {
  const [part, setPart] = useState<Part | null>(null);
  return (
    <Section id="name" label="01 · The name" title="Three words, *one* shape.">
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
                  className={clsx(
                    "display text-[clamp(2.25rem,4vw,3.5rem)] transition-colors",
                    part === n.part && "text-sea",
                  )}
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

type Guide = "grid" | "disc" | "v" | "core" | "space" | "size";

const RULES: { guide: Guide; title: string; body: string }[] = [
  { guide: "grid", title: `${N} × ${N} grid`, body: "An odd count, so one cell sits exactly at the centre." },
  { guide: "disc", title: "Disc", body: `A cell is sun when its centre lies within ${MID + 0.6} cells of the centre. The extra 0.6 keeps the rim round without stray corner pixels.` },
  { guide: "v", title: "V", body: "Climbs from the centre at 45°, one cell wide, and stops before the rim, so the outline never breaks." },
  { guide: "core", title: "Core", body: "The centre cell is sea. It is the only colour in the mark." },
  { guide: "space", title: "Clear space", body: "Two cells on every side. Nothing else enters it, including the wordmark." },
  { guide: "size", title: "Smallest size", body: "16 px on screen, 8 mm in print. From 32 px up each cell is at least 2 px wide and the V reads cleanly." },
];

function ConstructionSection() {
  const [g, setG] = useState<Guide | null>(null);
  const show = (k: Guide) => g === null || g === k;
  const fade = { transition: "opacity 250ms" };
  const cells = Array.from({ length: N + 1 }, (_, i) => i);

  return (
    <Section id="construction" label="02 · Shape" title="Built on a grid, *not* by eye.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-20">
        <div className="bg-sunk p-4 md:p-8">
          <svg viewBox={`-3 -3 ${N + 6} ${N + 6}`} className="w-full" role="img" aria-label="Construction drawing of the mark with its grid, disc, V, core, and clear space">
            <path
              d={cellsPath(SUN.filter((c) => !c.core))}
              className="fill-ink"
              style={{ opacity: g && g !== "disc" && g !== "size" ? 0.2 : 0.92, ...fade }}
            />
            {/* Grid sits over the cells, so it reads across ink and paper alike. */}
            <g className="stroke-mute" strokeWidth={0.03} style={{ opacity: g === "grid" ? 0.9 : 0.35, ...fade }}>
              {cells.map((i) => (
                <g key={i}>
                  <line x1={i} y1={0} x2={i} y2={N} />
                  <line x1={0} y1={i} x2={N} y2={i} />
                </g>
              ))}
            </g>
            <rect x={MID} y={MID} width={1} height={1} className="fill-sea" style={{ opacity: show("core") ? 1 : 0.25, ...fade }} />

            <circle cx={N / 2} cy={N / 2} r={MID + 0.6} fill="none" className="stroke-sea" strokeWidth={0.07} strokeDasharray="0.3 0.2" style={{ opacity: g === "disc" ? 1 : 0, ...fade }} />
            <polyline
              points={`${V_TOP + 0.5},${V_TOP + 0.5} ${N / 2},${N / 2} ${N - V_TOP - 0.5},${V_TOP + 0.5}`}
              fill="none"
              className="stroke-sea"
              strokeWidth={0.1}
              style={{ opacity: g === "v" ? 1 : 0, ...fade }}
            />
            <path d={cellsPath(CUT)} className="fill-sea" style={{ opacity: g === "v" ? 0.35 : 0, ...fade }} />
            <rect x={MID - 0.3} y={MID - 0.3} width={1.6} height={1.6} fill="none" className="stroke-sea" strokeWidth={0.08} style={{ opacity: g === "core" ? 1 : 0, ...fade }} />
            <g style={{ opacity: g === "space" ? 1 : 0, ...fade }}>
              <rect x={-2} y={-2} width={N + 4} height={N + 4} fill="none" className="stroke-sea" strokeWidth={0.07} strokeDasharray="0.3 0.2" />
              <rect x={-2} y={MID} width={2} height={1} className="fill-sea" opacity={0.35} />
              <rect x={N} y={MID} width={2} height={1} className="fill-sea" opacity={0.35} />
            </g>
            <g className="fill-mute font-mono" fontSize={0.55}>
              <text x={0} y={-0.5} style={{ opacity: g === "grid" ? 1 : 0, ...fade }}>
                {N} cells
              </text>
              <text x={N / 2 + 0.3} y={N / 2 - MID - 0.5} style={{ opacity: g === "disc" ? 1 : 0, ...fade }}>
                r = {MID + 0.6}
              </text>
              <text x={-2} y={-2.4} style={{ opacity: g === "space" ? 1 : 0, ...fade }}>
                2 cells
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
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Resolution                                                          */
/* ------------------------------------------------------------------ */

const GRIDS = [
  { n: 13, note: "Official. Header, favicon, app icon." },
  { n: 21, note: "Large print, covers, stage screens." },
  { n: 33, note: "Poster size. Texture up close, sun from afar." },
] as const;

function ResolutionSection() {
  const [n, setN] = useState<number>(GRIDS[0].n);
  const active = GRIDS.find((x) => x.n === n)!;
  return (
    <Section id="resolution" label="03 · Resolution" title="Finer grid, *same* sun.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-20">
        <div className="space-y-6">
          <p className="prose-body text-lg">
            Sentinel-2 records the same ground at three resolutions: 10, 20, and 60 metres per pixel. The mark
            follows the same idea. More cells give more detail, and the disc, the V, and the single sea core stay
            the same.
          </p>
          <div role="radiogroup" aria-label="Grid size" className="inline-flex border border-ink/80">
            {GRIDS.map((x) => (
              <button
                key={x.n}
                type="button"
                role="radio"
                aria-checked={x.n === n}
                onClick={() => setN(x.n)}
                className={clsx(
                  "h-11 min-w-20 px-4 font-mono text-sm transition-colors",
                  x.n === n ? "bg-ink text-paper" : "hover:bg-sunk",
                )}
              >
                {x.n} × {x.n}
              </button>
            ))}
          </div>
          <p className="label" aria-live="polite">
            {active.note}
          </p>
        </div>
        <div className="bg-sunk p-10 md:p-16">
          <LogoMark key={n} n={n} className="mx-auto w-full max-w-md" />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

const SUN_SHARE = (SUN.length - 1) / (N * N);
const COLOURS = [
  {
    name: "Ink",
    token: "--ink",
    swatch: "bg-ink",
    light: "#121518",
    dark: "#e7e9e4",
    contrast: "15.7 : 1 on paper",
    body: "The sun is drawn in ink, not yellow. A satellite records light as values, and ink survives every surface: screens, paper, a one-colour stamp.",
    share: SUN_SHARE,
  },
  {
    name: "Paper",
    token: "--paper",
    swatch: "bg-paper border border-line",
    light: "#eceee9",
    dark: "#0e1113",
    contrast: "Ground for everything",
    body: "Cool chart paper, the ground a map is printed on. In dark mode it becomes the night side of the orbit.",
    share: 1 - SUN_SHARE - 1 / (N * N),
  },
  {
    name: "Sea",
    token: "--sea",
    swatch: "bg-sea",
    light: "#1f3fd1",
    dark: "#8098ff",
    contrast: "6.7 : 1 light · 7.1 : 1 dark",
    body: "The water between the islands. One cell in the mark, and on the site only the one thing per view that matters most.",
    share: 1 / (N * N),
  },
];

function ColourSection() {
  return (
    <Section id="colour" label="04 · Colour" title="Two neutrals, *one* sea.">
      <div className="mb-3 flex h-20 w-full overflow-hidden md:h-28" aria-hidden="true">
        {COLOURS.map((c) => (
          <div key={c.name} className={clsx(c.swatch, "h-full")} style={{ flexGrow: c.share, minWidth: "0.75rem" }} />
        ))}
      </div>
      <p className="label mb-12">
        Widths follow the mark: {SUN.length - 1} ink cells, one sea cell, paper for the rest of the {N} × {N} square.
      </p>
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
      </div>
      <p className="mt-12 max-w-[64ch] text-sm leading-relaxed text-mute">
        Against ink, the sea core measures 2.3 : 1. That is fine for an identity detail, and it is why the mark
        never depends on colour: the one-colour version keeps the core as an open cell and still reads.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

function TypeSection() {
  return (
    <Section id="type" label="05 · Type" title="Written the way it is *typed*.">
      <div className="flex flex-wrap items-center gap-x-[0.35em] gap-y-6 text-[clamp(2.5rem,9vw,8.5rem)] leading-none">
        <StaticMark className="size-[0.82em]" />
        <span className="font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_112]">adityavhlvy</span>
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">Wordmark</h3>
          <p className="mt-2 text-sm leading-relaxed text-mute">
            The handle, lowercase and in one piece, the way it appears in every URL and username. Archivo
            Semibold at width 112, tracking −3%. Gap to the mark: one third of the mark&apos;s width.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Archivo</h3>
          <p className="mt-2 text-3xl [font-variation-settings:'wdth'_118]" style={{ fontWeight: 760 }}>
            Words, headlines
          </p>
          <p className="mt-2 text-sm text-mute">One family. The width axis does the work a second display font would.</p>
        </div>
        <div>
          <h3 className="font-semibold">IBM Plex Mono</h3>
          <p className="mt-2 font-mono text-2xl">2026 · #1f3fd1</p>
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
    name: "Lockup",
    job: "Site header, CV, slides, documents. The default when there is room for the name.",
    files: [{ href: "/brand/lockup.svg", label: "lockup.svg" }],
    preview: (
      <span className="flex items-center gap-3 text-2xl">
        <StaticMark className="size-9" />
        <span className="font-semibold tracking-[-0.03em] [font-variation-settings:'wdth'_112]">adityavhlvy</span>
      </span>
    ),
  },
  {
    name: "Mark",
    job: "Avatars, footer, stickers, anywhere square and small.",
    files: [
      { href: "/brand/mark.svg", label: "mark.svg" },
      { href: "/brand/mark-dark.svg", label: "mark-dark.svg" },
      { href: "/brand/mark-1024.png", label: "mark-1024.png" },
    ],
    preview: <StaticMark className="size-20" />,
  },
  {
    name: "Favicon",
    job: "Browser tabs and bookmarks. Follows the system light or dark setting on its own.",
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
    job: "Home screen shortcut and installed web app. Mark on a night tile with two cells of clear space.",
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
    preview: <SunLoader className="size-16" label="Loader preview" />,
  },
  {
    name: "One colour",
    job: "Stamps, embossing, watermarks, single-ink print. The core stays open instead of blue.",
    files: [{ href: "/brand/mark-mono.svg", label: "mark-mono.svg" }],
    preview: <StaticMark className="size-20" core="fill-transparent" />,
  },
];

function KitSection() {
  return (
    <Section id="kit" label="06 · Kit" title="One version *per* job.">
      <ul className="border-t border-line">
        {KIT.map((k) => (
          <li key={k.name} className="grid gap-6 border-b border-line py-8 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-12">
            <div className="flex h-32 items-center justify-center bg-sunk">{k.preview}</div>
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
  const [rippling, ripple] = useReplay(1000);

  return (
    <Section id="motion" label="07 · Motion" title="It moves like a *sensor*, not a sticker.">
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        <MotionCard
          title="Arrival"
          body="Rows scan in from top to bottom behind a sea line, once, the way a push-broom sensor builds an image."
          action={<PlayButton onClick={() => setArrival((a) => a + 1)} label="Replay arrival" />}
        >
          <LogoMark key={arrival} className="w-full max-w-48" />
        </MotionCard>
        <MotionCard
          title="Touch"
          body="Hover or focus the logo in the header. A ripple leaves the sea core and every pixel dips, so the grid shows itself."
          action={<PlayButton onClick={ripple} label="Play touch ripple" />}
        >
          <LogoMark arrive={false} rippling={rippling} className="w-full max-w-48" />
        </MotionCard>
        <MotionCard
          title="Loading"
          body="The only loop. Rows light and fade in scan order while a page loads. Under reduced motion it holds still."
        >
          <SunLoader className="w-full max-w-48" label="Loader preview" />
        </MotionCard>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Misuse                                                              */
/* ------------------------------------------------------------------ */

const DONTS: { note: string; mark: ReactNode }[] = [
  { note: "Round the pixels. It stops being a recording.", mark: <StaticMark rounded className="size-[45%]" /> },
  { note: "Paint the sun yellow. The light is data, so it is ink.", mark: <StaticMark className="size-[45%]" sun="fill-[#e8b100]" /> },
  { note: "Turn it. The V always opens to the sky.", mark: <StaticMark className="size-[45%] rotate-180" /> },
  { note: "Go below 13 cells. The V turns into a face.", mark: <StaticMark n={9} className="size-[45%]" /> },
  {
    note: "Add glow or gradient. The sea is one flat cell.",
    mark: <StaticMark className="size-[45%]" style={{ filter: "drop-shadow(0 0 6px var(--sea)) drop-shadow(0 0 14px var(--sea))" }} />,
  },
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
  return (
    <>
      <header className={clsx(wrap, "grid gap-12 pt-32 pb-20 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-20 md:pt-40 md:pb-28")}>
        <div>
          <p className="label mb-6">Brand · adityavhlvy</p>
          <RiseWords as="h1" text="The sun, the way a *satellite* sees it." className="display max-w-[14ch] text-[clamp(2.75rem,7vw,6.5rem)]" />
          <Reveal delay={0.25} className="prose-body mt-8 text-lg">
            Aditya means sun. A lot of my work starts from sunlight that bounced off Indonesia and reached a
            satellite, read one pixel at a time. So the mark is the sun as a sensor records it: a disc of square cells, with a V cut in
            and a single cell of sea at the centre.
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
          <div className="bg-sunk p-10 md:p-14">
            <PointerMark />
          </div>
          <p className="label mt-3">Move over the mark. Click it for the ripple.</p>
        </div>
      </header>

      <NameSection />
      <ConstructionSection />
      <ResolutionSection />
      <ColourSection />
      <TypeSection />
      <KitSection />
      <MotionSection />
      <MisuseSection />
    </>
  );
}
