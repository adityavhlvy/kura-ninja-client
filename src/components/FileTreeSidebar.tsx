import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  VscFolder,
  VscFolderOpened,
  VscChevronDown,
  VscChevronRight,
  VscMarkdown,
  VscCode,
  VscJson,
  VscSettings,
} from "react-icons/vsc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileTreeSidebarProps {
  isCollapsed: boolean;
}

export default function FileTreeSidebar({ isCollapsed }: FileTreeSidebarProps) {
  const { pathname } = useLocation();

  // Folder states
  const [rootOpen, setRootOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);
  const [viewOpen, setViewOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  // Clean monospace styling reminiscent of premium editors (like Zed)
  const getRowClass = (path?: string) => {
    const base =
      "flex items-center gap-2 py-1 px-2.5 rounded-sm text-xs font-mono select-none cursor-pointer transition-colors w-full text-left";
    if (path && isActive(path)) {
      return `${base} bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-2`;
    }
    return `${base} text-foreground/70 hover:bg-muted/40 hover:text-foreground`;
  };

  if (!isCollapsed) {
    return (
      <div className="flex flex-col w-full h-full p-3 overflow-y-auto select-none">
        {/* Workspace Title */}
        <div className="px-2.5 pb-2.5 border-b border-border/20 mb-3 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
          <span>Explorer</span>
          <span className="text-primary/70">WORKSPACE</span>
        </div>

        {/* Directory Tree Structure */}
        <div className="space-y-0.5">
          {/* Level 0: kura-ninja */}
          <button
            onClick={() => setRootOpen(!rootOpen)}
            className={getRowClass()}
          >
            {rootOpen ? (
              <VscChevronDown size={12} className="shrink-0 text-muted-foreground/60" />
            ) : (
              <VscChevronRight size={12} className="shrink-0 text-muted-foreground/60" />
            )}
            {rootOpen ? (
              <VscFolderOpened size={14} className="shrink-0 text-primary/80" />
            ) : (
              <VscFolder size={14} className="shrink-0 text-primary/80" />
            )}
            <span className="font-semibold truncate">kura-ninja</span>
          </button>

          {rootOpen && (
            <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
              {/* src folder */}
              <div>
                <button
                  onClick={() => setSrcOpen(!srcOpen)}
                  className={getRowClass()}
                >
                  {srcOpen ? (
                    <VscChevronDown size={12} className="shrink-0 text-muted-foreground/60" />
                  ) : (
                    <VscChevronRight size={12} className="shrink-0 text-muted-foreground/60" />
                  )}
                  {srcOpen ? (
                    <VscFolderOpened size={14} className="shrink-0 text-primary/80" />
                  ) : (
                    <VscFolder size={14} className="shrink-0 text-primary/80" />
                  )}
                  <span>src</span>
                </button>

                {srcOpen && (
                  <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
                    {/* view folder */}
                    <div>
                      <button
                        onClick={() => setViewOpen(!viewOpen)}
                        className={getRowClass()}
                      >
                        {viewOpen ? (
                          <VscChevronDown size={12} className="shrink-0 text-muted-foreground/60" />
                        ) : (
                          <VscChevronRight size={12} className="shrink-0 text-muted-foreground/60" />
                        )}
                        {viewOpen ? (
                          <VscFolderOpened size={14} className="shrink-0 text-primary/80" />
                        ) : (
                          <VscFolder size={14} className="shrink-0 text-primary/80" />
                        )}
                        <span>view</span>
                      </button>

                      {viewOpen && (
                        <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
                          <Link to="/" className={getRowClass("/")}>
                            <span className="w-3 shrink-0" />
                            <VscCode size={14} className="shrink-0 text-cyan-400/80" />
                            <span>Home.tsx</span>
                          </Link>

                          <Link to="/about" className={getRowClass("/about")}>
                            <span className="w-3 shrink-0" />
                            <VscCode size={14} className="shrink-0 text-cyan-400/80" />
                            <span>About.tsx</span>
                          </Link>

                          <Link to="/projects" className={getRowClass("/projects")}>
                            <span className="w-3 shrink-0" />
                            <VscCode size={14} className="shrink-0 text-cyan-400/80" />
                            <span>Projects.tsx</span>
                          </Link>

                          <Link to="/certifications" className={getRowClass("/certifications")}>
                            <span className="w-3 shrink-0" />
                            <VscCode size={14} className="shrink-0 text-cyan-400/80" />
                            <span>Certifications.tsx</span>
                          </Link>

                          <Link to="/contact" className={getRowClass("/contact")}>
                            <span className="w-3 shrink-0" />
                            <VscCode size={14} className="shrink-0 text-cyan-400/80" />
                            <span>Contact.tsx</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* DESIGN.md File */}
              <Link to="/design-system" className={getRowClass("/design-system")}>
                <span className="w-3 shrink-0" />
                <VscMarkdown size={14} className="shrink-0 text-sky-400/80" />
                <span>DESIGN.md</span>
              </Link>

              {/* PRODUCT.md File */}
              <Link to="/product-spec" className={getRowClass("/product-spec")}>
                <span className="w-3 shrink-0" />
                <VscMarkdown size={14} className="shrink-0 text-emerald-500/80" />
                <span>PRODUCT.md</span>
              </Link>

              {/* package.json File */}
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-sm text-xs font-mono select-none text-foreground/45 w-full text-left">
                <span className="w-3 shrink-0" />
                <VscJson size={14} className="shrink-0 text-amber-500/50" />
                <span>package.json</span>
              </div>

              {/* rsbuild.config.ts File */}
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-sm text-xs font-mono select-none text-foreground/45 w-full text-left">
                <span className="w-3 shrink-0" />
                <VscSettings size={14} className="shrink-0 text-blue-400/50" />
                <span>rsbuild.config.ts</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Collapsed Sidebar Icons View
  return (
    <TooltipProvider>
      <nav className="flex flex-col w-full h-full p-2.5 gap-2 items-center">
        {[
          { path: "/", label: "Home.tsx", icon: <VscCode size={18} className="text-cyan-400/80" /> },
          { path: "/about", label: "About.tsx", icon: <VscCode size={18} className="text-cyan-400/80" /> },
          { path: "/projects", label: "Projects.tsx", icon: <VscCode size={18} className="text-cyan-400/80" /> },
          { path: "/certifications", label: "Certifications.tsx", icon: <VscCode size={18} className="text-cyan-400/80" /> },
          { path: "/contact", label: "Contact.tsx", icon: <VscCode size={18} className="text-cyan-400/80" /> },
          { path: "/design-system", label: "DESIGN.md", icon: <VscMarkdown size={18} className="text-sky-400/80" /> },
          { path: "/product-spec", label: "PRODUCT.md", icon: <VscMarkdown size={18} className="text-emerald-500/80" /> },
        ].map((file) => {
          const active = isActive(file.path);
          return (
            <Tooltip key={file.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={file.path}
                  className={`p-2 rounded-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground/50 hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {file.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-mono text-xs bg-card border border-border">
                {file.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
