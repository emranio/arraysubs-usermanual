#!/usr/bin/env node
const { buildSite, cleanDist, getProjectPaths } = require("./build");
const { startDesignServer } = require("./design-server");
const { startDevServer } = require("./dev-server");

async function main() {
  const command = process.argv[2] || "build";
  const rootDir = process.cwd();

  try {
    if (command === "clean") {
      await cleanDist(getProjectPaths(rootDir));
      console.log("Removed dist directory.");
      return;
    }

    if (command === "build") {
      const site = await buildSite({ rootDir });
      console.log(`Built ${site.pages.length} documentation pages.`);
      return;
    }

    if (command === "dev") {
      await startDevServer(rootDir);
      return;
    }

    if (command === "design") {
      await startDesignServer(rootDir);
      return;
    }

    console.error(`Unknown command: ${command}`);
    process.exitCode = 1;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
