const fs = require("fs/promises");
const path = require("path");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskLists = require("markdown-it-task-lists");
const hljs = require("highlight.js");
const { rewriteMarkdownLink } = require("./links");
const {
  encodeUrlPath,
  excerptFromMarkdown,
  slugify,
  titleCaseFromSlug,
  toPosix,
} = require("./utils");

const GENERIC_PAGE_TITLES = new Set([
  "General Settings",
  "Member Access",
  "Toolkit",
  "Feature Manager",
  "Automatic Payment Gateways",
]);

function extractInfoBlock(rawContent) {
  const lines = String(rawContent || "").split(/\r?\n/);

  if (!/^#\s+info\s*$/i.test(lines[0] || "")) {
    return {
      metadata: {},
      body: String(rawContent || ""),
      rawBodyWithoutInfo: String(rawContent || "").trim(),
    };
  }

  const metadata = {};
  let index = 1;

  while (index < lines.length) {
    const currentLine = lines[index];

    if (!currentLine.trim()) {
      index += 1;
      continue;
    }

    const bulletMatch = currentLine.match(/^[-*]\s+([^:]+):\s*(.+)$/);

    if (!bulletMatch) {
      break;
    }

    metadata[bulletMatch[1].trim().toLowerCase()] = bulletMatch[2].trim();
    index += 1;
  }

  while (index < lines.length && !lines[index].trim()) {
    index += 1;
  }

  const body = lines.slice(index).join("\n").trimStart();

  return {
    metadata,
    body,
    rawBodyWithoutInfo: body.trim(),
  };
}

function enrichMetadataFromBody(body, metadata) {
  const resolvedMetadata = { ...metadata };

  if (resolvedMetadata.availability && resolvedMetadata.plugin) {
    return resolvedMetadata;
  }

  const lines = String(body || "")
    .split(/\r?\n/)
    .slice(0, 20);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const richMatch = trimmed.match(/^\*\*(availability|plugin):\*\*\s*(.+)$/i);

    if (richMatch) {
      resolvedMetadata[richMatch[1].trim().toLowerCase()] = richMatch[2].trim();
      continue;
    }

    const plainMatch = trimmed.match(/^(availability|plugin):\s*(.+)$/i);

    if (plainMatch) {
      resolvedMetadata[plainMatch[1].trim().toLowerCase()] =
        plainMatch[2].trim();
    }
  }

  return resolvedMetadata;
}

function replaceInlineProBadges(html) {
  return String(html || "").replace(
    /<(em|strong)>\s*\((pro)\)\s*<\/\1>/gi,
    '<span class="docs-badge docs-badge--pro">Pro</span>',
  );
}

function extractPrimaryHeading(markdown, fallbackTitle) {
  const lines = String(markdown || "").split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => /^#\s+/.test(line));

  if (headingIndex === -1) {
    return {
      title: fallbackTitle,
      body: markdown.trim(),
      rawHeading: "",
    };
  }

  const rawHeading = lines[headingIndex].replace(/^#\s+/, "").trim();
  const cleanedBody = [
    ...lines.slice(0, headingIndex),
    ...lines.slice(headingIndex + 1),
  ]
    .join("\n")
    .trimStart();

  const title =
    rawHeading.toLowerCase() === "user guide" ? fallbackTitle : rawHeading;

  return {
    title,
    body: cleanedBody,
    rawHeading,
  };
}

function choosePageTitle(context) {
  const moduleTitle = String(context.metadata.module || "").trim();
  const headingTitle = String(context.headingTitle || "").trim();
  const filenameTitle = String(context.filenameFallback || "").trim();
  const parentTitle = String(context.parentDirectoryTitle || "").trim();
  const isIndexPage = context.isIndexPage === true;

  if (!headingTitle) {
    if (isIndexPage) {
      return (
        moduleTitle || parentTitle || context.defaultIndexTitle || filenameTitle
      );
    }

    return moduleTitle || filenameTitle || parentTitle;
  }

  if (headingTitle.toLowerCase() !== "user guide") {
    return headingTitle;
  }

  if (isIndexPage) {
    return (
      moduleTitle || parentTitle || context.defaultIndexTitle || filenameTitle
    );
  }

  const moduleIsGeneric =
    moduleTitle &&
    (GENERIC_PAGE_TITLES.has(moduleTitle) ||
      (parentTitle && moduleTitle === parentTitle));

  if (moduleIsGeneric && filenameTitle) {
    return filenameTitle;
  }

  return (
    moduleTitle || filenameTitle || parentTitle || context.defaultIndexTitle
  );
}

function preprocessImagePaths(markdown) {
  const output = [];
  let i = 0;
  const len = markdown.length;

  while (i < len) {
    if (markdown[i] === "!" && i + 1 < len && markdown[i + 1] === "[") {
      const start = i;
      i += 2;

      let bracketDepth = 1;

      while (i < len && bracketDepth > 0) {
        if (markdown[i] === "\\") {
          i += 2;
          continue;
        }

        if (markdown[i] === "[") {
          bracketDepth += 1;
        }

        if (markdown[i] === "]") {
          bracketDepth -= 1;
        }

        i += 1;
      }

      if (i < len && markdown[i] === "(") {
        i += 1;
        const destStart = i;
        let parenDepth = 1;

        while (i < len && parenDepth > 0) {
          if (markdown[i] === "\\") {
            i += 2;
            continue;
          }

          if (markdown[i] === "(") {
            parenDepth += 1;
          }

          if (markdown[i] === ")") {
            parenDepth -= 1;
          }

          i += 1;
        }

        const inner = markdown.slice(destStart, i - 1);
        const titleMatch = inner.match(/^([\s\S]+?)\s+"([^"]*)"\s*$/);
        const destination = titleMatch ? titleMatch[1].trim() : inner.trim();

        if (destination.includes(" ") && !destination.startsWith("<")) {
          output.push(markdown.slice(start, destStart));

          if (titleMatch) {
            output.push(`<${destination}> "${titleMatch[2]}"`);
          } else {
            output.push(`<${destination}>`);
          }

          output.push(")");
        } else {
          output.push(markdown.slice(start, i));
        }
      } else {
        output.push(markdown.slice(start, i));
      }
    } else {
      output.push(markdown[i]);
      i += 1;
    }
  }

  return output.join("");
}

