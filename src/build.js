const fsSync = require("fs");
const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");
const { copyContentAssets, copyStaticAssets } = require("./assets");
const { generateLlmsTxt } = require("./llms");
const {
  buildBreadcrumbs,
  buildNavigationTree,
  loadMenuOrder,
  renderBreadcrumbs,
  renderSidebar,
  renderToc,
} = require("./navigation");
const { parseMarkdownFile } = require("./parser");
const { loadTemplates, renderPageHtml } = require("./renderer");
const { generateSitemapXml } = require("./sitemap");
const {
  ensureDir,
  formatPrettyDate,
  normalizeBaseUrl,
  walkDir,
} = require("./utils");

function getProjectPaths(rootDir) {
  return {
    distDir: path.join(rootDir, "dist"),
    markdownsDir: path.join(rootDir, "markdowns"),
    rootDir,
    srcDir: path.join(rootDir, "src"),
    staticDir: path.join(rootDir, "static"),
    templatesDir: path.join(rootDir, "src", "templates"),
  };
}

function loadProjectConfig(rootDir) {
  dotenv.config({ path: path.join(rootDir, ".env") });

  return {
    faviconFilename: process.env.FAVICON_FILENAME || "favicon.svg",
    port: Number(process.env.PORT || 3000),
    siteBaseUrl: normalizeBaseUrl(process.env.SITE_BASE_URL || "/"),
    siteTagline:
      process.env.SITE_TAGLINE || "WooCommerce Subscription Plugin User Manual",
    siteTitle: process.env.SITE_TITLE || "ArraySubs Documentation",
    logoFilename: process.env.LOGO_FILENAME || "logo.svg",
  };
}

async function cleanDist(paths) {
  await fs.rm(paths.distDir, { recursive: true, force: true });
  await ensureDir(paths.distDir);
}

function loadBuildIgnore(markdownsDir) {
  const ignorePath = path.join(markdownsDir, ".buildignore");

  try {
    if (!fsSync.existsSync(ignorePath)) {
      return new Set();
    }

    const raw = fsSync.readFileSync(ignorePath, "utf8");
    const names = raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));

    return new Set(names);
  } catch {
    return new Set();
  }
}

function isIgnoredPath(filePath, markdownsDir, ignoreSet) {
  if (ignoreSet.size === 0) {
    return false;
  }

  const relative = path.relative(markdownsDir, filePath);
  const segments = relative.split(path.sep);

  return segments.some((segment) => ignoreSet.has(segment));
}

async function collectSiteData(rootDir) {
  const paths = getProjectPaths(rootDir);
  const config = loadProjectConfig(rootDir);
  const buildDate = new Date().toISOString().slice(0, 10);
  const buildTimestamp = String(Date.now());
  const ignoreSet = loadBuildIgnore(paths.markdownsDir);
  const allFiles = (await walkDir(paths.markdownsDir)).filter(
    (filePath) => !isIgnoredPath(filePath, paths.markdownsDir, ignoreSet),
  );
  const markdownFiles = allFiles.filter((filePath) =>
    filePath.toLowerCase().endsWith(".md"),
  );
  const assetFiles = allFiles.filter(
    (filePath) => !filePath.toLowerCase().endsWith(".md"),
  );
  const pages = await Promise.all(
    markdownFiles.map((filePath) =>
      parseMarkdownFile(filePath, { markdownsDir: paths.markdownsDir }),
    ),
  );

  for (const page of pages) {
    if (page.metadata["last updated"]) {
      page.metadata["last updated"] =
        formatPrettyDate(page.metadata["last updated"]) || buildDate;
    }
  }

  const menuOrder = loadMenuOrder(paths.markdownsDir);
  const navigation = buildNavigationTree(pages, menuOrder);
  return {
    assetFiles,
    buildDate,
    buildTimestamp,
    config,
    navigation,
    pages,
    paths,
  };
}

async function buildSite(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const site = await collectSiteData(rootDir);
  await cleanDist(site.paths);
  const templates = await loadTemplates(site.paths.templatesDir);

  await copyContentAssets(site.paths, site.assetFiles);
  await copyStaticAssets(site.paths);

  await Promise.all(
    site.pages.map(async (page) => {
      const breadcrumbItems = buildBreadcrumbs(site.navigation, page);
      const html = await renderPageHtml({
        assetVersion: site.buildTimestamp,
        breadcrumbHtml: renderBreadcrumbs(breadcrumbItems),
        config: site.config,
        page,
        paths: site.paths,
        sidebarHtml: renderSidebar(site.navigation, page),
        templates,
        tocHtml: renderToc(page.toc),
      });

      const targetPath = path.join(site.paths.distDir, page.outputRelativePath);
      await ensureDir(path.dirname(targetPath));
      await fs.writeFile(targetPath, html, "utf8");
    }),
  );

  await fs.writeFile(
    path.join(site.paths.distDir, "llms.txt"),
    generateLlmsTxt(site.pages, site.navigation, site.config),
    "utf8",
  );

  await fs.writeFile(
    path.join(site.paths.distDir, "sitemap.xml"),
    generateSitemapXml(site.pages, site.config, site.buildDate),
    "utf8",
  );

  return site;
}

module.exports = {
  buildSite,
  cleanDist,
  collectSiteData,
  getProjectPaths,
  loadProjectConfig,
};
