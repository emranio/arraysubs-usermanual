#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");
const SITE = "https://mirror-help.arrayhash.com";
const ADMIN = `${SITE}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const USER = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASS = process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "";
const COLOR = "#873EFF";

const views = [
  {
    id: "overview",
    routeText: "Admin Bar",
    scrollCard: "Admin Bar",
    annotations: [
      { label: "Toolkit screen", type: "text", text: "Toolkit" },
      { label: "Admin bar module", type: "card", text: "Admin Bar" },
      { label: "Dashboard access module", type: "card", text: "Admin Dashboard Access" },
    ],
    outputs: [
      "settings/toolkit-settings.assets/01-toolkit-settings",
      "admin-bar-visibility/README.assets/01-admin-bar",
    ],
  },
  {
    id: "dashboard-access",
    routeText: "Admin Dashboard Access",
    scrollCard: "Admin Dashboard Access",
    annotations: [
      { label: "Enable access restriction", type: "switch", text: "Restrict wp-admin access" },
      { label: "Redirect destination", type: "text", text: "Redirect unauthorized users to" },
      { label: "Allowed staff roles", type: "text", text: "Allowed roles" },
      { label: "Save toolkit changes", type: "selector", selector: ".arraysubs-settings-actions" },
    ],
    outputs: [
      "settings/toolkit-settings.assets/02-toolkit-dashboard-access",
      "admin-dashboard-access/README.assets/01-admin-dashboard-access",
    ],
  },
  {
    id: "login-page",
    routeText: "WordPress Login Page",
    scrollCard: "WordPress Login Page",
    annotations: [
      { label: "Hide default login page", type: "switch", text: "Hide WordPress login page" },
      { label: "Login redirect target", type: "text", text: "Redirect login page to" },
      { label: "Password reset stays safe", type: "text", text: "Password reset links" },
      { label: "Customer login flow", type: "text", text: "customer-facing login" },
    ],
    outputs: [
      "settings/toolkit-settings.assets/03-toolkit-login-page",
      "wordpress-login-page/README.assets/01-wordpress-login-page",
    ],
  },
  {
    id: "support-and-sessions",
    routeText: "Login as User",
    scrollCard: "Login as User",
    annotations: [
      { label: "Support impersonation", type: "card", text: "Login as User" },
      { label: "Enable customer login", type: "switch", text: "Enable Login as User" },
      { label: "Session sharing controls", type: "card", text: "Multi-Login Prevention" },
    ],
    outputs: [
      "settings/toolkit-settings.assets/04-toolkit-support-and-sessions",
      "login-as-user/README.assets/01-login-as-user",
    ],
  },
  {
    id: "multi-login",
    routeText: "Multi-Login Prevention",
    scrollCard: "Multi-Login Prevention",
    annotations: [
      { label: "Enable session limits", type: "switch", text: "Enable Multi-Login Prevention" },
      { label: "Default sessions", type: "text", text: "Default max sessions per user" },
      { label: "Admin enforcement", type: "switch", text: "Apply to administrators" },
      { label: "Member Access override", type: "text", text: "Login Limit Rules" },
    ],
    outputs: [
      "multi-login-prevention/README.assets/01-multi-login-prevention",
    ],
  },
];

async function login(page) {
  await page.goto(`${SITE}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USER);
  await page.fill("#user_pass", PASS);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("#wp-submit"),
  ]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function setSwitch(page, label, wanted = true) {
  const locator = page.locator(`[role="switch"][aria-label="${label}"]`).first();

  if (!(await locator.count())) {
    return false;
  }

  await locator.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
  const current = (await locator.getAttribute("aria-checked")) === "true";

  if (current !== wanted) {
    await locator.click({ timeout: 8000 });
    await page.waitForTimeout(450);
  }

  return true;
}

