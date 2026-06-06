#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = "https://mirror-help.arrayhash.com";
const ADMIN_URL = `${SITE_URL}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const USERNAME = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASSWORD =
  process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "@GuDw(0$K7M9t8ehjqDb4Vwj";

const routes = [
  {
    route: "#/settings/refunds",
    uniqueText: "Refund on Cancellation",
    path: "markdowns/retention-and-refunds/refund-management.assets/01-refund-settings-original.png",
  },
  {
    route: "#/settings/skip-pause",
    uniqueText: "Enable Skip Renewal",
    path: "markdowns/billing-and-renewals/recovery-and-grace-flows.assets/01-skip-pause-settings-original.png",
  },
  {
    route: "#/settings/feature-manager",
    uniqueText: "Enable Feature Manager",
    path: "markdowns/feature-manager/feature-manager-settings.assets/01-feature-manager-settings-original.png",
  },
];

async function login(page) {
  await page.goto(`${SITE_URL}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USERNAME);
  await page.fill("#user_pass", PASSWORD);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("#wp-submit"),
  ]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function capture(page, item) {
  const output = path.join(ROOT, item.path);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await page.goto(`${ADMIN_URL}${item.route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  await page.getByText(item.uniqueText, { exact: false }).first().waitFor({
    timeout: 20000,
  });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: output, fullPage: false });
  return output;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });

  try {
    await login(page);
    for (const route of routes) {
      const output = await capture(page, route);
      console.log(`captured ${path.relative(ROOT, output)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
