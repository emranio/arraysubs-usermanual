---
id: 74
title: retention-analytics - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.123038+06:00
updated: 2026-06-16T18:53:18.388463+06:00
started: 2026-06-16T18:36:21.819041+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/retention-analytics/README.md`.
Future capture should create `markdowns/retention-analytics/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-churn-reasons-chart`
Placement: after `## Churn Reasons Chart`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

2. `02-retention-offer-chart`
Placement: after `## Retention Offer Chart`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

3. `03-product-filter`
Placement: after `### Product Filter`
Surface: ArraySubs Reports page, WooCommerce Analytics extension, or Retention Analytics dashboard.
Capture: full page or dashboard region.
Markers:
- `red box with an arrow pointing to the report title or selected analytics tab, label 'Report area'`
- `red box with an arrow pointing to the summary metric cards, label 'Key metrics'`
- `red box with an arrow pointing to the chart or leaderboard table, label 'Trend data'`

Source checked:
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubs/src/Features/RetentionAnalytics/REST/AnalyticsController.php`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`
- `arraysubs/src/resources/pages/RetentionAnalytics/components/SummaryCards.jsx`
- `arraysubs/src/resources/pages/RetentionAnalytics/components/ChurnReasonsChart.jsx`
- `arraysubs/src/resources/pages/RetentionAnalytics/RetentionAnalyticsPage.jsx`

Code scan terms: `retention`, `analytics`, `data`, `backfill`, `cards`, `churn`, `rate`, `calculated`, `retained`, `revenue`.
