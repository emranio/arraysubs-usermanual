---
id: 31
title: coupons - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.652428+06:00
updated: 2026-06-16T18:53:18.367043+06:00
started: 2026-06-16T18:36:21.810299+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/coupons/README.md`.
Future capture should create `markdowns/coupons/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-step-2-enable-subscription-settings`
Placement: after `### Step 2: Enable Subscription Settings`
Surface: WooCommerce coupon editor subscription settings and checkout discount result.
Capture: coupon settings panel or checkout summary.
Markers:
- `red box with an arrow pointing to the subscription coupon settings panel, label 'Subscription coupon'`
- `red box with an arrow pointing to the discount duration control, label 'Duration'`
- `red box with an arrow pointing to the coupon discount row in checkout or subscription detail, label 'Applied discount'`

2. `02-admin-subscription-detail`
Placement: after `### Admin Subscription Detail`
Surface: WooCommerce coupon editor subscription settings and checkout discount result.
Capture: coupon settings panel or checkout summary.
Markers:
- `red box with an arrow pointing to the subscription coupon settings panel, label 'Subscription coupon'`
- `red box with an arrow pointing to the discount duration control, label 'Duration'`
- `red box with an arrow pointing to the coupon discount row in checkout or subscription detail, label 'Applied discount'`

3. `03-customer-portal`
Placement: after `### Customer Portal`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/Features/CouponTracking/Services/Hooks.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/MainAdmin/REST/SettingsController.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `coupons`, `setting`, `subscription`, `coupon`, `create`, `edit`, `enable`, `save`, `discount`, `duration`.
