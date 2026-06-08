#!/usr/bin/env node
// Comprehensive admin-context screenshot capture for the ArraySubs user manual.
// Captures each distinct UI surface ONCE, then distributes the image (with a
// per-page annotation-prompts file) into every consuming page's .assets dir.
// Run:  NODE_PATH=$(npm root -g) node scripts/capture-manual-admin.mjs [--only <surfaceId>]

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(import.meta.dirname, "..");
const MARKDOWNS = path.join(ROOT, "markdowns");
const SITE = "https://mirror-help.arrayhash.com";
const ADMIN = `${SITE}/wp-admin/admin.php?page=arraysubs-mainadmin`;
const USER = process.env.ARRAYSUBS_DOCS_ADMIN_USER || "admin";
const PASS = process.env.ARRAYSUBS_DOCS_ADMIN_PASSWORD || "";
const TMP = "/tmp/manual-shots";
const onlyIdx = process.argv.indexOf("--only");
const ONLY = onlyIdx === -1 ? null : new Set((process.argv[onlyIdx + 1] || "").split(",").map((x) => x.trim()).filter(Boolean));

// ---- Surfaces: each captured once -----------------------------------------
const S = {
  // --- Admin React SPA (hash routes) ---
  sub_list:        { kind: "spa", route: "#/subscriptions", wait: "Manage customer subscriptions" },
  sub_detail:      { kind: "spa", route: "#/subscriptions/detail/4406", wait: "Customer Information" },
  sub_edit:        { kind: "spa", route: "#/subscriptions/edit/4406", wait: "Edit Subscription" },
  feature_log:     { kind: "spa", route: "#/subscriptions/feature-log", wait: "Feature Log" },
  easy_setup:      { kind: "spa", route: "#/easy-setup", wait: "Easy Setup" },
  help:            { kind: "spa", route: "#/help", wait: "Documentation" },
  settings_general:{ kind: "spa", route: "#/settings/general", wait: "Multiple Subscriptions" },
  toolkit:         { kind: "spa", route: "#/settings/toolkit", wait: "Toolkit" },
  gateways:        { kind: "spa", route: "#/settings/gateways", wait: "Gateway" },
  retention_flow:  { kind: "spa", route: "#/retention-flow", wait: "Retention" },
  members_role:    { kind: "spa", route: "#/members-access", wait: "Role" },
  members_url:     { kind: "spa", route: "#/members-access/url-rules", wait: "URL" },
  members_ecom:    { kind: "spa", route: "#/members-access/ecommerce-rules", wait: "Ecommerce" },
  shortcodes:      { kind: "spa", route: "#/shortcodes", wait: "shortcode" },
  audits_activity: { kind: "spa", route: "#/audits/activity-audits", wait: "Activity" },
  audits_renewal:  { kind: "spa", route: "#/audits/renewal-failures", wait: "Renewal" },
  audits_portal:   { kind: "spa", route: "#/audits/portal-action-failures", wait: "Portal" },
  checkout_builder:{ kind: "spa", route: "#/checkout-builder", wait: "Checkout" },
  manage_members:  { kind: "spa", route: "#/manage-members", wait: "Manage Members" },
  member_detail:   { kind: "spa", route: "#/manage-members/319", wait: "Login as Customer" },
  profile_form:    { kind: "spa", route: "#/profile-builder/profile-form", wait: "Profile" },

  // --- WooCommerce / WP classic admin ---
  emails_customer: { kind: "wc", path: "admin.php?page=wc-settings&tab=email", wait: "Email", scrollText: "[ArraySubs] New Subscription" },
  emails_admin:    { kind: "wc", path: "admin.php?page=wc-settings&tab=email", wait: "Email", scrollText: "New Subscription (Admin)" },
  emails_credit:   { kind: "wc", path: "admin.php?page=wc-settings&tab=email", wait: "Email", scrollText: "Store Credit Added" },
  payments_list:   { kind: "wc", path: "admin.php?page=wc-settings&tab=checkout", wait: "Payment" },
  gw_paypal:       { kind: "wc", path: "admin.php?page=wc-settings&tab=checkout&section=arraysubs_paypal", wait: "PayPal" },
  gw_paddle:       { kind: "wc", path: "admin.php?page=wc-settings&tab=checkout&section=arraysubs_paddle", wait: "Paddle" },
  an_overview:     { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/overview", wait: "Performance" },
  an_orders:       { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/orders", wait: "Orders" },
  an_retention:    { kind: "wc", path: "admin.php?page=wc-admin&path=/analytics/arraysubs-retention", wait: "Retention" },
  orders_list:     { kind: "wc", path: "admin.php?page=wc-orders", wait: "Orders" },
  products_list:   { kind: "wc", path: "edit.php?post_type=product", wait: "Add New" },
  action_sched:    { kind: "wc", path: "tools.php?page=action-scheduler", wait: "Scheduled Action" },
  plugins:         { kind: "wc", path: "plugins.php", wait: "ArraySubs" },
  order_refund:    { kind: "wc", path: "admin.php?page=wc-orders&action=edit&id=4251", wait: "Order", openRefund: true, shot: "#woocommerce-order-items" },
  email_renewal:   { kind: "wc", path: "admin.php?page=wc-settings&tab=email&section=arraysubs_renewal_invoice", wait: "Renewal Invoice" },

  // --- Product / coupon edit (element screenshot of the data metabox) ---
  prod_sub:        { kind: "product", id: 197, tab: "Subscription", shot: "#woocommerce-product-data" },
  prod_feature:    { kind: "product", id: 233, tab: "Feature Manager", shot: "#woocommerce-product-data" },
  prod_redirect:   { kind: "product", id: 197, tab: "ArraySubs Redirect", shot: "#woocommerce-product-data" },
  prod_fixed:      { kind: "product", id: 1683, tab: "Subscription", shot: "#woocommerce-product-data" },
  prod_shipping:   { kind: "product", id: 67, tab: "Subscription", shot: "#woocommerce-product-data" },
  prod_helper:     { kind: "product", id: 197, tab: "General", shot: "#woocommerce-product-data" },
  prod_credit:     { kind: "product", id: 1106, tab: "General", shot: "#woocommerce-product-data" },
  coupon_sub:      { kind: "product", id: 456, tab: null, shot: "#woocommerce-coupon-data" },

  // --- Storefront ---
  product_page:    { kind: "store", path: "/product/basic-monthly/", wait: "Basic Monthly" },
  checkout_page:   { kind: "store", path: "/checkout/", wait: "Subtotal", addCart: true },
};

// ---- Distribution: surface -> page(s) + slug + minimal annotation queries ---
const D = [
  // Getting started
  ["plugins", "getting-started/before-you-launch.md", "01-plugins-active",
    ["rectangle around the ArraySubs and ArraySubs Pro plugin rows in the list labeled 'Free core + Pro addon'"]],
  ["action_sched", "getting-started/cron-job-setup.md", "01-action-scheduler",
    ["rectangle around the scheduled actions table labeled 'Background job queue'"]],
  ["help", "getting-started/README.md", "01-help-hub",
    ["rectangle around the in-plugin documentation cards labeled 'Built-in help'"]],
  ["easy_setup", "getting-started/import-export-settings.md", "01-import-export",
    ["rectangle around the export and import settings panel labeled 'Backup and restore'"]],
  ["settings_general", "getting-started/first-time-setup.md", "01-general-settings",
    ["rectangle around the General settings form labeled 'Core subscription rules'"]],
  ["sub_list", "getting-started/essential-daily-workflows.md", "01-subscriptions-list",
    ["rectangle around the subscriptions list table labeled 'Daily workflow hub'"]],

  // Settings
  ["settings_general", "settings/README.md", "01-settings-tabs",
    ["rectangle around the row of settings tabs at the top labeled 'Settings sections'"]],

  // Subscription products
  ["products_list", "subscription-products/README.md", "01-products-list",
    ["rectangle around a product row showing its subscription indicator labeled 'Subscription product'"]],
  ["prod_sub", "subscription-products/create-and-configure.md", "01-subscription-fields",
    ["rectangle around the Billing Period and Billing Interval fields labeled 'Billing schedule'",
     "rectangle around the Free Trial and Sign-up Fee fields labeled 'Trial and signup fee'"]],
  ["coupon_sub", "coupons/README.md", "01-coupon-fields",
    ["rectangle around the subscription coupon options labeled 'Recurring discount controls'"]],
  ["prod_helper", "subscription-products/product-lifecycle.md", "01-helper-links",
    ["rectangle around the direct add-to-cart and one-click checkout helper links labeled 'Test links'"]],
  ["prod_fixed", "subscription-products/plan-switching-and-relationships.md", "02-fixed-period-fields",
    ["rectangle around the fixed end date fields labeled 'Fixed-period membership (Pro)'"]],
  ["prod_redirect", "redirect-product-page/README.md", "01-redirect-fields",
    ["rectangle around the redirect action setting labeled 'Product page redirect (Pro)'"]],
  ["prod_shipping", "subscription-shipping/README.md", "01-shipping-product-fields",
    ["rectangle around the subscription shipping type field labeled 'Recurring shipping (Pro)'"]],

  // Manage subscriptions
  ["sub_list", "manage-subscriptions/README.md", "01-subscriptions-list",
    ["rectangle around the subscriptions list with its filters labeled 'Subscriptions list'"]],
  ["sub_detail", "subscription-notes/README.md", "01-notes-records",
    ["rectangle around the subscription notes timeline labeled 'Notes and records'"]],
  ["feature_log", "manage-subscriptions/admin-tools-and-records.md", "02-feature-log",
    ["rectangle around the feature log content labeled 'Feature log'"]],
  ["sub_edit", "manage-subscriptions/lifecycle-management.md", "01-status-control",
    ["rectangle around the subscription status field labeled 'Status control'"]],

  // Member access
  ["members_role", "member-access/README.md", "01-role-mapping",
    ["rectangle around the role mapping rule list labeled 'Access rule engine'"]],
  ["members_url", "member-access/content-restriction.md", "01-url-rules",
    ["rectangle around the URL restriction rule labeled 'URL gating'"]],
  ["toolkit", "member-access/session-and-frontend-controls.md", "01-multi-login",
    ["rectangle around the multi-login prevention controls labeled 'Concurrent session limit'"]],
  ["members_ecom", "member-access/use-cases.md", "01-ecommerce-rules",
    ["rectangle around the ecommerce restriction rule labeled 'Commerce rule'"]],

  // Profile builder
  ["profile_form", "profile-builder/README.md", "01-profile-form",
    ["rectangle around the custom profile field builder labeled 'Profile fields'"]],

  // Retention & refunds
  ["retention_flow", "retention-and-refunds/README.md", "01-retention-flow",
    ["rectangle around the cancellation reasons configuration labeled 'Cancellation flow'"]],
  ["retention_flow", "retention-and-refunds/retention-offers.md", "01-offers",
    ["rectangle around the retention offer settings labeled 'Retention offers'"]],
  ["an_retention", "retention-analytics/README.md", "01-retention-report",
    ["rectangle around the retention KPI cards labeled 'Retention metrics'"]],

  // Analytics
  ["an_retention", "retention-analytics/README.md", "01-retention-report",
    ["rectangle around the retention summary cards labeled 'Retention analytics'"]],
  ["an_overview", "analytics/README.md", "01-analytics-overview",
    ["rectangle around the subscription performance cards labeled 'Subscription analytics'"]],
  ["an_overview", "analytics/subscription-performance.md", "01-performance-cards",
    ["rectangle around the recurring revenue and churn cards labeled 'Performance metrics'"]],
  ["an_orders", "analytics/woocommerce-analytics-extension.md", "01-orders-type",
    ["rectangle around the subscription Type column or filter labeled 'Subscription type'"]],
  ["orders_list", "analytics/order-list-enhancements.md", "01-orders-list",
    ["rectangle around an order row type indicator labeled 'Order type'"]],

  // Emails
  ["emails_customer", "emails/README.md", "01-emails-list",
    ["rectangle around the ArraySubs subscription email rows labeled 'Subscription emails'"]],
  ["email_renewal", "emails/customer-emails.md", "01-email-settings",
    ["rectangle around the email subject and additional content fields labeled 'Editable email'"]],
  ["emails_admin", "emails/admin-emails.md", "01-admin-emails",
    ["rectangle around the email rows ending in (Admin) labeled 'Admin emails'"]],
  ["emails_credit", "emails/store-credit-emails.md", "01-credit-emails",
    ["rectangle around the ArraySubsPro Store Credit email rows labeled 'Store credit emails'"]],

  // Shortcodes
  ["shortcodes", "shortcodes/account-shortcodes.md", "01-shortcodes",
    ["rectangle around the account shortcodes reference labeled 'Account shortcodes'"]],
  ["shortcodes", "shortcodes/content-gating.md", "01-restrict-shortcode",
    ["rectangle around the restrict shortcode reference labeled 'Content gating shortcode'"]],

  // Store credit
  ["prod_credit", "store-credit/purchase-product.md", "01-credit-product",
    ["rectangle around the store credit amount fields labeled 'Credit product setup'"]],
  ["order_refund", "store-credit/refund-to-credit.md", "01-refund-to-credit",
    ["rectangle around the Refund button in the order items totals labeled 'Refund to store credit'"]],
  ["emails_credit", "store-credit/emails.md", "01-credit-emails",
    ["rectangle around the ArraySubsPro Store Credit email rows labeled 'Store credit emails'"]],

  // Billing & renewals
  ["settings_general", "billing-and-renewals/README.md", "01-grace-renewal",
    ["rectangle around the grace period settings labeled 'Grace and renewal timing'"]],
  ["settings_general", "billing-and-renewals/renewal-communication.md", "01-email-schedule",
    ["rectangle around the email reminder schedule fields labeled 'Reminder timing'"]],
  ["sub_detail", "billing-and-renewals/renewal-operations.md", "01-related-orders",
    ["rectangle around the related orders section labeled 'Renewal orders'"]],
  ["settings_general", "billing-and-renewals/trial-management.md", "01-trial-settings",
    ["rectangle around the trial-related settings labeled 'Trial rules'"]],

  // Checkout & payments
  ["checkout_page", "checkout-and-payments/README.md", "01-checkout",
    ["rectangle around the order summary on the checkout page labeled 'Subscription checkout'"]],
  ["checkout_page", "checkout-and-payments/subscription-checkout.md", "01-checkout-summary",
    ["rectangle around the subscription order summary labeled 'Recurring totals'"]],
  ["payments_list", "checkout-and-payments/automatic-payments/README.md", "01-gateways-list",
    ["rectangle around the ArraySubs PayPal and Paddle payment methods labeled 'Automatic gateways'"]],
  ["gw_paypal", "checkout-and-payments/automatic-payments/paypal.md", "01-paypal-settings",
    ["rectangle around the PayPal Client ID and Secret fields labeled 'PayPal credentials'"]],
  ["gw_paddle", "checkout-and-payments/automatic-payments/paddle.md", "01-paddle-settings",
    ["rectangle around the Paddle API key and webhook fields labeled 'Paddle credentials'"]],
  ["payments_list", "checkout-and-payments/automatic-payments/stripe.md", "01-stripe-row",
    ["rectangle around the Stripe payment method row labeled 'Stripe gateway'"]],
  ["audits_renewal", "checkout-and-payments/automatic-payments/payment-recovery.md", "01-renewal-failures",
    ["rectangle around the renewal failure retry action labeled 'Payment recovery'"]],
  ["checkout_builder", "checkout-and-payments/checkout-builder/use-cases.md", "01-builder-canvas",
    ["rectangle around the checkout builder editing canvas labeled 'Drag-and-drop editor'"]],

  // Audits & logs
  ["audits_activity", "audits-and-logs/README.md", "01-activity-audits",
    ["rectangle around the activity audit timeline labeled 'Audit trail'"]],
  ["gateways", "gateway-health/README.md", "01-gateway-health",
    ["rectangle around the gateway status overview labeled 'Gateway health'"]],
  ["audits_portal", "audits-and-logs/portal-action-failures.md", "01-portal-failures",
    ["rectangle around the portal action failures list labeled 'Portal errors'"]],
  ["audits_portal", "audits-and-logs/payment-and-shipping-issues.md", "01-portal-failures",
    ["rectangle around a failed portal action entry labeled 'Update failures'"]],

  // Feature manager
  ["prod_feature", "feature-manager/README.md", "01-feature-tab",
    ["rectangle around the product features list labeled 'Product features'"]],
  ["prod_feature", "feature-manager/defining-product-features.md", "01-feature-editor",
    ["rectangle around the feature definition rows labeled 'Define features'"]],

  // Manage members
  ["manage_members", "member-insight/README.md", "01-member-search",
    ["rectangle around the member search box labeled 'Member lookup'"]],
  ["member_detail", "member-insight/member-commerce-overview.md", "01-member-commerce",
    ["rectangle around the member subscriptions and orders area labeled 'Member commerce'"]],
  ["member_detail", "member-insight/member-operations.md", "01-member-profile",
    ["rectangle around the member profile header labeled 'Member profile'"]],
];

const cache = new Map();

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

async function settle(page, ms = 2500) {
  await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(ms);
}

async function captureSurface(page, id) {
  if (cache.has(id)) return cache.get(id);
  const s = S[id];
  const out = path.join(TMP, `${id}.png`);
  await fs.mkdir(TMP, { recursive: true });

  if (s.kind === "spa") {
    await page.goto(`${ADMIN}${s.route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".arraysubs-admin-page", { timeout: 30000 }).catch(() => {});
    if (s.wait) await page.getByText(s.wait, { exact: false }).first().waitFor({ timeout: 12000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page, 2800);
    await page.screenshot({ path: out, fullPage: false });
  } else if (s.kind === "wc") {
    await page.goto(`${SITE}/wp-admin/${s.path}`, { waitUntil: "domcontentloaded" });
    if (s.wait) await page.getByText(s.wait, { exact: false }).first().waitFor({ timeout: 12000 }).catch(() => {});
    await settle(page, 2200);
    if (s.openRefund) {
      const rb = page.locator("button.refund-items").first();
      await rb.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
      await rb.click({ timeout: 6000 }).catch(() => {});
      await page.waitForTimeout(1500);
      // Reveal the store-credit refund method (the plugin moves it in on ajaxComplete,
      // which a fresh panel-open doesn't trigger) — invoke the same move it would do.
      await page.evaluate(() => {
        const el = document.querySelector("#arraysubspro-refund-method");
        const actions = document.querySelector(".wc-order-refund-items .refund-actions");
        if (el && actions && !el.closest(".wc-order-refund-items")) {
          actions.parentNode.insertBefore(el, actions);
          el.style.display = "";
        }
      }).catch(() => {});
      await page.locator('input[name="arraysubs_refund_method"][value="store_credit"]').check({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(1200);
    }
    if (s.scrollText) {
      await page.getByText(s.scrollText, { exact: false }).first().scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(800);
    } else if (!s.shot) {
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    if (s.shot) {
      const el = page.locator(s.shot).first();
      await el.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(500);
      await el.screenshot({ path: out }).catch(async () => { await page.screenshot({ path: out, fullPage: false }); });
    } else {
      await page.screenshot({ path: out, fullPage: false });
    }
  } else if (s.kind === "product") {
    await page.goto(`${SITE}/wp-admin/post.php?post=${s.id}&action=edit`, { waitUntil: "domcontentloaded" });
    const box = s.shot;
    await page.waitForSelector(box, { timeout: 30000 }).catch(() => {});
    if (s.tab) {
      const tab = page.locator(`.product_data_tabs a, ${box} .panel-wrap ul li a`).filter({ hasText: s.tab }).first();
      await tab.click({ timeout: 8000 }).catch(() => {});
    }
    await settle(page, 1500);
    const el = page.locator(box).first();
    await el.scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(800);
    await el.screenshot({ path: out }).catch(async () => {
      await page.screenshot({ path: out, fullPage: false });
    });
  } else if (s.kind === "store") {
    if (s.addCart) {
      await page.goto(`${SITE}/product/basic-monthly/`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1500);
      const add = page.locator('.single_add_to_cart_button, button[name="add-to-cart"]').first();
      await add.scrollIntoViewIfNeeded({ timeout: 6000 }).catch(() => {});
      await add.click({ timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(3500);
    }
    await page.goto(`${SITE}${s.path}`, { waitUntil: "domcontentloaded" });
    if (s.wait) await page.getByText(s.wait, { exact: false }).first().waitFor({ timeout: 12000 }).catch(() => {});
    await page.evaluate(() => window.scrollTo(0, 0));
    await settle(page, 2500);
    await page.screenshot({ path: out, fullPage: false });
  }

  cache.set(id, out);
  return out;
}

async function distribute(surfacePath, pageMd, slug, queries) {
  const assetsDir = path.join(MARKDOWNS, pageMd.replace(/\.md$/, ".assets"));
  await fs.mkdir(assetsDir, { recursive: true });
  const orig = path.join(assetsDir, `${slug}-original.png`);
  const prompts = path.join(assetsDir, `${slug}-annotation-prompts.txt`);
  await fs.copyFile(surfacePath, orig);
  await fs.writeFile(prompts, queries.map((q) => `- ${q}`).join("\n") + "\n", "utf8");
}

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const ok = [];
  const fail = [];
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
