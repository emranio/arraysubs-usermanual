---
id: 54
title: manage-subscriptions - admin-tools-and-records.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.89742+06:00
updated: 2026-06-16T18:53:18.385854+06:00
started: 2026-06-16T18:36:21.814105+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/manage-subscriptions/admin-tools-and-records.md`.
Future capture should create `markdowns/manage-subscriptions/admin-tools-and-records.assets/` and start numbering at `01`.

Total planned screenshots: 5.

1. `01-subscription-notes`
Placement: after `## Subscription Notes`
Surface: ArraySubs subscription detail Notes card.
Capture: notes card region.
Markers:
- `red box with an arrow pointing to the 'Subscription Notes' card, label 'Notes'`
- `red box with an arrow pointing to the manual note entry field, label 'Add note'`
- `red box with an arrow pointing to the automatic note row or author badge, label 'Audit note'`

2. `02-feature-log-entitlement-review-pro`
Placement: after `## Feature Log / Entitlement Review Pro`
Surface: Product Feature Manager tab, product page feature display, or customer My Features page.
Capture: full page or feature-card region.
Markers:
- `red box with an arrow pointing to the 'Feature Manager' settings or product tab, label 'Feature setup'`
- `red box with an arrow pointing to the feature rows or add feature button, label 'Defined features'`
- `red box with an arrow pointing to the storefront or My Account feature display, label 'Customer display'`

3. `03-related-orders-invoices-and-refund-history`
Placement: after `## Related Orders, Invoices, and Refund History`
Surface: Refund settings, WooCommerce order refund action, and subscription refund history.
Capture: settings or order refund region.
Markers:
- `red box with an arrow pointing to the refund settings section, label 'Refund rules'`
- `red box with an arrow pointing to the refundable order row or refund action, label 'Refund source'`
- `red box with an arrow pointing to the refund or store credit history row, label 'Refund record'`

4. `04-order-table-columns`
Placement: after `### Order Table Columns`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

5. `05-how-far-back-does-the-order-history-go`
Placement: after `### How far back does the Order History go?`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

Source checked:
- `arraysubspro/src/Features/Analytics/Services/OrderListHooks.php`
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`
- `arraysubs/src/Features/PlanSwitching/REST/SwitchController.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Stripe/StripeDelegate.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`

Code scan terms: `manage`, `subscriptions`, `admin`, `tools`, `records`, `subscription`, `feature`, `log`, `entitlement`, `review`.
