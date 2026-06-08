#!/usr/bin/env node
// Full-page screenshot capture (fullPage:true) for analytics, audits, and a
// few other long admin screens, so the manual shows the whole page (charts,
// tables, leaderboards) instead of only the top of the viewport.
// Run: NODE_PATH=$(npm root -g) node scripts/capture-manual-full.mjs [--only id]

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
const TMP = "/tmp/manual-full";
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx === -1 ? null : new Set((process.argv[onlyIdx + 1] || "").split(",").map((x) => x.trim()).filter(Boolean));

// kind: spa (ArraySubs hash route) | wc (wc-admin path)
const S = {
  // Analytics
  an_overview:  { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/overview", wait: "Performance" },
  an_orders:    { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/orders", wait: "Orders" },
  an_revenue:   { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/revenue", wait: "Revenue" },
  an_retention: { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/arraysubs-retention", wait: "Retention" },
  reports:      { kind: "spa", route: "#/reports", wait: "Performance" },
  orders_list:  { kind: "wc", path: "admin.php?page=wc-orders", wait: "Orders" },
  // Audits
  audits_activity:  { kind: "spa", route: "#/audits/activity-audits", wait: "Activity" },
  audits_jobs:      { kind: "spa", route: "#/audits/scheduled-job-logs", wait: "Scheduled" },
  audits_renewal:   { kind: "spa", route: "#/audits/renewal-failures", wait: "Renewal" },
  audits_portal:    { kind: "spa", route: "#/audits/portal-action-failures", wait: "Portal" },
  audits_conflicts: { kind: "spa", route: "#/members-access/conflicts", wait: "Conflicts" },
  gateway_health:   { kind: "spa", route: "#/settings/gateways", wait: "Gateway" },
  // Other long screens
  settings_general: { kind: "spa", route: "#/settings/general", wait: "Multiple Subscriptions" },
  retention_flow:   { kind: "spa", route: "#/retention-flow", wait: "Retention" },
  checkout_builder: { kind: "spa", route: "#/checkout-builder", wait: "Checkout" },
  members_role:     { kind: "spa", route: "#/members-access", wait: "Role" },
  store_credit:     { kind: "spa", route: "#/store-credit", wait: "store credit" },
  member_detail:    { kind: "spa", route: "#/member-insight/319", wait: "Login as Customer" },
};

// surface, page.md, slug, [queries]
const D = [
  // Analytics — full page
  ["an_overview", "analytics/README.md", "02-overview-full",
    ["rectangle around the subscription performance cards labeled 'Subscription KPIs'"]],
  ["an_overview", "analytics/subscription-performance.md", "02-performance-full",
    ["rectangle around the MRR and churn leaderboards labeled 'Performance leaderboards'"]],
  ["an_orders", "analytics/woocommerce-analytics-extension.md", "02-orders-full",
    ["rectangle around the orders report Type column labeled 'Subscription type'"]],
  ["an_revenue", "analytics/woocommerce-analytics-extension.md", "03-revenue-full",
    ["rectangle around the subscription revenue summary numbers labeled 'Subscription revenue'"]],
  ["an_revenue", "analytics/subscription-performance.md", "03-revenue-full",
    ["rectangle around the recurring revenue summary labeled 'Renewal revenue'"]],
  ["an_retention", "retention-analytics/README.md", "02-retention-full",
    ["rectangle around the retention summary cards labeled 'Retention KPIs'"]],
  ["an_retention", "retention-analytics/README.md", "02-retention-full",
    ["rectangle around the retention summary cards labeled 'Retention KPIs'"]],
  ["reports", "analytics/reports-hub.md", "02-reports-full",
    ["rectangle around the report category links labeled 'Report directory'"]],
  ["orders_list", "analytics/order-list-enhancements.md", "02-orders-list-full",
    ["rectangle around the orders table labeled 'Subscription orders'"]],

  // Audits — full page
  ["audits_activity", "audits-and-logs/activity-audits.md", "02-activity-full",
    ["rectangle around the activity audit timeline labeled 'Audit log'"]],
  ["audits_activity", "audits-and-logs/README.md", "02-activity-full",
    ["rectangle around the activity audit timeline labeled 'Audit log'"]],
  ["audits_jobs", "audits-and-logs/scheduled-job-logs.md", "02-jobs-full",
    ["rectangle around the scheduled job log table labeled 'Scheduled jobs'"]],
  ["audits_renewal", "audits-and-logs/renewal-failures.md", "02-renewal-full",
    ["rectangle around the renewal failure list labeled 'Failed renewals'"]],
  ["audits_portal", "audits-and-logs/portal-action-failures.md", "02-portal-full",
    ["rectangle around the portal action failure list labeled 'Portal errors'"]],
  ["audits_portal", "audits-and-logs/payment-and-shipping-issues.md", "02-portal-full",
    ["rectangle around the portal action failure list labeled 'Update failures'"]],
  ["audits_conflicts", "audits-and-logs/access-rule-conflicts.md", "02-conflicts-full",
    ["rectangle around the access-rule conflict report labeled 'Rule conflicts'"]],
  ["gateway_health", "gateway-health/README.md", "02-gateway-full",
    ["rectangle around the gateway status panels labeled 'Gateway health'"]],
  ["gateway_health", "gateway-health/README.md", "02-gateway-full",
    ["rectangle around the gateway status panels labeled 'Gateway health'"]],

  // Other long screens — full page
  ["settings_general", "settings/general-settings.md", "02-general-full",
    ["rectangle around the cart and checkout rule toggles labeled 'Store-wide rules'"]],
  ["retention_flow", "retention-and-refunds/cancellation-setup.md", "02-retention-flow-full",
    ["rectangle around the cancellation reasons list labeled 'Cancellation reasons'"]],
  ["checkout_builder", "checkout-and-payments/checkout-builder/README.md", "02-builder-full",
    ["rectangle around the checkout builder canvas labeled 'Checkout layout'"]],
  ["members_role", "member-access/access-rules.md", "02-role-full",
    ["rectangle around the role mapping rules labeled 'Role rules'"]],
  ["store_credit", "store-credit/store-credit-management.md", "02-management-full",
    ["rectangle around the customer credit list labeled 'Credit balances'"]],
  ["member_detail", "member-insight/member-lookup-and-profiles.md", "02-member-full",
    ["rectangle around the member metric cards labeled 'Member snapshot'"]],
];

const cache = new Map();

async function login(page) {
  await page.goto(`${SITE}/wp-login.php`, { waitUntil: "domcontentloaded" });
  await page.fill("#user_login", USER);
  await page.fill("#user_pass", PASS);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#wp-submit")]);
  await page.waitForURL(/wp-admin/, { timeout: 30000 });
}

async function captureSurface(page, id) {
  if (cache.has(id)) return cache.get(id);
  const s = S[id];
  const out = path.join(TMP, `${id}.png`);
  await fs.mkdir(TMP, { recursive: true });
  const url = s.kind === "spa" ? `${ADMIN}${s.route}` : `${SITE}/wp-admin/${s.path}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  if (s.kind === "spa") await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 }).catch(() => {});
  if (s.wait) await page.getByText(s.wait, { exact: false }).first().waitFor({ timeout: 12000 }).catch(() => {});
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(3500); // let charts/tables render
  await page.screenshot({ path: out, fullPage: true });
  cache.set(id, out);
  return out;
}

async function distribute(surfacePath, pageMd, slug, queries) {
  const dir = path.join(MD, pageMd.replace(/\.md$/, ".assets"));
  await fs.mkdir(dir, { recursive: true });
  await fs.copyFile(surfacePath, path.join(dir, `${slug}-original.png`));
  await fs.writeFile(path.join(dir, `${slug}-annotation-prompts.txt`), queries.map((q) => `- ${q}`).join("\n") + "\n", "utf8");
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const ok = [], fail = [];
  try {
    await login(page);
    for (const [surface, pageMd, slug, queries] of D) {
      if (ONLY && !ONLY.has(surface)) continue;
      try {
        const sp = await captureSurface(page, surface);
        await distribute(sp, pageMd, slug, queries);
        ok.push(`${surface} -> ${pageMd}#${slug}`);
        console.log(`ok  ${surface} -> ${pageMd} (${slug})`);
      } catch (e) {
        fail.push(`${surface} -> ${pageMd}: ${e.message}`);
        console.error(`FAIL ${surface} -> ${pageMd}: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`\nDONE ok=${ok.length} fail=${fail.length} surfaces=${cache.size}`);
  if (fail.length) console.log("FAILURES:\n" + fail.join("\n"));
}

main().catch((e) => { console.error(e); process.exit(1); });
