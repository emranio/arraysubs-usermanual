---
id: 32
title: customer-portal - README.md
status: backlog
priority: medium
created: 2026-06-09T18:08:34.667156+06:00
updated: 2026-06-16T18:53:18.383638+06:00
started: 2026-06-16T18:36:21.810522+06:00
class: standard
---

## Screenshot Plan

Scope: planning only. Do not capture browser screenshots or run screenshot-marker for this task yet.
Manual page examined: `user-manual/markdowns/customer-portal/README.md`.
Future capture should create `markdowns/customer-portal/README.assets/` and start numbering at `01`.

Total planned screenshots: 3.

1. `01-customer-portal-pages`
Placement: after `### Customer Portal Pages`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

2. `02-subscription-self-service-actions`
Placement: after `### Subscription Self-Service Actions`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

3. `03-payment-and-shipping-actions`
Placement: after `### Payment and Shipping Actions`
Surface: Customer My Account subscription list, subscription detail, and action modal.
Capture: full page or modal region.
Markers:
- `red box with an arrow pointing to the 'My Subscriptions' table or Subscription detail title, label 'Customer portal'`
- `red box with an arrow pointing to the subscription status badge, label 'Status'`
- `red box with an arrow pointing to the customer action button or modal, label 'Self service'`

Source checked:
- `arraysubs/src/Features/CustomerPortal/views/view-subscription.php`
- `arraysubs/src/Features/Subscriptions/Services/OrderIntegration.php`
- `arraysubs/src/resources/customerPortal.js`
- `arraysubs/src/Features/Subscriptions/Services/SubscriptionCPT.php`
- `arraysubspro/src/Features/AutomaticPayments/Services/AdminDisplayHooks.php`
- `arraysubspro/src/Features/AutomaticPayments/Gateways/Paddle/PaddleGateway.php`

Code scan terms: `customer`, `portal`, `subscription`, `self`, `service`, `actions`, `payment`, `shipping`, `subscriptions`.
