---
id: 4
title: analytics - order-list-enhancements.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.403705+06:00
updated: 2026-06-16T18:53:18.371187+06:00
started: 2026-06-16T18:36:21.803781+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/analytics/order-list-enhancements.md`.
Future capture should create `markdowns/analytics/order-list-enhancements.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-filter-dropdowns`
Placement: after `## Filter Dropdowns`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

2. `02-type-filter`
Placement: after `### Type Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

3. `03-coupon-filter`
Placement: after `### Coupon Filter`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

4. `04-subscription-products-only`
Placement: after `### Subscription Products Only`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

5. `05-auditing-coupon-usage`
Placement: after `### Auditing Coupon Usage`
Surface: WooCommerce Orders list or WooCommerce Analytics Orders report with ArraySubs extensions.
Capture: full page or table region.
Markers:
- `red box with an arrow pointing to the 'Order Type' column or filter, label 'Subscription type'`
- `red box with an arrow pointing to the 'Coupons' column or coupon filter, label 'Coupon context'`
- `red box with an arrow pointing to the embedded report panel, label 'Report panel'`

Source checked:
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`
- `arraysubs/src/resources/pages/Reports.jsx`
- `arraysubspro/src/Features/Analytics/Services/WooAnalyticsHooks.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/resources/pages/CheckoutBuilder/FieldSettingsPanel.jsx`
- `arraysubs/src/Features/CouponTracking/Services/Hooks.php`

Code scan terms: `analytics`, `order`, `list`, `enhancements`, `columns`, `type`, `column`, `coupons`, `filter`, `dropdowns`.
