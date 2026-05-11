import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  SlHome,
  SlInfo,
  SlPhone,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlEnvolope,
  SlBadge,
  SlSocialSpotify,
  SlLayers,
} from "react-icons/sl";
import { FiFolder, FiLoader } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileTreeSidebarProps {
  isCollapsed: boolean;
}

function FileTreeSidebar({ isCollapsed }: FileTreeSidebarProps) {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;

  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm font-medium";
    const collapseClass = isCollapsed ? "justify-center px-2" : "";
    const activeClass = isActive(path)
      ? "bg-accent text-accent-foreground border-l-4 border-primary"
      : "hover:bg-accent/50 text-foreground/70 hover:text-foreground";
    return `${baseClass} ${collapseClass} ${activeClass}`;
  };

  return (
    <TooltipProvider>
      <nav className="flex flex-col w-full h-full p-2 gap-1 overflow-y-auto">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to="/" className={getLinkClass("/")}>
              <SlHome size={20} className="shrink-0" />
              {!isCollapsed && <span>Home</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">Home</TooltipContent>}
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to="/projects" className={getLinkClass("/projects")}>
              <FiFolder size={20} className="shrink-0" />
              {!isCollapsed && <span>Projects</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">Projects</TooltipContent>}
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to="/about" className={getLinkClass("/about")}>
              <SlInfo size={20} className="shrink-0" />
              {!isCollapsed && <span>About</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">About</TooltipContent>}
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to="/certifications" className={getLinkClass("/certifications")}>
              <SlBadge size={20} className="shrink-0" />
              {!isCollapsed && <span>Certifications</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">Certifications</TooltipContent>}
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to="/design-system" className={getLinkClass("/design-system")}>
              <SlLayers size={20} className="shrink-0" />
              {!isCollapsed && <span>Design System</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">Design System</TooltipContent>}
        </Tooltip>

        <div className="mt-2 pt-2 border-t border-border/50">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="flex justify-center p-2 text-foreground/70 hover:text-foreground cursor-pointer">
                  <SlPhone size={20} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Contacts</TooltipContent>
            </Tooltip>
          ) : (
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent/50 text-sm font-medium text-foreground/70 hover:text-foreground cursor-pointer list-none">
                <SlPhone size={20} className="shrink-0" />
                <span>Contacts</span>
                <span className="ml-auto transition-transform group-open:rotate-180">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </summary>
              <ul className="pl-9 mt-1 flex flex-col gap-1">
                <li>
                  <a
                    href="https://instagram.com/adityavhlvy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <SlSocialInstagram size={14} /> Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/adityavahlevynugraha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <SlSocialLinkedin size={14} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <SlSocialSpotify size={14} /> Spotify
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:adityavhlvy1003@gmail.com"
                    className="flex items-center gap-2 py-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
                  >
                    <SlEnvolope size={14} /> Gmail
                  </a>
                </li>
              </ul>
            </details>
          )}
        </div>

        {/* THE GLITCH HINT */}
        <GlitchItem isCollapsed={isCollapsed} />
      </nav>
    </TooltipProvider>
  );
}

// Separate component for the glitch logic to avoid re-rendering the whole sidebar too often
const GlitchItem = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialDelay = 1000;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loop = () => {
      const delay = Math.random() * 3000 + 3000;
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          loop();
        }, Math.random() * 1000 + 1000);
      }, delay);
    };

    timeoutId = setTimeout(loop, initialDelay);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="mt-2 border-t border-destructive/20 pt-2 animate-in fade-in zoom-in duration-300">
      <Link
        to="/playground"
        className={`flex items-center gap-3 px-4 py-2 rounded-md bg-destructive/10 text-destructive font-mono font-bold text-xs ${isCollapsed ? "justify-center px-2" : ""
          }`}
        title="SYSTEM_FAILURE"
      >
        <FiLoader size={16} className="animate-spin shrink-0" />
        {!isCollapsed && (
          <span className="tracking-widest animate-pulse">ERR_404_FOUND</span>
        )}
      </Link>
    </div>
  );
};


export default FileTreeSidebar;
