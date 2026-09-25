import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  PiArrowUpRightBold,
  PiLockKeyLight,
  PiGlobeSimpleLight,
  PiCodeLight,
} from "react-icons/pi";
import {
  SiPython,
  SiReact,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiGo,
  SiTypescript,
  SiTailwindcss,
  SiQdrant,
  SiTurborepo,
  SiOpenlayers,
} from "react-icons/si";
import { playTick } from "@/lib/sound";

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

function getTechIcon(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes("typescript")) return <SiTypescript size={12} />;
  if (t.includes("python")) return <SiPython size={12} />;
  if (t.includes("react")) return <SiReact size={12} />;
  if (t.includes("fastapi")) return <SiFastapi size={12} />;
  if (t.includes("go") && !t.includes("google")) return <SiGo size={12} />;
  if (t.includes("postgres") || t.includes("postgis") || t.includes("sql"))
    return <SiPostgresql size={12} />;
  if (t.includes("docker")) return <SiDocker size={12} />;
  if (t.includes("tailwind")) return <SiTailwindcss size={12} />;
  if (t.includes("qdrant")) return <SiQdrant size={12} />;
  if (t.includes("turborepo")) return <SiTurborepo size={12} />;
  if (t.includes("openlayers")) return <SiOpenlayers size={12} />;
  return <PiCodeLight size={12} />;
}

export default function ProjectCard({
  slug,
  title,
  description,
  techStack,
  image,
  logo,
  images,
  status,
  visibility,
  date,
}: ProjectCardProps) {
  const displayImage =
    image || (images && images.length > 0 ? images[0] : undefined);

  const statusBadge =
    status === "completed" || status === "active"
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
      : "bg-primary/10 text-primary border-primary/30";

  return (
    <div className="double-bezel h-full group">
      <Link
        to={`/projects/${slug}`}
        onClick={() => playTick()}
        className="double-bezel-inner h-full flex flex-col overflow-hidden text-left relative transition-all duration-300 group-hover:shadow-xl"
      >
        {/* Screenshot Banner */}
        {displayImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40 border-b border-border/50">
            <img
              src={displayImage}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Status & Visibility Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span
                className={`font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${statusBadge}`}
              >
                {status}
              </span>

              <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-muted-foreground flex items-center gap-1">
                {visibility === "private" ? (
                  <PiLockKeyLight size={11} />
                ) : (
                  <PiGlobeSimpleLight size={11} />
                )}
                <span>{visibility}</span>
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                {logo && (
                  <img
                    src={logo}
                    alt=""
                    className="w-7 h-7 object-contain rounded-lg p-0.5 bg-background border border-border/60 shrink-0"
                  />
                )}
                <h3 className="font-bold text-base md:text-lg leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                  {title}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/60 shrink-0 pt-0.5">
                {date}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
              {description}
            </p>
          </div>

          {/* Tech Stack Pills & Action Icon */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between gap-2 mt-auto">
            <div className="flex flex-wrap gap-1 items-center">
              {techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground"
                >
                  {getTechIcon(tech)}
                  <span>{tech}</span>
                </span>
              ))}
              {techStack.length > 4 && (
                <span className="font-mono text-[9px] text-muted-foreground/60 px-1">
                  +{techStack.length - 4}
                </span>
              )}
            </div>

            <div className="w-7 h-7 rounded-full bg-muted/60 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-all duration-300 shrink-0">
              <PiArrowUpRightBold size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
