import { useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState("tech-stack");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
          setActiveSection(id);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const sections = [
    { id: "tech-stack", label: "01. Tech Stack" },
    { id: "theme-palette", label: "02. Theme & Palette" },
    { id: "typography", label: "03. Typography" },
    { id: "components", label: "04. Components" },
  ];

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
            subtitle="DESIGN.md"
            description="The semantic design specification, layout rules, and component libraries powering the Kura Ninja interface."
          >
            <div className="text-right hidden md:block font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              <p>
                STATUS: <span className="text-primary">ACTIVE</span>
              </p>
              <p>THEME: SENJA / FAJAR</p>
            </div>
          </PageHeader>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Local Sticky Navigation Sidebar */}
          <aside className="lg:col-span-3 sticky top-20 space-y-4 hidden lg:block">
            <div className="border-l border-border/40 pl-4 space-y-3 font-mono text-xs">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
                Outline
              </p>
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`block py-1 hover:text-primary transition-colors ${
                      isActive
                        ? "text-primary font-bold border-l-2 border-primary pl-2 -ml-4.5"
                        : "text-muted-foreground/75"
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-12">
            {/* Tech Stack */}
            <section id="tech-stack" className="space-y-6 scroll-mt-24">
              <SectionHeader kicker="01. SYSTEM SPEC" title="Tech Stack" />
              <SpotlightCard title="Tech Stack" badge="v0.2.0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <TechItem
                    name="React 19"
                    desc="Modern declarative rendering pipeline with zero runtime overhead."
                    icon={<FaReact className="text-[#61DAFB]" />}
                  />
                  <TechItem
                    name="Rsbuild"
                    desc="Rspack-powered build system achieving sub-second hot reloading."
                    icon={<VscPackage className="text-[#f0a030]" />}
                  />
                  <TechItem
                    name="Tailwind v4"
                    desc="PostCSS-first utility framework enforcing theme variables."
                    icon={<SiTailwindcss className="text-[#38B2AC]" />}
                  />
                  <TechItem
                    name="Framer Motion"
                    desc="Hardware-accelerated physical layouts & transitions."
                    icon={<SiFramer className="text-foreground" />}
                  />
                  <TechItem
                    name="TypeScript"
                    desc="Strict type compilation across boundary integrations."
                    icon={<SiTypescript className="text-[#3178C6]" />}
                  />
                  <TechItem
                    name="shadcn/ui"
                    desc="Tailwind CSS primitives for accessible components."
                    icon={<VscSymbolColor className="text-primary" />}
                  />
                </div>
              </SpotlightCard>
            </section>

            {/* Theme & Palette */}
            <section id="theme-palette" className="space-y-6 scroll-mt-24">
              <SectionHeader
                kicker="02. STYLE GUIDE"
                title="Theme & Color Palette"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpotlightCard title="Color Palette" badge="Theme-Aware">
                  <div className="space-y-4">
                    <SectionLabel>Core Accent Colors</SectionLabel>
                    <div className="grid grid-cols-2 gap-2">
                      <ColorSwatch
                        name="Primary"
                        cssVar="--primary"
                        className="bg-primary text-primary-foreground font-bold"
                      />
                      <ColorSwatch
                        name="Secondary"
                        cssVar="--secondary"
                        className="bg-secondary text-secondary-foreground font-bold"
                      />
                      <ColorSwatch
                        name="Accent"
                        cssVar="--accent"
                        className="bg-accent text-accent-foreground font-bold"
                      />
                      <ColorSwatch
                        name="Destructive"
                        cssVar="--destructive"
                        className="bg-destructive text-destructive-foreground font-bold"
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
                  </div>
                </SpotlightCard>

                <SpotlightCard title="Themes" badge="2 Modes">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border/50 rounded-sm">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#07070a] to-[#1e1e24] border border-border" />
                      <div>
                        <div className="text-sm font-bold">Senja (Twilight)</div>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                          Background: #0f0f15 · Primary: #f0a030 (Sunset amber)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border/50 rounded-sm">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#faf6f1] to-[#f0e8e0] border border-[#d4c8bc]" />
                      <div>
                        <div className="text-sm font-bold">Fajar (Dawn)</div>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                          Background: #f0e9df · Primary: #c04420 (Sunrise red)
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground/60 pl-2">
                      Clicking the theme toggle in the header switches between
                      Senja and Fajar modes seamlessly.
                    </p>
                  </div>
                </SpotlightCard>
              </div>
            </section>

            {/* Typography */}
            <section id="typography" className="space-y-6 scroll-mt-24">
              <SectionHeader kicker="03. TYPE SCALE" title="Typography" />
              <SpotlightCard
                title="Typography System"
                badge="Bricolage + Geist"
              >
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <SectionLabel>Headings: Bricolage Grotesque</SectionLabel>
                      <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] leading-none text-foreground">
                        Display H1
                      </h1>
                      <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground">
                        Heading H2
                      </h2>
                      <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground/80">
                        Heading H3
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <SectionLabel>Body: Geist Sans</SectionLabel>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        Body text utilizes Geist Sans for clean readability in
                        dense data layouts. It provides an optimized contrast
                        and structural rhythm for portfolio details.
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Muted text is rendered in --muted-foreground, ensuring
                        readability passes WCAG 2.1 AA benchmarks.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/20">
                    <div className="space-y-4">
                      <SectionLabel>Monospace: Geist Mono</SectionLabel>
                      <div className="bg-muted/40 border border-border/40 rounded-sm p-4 font-mono text-xs leading-relaxed">
                        <span className="text-primary font-semibold">const</span>{" "}
                        config = &#123; theme:{" "}
                        <span className="text-success">&quot;senja&quot;</span>{" "}
                        &#125;;
                      </div>
                    </div>
                    <div className="space-y-4">
                      <SectionLabel>Serif Accent: Instrument Serif</SectionLabel>
                      <p className="font-serif-accent text-3xl text-primary/90 italic leading-none">
                        &quot;Code like a turtle, vibe like a ninja.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </section>

            {/* Components */}
            <section id="components" className="space-y-6 scroll-mt-24">
              <SectionHeader kicker="04. INTERACTIVE" title="Custom Components" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpotlightCard title="SpotlightCard Preview" badge="Interactive">
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <p className="text-xs text-muted-foreground">
                      This component tracks client-side cursor position with
                      lightweight Framer Motion physics, creating a smooth hover
                      illumination glow effect on its borders.
                    </p>
                    <div className="border border-primary/20 bg-primary/5 p-4 rounded-sm font-mono text-[10px] text-primary/80">
                      Hover borders to reveal spotlight effect.
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard title="Workspace Controls" badge="UI Primitives">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <SectionLabel>Interactive Actions</SectionLabel>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm">Primary Action</Button>
                        <Button variant="secondary" size="sm">
                          Secondary
                        </Button>
                        <Button variant="outline" size="sm">
                          Outline
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <SectionLabel>Status Badges</SectionLabel>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="default">active</Badge>
                        <Badge variant="secondary">production</Badge>
                        <Badge variant="success">success</Badge>
                        <Badge variant="warning">warning</Badge>
                        <Badge variant="outline">v0.2.0</Badge>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="space-y-1 border-b border-border/40 pb-2">
      <span className="text-[9px] font-mono tracking-widest text-primary/70 uppercase font-semibold">
        {kicker}
      </span>
      <h2 className="text-2xl font-black tracking-tight text-foreground">
        {title}
      </h2>
    </div>
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
      <div className="text-lg group-hover:scale-110 transition-transform shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold leading-tight">{name}</div>
        <div className="text-[9px] text-muted-foreground leading-normal mt-0.5">
          {desc}
        </div>
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
      className={`relative overflow-hidden text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] rounded-sm w-full cursor-pointer ${className} ${small ? "h-14 p-2" : "h-16 p-3"}`}
    >
      <span className={`font-bold block ${small ? "text-[10px]" : "text-xs"}`}>
        {name}
      </span>
      <span
        className={`font-mono opacity-60 block ${small ? "text-[8px]" : "text-[10px]"} mt-0.5`}
      >
        {copied ? "Copied!" : cssVar}
      </span>
    </button>
  );
}
