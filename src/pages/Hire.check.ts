// Run: bun src/pages/Hire.check.ts
import { strict as assert } from "node:assert";
import { brief } from "./Hire";

const url = brief({ name: "Sari", company: "", kinds: ["AI Integration & Automation"], budget: "Not sure yet", timeline: "Flexible", message: "A & B?" });
const q = new URL(url);
assert.equal(q.protocol, "mailto:");
assert.equal(q.searchParams.get("subject"), "Project inquiry: AI Integration & Automation");
assert.equal(q.searchParams.get("body"), "Name: Sari\nService: AI Integration & Automation\nBudget: Not sure yet\nTimeline: Flexible\n\nA & B?");
console.log("ok");
