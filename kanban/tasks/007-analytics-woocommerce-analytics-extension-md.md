---
id: 7
title: analytics - woocommerce-analytics-extension.md
status: done
priority: medium
created: 2026-06-09T18:08:34.427931+06:00
updated: 2026-06-21T17:39:51.285777+06:00
started: 2026-06-18T10:52:10.581536941+02:00
completed: 2026-06-21T17:39:51.285777+06:00
claimed_by: ureteric-rigidist
claimed_at: 2026-06-21T17:39:51.285777+06:00
class: standard
---

1. `01-orders-type-filter-and-column`
Placement: after `## Orders Report`
Surface to cover: WooCommerce -> Analytics -> Orders with ArraySubs Pro quick Type filter and Type column.
context: The Orders analytics report shows the added Type dropdown opened with order type options and the Orders table below showing the injected Type column with Subs Renew and Subs Purchase values.
Markers:
- `arrow pointing to the Type filter dropdown, label 'Quick type filter'`
- `arrow pointing to the open type options, label 'Order classifications'`
- `arrow pointing to the Type column header, label 'Injected column'`
- `arrow pointing to a Subs Renew cell, label 'Computed order type'`

2. `02-orders-advanced-type-filter`
Placement: after `### Advanced Type Filter`
Surface to cover: WooCommerce -> Analytics -> Orders advanced filters panel.
context: The advanced filters panel shows the injected Type rule with Is/Is Not matching and an order type selector set to Subs Renew, while the Orders table remains visible below.
Markers:
- `arrow pointing to the Advanced filters control, label 'Advanced filters'`
- `arrow pointing to the Type rule row, label 'Type rule'`
- `arrow pointing to the Is/Is Not selector, label 'Include or exclude'`
- `arrow pointing to the Subs Renew selector, label 'Selected type'`

3. `03-revenue-subscription-cards`
Placement: after `## Revenue Report`
Surface to cover: WooCommerce -> Analytics -> Revenue with ArraySubs Pro revenue cards.
context: The Revenue report shows the standard revenue cards plus Total Subs Renew Amount, Total Subs Upgrade Amount, and Total Credit Purchase Amount, with the revenue chart and table below.
Markers:
- `arrow pointing to Total Subs Renew Amount, label 'Renewal revenue'`
- `arrow pointing to Total Subs Upgrade Amount, label 'Upgrade revenue'`
- `arrow pointing to Total Credit Purchase Amount, label 'Credit purchase revenue'`
- `arrow pointing to the Revenue table, label 'Interval breakdown'`

4. `04-products-subscription-filter`
Placement: after `## Products Report`
Surface to cover: WooCommerce -> Analytics -> Products with Product Type filter.
context: The Products report shows the Product Type dropdown opened with Subscription Products Only and a populated product performance table below.
Markers:
- `arrow pointing to Product Type, label 'Product type filter'`
- `arrow pointing to Subscription Products Only, label 'Subscription-only option'`
- `arrow pointing to the product rows, label 'Filtered report table'`

5. `05-variations-subscription-filter`
Placement: after `## Variations Report`
Surface to cover: WooCommerce -> Analytics -> Variations with Product Type filter.
context: The Variations report is set to Last month so the table has real rows; the Product Type dropdown is opened with Subscription Variations Only visible above the populated variations table.
Markers:
- `arrow pointing to Last month date range, label 'Non-empty date range'`
- `arrow pointing to Product Type, label 'Variation type filter'`
- `arrow pointing to Subscription Variations Only, label 'Subscription variation option'`
- `arrow pointing to Coffee Plan - Weekly, label 'Variation row'`

6. `06-customers-member-details-link`
Placement: after `## Customers Report`
Surface to cover: WooCommerce -> Analytics -> Customers with ArraySubs Pro member shortcut.
context: The Customers report shows a hovered customer row where the Member details link appears beneath the username, linking from WooCommerce Analytics to the ArraySubs member profile.
Markers:
- `arrow pointing to the hovered customer row, label 'Customer row'`
- `arrow pointing to Member details, label 'Member profile shortcut'`
- `arrow pointing to the customer analytics table, label 'Native Customers report'`
