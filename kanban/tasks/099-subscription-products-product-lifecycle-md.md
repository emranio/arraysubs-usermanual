---
id: 99
title: subscription-products - product-lifecycle.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.409499+06:00
updated: 2026-06-16T18:53:18.379126+06:00
started: 2026-06-16T18:36:21.824609+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-products/product-lifecycle.md`.
Future capture should create `markdowns/subscription-products/product-lifecycle.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-product-deletion-and-trashing`
Placement: after `## Product Deletion and Trashing`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

2. `02-cached-product-data`
Placement: after `### Cached Product Data`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

3. `03-admin-warnings`
Placement: after `## Admin Warnings`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

4. `04-product-edit-screen-warning`
Placement: after `### Product Edit Screen Warning`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

5. `05-post-deletion-admin-notice`
Placement: after `### Post-Deletion Admin Notice`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

Source checked:
- `arraysubs/src/Features/ProductLifecycle/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`

Code scan terms: `subscription`, `products`, `product`, `lifecycle`, `deletion`, `trashing`, `happens`, `active`, `subscriptions`, `cached`.
