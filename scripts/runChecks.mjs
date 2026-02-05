import { runBrowserChecks } from "../src/timerLogic.ts";

const results = runBrowserChecks();
const failed = results.filter((r) => !r.ok);

for (const r of results) console.log(`${r.ok ? "✅" : "❌"} ${r.name}`);

if (failed.length) {
  console.error(`\n${failed.length} check(s) failed.`);
  process.exit(1);
}

console.log("\nAll checks passed.");
