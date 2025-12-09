
import PageTransition from "../../components/PageTransition";
import { toast } from "react-hot-toast";

export default function DesignSystem() {
    return (
        <PageTransition className="min-h-screen pb-20 relative">
            {/* Background Decoration - Techy Grid */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="container mx-auto max-w-7xl p-6 space-y-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-base-content/10 pb-6 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight"><span className="text-primary">Design</span> System</h1>
                            <span className="badge badge-outline font-mono text-xs mt-2">v2.0.0</span>
                        </div>
                        <p className="text-xl text-base-content/60 max-w-2xl">
                            The visual language and core components that power the Kura Ninja interface.
                        </p>
                    </div>
                    <div className="text-right hidden md:block opacity-50 font-mono text-sm">
                        <p>STATUS: STABLE</p>
                        <p>BUILD: 2024.12.09</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Typography - Left Col */}
                    <div className="space-y-8">
                        <SectionCard title="Typography" badge="Outfit + Mono">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <span className="text-xs font-mono uppercase opacity-50 block border-b border-base-content/5 pb-1">Headings</span>
                                    <h1 className="text-5xl font-black">Display H1</h1>
                                    <h2 className="text-4xl font-bold">Heading H2</h2>
                                    <h3 className="text-3xl font-bold">Heading H3</h3>
                                    <h4 className="text-2xl font-bold">Heading H4</h4>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs font-mono uppercase opacity-50 block border-b border-base-content/5 pb-1">Body & Code</span>
                                    <p className="text-lg">Body Large (text-lg): The quick brown fox jumps over the lazy dog.</p>
                                    <p className="text-base opacity-80">Body Base (text-base): The quick brown fox jumps over the lazy dog.</p>
                                    <p className="text-sm opacity-60">Body Small (text-sm): The quick brown fox jumps over the lazy dog.</p>
                                    <div className="mockup-code bg-base-300 text-sm scale-95 origin-left">
                                        <pre data-prefix="$"><code>bun add backend frontend ai</code></pre>
                                        <pre data-prefix=">" className="text-success"><code>Installing dependencies...</code></pre>
                                    </div>
                                </div>
                            </div>
                        </SectionCard>

                        {/* Components - Left Col (continued) */}
                        <SectionCard title="Core Components" badge="Interactive">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="text-xs font-mono uppercase opacity-50 block border-b border-base-content/5 pb-1">Buttons</span>
                                    <div className="flex flex-wrap gap-3">
                                        <button className="btn btn-primary">Primary</button>
                                        <button className="btn btn-secondary">Secondary</button>
                                        <button className="btn btn-accent">Accent</button>
                                        <button className="btn btn-ghost">Ghost</button>
                                        <button className="btn btn-outline btn-primary">Outline</button>
                                        <button className="btn btn-sm">Small</button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-xs font-mono uppercase opacity-50 block border-b border-base-content/5 pb-1">Badges & Tags</span>
                                    <div className="flex flex-wrap gap-3">
                                        <div className="badge badge-primary">Primary</div>
                                        <div className="badge badge-secondary">Secondary</div>
                                        <div className="badge badge-accent">Accent</div>
                                        <div className="badge badge-outline">Outline</div>
                                        <div className="badge badge-ghost">Ghost</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <span className="text-xs font-mono uppercase opacity-50 block border-b border-base-content/5 pb-1">Alerts</span>
                                    <div role="alert" className="alert shadow-sm p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span className="text-sm">New software update available.</span>
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    {/* Color Palette - Right Col */}
                    <SectionCard title="Color Palette" badge="Click to Copy">
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                            <ColorSwatch name="primary" variable="--p" bgClass="bg-primary" textClass="text-primary-content" />
                            <ColorSwatch name="secondary" variable="--s" bgClass="bg-secondary" textClass="text-secondary-content" />
                            <ColorSwatch name="accent" variable="--a" bgClass="bg-accent" textClass="text-accent-content" />
                            <ColorSwatch name="neutral" variable="--n" bgClass="bg-neutral" textClass="text-neutral-content" />
                            <ColorSwatch name="base-100" variable="--b1" bgClass="bg-base-100" textClass="text-base-content" />
                            <ColorSwatch name="base-200" variable="--b2" bgClass="bg-base-200" textClass="text-base-content" />
                            <ColorSwatch name="base-300" variable="--b3" bgClass="bg-base-300" textClass="text-base-content" />
                            <ColorSwatch name="success" variable="--su" bgClass="bg-success" textClass="text-success-content" />
                            <ColorSwatch name="warning" variable="--wa" bgClass="bg-warning" textClass="text-warning-content" />
                            <ColorSwatch name="error" variable="--er" bgClass="bg-error" textClass="text-error-content" />
                        </div>
                    </SectionCard>
                </div>
            </div>
        </PageTransition>
    );
}

function SectionCard({ title, badge, children }: { title: string, badge?: string, children: React.ReactNode }) {
    return (
        <div className="card bg-base-100 shadow-2xl border border-base-content/5 backdrop-blur-sm overflow-hidden group">
            <div className="card-body p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="card-title text-2xl font-bold">{title}</h2>
                    {badge && <div className="badge badge-ghost font-mono text-xs">{badge}</div>}
                </div>
                {children}
            </div>
        </div>
    );
}

function ColorSwatch({ name, variable, bgClass, textClass }: { name: string, variable: string, bgClass: string, textClass: string }) {
    const copyToClipboard = () => {
        // In a real app we'd get the computed style, but here just simulating
        navigator.clipboard.writeText(`var(${variable})`);
        toast.success(`Copied ${name} var!`);
    };

    return (
        <button
            onClick={copyToClipboard}
            className={`group relative overflow-hidden rounded-xl border border-base-content/5 hover:scale-[1.02] transition-all duration-300 text-left ${bgClass} h-24 md:h-28`}
        >
            <div className={`w-full h-full p-4 flex flex-col justify-between relative z-10`}>
                <span className={`font-bold capitalize ${textClass}/90`}>{name}</span>
                <span className={`text-xs font-mono opacity-70 ${textClass}/80`}>{variable}</span>
            </div>
            {/* Hover Glint Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-20 pointer-events-none"></div>
        </button>
    );
}
