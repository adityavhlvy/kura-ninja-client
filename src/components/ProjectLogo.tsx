import clsx from "clsx";
import type { Project } from "@/data/portfolio";

/** Square logo tile. Swaps to `logoLight` on the light theme when one exists. */
export function ProjectLogo({ project, className }: { project: Project; className?: string }) {
  if (!project.logo) return null;
  const img = "max-h-full max-w-full object-contain";
  return (
    <span className={clsx("grid shrink-0 place-items-center border border-line bg-sunk p-2", className)}>
      {project.logoLight ? (
        <>
          <img src={project.logoLight} alt="" className={clsx(img, "dark:hidden")} />
          <img src={project.logo} alt="" className={clsx(img, "hidden dark:block")} />
        </>
      ) : (
        <img src={project.logo} alt="" className={img} />
      )}
    </span>
  );
}
