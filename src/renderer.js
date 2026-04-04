const fs = require("fs/promises");
const path = require("path");
const {
  escapeHtml,
  normalizeBaseUrl,
  pathExists,
  relativeAssetPath,
} = require("./utils");

function applyTemplate(template, replacements) {
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (full, key) => {
    return Object.prototype.hasOwnProperty.call(replacements, key)
      ? replacements[key]
      : "";
  });
}

async function loadTemplates(templatesDir) {
  const layoutPath = path.join(templatesDir, "layout.html");
  const partialsDir = path.join(templatesDir, "partials");
  const partialNames = ["header", "sidebar", "breadcrumb", "toc", "footer"];

  const partialEntries = await Promise.all(
    partialNames.map(async (name) => {
      const template = await fs.readFile(
        path.join(partialsDir, `${name}.html`),
        "utf8",
      );
      return [name, template];
    }),
  );

  return {
    layout: await fs.readFile(layoutPath, "utf8"),
    partials: Object.fromEntries(partialEntries),
  };
}

async function renderPageHtml(options) {
  const baseUrl = normalizeBaseUrl(options.config.siteBaseUrl);
  const page = options.page;
  const styleHref = relativeAssetPath(
    page.outputRelativePath,
    "assets/style.css",
  );
  const scriptHref = relativeAssetPath(
    page.outputRelativePath,
    "assets/script.js",
  );
  const headingFontHref = relativeAssetPath(
    page.outputRelativePath,
    "assets/eb-garamond.woff2",
  );
  const bodyFontHref = relativeAssetPath(
    page.outputRelativePath,
    "assets/google-sans-flex.woff2",
  );
  const mermaidHref = relativeAssetPath(
    page.outputRelativePath,
    "assets/vendor/mermaid/mermaid.esm.min.mjs",
  );
  const faviconHref = relativeAssetPath(
    page.outputRelativePath,
    `assets/${options.config.faviconFilename}`,
  );
  const logoHref = relativeAssetPath(
    page.outputRelativePath,
    `assets/${options.config.logoFilename}`,
  );
  const homeHref = relativeAssetPath(page.outputRelativePath, "index.html");
  const hasLogo =
    options.allowSourceAssets === true ||
    (await pathExists(
      path.join(options.paths.distDir, "assets", options.config.logoFilename),
    ));
  const pageTitle = page.title || options.config.siteTitle;
  const documentTitle = `${pageTitle} · ${options.config.siteTitle}`;
  const canonicalUrl = `${baseUrl}${page.urlPath.replace(/^\//, "")}`;
  const ogImageUrl = `${baseUrl}assets/${options.config.logoFilename}`;
  const proBadge = page.isPro
    ? '<span class="docs-badge docs-badge--pro">Pro</span>'
    : "";
  const logoMarkup = hasLogo
    ? `<img src="${escapeHtml(logoHref)}" alt="${escapeHtml(options.config.siteTitle)}" />`
    : `<span class="docs-header__home-fallback">${escapeHtml(options.config.siteTitle)}</span>`;

  const header = applyTemplate(options.templates.partials.header, {
    homeHref: escapeHtml(homeHref),
    logoMarkup,
    siteTagline: escapeHtml(options.config.siteTagline),
    siteTitle: escapeHtml(options.config.siteTitle),
  });

  const sidebar = applyTemplate(options.templates.partials.sidebar, {
    navigation: options.sidebarHtml,
  });

  const breadcrumb = applyTemplate(options.templates.partials.breadcrumb, {
    breadcrumbItems: options.breadcrumbHtml,
  });

  const toc = applyTemplate(options.templates.partials.toc, {
    tocContent: options.tocHtml,
  });

  const footer = applyTemplate(options.templates.partials.footer, {
    currentYear: String(new Date().getFullYear()),
  });

  return applyTemplate(options.templates.layout, {
    bodyClass: page.isPro ? "docs-page docs-page--pro" : "docs-page",
    canonicalUrl: escapeHtml(canonicalUrl),
    contentHtml: page.contentHtml,
    description: escapeHtml(page.description || options.config.siteTagline),
    documentTitle: escapeHtml(documentTitle),
    bodyFontHref: escapeHtml(bodyFontHref),
    faviconHref: escapeHtml(faviconHref),
    footer,
    headingFontHref: escapeHtml(headingFontHref),
    header,
    mermaidHref: escapeHtml(mermaidHref),
    ogImageUrl: escapeHtml(ogImageUrl),
    ogType: page.isIndexPage ? "website" : "article",
    pageBadge: proBadge,
    pageTitle: escapeHtml(pageTitle),
    pageUrl: escapeHtml(canonicalUrl),
    breadcrumb,
    scriptHref: escapeHtml(scriptHref),
    sidebar,
    siteTitle: escapeHtml(options.config.siteTitle),
    styleHref: escapeHtml(styleHref),
    twitterCard: "summary_large_image",
    toc,
  });
}

module.exports = {
  loadTemplates,
  renderPageHtml,
};
