import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  VscJson,
  VscFolder,
  VscFolderOpened,
  VscChevronDown,
  VscChevronRight,
  VscMarkdown,
  VscCode,
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

  // Folder expansion states
  const [rootOpen, setRootOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);
  const [viewsOpen, setViewsOpen] = useState(true);
  const [questsOpen, setQuestsOpen] = useState(true);

  const isActive = (path: string) => pathname === path;

  // Row styling mimicking Zed IDE
  const getRowClass = (path?: string) => {
    const base =
      "flex items-center gap-1.5 py-1 px-2 rounded-sm text-xs font-mono select-none cursor-pointer transition-colors w-full text-left";
    if (path && isActive(path)) {
      return `${base} bg-accent/20 text-primary font-semibold border-l-2 border-primary pl-[6px]`;
    }
    return `${base} text-foreground/75 hover:bg-muted/60 hover:text-foreground`;
  };

  // Render tree layout when expanded
  if (!isCollapsed) {
    return (
      <div className="flex flex-col w-full h-full p-2 overflow-y-auto select-none">
        {/* Level 0: Workspace Root (kura-ninja) */}
        <div>
          <button
            onClick={() => setRootOpen(!rootOpen)}
            className={getRowClass()}
          >
            {rootOpen ? (
              <VscChevronDown
                size={14}
                className="shrink-0 text-muted-foreground"
              />
            ) : (
              <VscChevronRight
                size={14}
                className="shrink-0 text-muted-foreground"
              />
            )}
            {rootOpen ? (
              <VscFolderOpened size={14} className="shrink-0 text-amber-500" />
            ) : (
              <VscFolder size={14} className="shrink-0 text-amber-500" />
            )}
            <span className="truncate font-semibold">kura-ninja</span>
          </button>

          {rootOpen && (
            <div className="ml-3 border-l border-border/30 pl-1 space-y-0.5 mt-0.5">
              {/* Level 1: src folder */}
              <div>
                <button
                  onClick={() => setSrcOpen(!srcOpen)}
                  className={getRowClass()}
                >
                  {srcOpen ? (
                    <VscChevronDown
                      size={14}
                      className="shrink-0 text-muted-foreground"
                    />
                  ) : (
                    <VscChevronRight
                      size={14}
                      className="shrink-0 text-muted-foreground"
                    />
                  )}
                  {srcOpen ? (
                    <VscFolderOpened
                      size={14}
                      className="shrink-0 text-amber-500"
                    />
                  ) : (
                    <VscFolder size={14} className="shrink-0 text-amber-500" />
                  )}
                  <span>src</span>
                </button>

                {srcOpen && (
                  <div className="ml-3 border-l border-border/30 pl-1 space-y-0.5 mt-0.5">
                    {/* Level 2: views folder */}
                    <div>
                      <button
                        onClick={() => setViewsOpen(!viewsOpen)}
                        className={getRowClass()}
                      >
                        {viewsOpen ? (
                          <VscChevronDown
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />
                        ) : (
                          <VscChevronRight
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />
                        )}
                        {viewsOpen ? (
                          <VscFolderOpened
                            size={14}
                            className="shrink-0 text-amber-500"
                          />
                        ) : (
                          <VscFolder
                            size={14}
                            className="shrink-0 text-amber-500"
                          />
                        )}
                        <span>views</span>
                      </button>

                      {viewsOpen && (
                        <div className="ml-4 space-y-0.5 mt-0.5">
                          {/* Home.tsx File */}
                          <Link to="/" className={getRowClass("/")}>
                            <span className="w-3.5 shrink-0" />{" "}
                            {/* Spacer instead of chevron */}
                            <VscCode
                              size={14}
                              className="shrink-0 text-cyan-400"
                            />
                            <span>Home.tsx</span>
                          </Link>

                          {/* about.md File */}
                          <Link to="/about" className={getRowClass("/about")}>
                            <span className="w-3.5 shrink-0" />
                            <VscMarkdown
                              size={14}
                              className="shrink-0 text-sky-400"
                            />
                            <span>about.md</span>
                          </Link>

                          {/* contact.json File */}
                          <Link
                            to="/contact"
                            className={getRowClass("/contact")}
                          >
                            <span className="w-3.5 shrink-0" />
                            <VscJson
                              size={14}
                              className="shrink-0 text-primary"
                            />
                            <span>contact.json</span>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Level 2: quests folder */}
                    <div>
                      <button
                        onClick={() => setQuestsOpen(!questsOpen)}
                        className={getRowClass()}
                      >
                        {questsOpen ? (
                          <VscChevronDown
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />
                        ) : (
                          <VscChevronRight
                            size={14}
                            className="shrink-0 text-muted-foreground"
                          />
                        )}
                        {questsOpen ? (
                          <VscFolderOpened
                            size={14}
                            className="shrink-0 text-amber-500"
                          />
                        ) : (
                          <VscFolder
                            size={14}
                            className="shrink-0 text-amber-500"
                          />
                        )}
                        <span>quests</span>
                      </button>

                      {questsOpen && (
                        <div className="ml-4 space-y-0.5 mt-0.5">
                          {/* projects.json File */}
                          <Link
                            to="/projects"
                            className={getRowClass("/projects")}
                          >
                            <span className="w-3.5 shrink-0" />
                            <VscJson
                              size={14}
                              className="shrink-0 text-primary"
                            />
                            <span>projects.json</span>
                          </Link>

                          {/* badges.json File */}
                          <Link
                            to="/certifications"
                            className={getRowClass("/certifications")}
                          >
                            <span className="w-3.5 shrink-0" />
                            <VscJson
                              size={14}
                              className="shrink-0 text-primary"
                            />
                            <span>badges.json</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* DESIGN.md File */}
              <Link to="/design-system" className={getRowClass("/design-system")}>
                <span className="w-3.5 shrink-0" />
                <VscMarkdown
                  size={14}
                  className="shrink-0 text-sky-400"
                />
                <span>DESIGN.md</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render simple icon list when sidebar is collapsed
  return (
    <TooltipProvider>
      <nav className="flex flex-col w-full h-full p-2 gap-2 overflow-y-auto items-center">
        {/* Home icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscCode size={18} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            Home.tsx
          </TooltipContent>
        </Tooltip>

        {/* Projects icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/projects"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/projects")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscJson size={18} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            projects.json
          </TooltipContent>
        </Tooltip>

        {/* About icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/about"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/about")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscMarkdown size={18} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            about.md
          </TooltipContent>
        </Tooltip>

        {/* Badges icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/certifications"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/certifications")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscJson size={18} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            badges.json
          </TooltipContent>
        </Tooltip>

        {/* Contact icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/contact"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/contact")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscJson size={18} className="text-primary" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            contact.json
          </TooltipContent>
        </Tooltip>

        {/* Design System icon */}
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to="/design-system"
              className={`p-2 rounded-sm transition-colors ${
                isActive("/design-system")
                  ? "bg-accent/25 text-primary"
                  : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <VscMarkdown size={18} className="text-sky-400" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-mono text-xs">
            DESIGN.md
          </TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  );
}