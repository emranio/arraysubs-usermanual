---
id: 19
title: billing-and-renewals - trial-management.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.538679+06:00
updated: 2026-06-16T18:53:18.365323+06:00
started: 2026-06-16T18:36:21.807549+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/billing-and-renewals/trial-management.md`.
Future capture should create `markdowns/billing-and-renewals/trial-management.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-trial-start`
Placement: after `### Trial start`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

2. `02-trial-settings`
Placement: after `## Trial settings`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

3. `03-product-level-settings`
Placement: after `### Product-level settings`
Surface: WooCommerce product editor subscription fields, frontend product experience, and subscription relationship/lifecycle views.
Capture: product data panel or frontend page.
Markers:
- `red box with an arrow pointing to the subscription tab or enable control in Product data, label 'Subscription setup'`
- `red box with an arrow pointing to the billing interval or linked product fields, label 'Plan rules'`
- `red box with an arrow pointing to the frontend product price or subscription detail card, label 'Customer result'`

4. `04-global-settings`
Placement: after `### Global settings`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

5. `05-trial-emails`
Placement: after `## Trial emails`
Surface: WooCommerce email settings or ArraySubs email reminder settings.
Capture: settings/template region.
Markers:
- `red box with an arrow pointing to the email row or template title, label 'Email template'`
- `red box with an arrow pointing to the enable toggle or recipient field, label 'Delivery rule'`
- `red box with an arrow pointing to the subject or placeholder field, label 'Message content'`

Source checked:
- `arraysubs/src/Features/PlanSwitching/Services/AutoDowngradeHandler.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/PayPal/PayPalGateway.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`
- `arraysubspro/src/Features/Analytics/REST/OverviewController.php`
- `arraysubspro/src/Features/AutomaticPayments/Abstracts/AbstractArraySubsGateway.php`

Code scan terms: `billing`, `renewals`, `trial`, `management`, `start`, `conversion`, `auto`, `downgrade`, `pro`, `product`.
