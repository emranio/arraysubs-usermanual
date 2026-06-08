#!/usr/bin/env node
// Insert annotated-screenshot references into manual pages, right after the
// "## Page Navigation" block (matching the existing manual convention).
// Idempotent: skips a page+slug already referenced. Run: node scripts/wire-manual-screenshots.mjs

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MD = path.join(ROOT, "markdowns");

// [ page (relative to markdowns), slug, alt/caption ]
const WIRE = [
  ["getting-started/README.md", "01-help-hub", "The built-in Help screen links to every guide from inside the plugin"],
  ["getting-started/before-you-launch.md", "01-plugins-active", "ArraySubs (free core) and ArraySubs Pro both active on the Plugins screen"],
  ["getting-started/cron-job-setup.md", "01-action-scheduler", "The Action Scheduler queue running ArraySubs background jobs"],
  ["getting-started/first-time-setup.md", "01-general-settings", "General settings are the first stop when configuring ArraySubs"],
  ["getting-started/import-export-settings.md", "01-import-export", "Export and import settings as JSON from the Easy Setup screen"],
  ["getting-started/essential-daily-workflows.md", "01-subscriptions-list", "The Subscriptions list is the hub for day-to-day work"],

  ["settings/README.md", "01-settings-tabs", "ArraySubs settings are grouped into tabbed sections"],

  ["subscription-products/README.md", "01-products-list", "Subscription products are flagged in the WooCommerce Products list"],
  ["subscription-products/create-and-configure.md", "01-subscription-fields", "The Subscription panel in the WooCommerce product editor"],
  ["coupons/README.md", "01-coupon-fields", "ArraySubs subscription options on a WooCommerce coupon"],
  ["subscription-products/product-lifecycle.md", "01-helper-links", "Direct add-to-cart and one-click checkout helper links for testing"],
  ["subscription-products/plan-switching-and-relationships.md", "02-fixed-period-fields", "Fixed-period membership end-date fields (Pro)"],
  ["redirect-product-page/README.md", "01-redirect-fields", "Per-product page redirect settings (Pro)"],
  ["subscription-shipping/README.md", "01-shipping-product-fields", "Recurring vs one-time subscription shipping fields (Pro)"],

  ["manage-subscriptions/README.md", "01-subscriptions-list", "The Subscriptions admin list with filters and search"],
  ["subscription-notes/README.md", "01-notes-records", "The subscription notes timeline records every lifecycle event"],
  ["manage-subscriptions/admin-tools-and-records.md", "02-feature-log", "The subscription feature log (Pro)"],
  ["manage-subscriptions/lifecycle-management.md", "01-status-control", "The status control on the subscription editor"],

  ["member-access/README.md", "01-role-mapping", "The role-mapping rule list in Member Access"],
  ["member-access/content-restriction.md", "01-url-rules", "A URL restriction rule in Member Access"],
  ["member-access/session-and-frontend-controls.md", "01-multi-login", "Multi-login prevention controls in Toolkit (Pro)"],
  ["member-access/use-cases.md", "01-ecommerce-rules", "An ecommerce restriction rule used for member-only pricing"],

  ["profile-builder/README.md", "01-profile-form", "The custom profile field builder"],

  ["retention-and-refunds/README.md", "01-retention-flow", "Cancellation reasons configured in the Retention Flow builder"],
  ["retention-and-refunds/retention-offers.md", "01-offers", "Retention offers (discount, pause, downgrade, contact) in the builder"],
  ["retention-analytics/README.md", "01-retention-report", "The Retention analytics report under WooCommerce Analytics"],
  ["retention-and-refunds/retention-use-cases.md", "01-retention-modal", "A save offer shown to the customer in the cancellation flow"],

  ["analytics/README.md", "01-analytics-overview", "Subscription performance cards added to WooCommerce Analytics (Pro)"],
  ["retention-analytics/README.md", "01-retention-report", "The Retention report tracks cancellations and saves"],
  ["analytics/subscription-performance.md", "01-performance-cards", "MRR, churn, ARPU and other subscription cards (Pro)"],
  ["analytics/woocommerce-analytics-extension.md", "01-orders-type", "The subscription Type column and filter in the Orders report (Pro)"],
  ["analytics/order-list-enhancements.md", "01-orders-list", "Subscription order context added to the orders list (Pro)"],

  ["emails/README.md", "01-emails-list", "ArraySubs emails listed under WooCommerce email settings"],
  ["emails/customer-emails.md", "01-email-settings", "A customer email with the click-to-insert placeholder helper"],
  ["emails/admin-emails.md", "01-admin-emails", "Store-owner notification emails in WooCommerce"],
  ["emails/store-credit-emails.md", "01-credit-emails", "The four Store Credit emails (Pro)"],

  ["shortcodes/account-shortcodes.md", "01-shortcodes", "The in-plugin Shortcodes reference"],
  ["shortcodes/content-gating.md", "01-restrict-shortcode", "Content-gating shortcode reference"],

  ["store-credit/purchase-product.md", "01-credit-product", "Store Credit product fields in the product editor (Pro)"],
  ["store-credit/refund-to-credit.md", "01-refund-to-credit", "The WooCommerce refund panel on a subscription order (Pro)"],
  ["store-credit/emails.md", "01-credit-emails", "Store Credit event emails (Pro)"],

  ["billing-and-renewals/README.md", "01-grace-renewal", "Grace-period and renewal-timing settings"],
  ["billing-and-renewals/renewal-communication.md", "01-email-schedule", "The reminder schedule that drives renewal emails"],
  ["billing-and-renewals/renewal-operations.md", "01-related-orders", "Related renewal orders shown on a subscription"],
  ["billing-and-renewals/trial-management.md", "01-trial-settings", "Trial-related settings in General settings"],

  ["checkout-and-payments/README.md", "01-checkout", "The subscription order summary at checkout"],
  ["checkout-and-payments/subscription-checkout.md", "01-checkout-summary", "Recurring totals and authorization terms in the checkout summary"],
  ["checkout-and-payments/automatic-payments/README.md", "01-gateways-list", "ArraySubs PayPal and Paddle payment methods (Pro)"],
  ["checkout-and-payments/automatic-payments/paypal.md", "01-paypal-settings", "PayPal gateway credential fields (Pro)"],
  ["checkout-and-payments/automatic-payments/paddle.md", "01-paddle-settings", "Paddle gateway credential fields (Pro)"],
  ["checkout-and-payments/automatic-payments/stripe.md", "01-stripe-row", "Stripe in the WooCommerce payment methods list (Pro)"],
  ["checkout-and-payments/automatic-payments/payment-recovery.md", "01-renewal-failures", "Renewal-failure recovery tools (Pro)"],
  ["checkout-and-payments/automatic-payments/auto-renew-and-manual-fallback.md", "01-auto-renew", "The customer Auto-Renew toggle and saved card (Pro)"],
  ["checkout-and-payments/checkout-builder/use-cases.md", "01-builder-canvas", "The drag-and-drop Checkout Builder canvas (Pro)"],

  ["audits-and-logs/README.md", "01-activity-audits", "The activity audit trail (Pro)"],
  ["gateway-health/README.md", "01-gateway-health", "The gateway health dashboard (Pro)"],
  ["audits-and-logs/portal-action-failures.md", "01-portal-failures", "The portal action failures log (Pro)"],
  ["audits-and-logs/payment-and-shipping-issues.md", "01-portal-failures", "Portal action failures help diagnose payment and shipping update issues"],

  ["feature-manager/README.md", "01-feature-tab", "The Feature Manager product tab with defined features (Pro)"],
  ["feature-manager/defining-product-features.md", "01-feature-editor", "Defining product features in the editor (Pro)"],

  ["member-insight/README.md", "01-member-search", "Member search in Manage Members (Pro)"],
  ["member-insight/member-commerce-overview.md", "01-member-commerce", "A member's subscriptions, orders, credit and metrics (Pro)"],
  ["member-insight/member-operations.md", "01-member-profile", "The member profile header and quick actions (Pro)"],

  ["customer-portal/README.md", "01-my-account-dashboard", "The Subscriptions self-service area inside My Account"],
];

