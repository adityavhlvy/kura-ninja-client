import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SlHome,
  SlFolder,
  SlUser,
  SlBadge,
  SlEnvolope,
  SlArrowRight,
} from "react-icons/sl";
import { projectsData } from "../data/projects";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  category: "navigation" | "projects";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const navigate = useNavigate();

  const commands: Command[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        description: "Go to homepage",
        icon: <SlHome />,
        action: () => navigate("/"),
        keywords: ["home", "beranda", "main", "start"],
        category: "navigation",
      },
      {
        id: "projects",
        label: "Projects",
        description: "Explore projects & systems",
        icon: <SlFolder />,
        action: () => navigate("/projects"),
        keywords: ["projects", "work", "systems", "portfolio"],
        category: "navigation",
      },
      {
        id: "about",
        label: "About",
        description: "Background, journey & skills",
        icon: <SlUser />,
        action: () => navigate("/about"),
        keywords: ["about", "me", "bio", "journey", "profile"],
        category: "navigation",
      },
      {
        id: "certifications",
        label: "Certifications",
        description: "Verified credentials & certificates",
        icon: <SlBadge />,
        action: () => navigate("/certifications"),
        keywords: ["certifications", "certs", "badges", "credentials"],
        category: "navigation",
      },
      {
        id: "contact",
        label: "Contact",
        description: "Get in touch",
        icon: <SlEnvolope />,
        action: () => navigate("/contact"),
        keywords: ["contact", "hire", "collab", "email", "cv", "resume"],
        category: "navigation",
      },
      ...projectsData.map((p): Command => ({
        id: `project-${p.slug}`,
        label: p.title,
        description: `${p.techStack.slice(0, 3).join(", ")} · ${p.status}`,
        icon: <SlFolder />,
        action: () => navigate(`/projects/${p.slug}`),
        keywords: [
          p.title.toLowerCase(),
          p.slug,
          ...p.techStack.map((t) => t.toLowerCase()),
        ],
        category: "projects",
      })),
    ],
    [navigate],
  );

  const executeCommand = useCallback(
    (command: Command) => {
      command.action();
      onClose();
    },
    [onClose],
  );

  const renderItems = (category: Command["category"]) =>
    commands
      .filter((c) => c.category === category)
      .map((cmd) => (
        <CommandItem
          key={cmd.id}
          value={`${cmd.label} ${cmd.keywords.join(" ")}`}
          onSelect={() => executeCommand(cmd)}
          className="group flex items-center gap-3 px-3 py-2.5 cursor-pointer"
        >
          <span className="text-lg opacity-70">{cmd.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{cmd.label}</div>
            {cmd.description && (
              <div className="text-xs opacity-50 truncate">
                {cmd.description}
              </div>
            )}
          </div>
          <SlArrowRight className="opacity-0 group-data-[selected=true]:opacity-50 transition-opacity ml-auto" />
        </CommandItem>
      ));

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      className="bg-card border-border shadow-2xl"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-80">
        <CommandEmpty>
          <div className="py-6 text-center text-foreground/50">
            No commands found
          </div>
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          {renderItems("navigation")}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">{renderItems("projects")}</CommandGroup>
      </CommandList>
      <div className="px-4 py-2 border-t border-border/50 flex items-center gap-4 text-[10px] text-foreground/40 font-mono">
        <span>
          <kbd className="px-1 py-0.5 rounded border border-border bg-muted">
            ↑
          </kbd>{" "}
          <kbd className="px-1 py-0.5 rounded border border-border bg-muted">
            ↓
          </kbd>{" "}
          navigate
        </span>
        <span>
          <kbd className="px-1 py-0.5 rounded border border-border bg-muted">
            ↵
          </kbd>{" "}
          select
        </span>
      </div>
    </CommandDialog>
  );
}