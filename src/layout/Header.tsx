import { Link, useLocation } from "react-router-dom";
import { SlArrowLeft, SlDoc, SlMenu, SlMagnifier } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import KuraTurtle from "../components/svg/KuraTurtle";
import AtmosphereIndicator from "../components/AtmosphereIndicator";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onOpenCommandPalette?: () => void;
}

export default function Header({
  isSidebarOpen,
  toggleSidebar,
  onOpenCommandPalette,
}: HeaderProps) {
  const { pathname } = useLocation();

  const getBreadcrumbs = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0)
      return "kura-ninja › src › view › home › Home.tsx";

    const fileMap: Record<string, string> = {
      about: "kura-ninja › src › view › about › About.tsx",
      contact: "kura-ninja › src › view › contact › Contact.tsx",
      projects: "kura-ninja › src › view › projects › Projects.tsx",
      certifications:
        "kura-ninja › src › view › certifications › Certifications.tsx",
      "design-system": "kura-ninja › src › view › design-system › DESIGN.md",
      "product-spec": "kura-ninja › src › view › product-spec › PRODUCT.md",
    };

    if (segments[0] === "projects" && segments[1]) {
      return `kura-ninja › src › view › projects › ${segments[1]}.tsx`;
    }

    return fileMap[segments[0]] || `kura-ninja › src › view › ${segments[0]}`;
  };

  return (
    <header className="flex h-12 w-full items-center justify-between border-b border-border bg-background z-30 px-3">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <SlArrowLeft size={14} /> : <SlMenu size={14} />}
        </Button>
        <Link
          to="/"
          className="flex items-center gap-1.5 px-1.5 hover:opacity-85 transition-opacity"
        >
          <KuraTurtle size={44} />
          <span className="font-mono text-xs font-bold text-foreground/80 hidden sm:inline">
            kura-ninja
          </span>
        </Link>
      </div>

      <div className="hidden min-[600px]:flex items-center gap-2 text-foreground text-[10px] font-mono opacity-50 select-none">
        <SlDoc size={12} className="shrink-0" />
        <span className="truncate max-w-[120px] md:max-w-none">
          {getBreadcrumbs(pathname)}
        </span>
      </div>

      {/* Cyber-IDE Command Strip */}
      <div className="flex items-center gap-2 shrink-0">
        <AtmosphereIndicator />

        <span className="font-mono text-[10px] text-muted-foreground/60 hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border/40 bg-muted/20">
          git:(dev*)
        </span>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-1.5 px-2 py-1 rounded-sm text-xs font-mono bg-muted/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          title="Search / Command Palette (⌘K)"
          aria-label="Search / Command Palette"
        >
          <SlMagnifier size={11} className="shrink-0 text-primary/80" />
          <span className="hidden sm:inline text-[11px]">Search</span>
          <kbd className="hidden sm:inline-flex items-center text-[9px] px-1 py-0.5 rounded bg-background/80 border border-border/60 text-muted-foreground font-mono leading-none">
            ⌘K
          </kbd>
        </button>

        <Link
          to="/contact"
          className="flex items-center gap-1 px-2 py-1 rounded-sm text-[11px] font-mono font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-colors"
          title="Contact & CV Spec"
        >
          <span>CV</span>
        </Link>
      </div>
    </header>
  );
}
