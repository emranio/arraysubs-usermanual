#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");
const MARKER = path.resolve(ROOT, "../screenshot-marker");
const PYTHON = path.join(MARKER, ".venv/bin/python");
const ANNOTATE = path.join(MARKER, "annotate.py");
const useRefine = process.argv.includes("--refine");
const onlyIndex = process.argv.indexOf("--only");
const only = onlyIndex === -1 ? "" : process.argv[onlyIndex + 1] || "";
const colorIndex = process.argv.indexOf("--color");
const color = colorIndex === -1 ? "#DC2626" : process.argv[colorIndex + 1] || "#DC2626";

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith("-original.png")) {
      files.push(full);
    }
  }
  return files;
}

function readQueries(promptPath) {
  const lines = readFileSync(promptPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const bullets = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-+\s*/, "").trim())
    .filter(Boolean);

  if (bullets.length > 0) {
    return bullets;
  }

  return lines
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !line.toLowerCase().startsWith("source screenshot:"))
    .map((line) => line.replace(/^-+\s*/, "").trim())
    .filter(Boolean);
}

const originals = walk(MARKDOWNS)
  .sort()
  .filter((file) => !only || file.includes(only));

let completed = 0;
let failed = 0;
let skipped = 0;

for (const imagePath of originals) {
  const rel = path.relative(ROOT, imagePath).replaceAll(path.sep, "/");
  const promptPath = imagePath.replace(/-original\.png$/, "-annotation-prompts.txt");
  const outputPath = imagePath.replace(/-original\.png$/, "-annotated.png");
  const resultPath = imagePath.replace(/-original\.png$/, "-annotation-result.json");

  if (!existsSync(promptPath)) {
    console.error(`missing prompt file: ${path.relative(ROOT, promptPath)}`);
    failed += 1;
    continue;
  }

  const queries = readQueries(promptPath);
  if (queries.length === 0) {
    console.error(`empty prompt file: ${path.relative(ROOT, promptPath)}`);
    failed += 1;
    continue;
  }

  mkdirSync(path.dirname(outputPath), { recursive: true });

  const args = [
    ANNOTATE,
    "--image",
    imagePath,
    "--output",
    outputPath,
    "--color",
    color,
    "--allow-unresolved",
  ];

  if (!useRefine) {
    args.push("--no-refine");
  }

  for (const query of queries) {
    args.push("--query", query);
  }

  const result = spawnSync(PYTHON, args, {
    cwd: MARKER,
    encoding: "utf8",
    env: { ...process.env },
  });

  if (result.stdout) {
    writeFileSync(resultPath, result.stdout, "utf8");
  }

  if (result.status !== 0) {
    failed += 1;
    console.error(result.stderr || `annotation failed: ${rel}`);
    continue;
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  console.log(`regenerated ${rel}`);
  completed += 1;
}

skipped = walk(MARKDOWNS).length - originals.length;
console.log(
  `regenerate summary: completed=${completed} skipped=${skipped} failed=${failed} refine=${useRefine ? "yes" : "no"} color=${color}`,
);

if (failed > 0) {
  process.exit(1);
}
