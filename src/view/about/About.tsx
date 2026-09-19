import { useState, useMemo, type ReactNode } from "react";
import { SlLayers, SlUser, SlRocket } from "react-icons/sl";
import { GrOracle } from "react-icons/gr";
import profileJson from "../../data/profile.json";
import DecryptedText from "../../components/motion/DecryptedText";
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
  SiVercel,
} from "react-icons/si";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import JourneyMap from "../../components/JourneyMap";
import KuraTurtle from "../../components/svg/KuraTurtle";

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
      { name: "Vercel", icon: <SiVercel /> },
    ],
  },
];

const totalSkills = skillsData.reduce((acc, cat) => acc + cat.items.length, 0);
const categories = ["All", ...skillsData.map((c) => c.category)];

export default function About() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skillsData;
    return skillsData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);
  return (
    <PageTransition className="container mx-auto max-w-6xl p-6 space-y-20 relative">
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
          subtitle="biography.md"
          description={
            <div className="space-y-4">
              <p>
                Hey there! I&apos;m{" "}
                <span className="font-bold text-primary">
                  {profileJson.bio.name}
                </span>{" "}
                (aka {profileJson.bio.alias}). {profileJson.bio.degree_detail}{" "}
                and currently a{" "}
                <span className="font-bold text-primary">
                  {profileJson.bio.current_role_detail}
                </span>
                .
              </p>
              {profileJson.bio.paragraphs.map((pText, pIdx) => (
                <p key={pIdx}>{pText}</p>
              ))}
              <div className="bg-muted/30 border border-border/50 rounded-sm mt-8 p-5 font-mono text-xs relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-1.5 mb-3 border-b border-border/20 pb-2">
                  <span className="w-2 h-2 rounded-full bg-primary/45" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {profileJson.philosophy.shell}
                  </span>
                </div>
                <div className="text-foreground/90 space-y-1">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold select-none shrink-0">
                      $
                    </span>
                    <h3 className="font-serif-accent text-primary mb-0 text-xl leading-snug italic">
                      &quot;{profileJson.philosophy.quote}&quot;
                    </h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground/60 mt-3 pl-5">
                    # {profileJson.philosophy.comment}
                  </p>
                </div>
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
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            <DecryptedText text="The Journey So Far" animateOn="both" />
          </h2>
        </div>
        <JourneyMap />
      </motion.section>

      {/* Skills Section */}
      <section className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-2 mb-6"
        >
          <div className="flex items-center gap-3">
            <SlLayers className="text-2xl text-primary" />
            <h2 className="text-2xl md:text-3xl font-black">
              <DecryptedText
                text="Skills & Technical Arsenal"
                animateOn="both"
              />
            </h2>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            status: active // proficiencies: {totalSkills} tools
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? totalSkills
                : (skillsData.find((s) => s.category === cat)?.items.length ??
                  0);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "All" : cat)
                }
                className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold border-primary shadow-sm shadow-primary/30 scale-[1.02]"
                    : "bg-card/40 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card/80"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-xs transition-colors ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground font-bold"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((category, index) => (
            <SpotlightCard
              key={category.category}
              title={category.category}
              badge={`${category.items.length} items`}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-sm bg-card/45 border border-border/40 hover:border-primary/80 hover:bg-card/90 hover:scale-[1.04] hover:shadow-[0_0_15px_rgba(240,160,48,0.15)] active:scale-[0.98] transition-all duration-200 select-none group/item cursor-default"
                  >
                    <span className="text-lg text-muted-foreground group-hover/item:text-primary group-hover/item:scale-110 transition-all duration-200">
                      {item.icon}
                    </span>
                    <span className="text-xs font-mono font-medium tracking-tight text-foreground/85 group-hover/item:text-foreground transition-colors duration-200">
                      {item.name}
                    </span>
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
