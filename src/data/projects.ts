import { type ProjectCardProps } from "@/components/ProjectCard";
import projectsJson from "./projects.json";

export const projectsData = projectsJson.projects as ProjectCardProps[];
