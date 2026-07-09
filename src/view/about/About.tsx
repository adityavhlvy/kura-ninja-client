import { SlLayers, SlUser, SlRocket } from "react-icons/sl";
import { GrOracle } from "react-icons/gr";
import {
  SiPython,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiGit,
  SiPytorch,
  SiSatellite,
  SiGoogleearthengine,
} from "react-icons/si";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import JourneyMap from "../../components/JourneyMap";
import ParallaxMountains from "../../components/svg/ParallaxMountains";
import KuraTurtle from "../../components/svg/KuraTurtle";
import type { ReactNode } from "react";

interface SkillCategory {
  category: string;
  items: { name: string; icon: ReactNode; color?: string }[];
}

const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", icon: <SiPython /> },
      { name: "Go", icon: <SiGo /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Vue.js", icon: <SiVuedotjs /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Go Fiber v3", icon: <SiGo /> },
      { name: "Node.js (Bun)", icon: <SiNodedotjs /> },
      { name: "Laravel", icon: <SiLaravel /> },
      { name: "ASP.NET Core", icon: <SiNodedotjs /> },
    ],
  },
  {
    category: "AI & Data Science",
    items: [
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "LightGBM", icon: <SiPython /> },
      { name: "Sentinel-2", icon: <SiSatellite /> },
      { name: "Google Earth Engine", icon: <SiGoogleearthengine /> },
    ],
  },
  {
    category: "Data & GIS",
    items: [
      { name: "PostGIS", icon: <SiPostgresql /> },
      { name: "Oracle DB", icon: <GrOracle /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Docker", icon: <SiDocker /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "Antigravity", icon: <SlRocket /> },
    ],
  },
];

export default function About() {
  return (
    <PageTransition className="container mx-auto max-w-5xl p-4 space-y-20 relative">
      {/* Global Background Effects */}
      <BackgroundEffects />

      {/* Hero / About Me Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <PageHeader
          title="Who am I?"
          description={
            <div className="space-y-4">
              Hey there! I&apos;m{" "}
              <span className="font-bold text-primary">
                Aditya Vahlevy Nugraha
              </span>{" "}
              (aka Kura Ninja). A Computer Science graduate from Universitas
              Pertamina (Cum Laude, GPA 3.58) and currently a{" "}
              <span className="font-bold text-primary">
                Fullstack Developer at PT Pupuk Indonesia (Persero)
              </span>
              .
              <p>
                My expertise lies at the intersection of{" "}
                <span className="font-bold text-secondary">
                  Geospatial Intelligence
                </span>
                , <span className="font-bold text-accent">AI/ML</span>, and{" "}
                <span className="font-bold text-primary">
                  Fullstack Development
                </span>
                . Currently engineering{" "}
                <span className="font-bold text-primary">
                  AeGIS Module Atlas
                </span>{" "}
                — a geospatial dashboard for fertilizer demand visualization and
                soil nutrient analysis (Go Fiber v3, React 19, OpenLayers,
                PostgreSQL),{" "}
                <span className="font-bold text-primary">PINTER</span> — an AI
                agent orchestration platform with a visual builder canvas and
                multi-agent workflows (FastAPI, Google ADK, React Flow, TanStack
                Router), and{" "}
                <span className="font-bold text-primary">
                  NEXUS Module Delta & Vista
                </span>{" "}
                — an enterprise logistics coordination and automated route
                pathfinding platform (FastAPI, React 19, OpenLayers).
              </p>
              <p>
                I have a background in predictive modeling (Satellite Imagery +
                Deep Learning) and have spent time in the industry digitizing
                mission-critical operations at{" "}
                <span className="font-bold">Astra Otoparts</span>. Whether
                it&apos;s architecting Clean Architecture systems or fine-tuning
                LightGBM models with Optuna, I thrive on solving complex
                problems with code.
              </p>
              <p>
                Beyond the screen, I&apos;m an APERTI BUMN Scholarship awardee,
                a former Vice President of my student association, and someone
                who probably thinks about system design way too much at 2am.
              </p>
              <div className="bg-muted/50 border-l-4 border-primary rounded-r-lg mt-6 text-sm not-italic flex items-center gap-4 p-4 hover:bg-muted transition-colors">
                <SlUser className="text-2xl text-primary opacity-50 shrink-0" />
                <div>
                  <h3 className="font-serif-accent text-primary mb-0 text-lg">
                    &quot;If it works, don&apos;t touch it. If it breaks, blame
                    the compiler.&quot;
                  </h3>
                  <div className="text-xs opacity-50 mt-1">
                    — My actual development philosophy.
                  </div>
                </div>
                <KuraTurtle size={56} className="shrink-0 hidden md:block" />
              </div>
            </div>
          }
        />
      </motion.section>

      {/* Interactive Journey Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <SlRocket className="text-2xl text-primary" />
          <h2 className="text-2xl font-bold">The Journey So Far</h2>
        </div>
        <JourneyMap />
      </motion.section>

      {/* Parallax Mountains — section divider */}
      <ParallaxMountains className="my-8 opacity-70" />

      {/* Skills Section */}
      <section className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-10"
        >
          <SlLayers className="text-3xl text-primary" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((category, index) => (
            <SpotlightCard
              key={index}
              title={category.category}
              badge={`${category.items.length} items`}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-sm bg-card/50 border border-border/50"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
