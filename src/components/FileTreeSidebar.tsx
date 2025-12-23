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
import { FiFolder } from "react-icons/fi";

interface FileTreeSidebarProps {
  isCollapsed: boolean;
}

function FileTreeSidebar({ isCollapsed }: FileTreeSidebarProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const getLinkClass = (path: string) => {
    const baseClass = isCollapsed ? "justify-center" : "";
    const activeClass = isActive(path)
      ? "bg-base-300 border-l-4 border-primary"
      : "";
    return `${baseClass} ${activeClass}`;
  };

  return (
    <ul className="menu bg-base-200 w-full h-full rounded-box">
      <li>
        <Link to="/" className={getLinkClass("/")}>
          <SlHome size={20} />
          {!isCollapsed && "Home"}
        </Link>
      </li>
      <li>
        <Link to="/projects" className={getLinkClass("/projects")}>
          <FiFolder size={20} />
          {!isCollapsed && "Projects"}
        </Link>
      </li>
      <li>
        <Link to="/about" className={getLinkClass("/about")}>
          <SlInfo size={20} />
          {!isCollapsed && "About"}
        </Link>
      </li>
      <li>
        <Link to="/certifications" className={getLinkClass("/certifications")}>
          <SlBadge size={20} />
          {!isCollapsed && "Certifications"}
        </Link>
      </li>
      <li>
        <Link to="/design-system" className={getLinkClass("/design-system")}>
          <SlLayers size={20} />
          {!isCollapsed && "Design System"}
        </Link>
      </li>
      <li
        className={isCollapsed ? "tooltip tooltip-right" : ""}
        data-tip="Contacts"
      >
        {isCollapsed ? (
          <a className="justify-center">
            <SlPhone size={20} />
          </a>
        ) : (
          <details>
            <summary>
              <SlPhone size={20} />
              Contacts
            </summary>
            <ul>
              <li>
                <a
                  href="https://instagram.com/adityavhlvy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SlSocialInstagram size={16} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/adityavahlevynugraha/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SlSocialLinkedin size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SlSocialSpotify size={16} /> Spotify
                </a>
              </li>
              <li>
                <a href="mailto:adityavhlvy1003@gmail.com">
                  <SlEnvolope size={16} /> Gmail
                </a>
              </li>
            </ul>
          </details>
        )}
      </li>

      {/* THE GLITCH HINT */}
      <GlitchItem isCollapsed={isCollapsed} />
    </ul>
  );
}

// Separate component for the glitch logic to avoid re-rendering the whole sidebar too often
const GlitchItem = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial glitch faster to prove it works
    const initialDelay = 1000;

    let timeoutId: NodeJS.Timeout;

    const loop = () => {
      // Random glitch effect (3-6 seconds)
      const delay = Math.random() * 3000 + 3000;

      timeoutId = setTimeout(() => {
        setIsVisible(true);
        // Visible for longer (1s - 2s) so users can actually see and click it
        setTimeout(() => {
          setIsVisible(false);
          loop();
        }, Math.random() * 1000 + 1000);
      }, delay);
    };

    // Start the loop
    timeoutId = setTimeout(loop, initialDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  // Always render the LI gap to prevent layout shifts, but hide content
  // Or just render conditionally. Let's keep it conditional but frequent.
  if (!isVisible) return null;

  return (
    <li className="border-t border-error/20 mt-2">
      <Link
        to="/playground"
        className={`text-error font-mono font-bold bg-error/10 ${
          isCollapsed ? "justify-center" : ""
        }`}
        title="SYSTEM_FAILURE"
      >
        <span className="loading loading-xs text-error"></span>
        {!isCollapsed && (
          <span className="tracking-widest animate-pulse">ERR_404_FOUND</span>
        )}
      </Link>
    </li>
  );
};

export default FileTreeSidebar;
