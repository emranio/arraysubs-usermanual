# Info
- Module: User Manual Hub
- Availability: Shared
- Last updated: 2026-04-02

# ArraySubs User Manual

Welcome to the ArraySubs user manual — the complete guide to running a subscription store with WooCommerce.

## Getting Started

New to ArraySubs? Start here.

- [Before You Launch](getting-started/before-you-launch.md) — Requirements, core concepts, subscription statuses, and the Free vs Pro feature map.
- [First-Time Setup](getting-started/first-time-setup.md) — Install the plugins, create your first subscription product, place a test order, and verify the customer portal.
- [Essential Daily Workflows](getting-started/essential-daily-workflows.md) — How the subscription lifecycle works, where merchants manage everything, and what to check before going live.

## Settings

Configure store-wide subscription behavior and administration tools.

- [General Settings](settings/general-settings.md) — Subscription cart rules, checkout and trial behavior, renewal synchronization, grace periods, email reminder timing, customer portal, customer actions, cancellation timing, and automatic-payment controls.
- [Toolkit Settings](settings/toolkit-settings.md) — Admin bar visibility, wp-admin access restriction, login page hiding, admin impersonation, and multi-login prevention.

## Manage Subscription Products

Create, configure, and manage subscription products in WooCommerce.

- [Overview](subscription-products/README.md) — Section overview and quick reference.
- [Create and Configure Subscription Products](subscription-products/create-and-configure.md) — Simple and variable products, billing periods, trials, signup fees, and different renewal pricing.
- [Plan Switching and Product Relationships](subscription-products/plan-switching-and-relationships.md) — Upgrade, downgrade, and crossgrade paths, auto-downgrade, and Fixed Period Membership *(Pro)*.
- [Product Experience and Display](subscription-products/product-experience.md) — Frontend pricing display, Redirect Product Page *(Pro)*, Feature Manager *(Pro)*, and Subscription Shipping *(Pro)*.
- [Coupon Integration](subscription-products/coupon-integration.md) — Subscription coupons with recurring discounts, cycle limits, and initial-checkout counting.
- [Product Lifecycle and Test Links](subscription-products/product-lifecycle.md) — Product deletion, cached data, and quick checkout test links.

## Manage Subscriptions

View, create, edit, and manage every subscription in your store.

- [Overview](manage-subscriptions/README.md) — Section overview and quick reference.
- [Subscription Operations](manage-subscriptions/subscription-operations.md) — All Subscriptions list, creating and editing subscriptions, the detail screen, and CSV export.
- [Admin Tools and Records](manage-subscriptions/admin-tools-and-records.md) — Subscription notes, feature log *(Pro)*, related orders and refund history, and data export.
- [Subscription Detail Cards](manage-subscriptions/subscription-detail-cards.md) — Cancellation, sync, skip & pause, coupon, gateway *(Pro)*, checkout fields *(Pro)*, and shipping *(Pro)* cards.
- [Lifecycle Management](manage-subscriptions/lifecycle-management.md) — Status transitions, renewal flow, grace periods, cancellation, expiration, trials, and email triggers.

## Customer Portal

Your subscribers' self-service hub in the WooCommerce My Account area.

- [Overview](customer-portal/README.md) — Section overview, quick reference tables, and portal page summary.
- [Customer Portal Pages](customer-portal/portal-pages.md) — My Subscriptions list, View Subscription detail, My Features page *(Pro)*, and Store Credit page *(Pro)*.
- [Subscription Self-Service Actions](customer-portal/self-service-actions.md) — Cancel, undo cancel, retention offers, change plan, skip, pause, resume, and reactivate.
- [Payment and Shipping Actions](customer-portal/payment-and-shipping.md) — Payment methods, card on file *(Pro)*, auto-renew toggle *(Pro)*, and shipping address updates.

## Manage Members *(Pro)*

Look up any customer and view their complete subscription and commerce profile from one dashboard.

