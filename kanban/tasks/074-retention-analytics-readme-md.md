---
id: 74
title: retention-analytics - README.md
status: todo
priority: medium
created: 2026-06-09T18:08:35.123038+06:00
updated: 2026-06-23T16:34:38.81782+06:00
started: 2026-06-22T18:21:06.491766+06:00
class: standard
---

1. `01-retention-filters-summary-cards`
Placement: after `## Summary Cards`
Surface to cover: WooCommerce Analytics -> Retention top report area.
context: Shows the Retention report route with Start Date, End Date, Products filter, and the eight KPI cards for cancellations, churn, age, payments, offers, success rate, and retained revenue.
Markers:
- `arrow pointing to the Analytics -> Retention sidebar item, label 'Retention report'`
- `arrow pointing to the Start Date and End Date inputs, label 'Date range'`
- `arrow pointing to the Products dropdown, label 'Product filter'`
- `arrow pointing to the KPI cards grid, label 'Retention KPIs'`

2. `02-retention-charts`
Placement: after `## Churn Reasons Chart`
Surface to cover: Retention chart area.
context: Shows the Cancellation Reasons pie chart, Offer Outcomes panel, and the beginning of the Cancellation Trends line chart on the populated report.
Markers:
- `arrow pointing to the Cancellation Reasons chart, label 'Cancellation reasons'`
- `arrow pointing to the Offer Outcomes panel, label 'Offer outcomes'`
- `arrow pointing to the Cancellation Trends heading, label 'Trend chart'`

3. `03-retention-activity-log`
Placement: after `## Activity Logs`
Surface to cover: Retention Activity Log table.
context: Shows the Activity Log event-type filter, table columns, color-coded event badges, cancellation rows, offer shown rows, products, reasons, amount, and subscription age.
Markers:
- `arrow pointing to the All Events dropdown, label 'Event filter'`
- `arrow pointing to the EVENT column badges, label 'Event badges'`
- `arrow pointing to the REASON column, label 'Cancellation reason'`
- `arrow pointing to the SUB. AGE column, label 'Subscription age'`

4. `04-retention-product-filter-search`
Placement: after `### Product Filter`
Surface to cover: Product filter dropdown in the Retention report.
context: Shows the searchable Products dropdown opened with the term `Plan`, returning subscription product and variation options.
Markers:
- `arrow pointing to the Products combobox, label 'Products filter'`
- `arrow pointing to the Search products input, label 'Search products'`
- `arrow pointing to the result list, label 'Product options'`

5. `05-retention-activity-pagination`
Placement: after `### Pagination`
Surface to cover: Activity Log footer and pagination controls.
context: Shows lower Activity Log rows, the page count and total event count, plus Previous and Next navigation.
Markers:
- `arrow pointing to the Page 1 of 16 (240 total) footer, label 'Page count'`
- `arrow pointing to the Previous and Next buttons, label 'Pagination controls'`

Verification:
- Source markdown reviewed against `RetentionAnalyticsPage.jsx`, `RetentionFilters.jsx`, and the live WooCommerce Analytics Retention route; no source markdown changes were needed.
