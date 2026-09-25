import { useState, useMemo } from "react";
import {
  PiCertificateLight,
  PiLinkedinLogoLight,
  PiMagnifyingGlassLight,
  PiSealCheckFill,
} from "react-icons/pi";
import PageTransition from "../../components/PageTransition";
import certificationsJson from "../../data/certifications.json";
import { playTick } from "@/lib/sound";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  type: "Professional" | "Technical" | "Foundation";
  skills?: string[];
}

interface CertificationGroup {
  category: string;
  items: Certification[];
}

const groups = certificationsJson.certifications as CertificationGroup[];

export default function Certifications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...groups.map((g) => g.category)];

  const filteredGroups = useMemo(() => {
    return groups
      .filter((g) => selectedCategory === "All" || g.category === selectedCategory)
      .map((g) => {
        const matchingItems = g.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(query) ||
            item.issuer.toLowerCase().includes(query) ||
            (item.skills && item.skills.some((s) => s.toLowerCase().includes(query)))
          );
        });
        return {
          ...g,
          items: matchingItems,
        };
      })
      .filter((g) => g.items.length > 0);
  }, [selectedCategory, searchQuery]);

  const totalCerts = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
              <PiCertificateLight size={14} />
              <span>Verified Credentials</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Certifications & Badges
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Verified certifications in Google AI Agent Development Kit (ADK), Multi-Agent Systems, Agile Project Management, and Enterprise IoT.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/adityavahlevynugraha/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTick()}
            className="btn-pill bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 shrink-0"
          >
            <PiLinkedinLogoLight size={15} />
            <span>Verify on LinkedIn</span>
          </a>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 flex items-center bg-card border border-border/70 rounded-2xl px-3.5 py-2">
              <PiMagnifyingGlassLight size={15} className="text-muted-foreground mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications by title, issuer, or skill..."
                className="w-full bg-transparent text-xs font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playTick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                      : "bg-card text-muted-foreground border-border/70 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-mono text-muted-foreground px-1">
            Total {totalCerts} credentials recorded across AI, Engineering & Management
          </div>
        </div>

        {/* Credentials Groups */}
        <div className="space-y-10">
          {filteredGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <span className="font-mono text-xs uppercase font-bold text-primary tracking-wider">
                  {group.category} ({group.items.length})
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((cert, cIdx) => (
                  <div key={cIdx} className="double-bezel h-full">
                    <div className="double-bezel-inner p-5 space-y-3 h-full flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {cert.type}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {cert.date}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-2">
                          {cert.name}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                          <PiSealCheckFill className="text-emerald-500" size={13} />
                          <span>{cert.issuer}</span>
                        </div>
                      </div>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2 border-t border-border/40 font-mono text-[9px]">
                          {cert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/40"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
