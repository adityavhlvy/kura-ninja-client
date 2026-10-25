import { motion } from "framer-motion";
import { Reveal, ease } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import CountUp from "@/components/rb/CountUp";
import Magnet from "@/components/rb/Magnet";
import { flagships, profile, projects } from "@/data/portfolio";
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
  const [first, middle, last] = bio.name.split(" ");
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
            className="block text-[0.65em]"
          >
            {middle}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.34 }}
            className="block text-[0.65em]"
          >
            {last}
          </motion.span>
        </h1>
        <Reveal delay={0.35} className="mt-10">
          <p className="max-w-[34ch] text-[clamp(1.25rem,1.7vw,1.625rem)] leading-snug">
            {bio.current_role_detail.replace("PT ", "").replace(" (Persero)", "")}. I turn business processes into
            software: AI agents, planning maps, and logistics tools.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnet padding={60} magnetStrength={4} maxOffset={10}>
              <a href="#work" className={buttonClass("primary")}>
                <Roll>See the three platforms</Roll>
              </a>
            </Magnet>
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
                  <CountUp to={Number(f.value)} decimals={f.value.includes(".") ? 2 : 0} duration={1.6} mode="roll" />
                </dd>
                <dd className="mt-2 text-mute">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
      <div className="overflow-hidden lg:col-span-5 lg:col-start-8">
        <motion.img
          src="/assets/profile.webp"
          fetchPriority="high"
          alt={`${bio.name}, portrait`}
          width={720}
          height={1080}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="aspect-[4/5] w-full bg-sunk object-cover object-bottom lg:h-full"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section>
      <Intro />
    </section>
  );
}
