const path = require("path");
const { isExternalUrl, toPosix } = require("./utils");

function splitSuffix(target) {
  const hashIndex = target.indexOf("#");
  const queryIndex = target.indexOf("?");
  let endIndex = target.length;

  if (hashIndex !== -1) {
    endIndex = hashIndex;
  }

  if (queryIndex !== -1 && queryIndex < endIndex) {
    endIndex = queryIndex;
  }

  return {
    base: target.slice(0, endIndex),
    suffix: target.slice(endIndex),
  };
}

function rewriteMarkdownLink(href) {
  if (
    !href ||
    href.startsWith("#") ||
    isExternalUrl(href) ||
    href.startsWith("data:")
  ) {
    return href;
  }

  const { base, suffix } = splitSuffix(href);

  if (!base || !base.toLowerCase().endsWith(".md")) {
    return href;
  }

  const normalizedBase = toPosix(base);
  const parsed = path.posix.parse(normalizedBase);

  if (parsed.base.toLowerCase() === "readme.md") {
    const directory = parsed.dir ? `${parsed.dir}/` : "./";
    return `${directory}${suffix}`;
  }

  return `${parsed.dir ? `${parsed.dir}/` : ""}${parsed.name}.html${suffix}`;
}

module.exports = {
  rewriteMarkdownLink,
};
