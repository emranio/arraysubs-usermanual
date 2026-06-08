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
  process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "";

const routes = [
  {
    route: "#/subscriptions/form",
    waitFor: "Create",
    path: "markdowns/manage-subscriptions/subscription-operations.assets/03-create-subscription-original.png",
  },
  {
    route: "#/settings/toolkit",
    waitFor: "Toolkit",
    path: "markdowns/settings/toolkit-settings.assets/01-toolkit-settings-original.png",
  },
  {
    route: "#/settings/plan-switching",
    waitFor: "Plan",
    path: "markdowns/subscription-products/plan-switching-and-relationships.assets/01-plan-switching-settings-original.png",
  },
  {
    route: "#/settings/refunds",
    waitFor: "Refund",
    path: "markdowns/retention-and-refunds/refund-management.assets/01-refund-settings-original.png",
  },
  {
    route: "#/settings/skip-pause",
    waitFor: "Skip",
    path: "markdowns/billing-and-renewals/recovery-and-grace-flows.assets/01-skip-pause-settings-original.png",
  },
  {
    route: "#/retention-flow",
    waitFor: "Retention",
    path: "markdowns/retention-and-refunds/cancellation-setup.assets/01-retention-flow-original.png",
  },
  {
    route: "#/members-access",
    waitFor: "Role",
    path: "markdowns/member-access/access-rules.assets/01-role-mapping-original.png",
  },
  {
    route: "#/members-access/discount-rules",
    waitFor: "Discount",
    path: "markdowns/member-access/commerce-and-benefit-rules.assets/01-discount-rules-original.png",
  },
  {
    route: "#/members-access/conflicts",
    waitFor: "Conflicts",
    path: "markdowns/audits-and-logs/access-rule-conflicts.assets/01-access-conflicts-original.png",
  },
  {
    route: "#/profile-builder/profile-form",
    waitFor: "Profile",
    path: "markdowns/profile-builder/profile-form.assets/01-profile-form-settings-original.png",
  },
  {
    route: "#/profile-builder/my-account",
    waitFor: "Account",
    path: "markdowns/profile-builder/my-account-editor.assets/01-my-account-editor-original.png",
  },
  {
    route: "#/store-credit",
    waitFor: "Store",
    path: "markdowns/store-credit/store-credit-management.assets/01-store-credit-management-original.png",
  },
  {
    route: "#/store-credit/history",
    waitFor: "History",
    path: "markdowns/store-credit/credit-history.assets/01-credit-history-original.png",
  },
  {
    route: "#/store-credit/settings",
    waitFor: "Credit",
    path: "markdowns/store-credit/store-credit-settings.assets/01-store-credit-settings-original.png",
  },
  {
    route: "#/checkout-builder",
    waitFor: "Checkout",
    path: "markdowns/checkout-and-payments/checkout-builder/README.assets/01-checkout-builder-original.png",
  },
  {
    route: "#/checkout-builder/settings",
    waitFor: "Settings",
    path: "markdowns/checkout-and-payments/checkout-builder/field-types.assets/01-checkout-builder-settings-original.png",
  },
  {
    route: "#/manage-members",
    waitFor: "Member",
    path: "markdowns/member-insight/member-lookup-and-profiles.assets/01-manage-members-original.png",
  },
  {
    route: "#/reports",
    waitFor: "Reports",
    path: "markdowns/analytics/reports-hub.assets/01-reports-hub-original.png",
  },
  {
    route: "#/shortcodes",
    waitFor: "Shortcodes",
    path: "markdowns/shortcodes/README.assets/01-shortcodes-original.png",
  },
  {
    route: "#/audits/activity-audits",
    waitFor: "Activity",
    path: "markdowns/audits-and-logs/activity-audits.assets/01-activity-audits-original.png",
  },
  {
    route: "#/audits/scheduled-job-logs",
    waitFor: "Scheduled",
    path: "markdowns/audits-and-logs/scheduled-job-logs.assets/01-scheduled-job-logs-original.png",
  },
  {
    route: "#/audits/renewal-failures",
    waitFor: "Renewal",
    path: "markdowns/audits-and-logs/renewal-failures.assets/01-renewal-failures-original.png",
  },
  {
    route: "#/settings/gateways",
    waitFor: "Gateway",
    path: "markdowns/gateway-health/README.assets/01-gateway-health-original.png",
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

async function capture(page, item) {
  const output = path.join(ROOT, item.path);
  await ensureParent(output);
  await page.goto(`${ADMIN_URL}${item.route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.getByText(item.waitFor, { exact: false }).first().waitFor({
    timeout: 12000,
  }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: output, fullPage: false });
  return { ...item, output };
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
    for (const item of routes) {
      results.push(await capture(page, item));
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
