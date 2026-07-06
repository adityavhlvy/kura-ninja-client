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
} from "react-icons/sl";
import { VscJson } from "react-icons/vsc";
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
  category: "navigation" | "action" | "easter-egg";
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
        description: "View quest log",
        icon: <SlFolder />,
        action: () => navigate("/projects"),
        keywords: ["projects", "quests", "work", "portfolio", "quest log"],
        category: "navigation",
      },
      {
        id: "about",
        label: "About",
        description: "Who is this person?",
        icon: <SlUser />,
        action: () => navigate("/about"),
        keywords: ["about", "me", "siapa", "who", "bio", "journey"],
        category: "navigation",
      },
      {
        id: "certifications",
        label: "Certifications",
        description: "Achievements unlocked",
        icon: <SlBadge />,
        action: () => navigate("/certifications"),
        keywords: ["certifications", "certs", "badges", "achievements"],
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
