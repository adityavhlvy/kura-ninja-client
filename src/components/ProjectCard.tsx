import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SlGlobe, SlLock, SlLink } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";
import {
  SiPython,
  SiPandas,
  SiHuggingface,
  SiVuedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiBootstrap,
  SiFigma,
  SiTensorflow,
  SiStreamlit,
  SiGoogleearth,
  SiScikitlearn,
  SiKeras,
  SiOpencv,
  SiPlotly,
  SiDaisyui,
  SiPytorch,
  SiNextdotjs,
  SiChartdotjs,
  SiGo,
  SiPostgresql,
  SiDocker,
  SiBun,
  SiMapbox,
} from "react-icons/si";
import {
  FaDatabase,
  FaRobot,
  FaBrain,
  FaChartBar,
  FaCode,
  FaLeaf,
  FaCloudSun,
  FaPencilRuler,
} from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectLink {
  label: string;
  url: string;
  icon?: ReactNode;
}

export interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  links: ProjectLink[];
  image?: string;
  logo?: string;
  images?: string[];
  rationale?: string;
  competencies?: string[];
  technicalChallenges?: string[];
  readiness?: { tests: number; docs: number; quality: number };
  status: "completed" | "in-progress" | "archived" | "active";
  visibility: "public" | "private";
  date: string;
  details?: string[];
  featured?: boolean;
}

const getTechIcon = (tech: string) => {
  const lowerTech = tech.toLowerCase();

  if (lowerTech.includes("python")) return <SiPython />;
  if (lowerTech.includes("pandas")) return <SiPandas />;
  if (lowerTech.includes("hugging face")) return <SiHuggingface />;
  if (lowerTech.includes("vue")) return <SiVuedotjs />;
  if (lowerTech.includes("tailwind")) return <SiTailwindcss />;
  if (lowerTech.includes("daisy")) return <SiDaisyui />;
  if (lowerTech.includes("node")) return <SiNodedotjs />;
  if (lowerTech.includes("express")) return <SiExpress />;
  if (lowerTech.includes("laravel")) return <SiLaravel />;
  if (lowerTech.includes("mysql")) return <SiMysql />;
  if (lowerTech.includes("php")) return <SiPhp />;
  if (lowerTech.includes("bootstrap")) return <SiBootstrap />;
  if (lowerTech.includes("figma")) return <SiFigma />;
  if (lowerTech.includes("tensorflow")) return <SiTensorflow />;
  if (lowerTech.includes("pytorch")) return <SiPytorch />;
  if (lowerTech.includes("streamlit")) return <SiStreamlit />;
  if (lowerTech.includes("google earth")) return <SiGoogleearth />;
  if (lowerTech.includes("scikit")) return <SiScikitlearn />;
  if (lowerTech.includes("keras")) return <SiKeras />;
  if (lowerTech.includes("opencv") || lowerTech.includes("computer vision"))
    return <SiOpencv />;
  if (lowerTech.includes("plotly") || lowerTech.includes("visualization"))
    return <SiPlotly />;
  if (lowerTech.includes("next")) return <SiNextdotjs />;
  if (lowerTech.includes("chart")) return <SiChartdotjs />;
  if (lowerTech.includes("go") && !lowerTech.includes("google"))
    return <SiGo />;
  if (lowerTech.includes("postgres")) return <SiPostgresql />;
  if (lowerTech.includes("docker")) return <SiDocker />;
  if (lowerTech.includes("bun")) return <SiBun />;
  if (lowerTech.includes("deck") || lowerTech.includes("map"))
    return <SiMapbox />;

  // Generic/Other mappings
  if (lowerTech.includes("nlp") || lowerTech.includes("language"))
    return <MdOutlineTranslate />;
  if (
    lowerTech.includes("cnn") ||
    lowerTech.includes("lstm") ||
    lowerTech.includes("gru") ||
    lowerTech.includes("deep learning")
  )
    return <FaBrain />;
  if (
    lowerTech.includes("rag") ||
    lowerTech.includes("llm") ||
    lowerTech.includes("gpt") ||
    lowerTech.includes("bot")
  )
    return <FaRobot />;
  if (lowerTech.includes("data") || lowerTech.includes("chroma"))
    return <FaDatabase />;
  if (lowerTech.includes("analysis") || lowerTech.includes("forecasting"))
    return <FaChartBar />;
  if (lowerTech.includes("ui/ux") || lowerTech.includes("design"))
    return <FaPencilRuler />;
  if (lowerTech.includes("weather") || lowerTech.includes("climate"))
    return <FaCloudSun />;
  if (lowerTech.includes("yield") || lowerTech.includes("crop"))
    return <FaLeaf />;

  return <FaCode />;
};

export default function ProjectCard({
  slug,
  title,
  description,
  techStack,
  links,
  image,
  logo,
  images,
  status,
  visibility,
  date,
}: ProjectCardProps) {
  const displayImage =
    image || (images && images.length > 0 ? images[0] : undefined);
  const statusVariants = {
    completed: "success",
    active: "success",
    "in-progress": "warning",
    archived: "secondary",
  } as const;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex flex-col h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-sm overflow-hidden transition-all duration-500"
    >
      <Link to={`/projects/${slug}`} className="block flex-grow">
        {displayImage && (
          <div className="h-48 w-full overflow-hidden relative border-b border-border/50">
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
            />
            {/* Gradient overlay that lifts on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent group-hover:from-background/40 group-hover:via-transparent transition-all duration-500" />
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge
                variant={statusVariants[status]}
                className="uppercase font-bold text-[9px] tracking-widest rounded-none px-2 py-0.5 bg-background/60 backdrop-blur-md border-border/50"
              >
                {status}
              </Badge>
              <Badge
                variant="outline"
                className="gap-1 uppercase font-bold text-[9px] tracking-widest rounded-none px-2 py-0.5 bg-background/60 backdrop-blur-md border-border/50 text-foreground/60"
              >
                {visibility === "public" ? (
                  <SlGlobe size={10} />
                ) : (
                  <SlLock size={10} />
                )}
                {visibility}
              </Badge>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="w-8 h-8 object-contain rounded-sm shrink-0 border border-border/10 p-0.5 bg-background/30"
                />
              )}
              <h2 className="text-xl font-mono font-bold leading-tight group-hover:text-primary transition-colors tracking-tight">
                {title}
              </h2>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/50 shrink-0 mt-1 uppercase tracking-widest">
              {date}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {techStack.slice(0, 5).map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="font-mono text-[10px] uppercase border-border/50 py-0 px-2 bg-muted/50 text-muted-foreground group-hover:text-primary/70 transition-colors"
              >
                {tech}
              </Badge>
            ))}
            {techStack.length > 5 && (
              <Badge
                variant="outline"
                className="font-mono text-[10px] border-border/50 bg-muted/50 text-muted-foreground"
              >
                +{techStack.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </Link>

      {links.length > 0 && (
        <div className="p-4 pt-0 mt-auto border-t border-border/50 bg-muted/30">
          <div className="flex justify-end gap-2 pt-3">
            {links.map((link, index) => {
              const isPrivate = visibility === "private";
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`h-7 px-2 gap-2 text-xs ${isPrivate ? "pointer-events-none opacity-50" : ""}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={isPrivate ? undefined : link.url}
                    target={isPrivate ? undefined : "_blank"}
                    rel={isPrivate ? undefined : "noopener noreferrer"}
                  >
                    {link.icon ||
                      (link.url.includes("github") ? (
                        <VscGithub />
                      ) : (
                        <SlLink />
                      ))}
                    {link.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
