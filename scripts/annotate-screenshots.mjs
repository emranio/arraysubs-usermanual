#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PLUGINS = path.resolve(ROOT, "..");
const MARKER = path.join(PLUGINS, "screenshot-marker");
const PYTHON = path.join(MARKER, ".venv/bin/python");
const ANNOTATE = path.join(MARKER, "annotate.py");

const screenshots = [
  {
    image: "markdowns/analytics/reports-hub.assets/01-reports-hub-original.png",
    queries: [
      "rectangle around the dashboard heading and report tabs labeled 'Reports Hub'",
      "rectangle around the filter controls labeled 'Report Filters'",
      "rectangle around the visible report table or chart area labeled 'Report Results'",
    ],
  },
  {
    image: "markdowns/audits-and-logs/access-rule-conflicts.assets/01-access-conflicts-original.png",
    queries: [
      "rectangle around the page title labeled 'Access Rule Conflicts'",
      "rectangle around the conflict list area labeled 'Conflict Results'",
      "rectangle around the filters or search controls labeled 'Find Conflicts'",
    ],
  },
  {
    image: "markdowns/audits-and-logs/activity-audits.assets/01-activity-audits-original.png",
    queries: [
      "rectangle around the page title labeled 'Activity Audits'",
      "rectangle around the audit log table labeled 'Audit Events'",
      "rectangle around the filters labeled 'Audit Filters'",
    ],
  },
  {
    image: "markdowns/audits-and-logs/renewal-failures.assets/01-renewal-failures-original.png",
    queries: [
      "rectangle around the page title labeled 'Renewal Failures'",
      "rectangle around the failure list or table labeled 'Failed Renewals'",
      "rectangle around action buttons or filters labeled 'Review Actions'",
    ],
  },
  {
    image: "markdowns/audits-and-logs/scheduled-job-logs.assets/01-scheduled-job-logs-original.png",
    queries: [
      "rectangle around the page title labeled 'Scheduled Job Logs'",
      "rectangle around the job log table labeled 'Scheduled Actions'",
      "rectangle around the filters labeled 'Job Filters'",
    ],
  },
  {
    image: "markdowns/billing-and-renewals/recovery-and-grace-flows.assets/01-skip-pause-settings-original.png",
    queries: [
      "rectangle around the skip and pause settings section labeled 'Skip and Pause'",
      "rectangle around the numeric setting fields labeled 'Limits'",
      "rectangle around the save button area labeled 'Save Changes'",
    ],
  },
  {
    image: "markdowns/gateway-health/README.assets/01-gateway-health-original.png",
    queries: [
      "rectangle around the dashboard header labeled 'Gateway Health'",
      "rectangle around the gateway health cards labeled 'Gateway Status'",
      "rectangle around the issue or log area labeled 'Operational Signals'",
    ],
  },
  {
    image: "markdowns/feature-manager/feature-manager-settings.assets/01-feature-manager-settings-original.png",
    queries: [
      "rectangle around the Feature Manager Settings heading labeled 'Feature Manager'",
      "rectangle around the enable toggle and display controls labeled 'Feature Controls'",
      "rectangle around the save button area labeled 'Save Features'",
    ],
  },
  {
    image: "markdowns/checkout-and-payments/checkout-builder/README.assets/01-checkout-builder-original.png",
    queries: [
      "rectangle around the Checkout Form Builder panel labeled 'Builder Entry'",
      "rectangle around the Open Builder button labeled 'Open Builder'",
      "rectangle around the setup cards labeled 'Builder Workflows'",
    ],
  },
  {
    image: "markdowns/checkout-and-payments/checkout-builder/field-types.assets/01-checkout-builder-settings-original.png",
    queries: [
      "rectangle around the Settings tab labeled 'Builder Settings'",
      "rectangle around the checkout settings fields labeled 'Checkout Controls'",
      "rectangle around the save button labeled 'Save Settings'",
    ],
  },
  {
    image: "markdowns/customer-portal/portal-pages.assets/01-my-account-subscriptions-original.png",
    queries: [
      "rectangle around the My Subscriptions heading labeled 'Subscriptions List'",
      "rectangle around the subscriptions table labeled 'Customer Subscriptions'",
      "rectangle around the View action button labeled 'Open Detail'",
    ],
  },
  {
    image: "markdowns/customer-portal/portal-pages.assets/02-view-subscription-original.png",
    queries: [
      "rectangle around the subscription overview table labeled 'Subscription Overview'",
      "rectangle around the status and next payment rows labeled 'Billing Status'",
      "rectangle around the payment method row labeled 'Payment Method'",
    ],
  },
  {
    image: "markdowns/customer-portal/self-service-actions.assets/01-subscription-actions-original.png",
    queries: [
      "rectangle around the Subscription Actions section labeled 'Self-Service Actions'",
      "rectangle around the Change Plan button labeled 'Change Plan'",
      "rectangle around the Cancel Subscription button labeled 'Cancel'",
    ],
  },
  {
    image: "markdowns/customer-portal/payment-and-shipping.assets/01-payment-shipping-original.png",
    queries: [
      "rectangle around the shipping address section labeled 'Shipping Address'",
      "rectangle around the payment method row or card labeled 'Payment Method'",
      "rectangle around any update links or address actions labeled 'Customer Updates'",
    ],
  },
  {
    image: "markdowns/feature-manager/customer-and-storefront-display.assets/01-my-account-features-original.png",
    queries: [
      "rectangle around the My Features heading labeled 'My Features'",
      "rectangle around the feature entitlement table labeled 'Entitlements'",
      "rectangle around the subscription link labeled 'Subscription Link'",
    ],
  },
  {
    image: "markdowns/member-insight/member-lookup-and-profiles.assets/01-manage-members-original.png",
    queries: [
      "rectangle around the customer search field labeled 'Find a Member'",
      "rectangle around the empty-state profile panel labeled 'Member Profile Area'",
      "rectangle around the search instructions labeled 'Search Guidance'",
    ],
  },
  {
    image: "markdowns/manage-subscriptions/subscription-operations.assets/01-admin-menu-subscriptions-original.png",
    queries: [
      "rectangle around the WordPress admin ArraySubs menu labeled 'ArraySubs Menu'",
      "rectangle around the Subscriptions entry labeled 'Subscriptions'",
      "rectangle around the main subscriptions page area labeled 'Admin Workspace'",
    ],
  },
  {
    image: "markdowns/manage-subscriptions/subscription-operations.assets/03-create-subscription-original.png",
    queries: [
      "rectangle around the Add Subscription heading labeled 'Create Subscription'",
      "rectangle around the customer and product fields labeled 'Required Details'",
      "rectangle around the create or save button area labeled 'Save Subscription'",
    ],
  },
  {
    image: "markdowns/member-access/access-rules.assets/01-role-mapping-original.png",
    queries: [
      "rectangle around the Role Mapping tab labeled 'Role Mapping'",
      "rectangle around the rule row labeled 'Access Rule'",
      "rectangle around the Save Changes button labeled 'Save Rules'",
    ],
  },
  {
    image: "markdowns/member-access/commerce-and-benefit-rules.assets/01-discount-rules-original.png",
    queries: [
      "rectangle around the Discounts tab labeled 'Discount Rules'",
      "rectangle around the discount rule row labeled 'Commerce Benefit'",
      "rectangle around the Save Changes button labeled 'Save Discounts'",
    ],
  },
  {
    image: "markdowns/profile-builder/my-account-editor.assets/01-my-account-editor-original.png",
    queries: [
      "rectangle around the My Account Editor heading labeled 'My Account Editor'",
      "rectangle around the endpoint list labeled 'Account Endpoints'",
      "rectangle around the save button area labeled 'Save Layout'",
    ],
  },
  {
    image: "markdowns/profile-builder/profile-form.assets/01-profile-form-settings-original.png",
    queries: [
      "rectangle around the profile form settings heading labeled 'Profile Form'",
      "rectangle around the form configuration fields labeled 'Form Controls'",
      "rectangle around the save button area labeled 'Save Profile Form'",
    ],
  },
  {
    image: "markdowns/retention-and-refunds/cancellation-setup.assets/01-retention-flow-original.png",
    queries: [
      "rectangle around the Retention Flow tab labeled 'Retention Flow'",
      "rectangle around the cancellation reason or offer settings labeled 'Cancel Experience'",
      "rectangle around the save button area labeled 'Save Retention Flow'",
    ],
  },
  {
    image: "markdowns/retention-and-refunds/refund-management.assets/01-refund-settings-original.png",
    queries: [
      "rectangle around the Refund Management tab labeled 'Refund Management'",
      "rectangle around the refund settings controls labeled 'Refund Rules'",
      "rectangle around the save button area labeled 'Save Refund Settings'",
    ],
  },
  {
    image: "markdowns/settings/toolkit-settings.assets/01-toolkit-settings-original.png",
    queries: [
      "rectangle around the Toolkit Settings heading labeled 'Toolkit Settings'",
      "rectangle around the enable or configuration controls labeled 'Toolkit Controls'",
      "rectangle around the save button area labeled 'Save Toolkit'",
    ],
  },
  {
    image: "markdowns/shortcodes/README.assets/01-shortcodes-original.png",
    queries: [
      "rectangle around the Shortcodes page heading labeled 'Shortcodes'",
      "rectangle around a shortcode card labeled 'Shortcode Reference'",
      "rectangle around the copy or action area labeled 'Use Shortcode'",
    ],
  },
  {
    image: "markdowns/store-credit/credit-history.assets/01-credit-history-original.png",
    queries: [
      "rectangle around the Credit History tab labeled 'Credit History'",
      "rectangle around the history table labeled 'Credit Ledger'",
      "rectangle around filters or search controls labeled 'Find Transactions'",
    ],
  },
  {
    image: "markdowns/store-credit/README.assets/01-my-account-store-credit-original.png",
    queries: [
      "rectangle around the Store credit is not available notice labeled 'Availability Notice'",
      "rectangle around the My account menu items labeled 'Account Menu'",
      "rectangle around the impersonation bar at the top labeled 'Admin Impersonation'",
    ],
  },
  {
    image: "markdowns/store-credit/store-credit-management.assets/01-store-credit-management-original.png",
    queries: [
      "rectangle around the customer search field labeled 'Find Customer'",
      "rectangle around the empty-state credit panel labeled 'Credit Workspace'",
      "rectangle around the instruction text labeled 'Search First'",
    ],
  },
  {
    image: "markdowns/store-credit/store-credit-settings.assets/01-store-credit-settings-original.png",
    queries: [
      "rectangle around the Store Credit Settings heading labeled 'Store Credit Settings'",
      "rectangle around the settings fields labeled 'Credit Controls'",
      "rectangle around the save button area labeled 'Save Store Credit'",
    ],
  },
  {
    image: "markdowns/subscription-products/plan-switching-and-relationships.assets/01-plan-switching-settings-original.png",
    queries: [
      "rectangle around the Plan Switching tab labeled 'Plan Switching'",
      "rectangle around the switching behavior fields labeled 'Switch Rules'",
      "rectangle around the save button area labeled 'Save Rules'",
    ],
  },
  {
    image: "markdowns/subscription-products/product-experience.assets/01-product-page-original.png",
    queries: [
      "rectangle around the product title and price labeled 'Subscription Product'",
      "rectangle around the subscription details section labeled 'Billing Terms'",
      "rectangle around the add to cart area labeled 'Subscribe'",
    ],
  },
];

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const onlyIndex = process.argv.indexOf("--only");
const only = onlyIndex === -1 ? "" : process.argv[onlyIndex + 1] || "";
let completed = 0;
let skipped = 0;
let failed = 0;

