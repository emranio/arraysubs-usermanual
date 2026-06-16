---
id: 56
title: manage-subscriptions - subscription-detail-cards.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.916097+06:00
updated: 2026-06-16T18:53:18.376512+06:00
started: 2026-06-16T18:36:21.814544+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/manage-subscriptions/subscription-detail-cards.md`.
Future capture should create `markdowns/manage-subscriptions/subscription-detail-cards.assets/` and start numbering at `01`.

Total planned screenshots: 6.

1. `01-cancellation-details-card`
Placement: after `## Cancellation Details Card`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

2. `02-retention-offer-history`
Placement: after `### Retention Offer History`
Surface: Cancellation settings, Retention Flow builder, and customer cancellation modal.
Capture: settings/builder/modal region.
Markers:
- `red box with an arrow pointing to the cancellation setting or timing option, label 'Cancel timing'`
- `red box with an arrow pointing to the retention offer configuration, label 'Retention offer'`
- `red box with an arrow pointing to the customer cancellation modal, label 'Customer decision'`

3. `03-admin-actions`
Placement: after `### Admin Actions`
Surface: ArraySubs subscription list/detail, billing settings, and renewal automation surfaces.
Capture: full page or settings/detail region.
Markers:
- `red box with an arrow pointing to the subscription status badge or selected row, label 'Subscription state'`
- `red box with an arrow pointing to the billing schedule or next payment field, label 'Renewal schedule'`
- `red box with an arrow pointing to the grace, trial, or renewal setting, label 'Billing rule'`

4. `04-payment-gateway-card-pro`
Placement: after `## Payment Gateway Card Pro`
Surface: Gateway health, gateway logs, or gateway payment settings screen.
Capture: full page or table/card region.
Markers:
- `red box with an arrow pointing to the gateway status card or gateway name, label 'Gateway status'`
- `red box with an arrow pointing to the webhook event log table, label 'Webhook event'`
- `red box with an arrow pointing to the status or error column, label 'Gateway result'`

5. `05-checkout-builder-custom-fields-card-pro`
Placement: after `## Checkout Builder Custom Fields Card Pro`
Surface: ArraySubs Checkout Builder editor.
Capture: full page or builder region.
Markers:
- `red box with an arrow pointing to the field palette, label 'Field palette'`
- `red box with an arrow pointing to the checkout canvas or step column, label 'Form layout'`
- `red box with an arrow pointing to the field settings sidebar, label 'Field settings'`

6. `06-subscription-shipping-card-pro`
Placement: after `## Subscription Shipping Card Pro`
Surface: Subscription product shipping settings, subscription detail shipping card, and customer portal shipping section.
Capture: settings/card region.
Markers:
- `red box with an arrow pointing to the subscription shipping controls on the product, label 'Shipping setup'`
- `red box with an arrow pointing to the shipping address or shipping method card, label 'Shipping detail'`
- `red box with an arrow pointing to the customer shipping update action, label 'Customer update'`

Source checked:
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/SubscriptionAdmin/REST/SubscriptionController.php`
- `arraysubs/src/resources/pages/SubscriptionDetail.jsx`
- `arraysubs/src/Features/CancellationFlow/Services/RetentionOfferProcessor.php`
- `arraysubs/src/resources/customerPortal.js`
- `arraysubs/src/Features/EasySetup/REST/SetupController.php`

Code scan terms: `manage`, `subscriptions`, `subscription`, `detail`, `cards`, `cancellation`, `card`, `title`, `variations`, `fields`.