function basenameAssets(pageRel) {
  return path.basename(pageRel).replace(/\.md$/, ".assets");
}

function imgMarkdown(pageRel, slug, alt) {
  return `![${alt}](${basenameAssets(pageRel)}/${slug}-annotated.png)`;
}

// Group by page so multiple images insert as one block.
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
  if (toAdd.length === 0) { skipped++; continue; }

  const lines = content.split("\n");
  const navIdx = lines.findIndex((l) => /^##\s+Page Navigation/i.test(l));
  let insertAt;
  if (navIdx !== -1) {
    let i = navIdx + 1;
    while (i < lines.length && !/^#{1,3}\s/.test(lines[i]) && !/^>/.test(lines[i])) i++;
    insertAt = i; // first heading or blockquote after the nav block
  } else {
    const availIdx = lines.findIndex((l) => /\*\*Availability/i.test(l));
    insertAt = (availIdx !== -1 ? availIdx + 1 : 1);
  }

  const block = [];
  for (const [slug, alt] of toAdd) { block.push(imgMarkdown(pageRel, slug, alt)); block.push(""); }
  // ensure a blank line precedes the block
  if (lines[insertAt - 1] !== "") block.unshift("");
  lines.splice(insertAt, 0, ...block);
  fs.writeFileSync(file, lines.join("\n"), "utf8");
  wired += toAdd.length;
  console.log(`wired ${toAdd.length} into ${pageRel}`);
}

console.log(`\nWIRE summary: images=${wired} pages-skipped=${skipped} missing=${missing}`);
