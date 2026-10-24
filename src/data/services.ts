// What I take on outside Pupuk Indonesia. Each service points at the work that proves it.
export const services = [
  {
    id: "ai",
    title: "AI Integration & Automation",
    pitch: "AI built into the tools you already run: assistants that know your data, agents that do the repetitive work, and costs kept in check.",
    includes: ["Assistants grounded in your documents and data", "Agents connected to your apps, APIs, and MCP tools", "Guardrails, evaluation, and smart model routing"],
    proof: "pinter",
  },
  {
    id: "geo",
    title: "Maps & Geospatial Apps",
    pitch: "Web maps that planners actually use: layers, filters, and numbers recalculated as the inputs change.",
    includes: ["Interactive web maps (OpenLayers, MapLibre)", "Satellite and spatial data pipelines", "Dashboards over regional data"],
    proof: "aegis-atlas",
  },
  {
    id: "web",
    title: "Software Development",
    pitch: "From the database to the deploy: internal tools, dashboards, and products built to be maintained.",
    includes: ["React frontends, Go or FastAPI backends", "Auth, SSO, and role-based access", "Deploy, CI, and handover docs"],
    proof: "nexus",
  },
] as const;

export const budgets = ["Under Rp 10 jt", "Rp 10–30 jt", "Rp 30–75 jt", "Above Rp 75 jt", "Not sure yet"];
export const timelines = ["Within a month", "1–3 months", "3+ months", "Flexible"];
