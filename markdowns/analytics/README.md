# Info
- Module: Advanced Analytics
- Availability: Pro
- Last updated: 2026-04-02

# Advanced Analytics *(Pro)*

> Track subscription revenue, growth, churn, and customer behavior from a single analytics hub — then drill into every WooCommerce report with subscription-aware filters and metrics.

## Overview

Advanced Analytics is a Pro module that adds a full subscription performance dashboard and extends five native WooCommerce Analytics reports with subscription-specific data.

It answers the questions every subscription merchant asks daily:

- How much recurring revenue am I earning?
- Are subscriptions growing or shrinking?
- Which products drive the most renewals?
- How many trials convert to paid?
- Where is revenue at risk?

The module has three major surfaces:

| Surface | Where it appears | What it shows |
|---------|-----------------|---------------|
| [Subscription Performance Dashboard](subscription-performance.md) | WooCommerce → Analytics → Overview | 10 KPI cards, 6 time-series charts, 5 leaderboards |
| [WooCommerce Analytics Extension](woocommerce-analytics-extension.md) | WooCommerce → Analytics → Orders / Revenue / Products / Variations / Customers | Type column, type filters, subscription revenue cards, subscription-only filters, member links |
| [Order List Enhancements](order-list-enhancements.md) | WooCommerce → Orders | Type and coupon columns, filter dropdowns, embedded report panel, order type backfill |

All three surfaces share a unified **order type classification system** that automatically labels every WooCommerce order as one of six subscription-related types.

## Order Type Classification

Every order that passes through the store is automatically classified into one of six types. This classification powers the filters, columns, and metrics across all analytics surfaces.

| Type | Label | When assigned |
|------|-------|---------------|
| `Credit Purchase` | Credit Purchase | Order contains at least one Store Credit product |
| `Subs Trial` | Subs Trial | Initial subscription order where the subscription has a trial period |
| `Subs Renew` | Subs Renew | Renewal order created by the billing engine |
| `Subs Upgrade` | Subs Upgrade | Plan switch order (upgrade, downgrade, or crossgrade) |
| `Subs Purchase` | Subs Purchase | Initial subscription purchase with no trial |
| `Other` | Other | Regular WooCommerce order with no subscription involvement |

Types are resolved in **priority order** — if an order qualifies as both a credit purchase and a subscription order, `Credit Purchase` wins.

The classification is stored as order meta (`_arraysubs_computed_type`) and recomputed whenever an order is created, updated, or paid. A second flag (`_arraysubs_has_subscription_product`) marks whether the order contains any subscription product, regardless of type.

```box class="info-box"
The **Subs Trial** classification is permanent. Even after a trial converts to an active paid subscription, the original order keeps its Subs Trial label because it uses the immutable `_trial_end_date` meta rather than the subscription's current status.
```

## Prerequisites

- **ArraySubs Pro** plugin activated
- **WooCommerce** 8.0+ with WooCommerce Admin (included by default)
- At least one subscription product and a few orders to populate metrics

## What's in This Section

- [Subscription Performance Dashboard](subscription-performance.md) — The overview page with KPI cards, charts, and leaderboards.
- [WooCommerce Analytics Extension](woocommerce-analytics-extension.md) — How the Orders, Revenue, Products, Variations, and Customers reports gain subscription data.
- [Order List Enhancements](order-list-enhancements.md) — Columns, filters, and the summary panel on the WooCommerce Orders page.

---

## Related Guides

- [Lifecycle Management](../manage-subscriptions/lifecycle-management.md) — Status transitions that drive churn and renewal metrics.
- [Admin Tools and Records](../manage-subscriptions/admin-tools-and-records.md) — Subscription export and related orders.
- [Store Credit Management](../store-credit/store-credit-management.md) — Credit purchase orders that appear in analytics.
- [Member Lookup and Profiles](../manage-members/member-lookup-and-profiles.md) — The member detail page linked from the Customers report.
- [General Settings](../settings/general-settings.md) — Grace periods and renewal timing that affect billing metrics.

---

## FAQ

### Do I need to do anything to start seeing analytics data?
No. The module begins classifying orders as soon as the Pro plugin is activated. For orders that existed before activation, use the **Compute Order Types** backfill tool on the WooCommerce Orders page — see [Order List Enhancements](order-list-enhancements.md).

### Does this replace WooCommerce Analytics?
No. It extends the existing WooCommerce Analytics screens. All native WooCommerce report features remain available alongside the subscription additions.

### How often is data refreshed?
Performance cards and chart data are cached for **1 hour**. The cache is automatically invalidated whenever a subscription changes status or an order status changes. WooCommerce Analytics report data (Orders, Revenue, etc.) uses WooCommerce's own data store and updates in near real-time.

### What happens if I deactivate the Pro plugin?
The subscription-specific columns, filters, cards, charts, and leaderboards disappear from the analytics screens. The underlying order meta (`_arraysubs_computed_type`) remains on your orders and will be used again if the Pro plugin is reactivated.
