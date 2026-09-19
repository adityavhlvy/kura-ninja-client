import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SlHome,
  SlFolder,
  SlUser,
  SlBadge,
  SlMagnifier,
  SlArrowRight,
  SlSettings,
  SlQuestion,
  SlRefresh,
  SlCloudDownload,
} from "react-icons/sl";
import { VscJson, VscMarkdown } from "react-icons/vsc";
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
  category: "navigation" | "projects" | "action" | "easter-egg";
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
        id: "design-system",
        label: "DESIGN.md",
        description: "Design specification",
        icon: <VscMarkdown />,
        action: () => navigate("/design-system"),
        keywords: ["design", "system", "tokens", "css", "color"],
        category: "navigation",
      },
      {
        id: "product-spec",
        label: "PRODUCT.md",
        description: "Product specification",
        icon: <VscMarkdown />,
        action: () => navigate("/product-spec"),
        keywords: ["product", "spec", "roadmap", "goals", "audience"],
        category: "navigation",
      },
      {
        id: "contact",
        label: "contact.json",
        description: "Connect, hire, or collaborate spec",
        icon: <VscJson />,
        action: () => navigate("/contact"),
        keywords: ["contact", "hire", "collab", "project", "spec", "email"],
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
      {
        id: "theme-toggle",
        label: "Switch Theme (Fajar / Senja)",
        description: "Toggle data-theme between senja and fajar",
        icon: <SlRefresh />,
        action: () => {
          const currentTheme =
            document.documentElement.getAttribute("data-theme") ||
            localStorage.getItem("theme") ||
            "senja";
          const next = currentTheme === "senja" ? "fajar" : "senja";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("theme", next);
          window.dispatchEvent(new Event("storage"));
        },
        keywords: [
          "switch",
          "theme",
          "fajar",
          "senja",
          "mode",
          "light",
          "dark",
          "color",
        ],
        category: "action",
      },
      {
        id: "view-cv",
        label: "Download / View CV",
        description: "Professional credentials & contact spec",
        icon: <SlCloudDownload />,
        action: () => navigate("/contact"),
        keywords: [
          "download",
          "view",
          "cv",
          "resume",
          "contact",
          "curriculum",
          "vitae",
        ],
        category: "action",
      },
      {
        id: "hire",
        label: "sudo hire-me",
        description: "You found a secret! 🐢",
        icon: <SlQuestion />,
        action: () => {
          alert(
            "Permission granted! 🐢\n\nEmail: adityavhlvy1003@gmail.com\nLinkedIn: /in/adityavahlevynugraha",
          );
        },
        keywords: ["sudo", "hire", "secret", "easter", "contact"],
        category: "easter-egg",
      },
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

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      className="bg-card border-border shadow-2xl"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-80">
        <CommandEmpty>
          <div className="py-6 text-center">
            <p className="text-foreground/50">No commands found</p>
            <p className="text-xs mt-1 text-foreground/30">
              Try &quot;sudo hire-me&quot; 😉
            </p>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Navigation">
          {commands
            .filter((c) => c.category === "navigation")
            .map((cmd) => (
              <CommandItem
                key={cmd.id}
                value={`${cmd.label} ${cmd.keywords.join(" ")}`}
                onSelect={() => executeCommand(cmd)}
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
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
            ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {commands
            .filter((c) => c.category === "projects")
            .map((cmd) => (
              <CommandItem
                key={cmd.id}
                value={`${cmd.label} ${cmd.keywords.join(" ")}`}
                onSelect={() => executeCommand(cmd)}
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
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
            ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {commands
            .filter(
              (c) => c.category === "easter-egg" || c.category === "action",
            )
            .map((cmd) => (
              <CommandItem
                key={cmd.id}
                value={`${cmd.label} ${cmd.keywords.join(" ")}`}
                onSelect={() => executeCommand(cmd)}
                className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
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
            ))}
        </CommandGroup>
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
