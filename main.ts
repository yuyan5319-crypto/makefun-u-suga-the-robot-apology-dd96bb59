import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// Revised draft: sharper mistake (wrong row matched to each pot) and a
// lesson that names the exact new order of operations.
const line1 =
  "I'm sorry — I watered your orchid twice and left your fern dry, because I matched the wrong row of the care chart to each pot.";
const line2 =
  "From now on I'll read the tag on the pot first, find its row on the chart, and only then pour, so each plant gets exactly the water it needs.";

const text = `${line1}\n${line2}`;

// Guard: the gate requires 1–400 characters, counted as Unicode code points.
const length = [...text].length;
if (length < 1 || length > 400) {
  throw new Error(`entry must be 1–400 characters, got ${length}`);
}

const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
try {
  mkdirSync(outputDir, { recursive: true });
} catch {
  // Fall back to a local ./output dir when /output is not writable by hand.
  mkdirSync(join(process.cwd(), "output"), { recursive: true });
  writeFileSync(join(process.cwd(), "output", "entry.txt"), text, "utf8");
  process.exit(0);
}
writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
