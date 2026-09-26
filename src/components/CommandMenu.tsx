import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { PiArrowUpRightBold, PiCopyBold, PiFileTextBold, PiMoonBold, PiSunBold } from "react-icons/pi";
import { profile, projects } from "@/data/portfolio";
import { setTheme } from "@/lib/theme";
import { NAV } from "@/layout/Header";

const item =
  "flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm text-mute data-[selected=true]:bg-sunk data-[selected=true]:text-ink";
const group =
  "[&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-mute [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5";

export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const run = (fn: () => void) => () => {
    onOpenChange(false);
    fn();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Jump to"
      overlayClassName="fixed inset-0 z-50 bg-ink/30"
      contentClassName="fixed left-1/2 top-[14vh] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 border border-line bg-paper shadow-[0_24px_60px_-20px_rgb(18_21_24/0.35)]"
    >
      <Command.Input
        placeholder="Search pages, projects, actions"
        className="h-14 w-full border-b border-line bg-transparent px-4 text-base outline-none placeholder:text-mute"
      />
      <Command.List className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain pb-2">
        <Command.Empty className="px-4 py-8 text-sm text-mute">
          Nothing matches. Try a project name like "Atlas" or a tool like "FastAPI".
        </Command.Empty>

        <Command.Group heading="Pages" className={group}>
          {[{ to: "/", label: "Home" }, ...NAV].map((n) => (
            <Command.Item key={n.to} value={`page ${n.label}`} onSelect={run(() => navigate(n.to))} className={item}>
              <PiFileTextBold aria-hidden="true" /> {n.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects" className={group}>
          {projects.map((p) => (
            <Command.Item
              key={p.slug}
              value={`${p.title} ${p.techStack.join(" ")}`}
              onSelect={run(() => navigate(`/projects/${p.slug}`))}
              className={item}
            >
              <span className="w-10 font-mono text-xs">{p.date}</span>
              <span className="truncate">{p.title}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={group}>
          <Command.Item value="copy email address" onSelect={run(() => navigator.clipboard?.writeText(profile.contact.email))} className={item}>
            <PiCopyBold aria-hidden="true" /> Copy email address
          </Command.Item>
          <Command.Item value="theme light" onSelect={run(() => setTheme("light"))} className={item}>
            <PiSunBold aria-hidden="true" /> Light theme
          </Command.Item>
          <Command.Item value="theme dark" onSelect={run(() => setTheme("dark"))} className={item}>
            <PiMoonBold aria-hidden="true" /> Dark theme
          </Command.Item>
          {profile.contact.socials.map((s) => (
            <Command.Item key={s.name} value={`open ${s.name}`} onSelect={run(() => window.open(s.url, "_blank", "noreferrer"))} className={item}>
              <PiArrowUpRightBold aria-hidden="true" /> Open {s.name}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
