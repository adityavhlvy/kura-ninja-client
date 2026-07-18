import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import SpotlightCard from "../../components/SpotlightCard";
import BackgroundEffects from "../../components/BackgroundEffects";
import { VscFileCode, VscMilestone, VscInspect } from "react-icons/vsc";

export default function ProductSpec() {
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
            title="Product Specification"
            subtitle="PRODUCT.md"
            description="The product persona, target audience, brand values, and strategic roadmap details powering the Kura Ninja ecosystem."
          >
            <div className="text-right hidden md:block font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              <p>
                REGISTER: <span className="text-primary">BRAND</span>
              </p>
              <p>AUDIENCE: ENG MANAGERS / CLIENTS</p>
            </div>
          </PageHeader>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Brand Persona */}
          <SpotlightCard title="Brand Persona" badge="Identity">
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <VscFileCode size={18} />
                <span>Tactile & Technical</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                The Kura Ninja brand represents high-craft software engineering fused with a command-center aesthetic. It speaks to hiring managers and technical clients who value system design, precision code, and telemetry transparency.
              </p>
              <div className="border-t border-border/20 pt-3 space-y-1 text-[11px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>ALIAS:</span>
                  <span className="text-foreground/80">Kura Ninja</span>
                </div>
                <div className="flex justify-between">
                  <span>POSTURE:</span>
                  <span className="text-foreground/80">Technical Integrity</span>
                </div>
                <div className="flex justify-between">
                  <span>TONE:</span>
                  <span className="text-foreground/80">Opinionated & Craft-first</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Strategic Pillars */}
          <SpotlightCard title="Pillars & Principles" badge="Strategy">
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                <VscMilestone size={18} />
                <span>Anti-Slop Guardrails</span>
              </div>
              <ul className="space-y-3 text-[11px] text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span><strong>High Information Density:</strong> Monospace diagnostic tables, real metrics, and clean code comments over large empty spaces.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span><strong>IDE Frame Shell:</strong> Emulate modern workspaces (like VS Code/Zed) to build a focused developer environment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span><strong>Zero AI Tells:</strong> Banish purple outer glows, em-dashes, fake browser dashboards, and stock-like illustrations.</span>
                </li>
              </ul>
            </div>
          </SpotlightCard>
        </div>

        {/* Dynamic Key Views Section */}
        <section className="space-y-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <VscInspect className="text-primary" />
            <span>Product Map & Views</span>
          </h2>
          <div className="p-6 rounded-sm bg-card/30 border border-border/40 font-mono text-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Home Dashboard", desc: "System telemetry logs, dynamic clock, Spotify integrations, and project lists." },
                { name: "About Timeline", desc: "Cum Laude computer science background, scholar details, and skills catalog." },
                { name: "Projects Spec", desc: "Granular technical breakdowns, challenges, and unit testing readiness metrics." },
              ].map((view, i) => (
                <div key={i} className="p-4 bg-muted/20 border border-border/30 rounded-sm space-y-2">
                  <div className="font-bold text-primary">{view.name}</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{view.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
