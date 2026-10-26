import { Hero } from "./home/Hero";
import { Flagships } from "./home/Flagships";
import { WorkIndex } from "./home/WorkIndex";
import { Journey } from "./home/Journey";
import { AboutBrief } from "./home/AboutBrief";
import { WriteTo } from "./home/WriteTo";
import { useTitle } from "@/lib/useTitle";

// The claim, the three platforms, the rest of the work, the path on the map,
// the short story, and the address as the close.
export default function Home() {
  useTitle();
  return (
    <>
      <Hero />
      <Flagships />
      <WorkIndex />
      <Journey />
      <AboutBrief />
      <WriteTo />
    </>
  );
}
