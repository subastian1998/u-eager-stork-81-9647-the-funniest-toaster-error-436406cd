import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "BREAD JAMMED. Please do not insert a knife. I have seen how this ends.";

// Gate (mirrors the competition gate in RULES.txt): UTF-8 text of 1 to 120
// characters, not only white space.
function validateEntry(entry: string): void {
  const length = [...entry].length;
  if (length < 1 || length > 120) {
    throw new Error(`entry is ${length} characters, gate is 1-120`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

validateEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write check: what landed on disk must be byte-identical to ENTRY.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("post-write check failed: entry.txt differs from ENTRY");
}
