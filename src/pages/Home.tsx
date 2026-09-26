import { Hero } from "./home/Hero";
import { Flagships } from "./home/Flagships";
import { WorkIndex } from "./home/WorkIndex";
import { Journey } from "./home/Journey";
import { Philosophy } from "./home/Philosophy";
import { EmailBlock } from "@/components/EmailBlock";
import { Reveal } from "@/components/Reveal";
import { useTitle } from "@/lib/useTitle";

export default function Home() {
  useTitle();
  return (
    <>
      <Hero />
      <Flagships />
      <WorkIndex />
      <Journey />
      <Philosophy />
      <section className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <h2 className="mb-6 text-lg text-mute">Working on something with maps, agents, or both?</h2>
          <EmailBlock />
        </Reveal>
      </section>
    </>
  );
}
