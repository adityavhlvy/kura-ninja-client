import { useState } from "react";
import { motion } from "framer-motion";
import { ArchipelagoMap, type Province } from "@/components/ArchipelagoMap";
import { Reveal, ease } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import { archipelago, flagships, profile, projects } from "@/data/portfolio";
import { wrap } from "@/lib/wrap";

// The handle adityavhlvy is Aditya + Vahlevy, so the name is set in those two
// halves, one per line. Who, what, and three facts sit right under it; the
// portrait takes the right columns. Content sets the height, not the screen,
// so there is no empty band in the middle.
const gpa = /GPA ([\d.]+)/.exec(profile.bio.degree_detail)?.[1];
const FACTS = [
  { value: String(flagships.length), label: "platforms I am building at Pupuk Indonesia" },
  { value: String(projects.length), label: "projects in the portfolio" },
  ...(gpa ? [{ value: gpa, label: "GPA, Computer Science, cum laude" }] : []),
];

function Intro() {
  const { bio, contact } = profile;
  const [first, second] = bio.name.split(" ");
  return (
    <div className={`${wrap} grid gap-10 pt-24 pb-20 md:pt-28 lg:grid-cols-12 lg:gap-6 lg:pb-28`}>
      <div className="lg:col-span-7 lg:flex lg:flex-col">
        <h1 aria-label={bio.name} className="display text-[clamp(3.5rem,15vw,9rem)] leading-[0.85] lg:text-[clamp(4.5rem,9.6vw,9rem)]">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="block"
          >
            {first}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.22 }}
            className="block"
          >
            {second}
          </motion.span>
        </h1>
        <Reveal delay={0.35} className="mt-10">
          <p className="max-w-[34ch] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-snug">
            {bio.current_role_detail.replace("PT ", "").replace(" (Persero)", "")}. I build AI agent platforms and the
            maps that plan fertilizer for Indonesia.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#work" className={buttonClass("primary")}>
              <Roll>See the three platforms</Roll>
            </a>
            <a href={`mailto:${contact.email}`} className="group font-medium text-sea">
              <Roll>Email me</Roll>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.45} className="mt-24 lg:mt-auto lg:pt-14">
          <dl className="grid gap-6 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-sunk p-5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-[clamp(1.375rem,2.5vw,2.25rem)] leading-none font-semibold tracking-tight tabular-nums">
                  {f.value}
                </dd>
                <dd className="mt-2 text-mute">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <div className="overflow-hidden lg:col-span-5 lg:col-start-8">
        <motion.img
          src="/assets/profile-photos/professional-profile.png"
          alt={`${bio.name}, portrait`}
          width={720}
          height={1080}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="aspect-[4/5] w-full bg-sunk object-cover object-top lg:h-full"
        />
      </div>
    </div>
  );
}

/** The live thing: the map of Indonesia, binned into hex cells. */
function MapScreen() {
  const [province, setProvince] = useState<Province | null>(null);
  return (
    <div className="bg-sunk py-20 md:py-28">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6`}>
        <Reveal delay={0.12} className="lg:col-span-4">
          <h2 className="text-[clamp(1.375rem,2.5vw,2.25rem)] leading-tight font-semibold tracking-tight">
            Indonesia, in hex cells
          </h2>
          <p aria-live="polite" className="mt-4 min-h-[4lh] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-snug">
            {province ? (
              <>
                <span className="font-semibold text-sea">{province.name}</span>, {province.cells} cells, binned from the
                real province boundary.
              </>
            ) : (
              <>
                My material is this map: {archipelago.provinces.length} provinces in{" "}
                {archipelago.hexes.length.toLocaleString("en")} cells. Point at one.
              </>
            )}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <ArchipelagoMap onProvince={setProvince} className="h-auto w-full touch-pan-y" />
        </Reveal>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section>
      <Intro />
      <MapScreen />
    </section>
  );
}
