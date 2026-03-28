const { normalizeBaseUrl } = require("./utils");

function generateSitemapXml(pages, config, buildDate) {
  const baseUrl = normalizeBaseUrl(config.siteBaseUrl);
  const entries = pages
    .slice()
    .sort((left, right) => left.urlPath.localeCompare(right.urlPath))
    .map((page) => {
      const lastMod = page.metadata["last updated"] || buildDate;
      return `  <url>\n    <loc>${baseUrl}${page.urlPath.replace(/^\//, "")}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

module.exports = {
  generateSitemapXml,
};
