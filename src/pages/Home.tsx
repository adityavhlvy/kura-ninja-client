import { Hero } from "./home/Hero";
import { Flagships } from "./home/Flagships";
import { WorkIndex } from "./home/WorkIndex";
import { AboutBrief } from "./home/AboutBrief";
import { WriteTo } from "./home/WriteTo";
import { useTitle } from "@/lib/useTitle";

// Who and what under the pinned name, the three platforms as full screens,
// the rest as a line-up, the short story, and the address as the close.
export default function Home() {
  useTitle();
  return (
    <>
      <Hero />
      <Flagships />
      <WorkIndex />
      <AboutBrief />
      <WriteTo />
    </>
  );
}
