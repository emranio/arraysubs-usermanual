#!/usr/bin/env node
// Re-capture the handful of screenshots whose annotation target was scrolled
// out of view (so the marker could not locate it), now scrolled to the right
// section, with sharper prompts. Run: NODE_PATH=$(npm root -g) node scripts/recapture-fixes.mjs

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
const PASS = process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "@GuDw(0$K7M9t8ehjqDb4Vwj";

// surface, page.md, slug, scrollText, [queries]
const JOBS = [
  ["spa", "#/settings/general", "billing-and-renewals/README.md", "01-grace-renewal", "Grace Period",
    ["rectangle around the Grace Period settings labeled 'Grace and renewal timing'"]],
  ["spa", "#/settings/general", "billing-and-renewals/renewal-communication.md", "01-email-schedule", "Email Reminder Schedule",
    ["rectangle around the Email Reminder Schedule day fields labeled 'Reminder timing'"]],
  ["spa", "#/subscriptions/detail/4406", "billing-and-renewals/renewal-operations.md", "01-related-orders", "Related Orders",
    ["rectangle around the related orders list labeled 'Renewal orders'"]],
  ["spa", "#/subscriptions/detail/4406", "manage-subscriptions/admin-tools-and-records.md", "01-notes-records", "Notes",
    ["rectangle around the subscription notes timeline labeled 'Notes and records'"]],
  ["spa", "#/settings/toolkit", "member-access/session-and-frontend-controls.md", "01-multi-login", "Multi-Login",
    ["rectangle around the Multi-Login Prevention controls labeled 'Concurrent session limit'"]],
  ["spa", "#/retention-flow", "retention-and-refunds/retention-offers.md", "01-offers", "Discount Offer",
    ["rectangle around the discount retention offer settings labeled 'Retention offers'"]],
  ["spa", "#/shortcodes", "shortcodes/content-gating.md", "01-restrict-shortcode", "Restrict Content",
    ["rectangle around the arraysubs_restrict shortcode card labeled 'Content gating shortcode'"]],
  ["store", "/product/custom-credit/", "store-credit/purchase-product.md", "01-credit-product", null,
    ["rectangle around the credit amount field and add to cart button labeled 'Buy store credit'"]],
];

async function login(page) {
  await page.goto(`${SITE}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USER);
  await page.fill("#user_pass", PASS);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#wp-submit")]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function write(out, pageMd, slug, queries) {
  const dir = path.join(MD, pageMd.replace(/\.md$/, ".assets"));
  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(out, path.join(dir, `${slug}-original.png`));
  await fs.writeFile(path.join(dir, `${slug}-annotation-prompts.txt`), queries.map((q) => `- ${q}`).join("\n") + "\n", "utf8");
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, ignoreHTTPSErrors: true });
  await fs.mkdir("/tmp/fix-shots", { recursive: true });
  let ok = 0, fail = 0;
  try {
    await login(page);
    for (const [kind, route, pageMd, slug, scrollText, queries] of JOBS) {
      const out = `/tmp/fix-shots/${slug}.png`;
      try {
        if (kind === "spa") {
          await page.goto(`${ADMIN}${route}`, { waitUntil: "domcontentloaded" });
          await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 }).catch(() => {});
          await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
          await page.waitForTimeout(2500);
          if (scrollText) {
            await page.getByText(scrollText, { exact: false }).first()
              .scrollIntoViewIfNeeded({ timeout: 10000 }).catch(() => {});
            await page.evaluate(() => window.scrollBy(0, -120)); // a little headroom above the section
            await page.waitForTimeout(900);
          }
        } else if (kind === "store") {
          await page.goto(`${SITE}${route}`, { waitUntil: "domcontentloaded" });
          await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
          await page.locator(".single_add_to_cart_button, button[name='add-to-cart'], input[name='arraysubs_credit_amount'], .summary").first()
            .scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
          await page.waitForTimeout(1200);
        }
        await page.screenshot({ path: out, fullPage: false });
        await write(out, pageMd, slug, queries);
        console.log(`ok  ${slug} -> ${pageMd}`);
        ok++;
      } catch (e) {
        console.error(`FAIL ${slug}: ${e.message}`);
        fail++;
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`\nDONE ok=${ok} fail=${fail}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
