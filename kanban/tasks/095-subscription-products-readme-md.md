---
id: 95
title: subscription-products - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.369029+06:00
updated: 2026-06-16T18:53:18.386492+06:00
started: 2026-06-16T18:36:21.823485+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-products/README.md`.
Future capture should create `markdowns/subscription-products/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-overview`
Placement: after `## Overview`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

2. `02-in-this-section`
Placement: after `## In This Section`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

3. `03-page-navigation`
Placement: after `## Page Navigation`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

Source checked:
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubspro/src/Features/SubscriptionShipping/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/Features/Subscriptions/Services/SubscriptionCPT.php`
- `arraysubs/src/resources/pages/SubscriptionsList.jsx`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`

Code scan terms: `subscription`, `products`, `subscriptions`.
