import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  VscFolder,
  VscFolderOpened,
  VscChevronDown,
  VscChevronRight,
  VscCode,
} from "react-icons/vsc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PAGES = [
  { path: "/", label: "Home.tsx" },
  { path: "/about", label: "About.tsx" },
  { path: "/projects", label: "Projects.tsx" },
  { path: "/certifications", label: "Certifications.tsx" },
  { path: "/contact", label: "Contact.tsx" },
];

const ROW =
  "flex items-center gap-2 py-1 px-2.5 rounded-sm text-xs font-mono select-none cursor-pointer transition-colors w-full text-left";

function Chevron({ open }: { open: boolean }) {
  return open ? (
    <VscChevronDown size={12} className="shrink-0 text-muted-foreground/60" />
  ) : (
    <VscChevronRight size={12} className="shrink-0 text-muted-foreground/60" />
  );
}

function FolderIcon({ open }: { open: boolean }) {
  return open ? (
    <VscFolderOpened size={14} className="shrink-0 text-primary/80" />
  ) : (
    <VscFolder size={14} className="shrink-0 text-primary/80" />
  );
}

export default function FileTreeSidebar({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const { pathname } = useLocation();
  const [rootOpen, setRootOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);
  const [viewOpen, setViewOpen] = useState(true);

  const fileClass = (path: string) =>
    `${ROW} ${
      pathname === path
        ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary pl-2"
        : "text-foreground/70 hover:bg-muted/40 hover:text-foreground"
    }`;

  const folderClass = `${ROW} text-foreground/70 hover:bg-muted/40 hover:text-foreground`;

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <nav className="flex flex-col w-full h-full p-2.5 gap-2 items-center">
          {PAGES.map((page) => (
            <Tooltip key={page.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={page.path}
                  className={`p-2 rounded-sm transition-colors ${
                    pathname === page.path
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground/50 hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <VscCode size={18} className="text-cyan-400/80" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="font-mono text-xs bg-card border border-border"
              >
                {page.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex flex-col w-full h-full p-3 overflow-y-auto select-none">
      <div className="px-2.5 pb-2.5 border-b border-border/20 mb-3 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
        <span>Explorer</span>
        <span className="text-primary/70">WORKSPACE</span>
      </div>

      <div className="space-y-0.5">
        <button
          onClick={() => setRootOpen(!rootOpen)}
          className={folderClass}
        >
          <Chevron open={rootOpen} />
          <FolderIcon open={rootOpen} />
          <span className="font-semibold truncate">kura-ninja</span>
        </button>

        {rootOpen && (
          <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
            <button
              onClick={() => setSrcOpen(!srcOpen)}
              className={folderClass}
            >
              <Chevron open={srcOpen} />
              <FolderIcon open={srcOpen} />
              <span>src</span>
            </button>

            {srcOpen && (
              <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
                <button
                  onClick={() => setViewOpen(!viewOpen)}
                  className={folderClass}
                >
                  <Chevron open={viewOpen} />
                  <FolderIcon open={viewOpen} />
                  <span>view</span>
                </button>

                {viewOpen && (
                  <div className="ml-3 border-l border-border/20 pl-2 space-y-0.5 mt-0.5">
                    {PAGES.map((page) => (
                      <Link
                        key={page.path}
                        to={page.path}
                        className={fileClass(page.path)}
                      >
                        <span className="w-3 shrink-0" />
                        <VscCode
                          size={14}
                          className="shrink-0 text-cyan-400/80"
                        />
                        <span>{page.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}