function markHeadingsWithinBlockquotesAsIgnored(state) {
  let currentBlockquoteDepth = 0;

  for (const token of state.tokens) {
    if (token.type === "blockquote_open") {
      currentBlockquoteDepth += 1;
      continue;
    }

    if (token.type === "blockquote_close") {
      currentBlockquoteDepth = Math.max(0, currentBlockquoteDepth - 1);
      continue;
    }

    if (currentBlockquoteDepth > 0 && token.type === "heading_open") {
      token.meta = token.meta || {};
      token.meta.ignoreToc = true;
    }
  }
}

function createMarkdownParser(toc) {
  let suppressedTocDepth = 0;

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
    highlight(code, language) {
      if (language === "mermaid") {
        return `<pre class="mermaid">${md.utils.escapeHtml(code)}</pre>`;
      }

      const normalizedLanguage =
        language && hljs.getLanguage(language) ? language : null;

      const highlighted = normalizedLanguage
        ? hljs.highlight(code, { language: normalizedLanguage }).value
        : hljs.highlightAuto(code).value;

      return `<pre><code class="hljs language-${normalizedLanguage || "plain"}">${highlighted}</code></pre>`;
    },
  });

  const renderWithSuppressedToc = (content) => {
    suppressedTocDepth += 1;

    try {
      return md.render(content);
    } finally {
      suppressedTocDepth = Math.max(0, suppressedTocDepth - 1);
    }
  };

  md.core.ruler.push("mark_blockquote_toc_exclusions", (state) => {
    markHeadingsWithinBlockquotesAsIgnored(state);
  });

  md.use(markdownItTaskLists, { enabled: true, label: true, labelAfter: true });
  md.use(markdownItAnchor, {
    permalink: false,
    slugify,
    callback(token, info) {
      const level = Number(String(token.tag || "").replace("h", ""));

      if (
        (level === 2 || level === 3) &&
        token.meta?.ignoreToc !== true &&
        suppressedTocDepth === 0
      ) {
        toc.push({
          level,
          slug: info.slug,
          title: info.title,
        });
      }
    },
  });

  const defaultLinkOpen =
    md.renderer.rules.link_open ||
    ((tokens, index, options, env, self) =>
      self.renderToken(tokens, index, options));
  const defaultImage =
    md.renderer.rules.image ||
    ((tokens, index, options, env, self) =>
      self.renderToken(tokens, index, options));

  md.renderer.rules.link_open = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const href = token.attrGet("href");

    if (href) {
      token.attrSet("href", rewriteMarkdownLink(href));
    }

    return defaultLinkOpen(tokens, index, options, env, self);
  };

  md.renderer.rules.image = (tokens, index, options, env, self) => {
    const token = tokens[index];
    const src = token.attrGet("src") || "";
    const alt = token.content || "";
    const title = token.attrGet("title");
    const encodedSrc = encodeUrlPath(src);

    token.attrSet("src", encodedSrc);
    token.attrSet("loading", "lazy");

    const renderedImage = defaultImage(tokens, index, options, env, self);

    if (!alt.trim()) {
      return renderedImage;
    }

    const caption = title || alt;
    return `<figure class="docs-figure">${renderedImage}<figcaption>${md.utils.escapeHtml(caption)}</figcaption></figure>`;
  };

  const defaultFence =
    md.renderer.rules.fence ||
    ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const info = token.info ? token.info.trim() : "";

    if (info.startsWith("box")) {
      const classMatch = info.match(/class="([^"]+)"/);
      const boxClass = classMatch ? classMatch[1] : "info-box";
      const allowed = ["info-box", "warning-box", "success-box"];
      const safeClass = allowed.includes(boxClass) ? boxClass : "info-box";
      const innerHtml = renderWithSuppressedToc(token.content);

      return `<div class="docs-box ${md.utils.escapeHtml(safeClass)}">${innerHtml}</div>\n`;
    }

    return defaultFence(tokens, idx, opts, env, self);
  };

  return md;
}

