#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const SITE_URL = "https://mirror-help.arrayhash.com";
const ADMIN_URL = `${SITE_URL}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const USERNAME = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASSWORD =
  process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "@GuDw(0$K7M9t8ehjqDb4Vwj";

const shots = [
  {
    name: "admin-menu-subscriptions",
    route: "#/subscriptions",
    waitFor: "All Subscriptions",
    path: "markdowns/manage-subscriptions/subscription-operations.assets/01-admin-menu-subscriptions-original.png",
  },
  {
    name: "subscriptions-list",
    route: "#/subscriptions",
    waitFor: "All Subscriptions",
    path: "markdowns/manage-subscriptions/subscription-operations.assets/02-subscriptions-list-original.png",
  },
  {
    name: "subscription-detail",
    route: "#/subscriptions/detail/4406",
    waitFor: "Subscription",
    path: "markdowns/manage-subscriptions/subscription-detail-cards.assets/01-subscription-detail-original.png",
  },
  {
    name: "general-settings",
    route: "#/settings/general",
    waitFor: "General",
    path: "markdowns/settings/general-settings.assets/01-general-settings-original.png",
  },
  {
    name: "easy-setup",
    route: "#/easy-setup",
    waitFor: "Setup",
    path: "markdowns/getting-started/easy-setup-wizard.assets/01-easy-setup-original.png",
  },
];

async function ensureParent(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

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

async function capture(page, shot) {
  const output = path.join(ROOT, shot.path);
  await ensureParent(output);

  await page.goto(`${ADMIN_URL}${shot.route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.getByText(shot.waitFor, { exact: false }).first().waitFor({
    timeout: 15000,
  }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(3500);
  await page.screenshot({ path: output, fullPage: false });

  return { ...shot, output };
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
    const results = [];
    for (const shot of shots) {
      results.push(await capture(page, shot));
    }
    console.log(JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
