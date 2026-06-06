#!/usr/bin/env node
// Insert the full-page screenshots into their pages, after the page's existing
// (top-of-viewport) screenshot so readers get the focused shot then the full
// page. Idempotent. Run: node scripts/wire-full-screenshots.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MD = path.join(ROOT, "markdowns");

const WIRE = [
  ["analytics/README.md", "02-overview-full", "The full WooCommerce Analytics overview — subscription KPIs, charts, and leaderboards (Pro)"],
  ["analytics/subscription-performance.md", "02-performance-full", "The full performance dashboard with charts and MRR/churn leaderboards (Pro)"],
  ["analytics/subscription-performance.md", "03-revenue-full", "Subscription revenue totals in the WooCommerce Revenue report (Pro)"],
  ["analytics/woocommerce-analytics-extension.md", "02-orders-full", "The full Orders report with the subscription Type column and filter (Pro)"],
  ["analytics/woocommerce-analytics-extension.md", "03-revenue-full", "Subscription revenue figures in the Revenue report (Pro)"],
  ["analytics/retention-analytics.md", "02-retention-full", "The full Retention report — KPI cards, churn reasons, and offer breakdown"],
  ["retention-and-refunds/retention-analytics.md", "02-retention-full", "The full Retention report"],
  ["analytics/reports-hub.md", "02-reports-full", "The full Reports hub directory of analytics links"],
  ["analytics/order-list-enhancements.md", "02-orders-list-full", "The full orders list with subscription order context (Pro)"],

  ["audits-and-logs/activity-audits.md", "02-activity-full", "The full activity audit log (Pro)"],
  ["audits-and-logs/README.md", "02-activity-full", "The full activity audit log (Pro)"],
  ["audits-and-logs/scheduled-job-logs.md", "02-jobs-full", "The full scheduled-job log of background tasks (Pro)"],
  ["audits-and-logs/renewal-failures.md", "02-renewal-full", "The full renewal-failure log with retry and resolve actions (Pro)"],
  ["audits-and-logs/portal-action-failures.md", "02-portal-full", "The full portal action failure log (Pro)"],
  ["audits-and-logs/payment-and-shipping-issues.md", "02-portal-full", "Portal action failures, including payment-method and shipping update errors"],
  ["audits-and-logs/access-rule-conflicts.md", "02-conflicts-full", "The full access-rule conflict report"],
  ["audits-and-logs/gateway-health-dashboard.md", "02-gateway-full", "The full gateway health dashboard (Pro)"],
  ["checkout-and-payments/automatic-payments/gateway-health-dashboard.md", "02-gateway-full", "The full gateway health dashboard (Pro)"],

  ["settings/general-settings.md", "02-general-full", "The complete General settings page, top to bottom"],
  ["retention-and-refunds/cancellation-setup.md", "02-retention-flow-full", "The full Retention Flow builder — reasons and offers"],
  ["checkout-and-payments/checkout-builder/README.md", "02-builder-full", "The full Checkout Builder editor (Pro)"],
  ["member-access/access-rules.md", "02-role-full", "The full role-mapping rules screen"],
  ["manage-members/member-lookup-and-profiles.md", "02-member-full", "A full member profile with metrics, subscriptions, and quick actions (Pro)"],
];

function assetsBase(p) { return path.basename(p).replace(/\.md$/, ".assets"); }

const byPage = new Map();
for (const [page, slug, alt] of WIRE) {
  if (!byPage.has(page)) byPage.set(page, []);
  byPage.get(page).push([slug, alt]);
}

let wired = 0, skipped = 0, missing = 0;
for (const [pageRel, items] of byPage) {
  const file = path.join(MD, pageRel);
  if (!fs.existsSync(file)) { console.error(`MISSING md: ${pageRel}`); missing++; continue; }
  let content = fs.readFileSync(file, "utf8");
  const toAdd = items.filter(([slug]) => !content.includes(`${slug}-annotated.png`));
  if (!toAdd.length) { skipped++; continue; }

  const lines = content.split("\n");
  // Anchor: after the LAST existing annotated-image line; else after Page Navigation block.
  let anchor = -1;
  for (let i = 0; i < lines.length; i++) if (/annotated\.png\)/.test(lines[i])) anchor = i;
  let insertAt;
  if (anchor !== -1) {
    insertAt = anchor + 1; // right after that image line
  } else {
    const navIdx = lines.findIndex((l) => /^##\s+Page Navigation/i.test(l));
    if (navIdx !== -1) {
      let i = navIdx + 1;
      while (i < lines.length && !/^#{1,3}\s/.test(lines[i]) && !/^>/.test(lines[i])) i++;
      insertAt = i;
    } else insertAt = 1;
  }

  const block = [];
  for (const [slug, alt] of toAdd) { block.push(`![${alt}](${assetsBase(pageRel)}/${slug}-annotated.png)`); block.push(""); }
  if (lines[insertAt - 1] !== "") block.unshift("");
  lines.splice(insertAt, 0, ...block);
  fs.writeFileSync(file, lines.join("\n"), "utf8");
  wired += toAdd.length;
  console.log(`wired ${toAdd.length} into ${pageRel}`);
}
console.log(`\nWIRE-FULL summary: images=${wired} pages-skipped=${skipped} missing=${missing}`);
