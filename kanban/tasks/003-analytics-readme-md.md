---
id: 3
title: analytics - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.394907+06:00
updated: 2026-06-16T18:53:18.370704+06:00
started: 2026-06-16T18:36:21.803536+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/analytics/README.md`.
Future capture should create `markdowns/analytics/README.assets/` and start numbering at `01`.

Total planned screenshots: 2.

1. `01-order-type-classification`
Placement: after `## Order Type Classification`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

2. `02-what-s-in-this-section`
Placement: after `## What's in This Section`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

Source checked:
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`
- `arraysubspro/src/Features/Analytics/Services/WooAnalyticsHooks.php`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`
- `arraysubspro/src/resources/analyticsOrders.js`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubspro/src/Features/FixedPeriodMembership/Services/Hooks.php`

Code scan terms: `analytics`, `order`, `type`, `classification`, `need`, `anything`, `start`, `seeing`, `data`, `reports`.
