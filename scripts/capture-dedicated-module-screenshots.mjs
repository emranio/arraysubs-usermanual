#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const MD = path.join(ROOT, "markdowns");
const SITE = "https://mirror-help.arrayhash.com";
const ADMIN = `${SITE}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const USER = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASS = process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "";

const shots = [
  {
    id: "coupon-list",
    kind: "wc",
    url: `${SITE}/wp-admin/edit.php?post_type=shop_coupon`,
    wait: "Coupons",
    path: "coupons/README.assets/02-coupon-list-original.png",
  },
  {
    id: "subscription-notes-full",
    kind: "spa",
    url: `${ADMIN}#/subscriptions/detail/4406`,
    wait: "Subscription Notes",
    scrollText: "Subscription Notes",
    fullPage: true,
    path: "subscription-notes/README.assets/02-notes-full-original.png",
  },
  {
    id: "member-profile-root",
    kind: "spa",
    url: `${ADMIN}#/manage-members/319`,
    wait: "Login as Customer",
    path: "member-insight/README.assets/02-member-profile-original.png",
  },
  {
    id: "redirect-panel-full",
    kind: "product",
    url: `${SITE}/wp-admin/post.php?post=197&action=edit`,
    tab: "ArraySubs Redirect",
    wait: "Product data",
    selector: "#woocommerce-product-data",
    path: "redirect-product-page/README.assets/02-redirect-panel-full-original.png",
  },
  {
    id: "subscription-shipping-card",
    kind: "spa",
    url: `${ADMIN}#/subscriptions/detail/4406`,
    wait: "Subscription Shipping",
    scrollText: "Subscription Shipping",
    fullPage: true,
    path: "subscription-shipping/README.assets/02-subscription-shipping-card-original.png",
  },
  {
    id: "retention-activity-log",
    kind: "wc",
    url: `${SITE}/wp-admin/admin.php?page=wc-admin&path=/analytics/arraysubs-retention`,
    wait: "Activity Logs",
    scrollText: "Activity Logs",
    fullPage: true,
    path: "retention-analytics/README.assets/03-retention-activity-log-original.png",
  },
  {
    id: "gateway-webhook-log",
    kind: "spa",
    url: `${ADMIN}#/settings/gateways`,
    wait: "Webhook Event Log",
    scrollText: "Webhook Event Log",
    path: "gateway-health/README.assets/03-webhook-log-original.png",
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

async function settle(page, ms = 1800) {
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function scrollToText(page, text) {
  if (!text) return;
  await page.getByText(text, { exact: false }).first().scrollIntoViewIfNeeded({ timeout: 10000 }).catch(() => {});
  await page.evaluate((needle) => {
    const candidates = Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,.arraysubs-card,.arraysubs-fb-card,.components-card,section,article,div"))
      .filter((node) => node.textContent && node.textContent.includes(needle));
    const target = candidates
      .filter((node) => node !== document.body)
      .sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height)[0];
    if (target) {
      target.scrollIntoView({ block: "start", inline: "nearest" });
      window.scrollBy(0, -96);
    }
  }, text).catch(() => {});
  await page.waitForTimeout(900);
}

async function save(page, shot) {
  await page.goto(shot.url, { waitUntil: "domcontentloaded" });

  if (shot.kind === "spa") {
    await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 }).catch(() => {});
  }

  if (shot.wait) {
    await page.getByText(shot.wait, { exact: false }).first().waitFor({ timeout: 16000 }).catch(() => {});
  }

  if (shot.kind === "product" && shot.tab) {
    await page.waitForSelector(shot.selector, { timeout: 30000 }).catch(() => {});
    await page.locator(".product_data_tabs a").filter({ hasText: shot.tab }).first().click({ timeout: 10000 }).catch(() => {});
  }

  await settle(page);
  await scrollToText(page, shot.scrollText);

  const out = path.join(MD, shot.path);
  await fs.mkdir(path.dirname(out), { recursive: true });

  if (shot.selector) {
    const el = page.locator(shot.selector).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(500);
    await el.screenshot({ path: out }).catch(async () => {
      await page.screenshot({ path: out, fullPage: false });
    });
  } else {
    await page.screenshot({ path: out, fullPage: Boolean(shot.fullPage) });
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const ok = [];
  const fail = [];

  try {
    await login(page);
    for (const shot of shots) {
      try {
        await save(page, shot);
        ok.push(shot.id);
        console.log(`ok  ${shot.id} -> ${shot.path}`);
      } catch (error) {
        fail.push(`${shot.id}: ${error.message}`);
        console.error(`FAIL ${shot.id}: ${error.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`DONE ok=${ok.length} fail=${fail.length}`);
  if (fail.length) {
    console.log(fail.join("\n"));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
