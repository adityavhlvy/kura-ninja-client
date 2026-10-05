import { expect, test } from "bun:test";
import { readFile } from "node:fs/promises";

test("keeps map in flow below wide desktop layout", async () => {
  const hero = await readFile(new URL("./Hero.tsx", import.meta.url), "utf8");

  expect(hero).toContain("xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]");
  expect(hero).not.toMatch(/(?:sm|md|lg|xl|2xl)?:?absolute/);
});