- [Overview](manage-members/README.md) — All entry points, page layout summary, and prerequisites.
- [Member Lookup and Profiles](manage-members/member-lookup-and-profiles.md) — Search for members, read the profile card, view stats, and use Login as Customer.
- [Member Commerce Overview](manage-members/member-commerce-overview.md) — Subscription history, purchased products, store credit balance, and addresses.
- [Member Operations](manage-members/member-operations.md) — Quick links to related screens, admin shortcuts across WordPress and WooCommerce, and insight metrics.

## Store Credit *(Pro)*

A complete virtual-wallet system — customers earn credit from refunds, downgrades, promotions, and purchases, then spend it on renewals and new orders.

- [Overview](store-credit/README.md) — How Store Credit works, credit sources, customer experience, and system architecture.
- [Store Credit Management](store-credit/store-credit-management.md) — Search customers, view balances, add or deduct credit, and review transaction histories.
- [Credit History](store-credit/credit-history.md) — Global transaction log with source and type filtering.
- [Store Credit Settings](store-credit/store-credit-settings.md) — Enable/disable, auto-apply rules, expiration periods, and credit purchase limits.
- [Purchase Product](store-credit/purchase-product.md) — Create a WooCommerce product for selling credit with fixed or custom amounts and bonus incentives.
- [Emails](store-credit/emails.md) — Credit Added, Credit Used, Credit Expiring, and Credit Expired notifications.
- [Refund to Credit](store-credit/refund-to-credit.md) — Process refunds as store credit from the WooCommerce order screen.

## Advanced Analytics *(Pro)*

Track subscription revenue, growth, churn, and customer behavior — from a dedicated performance dashboard to subscription-aware WooCommerce reports.

- [Overview](analytics/README.md) — Order type classification, section map, and prerequisites.
- [Subscription Performance Dashboard](analytics/subscription-performance.md) — 10 KPI cards, 6 time-series charts, and 5 leaderboards on the WooCommerce Analytics Overview page.
- [WooCommerce Analytics Extension](analytics/woocommerce-analytics-extension.md) — Type column, type filters, subscription revenue cards, subscription-only filters, and member links across 5 WC Analytics reports.
- [Order List Enhancements](analytics/order-list-enhancements.md) — Type and coupon columns, filter dropdowns, embedded report panel, and order type backfill on the WooCommerce Orders page.

## Emails and Notifications

Automated emails for every subscription lifecycle event — configure, customize, and troubleshoot the full notification system.

- [Email Overview](emails/README.md) — How ArraySubs emails work, WooCommerce integration, placeholder reference, template overrides, and reminder scheduling.
- [Customer Emails](emails/customer-emails.md) — 13 customer-facing emails: new subscription, trials, renewals, payments, status changes, auto-downgrade, and retention.
- [Admin Emails](emails/admin-emails.md) — 3 admin notifications: new subscription, payment failed, and subscription cancelled.
- [Store Credit Emails](emails/store-credit-emails.md) *(Pro)* — 4 credit balance emails: added, used, expiring, and expired.

## Audits, Logs, and Troubleshooting

Track every subscription action, monitor scheduled jobs and gateway health, and diagnose common problems.

- [Overview](audits-and-logs/README.md) — Section overview and navigation.
- [Activity Audits](audits-and-logs/activity-audits.md) *(Pro)* — Searchable, filterable log of every action across the subscription lifecycle.
- [Scheduled-Job Logs](audits-and-logs/scheduled-job-logs.md) *(Pro)* — Execution history for all Action Scheduler jobs with success/failure status.
- [Gateway Health Dashboard](audits-and-logs/gateway-health-dashboard.md) *(Pro)* — Gateway status cards, subscription counts, capabilities, and webhook event log.
- [Renewal Failures and Billing Issues](audits-and-logs/renewal-failures.md) — Diagnose missing invoices, failed payments, grace period behavior, and automatic cancellation.
- [Portal Action Failures](audits-and-logs/portal-action-failures.md) — Troubleshoot cancellation, pause, skip, plan switch, and reactivation errors.
- [Access-Rule Conflicts](audits-and-logs/access-rule-conflicts.md) — Resolve overlapping membership rules and content restriction problems.
- [Payment Method and Shipping Update Issues](audits-and-logs/payment-and-shipping-issues.md) — Fix auto-renew toggle, card update, gateway detach, and shipping address errors.
