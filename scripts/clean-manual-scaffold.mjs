#!/usr/bin/env node

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function pageTitle(content, file) {
  for (const line of content.split("\n")) {
    const match = line.match(/^# (.+)$/);
    if (match && match[1].trim() !== "Info") {
      return match[1].trim();
    }
  }
  return path.basename(file, ".md").replace(/-/g, " ");
}

let updated = 0;

for (const file of walk(MARKDOWNS)) {
  let content = readFileSync(file, "utf8");
  const original = content;
  const title = pageTitle(content, file);

  content = content.replaceAll("Annotated Info screenshot:", `Annotated ${title} screenshot:`);
  content = content.replaceAll("- Availability: Pro/ Free + Pro", "- Availability: Free + Pro");
  content = content.replaceAll("- Availability: Shared/ Free + Pro", "- Availability: Free + Pro");

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    updated += 1;
    console.log(`cleaned ${path.relative(ROOT, file)}`);
  }
}

console.log(`cleanup summary: updated=${updated}`);
