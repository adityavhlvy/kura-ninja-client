// Typed accessors over the JSON generated from ../portfolio-data by
// scripts/sync-data.ts. Views import data from here only.
import projectsJson from "./projects.json";
import journeyJson from "./journey.json";
import certificationsJson from "./certifications.json";
import profileJson from "./profile.json";
import archipelagoJson from "./archipelago.json";
import postsJson from "./posts.json";

export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  links: { label: string; url: string }[];
  status: "completed" | "in-progress" | "archived" | "active";
  visibility: "public" | "private";
  date: string;
  logo?: string;
  /** Variant for light backgrounds when `logo` is drawn for dark ones. */
  logoLight?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  summary?: string;
  caseStudy?: string;
  rationale?: string;
  details?: string[];
  competencies?: string[];
  technicalChallenges?: string[];
  contributions?: string[];
  notMeasured?: string[];
  fiveWOneH?: Record<"who" | "what" | "when" | "where" | "why" | "how", string>;
  problemChangeResult?: { problem: string; change: string; result: string }[];
  beforeAfter?: { measure: string; before: string; after: string; evidence?: string }[];
  keyDecisions?: { decision: string; explanation: string }[];
  evidenceCommits?: string[];
  readiness?: { tests: number; docs: number; quality: number };
}

export type JourneyType = "education" | "org" | "achievement" | "work";

export interface JourneyNode {
  id: string;
  label: string;
  type: JourneyType;
  year: string;
  details: {
    role: string;
    company?: string;
    date: string;
    description: string;
    skills: string[];
    highlight: string;
    impact: string;
  };
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  type: string;
  skills?: string[];
}

interface Profile {
  contact: { email: string; phone: string; socials: { name: string; url: string }[] };
  tagline: string;
  tagline_highlight: string;
  tagline_suffix: string;
  philosophy: { tag: string; quote: string; comment: string; vibe_quote: string };
  bio: {
    name: string;
    alias: string;
    avatar: string;
    degree_detail: string;
    current_role_detail: string;
    paragraphs: string[];
  };
  skills: { category: string; items: string[] }[];
}

export interface Archipelago {
  radiusDeg: number;
  cols: number;
  rows: number;
  provinces: { code: string; name: string }[];
  hexes: [q: number, r: number, province: number][];
}

export interface Post {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  cover?: string;
  tags: string[];
  /** Slug of the project this post is about, if any. */
  project?: string;
  minutes: number;
  toc: { id: string; label: string }[];
  /** Rendered at build time from our own markdown in portfolio-data/posts. */
  html: string;
}

export const posts = (postsJson as { posts: Post[] }).posts;

export const getPost = (slug?: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const projects = (projectsJson as { projects: Project[] }).projects;
export const journey = (journeyJson as { journey: JourneyNode[] }).journey;
export const certifications = (
  certificationsJson as { certifications: { category: string; items: CertificationItem[] }[] }
).certifications;
export const profile = profileJson as Profile;
export const archipelago = archipelagoJson as Archipelago;

/** The three platforms in production at Pupuk Indonesia, each with real screenshots. */
export const flagships = ["pinter", "aegis-atlas", "nexus"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export const otherProjects = projects.filter((p) => !flagships.includes(p));

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);

export const certificationCount = certifications.reduce((n, g) => n + g.items.length, 0);

export const journeyTypeLabel: Record<JourneyType, string> = {
  education: "Education",
  work: "Work",
  org: "Organisation",
  achievement: "Programme",
};

export const statusLabel: Record<Project["status"], string> = {
  "in-progress": "In development",
  active: "Live",
  completed: "Completed",
  archived: "Archived",
};

/** Short display name, e.g. "NEXUS (Arca, Delta & Vista)" -> "NEXUS". */
export const shortTitle = (p: Project) =>
  p.title.replace(/\s*\(.*\)$/, "").replace(/ AI Agent Platform$/, "");
