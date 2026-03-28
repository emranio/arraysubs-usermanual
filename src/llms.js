function renderTocLines(node, lines = [], depth = 0) {
  const indent = "  ".repeat(depth);

  if (node.indexPage && node.relativeDir) {
    lines.push(`${indent}- ${node.label}: ${node.indexPage.urlPath}`);
  }

  for (const page of node.pages) {
    lines.push(`${indent}- ${page.title}: ${page.urlPath}`);
  }

  for (const child of node.children) {
    renderTocLines(child, lines, depth + (node.relativeDir ? 1 : 0));
  }

  return lines;
}

function generateLlmsTxt(pages, navigation, config) {
  const tableOfContents = [];

  if (navigation.root.indexPage) {
    tableOfContents.push(`- Home: ${navigation.root.indexPage.urlPath}`);
  }

  renderTocLines(navigation.root, tableOfContents, 0);

  const contentBlocks = pages
    .slice()
    .sort((left, right) => left.urlPath.localeCompare(right.urlPath))
    .map(
      (page) =>
        `---\nURL: ${page.urlPath}\nTitle: ${page.title}\n---\n\n${page.rawBodyForLlms}\n`,
    );

  return `# ${config.siteTitle}\n\n> ${config.siteTagline}\n\n## Table of Contents\n\n${tableOfContents.join("\n")}\n\n## Full Content\n\n${contentBlocks.join("\n")}`;
}

module.exports = {
  generateLlmsTxt,
};
