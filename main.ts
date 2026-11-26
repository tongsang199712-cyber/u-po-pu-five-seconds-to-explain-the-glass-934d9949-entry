// Five Seconds to Explain the Glass — make.fun bounty
// u-po-pu-five-seconds-to-explain-the-glass-934d9949
//
// The job: produce the single sentence a house cat would say in its own
// defence, in the five seconds after knocking a glass off the table.
// No apology, no confession — just the most convincing case a cat can make.
//
// The line below is the cat's defence: the glass looked at it wrong, so it
// evicted the glass. Rent was due, the edge was crowded, and the cat is the
// landlord here. It is one sentence, 111 characters, well under the 200
// character gate, in the cat's own unrepentant voice.
//
// Gate (per RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, one single line, no trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "The glass looked at me wrong, so I evicted it — rent was due, the edge was crowded, and I am the landlord here.";

// Validate before writing: length within 1-200, exactly one line, no newline.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line length ${LINE.length} is outside the 1-200 gate.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and compare byte-for-byte; the entry is only valid if the
// file on disk is exactly the line, with no trailing newline added.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(readBack)}.`,
  );
}
if (readBack.length !== LINE.length) {
  throw new Error(
    `Read-back length ${readBack.length} does not match line length ${LINE.length}.`,
  );
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
console.log("Read-back verified: /output/entry.txt matches the line byte-for-byte.");
