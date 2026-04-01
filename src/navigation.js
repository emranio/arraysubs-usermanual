const fs = require("fs");
const path = require("path");
const { titleCaseFromSlug, toPosix } = require("./utils");

function createDirectoryNode(relativeDir) {
  const normalizedDir = relativeDir ? toPosix(relativeDir) : "";
  const segment = normalizedDir
    ? normalizedDir.split("/").filter(Boolean).pop()
    : "";

  return {
    children: [],
    indexPage: null,
    label: normalizedDir ? titleCaseFromSlug(segment) : "Home",
    pages: [],
    relativeDir: normalizedDir,
    type: "directory",
  };
}

function buildNavigationTree(pages, menuOrder) {
  const root = createDirectoryNode("");
  const directoryMap = new Map([["", root]]);

  for (const page of pages) {
    const segments = page.directoryRelativePath
      ? page.directoryRelativePath.split("/").filter(Boolean)
      : [];

    let currentDir = "";
    let currentNode = root;

    for (const segment of segments) {
      currentDir = currentDir ? `${currentDir}/${segment}` : segment;

      if (!directoryMap.has(currentDir)) {
        const childNode = createDirectoryNode(currentDir);
        directoryMap.set(currentDir, childNode);
        currentNode.children.push(childNode);
      }

      currentNode = directoryMap.get(currentDir);
    }

    if (page.isIndexPage) {
      currentNode.indexPage = page;
    } else {
      currentNode.pages.push(page);
    }
  }

  const orderMap = menuOrder ? buildOrderMap(menuOrder) : null;
  sortNode(root, orderMap);

  return {
    directoryMap,
    root,
  };
}

function flattenMenuOrder(entries) {
  const result = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      result.push(entry);
    } else if (Array.isArray(entry)) {
      result.push(...flattenMenuOrder(entry));
    }
  }

  return result;
}

function buildOrderMap(menuOrder) {
  const flat = flattenMenuOrder(menuOrder);
  const map = new Map();

  for (let i = 0; i < flat.length; i++) {
    map.set(flat[i], i);
  }

  return map;
}

function getOrderPosition(orderMap, relativePath) {
  if (!orderMap) {
    return Infinity;
  }

  return orderMap.has(relativePath) ? orderMap.get(relativePath) : Infinity;
}

function getDirectoryOrder(orderMap, node) {
  if (!orderMap) {
    return Infinity;
  }

  if (node.indexPage) {
    const pos = getOrderPosition(orderMap, node.indexPage.sourceRelativePath);

    if (pos !== Infinity) {
      return pos;
    }
  }

  let earliest = Infinity;

  for (const page of node.pages) {
    const pos = getOrderPosition(orderMap, page.sourceRelativePath);

    if (pos < earliest) {
      earliest = pos;
    }
  }

  return earliest;
}

function sortNode(node, orderMap) {
  if (orderMap) {
    node.pages.sort(
      (left, right) =>
        getOrderPosition(orderMap, left.sourceRelativePath) -
        getOrderPosition(orderMap, right.sourceRelativePath),
    );
    node.children.sort(
      (left, right) =>
        getDirectoryOrder(orderMap, left) - getDirectoryOrder(orderMap, right),
    );
  } else {
    node.pages.sort((left, right) => left.title.localeCompare(right.title));
    node.children.sort((left, right) => left.label.localeCompare(right.label));
  }

  node.children.forEach((child) => sortNode(child, orderMap));
}

