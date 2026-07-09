import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFramer, SiTypescript } from "react-icons/si";
import { VscSymbolColor, VscPackage } from "react-icons/vsc";
import SpotlightCard from "../../components/SpotlightCard";
import BackgroundEffects from "../../components/BackgroundEffects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DesignSystem() {
  return (
    <PageTransition className="min-h-screen pb-20 relative">
      <BackgroundEffects />

      <div className="container mx-auto max-w-7xl p-6 space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PageHeader
            title="Design System"
            subtitle="v2.1.0"
            description="The visual language and core components powering the Kura Ninja interface."
          >
            <div className="text-right hidden md:block font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              <p>
                STATUS: <span className="text-primary">ACTIVE</span>
              </p>
              <p>THEME: SENJA / FAJAR</p>
            </div>
          </PageHeader>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-7 space-y-8">
            {/* Typography */}
            <SpotlightCard
              title="Typography"
              badge="Bricolage + Geist"
              delay={0.1}
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <SectionLabel>Headings — Bricolage Grotesque</SectionLabel>
                  <h1 className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-foreground">
                    Display H1
                  </h1>
                  <h2 className="text-4xl font-bold tracking-[-0.03em] text-foreground">
                    Heading H2
                  </h2>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] text-foreground/80">
                    Heading H3
                  </h3>
                  <h4 className="text-xl font-bold text-foreground/70">
                    Heading H4
                  </h4>
                </div>
                <div className="space-y-4">
                  <SectionLabel>Body — Geist Sans</SectionLabel>
                  <p className="text-base text-foreground/80 leading-relaxed max-w-xl">
                    Body text uses Geist for clean readability. The visual
                    language relies on clear, readable typography that scales
                    gracefully across devices and themes.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Muted text for secondary information. Balanced for
                    readability and density.
                  </p>
                </div>
                <div className="space-y-4">
                  <SectionLabel>Monospace — Geist Mono</SectionLabel>
                  <div className="bg-muted/50 border border-border/50 rounded-sm p-4 font-mono text-sm">
                    <div className="text-muted-foreground">
                      <span className="text-primary">const</span> ninja ={" "}
                      <span className="text-secondary">await</span> deploy(
                      <span className="text-success">&quot;kura&quot;</span>);
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <SectionLabel>Serif Accent — Instrument Serif</SectionLabel>
                  <p className="font-serif-accent text-2xl text-foreground/70">
                    &quot;Code like a turtle, vibe like a ninja.&quot;
                  </p>
                </div>
              </div>
            </SpotlightCard>

            {/* Components */}
            <SpotlightCard title="Components" badge="shadcn/ui" delay={0.2}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <SectionLabel>Buttons</SectionLabel>
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button size="sm">Small</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionLabel>Badges</SectionLabel>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionLabel>Cards & Containers</SectionLabel>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-card/80 border border-border/50 rounded-sm">
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        bg-card
                      </div>
                      <div className="text-sm font-bold">Card Surface</div>
                    </div>
                    <div className="p-4 bg-muted border border-border/50 rounded-sm">
                      <div className="text-xs font-mono text-muted-foreground mb-1">
                        bg-muted
                      </div>
                      <div className="text-sm font-bold">Muted Surface</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <SectionLabel>Motion</SectionLabel>
                  <div className="flex flex-wrap gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-primary/10 border border-primary/20 rounded-sm cursor-pointer"
                    >
                      <span className="text-xs font-mono text-primary">
                        Hover me
                      </span>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="px-4 py-3 bg-secondary/10 border border-secondary/20 rounded-sm"
                    >
                      <span className="text-xs font-mono text-secondary">
                        Float
                      </span>
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-4 py-3 bg-accent/10 border border-accent/20 rounded-sm"
                    >
                      <span className="text-xs font-mono text-accent">
                        Pulse
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column */}
          <div className="xl:col-span-5 space-y-8">
            {/* Tech Stack */}
            <SpotlightCard title="Tech Stack" badge="2026" delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <TechItem
                  name="React 19"
                  desc="UI Library"
                  icon={<FaReact className="text-[#61DAFB]" />}
                />
                <TechItem
                  name="Rsbuild"
                  desc="Build Tool"
                  icon={<VscPackage className="text-[#f0a030]" />}
                />
                <TechItem
                  name="Tailwind v4"
                  desc="Styling"
                  icon={<SiTailwindcss className="text-[#38B2AC]" />}
                />
                <TechItem
                  name="Framer Motion"
                  desc="Animation"
                  icon={<SiFramer />}
                />
                <TechItem
                  name="TypeScript"
                  desc="Type Safety"
                  icon={<SiTypescript className="text-[#3178C6]" />}
                />
                <TechItem
                  name="shadcn/ui"
                  desc="Components"
                  icon={<VscSymbolColor className="text-primary" />}
                />
              </div>
            </SpotlightCard>

            {/* Color Palette */}
            <SpotlightCard title="Color Palette" badge="Theme-Aware" delay={0.4}>
              <div className="space-y-4">
                <SectionLabel>Core Colors</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  <ColorSwatch
                    name="Primary"
                    cssVar="--primary"
                    className="bg-primary text-primary-foreground"
                  />
                  <ColorSwatch
                    name="Secondary"
                    cssVar="--secondary"
                    className="bg-secondary text-secondary-foreground"
                  />
                  <ColorSwatch
                    name="Accent"
                    cssVar="--accent"
                    className="bg-accent text-accent-foreground"
                  />
                  <ColorSwatch
                    name="Destructive"
                    cssVar="--destructive"
                    className="bg-destructive text-destructive-foreground"
                  />
                </div>
                <SectionLabel>Surfaces</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  <ColorSwatch
                    name="Background"
                    cssVar="--background"
                    className="bg-background text-foreground border border-border"
                  />
                  <ColorSwatch
                    name="Card"
                    cssVar="--card"
                    className="bg-card text-card-foreground border border-border"
                  />
                  <ColorSwatch
                    name="Muted"
                    cssVar="--muted"
                    className="bg-muted text-muted-foreground"
                  />
                  <ColorSwatch
                    name="Border"
                    cssVar="--border"
                    className="bg-border text-foreground"
                  />
                </div>
                <SectionLabel>Semantic</SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  <ColorSwatch
                    name="Success"
                    cssVar="--success"
                    className="bg-success text-success-foreground"
                    small
                  />
                  <ColorSwatch
                    name="Warning"
                    cssVar="--warning"
                    className="bg-warning text-warning-foreground"
                    small
                  />
                  <ColorSwatch
                    name="Destructive"
                    cssVar="--destructive"
                    className="bg-destructive text-destructive-foreground"
                    small
                  />
                </div>
              </div>
            </SpotlightCard>

            {/* Themes */}
            <SpotlightCard title="Themes" badge="2 Modes" delay={0.5}>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border/50 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#07070a] to-[#1e1e24] border border-border" />
                  <div>
                    <div className="text-sm font-bold">Senja</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      Twilight · Amber · Cool dark
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border/50 rounded-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#faf6f1] to-[#f0e8e0] border border-[#d4c8bc]" />
                  <div>
                    <div className="text-sm font-bold">Fajar</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      Dawn · Terracotta · Warm light
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Spacing & Radius */}
            <SpotlightCard title="Spacing" badge="System" delay={0.6}>
              <div className="space-y-4">
                <SectionLabel>Border Radius</SectionLabel>
                <div className="flex items-end gap-3">
                  {[
                    { r: "rounded-none", label: "0" },
                    { r: "rounded-sm", label: "sm" },
                    { r: "rounded-md", label: "md" },
                    { r: "rounded-lg", label: "lg" },
                    { r: "rounded-full", label: "full" },
                  ].map(({ r, label }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className={`w-10 h-10 bg-primary/20 border border-primary/40 ${r}`}
                      />
                      <span className="text-[9px] font-mono text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/30 pb-1.5 mb-2">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

function TechItem({
  name,
  desc,
  icon,
}: {
  name: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-sm bg-muted/30 border border-border/30 hover:border-primary/20 transition-colors group">
      <div className="text-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function ColorSwatch({
  name,
  cssVar,
  className,
  small,
}: {
  name: string;
  cssVar: string;
  className: string;
  small?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`var(${cssVar})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className={`relative overflow-hidden text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] rounded-sm ${className} ${small ? "h-14 p-2" : "h-20 p-3"}`}
    >
      <span className={`font-bold block ${small ? "text-[10px]" : "text-xs"}`}>
        {name}
      </span>
      <span
        className={`font-mono opacity-60 block ${small ? "text-[8px]" : "text-[10px]"}`}
      >
        {copied ? "Copied!" : cssVar}
      </span>
    </button>
  );
}
