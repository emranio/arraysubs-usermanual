# Info
- Module: Getting Started
- Availability: Free + Pro
- Last updated: 2026-09-14

# Getting Started

> Everything you need to know before launching your subscription store with ArraySubs.

**Availability:** Free + Pro

## Page Navigation

- **Current guide:** Getting Started
- **Where to open it:** WordPress Admin -> ArraySubs
- **Section overview:** [Open overview](../README.md)
- **Previous guide:** [import-export-settings](./import-export-settings.md)
- **Next guide:** [member-commerce-overview](../member-insight/member-commerce-overview.md)
- **Troubleshooting:** [Audits, Logs, and Troubleshooting](../audits-and-logs/README.md)

## Overview

This section walks you through the fundamentals: what ArraySubs is, what it requires, and how to get your first subscription product live and collecting payments. Whether you are setting up a simple monthly membership or a multi-tier product catalog, start here.

## Start on Home

Open **ArraySubs → Home** in the WordPress admin sidebar. Home is the ArraySubs landing page and brings together your setup checklist and daily subscription figures.

![ArraySubs Home with the setup checklist, shortcuts, and subscription metrics](../analytics/home.ASSETS/02-home-setup-and-metrics-original.png)

The checklist covers three essentials, which you can complete in any order:

1. **Set up your subscription engine** — select **Start setup** or **Review setup** to open [1-Minute Setup](easy-setup-wizard.md).
2. **Add a subscription product** — select **Create a product** or **Add another product** to open the quick product creation modal.
3. **Set up payments** — open WooCommerce payment settings and configure an automatic recurring-payment gateway. Manual-only stores can still show this task as **To do**.

Once all three tasks are complete, you can dismiss the checklist for the whole site. The **Easy Setup Wizard** and **+ Subscription Product** toolbar buttons remain available. Continue with [First-Time Setup](first-time-setup.md) to place a test order and verify the subscription and customer portal.

After setup, return to Home to check recurring revenue, review **Action Center**, and see upcoming renewals. The [Home guide](../analytics/home.md) explains the checklist, date ranges, metric cards, Pro insights, and links to individual subscriptions.

## In This Section

### [Home](../analytics/home.md)
Find the setup checklist and product shortcuts, then use the subscription dashboard for your daily health check. Available with the free plugin; Pro adds report cards.

### [Before You Launch](before-you-launch.md)
Requirements, installation, WooCommerce prerequisites, core concepts (products, billing cycles, trials, statuses), and a clear breakdown of Free versus Pro features.

### [Cron Job Setup](cron-job-setup.md)
**Required for production.** Configure a system cron so renewals, scheduled cancellations, and emails fire on time — not just when somebody visits the site. The single most important reliability change.

### [Create Products with the Quick Creation Wizard](../subscription-products/quick-product-creation.md)
Open **ArraySubs → Home → + Subscription Product** for guided product creation. Follow the dedicated screenshot guide for simple subscriptions, variable-product setup, boxes, bundles, store credit, and publishing.

### [First-Time Setup](first-time-setup.md)
A step-by-step checklist: configure your store, create your first subscription product, place a test order, and review the customer portal.

### [License Activation](license-activation.md)
Activate ArraySubs Pro with your license key, store the local activation details, remove a local license, and understand how Pro update downloads are gated *(Pro)*.

### [1-Minute Setup](easy-setup-wizard.md)
A nine-step guide to billing, checkout, plan switching, cancellation, refunds, emails, and optional tools. Launch it from Home or 1-Minute Setup, review the loaded settings, and confirm your changes. Completed setups reopen on the next-step cards; **Start Over** lets you review the saved configuration again.

### [Admin Bar Visibility](../admin-bar-visibility/README.md)
Hide the WordPress frontend toolbar for customers while administrators keep normal shortcuts.

### [Admin Dashboard Access](../admin-dashboard-access/README.md)
Redirect unauthorized users away from `/wp-admin` while preserving backend access for administrators and staff roles.

### [WordPress Login Page](../wordpress-login-page/README.md)
Route customer login and registration traffic through WooCommerce My Account.

### [Login as User](../login-as-user/README.md)
Impersonate non-admin customers for support and customer-portal troubleshooting.

### [Login Limit](../member-access/login-limit.md)
Limit concurrent sessions per account to reduce credential sharing *(Pro)*.

### [Coupons](../coupons/README.md)
Configure subscription-aware WooCommerce coupons with recurring discounts, cycle limits, and initial-checkout counting.

### [Subscription Notes](../subscription-notes/README.md)
Review the subscription timeline for system events, gateway events, admin notes, and customer-visible notes.

### [Member Insight](../member-insight/README.md)
Search customers and open a complete subscription, commerce, profile, and support dashboard *(Pro)*.

### [Redirect Product Page](../redirect-product-page/README.md)
Redirect direct subscription product URLs to sales pages or return 404 responses *(Pro)*.

### [Subscription Shipping](../subscription-shipping/README.md)
Control one-time versus recurring shipping charges on physical subscription products *(Pro)*.

### [Retention Analytics](../retention-analytics/README.md)
Analyze cancellation reasons, churn trends, offer acceptance, and retained revenue *(Pro)*.

### [Gateway Health](../gateway-health/README.md)
Monitor payment gateway connection status, webhook URLs, capabilities, and webhook events *(Pro)*.

### [Import / Export Settings](import-export-settings.md)
Download your full ArraySubs configuration as a JSON file or restore a previously exported configuration with granular section-level control.

### [Essential Daily Workflows](essential-daily-workflows.md)
How the subscription lifecycle works from checkout to renewal, where merchants manage everything, and what to verify before going live.
