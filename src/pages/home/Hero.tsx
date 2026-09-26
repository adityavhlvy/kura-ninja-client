import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArchipelagoMap, type Province } from "@/components/ArchipelagoMap";
import { RiseWords, ease } from "@/components/Reveal";
import { Roll } from "@/components/Roll";
import { buttonClass } from "@/components/button";
import { archipelago, profile } from "@/data/portfolio";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [province, setProvince] = useState<Province | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mapY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { bio, contact } = profile;
  // tagline_suffix is "work. Currently ...": the first sentence closes the
  // headline, the rest becomes the subtext.
  const [closing, ...rest] = profile.tagline_suffix.split(/(?<=\.)\s+/);
  const headline = `${profile.tagline} *${profile.tagline_highlight}* ${closing}`;
  const [role, employer] = bio.current_role_detail.split(" at ");

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24">
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-sm text-mute"
        >
          <span className="font-medium text-ink">{bio.name}</span>, {role} at {employer}
        </motion.p>

        <RiseWords
          as="h1"
          text={headline}
          delay={0.15}
          className="display max-w-[14ch] text-[clamp(3rem,8.4vw,8rem)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-8 flex max-w-md flex-col gap-7"
        >
          <p className="text-lg leading-snug text-mute">{rest.join(" ")}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className={buttonClass("primary")}>
              <Roll>See the work</Roll>
            </a>
            <a href={`mailto:${contact.email}`} className={buttonClass("outline")}>
              <Roll>Email me</Roll>
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: mapY }}
        className="relative mt-10 w-full px-2 md:absolute md:right-6 md:bottom-[9vh] md:mt-0 md:w-[64vw] md:px-0 lg:right-10 lg:w-[60vw]"
      >
        <ArchipelagoMap onProvince={setProvince} className="h-auto w-full touch-pan-y" />
        <div className="mx-3 mt-4 flex h-5 items-baseline justify-end gap-3 font-mono text-xs text-mute md:mx-0">
          {province ? (
            <>
              <span className="text-sea">{province.code}</span>
              <span className="text-ink">{province.name}</span>
              <span>{province.cells} cells</span>
            </>
          ) : (
            <span>
              {archipelago.provinces.length} provinces, {archipelago.hexes.length.toLocaleString("en")} cells. Point at one.
            </span>
          )}
        </div>
      </motion.div>
    </section>
  );
}
