---
id: 6
title: analytics - subscription-performance.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.419991+06:00
updated: 2026-06-16T18:53:18.367812+06:00
started: 2026-06-16T18:36:21.804258+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/analytics/subscription-performance.md`.
Future capture should create `markdowns/analytics/subscription-performance.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-card-reference`
Placement: after `### Card Reference`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

2. `02-card-navigation`
Placement: after `### Card Navigation`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

3. `03-subscription-charts`
Placement: after `## Subscription Charts`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

4. `04-top-subscription-products-active`
Placement: after `### Top Subscription Products Active`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

5. `05-top-subscription-products-revenue`
Placement: after `### Top Subscription Products Revenue`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

Source checked:
- `arraysubspro/src/resources/pages/AnalyticsOverview/performanceCards.js`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`
- `arraysubspro/src/resources/pages/AnalyticsOverview/chartConfigs.js`
- `arraysubspro/src/resources/analyticsRevenue.js`
- `arraysubs/src/resources/pages/RetentionAnalytics/components/SummaryCards.jsx`

Code scan terms: `analytics`, `subscription`, `performance`, `cards`, `card`, `mrr`, `calculated`, `revenue`, `risk`, `charts`.
