const fs = require("fs/promises");
const path = require("path");

const TITLECASE_ACRONYMS = new Map([
  ["api", "API"],
  ["cpt", "CPT"],
  ["faq", "FAQ"],
  ["llms", "LLMs"],
  ["seo", "SEO"],
  ["url", "URL"],
]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch (error) {
    return false;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function walkDir(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const resolvedPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return walkDir(resolvedPath);
      }

      return [resolvedPath];
    }),
  );

  return files.flat().sort((left, right) => left.localeCompare(right));
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function titleCaseFromSlug(value) {
  return String(value || "")
    .replace(/\.[^.]+$/, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => {
      const normalizedPart = part.toLowerCase();

      if (TITLECASE_ACRONYMS.has(normalizedPart)) {
        return TITLECASE_ACRONYMS.get(normalizedPart);
      }

      return normalizedPart.charAt(0).toUpperCase() + normalizedPart.slice(1);
    })
    .join(" ");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeBaseUrl(value) {
  const normalized = value && value.trim() ? value.trim() : "/";
  const withLeadingSlash = normalized.startsWith("/")
    ? normalized
    : `/${normalized}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

function formatPrettyDate(input) {
  const date = new Date(input);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function excerptFromMarkdown(markdown) {
  return String(markdown || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function encodeUrlPath(value) {
  if (!value) {
    return value;
  }

  const hashIndex = value.indexOf("#");
  const queryIndex = value.indexOf("?");
  let endIndex = value.length;

  if (hashIndex !== -1) {
    endIndex = hashIndex;
  }

  if (queryIndex !== -1 && queryIndex < endIndex) {
    endIndex = queryIndex;
  }

  const pathname = value.slice(0, endIndex);
  const suffix = value.slice(endIndex);

  return encodeURI(pathname).replace(/%5B/g, "[").replace(/%5D/g, "]") + suffix;
}

function isExternalUrl(value) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(String(value || ""));
}

function relativeAssetPath(outputRelativePath, targetRelativePath) {
  const outputDir =
    outputRelativePath === "index.html"
      ? "."
      : path.dirname(outputRelativePath);

  const relativePath = path.relative(outputDir, targetRelativePath);
  return toPosix(relativePath || path.basename(targetRelativePath));
}

module.exports = {
  ensureDir,
  encodeUrlPath,
  escapeHtml,
  excerptFromMarkdown,
  formatPrettyDate,
  isExternalUrl,
  normalizeBaseUrl,
  pathExists,
  relativeAssetPath,
  slugify,
  titleCaseFromSlug,
  toPosix,
  walkDir,
};
