import { Link, useLocation } from "react-router-dom";
import { SlArrowLeft, SlDoc, SlMenu } from "react-icons/sl";
import { Button } from "@/components/ui/button";
import KuraTurtle from "../components/svg/KuraTurtle";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { pathname } = useLocation();

  const getBreadcrumbs = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return "kura-ninja › src › view › home › Home.tsx";

    const fileMap: Record<string, string> = {
      about: "kura-ninja › src › view › about › About.tsx",
      contact: "kura-ninja › src › view › contact › Contact.tsx",
      projects: "kura-ninja › src › view › projects › Projects.tsx",
      certifications: "kura-ninja › src › view › certifications › Certifications.tsx",
      "design-system": "kura-ninja › src › view › design-system › DesignSystem.tsx",
      "product-spec": "kura-ninja › src › view › product-spec › ProductSpec.tsx",
    };

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

      <div className="flex items-center gap-2 text-foreground text-[10px] font-mono opacity-50 select-none">
        <SlDoc size={12} className="shrink-0" />
        <span className="truncate max-w-[120px] sm:max-w-none">
          {getBreadcrumbs(pathname)}
        </span>
      </div>

      {/* Spacer to align header elements symmetrically */}
      <div className="w-8 h-8" />
    </header>
  );
}
