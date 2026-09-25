import { useState, useMemo } from "react";
import {
  PiUserLight,
  PiRocketLight,
  PiCpuLight,
  PiQuotesLight,
  PiCodeLight,
} from "react-icons/pi";
import {
  SiTypescript,
  SiPython,
  SiGo,
  SiPostgresql,
  SiReact,
  SiFastapi,
  SiTailwindcss,
  SiQdrant,
  SiDocker,
  SiGit,
  SiGoogleearthengine,
  SiFigma,
  SiStreamlit,
  SiInsomnia,
  SiTurborepo,
  SiZedindustries,
  SiGoogle,
  SiShadcnui,
} from "react-icons/si";
import PageTransition from "../../components/PageTransition";
import JourneyMap from "../../components/JourneyMap";
import profileJson from "../../data/profile.json";
import { playTick } from "@/lib/sound";

interface SkillCategory {
  category: string;
  items: string[];
}

const skillsData = profileJson.skills as SkillCategory[];
const categories = ["All", ...skillsData.map((c) => c.category)];

function getBrandIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("typescript")) return <SiTypescript size={14} />;
  if (n.includes("python")) return <SiPython size={14} />;
  if (n.includes("golang") || n === "go") return <SiGo size={14} />;
  if (n.includes("postgres") || n.includes("postgis") || n.includes("sql"))
    return <SiPostgresql size={14} />;
  if (n.includes("react")) return <SiReact size={14} />;
  if (n.includes("fastapi")) return <SiFastapi size={14} />;
  if (n.includes("tailwind")) return <SiTailwindcss size={14} />;
  if (n.includes("qdrant")) return <SiQdrant size={14} />;
  if (n.includes("docker")) return <SiDocker size={14} />;
  if (n.includes("git") && !n.includes("lab")) return <SiGit size={14} />;
  if (n.includes("earth engine")) return <SiGoogleearthengine size={14} />;
  if (n.includes("figma")) return <SiFigma size={14} />;
  if (n.includes("streamlit")) return <SiStreamlit size={14} />;
  if (n.includes("insomnia")) return <SiInsomnia size={14} />;
  if (n.includes("turborepo") || n.includes("bun")) return <SiTurborepo size={14} />;
  if (n.includes("zed")) return <SiZedindustries size={14} />;
  if (n.includes("adk") || n.includes("google")) return <SiGoogle size={14} />;
  if (n.includes("shadcn")) return <SiShadcnui size={14} />;
  return <PiCodeLight size={14} />;
}

export default function About() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skillsData;
    return skillsData.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        {/* Header & Bio Section */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
            <PiUserLight size={14} />
            <span>Profile & Background</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            About Aditya Vahlevy Nugraha
          </h1>

          <div className="double-bezel">
            <div className="double-bezel-inner p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold">
                  {profileJson.bio.alias}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {profileJson.bio.degree_detail}
                </span>
              </div>

              <div className="space-y-4 text-sm md:text-base text-foreground/85 leading-relaxed font-sans">
                {profileJson.bio.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Development Philosophy Quote */}
              <div className="pt-4 border-t border-border/50 flex items-start gap-3">
                <PiQuotesLight size={24} className="text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-serif-accent text-lg sm:text-xl text-primary leading-snug">
                    &quot;{profileJson.philosophy.quote}&quot;
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {profileJson.philosophy.comment} {profileJson.philosophy.vibe_quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Career Timeline */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-left">
            <PiRocketLight size={18} className="text-primary" />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Career Trajectory & Milestones
            </h2>
          </div>
          <JourneyMap />
        </section>

        {/* Skills & Arsenal Matrix */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-left">
            <PiCpuLight size={18} className="text-primary" />
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Technical Arsenal & Proficiencies
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-card border border-border/70 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  playTick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((cat, idx) => (
              <div key={idx} className="double-bezel h-full">
                <div className="double-bezel-inner p-5 space-y-3 h-full flex flex-col justify-between">
                  <span className="font-mono text-xs uppercase font-bold text-primary tracking-wider block">
                    {cat.category}
                  </span>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 border border-border/50 text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors font-mono text-xs"
                      >
                        <span className="text-muted-foreground shrink-0">
                          {getBrandIcon(item)}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