for (const item of screenshots) {
  if (only && !item.image.includes(only)) {
    skipped += 1;
    continue;
  }
  const imagePath = path.join(ROOT, item.image);
  if (!existsSync(imagePath)) {
    console.error(`Missing screenshot: ${item.image}`);
    failed += 1;
    continue;
  }

  const outputPath = imagePath.replace(/-original\.png$/, "-annotated.png");
  const promptPath = imagePath.replace(/-original\.png$/, "-annotation-prompts.txt");
  const resultPath = imagePath.replace(/-original\.png$/, "-annotation-result.json");

  if (!force && existsSync(outputPath) && existsSync(promptPath) && existsSync(resultPath)) {
    skipped += 1;
    continue;
  }

  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(promptPath, `${item.queries.join("\n")}\n`, "utf8");

  if (dryRun) {
    console.log(`would annotate ${item.image}`);
    skipped += 1;
    continue;
  }

  const args = [
    ANNOTATE,
    "--image",
    imagePath,
    "--output",
    outputPath,
    "--allow-unresolved",
    "--no-refine",
  ];
  for (const query of item.queries) {
    args.push("--query", query);
  }

  const result = spawnSync(PYTHON, args, {
    cwd: MARKER,
    encoding: "utf8",
    env: { ...process.env },
  });

  if (result.stdout) {
    writeFileSync(resultPath, result.stdout, "utf8");
  }

  if (result.status !== 0) {
    failed += 1;
    console.error(result.stderr || `annotation failed for ${item.image}`);
    continue;
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  console.log(`annotated ${item.image}`);
  completed += 1;
}

console.log(`annotation summary: completed=${completed} skipped=${skipped} failed=${failed}`);
if (failed > 0) {
  process.exit(1);
}
