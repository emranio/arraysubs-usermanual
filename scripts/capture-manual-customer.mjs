#!/usr/bin/env node
// Customer-portal screenshot capture (logged in AS the customer via admin
// "Login as Customer" impersonation of subscription 4406 / user 319).
// Run: NODE_PATH=$(npm root -g) node scripts/capture-manual-customer.mjs [--only id]

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");
const SITE = "https://mirror-help.arrayhash.com";
const ADMIN = `${SITE}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const MY = `${SITE}/my-account`;
const SUB = process.env.ARRAYSUBS_DOCS_SUBSCRIPTION_ID || "4406";
const USER = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASS = process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "";
const TMP = "/tmp/manual-shots-cust";
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx === -1 ? null : new Set((process.argv[onlyIdx + 1] || "").split(",").map((x) => x.trim()).filter(Boolean));

const S = {
  dashboard:   { url: `${MY}/`, wait: "Dashboard" },
  view_sub:    { url: `${MY}/view-subscription/${SUB}/`, wait: `Subscription #${SUB}`, scrollText: "Auto" },
  cancel_modal:{ url: `${MY}/view-subscription/${SUB}/`, wait: `Subscription #${SUB}`, openCancel: true },
};

const D = [
  ["dashboard", "customer-portal/README.md", "01-my-account-dashboard",
    ["rectangle around the Subscriptions item in the My Account navigation labeled 'Self-service portal'"]],
  ["view_sub", "checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.md", "01-auto-renew",
    ["rectangle around the automatic renewal toggle labeled 'Auto-renew control'"]],
  ["cancel_modal", "retention-and-refunds/retention-use-cases.md", "01-retention-modal",
    ["rectangle around the retention offer shown in the cancellation modal labeled 'Save offer'"]],
];

const cache = new Map();

async function loginAdmin(page) {
  await page.goto(`${SITE}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USER);
  await page.fill("#user_pass", PASS);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#wp-submit")]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function impersonate(page) {
  await page.goto(`${ADMIN}#/subscriptions/detail/${SUB}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  const btn = page.getByRole("link", { name: /Login as Customer/i }).first();
  await btn.waitFor({ timeout: 30000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {}),
    btn.click(),
  ]);
  await page.waitForTimeout(2000);
}

async function captureSurface(page, id) {
  if (cache.has(id)) return cache.get(id);
  const s = S[id];
  const out = path.join(TMP, `${id}.png`);
  await fs.mkdir(TMP, { recursive: true });

  await page.goto(s.url, { waitUntil: "domcontentloaded" });
  if (s.wait) await page.getByText(s.wait, { exact: false }).first().waitFor({ timeout: 20000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});

  if (s.openCancel) {
    const cancel = page.getByRole("button", { name: /^cancel/i })
      .or(page.locator('a,button').filter({ hasText: /cancel subscription|cancel my subscription|^cancel$/i }))
      .first();
    await cancel.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(500);
    await cancel.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1800);
    // Step 1 is reason selection; pick a reason and continue to reach the retention OFFER step.
    const sel = page.locator('select').filter({ has: page.locator('option') }).last();
    if (await sel.count().catch(() => 0)) {
      await sel.selectOption({ index: 1 }).catch(() => {});
      await page.waitForTimeout(600);
      const cont = page.getByRole("button", { name: /continue|next|see|show/i })
        .or(page.locator("a,button").filter({ hasText: /^continue$|^next$/i }))
        .first();
      await cont.click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(2500);
    }
  } else if (s.scrollText) {
    await page.getByText(s.scrollText, { exact: false }).first().scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(800);
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.waitForTimeout(1200);
  await page.screenshot({ path: out, fullPage: false });
  cache.set(id, out);
  return out;
}

async function distribute(surfacePath, pageMd, slug, queries) {
  const assetsDir = path.join(MARKDOWNS, pageMd.replace(/\.md$/, ".assets"));
  await fs.mkdir(assetsDir, { recursive: true });
  await fs.copyFile(surfacePath, path.join(assetsDir, `${slug}-original.png`));
  await fs.writeFile(path.join(assetsDir, `${slug}-annotation-prompts.txt`), queries.map((q) => `- ${q}`).join("\n") + "\n", "utf8");
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const ok = [], fail = [];
  try {
    await loginAdmin(page);
    await impersonate(page);
    for (const [surface, pageMd, slug, queries] of D) {
      if (ONLY && !ONLY.has(surface)) continue;
      try {
        const sp = await captureSurface(page, surface);
        await distribute(sp, pageMd, slug, queries);
        ok.push(`${surface} -> ${pageMd}`);
        console.log(`ok  ${surface} -> ${pageMd} (${slug})`);
      } catch (e) {
        fail.push(`${surface} -> ${pageMd}: ${e.message}`);
        console.error(`FAIL ${surface} -> ${pageMd}: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`\nDONE ok=${ok.length} fail=${fail.length}`);
  if (fail.length) console.log("FAILURES:\n" + fail.join("\n"));
}

main().catch((e) => { console.error(e); process.exit(1); });