function loadMenuOrder(markdownsDir) {
  const menuPath = path.join(markdownsDir, "menu.json");

  try {
    if (!fs.existsSync(menuPath)) {
      return null;
    }

    const raw = fs.readFileSync(menuPath, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function isSectionOpen(node, currentPage) {
  if (!node.relativeDir) {
    return true;
  }

  return (
    currentPage.directoryRelativePath === node.relativeDir ||
    currentPage.directoryRelativePath.startsWith(`${node.relativeDir}/`)
  );
}

function relativePageHref(fromPage, targetPage) {
  const fromDir =
    fromPage.outputRelativePath === "index.html"
      ? ""
      : path.posix.dirname(fromPage.outputRelativePath);

  const targetPath = targetPage.isIndexPage
    ? targetPage.outputRelativePath.replace(/index\.html$/, "") || "."
    : targetPage.outputRelativePath;

  const href = path.posix.relative(fromDir || ".", targetPath || ".");

  if (!href || href === "") {
    return "./";
  }

  return href.endsWith("/") || href.endsWith(".html") ? href : `${href}/`;
}

function renderPageLink(page, currentPage, className = "docs-nav__link") {
  const href = relativePageHref(currentPage, page);
  const isCurrent = page.outputRelativePath === currentPage.outputRelativePath;
  const currentClass = isCurrent ? " is-current" : "";
  const badge = page.isPro
    ? '<span class="docs-badge docs-badge--pro">Pro</span>'
    : "";
  const currentAttribute = isCurrent ? ' aria-current="page"' : "";

  return `<a class="${className}${currentClass}" href="${href}"${currentAttribute}><span>${page.title}</span>${badge}</a>`;
}

function renderSectionRow(node, currentPage) {
  if (node.indexPage) {
    return renderPageLink(
      node.indexPage,
      currentPage,
      "docs-nav__section-link",
    );
  }

  return `<span class="docs-nav__section-label">${node.label}</span>`;
}

function renderDirectoryNode(node, currentPage, depth = 0) {
  const open = isSectionOpen(node, currentPage);
  const sectionClasses = ["docs-nav__section"];

  if (depth === 0) {
    sectionClasses.push("docs-nav__section--top");
  }

  if (open) {
    sectionClasses.push("is-open");
  }

  const hasChildren = node.children.length > 0 || node.pages.length > 0;
  const rowContent = renderSectionRow(node, currentPage);

  const childItems = [];

  for (const childNode of node.children) {
    childItems.push(
      `<li class="docs-nav__item docs-nav__item--group">${renderDirectoryNode(childNode, currentPage, depth + 1)}</li>`,
    );
  }

  for (const page of node.pages) {
    childItems.push(
      `<li class="docs-nav__item">${renderPageLink(page, currentPage)}</li>`,
    );
  }

  return `<section class="${sectionClasses.join(" ")}" data-nav-section>
    <div class="docs-nav__section-head">
      <button class="docs-nav__toggle" type="button" aria-expanded="${open ? "true" : "false"}" data-nav-toggle${hasChildren ? "" : " hidden"}>
        <span class="docs-nav__toggle-icon" aria-hidden="true"></span>
        <span class="screen-reader-text">Toggle ${node.label}</span>
      </button>
      ${rowContent}
    </div>
    <ul class="docs-nav__list" ${open ? "" : "hidden"} data-nav-list>
      ${childItems.join("")}
    </ul>
  </section>`;
}

function renderSidebar(navigation, currentPage) {
  const rootItems = [];

  if (navigation.root.indexPage) {
    const href = relativePageHref(currentPage, navigation.root.indexPage);
    const isCurrent =
      navigation.root.indexPage.outputRelativePath ===
      currentPage.outputRelativePath;
  }

  for (const childNode of navigation.root.children) {
    rootItems.push(
      `<li class="docs-nav__item docs-nav__item--section">${renderDirectoryNode(childNode, currentPage, 0)}</li>`,
    );
  }

  for (const page of navigation.root.pages) {
    rootItems.push(
      `<li class="docs-nav__item">${renderPageLink(page, currentPage)}</li>`,
    );
  }

  return `<nav class="docs-nav" aria-label="Documentation">
    <ul class="docs-nav__root">
      ${rootItems.join("")}
    </ul>
  </nav>`;
}

function buildBreadcrumbs(navigation, currentPage) {
  const crumbs = [];
  const addCrumb = (label, href, isCurrent = false) => {
    crumbs.push({ href, isCurrent, label });
  };

  if (navigation.root.indexPage) {
    addCrumb(
      "Home",
      relativePageHref(currentPage, navigation.root.indexPage),
      currentPage.outputRelativePath ===
        navigation.root.indexPage.outputRelativePath,
    );
  } else {
    addCrumb("Home", "./", currentPage.outputRelativePath === "index.html");
  }

  const segments = currentPage.directoryRelativePath
    ? currentPage.directoryRelativePath.split("/").filter(Boolean)
    : [];

  let runningDir = "";

  for (const segment of segments) {
    runningDir = runningDir ? `${runningDir}/${segment}` : segment;
    const node = navigation.directoryMap.get(runningDir);

    if (!node) {
      continue;
    }

    addCrumb(
      node.label,
      node.indexPage ? relativePageHref(currentPage, node.indexPage) : "#",
      currentPage.isIndexPage &&
        currentPage.directoryRelativePath === runningDir,
    );
  }

  if (!currentPage.isIndexPage) {
    addCrumb(currentPage.title, "", true);
  } else if (segments.length === 0 && navigation.root.indexPage) {
    crumbs[0].isCurrent = true;
    crumbs[0].href = "";
  }

  return crumbs;
}

function renderBreadcrumbs(breadcrumbs) {
  const items = breadcrumbs.map((crumb) => {
    if (crumb.isCurrent || !crumb.href || crumb.href === "#") {
      return `<li class="docs-breadcrumb__item" aria-current="page"><span>${crumb.label}</span></li>`;
    }

    return `<li class="docs-breadcrumb__item"><a href="${crumb.href}">${crumb.label}</a></li>`;
  });

  return `<nav class="docs-breadcrumb" aria-label="Breadcrumb">
    <ol class="docs-breadcrumb__list">
      ${items.join("")}
    </ol>
  </nav>`;
}

function renderToc(toc) {
  if (!toc.length) {
    return '<div class="docs-toc__empty">No section links on this page yet.</div>';
  }

  const items = toc.map(
    (entry) =>
      `<li class="docs-toc__item docs-toc__item--level-${entry.level}"><a href="#${entry.slug}" data-toc-link>${entry.title}</a></li>`,
  );

  return `<nav class="docs-toc" aria-label="On this page">
    <ul class="docs-toc__list">
      ${items.join("")}
    </ul>
  </nav>`;
}

module.exports = {
  buildBreadcrumbs,
  buildNavigationTree,
  loadMenuOrder,
  renderBreadcrumbs,
  renderSidebar,
  renderToc,
};
