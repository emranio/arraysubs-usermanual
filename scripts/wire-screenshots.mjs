#!/usr/bin/env node

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");

function walk(dir, predicate, output = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, predicate, output);
    } else if (predicate(full)) {
      output.push(full);
    }
  }
  return output;
}

function titleFromMarkdown(file) {
  const content = readFileSync(file, "utf8");
  const match = content
    .split("\n")
    .map((line) => line.match(/^# (.+)$/))
    .find((heading) => heading && heading[1].trim() !== "Info");
  if (match) {
    return match[1].trim();
  }
  return path.basename(file, ".md").replace(/-/g, " ");
}

function titleFromImage(file) {
  return path
    .basename(file, ".png")
    .replace(/^\d+-/, "")
    .replace(/-annotated$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function markdownForAssetsDir(assetsDir) {
  const base = path.basename(assetsDir, ".assets");
  const parent = path.dirname(assetsDir);
  return path.join(parent, `${base}.md`);
}

function visualSection(pageTitle, mdFile, images) {
  const blocks = images.map((image) => {
    const rel = path.relative(path.dirname(mdFile), image).replaceAll(path.sep, "/");
    const alt = `Annotated ${pageTitle} screenshot: ${titleFromImage(image)}`;
    return `![${alt}](${rel})`;
  });

  return [
    "## Visual Guide",
    "",
    "Use these annotated screenshots to match each step in this guide with the actual ArraySubs admin screen.",
    "",
    ...blocks.flatMap((block) => [block, ""]),
  ].join("\n").trimEnd() + "\n\n";
}

const assetDirs = walk(
  MARKDOWNS,
  (file) => file.endsWith("-annotated.png"),
).reduce((dirs, image) => {
  dirs.add(path.dirname(image));
  return dirs;
}, new Set());

let updated = 0;

for (const assetsDir of Array.from(assetDirs).sort()) {
  const mdFile = markdownForAssetsDir(assetsDir);
  try {
    statSync(mdFile);
  } catch {
    continue;
  }

  let content = readFileSync(mdFile, "utf8");
  const images = readdirSync(assetsDir)
    .filter((name) => name.endsWith("-annotated.png"))
    .sort()
    .map((name) => path.join(assetsDir, name))
    .filter((image) => {
      const rel = path.relative(path.dirname(mdFile), image).replaceAll(path.sep, "/");
      return !content.includes(rel);
    });

  if (images.length === 0) {
    continue;
  }

  const pageTitle = titleFromMarkdown(mdFile);
  const section = visualSection(pageTitle, mdFile, images);

  const pageNavIndex = content.indexOf("## Page Navigation");
  if (pageNavIndex === -1) {
    const firstSecondLevelHeading = content.indexOf("\n## ");
    if (firstSecondLevelHeading === -1) {
      content = `${content.trimEnd()}\n\n${section}`;
    } else {
      const insertAt = firstSecondLevelHeading + 1;
      content = `${content.slice(0, insertAt)}${section}${content.slice(insertAt)}`;
    }
  } else {
    const afterPageNav = content.indexOf("\n## ", pageNavIndex + "## Page Navigation".length);
    if (afterPageNav === -1) {
      content = `${content.trimEnd()}\n\n${section}`;
    } else {
      const insertAt = afterPageNav + 1;
      content = `${content.slice(0, insertAt)}${section}${content.slice(insertAt)}`;
    }
  }

  writeFileSync(mdFile, content, "utf8");
  updated += 1;
  console.log(`wired ${images.length} screenshot(s): ${path.relative(ROOT, mdFile)}`);
}

console.log(`screenshot wiring summary: updated=${updated}`);
