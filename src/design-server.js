const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const chokidar = require("chokidar");
const {
  collectSiteData,
  getProjectPaths,
  loadProjectConfig,
} = require("./build");
const {
  buildBreadcrumbs,
  renderBreadcrumbs,
  renderSidebar,
  renderToc,
} = require("./navigation");
const { loadTemplates, renderPageHtml } = require("./renderer");

const DESIGN_PORT = 3001;

function createReloadSnippet() {
  return `<script>
  (() => {
    const source = new EventSource('/__live-reload');
    source.onmessage = (event) => {
      if (event.data === 'reload') {
        window.location.reload();
      }
    };
  })();
  </script>`;
}

async function renderDesignPage(rootDir) {
  const site = await collectSiteData(rootDir);
  const templates = await loadTemplates(site.paths.templatesDir);
  const dummyHtml = await fs.readFile(
    path.join(site.paths.templatesDir, "dummy-content.html"),
    "utf8",
  );
  const previewDirectory = site.navigation.root.children[0]?.relativeDir || "";
  const previewPage = {
    contentHtml: dummyHtml,
    description:
      "Preview the documentation layout shell with representative content.",
    directoryRelativePath: previewDirectory,
    isIndexPage: true,
    isPro: true,
    metadata: {},
    outputRelativePath: "index.html",
    title: "Documentation Layout Preview",
    toc: [
      { level: 2, slug: "layout-overview", title: "Layout overview" },
      { level: 3, slug: "feature-highlights", title: "Feature highlights" },
      { level: 2, slug: "sample-table", title: "Sample table" },
      { level: 2, slug: "sample-code", title: "Sample code block" },
      { level: 3, slug: "task-lists", title: "Task lists" },
      { level: 2, slug: "sample-figure", title: "Sample figure" },
      { level: 2, slug: "mermaid-preview", title: "Mermaid preview" },
      { level: 2, slug: "blockquote-preview", title: "Blockquotes and calls" },
    ],
    urlPath: "/",
  };

  return renderPageHtml({
    allowSourceAssets: true,
    breadcrumbHtml: renderBreadcrumbs(
      buildBreadcrumbs(site.navigation, previewPage),
    ),
    config: loadProjectConfig(rootDir),
    page: previewPage,
    paths: getProjectPaths(rootDir),
    sidebarHtml: renderSidebar(site.navigation, previewPage),
    templates,
    tocHtml: renderToc(previewPage.toc),
  });
}

async function startDesignServer(rootDir) {
  const paths = getProjectPaths(rootDir);
  const config = loadProjectConfig(rootDir);
  const clients = new Set();

  const server = http.createServer(async (request, response) => {
    if (!request.url) {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    if (request.url.startsWith("/__live-reload")) {
      response.writeHead(200, {
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
      });
      response.write("\n");
      clients.add(response);
      request.on("close", () => clients.delete(response));
      return;
    }

    if (request.url === "/" || request.url.startsWith("/index.html")) {
      const html = await renderDesignPage(rootDir);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(html.replace("</body>", `${createReloadSnippet()}</body>`));
      return;
    }

    if (request.url === "/assets/style.css") {
      const css = await fs.readFile(
        path.join(paths.srcDir, "style.css"),
        "utf8",
      );
      response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
      response.end(css);
      return;
    }

    if (request.url === "/assets/script.js") {
      const js = await fs.readFile(
        path.join(paths.srcDir, "script.js"),
        "utf8",
      );
      response.writeHead(200, {
        "Content-Type": "application/javascript; charset=utf-8",
      });
      response.end(js);
      return;
    }

    if (request.url.startsWith("/assets/")) {
      const assetName = request.url.replace("/assets/", "");
      const assetPath = path.join(paths.staticDir, assetName);

      try {
        const assetContent = await fs.readFile(assetPath);
        const extension = path.extname(assetPath).toLowerCase();
        const contentType =
          extension === ".svg" ? "image/svg+xml" : "application/octet-stream";
        response.writeHead(200, { "Content-Type": contentType });
        response.end(assetContent);
      } catch (error) {
        response.writeHead(404, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end("Asset not found");
      }

      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  });

  const watcher = chokidar.watch(
    [
      path.join(paths.srcDir, "templates"),
      path.join(paths.srcDir, "style.css"),
      path.join(paths.srcDir, "script.js"),
      paths.staticDir,
    ],
    {
      ignoreInitial: true,
    },
  );

  watcher.on("all", () => {
    for (const client of clients) {
      client.write("data: reload\n\n");
    }
  });

  server.listen(DESIGN_PORT, () => {
    console.log(
      `Design preview server running at http://localhost:${DESIGN_PORT}`,
    );
    console.log(
      `Main documentation dev server can still use http://localhost:${config.port}`,
    );
  });
}

module.exports = {
  startDesignServer,
};
