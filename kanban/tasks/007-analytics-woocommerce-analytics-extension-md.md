---
id: 7
title: analytics - woocommerce-analytics-extension.md
status: review
priority: medium
created: 2026-06-09T18:08:34.427931+06:00
updated: 2026-06-18T10:56:34.333881083+02:00
started: 2026-06-18T10:52:10.581536941+02:00
claimed_by: mist-dart
claimed_at: 2026-06-18T10:56:34.333880963+02:00
class: standard
---

1. `01-analytics-orders-type-filter-original.png`
Placement: after `## Orders Report` in `markdowns/analytics/woocommerce-analytics-extension.md`.
Surface to cover: WooCommerce Analytics Orders report with ArraySubsPro Type quick filter and injected Type column.
Context: Original unmarked screenshot shows Date range, Show, Type = All Types filters, Orders chart, and table rows with `Subs Renew` / `Subs Purchase` values in the Type column.
Markers:
- `arrow pointing to the Type quick filter dropdown, label 'Type quick filter'`
- `arrow pointing to the Type table column header, label 'Type column'`
- `arrow pointing to a Subs Renew row value, label 'Order classification'`
- `arrow pointing to the Download button, label 'Export report'`

2. `02-analytics-revenue-subscription-cards-original.png`
Placement: after `## Revenue Report` in `markdowns/analytics/woocommerce-analytics-extension.md`.
Surface to cover: WooCommerce Analytics Revenue report with subscription-specific revenue summary cards and table columns.
Context: Original unmarked screenshot shows standard revenue cards plus `Total Subs Renew Amount`, `Total Subs Upgrade Amount`, and `Total Credit Purchase Amount`, with matching table column headers below.
Markers:
- `arrow pointing to the Total Subs Renew Amount card, label 'Renewal revenue'`
- `arrow pointing to the Total Subs Upgrade Amount card, label 'Upgrade revenue'`
- `arrow pointing to the Total Credit Purchase Amount card, label 'Credit purchases'`
- `arrow pointing to the revenue table custom metric column, label 'Subscription metric column'`

3. `03-analytics-products-subscription-filter-original.png`
Placement: after `## Products Report` in `markdowns/analytics/woocommerce-analytics-extension.md`.
Surface to cover: WooCommerce Analytics Products report with Product Type filter and populated product table.
Context: Original unmarked screenshot shows `Product Type` filter beside Date range and Show controls, product metrics, chart, and product rows.
Markers:
- `arrow pointing to the Product Type dropdown, label 'Product type filter'`
- `arrow pointing to subscription products in the table, label 'Subscription product rows'`

4. `04-analytics-customers-member-links-original.png`
Placement: after `## Customers Report` in `markdowns/analytics/woocommerce-analytics-extension.md`.
Surface to cover: WooCommerce Analytics Customers report with member profile shortcuts injected under usernames.
Context: Original unmarked screenshot shows Customers report rows; browser snapshot confirmed `Member details` links under username cells for logged-in customers such as `sync-stripe` and `sync-full`.
Markers:
- `arrow pointing to the Username column cells that include Member details links, label 'Member details link'`
- `arrow pointing to customer spend/order columns, label 'Customer analytics context'`

Saved originals: `markdowns/analytics/woocommerce-analytics-extension.ASSETS/01-analytics-orders-type-filter-original.png`, `02-analytics-revenue-subscription-cards-original.png`, `03-analytics-products-subscription-filter-original.png`, `04-analytics-customers-member-links-original.png`
Verified: opened all saved PNGs after capture; Orders, Revenue, Products, and Customers surfaces are readable. For Customers, `Member details` link presence was also verified by agent-browser snapshot because the link text is small in the screenshot.
