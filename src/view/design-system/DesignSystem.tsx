
import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiDaisyui, SiFramer, SiTypescript, SiNextdotjs } from "react-icons/si";
import SpotlightCard from "../../components/SpotlightCard";
import BackgroundEffects from "../../components/BackgroundEffects";

export default function DesignSystem() {
    return (
        <PageTransition className="min-h-screen pb-20 relative bg-base-100 selection:bg-primary selection:text-primary-content">
            <BackgroundEffects />

            <div className="container mx-auto max-w-7xl p-6 space-y-12 relative z-10">
                {/* Header with Float Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <PageHeader
                        title={<span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent font-black tracking-tight">Design System</span>}
                        subtitle="v2.0.0"
                        description="The visual language and core components that power the Kura Ninja interface."
                    >
                        <div className="text-right hidden md:block opacity-50 font-mono text-xs tracking-widest uppercase">
                            <p>STATUS: <span className="text-success">STABLE</span></p>
                            <p>BUILD: 2024.12.09</p>
                        </div>
                    </PageHeader>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Left Column (Typography & Components) - Spans 7 cols */}
                    <div className="xl:col-span-7 space-y-8">
                        {/* Typography */}
                        <SpotlightCard title="Typography" badge="Outfit + Mono" delay={0.1}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-50 border-b border-base-content/10 pb-1">
                                        <span className="text-xs font-mono uppercase tracking-widest">Headings</span>
                                    </div>
                                    <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-br from-base-content to-base-content/50">Display H1</h1>
                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Heading H2</h2>
                                    <h3 className="text-3xl font-bold">Heading H3</h3>
                                    <h4 className="text-2xl font-bold text-base-content/80">Heading H4</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-50 border-b border-base-content/10 pb-1">
                                        <span className="text-xs font-mono uppercase tracking-widest">Body & Code</span>
                                    </div>
                                    <p className="text-lg leading-relaxed max-w-2xl">
                                        Body Large (text-lg): The visual language of our application relies on clear, readable typography that scales gracefully across devices.
                                    </p>
                                    <p className="text-base opacity-80 leading-relaxed max-w-2xl">
                                        Body Base (text-base): Standard body text used for most content. balanced for readability and density.
                                    </p>
                                    <div className="mockup-code bg-black/80 text-white text-sm shadow-xl scale-[0.98] border border-white/10">
                                        <pre data-prefix="$" className="text-warning"><code>bun add kura-ninja-ui</code></pre>
                                        <pre data-prefix=">" className="text-success"><code>Installing magic...</code></pre>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Components */}
                        <SpotlightCard title="Core Components" badge="Interactive" delay={0.2}>
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-50 border-b border-base-content/10 pb-1">
                                        <span className="text-xs font-mono uppercase tracking-widest">Buttons</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <button className="btn btn-primary shadow-lg shadow-primary/30">Primary</button>
                                        <button className="btn btn-secondary shadow-lg shadow-secondary/30">Secondary</button>
                                        <button className="btn btn-accent shadow-lg shadow-accent/30">Accent</button>
                                        <button className="btn btn-ghost hover:bg-base-content/10">Ghost</button>
                                        <button className="btn btn-outline btn-primary">Outline</button>
                                        <button className="btn btn-sm">Small</button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 opacity-50 border-b border-base-content/10 pb-1">
                                        <span className="text-xs font-mono uppercase tracking-widest">Badges & Tags</span>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="badge badge-primary badge-lg">Primary</div>
                                        <div className="badge badge-secondary badge-lg">Secondary</div>
                                        <div className="badge badge-accent">Accent</div>
                                        <div className="badge badge-outline">Outline</div>
                                        <div className="badge badge-ghost">Ghost</div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-base-content/10">
                                    <div className="flex items-center gap-2 opacity-50 border-b border-base-content/10 pb-1">
                                        <span className="text-xs font-mono uppercase tracking-widest">Premium Inputs & Controls</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Standard Input */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-bold">What is your name?</span>
                                            </label>
                                            <input type="text" placeholder="Type here" className="input input-bordered w-full bg-base-100/50 backdrop-blur-md focus:border-primary focus:ring-2 ring-primary/20 transition-all duration-300" />
                                        </div>

                                        {/* Select */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-bold">Pick your main role</span>
                                            </label>
                                            <select className="select select-bordered bg-base-100/50 backdrop-blur-md focus:border-secondary focus:ring-2 ring-secondary/20 transition-all duration-300">
                                                <option disabled selected>Pick one</option>
                                                <option>Frontend Developer</option>
                                                <option>Backend Developer</option>
                                                <option>Fullstack Ninja</option>
                                            </select>
                                        </div>

                                        {/* Toggle */}
                                        <div className="form-control w-fit">
                                            <label className="label cursor-pointer gap-4 bg-base-200/50 p-3 rounded-xl border border-base-content/5 hover:bg-base-200 transition-colors">
                                                <span className="label-text font-bold">Enable Ultra Mode</span>
                                                <input type="checkbox" className="toggle toggle-primary shadow-lg shadow-primary/20" defaultChecked />
                                            </label>
                                        </div>

                                        {/* Range Slider */}
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text font-bold">Aesthetic Level</span>
                                            </label>
                                            <input type="range" min="0" max="100" defaultValue="80" className="range range-xs range-accent" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* Right Column (Tech & Colors) - Spans 5 cols */}
                    <div className="xl:col-span-5 space-y-8">
                        {/* Tech Stack */}
                        <SpotlightCard title="Tech Stack" badge="Pro Dependencies" delay={0.3}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <TechItem name="React 15+" description="Core UI" icon={<FaReact className="w-5 h-5 text-[#61DAFB]" />} />
                                <TechItem name="Next.js" description="Framework" icon={<SiNextdotjs className="w-5 h-5 text-white" />} />
                                <TechItem name="Tailwind" description="Styling" icon={<SiTailwindcss className="w-5 h-5 text-[#38B2AC]" />} />
                                <TechItem name="DaisyUI" description="Components" icon={<SiDaisyui className="w-5 h-5 text-[#1AD1A5]" />} />
                                <TechItem name="Motion" description="Animation" icon={<SiFramer className="w-5 h-5 text-white" />} />
                                <TechItem name="TypeScript" description="Type Safety" icon={<SiTypescript className="w-5 h-5 text-[#3178C6]" />} />
                            </div>
                        </SpotlightCard>

                        {/* Color Palette */}
                        <SpotlightCard title="Color Identity" badge="Copied!" delay={0.4}>
                            <div className="grid grid-cols-2 gap-3">
                                <ColorSwatch name="primary" variable="--p" bgClass="bg-primary" textClass="text-primary-content" />
                                <ColorSwatch name="secondary" variable="--s" bgClass="bg-secondary" textClass="text-secondary-content" />
                                <ColorSwatch name="accent" variable="--a" bgClass="bg-accent" textClass="text-accent-content" />
                                <ColorSwatch name="neutral" variable="--n" bgClass="bg-neutral" textClass="text-neutral-content" />
                                <ColorSwatch name="base-100" variable="--b1" bgClass="bg-base-100" textClass="text-base-content" />
                                <ColorSwatch name="success" variable="--su" bgClass="bg-success" textClass="text-success-content" />
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

function TechItem({ name, description, icon }: { name: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-base-content/5 hover:bg-base-content/10 border border-base-content/5 hover:border-base-content/10 transition-all duration-300 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-base-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div>
                <div className="font-bold text-sm">{name}</div>
                <div className="text-xs opacity-50">{description}</div>
            </div>
        </div>
    );
}

function ColorSwatch({ name, variable, bgClass, textClass }: { name: string, variable: string, bgClass: string, textClass: string }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`var(${variable})`);
        toast.success(`Copied ${name} !`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copyToClipboard}
            className={`group relative h-24 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ring-0 focus:ring-2 ring-base-content/20 ${bgClass}`}
        >
            <div className={`absolute inset-0 p-4 flex flex-col justify-between z-10 ${textClass}`}>
                <span className="font-bold capitalize text-sm">{name}</span>
                <div className="flex justify-between items-end">
                    <span className="text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">{variable}</span>
                    {copied && <span className="text-xs font-bold animate-pulse">COPIED</span>}
                </div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-20"></div>
        </button>
    );
}

