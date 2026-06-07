#!/usr/bin/env node

// Redraw every screenshot annotation under markdowns/ with the updated
// screenshot-marker code. Regenerates bbox positions from scratch using the
// stored request_text queries, applies the brand color, and runs the new
// --steps validator/correction pass.
//
// Usage:
//   node scripts/redraw-annotations.mjs [--only <substr>] [--concurrency N] [--dry-run]

import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PLUGINS = path.resolve(ROOT, "..");
const MARKER = path.join(PLUGINS, "screenshot-marker");
const PYTHON = path.join(MARKER, ".venv/bin/python");
const ANNOTATE = path.join(MARKER, "annotate.py");
const MARKDOWNS = path.join(ROOT, "markdowns");

const COLOR = "#873EFF";

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const onlyIndex = argv.indexOf("--only");
const only = onlyIndex === -1 ? "" : argv[onlyIndex + 1] || "";
const listIndex = argv.indexOf("--list");
const listFile = listIndex === -1 ? "" : argv[listIndex + 1] || "";
const listSet = listFile
  ? new Set(
      readFileSync(listFile, "utf8")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;
const concIndex = argv.indexOf("--concurrency");
const concurrency = concIndex === -1 ? 4 : Math.max(1, Number(argv[concIndex + 1]) || 4);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith("-original.png")) out.push(full);
  }
  return out;
}

function queriesFor(resultPath) {
  const data = JSON.parse(readFileSync(resultPath, "utf8"));
  if (!Array.isArray(data.annotations)) return [];
  return data.annotations
    .map((a) => a && typeof a.request_text === "string" ? a.request_text : null)
    .filter(Boolean);
}

const originals = walk(MARKDOWNS)
  .filter((p) => !only || p.includes(only))
  .filter((p) => !listSet || listSet.has(path.relative(ROOT, p)))
  .sort();

const jobs = [];
for (const imagePath of originals) {
  const resultPath = imagePath.replace(/-original\.png$/, "-annotation-result.json");
  const outputPath = imagePath.replace(/-original\.png$/, "-annotated.png");
  if (!existsSync(resultPath)) {
    console.error(`SKIP (no result.json): ${path.relative(ROOT, imagePath)}`);
    continue;
  }
  const queries = queriesFor(resultPath);
  if (queries.length === 0) {
    console.error(`SKIP (no queries): ${path.relative(ROOT, imagePath)}`);
    continue;
  }
  jobs.push({ imagePath, resultPath, outputPath, queries });
}

console.log(`Found ${jobs.length} screenshots to redraw (concurrency=${concurrency}, color=${COLOR}).`);

let completed = 0;
let failed = 0;
let idx = 0;

function runJob(job) {
  return new Promise((resolve) => {
    const rel = path.relative(ROOT, job.imagePath);
    if (dryRun) {
      console.log(`would redraw ${rel} (${job.queries.length} queries)`);
      resolve();
      return;
    }
    const args = [
      ANNOTATE,
      "--image", job.imagePath,
      "--output", job.outputPath,
      "--color", COLOR,
      "--steps",
      "--allow-unresolved",
    ];
    for (const q of job.queries) args.push("--query", q);

    const child = spawn(PYTHON, args, { cwd: MARKER, env: { ...process.env } });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => {
      if (stdout.trim()) writeFileSync(job.resultPath, stdout, "utf8");
      if (code === 0) {
        completed += 1;
        const summary = (stderr.trim().split("\n").pop() || "").trim();
        console.log(`[${completed + failed}/${jobs.length}] OK ${rel}  ${summary}`);
      } else {
        failed += 1;
        console.error(`[${completed + failed}/${jobs.length}] FAIL ${rel}\n${stderr.trim()}`);
      }
      resolve();
    });
  });
}

async function worker() {
  while (idx < jobs.length) {
    const job = jobs[idx++];
    await runJob(job);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

console.log(`\nDone: completed=${completed} failed=${failed} total=${jobs.length}`);
process.exit(failed > 0 ? 1 : 0);