function isProPage(metadata) {
  const availability = String(metadata.availability || metadata.plugin || "")
    .trim()
    .toLowerCase();

  if (!availability) {
    return false;
  }

  if (availability.startsWith("shared") || availability.startsWith("free")) {
    return false;
  }

  return (
    availability === "pro" ||
    availability.startsWith("pro ") ||
    availability.startsWith("pro(") ||
    availability.startsWith("pro-") ||
    availability.includes("pro only") ||
    availability.includes("pro-only") ||
    availability.includes("arraysubs pro")
  );
}

function stripDecorativeProMarker(value) {
  return String(value || "")
    .replace(/\s*(?:\*\*|\*)?\(?pro\)?(?:\*\*|\*)?\s*$/i, "")
    .trim();
}

async function parseMarkdownFile(filePath, options) {
  const rawContent = await fs.readFile(filePath, "utf8");
  const sourceRelativePath = toPosix(
    path.relative(options.markdownsDir, filePath),
  );
  const filenameFallback = titleCaseFromSlug(
    path.basename(sourceRelativePath, ".md"),
  );
  const isIndexPage =
    path.basename(sourceRelativePath).toLowerCase() === "readme.md";
  const directoryRelativePath = isIndexPage
    ? toPosix(path.dirname(sourceRelativePath)).replace(/^\.$/, "")
    : toPosix(path.dirname(sourceRelativePath)).replace(/^\.$/, "");
  const parentDirectoryTitle = directoryRelativePath
    ? titleCaseFromSlug(path.basename(directoryRelativePath))
    : "Home";
  const extractedInfo = extractInfoBlock(rawContent);
  const metadata = enrichMetadataFromBody(
    extractedInfo.body,
    extractedInfo.metadata,
  );
  const { body, rawBodyWithoutInfo } = extractedInfo;
  const {
    title: extractedHeadingTitle,
    body: contentMarkdown,
    rawHeading,
  } = extractPrimaryHeading(
    body,
    metadata.module || filenameFallback || parentDirectoryTitle,
  );
  const isPro = isProPage(metadata);
  const title = choosePageTitle({
    defaultIndexTitle: "Home",
    filenameFallback,
    headingTitle: rawHeading || extractedHeadingTitle,
    isIndexPage,
    metadata,
    parentDirectoryTitle,
  });
  const toc = [];
  const md = createMarkdownParser(toc);
  const html = replaceInlineProBadges(
    md.render(preprocessImagePaths(contentMarkdown || "")),
  );

  const outputRelativePath = isIndexPage
    ? directoryRelativePath
      ? `${directoryRelativePath}/index.html`
      : "index.html"
    : sourceRelativePath.replace(/\.md$/i, ".html");

  const urlPath = isIndexPage
    ? `/${directoryRelativePath ? `${directoryRelativePath}/` : ""}`
    : `/${sourceRelativePath.replace(/\.md$/i, ".html")}`;

  return {
    contentHtml: html,
    contentMarkdown,
    description: excerptFromMarkdown(contentMarkdown),
    directoryRelativePath,
    filePath,
    isIndexPage,
    isPro,
    metadata,
    outputRelativePath,
    rawBodyForLlms: rawBodyWithoutInfo,
    sourceRelativePath,
    title: isPro ? stripDecorativeProMarker(title) : title,
    toc,
    urlPath,
  };
}

module.exports = {
  parseMarkdownFile,
};
