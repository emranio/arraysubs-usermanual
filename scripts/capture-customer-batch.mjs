#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = "https://mirror-help.arrayhash.com";
const ADMIN_URL = `${SITE_URL}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const MY_ACCOUNT = `${SITE_URL}/my-account`;
const SUBSCRIPTION_ID = process.env.ARRAYSUBS_DOCS_SUBSCRIPTION_ID || "4406";
const PRODUCT_URL =
  process.env.ARRAYSUBS_DOCS_PRODUCT_URL || `${SITE_URL}/product/basic-monthly/`;
const USERNAME = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASSWORD =
  process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "@GuDw(0$K7M9t8ehjqDb4Vwj";

async function ensureParent(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function save(page, relativePath) {
  const output = path.join(ROOT, relativePath);
  await ensureParent(output);
  await page.screenshot({ path: output, fullPage: false });
  console.log(`captured ${relativePath}`);
}

async function loginAdmin(page) {
  await page.goto(`${SITE_URL}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USERNAME);
  await page.fill("#user_pass", PASSWORD);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click("#wp-submit"),
  ]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function impersonateCustomer(page) {
  await page.goto(`${ADMIN_URL}#/subscriptions/detail/${SUBSCRIPTION_ID}`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  const button = page.getByRole("link", { name: /Login as Customer/i }).first();
  await button.waitFor({ timeout: 30000 });
  await Promise.all([
    page
      .waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 })
      .catch(() => {}),
    button.click(),
  ]);
  await page.waitForTimeout(1500);
}

async function captureRequired(page, url, waitText, relativePath) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.getByText(waitText, { exact: false }).first().waitFor({
    timeout: 20000,
  });
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await save(page, relativePath);
}

async function captureOptional(page, url, waitText, relativePath) {
  try {
    await captureRequired(page, url, waitText, relativePath);
  } catch (error) {
    console.error(`skipped optional capture ${relativePath}: ${error.message}`);
  }
}

async function captureScrolled(page, selectorOrText, relativePath) {
  const locator = selectorOrText.startsWith(".")
    ? page.locator(selectorOrText).first()
    : page.getByText(selectorOrText, { exact: false }).first();
  await locator.scrollIntoViewIfNeeded({ timeout: 15000 });
  await page.waitForTimeout(600);
  await save(page, relativePath);
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
    await loginAdmin(page);
    await impersonateCustomer(page);

    await captureRequired(
      page,
      `${MY_ACCOUNT}/subscriptions/`,
      "My Subscriptions",
      "markdowns/customer-portal/portal-pages.assets/01-my-account-subscriptions-original.png",
    );

    await captureRequired(
      page,
      `${MY_ACCOUNT}/view-subscription/${SUBSCRIPTION_ID}/`,
      `Subscription #${SUBSCRIPTION_ID}`,
      "markdowns/customer-portal/portal-pages.assets/02-view-subscription-original.png",
    );

    await captureScrolled(
      page,
      ".subscription-actions, .subscription-skip-pause",
      "markdowns/customer-portal/self-service-actions.assets/01-subscription-actions-original.png",
    );

    await captureScrolled(
      page,
      "Shipping Address",
      "markdowns/customer-portal/payment-and-shipping.assets/01-payment-shipping-original.png",
    );

    await captureOptional(
      page,
      `${MY_ACCOUNT}/store-credit/`,
      "Store Credit",
      "markdowns/store-credit/README.assets/01-my-account-store-credit-original.png",
    );

    await captureOptional(
      page,
      `${MY_ACCOUNT}/features/`,
      "features",
      "markdowns/feature-manager/customer-and-storefront-display.assets/01-my-account-features-original.png",
    );

    await captureOptional(
      page,
      PRODUCT_URL,
      "Basic Monthly",
      "markdowns/subscription-products/product-experience.assets/01-product-page-original.png",
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
