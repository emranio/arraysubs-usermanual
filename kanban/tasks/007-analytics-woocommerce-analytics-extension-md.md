---
id: 7
title: analytics - woocommerce-analytics-extension.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.427931+06:00
updated: 2026-06-16T18:53:18.371435+06:00
started: 2026-06-16T18:36:21.804702+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/analytics/woocommerce-analytics-extension.md`.
Future capture should create `markdowns/analytics/woocommerce-analytics-extension.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-quick-type-filter`
Placement: after `### Quick Type Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

2. `02-advanced-type-filter`
Placement: after `### Advanced Type Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

3. `03-subscription-products-only-filter`
Placement: after `### Subscription Products Only Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

4. `04-subscription-variations-only-filter`
Placement: after `### Subscription Variations Only Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

5. `05-deep-diving-into-a-customer`
Placement: after `### Deep-Diving into a Customer`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

Source checked:
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubspro/src/Features/Analytics/Services/WooAnalyticsHooks.php`
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/resources/analyticsOrders.js`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`

Code scan terms: `analytics`, `woocommerce`, `extension`, `orders`, `report`, `type`, `column`, `filter`, `advanced`, `revenue`.
