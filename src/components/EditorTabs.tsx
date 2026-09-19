import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SiReact } from "react-icons/si";
import { VscMarkdown, VscClose } from "react-icons/vsc";

export interface TabItem {
  path: string;
  name: string;
  iconType: "react" | "markdown";
}

const STORAGE_KEY = "kura_editor_open_tabs";

function getTabForPath(pathname: string): TabItem {
  if (pathname === "/") {
    return { path: "/", name: "Home.tsx", iconType: "react" };
  }
  if (pathname === "/about") {
    return { path: "/about", name: "About.tsx", iconType: "react" };
  }
  if (pathname === "/projects") {
    return { path: "/projects", name: "Projects.tsx", iconType: "react" };
  }
  if (pathname.startsWith("/projects/")) {
    const slug = pathname.replace("/projects/", "").split("/")[0] || "project";
    return { path: pathname, name: `${slug}.tsx`, iconType: "react" };
  }
  if (pathname === "/certifications") {
    return {
      path: "/certifications",
      name: "Certifications.tsx",
      iconType: "react",
    };
  }
  if (pathname === "/contact") {
    return { path: "/contact", name: "Contact.tsx", iconType: "react" };
  }
  if (pathname === "/design-system") {
    return { path: "/design-system", name: "DESIGN.md", iconType: "markdown" };
  }
  if (pathname === "/product-spec") {
    return { path: "/product-spec", name: "PRODUCT.md", iconType: "markdown" };
  }

  const segment = pathname.split("/").filter(Boolean).pop() || "buffer";
  return { path: pathname, name: `${segment}.tsx`, iconType: "react" };
}

function loadInitialTabs(currentPath: string): TabItem[] {
  const currentTab = getTabForPath(currentPath);
  if (typeof window === "undefined") {
    return [currentTab];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const validTabs: TabItem[] = parsed.filter(
          (t) => t && typeof t.path === "string" && typeof t.name === "string",
        );
        if (validTabs.length > 0) {
          if (!validTabs.some((t) => t.path === currentPath)) {
            return [...validTabs, currentTab];
          }
          return validTabs;
        }
      }
    }
  } catch {
    // ignore parse error
  }

  return currentPath === "/" ? [currentTab] : [getTabForPath("/"), currentTab];
}

export default function EditorTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState<TabItem[]>(() => loadInitialTabs(pathname));
  const activeTabRef = useRef<HTMLDivElement>(null);

  // Sync active route into tabs list on route change
  useEffect(() => {
    setTabs((prev) => {
      const exists = prev.some((t) => t.path === pathname);
      const currentTab = getTabForPath(pathname);
      const nextTabs = exists ? prev : [...prev, currentTab];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTabs));
      } catch {
        // ignore storage error
      }
      return nextTabs;
    });
  }, [pathname]);

  // Scroll active tab into view smoothly
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [pathname]);

  const handleTabClick = (path: string) => {
    if (pathname !== path) {
      navigate(path);
    }
  };

  const handleCloseTab = (e: React.MouseEvent, tabToClose: TabItem) => {
    e.stopPropagation();

    const tabIndex = tabs.findIndex((t) => t.path === tabToClose.path);
    if (tabIndex === -1) return;

    const newTabs = tabs.filter((t) => t.path !== tabToClose.path);

    if (newTabs.length === 0) {
      const homeTab = getTabForPath("/");
      setTabs([homeTab]);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([homeTab]));
      } catch {}
      if (pathname !== "/") {
        navigate("/");
      }
      return;
    }

    setTabs(newTabs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTabs));
    } catch {}

    if (pathname === tabToClose.path) {
      const nextIndex =
        tabIndex >= newTabs.length ? newTabs.length - 1 : tabIndex;
      navigate(newTabs[nextIndex].path);
    }
  };

  const handleTabAuxClick = (e: React.MouseEvent, tab: TabItem) => {
    if (e.button === 1) {
      e.preventDefault();
      handleCloseTab(e, tab);
    }
  };

  return (
    <div
      className="h-9 flex items-center bg-muted/40 border-b border-border/80 px-1 select-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full shrink-0 z-20"
      role="tablist"
      aria-label="Editor tabs"
    >
      <div className="flex items-center h-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <div
              key={tab.path}
              ref={isActive ? activeTabRef : null}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onClick={() => handleTabClick(tab.path)}
              onAuxClick={(e) => handleTabAuxClick(e, tab)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTabClick(tab.path);
                }
              }}
              className={`group relative flex items-center gap-2 h-full px-2.5 sm:px-3 text-[11px] sm:text-xs font-mono cursor-pointer shrink-0 border-r border-border/40 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                isActive
                  ? "bg-background text-foreground font-medium border-t-2 border-t-primary -mt-[1px]"
                  : "bg-muted/20 text-muted-foreground/80 hover:bg-muted/50 hover:text-foreground border-t-2 border-t-transparent"
              }`}
              title={tab.name}
            >
              {tab.iconType === "markdown" ? (
                <VscMarkdown
                  className="text-sky-400 shrink-0 text-sm"
                  aria-hidden="true"
                />
              ) : (
                <SiReact
                  className="text-cyan-400 shrink-0 text-xs"
                  aria-hidden="true"
                />
              )}

              <span className="truncate max-w-[120px] sm:max-w-[160px]">
                {tab.name}
              </span>

              <button
                type="button"
                onClick={(e) => handleCloseTab(e, tab)}
                className={`ml-1 p-0.5 rounded-sm hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground transition-all ${
                  isActive
                    ? "opacity-70 hover:opacity-100"
                    : "opacity-0 group-hover:opacity-70 hover:!opacity-100"
                }`}
                title={`Close ${tab.name}`}
                aria-label={`Close ${tab.name}`}
              >
                <VscClose size={13} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex-1 h-full min-w-4" />
    </div>
  );
}
