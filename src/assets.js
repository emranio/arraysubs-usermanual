const fs = require("fs/promises");
const path = require("path");
const sass = require("sass");
const { ensureDir, pathExists, toPosix, walkDir } = require("./utils");

async function copyFilePreservingTree(fromPath, toPath) {
  await ensureDir(path.dirname(toPath));
  await fs.copyFile(fromPath, toPath);
}

async function copyDirectoryPreservingTree(fromPath, toPath) {
  await ensureDir(path.dirname(toPath));
  await fs.cp(fromPath, toPath, { recursive: true });
}

async function copyContentAssets(paths, assetFiles) {
  await Promise.all(
    assetFiles.map(async (filePath) => {
      const relativePath = toPosix(path.relative(paths.markdownsDir, filePath));
      const destinationPath = path.join(paths.distDir, relativePath);
      await copyFilePreservingTree(filePath, destinationPath);
    }),
  );
}

async function copyStaticAssets(paths) {
  const assetOutputDir = path.join(paths.distDir, "assets");
  await ensureDir(assetOutputDir);

  // Compile SCSS → CSS
  const scssEntry = path.join(paths.templatesDir, "scss", "style.scss");
  const compiled = sass.compile(scssEntry, { style: "compressed" });
  await fs.writeFile(
    path.join(assetOutputDir, "style.css"),
    compiled.css,
    "utf8",
  );

  await copyFilePreservingTree(
    path.join(paths.srcDir, "script.js"),
    path.join(assetOutputDir, "script.js"),
  );

  const mermaidSourceDir = path.join(
    paths.rootDir,
    "node_modules",
    "mermaid",
    "dist",
  );

  if (await pathExists(mermaidSourceDir)) {
    const mermaidOutputDir = path.join(assetOutputDir, "vendor", "mermaid");

    await copyFilePreservingTree(
      path.join(mermaidSourceDir, "mermaid.esm.min.mjs"),
      path.join(mermaidOutputDir, "mermaid.esm.min.mjs"),
    );

    await copyDirectoryPreservingTree(
      path.join(mermaidSourceDir, "chunks"),
      path.join(mermaidOutputDir, "chunks"),
    );
  }

  if (!(await pathExists(paths.staticDir))) {
    return;
  }

  const entries = await walkDir(paths.staticDir);

  await Promise.all(
    entries.map(async (sourcePath) => {
      const relativePath = toPosix(path.relative(paths.staticDir, sourcePath));
      const destinationPath = path.join(assetOutputDir, relativePath);
      await copyFilePreservingTree(sourcePath, destinationPath);
    }),
  );
}

module.exports = {
  copyContentAssets,
  copyStaticAssets,
};
