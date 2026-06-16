---
id: 97
title: subscription-products - plan-switching-and-relationships.md
status: backlog
priority: medium
created: 2026-06-09T18:08:35.389318+06:00
updated: 2026-06-16T18:53:18.38514+06:00
started: 2026-06-16T18:36:21.824+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/subscription-products/plan-switching-and-relationships.md`.
Future capture should create `markdowns/subscription-products/plan-switching-and-relationships.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-linked-products-configuration`
Placement: after `## Linked Products Configuration`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

2. `02-simple-products`
Placement: after `### Simple Products`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

3. `03-plan-switching-settings`
Placement: after `## Plan Switching Settings`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

4. `04-product-configuration`
Placement: after `### Product Configuration`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

5. `05-frontend-display`
Placement: after `### Frontend Display`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

Source checked:
- `arraysubs/src/Features/PlanSwitching/Services/Hooks.php`
- `arraysubs/src/Features/PlanSwitching/Services/ProrationCalculator.php`
- `arraysubs/src/Features/PlanSwitching/REST/SwitchController.php`
- `arraysubs/src/resources/pages/Settings/PlanSwitchingSettings.jsx`
- `arraysubs/src/Features/SubscriptionProducts/Services/Hooks.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `subscription`, `products`, `plan`, `switching`, `relationships`, `linked`, `configuration`, `simple`, `variable`, `switch`.
