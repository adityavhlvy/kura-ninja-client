import { motion } from "framer-motion";
import { journey, journeyTypeLabel, profile } from "@/data/portfolio";
import { Reveal, RiseWords } from "@/components/Reveal";
import { JourneyLegend, JourneyMarker } from "@/components/JourneyMarker";
import { useTitle } from "@/lib/useTitle";

// Portrait reveal: a small hex opens to a full hex, then squares off into the
// frame. Both polygons use six points in the same order so they interpolate.
const hex = (s: number) =>
  `polygon(50% ${50 - 50 * s}%, ${50 + 43.3 * s}% ${50 - 25 * s}%, ${50 + 43.3 * s}% ${50 + 25 * s}%, 50% ${50 + 50 * s}%, ${50 - 43.3 * s}% ${50 + 25 * s}%, ${50 - 43.3 * s}% ${50 - 25 * s}%)`;
const RECT = "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 0%)";

export default function About() {
  useTitle("About");
  const { bio, skills, philosophy } = profile;

  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-28 md:px-10 md:pt-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-24">
            <motion.img
              src={bio.avatar}
              alt={`Portrait of ${bio.name}`}
              width={720}
              height={1080}
              initial={{ clipPath: hex(0.18) }}
              animate={{ clipPath: [hex(0.18), hex(0.62), RECT] }}
              transition={{ duration: 1.4, times: [0, 0.5, 1], ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
              className="aspect-[2/3] w-full max-w-md bg-sunk object-cover"
            />
            <p className="mt-4 text-sm text-mute">
              {bio.name}, also known as {bio.alias}.
            </p>
          </div>
        </div>

        <div>
          <RiseWords as="h1" text="Hi, I am Aditya." className="display text-[clamp(2.75rem,6.4vw,6rem)]" />
          <Reveal delay={0.2} className="prose-body mt-10 space-y-6 text-[17px]">
            {bio.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal>
            <dl className="mt-12 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="label">Now</dt>
                <dd className="mt-2">{bio.current_role_detail}</dd>
              </div>
              <div>
                <dt className="label">Studied</dt>
                <dd className="mt-2">{bio.degree_detail}</dd>
              </div>
            </dl>
          </Reveal>

          <section aria-labelledby="stack-h" className="mt-24">
            <Reveal>
              <h2 id="stack-h" className="display text-3xl md:text-4xl">What I work with</h2>
            </Reveal>
            <dl className="mt-8">
              {skills.map((g, i) => (
                <Reveal key={g.category} delay={i * 0.05} y={12}>
                  <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[11rem_1fr]">
                    <dt className="label pt-1">{g.category}</dt>
                    <dd className="leading-relaxed">{g.items.join(", ")}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </section>

          <section aria-labelledby="journey-h" className="mt-24">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="journey-h" className="display text-3xl md:text-4xl">Milestones</h2>
              <JourneyLegend />
            </Reveal>
            <ol className="relative mt-10 border-l border-line">
              {[...journey].reverse().map((n) => (
                <li key={n.id} className="relative pb-12 pl-8 last:pb-0">
                  <JourneyMarker type={n.type} className="absolute top-1 -left-2 size-4 bg-paper" />
                  <Reveal y={16}>
                    <p className="font-mono text-xs text-mute">
                      {n.details.date}, {journeyTypeLabel[n.type]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {n.details.role}
                      <span className="font-normal text-mute">, {n.details.company ?? n.label}</span>
                    </h3>
                    <p className="mt-2 max-w-[62ch] leading-relaxed text-mute">{n.details.description}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-medium text-sea">{n.details.highlight}</span>
                      <span className="text-mute">. {n.details.skills.join(", ")}</span>
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          <Reveal className="mt-24 border-t border-ink pt-8">
            <p className="display text-3xl md:text-4xl">{philosophy.vibe_quote}</p>
          </Reveal>
        </div>
      </section>
      <div className="h-28 md:h-40" />
    </>
  );
}