async function prepareToolkit(page) {
  await page.goto(`${ADMIN}#/settings/toolkit`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  await page.getByText("Toolkit", { exact: false }).first().waitFor({ timeout: 15000 });
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(1800);

  await setSwitch(page, "Hide admin bar for non-admin users", true);
  await setSwitch(page, "Restrict wp-admin access", true);
  await setSwitch(page, "Hide WordPress login page", true);
  await setSwitch(page, "Enable Login as User", true);
  await setSwitch(page, "Enable Multi-Login Prevention", true);
}

async function scrollToCard(page, title) {
  const locator = page.locator(".arraysubs-fb-card").filter({ hasText: title }).first();
  await locator.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
  await page.evaluate((cardTitle) => {
    const cards = Array.from(document.querySelectorAll(".arraysubs-fb-card"));
    const card = cards.find((item) => item.textContent.includes(cardTitle));

    if (card) {
      card.scrollIntoView({ block: "start", inline: "nearest" });
      window.scrollBy(0, -96);
    }
  }, title);
  await page.waitForTimeout(700);
}

function normalizeBox(box, viewport) {
  if (!box) {
    return null;
  }

  const x1 = Math.max(8, box.x - 5);
  const y1 = Math.max(8, box.y - 5);
  const x2 = Math.min(viewport.width - 8, box.x + box.width + 5);
  const y2 = Math.min(viewport.height - 8, box.y + box.height + 5);

  if (x2 <= x1 || y2 <= y1) {
    return null;
  }

  return {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
  };
}

async function locateBox(page, item) {
  if (item.type === "card") {
    return page.locator(".arraysubs-fb-card").filter({ hasText: item.text }).first().boundingBox();
  }

  if (item.type === "switch") {
    const control = page.locator(`[role="switch"][aria-label="${item.text}"]`).first();
    const handle = await control.elementHandle();

    if (!handle) {
      return null;
    }

    return handle.evaluate((button) => {
      const buttonBox = button.getBoundingClientRect();
      const label = button.id
        ? document.querySelector(`label[for="${CSS.escape(button.id)}"]`)
        : null;
      const labelBox = label ? label.getBoundingClientRect() : buttonBox;
      const left = Math.min(buttonBox.left, labelBox.left);
      const top = Math.min(buttonBox.top, labelBox.top);
      const right = Math.max(buttonBox.right, labelBox.right);
      const bottom = Math.max(buttonBox.bottom, labelBox.bottom);

      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
      };
    });
  }

  if (item.type === "selector") {
    return page.locator(item.selector).first().boundingBox();
  }

  return page.getByText(item.text, { exact: false }).first().boundingBox();
}

async function buildAnnotations(page, items) {
  const viewport = page.viewportSize() || { width: 1440, height: 1180 };
  const annotations = [];

  for (const item of items) {
    const rawBox = await locateBox(page, item).catch(() => null);
    const box = normalizeBox(rawBox, viewport);

    if (!box) {
      continue;
    }

    annotations.push({ ...item, box });
  }

  return annotations;
}

