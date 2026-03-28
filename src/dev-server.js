const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const chokidar = require("chokidar");
const { buildSite, loadProjectConfig, getProjectPaths } = require("./build");

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".zip": "application/zip",
};

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

async function resolveStaticPath(distDir, requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const safePath = decodedPath === "/" ? "/index.html" : decodedPath;
  let filePath = path.join(distDir, safePath);

  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    return filePath;
  } catch (error) {
    if (!path.extname(filePath)) {
      const htmlPath = `${filePath}.html`;

      try {
        await fs.access(htmlPath);
        return htmlPath;
      } catch (innerError) {
        return null;
      }
    }

    return null;
  }
}

async function startDevServer(rootDir) {
  const config = loadProjectConfig(rootDir);
  const paths = getProjectPaths(rootDir);
  await buildSite({ rootDir });

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
      response.write(":ok\n\n");
      clients.add(response);

      // Heartbeat keeps the connection alive and detects dead clients.
      const heartbeat = setInterval(() => {
        response.write(":ping\n\n");
      }, 20000);

      request.on("close", () => {
        clearInterval(heartbeat);
        clients.delete(response);
      });
      return;
    }

    // Free connection slots immediately so SSE doesn't starve HTTP/1.1.
    response.setHeader("Connection", "close");

    const filePath = await resolveStaticPath(paths.distDir, request.url);

    if (!filePath) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    try {
      const extension = path.extname(filePath).toLowerCase();
      const content = await fs.readFile(filePath);
      const contentType =
        CONTENT_TYPES[extension] || "application/octet-stream";

      response.writeHead(200, { "Content-Type": contentType });

      if (extension === ".html") {
        response.end(
          String(content).replace("</body>", `${createReloadSnippet()}</body>`),
        );
        return;
      }

      response.end(content);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Server error");
    }
  });

  // Prevent idle keep-alive connections from occupying browser slots.
  server.keepAliveTimeout = 2000;

  const notifyClients = () => {
    for (const client of clients) {
      client.write("data: reload\n\n");
    }
  };

  let rebuildTimer = null;
  const watcher = chokidar.watch(
    [paths.markdownsDir, paths.staticDir, paths.srcDir],
    {
      ignoreInitial: true,
    },
  );

  watcher.on("all", () => {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(async () => {
      try {
        await buildSite({ rootDir });
        notifyClients();
        console.log("Rebuilt documentation site.");
      } catch (error) {
        console.error("Build failed:", error.message);
      }
    }, 150);
  });

  server.listen(config.port, () => {
    console.log(
      `Documentation dev server running at http://localhost:${config.port}`,
    );
  });

  const close = async () => {
    await watcher.close();
    server.close();
  };

  process.on("SIGINT", close);
  process.on("SIGTERM", close);
}

module.exports = {
  startDevServer,
};
