import { useState, useMemo } from "react";
import { SlLayers, SlRocket } from "react-icons/sl";
import { VscCode } from "react-icons/vsc";
import profileJson from "../../data/profile.json";
import {
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGit,
  SiGo,
  SiGoogle,
  SiGoogleearthengine,
  SiInsomnia,
  SiPostgresql,
  SiPython,
  SiQdrant,
  SiReact,
  SiShadcnui,
  SiStreamlit,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiZedindustries,
} from "react-icons/si";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import SpotlightCard from "../../components/SpotlightCard";
import JourneyMap from "../../components/JourneyMap";

interface SkillCategory {
  category: string;
  items: string[];
}

// Sourced from portfolio-data/profile.yml (`skills`), which mirrors the CV.
const skillsData = profileJson.skills as SkillCategory[];

const totalSkills = skillsData.reduce((acc, cat) => acc + cat.items.length, 0);
const categories = ["All", ...skillsData.map((c) => c.category)];

/** Map a skill label to a brand icon; falls back to a generic glyph. */
function SkillIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("typescript")) return <SiTypescript />;
  if (n.includes("python")) return <SiPython />;
  if (n.includes("earth engine")) return <SiGoogleearthengine />;
  if (n.includes("adk") || n.includes("google")) return <SiGoogle />;
  if (n.includes("postgres") || n.includes("postgis") || n.includes("sql"))
    return <SiPostgresql />;
  if (n.includes("react")) return <SiReact />;
  if (n.includes("fastapi")) return <SiFastapi />;
  if (n.includes("tailwind")) return <SiTailwindcss />;
  if (n.includes("shadcn")) return <SiShadcnui />;
  if (n.includes("turborepo") || n.includes("bun")) return <SiTurborepo />;
  if (n.includes("qdrant")) return <SiQdrant />;
  if (n.includes("docker")) return <SiDocker />;
  if (n.includes("figma")) return <SiFigma />;
  if (n.includes("streamlit")) return <SiStreamlit />;
  if (n.includes("insomnia")) return <SiInsomnia />;
  if (n.includes("zed")) return <SiZedindustries />;
  if (n.includes("git")) return <SiGit />;
  if (n.startsWith("go")) return <SiGo />;
  return <VscCode />;
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skillsData;
    return skillsData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);
  return (
    <PageTransition className="container mx-auto max-w-6xl p-6 space-y-20 relative">
      {/* Hero / About Me Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <PageHeader
          title="About"
          subtitle="profile"
          description={
            <div className="space-y-4">
              <p>
                I&apos;m{" "}
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
              <blockquote className="border-l-2 border-primary/40 pl-4 mt-6">
                <p className="font-serif-accent text-primary text-xl leading-snug italic m-0">
                  &quot;{profileJson.philosophy.quote}&quot;
                </p>
              </blockquote>
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
            The Journey So Far
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
            <h2 className="text-2xl md:text-3xl font-black">Skills</h2>
          </div>
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
                    className="flex items-center gap-2.5 pl-3 pr-4 py-2 min-w-0 max-w-full rounded-sm bg-card/45 border border-border/40 hover:border-primary/80 hover:bg-card/90 hover:shadow-[0_0_15px_rgba(240,160,48,0.15)] active:scale-[0.98] transition-all duration-200 select-none group/item cursor-default"
                  >
                    <span className="text-lg shrink-0 text-muted-foreground group-hover/item:text-primary transition-all duration-200">
                      <SkillIcon name={item} />
                    </span>
                    <span className="text-xs font-mono font-medium tracking-tight leading-snug break-words min-w-0 text-left text-foreground/85 group-hover/item:text-foreground transition-colors duration-200">
                      {item}
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
