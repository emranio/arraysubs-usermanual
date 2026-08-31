---
id: 3
title: analytics - README.md
status: done
priority: medium
created: 2026-06-09T18:08:34.394907+06:00
updated: 2026-08-31T16:52:53.232255+06:00
started: 2026-06-17T17:35:49.69654+06:00
completed: 2026-08-31T16:52:53.232254+06:00
class: standard
---

1. 01-reports-hub-overview
Placement: after ## Overview
Surface to cover: ArraySubs -> Reports hub.
Context: The Reports hub shows the analytics directory summary, quick navigation, and report category counts for the central free reporting surface.
Markers:
- arrow pointing to the Reports page heading, label Reports Hub
- arrow pointing to the report category count row, label Report coverage
- arrow pointing to the Quick Navigation section, label Analytics surfaces

2. 02-subscription-performance-overview
Placement: after the analytics ecosystem surfaces table.
Surface to cover: WooCommerce -> Analytics -> Overview with ArraySubs Pro performance cards.
Context: The full-page WooCommerce Analytics Overview frame shows subscription KPI cards, sales charts, subscription trend chart, product or customer leaderboards, cancellation reasons, and churn product tables.
Markers:
- arrow pointing to the Performance section heading, label Performance dashboard
- arrow pointing to the Active Subscriptions card, label Subscription KPI
- arrow pointing to the Monthly Recurring Revenue card, label MRR
- arrow pointing to the subscription trend chart, label Subscription trend
- arrow pointing to the lower leaderboard tables, label Subscription breakdowns

3. 03-retention-analytics-overview
Placement: after the Retention Analytics row in the surfaces table.
Surface to cover: WooCommerce -> Analytics -> Retention.
Context: The full-page Retention analytics frame shows date filters, product filter, cancellation KPIs, reason and offer charts, cancellation trends, and the activity log table.
Markers:
- arrow pointing to the Retention page heading, label Retention analytics
- arrow pointing to the date and product filters, label Report filters
- arrow pointing to the Churn Rate summary card, label Retention KPI
- arrow pointing to the Cancellation Reasons chart, label Reason breakdown
- arrow pointing to the Cancellation Trends chart, label Trend history
- arrow pointing to the Activity Log table, label Cancellation events

4. 01-order-list-overview
Placement: after ## Order Type Classification
Surface to cover: WooCommerce Orders with ArraySubs order types, the AJAX product selector, and the summary panel.
Capture scope: full page.
Context: The clean unfiltered Orders frame shows All Types, All Coupons, All Products, the order-type totals, Type and Coupon(s) columns, and classified order rows.
Markers: None (clean original requested).
Dedupe: Reuses order-list-enhancements.ASSETS/01-order-list-overview-original.png from the dedicated Order List Enhancements guide.

Refresh notes (2026-08-31):
- Updated the Analytics overview copy for AJAX product or variation search and the Subscription Products Only shortcut.
- Replaced the old annotated Orders image reference with the verified clean overview original from the dedicated guide.
- No new marker or annotated variant was created, per user request.
- The three non-Orders Analytics screenshots and their historical annotation notes remain unchanged.
