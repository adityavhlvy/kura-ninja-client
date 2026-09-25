import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiHouseLight,
  PiFolderLight,
  PiUserLight,
  PiCertificateLight,
  PiEnvelopeSimpleLight,
  PiArrowRightLight,
  PiSunLight,
  PiMoonLight,
  PiSpeakerHighLight,
  PiSpeakerSimpleSlashLight,
} from "react-icons/pi";
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
import { playTick, playPop, isSoundEnabled, setSoundEnabled } from "@/lib/sound";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  category: "navigation" | "projects" | "actions";
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

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "senja";
    const next = current === "senja" ? "fajar" : "senja";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    playPop();
  };

  const toggleSound = () => {
    const next = !isSoundEnabled();
    setSoundEnabled(next);
    if (next) playTick();
  };

  const commands: Command[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        description: "Homepage, flagship systems & bio",
        icon: <PiHouseLight size={16} />,
        action: () => navigate("/"),
        keywords: ["home", "main", "start", "kura ninja"],
        category: "navigation",
      },
      {
        id: "projects",
        label: "Projects",
        description: "Geospatial platforms & multi-agent systems",
        icon: <PiFolderLight size={16} />,
        action: () => navigate("/projects"),
        keywords: ["projects", "systems", "portfolio", "code", "aegis", "pinter", "nexus"],
        category: "navigation",
      },
      {
        id: "about",
        label: "About",
        description: "Background, interactive journey & skills",
        icon: <PiUserLight size={16} />,
        action: () => navigate("/about"),
        keywords: ["about", "bio", "timeline", "journey", "skills", "experience"],
        category: "navigation",
      },
      {
        id: "certifications",
        label: "Certifications",
        description: "Google AI ADK & Project Management credentials",
        icon: <PiCertificateLight size={16} />,
        action: () => navigate("/certifications"),
        keywords: ["certifications", "certs", "credentials", "google", "skilvul"],
        category: "navigation",
      },
      {
        id: "contact",
        label: "Contact",
        description: "Direct email & social channels",
        icon: <PiEnvelopeSimpleLight size={16} />,
        action: () => navigate("/contact"),
        keywords: ["contact", "email", "reach", "hire", "collab", "linkedin"],
        category: "navigation",
      },
      {
        id: "action-theme",
        label: "Toggle Theme (Senja / Fajar)",
        description: "Switch between Twilight dark and Dawn warm paper",
        icon: <PiSunLight size={16} />,
        action: toggleTheme,
        keywords: ["theme", "dark", "light", "senja", "fajar", "mode"],
        category: "actions",
      },
      {
        id: "action-sound",
        label: "Toggle Audio Haptics",
        description: "Enable or mute subtle Web Audio clicks",
        icon: <PiSpeakerHighLight size={16} />,
        action: toggleSound,
        keywords: ["sound", "audio", "mute", "click", "haptics"],
        category: "actions",
      },
      ...projectsData.map((p): Command => ({
        id: `project-${p.slug}`,
        label: p.title,
        description: `${p.techStack.slice(0, 3).join(", ")} (${p.status})`,
        icon: <PiFolderLight size={16} />,
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
      playTick();
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
          className="group flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl transition-colors data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
        >
          <span className="text-muted-foreground group-data-[selected=true]:text-primary">
            {cmd.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-xs font-semibold truncate text-foreground group-data-[selected=true]:text-primary">
              {cmd.label}
            </div>
            {cmd.description && (
              <div className="text-[11px] text-muted-foreground truncate font-mono">
                {cmd.description}
              </div>
            )}
          </div>
          <PiArrowRightLight className="opacity-0 group-data-[selected=true]:opacity-80 transition-opacity ml-auto text-primary" size={13} />
        </CommandItem>
      ));

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      className="bg-card/95 backdrop-blur-2xl border-border rounded-2xl shadow-2xl p-0 overflow-hidden font-mono"
    >
      <CommandInput placeholder="Search pages, projects, or actions..." className="font-mono text-xs" />
      <CommandList className="max-h-80 p-2">
        <CommandEmpty>
          <div className="py-6 text-center text-xs text-muted-foreground font-mono">
            No matching items found.
          </div>
        </CommandEmpty>

        <CommandGroup heading="Actions">{renderItems("actions")}</CommandGroup>
        <CommandSeparator className="my-1 border-border/50" />
        <CommandGroup heading="Navigation">{renderItems("navigation")}</CommandGroup>
        <CommandSeparator className="my-1 border-border/50" />
        <CommandGroup heading="Projects & Systems">{renderItems("projects")}</CommandGroup>
      </CommandList>
      <div className="px-4 py-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground font-mono bg-muted/20">
        <span>
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↑</kbd>{" "}
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↓</kbd> navigate
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-card">↵</kbd> select
        </span>
      </div>
    </CommandDialog>
  );
}
