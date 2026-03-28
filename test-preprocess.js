const fs = require("fs");

// Load function from parser.js source
const src = fs.readFileSync("src/parser.js", "utf8");

// Extract the function
const fnMatch = src.match(
  /function preprocessImagePaths\(markdown\) \{[\s\S]*?\n\}\n/,
);
if (!fnMatch) {
  console.error("Could not extract preprocessImagePaths");
  process.exit(1);
}

eval(fnMatch[0]);

const tests = [
  ["![Image](photo ai (1).png)", "![Image](<photo ai (1).png>)"],
  ["![Alt](simple.png)", "![Alt](simple.png)"],
  ["![S](my screenshot.png)", "![S](<my screenshot.png>)"],
  ["Text ![I](photo ai (1).png) end", "Text ![I](<photo ai (1).png>) end"],
  ['![P](file.jpg "title")', '![P](file.jpg "title")'],
  ["No images here", "No images here"],
];

let passed = 0;
for (const [input, expected] of tests) {
  const result = preprocessImagePaths(input);
  const ok = result === expected;
  console.log(ok ? "PASS" : "FAIL", JSON.stringify(input));
  if (!ok) {
    console.log("  Expected:", JSON.stringify(expected));
    console.log("  Got:     ", JSON.stringify(result));
  } else {
    passed++;
  }
}

console.log(`\n${passed}/${tests.length} passed`);
