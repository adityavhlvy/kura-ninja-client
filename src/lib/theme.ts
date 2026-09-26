import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();
const read = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light") as Theme;

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode: the choice just will not persist.
  }
  listeners.forEach((l) => l());
}

export function useTheme() {
  const theme = useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    read,
  );
  return { theme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}