async function addOverlay(page, annotations) {
  await page.evaluate(
    ({ annotations: anns, color }) => {
      document.querySelectorAll("[data-doc-annotation]").forEach((node) => node.remove());

      const root = document.createElement("div");
      root.setAttribute("data-doc-annotation", "root");
      root.style.position = "fixed";
      root.style.inset = "0";
      root.style.pointerEvents = "none";
      root.style.zIndex = "2147483647";
      document.body.appendChild(root);

      anns.forEach((ann, index) => {
        const rect = document.createElement("div");
        rect.setAttribute("data-doc-annotation", "rect");
        rect.style.position = "fixed";
        rect.style.left = `${ann.box.x}px`;
        rect.style.top = `${ann.box.y}px`;
        rect.style.width = `${ann.box.width}px`;
        rect.style.height = `${ann.box.height}px`;
        rect.style.border = `4px solid ${color}`;
        rect.style.borderRadius = "10px";
        rect.style.boxShadow = "0 0 0 9999px rgba(16, 24, 40, 0.015), 0 10px 26px rgba(20, 22, 40, 0.18)";
        rect.style.background = "rgba(135, 62, 255, 0.055)";

        const label = document.createElement("div");
        label.setAttribute("data-doc-annotation", "label");
        label.textContent = `${index + 1}. ${ann.label}`;
        label.style.position = "fixed";
        label.style.left = `${Math.max(8, ann.box.x)}px`;
        const labelTop = ann.box.y > 38 ? ann.box.y - 34 : ann.box.y + 10;
        label.style.top = `${labelTop}px`;
        label.style.maxWidth = `${Math.min(420, Math.max(190, ann.box.width))}px`;
        label.style.background = color;
        label.style.color = "#fff";
        label.style.borderRadius = "999px";
        label.style.padding = "6px 11px";
        label.style.font = "700 13px/1.25 Arial, sans-serif";
        label.style.letterSpacing = "0";
        label.style.boxShadow = "0 8px 18px rgba(20, 22, 40, 0.22)";
        label.style.whiteSpace = "nowrap";
        label.style.overflow = "hidden";
        label.style.textOverflow = "ellipsis";

        root.appendChild(rect);
        root.appendChild(label);
      });
    },
    { annotations, color: COLOR },
  );
}

async function removeOverlay(page) {
  await page.evaluate(() => {
    document.querySelectorAll("[data-doc-annotation]").forEach((node) => node.remove());
  });
}

function promptLines(annotations) {
  return annotations.map((ann) => `- Draw a purple rectangle around ${ann.label}.`).join("\n") + "\n";
}

function resultJson(outputPath, annotations) {
  return JSON.stringify(
    {
      output_path: outputPath,
      annotations: annotations.map((ann) => ({
        request_text: `Draw a purple rectangle around ${ann.label}.`,
        target_description: ann.text || ann.selector || ann.label,
        label_text: ann.label,
        bbox: [
          Math.round(ann.box.x),
          Math.round(ann.box.y),
          Math.round(ann.box.width),
          Math.round(ann.box.height),
        ],
      })),
    },
    null,
    2,
  ) + "\n";
}

async function writeOutput(baseRelative, originalPath, annotatedPath, annotations) {
  const base = path.join(MARKDOWNS, baseRelative);
  await fs.mkdir(path.dirname(base), { recursive: true });

  const original = `${base}-original.png`;
  const annotated = `${base}-annotated.png`;
  const prompts = `${base}-annotation-prompts.txt`;
  const result = `${base}-annotation-result.json`;

  await fs.copyFile(originalPath, original);
  await fs.copyFile(annotatedPath, annotated);
  await fs.writeFile(prompts, promptLines(annotations), "utf8");
  await fs.writeFile(result, resultJson(annotated, annotations), "utf8");
}

async function captureView(page, view) {
  await prepareToolkit(page);
  await page.getByText(view.routeText, { exact: false }).first().waitFor({ timeout: 12000 }).catch(() => {});
  await scrollToCard(page, view.scrollCard);

  const tmpDir = path.join(ROOT, ".tmp-toolkit-shots");
  await fs.mkdir(tmpDir, { recursive: true });
  const originalPath = path.join(tmpDir, `${view.id}-original.png`);
  const annotatedPath = path.join(tmpDir, `${view.id}-annotated.png`);

  await removeOverlay(page);
  await page.screenshot({ path: originalPath, fullPage: false });

  const annotations = await buildAnnotations(page, view.annotations);
  await addOverlay(page, annotations);
  await page.screenshot({ path: annotatedPath, fullPage: false });
  await removeOverlay(page);

  for (const output of view.outputs) {
    await writeOutput(output, originalPath, annotatedPath, annotations);
    console.log(`captured ${output}`);
  }
}

async function main() {
  if (!PASS) {
    throw new Error("ARRAYSUBS_DOCS_ADMIN_PASSWORD is required");
  }

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1180 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });

  try {
    await login(page);
    for (const view of views) {
      await captureView(page, view);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
